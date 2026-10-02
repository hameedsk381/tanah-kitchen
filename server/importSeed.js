import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { Content } from './models/Content.js'

// Usage: node server/importSeed.js [seedDir]   (default: server/data)
// Adds menu items, bento slots and gallery items that don't exist yet (matched by id; bento by id or slot),
// and sets category lists if none are stored. Existing documents are never overwritten or deleted.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const seedDir = path.resolve(process.argv[2] || path.join(__dirname, 'data'))
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'

function readSeed(name) {
  const file = path.join(seedDir, name)
  if (!fs.existsSync(file)) {
    console.log(`- ${name} not found in ${seedDir}, skipping`)
    return null
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

async function addMissing(label, Model, docs, filterFor) {
  if (!Array.isArray(docs) || docs.length === 0) return
  const result = await Model.bulkWrite(
    docs.map((doc) => ({
      updateOne: { filter: filterFor(doc), update: { $setOnInsert: doc }, upsert: true }
    }))
  )
  console.log(`${label}: ${result.upsertedCount} added, ${docs.length - result.upsertedCount} already present`)
}

async function setCategories(key, categories) {
  if (!Array.isArray(categories) || categories.length === 0) return
  const res = await Content.updateOne(
    { key },
    { $setOnInsert: { key, data: { categories } } },
    { upsert: true }
  )
  console.log(`${key}: ${res.upsertedCount ? 'added' : 'already present'}`)
}

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Connected to database "${mongoose.connection.name}"`)

  const menu = readSeed('menu.json')
  if (menu) {
    await addMissing('Menu items', MenuItem, menu.items, (d) => ({ id: d.id }))
    await setCategories('menu-categories', menu.categories)
  }

  const bento = readSeed('bento.json')
  if (bento) {
    await addMissing('Bento slots', BentoSlot, bento.items || bento.slots, (d) => ({ $or: [{ id: d.id }, { slot: d.slot }] }))
  }

  const gallery = readSeed('gallery.json')
  if (gallery) {
    const items = (gallery.items || []).map(({ spanClass, ...rest }) => (spanClass ? { ...rest, span: spanClass } : rest))
    await addMissing('Gallery items', GalleryItem, items, (d) => ({ id: d.id }))
    await setCategories('gallery-categories', gallery.categories)
  }

  const [m, b, g] = await Promise.all([MenuItem.countDocuments(), BentoSlot.countDocuments(), GalleryItem.countDocuments()])
  console.log(`Totals now: ${m} menu items, ${b} bento slots, ${g} gallery items`)
  await mongoose.disconnect()
} catch (err) {
  console.error('Import failed:', err.message)
  process.exit(1)
}
