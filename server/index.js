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

// ── 1. MENU APIs (MongoDB with Instant Fallback) ──
app.get('/api/menu', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await MenuItem.find().sort({ createdAt: -1 }).lean()
      if (items && items.length > 0) {
        return res.json({
          categories: defaultCategories,
          items
        })
      }
    }

    // Fallback or seed source
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const raw = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      if (isDbConnected() && raw.items?.length) {
        await MenuItem.insertMany(raw.items).catch(() => {})
      }
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
    if (isDbConnected()) {
      await MenuItem.deleteMany({})
      await MenuItem.insertMany(items)
    }
    res.json({ success: true, count: items.length })
  } catch (err) {
    console.error('Menu bulk replace error:', err)
    res.status(500).json({ error: 'Failed to update menu in MongoDB' })
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

app.put('/api/gallery/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const updated = await GalleryItem.findOneAndUpdate({ id }, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: 'Gallery photo not found' })
    }
    res.json({ success: true, item: updated })
  } catch (err) {
    console.error('Gallery item update error:', err)
    res.status(500).json({ error: 'Failed to update gallery photo in MongoDB' })
  }
})

app.post('/api/gallery/reset', async (req, res) => {
  try {
    const galleryJsonPath = path.join(SRC_DATA_DIR, 'gallery.json')
    if (fs.existsSync(galleryJsonPath)) {
      const rawGallery = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'))
      await GalleryItem.deleteMany({})
      if (rawGallery.items?.length) {
        await GalleryItem.insertMany(rawGallery.items)
      }
      return res.json({ success: true, count: rawGallery.items.length })
    }
    res.json({ success: true, message: 'Reset completed' })
  } catch (err) {
    console.error('Gallery reset error:', err)
    res.status(500).json({ error: 'Failed to reset gallery in MongoDB' })
  }
})

// ── 4. FILE UPLOADS API ──
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' })
  }
  const fileUrl = `/uploads/${req.file.filename}`
  res.status(201).json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  })
})

app.get('/api/uploads', (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR)
    const list = files
      .filter((f) => !f.startsWith('.'))
      .map((filename) => {
        const stats = fs.statSync(path.join(UPLOADS_DIR, filename))
        return {
          filename,
          url: `/uploads/${filename}`,
          createdAt: stats.birthtime,
          size: stats.size
        }
      })
      .sort((a, b) => b.createdAt - a.createdAt)
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: 'Could not read uploads directory' })
  }
})

