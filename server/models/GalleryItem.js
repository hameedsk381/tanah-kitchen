import mongoose from 'mongoose'

const GalleryItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      default: 'Ambience',
      index: true
    },
    span: {
      type: String,
      default: 'col-span-1'
    }
  },
  {
    timestamps: true
  }
)

export const GalleryItem = mongoose.model('GalleryItem', GalleryItemSchema)
