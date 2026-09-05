import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB, isDbConnected } from './db.js'
import { requireAdmin } from './middleware/auth.js'
import { requireAdminAndDb } from './lib/requireDb.js'
import { validateAdminConfig, getAdminConfig } from './config/admin.js'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { AdminUser } from './models/AdminUser.js'
import { Content } from './models/Content.js'
import { Storage } from '@google-cloud/storage'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

validateAdminConfig()

// Directories
const ROOT_DIR = path.resolve(__dirname, '..')
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// ── GOOGLE CLOUD STORAGE CONFIGURATION ──
let gcsBucket = null
let gcsBucketName = process.env.GCS_BUCKET_NAME || process.env.GCP_STORAGE_BUCKET || process.env.GCS_STORAGE_BUCKET || ''

try {
  const gcsOptions = {}

  const projectId = process.env.GCS_PROJECT_ID || process.env.GCP_PROJECT_ID
  if (projectId) {
    gcsOptions.projectId = projectId
  }

  const clientEmail = process.env.GCS_CLIENT_EMAIL || process.env.GCP_CLIENT_EMAIL
  const privateKey = (process.env.GCS_PRIVATE_KEY || process.env.GCP_PRIVATE_KEY || '').replace(/\\n/g, '\n')

  if (clientEmail && privateKey) {
    gcsOptions.credentials = {
      client_email: clientEmail,
      private_key: privateKey
    }
  } else if (process.env.GCP_SERVICE_ACCOUNT_KEY || process.env.GCS_SERVICE_ACCOUNT_KEY) {
    try {
      gcsOptions.credentials = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY || process.env.GCS_SERVICE_ACCOUNT_KEY)
    } catch (e) {
      console.warn('⚠️ Could not parse service account JSON:', e.message)
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



// Middleware: Enable Gzip / Brotli Compression
app.use(compression())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://tanahkitchen.com',
    'https://www.tanahkitchen.com',
    'https://tanah-kitchen.vercel.app'
  ],
  credentials: true
}))
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
  const adminConfig = getAdminConfig()

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

  // 2. Environment credential fallback (when MongoDB is offline or no admin user yet)
  if (
    adminConfig &&
    (cleanUser === adminConfig.username || cleanUser === adminConfig.email) &&
    password === adminConfig.password
  ) {
    const token = Buffer.from(`${adminConfig.username}:${Date.now()}`).toString('base64')
    return res.json({
      success: true,
      token,
      user: {
        username: adminConfig.username,
        email: adminConfig.email,
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

    const adminConfig = getAdminConfig()
    if (adminConfig && username.toLowerCase() === adminConfig.username) {
      return res.json({
        success: true,
        user: {
          username: adminConfig.username,
          email: adminConfig.email,
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

app.post('/api/auth/change-password', requireAdmin, async (req, res) => {
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

// Require admin auth + MongoDB for all CMS mutations (GET routes remain public)
const protectMutation = requireAdminAndDb(requireAdmin)
app.use('/api/menu', (req, res, next) => {
  if (req.method === 'GET') return next()
  return protectMutation(req, res, next)
})
app.use('/api/bento', (req, res, next) => {
  if (req.method === 'GET') return next()
  return protectMutation(req, res, next)
})
app.use('/api/gallery', (req, res, next) => {
  if (req.method === 'GET') return next()
  return protectMutation(req, res, next)
})
app.use('/api/content', (req, res, next) => {
  if (req.method === 'GET') return next()
  return protectMutation(req, res, next)
})

// ── NEW CMS CONTENT APIs ──
app.get('/api/content/:key', async (req, res) => {
  try {
    if (!isDbConnected()) return res.json({})
    const content = await Content.findOne({ key: req.params.key }).lean()
    return res.json(content ? content.data : {})
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' })
  }
})

app.put('/api/content/:key', async (req, res) => {
  try {
    const updated = await Content.findOneAndUpdate(
      { key: req.params.key },
      { data: req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    )
    res.json({ success: true, data: updated.data })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content' })
  }
})

// ── RESERVATION API ──
app.post('/api/reservations', async (req, res) => {
  // Save to DB and stub webhook
  try {
    const reservation = req.body
    
    // Stub logging as webhook
    console.log(`🛎️ New Reservation Request: ${reservation.name} for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}`)
    
    // Here we'd save it to a Reservation model, but for now we just acknowledge it
    res.status(201).json({ success: true, message: 'Reservation received successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit reservation' })
  }
})


// ── 1. MENU APIs (MongoDB with Instant Fallback & Deduplication) ──
app.get('/api/menu', async (req, res) => {
  try {
    let categories = []
    let config = {
      chefRecommendationsTitle: "CHEF RECOMMENDATIONS",
      chefRecommendationsSubtitle: "Signature Highlights"
    }
    
    if (isDbConnected()) {
      const catContent = await Content.findOne({ key: 'menu-categories' }).lean()
      if (catContent && catContent.data && catContent.data.categories) {
        categories = catContent.data.categories
      }

      const confContent = await Content.findOne({ key: 'menu-config' }).lean()
      if (confContent && confContent.data) {
        config = { ...config, ...confContent.data }
      }

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
        return res.json({ categories, items: uniqueItems, config })
      }
    }

    res.json({ categories, items: [], config })
  } catch (err) {
    console.error('Menu fetch error:', err)
    res.status(500).json({ error: 'Failed to retrieve menu' })
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
    const created = await MenuItem.create(newItemData)
    return res.status(201).json({ success: true, item: created })
  } catch (err) {
    console.error('Menu item create error:', err)
    res.status(500).json({ error: 'Failed to save dish' })
  }
})

app.put('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const updated = await MenuItem.findOneAndUpdate({ id }, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: 'Dish not found' })
    }
    return res.json({ success: true, item: updated })
  } catch (err) {
    console.error('Menu item update error:', err)
    res.status(500).json({ error: 'Failed to update dish' })
  }
})

app.delete('/api/menu/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await MenuItem.deleteOne({ id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Dish not found' })
    }
    res.json({ success: true, message: `Dish ${id} deleted` })
  } catch (err) {
    console.error('Menu item delete error:', err)
    res.status(500).json({ error: 'Failed to delete dish' })
  }
})

app.get('/api/bento', async (req, res) => {
  try {
    if (isDbConnected()) {
      const slots = await BentoSlot.find().sort({ slot: 1 }).lean()
      if (slots && slots.length > 0) {
        return res.json(slots)
      }
    }
    res.json([])
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
    await BentoSlot.deleteMany({})
    await BentoSlot.insertMany(req.body)
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
    const updated = await BentoSlot.findOneAndUpdate(
      { slot: slotNumber },
      req.body,
      { new: true, upsert: true }
    )
    return res.json({ success: true, slot: updated })
  } catch (err) {
    console.error('Bento slot update error:', err)
    res.status(500).json({ error: 'Failed to update Bento slot' })
  }
})

app.get('/api/gallery', async (req, res) => {
  try {
    let categories = []
    
    if (isDbConnected()) {
      const content = await Content.findOne({ key: 'gallery-categories' }).lean()
      if (content && content.data && content.data.categories) {
        categories = content.data.categories
      }

      const items = await GalleryItem.find().lean()
      if (items && items.length > 0) {
        return res.json({ categories, items })
      }
    }

    res.json({ categories, items: [] })
  } catch (err) {
    console.error('Gallery fetch error:', err)
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
    const created = await GalleryItem.create(newItemData)
    return res.status(201).json({ success: true, item: created })
  } catch (err) {
    console.error('Gallery item create error:', err)
    res.status(500).json({ error: 'Failed to create gallery photo' })
  }
})

app.put('/api/gallery/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const updated = await GalleryItem.findOneAndUpdate({ id }, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: 'Gallery photo not found' })
    }
    return res.json({ success: true, item: updated })
  } catch (err) {
    console.error('Gallery item update error:', err)
    res.status(500).json({ error: 'Failed to update gallery photo' })
  }
})

