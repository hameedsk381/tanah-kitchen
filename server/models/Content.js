import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now }
})

export const Content = mongoose.model('Content', contentSchema)
