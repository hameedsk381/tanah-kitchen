import mongoose from 'mongoose'

const BentoSlotSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    slot: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 6,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Wood-Fired Hearth'
    },
    price: {
      type: Number,
      required: true,
      default: 499
    },
    tag: {
      type: String,
      default: '★ SIGNATURE'
    },
    isVeg: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    pairing: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

export const BentoSlot = mongoose.model('BentoSlot', BentoSlotSchema)