app.delete('/api/gallery/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await GalleryItem.deleteOne({ id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Gallery photo not found' })
    }
    res.json({ success: true, message: `Gallery item ${id} deleted` })
  } catch (err) {
    console.error('Gallery item delete error:', err)
    res.status(500).json({ error: 'Failed to delete gallery photo' })
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

app.post('/api/upload', requireAdmin, upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' })
  }

  const filename = req.file.filename
  const localFilePath = path.join(UPLOADS_DIR, filename)

  if (!gcsBucket) {
    // Delete local temp file immediately
    try { if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); } catch (e) {}
    return res.status(500).json({
      error: 'Google Cloud Storage is not configured. Local disk storage is disabled per policy.'
    })
  }

  try {
    const destination = `uploads/${filename}`
    await gcsBucket.upload(localFilePath, {
      destination,
      metadata: {
        contentType: req.file.mimetype,
        cacheControl: 'public, max-age=31536000, immutable'
      }
    })

    // Immediately clean up local temp file
    try { if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); } catch (e) {}

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
    console.error('❌ GCS upload failed:', gcsErr.message)
    try { if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); } catch (e) {}
    return res.status(500).json({
      error: `Failed to upload to Google Cloud Storage (${gcsBucketName}): ${gcsErr.message}`
    })
  }
})

app.get('/api/uploads', requireAdmin, async (req, res) => {
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
          if (!filename || filename === 'uploads' || !filename.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) continue
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
        if (filename.startsWith('.') || seen.has(filename) || !filename.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) continue
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
