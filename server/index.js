import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB, isDbConnected } from './db.js'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { AdminUser } from './models/AdminUser.js'
import { Storage } from '@google-cloud/storage'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Directories
const ROOT_DIR = path.resolve(__dirname, '..')
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const SRC_DATA_DIR = path.join(ROOT_DIR, 'src', 'data')

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// ── GOOGLE CLOUD STORAGE CONFIGURATION ──
let gcsBucket = null
let gcsBucketName = process.env.GCP_STORAGE_BUCKET || ''

try {
  const gcsOptions = {}

  if (process.env.GCP_PROJECT_ID) {
    gcsOptions.projectId = process.env.GCP_PROJECT_ID
  }

  if (process.env.GCP_CLIENT_EMAIL && process.env.GCP_PRIVATE_KEY) {
    gcsOptions.credentials = {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  } else if (process.env.GCP_SERVICE_ACCOUNT_KEY) {
    try {
      gcsOptions.credentials = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY)
    } catch (e) {
      console.warn('⚠️ Could not parse GCP_SERVICE_ACCOUNT_KEY JSON:', e.message)
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    gcsOptions.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS
  }

  if (gcsBucketName && (gcsOptions.credentials || gcsOptions.keyFilename || process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    const storage = new Storage(gcsOptions)
    gcsBucket = storage.bucket(gcsBucketName)
    console.log(`☁️ Google Cloud Storage initialized for bucket: ${gcsBucketName}`)
  } else {
    console.log('ℹ️ Google Cloud Storage not fully configured. Using local disk storage fallback (/uploads).')
  }
} catch (err) {
  console.warn('⚠️ Google Cloud Storage initialization skipped:', err.message)
}

// Load default fallback categories
const defaultCategories = ['Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts']
const defaultGalleryCategories = ['All', 'Ambience', 'Rooftop', 'Events', 'Food']

// Middleware: Enable Gzip / Brotli Compression
app.use(compression())
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Static media caching config
const STATIC_CACHE_OPTS = {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.includes('/assets/') || filePath.endsWith('.webp') || filePath.endsWith('.png') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
  }
}

app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d' }))
app.use(express.static(path.join(ROOT_DIR, 'public'), STATIC_CACHE_OPTS))

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.webp'
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
    cb(null, `upload_${Date.now()}_${cleanName}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// ── HEALTH & STATUS ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: isDbConnected() ? 'mongodb' : 'connecting',
    service: 'Tanah Kitchen & Bar Management API'
  })
})

// ── 0. AUTHENTICATION APIs ──
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const cleanUser = username.trim().toLowerCase()
  const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
  const expectedPassword = process.env.ADMIN_PASSWORD || 'tanah@2025'
  const expectedEmail = (process.env.ADMIN_EMAIL || 'admin@tanahkitchen.in').trim().toLowerCase()

  // 1. If MongoDB is connected, verify against MongoDB database
  if (isDbConnected()) {
    try {
      const user = await AdminUser.findOne({
        $or: [{ username: cleanUser }, { email: cleanUser }]
      })

      if (user) {
        const isMatch = await user.comparePassword(password)
        if (isMatch) {
          user.lastLogin = new Date()
          await user.save()

          const token = Buffer.from(`${user.username}:${Date.now()}`).toString('base64')
          return res.json({
            success: true,
            token,
            user: {
              username: user.username,
              email: user.email,
              name: user.name,
              role: user.role,
              lastLogin: user.lastLogin
            }
          })
        }
      }
    } catch (err) {
      console.warn('MongoDB auth query warning:', err.message)
    }
  }

  // 2. Direct Environment Fallback (Works whenever MongoDB is offline or starting)
  if ((cleanUser === expectedUser || cleanUser === expectedEmail) && password === expectedPassword) {
    const token = Buffer.from(`${expectedUser}:${Date.now()}`).toString('base64')
    return res.json({
      success: true,
      token,
      user: {
        username: expectedUser,
        email: expectedEmail,
        name: 'Tanah Administrator',
        role: 'Super Admin',
        lastLogin: new Date()
      }
    })
  }

  return res.status(401).json({ error: 'Invalid admin credentials' })
})

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided' })
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = Buffer.from(token, 'base64').toString('ascii')
    const [username] = decoded.split(':')

    if (isDbConnected()) {
      const user = await AdminUser.findOne({ username }).lean()
      if (user) {
        return res.json({
          success: true,
          user: {
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role,
            lastLogin: user.lastLogin
          }
        })
      }
    }

    const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
    if (username.toLowerCase() === expectedUser) {
      return res.json({
        success: true,
        user: {
          username: expectedUser,
          email: process.env.ADMIN_EMAIL || 'admin@tanahkitchen.in',
          name: 'Tanah Administrator',
          role: 'Super Admin'
        }
      })
    }

    res.status(401).json({ error: 'Session expired' })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

app.post('/api/auth/change-password', async (req, res) => {
  const { username, currentPassword, newPassword } = req.body

  if (!username || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const user = await AdminUser.findOne({ username: username.trim().toLowerCase() })
    if (!user || user.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// ── 1. MENU APIs (MongoDB with Instant Fallback & Deduplication) ──
app.get('/api/menu', async (req, res) => {
  try {
    if (isDbConnected()) {
      const dbItems = await MenuItem.find().sort({ createdAt: -1 }).lean()
      if (dbItems && dbItems.length > 0) {
        const seenNames = new Set()
        const seenIds = new Set()
        const uniqueItems = []
        for (const item of dbItems) {
          const nameKey = (item.name || '').trim().toLowerCase()
          if (!nameKey || seenNames.has(nameKey) || seenIds.has(item.id)) continue
          seenNames.add(nameKey)
          seenIds.add(item.id)
          uniqueItems.push(item)
        }
        if (uniqueItems.length > 0) {
          return res.json({
            categories: defaultCategories,
            items: uniqueItems
          })
        }
      }
    }

    // Fallback or seed source from clean menu.json
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const raw = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      return res.json(raw)
    }

    res.json({ categories: defaultCategories, items: [] })
  } catch (err) {
    console.error('Menu fetch error:', err)
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      return res.json(JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8')))
    }
    res.status(500).json({ error: 'Failed to retrieve menu' })
  }
})

app.put('/api/menu', async (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }

  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const current = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      current.items = items
      fs.writeFileSync(menuJsonPath, JSON.stringify(current, null, 2), 'utf-8')
    }

    if (isDbConnected()) {
      await MenuItem.deleteMany({})
      await MenuItem.insertMany(items)
    }
    res.json({ success: true, count: items.length })
  } catch (err) {
    console.error('Menu bulk replace error:', err)
    res.status(500).json({ error: 'Failed to update menu' })
  }
})

app.post('/api/menu/item', async (req, res) => {
  const newItemData = {
    id: req.body.id || `dish-${Date.now()}`,
    name: req.body.name,
    category: req.body.category || 'Lunch',
    price: Number(req.body.price) || 0,
    desc: req.body.desc || '',
    image: req.body.image || '/assets/Tanha Food/food-1.webp',
    tags: req.body.tags || [],
    special: Boolean(req.body.special),
    nonVeg: Boolean(req.body.nonVeg),
    pairing: req.body.pairing || '',
    profile: req.body.profile || { earthy: 50, smoky: 40, sweet: 20, spicy: 10 }
  }

  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const current = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      if (Array.isArray(current.items)) {
        current.items = [newItemData, ...current.items]
        fs.writeFileSync(menuJsonPath, JSON.stringify(current, null, 2), 'utf-8')
      }
    }

    if (isDbConnected()) {
      const created = await MenuItem.create(newItemData)
      return res.status(201).json({ success: true, item: created })
    }
    res.status(201).json({ success: true, item: newItemData })
  } catch (err) {
    console.error('Menu item create error:', err)
    res.status(500).json({ error: 'Failed to save dish' })
  }
})

app.put('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const current = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      if (Array.isArray(current.items)) {
        current.items = current.items.map(item => item.id === id ? { ...item, ...req.body } : item)
        fs.writeFileSync(menuJsonPath, JSON.stringify(current, null, 2), 'utf-8')
      }
    }

    if (isDbConnected()) {
      const updated = await MenuItem.findOneAndUpdate({ id }, req.body, { new: true })
      if (!updated) {
        return res.status(404).json({ error: 'Dish not found' })
      }
      return res.json({ success: true, item: updated })
    }
    res.json({ success: true, item: { id, ...req.body } })
  } catch (err) {
    console.error('Menu item update error:', err)
    res.status(500).json({ error: 'Failed to update dish' })
  }
})

app.delete('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const current = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      if (Array.isArray(current.items)) {
        current.items = current.items.filter(item => item.id !== id)
        fs.writeFileSync(menuJsonPath, JSON.stringify(current, null, 2), 'utf-8')
      }
    }

    if (isDbConnected()) {
      const result = await MenuItem.deleteOne({ id })
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Dish not found' })
      }
    }
    res.json({ success: true, message: `Dish ${id} deleted` })
  } catch (err) {
    console.error('Menu item delete error:', err)
    res.status(500).json({ error: 'Failed to delete dish' })
  }
})

app.post('/api/menu/reset', async (req, res) => {
  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const rawMenu = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      if (isDbConnected()) {
        await MenuItem.deleteMany({})
        if (rawMenu.items?.length) {
          await MenuItem.insertMany(rawMenu.items)
        }
      }
      return res.json({ success: true, count: rawMenu.items.length })
    }
    res.json({ success: true, message: 'Reset completed' })
  } catch (err) {
    console.error('Menu reset error:', err)
    res.status(500).json({ error: 'Failed to reset menu' })
  }
})

// ── 2. BENTO GRID APIs (MongoDB with Instant Fallback) ──
app.get('/api/bento', async (req, res) => {
  try {
    if (isDbConnected()) {
      const slots = await BentoSlot.find().sort({ slot: 1 }).lean()
      if (slots && slots.length === 6) {
        return res.json(slots)
      }
    }

    const defaultBento = [
      {
        id: 'bento-1',
        slot: 1,
        title: 'Claypot Mutton Biryani',
        category: 'Wood-Fired Hearth',
        price: 549,
        tag: '★ BESTSELLER',
        isVeg: false,
        image: '/assets/Tanha Food/food-1.webp',
        desc: 'Fragrant aged Basmati & farm-raised mutton slow-simmered in porous earthen clay with caramelized saffron embers.',
        pairing: '🍸 Pairs with: Rooftop Smoked Old Fashioned'
      },
      {
        id: 'bento-2',
        slot: 2,
        title: 'Wild Mushroom Risotto',
        category: 'Continental Gastronomy',
        price: 549,
        tag: '★ SIGNATURE',
        isVeg: true,
        image: '/assets/Tanha Food/food-11.webp',
        desc: 'Hand-foraged forest mushrooms, Italian arborio rice & white truffle oil.',
        pairing: '🍷 Pairs with: Sula Dindori Viognier'
      },
      {
        id: 'bento-3',
        slot: 3,
        title: 'Kodi Crisp',
        category: 'Coastal Spice Bar',
        price: 399,
        tag: '✦ CHEF SPECIAL',
        isVeg: false,
        image: '/assets/Tanha Food/food-14.webp',
        desc: 'Crispy chicken strips tossed in regional roasted podi & curry leaves.',
        pairing: '🍹 Pairs with: Forest Herbal Mule'
      },
      {
        id: 'bento-4',
        slot: 4,
        title: 'Dahi Kebabs',
        category: 'Artisanal Starters',
        price: 449,
        tag: '★ VEG SPECIAL',
        isVeg: true,
        image: '/assets/Tanha Food/food-29.webp',
        desc: 'Pan-seared spiced hung curd patties with green chilies & mint dip.',
        pairing: '🍸 Pairs with: Basalt Stone Margarita'
      },
      {
        id: 'bento-5',
        slot: 5,
        title: 'Mango Tres Leches',
        category: 'Alphonso Mango',
        price: 499,
        tag: '★ DESSERT',
        isVeg: true,
        image: '/assets/Tanha Food/food-44.webp',
        desc: 'Alphonso mango compote with airy sponge steeped in three rich milks.',
        pairing: '☕ Pairs with: Araku Valley Cold Brew'
      },
      {
        id: 'bento-6',
        slot: 6,
        title: 'Desi Tiramisu',
        category: 'Araku Kaapi Infusion',
        price: 549,
        tag: '★ DESSERT',
        isVeg: true,
        image: '/assets/Tanha Food/food-45.webp',
        desc: 'Single-origin Araku Valley filter coffee soaked sponge with saffron mascarpone.',
        pairing: '☕ Pairs with: Single-Origin Espresso'
      }
    ]

    if (isDbConnected()) {
      await BentoSlot.deleteMany({})
      await BentoSlot.insertMany(defaultBento).catch(() => {})
    }

    res.json(defaultBento)
  } catch (err) {
    console.error('Bento fetch error:', err)
    res.status(500).json({ error: 'Failed to retrieve Bento slots' })
  }
})

app.put('/api/bento', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Bento data must be an array' })
  }

  try {
    if (isDbConnected()) {
      await BentoSlot.deleteMany({})
      await BentoSlot.insertMany(req.body)
    }
    res.json({ success: true, data: req.body })
  } catch (err) {
    console.error('Bento replace error:', err)
    res.status(500).json({ error: 'Failed to update Bento grid' })
  }
})

app.put('/api/bento/slot/:index', async (req, res) => {
  const index = parseInt(req.params.index, 10)
  const slotNumber = index + 1

  try {
    if (isDbConnected()) {
      const updated = await BentoSlot.findOneAndUpdate(
        { slot: slotNumber },
        req.body,
        { new: true, upsert: true }
      )
      return res.json({ success: true, slot: updated })
    }
    res.json({ success: true, slot: { slot: slotNumber, ...req.body } })
  } catch (err) {
    console.error('Bento slot update error:', err)
    res.status(500).json({ error: 'Failed to update Bento slot' })
  }
})

app.post('/api/bento/reset', async (req, res) => {
  try {
    const DEFAULT_BENTO_ITEMS = [
      {
        id: 'bento-1',
        slot: 1,
        title: 'Claypot Mutton Biryani',
        category: 'Wood-Fired Hearth',
        price: 549,
        tag: '★ BESTSELLER',
        isVeg: false,
        image: '/assets/Tanha Food/food-1.webp',
        desc: 'Fragrant aged Basmati & farm-raised mutton slow-simmered in porous earthen clay with caramelized saffron embers.',
        pairing: '🍸 Pairs with: Rooftop Smoked Old Fashioned'
      },
      {
        id: 'bento-2',
        slot: 2,
        title: 'Wild Mushroom Risotto',
        category: 'Continental Gastronomy',
        price: 549,
        tag: '★ SIGNATURE',
        isVeg: true,
        image: '/assets/Tanha Food/food-11.webp',
        desc: 'Hand-foraged forest mushrooms, Italian arborio rice & white truffle oil.',
        pairing: '🍷 Pairs with: Sula Dindori Viognier'
      },
      {
        id: 'bento-3',
        slot: 3,
        title: 'Kodi Crisp',
        category: 'Coastal Spice Bar',
        price: 399,
        tag: '✦ CHEF SPECIAL',
        isVeg: false,
        image: '/assets/Tanha Food/food-14.webp',
        desc: 'Crispy chicken strips tossed in regional roasted podi & curry leaves.',
        pairing: '🍹 Pairs with: Forest Herbal Mule'
      },
      {
        id: 'bento-4',
        slot: 4,
        title: 'Dahi Kebabs',
        category: 'Artisanal Starters',
        price: 449,
        tag: '★ VEG SPECIAL',
        isVeg: true,
        image: '/assets/Tanha Food/food-29.webp',
        desc: 'Pan-seared spiced hung curd patties with green chilies & mint dip.',
        pairing: '🍸 Pairs with: Basalt Stone Margarita'
      },
      {
        id: 'bento-5',
        slot: 5,
        title: 'Mango Tres Leches',
        category: 'Alphonso Mango',
        price: 499,
        tag: '★ DESSERT',
        isVeg: true,
        image: '/assets/Tanha Food/food-44.webp',
        desc: 'Alphonso mango compote with airy sponge steeped in three rich milks.',
        pairing: '☕ Pairs with: Araku Valley Cold Brew'
      },
      {
        id: 'bento-6',
        slot: 6,
        title: 'Desi Tiramisu',
        category: 'Araku Kaapi Infusion',
        price: 549,
        tag: '★ DESSERT',
        isVeg: true,
        image: '/assets/Tanha Food/food-45.webp',
        desc: 'Single-origin Araku Valley filter coffee soaked sponge with saffron mascarpone.',
        pairing: '☕ Pairs with: Single-Origin Espresso'
      }
    ]
    await BentoSlot.deleteMany({})
    await BentoSlot.insertMany(DEFAULT_BENTO_ITEMS)
    res.json({ success: true, data: DEFAULT_BENTO_ITEMS })
  } catch (err) {
    console.error('Bento reset error:', err)
    res.status(500).json({ error: 'Failed to reset Bento grid in MongoDB' })
  }
})

// ── 3. GALLERY APIs (MongoDB with Instant Fallback) ──
app.get('/api/gallery', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await GalleryItem.find().lean()
      if (items && items.length > 0) {
        return res.json({
          categories: defaultGalleryCategories,
          items
        })
      }
    }

    const galleryJsonPath = path.join(SRC_DATA_DIR, 'gallery.json')
    if (fs.existsSync(galleryJsonPath)) {
      const raw = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'))
      if (isDbConnected() && raw.items?.length) {
        await GalleryItem.insertMany(raw.items).catch(() => {})
      }
      return res.json(raw)
    }

    res.json({ categories: defaultGalleryCategories, items: [] })
  } catch (err) {
    console.error('Gallery fetch error:', err)
    const galleryJsonPath = path.join(SRC_DATA_DIR, 'gallery.json')
    if (fs.existsSync(galleryJsonPath)) {
      return res.json(JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8')))
    }
    res.status(500).json({ error: 'Failed to retrieve gallery' })
  }
})

app.put('/api/gallery', async (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }

  try {
    await GalleryItem.deleteMany({})
    await GalleryItem.insertMany(items)
    res.json({ success: true, count: items.length })
  } catch (err) {
    console.error('Gallery replace error:', err)
    res.status(500).json({ error: 'Failed to update gallery in MongoDB' })
  }
})

app.post('/api/gallery/item', async (req, res) => {
  const newItemData = {
    id: req.body.id || `gallery-${Date.now()}`,
    title: req.body.title || 'Tanah Moment',
    category: req.body.category || 'Ambience',
    image: req.body.image || '/assets/Tanha Ambiance/Ambiance-1.webp',
    caption: req.body.caption || '',
    tags: req.body.tags || []
  }

  try {
    if (isDbConnected()) {
      const created = await GalleryItem.create(newItemData)
      return res.status(201).json({ success: true, item: created })
    }
    res.status(201).json({ success: true, item: newItemData })
  } catch (err) {
    console.error('Gallery item create error:', err)
    res.status(500).json({ error: 'Failed to create gallery photo' })
  }
})

app.put('/api/gallery/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    if (isDbConnected()) {
      const updated = await GalleryItem.findOneAndUpdate({ id }, req.body, { new: true })
      if (!updated) {
        return res.status(404).json({ error: 'Gallery photo not found' })
      }
      return res.json({ success: true, item: updated })
    }
    res.json({ success: true, item: { id, ...req.body } })
  } catch (err) {
    console.error('Gallery item update error:', err)
    res.status(500).json({ error: 'Failed to update gallery photo' })
  }
})

app.delete('/api/gallery/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    if (isDbConnected()) {
      const result = await GalleryItem.deleteOne({ id })
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Gallery photo not found' })
      }
    }
    res.json({ success: true, message: `Gallery item ${id} deleted` })
  } catch (err) {
    console.error('Gallery item delete error:', err)
    res.status(500).json({ error: 'Failed to delete gallery photo' })
  }
})

app.post('/api/gallery/reset', async (req, res) => {
  try {
    const galleryJsonPath = path.join(SRC_DATA_DIR, 'gallery.json')
    if (fs.existsSync(galleryJsonPath)) {
      const rawGallery = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'))
      if (isDbConnected()) {
        await GalleryItem.deleteMany({})
        if (rawGallery.items?.length) {
          await GalleryItem.insertMany(rawGallery.items)
        }
      }
      return res.json({ success: true, count: rawGallery.items.length })
    }
    res.json({ success: true, message: 'Reset completed' })
  } catch (err) {
    console.error('Gallery reset error:', err)
    res.status(500).json({ error: 'Failed to reset gallery' })
  }
})

// ── 4. FILE UPLOADS & CLOUD STORAGE API ──
app.get('/api/storage/status', (req, res) => {
  res.json({
    engine: gcsBucket ? 'gcs' : 'local',
    connected: Boolean(gcsBucket),
    bucket: gcsBucketName || null,
    provider: gcsBucket ? 'Google Cloud Storage' : 'Local Disk (/uploads)'
  })
})

app.post('/api/upload', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' })
  }

  const filename = req.file.filename
  const localFilePath = path.join(UPLOADS_DIR, filename)

  // 1. If Google Cloud Storage is active, upload to GCS bucket
  if (gcsBucket) {
    try {
      const destination = `uploads/${filename}`
      await gcsBucket.upload(localFilePath, {
        destination,
        metadata: {
          contentType: req.file.mimetype,
          cacheControl: 'public, max-age=31536000, immutable'
        }
      })

      const publicPrefix = process.env.GCP_PUBLIC_URL_PREFIX || `https://storage.googleapis.com/${gcsBucketName}`
      const gcsUrl = `${publicPrefix.replace(/\/$/, '')}/${destination}`

      return res.status(201).json({
        success: true,
        url: gcsUrl,
        filename,
        originalName: req.file.originalname,
        size: req.file.size,
        storage: 'gcs'
      })
    } catch (gcsErr) {
      console.error('⚠️ GCS upload error, falling back to local URL:', gcsErr.message)
    }
  }

  // 2. Local Disk Fallback URL
  const fileUrl = `/uploads/${filename}`
  res.status(201).json({
    success: true,
    url: fileUrl,
    filename,
    originalName: req.file.originalname,
    size: req.file.size,
    storage: 'local'
  })
})

