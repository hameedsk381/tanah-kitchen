import 'dotenv/config';
import mongoose from 'mongoose';

// Seeders
import { loadMenuSeed, loadBentoSeed, loadGallerySeed } from './server/lib/seed.js';

// Models
import { MenuItem } from './server/models/MenuItem.js';
import { BentoSlot } from './server/models/BentoSlot.js';
import { GalleryItem } from './server/models/GalleryItem.js';
import { Content } from './server/models/Content.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen';

async function seedDatabase() {
  try {
    console.log(`⏳ Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB!');

    console.log('\n⏳ Seeding Menu Items...');
    const menuData = loadMenuSeed();
    if (menuData && menuData.items) {
      await MenuItem.deleteMany({});
      await MenuItem.insertMany(menuData.items);
      console.log('✅ Seeded ' + menuData.items.length + ' menu items.');
    }

    console.log('\n⏳ Seeding Bento Grid...');
    const bentoData = loadBentoSeed();
    if (bentoData && bentoData.slots) {
      await BentoSlot.deleteMany({});
      await BentoSlot.insertMany(bentoData.slots);
      console.log('✅ Seeded ' + bentoData.slots.length + ' bento slots.');
    }

    console.log('\n⏳ Seeding Gallery...');
    const galleryData = loadGallerySeed();
    if (galleryData && galleryData.items) {
      await GalleryItem.deleteMany({});
      await GalleryItem.insertMany(galleryData.items);
      console.log('✅ Seeded ' + galleryData.items.length + ' gallery items.');
    }

    console.log('\n⏳ Seeding Default CMS Content...');
    const defaultContact = {
      phoneNumbers: ['+91-8977730291', '+91-8977730292'],
      whatsappNumber: '+91-8977730291',
      email: 'reservations@tanahkitchen.com',
      address: 'Sy no 43, 44 & 45, Khajaguda Hills, beside Lanco Hills Road, Chitrapuri Colony, Hyderabad, Telangana 500104'
    };
    await Content.findOneAndUpdate({ key: 'contact' }, { key: 'contact', value: defaultContact }, { upsert: true });
    console.log('✅ Default CMS Content verified.');

    console.log('\n🎉 All data successfully seeded to Production DB!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seedDatabase();
