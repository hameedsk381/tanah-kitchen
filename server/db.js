import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { Content } from './models/Content.js'
import { AdminUser } from './models/AdminUser.js'
import { getAdminConfig } from './config/admin.js'
import { loadMenuSeed, loadGallerySeed, loadBentoSeed } from './lib/seed.js'

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
    
    // Note: Menu, Gallery, Bento, and CMS Content are no longer auto-seeded on startup.
    // The database is the strict source of truth. If empty, the user can use the 
    // "Reset" buttons in the Admin Panel to manually import factory defaults.
  } catch (err) {
    console.error('Error during MongoDB auto-seeding:', err)
  }
}