// ── 5. AI DINING CONCIERGE & SOMMELIER API (Streaming with Zero Cutoff) ──
app.post('/api/ai/concierge', async (req, res) => {
  const { messages } = req.body || {}
  const userMsg = Array.isArray(messages) && messages.length > 0 
    ? messages[messages.length - 1].content 
    : 'Hello'

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const q = (userMsg || '').toLowerCase()

  // Generate tailored culinary response
  let answer = ''

  if (q.includes('special') || q.includes('recommend') || q.includes('signature') || q.includes('best') || q.includes('must try')) {
    answer = `✨ **Chef’s Signature Selections at Tanah:**\n\n` +
      `1. **Claypot Mutton Biryani (₹549)** — Fragrant aged Basmati and tender farm-raised mutton slow-simmered in porous earthen clay with caramelized saffron embers. *(🍸 Pairs with: Rooftop Smoked Old Fashioned)*\n\n` +
      `2. **Wild Mushroom Risotto (₹549)** — Creamy Italian arborio rice infused with hand-foraged forest mushrooms and white truffle oil.\n\n` +
      `3. **Kodi Crisp (₹399)** — Crispy chicken strips tossed in regional roasted podi & fresh curry leaves. *(🍹 Pairs with: Forest Herbal Mule)*\n\n` +
      `4. **Mango Tres Leches (₹499)** — Alphonso mango compote with airy sponge steeped in three rich milks.\n\n` +
      `Would you like to reserve a table or explore our full [Seasonal Menu](/menu)?`
  } else if (q.includes('cocktail') || q.includes('drink') || q.includes('bar') || q.includes('wine') || q.includes('whiskey') || q.includes('pairing')) {
    answer = `🍸 **Liquid Library & Drink Pairings:**\n\n` +
      `Our mixologists craft cocktails inspired by botanical infusions and earthen spices:\n\n` +
      `• **Rooftop Smoked Old Fashioned** — Bourbon infused with charred oak smoke, orange bitters, and organic jaggery syrup.\n` +
      `• **Forest Herbal Mule** — Handcrafted vodka with muddled forest mint, cold-pressed ginger, and sparkling tonic.\n` +
      `• **Vedic Bramble Tonic** — Premium dry gin with wild berry reduction and floral botanicals.\n` +
      `• **Araku Valley Cold Brew** — Filter coffee liqueur, dark chocolate bitters, and vanilla foam.\n\n` +
      `We also curate rare Single Malts (Singleton, Talisker, Hibiki), artisanal beers, and vintage wines. Shall I assist you with table booking for tonight?`
  } else if (q.includes('corporate') || q.includes('event') || q.includes('party') || q.includes('meeting') || q.includes('package')) {
    answer = `💼 **Bespoke Corporate & Group Experiences:**\n\n` +
      `Tanah provides dedicated spaces engineered for executive dinners, team offsites, and celebrations:\n\n` +
      `1. **Rooftop Corporate Dining (15–30 Guests)** — Relaxed open-air setting with multi-course farm gastronomy and crafted cocktails.\n` +
      `2. **Corporate Celebrations & Team Events (30–60 Guests)** — Vibrant rooftop event terrace with live cooking hearths and entertainment.\n` +
      `3. **Team Dining & Curated Experiences (20–40 Guests)** — Specially curated menus, cocktail pairings, and engaging team ambience.\n\n` +
      `To request a customized proposal or schedule a walkthrough, please call our events desk at **+91 89777 30291** or fill out our [Corporate Inquiry Form](/contact).`
  } else if (q.includes('veg') || q.includes('vegan') || q.includes('dietary')) {
    answer = `🌿 **Vegetarian & Plant-Forward Delicacies:**\n\n` +
      `At Tanah, over 60% of our seasonal menu celebrates sustainable, farm-fresh vegetarian gastronomy:\n\n` +
      `• **Dahi Kebabs (₹449)** — Pan-seared hung curd patties with green chilies, roasted cumin, and mint chutney.\n` +
      `• **Smoked Terracotta Paneer (₹449)** — Farm cottage cheese marinated in crushed whole spices and wood-smoked.\n` +
      `• **Heritage Soil Thali (₹549)** — Indigenous seasonal curries, organic red rice, and house-made artisanal breads.\n` +
      `• **Desi Tiramisu (₹549)** — Araku Valley coffee-soaked sponge with saffron mascarpone.\n\n` +
      `All vegetarian dishes are prepared in separate cooking zones.`
  } else if (q.includes('book') || q.includes('reserve') || q.includes('table') || q.includes('time') || q.includes('hour') || q.includes('location') || q.includes('address')) {
    answer = `📍 **Location, Hours & Reservations:**\n\n` +
      `• **Address:** Gachibowli, Hyderabad, Telangana 500032 (Near Financial District).\n` +
      `• **Hours:** Open Daily from **12:00 PM to 11:30 PM**.\n` +
      `• **Direct Booking:** You can reserve a table instantly on our [Table Reservation Page](/book).\n` +
      `• **Helpline:** Call **+91 89777 30291** for immediate table confirmations or group inquiries.\n\n` +
      `We look forward to welcoming you to the Tanah sanctuary!`
  } else {
    answer = `🌿 **Greetings from Tanah Kitchen & Bar!**\n\n` +
      `Tanah is a rooftop dining sanctuary located in Gachibowli, Hyderabad, celebrating wood-fired gastronomy, zero-mile organic ingredients, and artisanal mixology.\n\n` +
      `How can I assist your visit today?\n` +
      `• **Discover the Menu** — Ask about our chef specials, biryanis, sourdough pizzas, and desserts.\n` +
      `• **Drink Recommendations** — Explore our Liquid Library cocktails, single malts, and wine pairings.\n` +
      `• **Corporate Gatherings** — Inquire about rooftop dining packages for 15 to 60 guests.\n` +
      `• **Table Booking** — Reserve your table directly for lunch or dinner.`
  }

  // Stream in natural word chunks with zero cutoff
  const chunks = answer.split(' ')
  for (let i = 0; i < chunks.length; i++) {
    const chunk = (i === 0 ? '' : ' ') + chunks[i]
    res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`)
    await new Promise((r) => setTimeout(r, 20))
  }

  res.write(`data: ${JSON.stringify({ isTruncated: false })}\n\n`)
  res.write('data: [DONE]\n\n')
  res.end()
})

// ── SERVE FRONTEND (PRODUCTION / SPA FALLBACK) ──
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, STATIC_CACHE_OPTS))
  app.use((req, res, next) => {
    if ((req.method === 'GET' || req.method === 'HEAD') && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.setHeader('Cache-Control', 'no-cache')
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
