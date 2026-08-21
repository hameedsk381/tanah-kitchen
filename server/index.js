import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Directories
const ROOT_DIR = path.resolve(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'server', 'data')
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const SRC_DATA_DIR = path.join(ROOT_DIR, 'src', 'data')

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// Helper: Read JSON file with fallback to default
function readJsonFile(filePath, fallbackData) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err)
  }
  return fallbackData
}

// Helper: Write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err)
    return false
  }
}

// Load default data
const defaultMenuPath = path.join(SRC_DATA_DIR, 'menu.json')
const defaultGalleryPath = path.join(SRC_DATA_DIR, 'gallery.json')

const DEFAULT_MENU_DATA = readJsonFile(defaultMenuPath, { items: [], categories: [] })
const DEFAULT_GALLERY_DATA = readJsonFile(defaultGalleryPath, { items: [], categories: [] })

const DEFAULT_BENTO_DATA = [
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

// Data file paths
const menuFilePath = path.join(DATA_DIR, 'menu.json')
const bentoFilePath = path.join(DATA_DIR, 'bento.json')
const galleryFilePath = path.join(DATA_DIR, 'gallery.json')

// Initialize data files if not present
if (!fs.existsSync(menuFilePath)) writeJsonFile(menuFilePath, DEFAULT_MENU_DATA)
if (!fs.existsSync(bentoFilePath)) writeJsonFile(bentoFilePath, DEFAULT_BENTO_DATA)
if (!fs.existsSync(galleryFilePath)) writeJsonFile(galleryFilePath, DEFAULT_GALLERY_DATA)

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Serve uploaded media
app.use('/uploads', express.static(UPLOADS_DIR))

// Serve public static assets (e.g. /assets/Tanha Food/...)
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
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// ── API ROUTES ──

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Tanah Kitchen & Bar Management API'
  })
})

// ── 1. MENU APIs ──
app.get('/api/menu', (req, res) => {
  const data = readJsonFile(menuFilePath, DEFAULT_MENU_DATA)
  res.json(data)
})

app.put('/api/menu', (req, res) => {
  const { items, categories } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }
  const updated = {
    categories: categories || DEFAULT_MENU_DATA.categories,
    items
  }
  writeJsonFile(menuFilePath, updated)
  res.json({ success: true, count: items.length, data: updated })
})

app.post('/api/menu/item', (req, res) => {
  const current = readJsonFile(menuFilePath, DEFAULT_MENU_DATA)
  const newItem = {
    id: req.body.id || `dish-${Date.now()}`,
    name: req.body.name,
    category: req.body.category || 'Lunch',
    price: Number(req.body.price) || 0,
    desc: req.body.desc || '',
    image: req.body.image || '/assets/Tanha Food/food-1.webp',
    tags: req.body.tags || [],
    special: req.body.special || false,
    nonVeg: req.body.nonVeg || false,
    pairing: req.body.pairing || '',
    profile: req.body.profile || { earthy: 50, smoky: 40, sweet: 20, spicy: 10 }
  }
  current.items.unshift(newItem)
  writeJsonFile(menuFilePath, current)
  res.status(201).json({ success: true, item: newItem })
})

app.put('/api/menu/item/:id', (req, res) => {
  const current = readJsonFile(menuFilePath, DEFAULT_MENU_DATA)
  const idx = current.items.findIndex((i) => i.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }
  current.items[idx] = { ...current.items[idx], ...req.body }
  writeJsonFile(menuFilePath, current)
  res.json({ success: true, item: current.items[idx] })
})

app.delete('/api/menu/item/:id', (req, res) => {
  const current = readJsonFile(menuFilePath, DEFAULT_MENU_DATA)
  const initialLength = current.items.length
  current.items = current.items.filter((i) => i.id !== req.params.id)
  if (current.items.length === initialLength) {
    return res.status(404).json({ error: 'Item not found' })
  }
  writeJsonFile(menuFilePath, current)
  res.json({ success: true, message: 'Item deleted' })
})

app.post('/api/menu/reset', (req, res) => {
  writeJsonFile(menuFilePath, DEFAULT_MENU_DATA)
  res.json({ success: true, data: DEFAULT_MENU_DATA })
})

// ── 2. BENTO GRID APIs ──
app.get('/api/bento', (req, res) => {
  const data = readJsonFile(bentoFilePath, DEFAULT_BENTO_DATA)
  res.json(data)
})

app.put('/api/bento', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Bento data must be an array' })
  }
  writeJsonFile(bentoFilePath, req.body)
  res.json({ success: true, data: req.body })
})

app.put('/api/bento/slot/:index', (req, res) => {
  const index = parseInt(req.params.index, 10)
  const current = readJsonFile(bentoFilePath, DEFAULT_BENTO_DATA)
  if (isNaN(index) || index < 0 || index >= current.length) {
    return res.status(400).json({ error: 'Invalid slot index' })
  }
  current[index] = { ...current[index], ...req.body }
  writeJsonFile(bentoFilePath, current)
  res.json({ success: true, slot: current[index] })
})

app.post('/api/bento/reset', (req, res) => {
  writeJsonFile(bentoFilePath, DEFAULT_BENTO_DATA)
  res.json({ success: true, data: DEFAULT_BENTO_DATA })
})

// ── 3. GALLERY APIs ──
app.get('/api/gallery', (req, res) => {
  const data = readJsonFile(galleryFilePath, DEFAULT_GALLERY_DATA)
  res.json(data)
})

app.put('/api/gallery', (req, res) => {
  const { items, categories } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' })
  }
  const updated = {
    categories: categories || DEFAULT_GALLERY_DATA.categories,
    items
  }
  writeJsonFile(galleryFilePath, updated)
  res.json({ success: true, data: updated })
})

app.put('/api/gallery/item/:id', (req, res) => {
  const current = readJsonFile(galleryFilePath, DEFAULT_GALLERY_DATA)
  const idx = current.items.findIndex((i) => i.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Gallery item not found' })
  }
  current.items[idx] = { ...current.items[idx], ...req.body }
  writeJsonFile(galleryFilePath, current)
  res.json({ success: true, item: current.items[idx] })
})

app.post('/api/gallery/reset', (req, res) => {
  writeJsonFile(galleryFilePath, DEFAULT_GALLERY_DATA)
  res.json({ success: true, data: DEFAULT_GALLERY_DATA })
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

app.listen(PORT, () => {
  console.log(`✨ Tanah Kitchen & Bar Server running on http://localhost:${PORT}`)
  console.log(`📁 Serving static assets from ${DIST_DIR}`)
  console.log(`📸 Uploads directory ready at ${UPLOADS_DIR}`)
})
