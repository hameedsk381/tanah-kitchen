import 'dotenv/config'
import path from 'path'
import mongoose from 'mongoose'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { seedDefaults, DEFAULT_SEED_DIR } from './lib/seed.js'

// Usage: node server/importSeed.js [seedDir]   (default: server/data)
// Manual import: adds any missing menu, bento and gallery documents; never overwrites or deletes.
const dir = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SEED_DIR
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Connected to database "${mongoose.connection.name}"`)
  await seedDefaults({ dir })

  const [m, b, g] = await Promise.all([MenuItem.countDocuments(), BentoSlot.countDocuments(), GalleryItem.countDocuments()])
  console.log(`Totals now: ${m} menu items, ${b} bento slots, ${g} gallery items`)
  await mongoose.disconnect()
} catch (err) {
  console.error('Import failed:', err.message)
  process.exit(1)
}
