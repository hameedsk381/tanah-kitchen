import 'dotenv/config'
import express from 'express'
import cors from 'cors'
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

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Static media
app.use('/uploads', express.static(UPLOADS_DIR))
app.use(express.static(path.join(ROOT_DIR, 'public')))

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

  try {
    const user = await AdminUser.findOne({
      $or: [{ username: cleanUser }, { email: cleanUser }]
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid admin credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' })
    }

    user.lastLogin = new Date()
    await user.save()

    // Session token
    const token = Buffer.from(`${user.username}:${Date.now()}`).toString('base64')

    res.json({
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
  } catch (err) {
    console.error('Auth login error:', err)
    res.status(500).json({ error: 'Internal server error during authentication' })
  }
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

    const user = await AdminUser.findOne({ username }).lean()
    if (!user) {
      return res.status(401).json({ error: 'Session expired or user not found' })
    }

    res.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        lastLogin: user.lastLogin
      }
    })
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

// ── 1. MENU APIs (Pure MongoDB) ──
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 }).lean()
    res.json({
      categories: defaultCategories,
      items
    })
  } catch (err) {
    console.error('Menu fetch error:', err)
    res.status(500).json({ error: 'Failed to retrieve menu from MongoDB' })
  }
})

app.put('/api/menu', async (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }

  try {
    await MenuItem.deleteMany({})
    await MenuItem.insertMany(items)
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
    const created = await MenuItem.create(newItemData)
    res.status(201).json({ success: true, item: created })
  } catch (err) {
    console.error('Menu item create error:', err)
    res.status(500).json({ error: 'Failed to save dish to MongoDB' })
  }
})

app.put('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const updated = await MenuItem.findOneAndUpdate({ id }, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: 'Dish not found' })
    }
    res.json({ success: true, item: updated })
  } catch (err) {
    console.error('Menu item update error:', err)
    res.status(500).json({ error: 'Failed to update dish in MongoDB' })
  }
})

app.delete('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await MenuItem.deleteOne({ id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Dish not found' })
    }
    res.json({ success: true, message: `Dish ${id} deleted from MongoDB` })
  } catch (err) {
    console.error('Menu item delete error:', err)
    res.status(500).json({ error: 'Failed to delete dish from MongoDB' })
  }
})

app.post('/api/menu/reset', async (req, res) => {
  try {
    const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
    if (fs.existsSync(menuJsonPath)) {
      const rawMenu = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
      await MenuItem.deleteMany({})
      if (rawMenu.items?.length) {
        await MenuItem.insertMany(rawMenu.items)
      }
      return res.json({ success: true, count: rawMenu.items.length })
    }
    res.json({ success: true, message: 'Reset completed' })
  } catch (err) {
    console.error('Menu reset error:', err)
    res.status(500).json({ error: 'Failed to reset menu in MongoDB' })
  }
})

// ── 2. BENTO GRID APIs (Pure MongoDB) ──
app.get('/api/bento', async (req, res) => {
  try {
    const slots = await BentoSlot.find().sort({ slot: 1 }).lean()
    res.json(slots)
  } catch (err) {
    console.error('Bento fetch error:', err)
    res.status(500).json({ error: 'Failed to retrieve Bento slots from MongoDB' })
  }
})

app.put('/api/bento', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Bento data must be an array' })
  }

  try {
    await BentoSlot.deleteMany({})
    await BentoSlot.insertMany(req.body)
    res.json({ success: true, data: req.body })
  } catch (err) {
    console.error('Bento replace error:', err)
    res.status(500).json({ error: 'Failed to update Bento grid in MongoDB' })
  }
})

app.put('/api/bento/slot/:index', async (req, res) => {
  const index = parseInt(req.params.index, 10)
  const slotNumber = index + 1

  try {
    const updated = await BentoSlot.findOneAndUpdate(
      { slot: slotNumber },
      req.body,
      { new: true, upsert: true }
    )
    res.json({ success: true, slot: updated })
  } catch (err) {
    console.error('Bento slot update error:', err)
    res.status(500).json({ error: 'Failed to update Bento slot in MongoDB' })
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

// ── 3. GALLERY APIs (Pure MongoDB) ──
app.get('/api/gallery', async (req, res) => {
  try {
    const items = await GalleryItem.find().lean()
    res.json({
      categories: defaultGalleryCategories,
      items
    })
  } catch (err) {
    console.error('Gallery fetch error:', err)
    res.status(500).json({ error: 'Failed to retrieve gallery from MongoDB' })
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

// ── SERVE FRONTEND (PRODUCTION / SPA FALLBACK) ──
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.use((req, res, next) => {
    if ((req.method === 'GET' || req.method === 'HEAD') && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
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
