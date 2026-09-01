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
        email: adminConfig.email,
        name: 'Tanah Administrator',
        role: 'Super Admin'
      })
      console.log(`🔑 Initialized admin user account for: ${adminConfig.username}`)
    } else if (adminCount === 0) {
      console.warn('⚠️ Skipping admin seed — set ADMIN_PASSWORD to create the initial admin user')
    }

    // 2. Seed Menu Items into MongoDB
    const menuCount = await MenuItem.countDocuments()
    if (menuCount === 0) {
      const rawMenu = loadMenuSeed()
      if (rawMenu?.items?.length) {
        await MenuItem.insertMany(rawMenu.items)
        console.log(`✓ Seeded ${rawMenu.items.length} dishes into MongoDB collection`)
      }
    }

    // 3. Seed Bento Slots into MongoDB
    const bentoCount = await BentoSlot.countDocuments()
    if (bentoCount === 0) {
      const bentoSeed = loadBentoSeed()
      if (bentoSeed && bentoSeed.items && bentoSeed.items.length) {
        await BentoSlot.insertMany(bentoSeed.items)
        console.log(`✓ Seeded ${bentoSeed.items.length} Bento Slots into MongoDB`)
      }
    }

    // 4. Seed Gallery Items into MongoDB
    const galleryCount = await GalleryItem.countDocuments()
    if (galleryCount === 0) {
      const rawGallery = loadGallerySeed()
      if (rawGallery?.items?.length) {
        await GalleryItem.insertMany(rawGallery.items)
        console.log(`✓ Seeded ${rawGallery.items.length} gallery items into MongoDB collection`)
      }
    }

    // 5. Seed CMS Content into MongoDB
    const contentCount = await Content.countDocuments()
    if (contentCount === 0) {
      const defaultContact = {
        phoneNumbers: ['+91-8977730291', '+91-8977730292'],
        whatsappNumber: '+91-8977730291',
        email: 'reservations@tanahkitchen.com',
        address: 'Sy no 43, 44 & 45, Khajaguda Hills, beside Lanco Hills Road, Chitrapuri Colony, Hyderabad, Telangana 500104'
      }
      await Content.create({ key: 'contact', value: defaultContact })
      console.log('✓ Seeded default CMS Content (contact) into MongoDB')
    }
  } catch (err) {
    console.error('Error during MongoDB auto-seeding:', err)
  }
}
