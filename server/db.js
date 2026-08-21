import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { MenuItem } from './models/MenuItem.js'
import { BentoSlot } from './models/BentoSlot.js'
import { GalleryItem } from './models/GalleryItem.js'
import { AdminUser } from './models/AdminUser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const SRC_DATA_DIR = path.join(ROOT_DIR, 'src', 'data')

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
    // 1. Seed Default Admin User
    const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
    const defaultPassword = process.env.ADMIN_PASSWORD || 'tanah@2025'
    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@tanahkitchen.in'

    const existingAdmin = await AdminUser.findOne({ username: defaultUsername })
    if (!existingAdmin) {
      await AdminUser.create({
        username: defaultUsername,
        password: defaultPassword,
        email: defaultEmail,
        name: 'Tanah Administrator',
        role: 'Super Admin'
      })
      console.log(`🔑 Seeded default admin credentials -> Username: "${defaultUsername}", Password: "${defaultPassword}"`)
    }

    // 2. Seed Menu Items into MongoDB
    const menuCount = await MenuItem.countDocuments()
    if (menuCount === 0) {
      const menuJsonPath = path.join(SRC_DATA_DIR, 'menu.json')
      if (fs.existsSync(menuJsonPath)) {
        const rawMenu = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'))
        if (rawMenu.items && rawMenu.items.length > 0) {
          await MenuItem.insertMany(rawMenu.items)
          console.log(`✓ Seeded ${rawMenu.items.length} dishes into MongoDB collection`)
        }
      }
    }

    // 3. Seed Bento Slots into MongoDB
    const bentoCount = await BentoSlot.countDocuments()
    if (bentoCount === 0) {
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
      await BentoSlot.insertMany(DEFAULT_BENTO_ITEMS)
      console.log('✓ Seeded 6 Bento slots into MongoDB collection')
    }

    // 4. Seed Gallery Items into MongoDB
    const galleryCount = await GalleryItem.countDocuments()
    if (galleryCount === 0) {
      const galleryJsonPath = path.join(SRC_DATA_DIR, 'gallery.json')
      if (fs.existsSync(galleryJsonPath)) {
        const rawGallery = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'))
        if (rawGallery.items && rawGallery.items.length > 0) {
          await GalleryItem.insertMany(rawGallery.items)
          console.log(`✓ Seeded ${rawGallery.items.length} gallery items into MongoDB collection`)
        }
      }
    }
  } catch (err) {
    console.error('Error during MongoDB auto-seeding:', err)
  }
}
