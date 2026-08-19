import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SEO from '../components/SEO'

const timeSlots = [
  '12:30 PM', '1:00 PM', '1:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
]

const partySizes = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests']

export default function Book() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email.'
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.'
    if (!form.date) errs.date = 'Please select a date.'
    if (!form.time) errs.time = 'Please select a time.'
    if (!form.guests) errs.guests = 'Please select guests count.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    console.log('Table Booking Form Submitted:', form)
    setSubmitted(true)
  }

  return (
    <main className="section-dark relative flex-grow pt-28 min-h-screen flex items-center overflow-hidden">
      <SEO
        title="Reserve a Table & Corporate Dining | Tanah Kitchen & Bar"
        description="Book your table or host corporate dining events at Tanah Kitchen & Bar in Gachibowli. Select party size, date, time slots, and customized corporate dining packages."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FoodEstablishment',
          'name': 'Tanah Kitchen & Bar Reservations',
          'url': 'https://tanahkitchen.in/book',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://tanahkitchen.in/book',
              'actionPlatform': ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform']
            },
            'result': {
              '@type': 'FoodEstablishmentReservation',
              'name': 'Table Reservation'
            }
          }
        }}
      />
      {/* Fullscreen background image with modern dark gradient */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/assets/Tanha Image/02.webp"
          alt="Luxury rooftop sanctuary"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2A]/95 via-[#6B2523]/80 to-[#6B2523]/90" />
      </div>

      <div className="relative z-10 wp-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Informational column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <span className="wp-badge wp-badge-gold">
                ✦ RESERVATIONS ✦
              </span>

              <h1
                className="font-display font-extrabold leading-tight text-[#F6E1CB]"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
              >
                Secure Your<br />
                <span className="italic font-normal text-[#FFC470]">Basalt Table</span>
              </h1>

              <div className="w-16 h-[2px] bg-[#FFC470]/60 rounded-full" />

              <p className="text-sm font-light leading-relaxed font-body text-[#EFE1D0]/90">
                We look forward to welcoming you to Tanah Kitchen &amp; Bar. Due to the sourcing of fresh daily crops and slow coal embers, reservations are highly recommended.
              </p>
            </div>

            {/* Visual Frame of the Space */}
            <div className="aspect-[16/10] w-full overflow-hidden relative border border-white/10 shadow-2xl rounded-2xl group">
              <img
                src="/assets/Tanha Ambiance/Ambiance-25.webp"
                alt="Atmospheric rooftop dining experience at Tanah"
                className="w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <h4 className="font-display text-base font-bold text-[#FFC470]">
                Resort Casual Policy
              </h4>
              <p className="text-xs font-light leading-relaxed font-body text-[#EFE1D0]/80">
                We encourage mindful attire. Smart casual is recommended to complement the premium design and atmosphere.
              </p>
            </div>
          </div>

          {/* Form column (WordPress Card Style) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-10 rounded-3xl bg-white text-center space-y-6 shadow-2xl border border-[#6B2523]/10"
                >
                  <CheckCircle className="w-16 h-16 text-[#6B2523] mx-auto" />
                  <h3 className="font-display text-3xl font-bold text-[#6B2523]">
                    Reservation Requested
                  </h3>
                  <p className="text-sm font-light text-[#3A2E2A]/80 max-w-md mx-auto leading-relaxed font-body">
                    Thank you, <span className="font-semibold text-[#6B2523]">{form.name}</span>. We are saving a basalt table for your party of <span className="font-semibold text-[#6B2523]">{form.guests}</span> on <span className="font-semibold text-[#6B2523]">{form.date}</span> at <span className="font-semibold text-[#6B2523]">{form.time}</span>. A confirmation has been dispatched to your email address.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '', notes: '' }) }}
                      className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] text-xs font-bold"
                    >
                      Book Another Table
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-8 md:p-12 bg-white rounded-3xl space-y-5 shadow-2xl text-left border border-[#6B2523]/10 text-[#3A2E2A]"
                >
                  <div>
                    <span className="wp-badge wp-badge-maroon mb-2">
                      ONLINE BOOKING
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[#6B2523]">
                      Reserve Your Experience
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="wp-form-input text-sm"
                      />
                      {errors.name && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="89777 30291"
                        className="wp-form-input text-sm"
                      />
                      {errors.phone && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="wp-form-input text-sm"
                    />
                    {errors.email && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.email}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date */}
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="wp-form-input text-sm h-[48px]"
                      />
                      {errors.date && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.date}</span>}
                    </div>

                    {/* Time */}
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="wp-form-input text-sm h-[48px]"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.time && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.time}</span>}
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Party Size *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="wp-form-input text-sm h-[48px]"
                      >
                        <option value="">Guests Count</option>
                        {partySizes.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      {errors.guests && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.guests}</span>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                      Special Seating or Dietary Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Allergies, rooftop seating preference, anniversary..."
                      rows={3}
                      className="wp-form-input text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] hover:text-white shadow-lg w-full py-4 text-xs font-bold tracking-widest mt-2"
                  >
                    Send Reservation Request
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  )
}
