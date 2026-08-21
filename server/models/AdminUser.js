import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

// Compare candidate password with stored hash or plaintext migration
AdminUserSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(candidatePassword, this.password)
  }
  return this.password === candidatePassword
}

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema)
