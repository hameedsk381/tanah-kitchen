import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    date: { type: String, required: true },
    time: { type: String, required: true, trim: true, maxlength: 20 },
    guests: { type: String, required: true, trim: true, maxlength: 40 },
    seatingPreference: { type: String, trim: true, maxlength: 60, default: '' },
    notes: { type: String, trim: true, maxlength: 500, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      index: true
    }
  },
  { timestamps: true }
)

export const Reservation = mongoose.model('Reservation', ReservationSchema)
