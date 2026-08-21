import mongoose from 'mongoose'

const AdminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: 'admin@tanahkitchen.in',
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      default: 'Tanah Administrator'
    },
    role: {
      type: String,
      default: 'Super Admin'
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema)
