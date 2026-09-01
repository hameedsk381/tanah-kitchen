import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Users, CheckCircle } from 'lucide-react'

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
]

const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests']

const NAME_PATTERN = /^[a-zA-Z\s'\-]{2,80}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

export default function Reservation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    notes: '',
  })

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const errs = {}
    if (!NAME_PATTERN.test(form.name.trim())) {
      errs.name = 'Please enter a valid name (letters, spaces, hyphens only).'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.date) {
      errs.date = 'Please select a date.'
    }
    if (!form.time) {
      errs.time = 'Please select a time slot.'
    }
    if (!form.guests) {
      errs.guests = 'Please select party size.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28"
      style={{ 
        background: 'var(--color-forest-dark)'
      }}
      aria-labelledby="reservation-heading"
    >
      {/* Background Image / Nature background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/images/reservation_bg.png"
          alt="Earthy garden dining background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--color-forest-dark) 0%, transparent 50%, var(--color-forest-dark) 100%)',
          }}
        />
      </div>

      <div 
        className="px-8 relative z-10"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Brand Invitation */}
          <div className="lg:col-span-5">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-4"
              style={{ color: 'var(--color-terracotta-light)' }}
            >
              Table Reservations
            </span>
            <h2
              id="reservation-heading"
              className="font-display leading-tight mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                color: 'var(--color-cream)'
              }}
            >
              Reserve <br />
              <span className="" style={{ color: 'var(--color-terracotta-light)' }}>Your Table</span>
            </h2>
            <p
              className="text-base font-light mb-10 leading-relaxed"
              style={{ color: 'var(--color-beige)', opacity: 0.9 }}
            >
              Secure an evening of slow-crafted dining, where each dish celebrates the relationship between soil, farmer, and chef.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Operating Hours', desc: 'Tuesday – Sunday | 12:00 PM – 11:00 PM' },
                { title: 'Special Notes', desc: 'Pre-booking recommended. Earthy and smart casual attire welcomed.' }
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 pl-6" style={{ borderColor: 'var(--color-terracotta)' }}>
                  <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-cream)' }}>
                    {item.title}
                  </h4>
                  <p className="text-xs font-light tracking-wide mt-1" style={{ color: 'var(--color-beige)', opacity: 0.8 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Booking Card */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center rounded-3xl"
                style={{ 
                  background: 'rgba(255, 253, 248, 0.03)',
                  border: '1px solid rgba(255, 253, 248, 0.1)'
                }}
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--color-terracotta-light)' }} />
                <h3 className="font-display text-3xl font-bold mb-4 text-white">
                  Table Reserved Successfully
                </h3>
                <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'var(--color-beige)' }}>
                  Thank you, <span className="font-semibold text-white">{form.name}</span>. We have saved a table for your party of <span className="font-semibold text-white">{form.guests}</span> on <span className="font-semibold text-white">{form.date}</span> at <span className="font-semibold text-white">{form.time}</span>. A confirmation details list has been dispatched to <span className="font-semibold text-white">{form.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                >
                  Book Another Table
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-12 space-y-6 rounded-3xl"
                style={{
                  background: 'rgba(27, 67, 50, 0.65)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 253, 248, 0.08)',
                }}
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input-light"
                      maxLength={80}
                    />
                    {errors.name && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta-light)' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="form-input-light"
                      maxLength={120}
                    />
                    {errors.email && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta-light)' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                      Select Date
                    </label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                      className="form-input-light"
                      style={{ colorScheme: 'dark' }}
                    />
                    {errors.date && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta-light)' }}>
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                      Select Time
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="form-input-light"
                      style={{ height: '54px' }}
                    >
                      <option value="" className="bg-forest">Time Slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-forest">{slot}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta-light)' }}>
                        {errors.time}
                      </span>
                    )}
                  </div>

                  {/* Party Size */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                      Party Size
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="form-input-light"
                      style={{ height: '54px' }}
                    >
                      <option value="" className="bg-forest">Guests</option>
                      {guestOptions.map((g) => (
                        <option key={g} value={g} className="bg-forest">{g}</option>
                      ))}
                    </select>
                    {errors.guests && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta-light)' }}>
                        {errors.guests}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-white/70">
                    Special Notes / Dietary Requirements
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Allergies, celebrations, special seating requests..."
                    className="form-input-light resize-none"
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-center justify-center py-4 mt-4"
                >
                  Confirm Table Booking
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
