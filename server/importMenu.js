import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { MenuItem } from './models/MenuItem.js'
import { Content } from './models/Content.js'

// Usage: node server/importMenu.js [path/to/menu.json]
// Adds menu items that don't exist yet (matched by id) and sets categories if none are stored.
// Existing items and categories are never overwritten or deleted.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.resolve(process.argv[2] || path.join(__dirname, 'data', 'menu.json'))
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'

const { items, categories } = JSON.parse(fs.readFileSync(file, 'utf-8'))
if (!Array.isArray(items) || items.length === 0) {
  console.error(`No items found in ${file}`)
  process.exit(1)
}

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Connected to database "${mongoose.connection.name}"`)

  const result = await MenuItem.bulkWrite(
    items.map((item) => ({
      updateOne: { filter: { id: item.id }, update: { $setOnInsert: item }, upsert: true }
    }))
  )
  console.log(`Menu items: ${result.upsertedCount} added, ${items.length - result.upsertedCount} already present`)

  if (Array.isArray(categories) && categories.length > 0) {
    const res = await Content.updateOne(
      { key: 'menu-categories' },
      { $setOnInsert: { key: 'menu-categories', data: { categories } } },
      { upsert: true }
    )
    console.log(res.upsertedCount ? 'Menu categories added' : 'Menu categories already present')
  }

  console.log(`Total menu items now: ${await MenuItem.countDocuments()}`)
  await mongoose.disconnect()
} catch (err) {
  console.error('Import failed:', err.message)
  process.exit(1)
}
