import 'dotenv/config'
import mongoose from 'mongoose'
import { runBackup } from './lib/backup.js'

// Usage: node server/backup.js [--force]   (run a backup now; --force overwrites this week's file)
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  await runBackup({ force: process.argv.includes('--force') })
  await mongoose.disconnect()
} catch (err) {
  console.error('Backup failed:', err.message)
  process.exit(1)
}
