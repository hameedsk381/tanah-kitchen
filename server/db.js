import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { Content } from './models/Content.js'
import { AdminUser } from './models/AdminUser.js'
import { getAdminConfig } from './config/admin.js'
import { seedDefaults } from './lib/seed.js'

let isConnected = false

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:([^:@]{4})[^:@]*@/, ':****@')}`)
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    })
    isConnected = true
    console.log('🍃 MongoDB connected successfully')

    // Auto-seed initial collections and admin credentials if empty
    await autoSeedDatabase()
  } catch (err) {
    isConnected = false
    console.error('❌ MongoDB connection error:', err.message)
  }
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1
}

async function autoSeedDatabase() {
  try {
    // 1. Seed Default Admin User if no admin exists
    const adminConfig = getAdminConfig()
    const adminCount = await AdminUser.countDocuments()
    if (adminCount === 0 && adminConfig) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(adminConfig.password, salt)

      await AdminUser.create({
        username: adminConfig.username,
        password: hashedPassword,
        email: adminConfig.email
      })
      console.log(`🔑 Initialized admin user account for: ${adminConfig.username}`)
    } else if (adminCount === 0) {
      console.warn('⚠️ Skipping admin seed — set ADMIN_PASSWORD to create the initial admin user')
    }

    // Seed default menu/bento/gallery only into empty collections (never overwrites admin changes).
    // Set SEED_ON_STARTUP=false to disable.
    if (process.env.SEED_ON_STARTUP !== 'false') {
      await seedDefaults({ onlyIfEmpty: true, log: (m) => console.log(`🌱 ${m}`) })
    }

    const [menuCount, bentoCount, galleryCount] = await Promise.all([
      MenuItem.countDocuments(),
      BentoSlot.countDocuments(),
      GalleryItem.countDocuments()
    ])
    console.log(`📊 DB "${mongoose.connection.name}": ${menuCount} menu items, ${bentoCount} bento slots, ${galleryCount} gallery items`)
    if (menuCount === 0) {
      console.warn('⚠️ Menu is empty — the public menu will show no items until menu data is added')
    }
  } catch (err) {
    console.error('Error during MongoDB auto-seeding:', err)
  }
}
