import mongoose from 'mongoose'

const MenuItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Lunch'
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    desc: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: '/assets/Tanha Food/food-1.webp'
    },
    tags: {
      type: [String],
      default: []
    },
    special: {
      type: Boolean,
      default: false
    },
    nonVeg: {
      type: Boolean,
      default: false
    },
    pairing: {
      type: String,
      default: ''
    },
    profile: {
      earthy: { type: Number, default: 50 },
      smoky: { type: Number, default: 40 },
      sweet: { type: Number, default: 20 },
      spicy: { type: Number, default: 10 }
    }
  },
  {
    timestamps: true
  }
)

export const MenuItem = mongoose.model('MenuItem', MenuItemSchema)