app.get('/api/uploads', async (req, res) => {
  try {
    const list = []
    const seen = new Set()

    // 1. Retrieve uploaded items from Google Cloud Storage
    if (gcsBucket) {
      try {
        const [files] = await gcsBucket.getFiles({ prefix: 'uploads/' })
        const publicPrefix = process.env.GCP_PUBLIC_URL_PREFIX || `https://storage.googleapis.com/${gcsBucketName}`

        for (const file of files) {
          const filename = path.basename(file.name)
          if (!filename || filename === 'uploads') continue
          const url = `${publicPrefix.replace(/\/$/, '')}/${file.name}`
          seen.add(filename)
          list.push({
            filename,
            url,
            createdAt: file.metadata.timeCreated || new Date(),
            size: Number(file.metadata.size) || 0,
            storage: 'gcs'
          })
        }
      } catch (err) {
        console.warn('Could not list GCS files:', err.message)
      }
    }

    // 2. Combine with local disk uploads
    if (fs.existsSync(UPLOADS_DIR)) {
      const localFiles = fs.readdirSync(UPLOADS_DIR)
      for (const filename of localFiles) {
        if (filename.startsWith('.') || seen.has(filename)) continue
        const stats = fs.statSync(path.join(UPLOADS_DIR, filename))
        list.push({
          filename,
          url: `/uploads/${filename}`,
          createdAt: stats.birthtime,
          size: stats.size,
          storage: 'local'
        })
      }
    }

    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: 'Could not read uploads catalog' })
  }
})

// ── SERVE FRONTEND (PRODUCTION / SPA FALLBACK) ──
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, STATIC_CACHE_OPTS))

  // Return 404 for stale/missing assets instead of index.html
  app.use('/assets', (req, res) => {
    res.status(404).send('Asset chunk not found')
  })

  app.use((req, res, next) => {
    if (
      (req.method === 'GET' || req.method === 'HEAD') &&
      !req.path.startsWith('/api') &&
      !req.path.startsWith('/uploads') &&
      !req.path.startsWith('/assets') &&
      !req.path.includes('.')
    ) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      return res.sendFile(path.join(DIST_DIR, 'index.html'))
    }
    next()
  })
}

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✨ Tanah Kitchen & Bar Server running on http://localhost:${PORT}`)
    console.log(`📁 Serving static assets from ${DIST_DIR}`)
    console.log(`📸 Uploads directory ready at ${UPLOADS_DIR}`)
  })
})
