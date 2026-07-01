import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

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
    document.title = 'Reserve a Table | Tanah Kitchen & Bar'
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
    <main className="section-light relative flex-grow pt-24 min-h-screen flex items-center overflow-hidden">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/assets/Tanha Image/02.webp"
          alt="Luxury rooftop sanctuary"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Darkened overlay for legibility — rgba(20,10,8,0.5) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(rgba(20,10,8,0.5), rgba(20,10,8,0.5))' }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] px-8 mx-auto w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Informational column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              {/* RESERVATIONS label: #FFC470, bold, tracking */}
              <span
                className="text-[10px] font-bold tracking-[3px] uppercase block"
                style={{ color: '#FFC470' }}
              >
                Reservations
              </span>

              {/* Main heading: warm cream-gold — WebkitTextFillColor bypasses section-light color !important */}
              <h1
                className="font-display leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#F2D9C4',
                  WebkitTextFillColor: '#F2D9C4',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}
              >
                Secure Your<br />
                <span style={{ fontStyle: 'italic', color: '#FFC470', WebkitTextFillColor: '#FFC470' }}>Basalt Table</span>
              </h1>

              {/* Body paragraph: #EFE1D0 at 90% opacity */}
              <p
                className="text-xs sm:text-sm font-light leading-relaxed font-body"
                style={{ color: '#EFE1D0', WebkitTextFillColor: '#EFE1D0', opacity: 0.9 }}
              >
                We look forward to welcoming you to Tanah Kitchen &amp; Bar. Due to the sourcing of fresh daily crops and slow coal embers, reservations are highly recommended.
              </p>
            </div>

            {/* Visual Frame of the Space */}
            <div className="aspect-[16/10] w-full overflow-hidden relative border border-white/10">
              <img
                src="/assets/Tanha Image/11.webp"
                alt="Table reservation guide mutton biryani details"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-3 border border-white/10 pointer-events-none" />
            </div>

            <div className="border-l-2 pl-6 space-y-2" style={{ borderColor: '#FFC470' }}>
              <h4
                className="font-display text-base"
                style={{ color: '#F2D9C4', WebkitTextFillColor: '#F2D9C4', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
              >
                Resort Casual Policy
              </h4>
              <p
                className="text-[11px] font-light leading-relaxed font-body"
                style={{ color: '#EFE1D0', WebkitTextFillColor: '#EFE1D0', opacity: 0.8 }}
              >
                We encourage mindful attire. Smart casual is recommended to complement the premium design and atmosphere.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="p-10 border border-primary-dark/25 bg-white text-center space-y-6"
                >
                  <CheckCircle className="w-12 h-12 text-primary-dark mx-auto animate-pulse-slow" />
                  <h3 className="font-display text-3xl font-bold">
                    Reservation Requested
                  </h3>
                  <p className="text-xs font-light opacity-80 max-w-md mx-auto leading-relaxed font-body">
                    Thank you, <span className="font-semibold">{form.name}</span>. We are saving a basalt table for your party of <span className="font-semibold">{form.guests}</span> on <span className="font-semibold">{form.date}</span> at <span className="font-semibold">{form.time}</span>. A confirmation has been dispatched to your email address.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '', notes: '' }) }}
                      className="btn-primary text-[10px] py-3.5 px-8 cursor-pointer"
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
                  className="p-8 md:p-12 border border-primary-dark/10 bg-[#F6E1CB] space-y-6 shadow-2xl text-left rounded text-[#3A2E2A]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] placeholder:text-[#3A2E2A]/40 focus:bg-white focus:border-primary-dark"
                      />
                      {errors.name && <span className="text-[10px] text-primary-dark block font-semibold">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="89777 30291"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] placeholder:text-[#3A2E2A]/40 focus:bg-white focus:border-primary-dark"
                      />
                      {errors.phone && <span className="text-[10px] text-primary-dark block font-semibold">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] placeholder:text-[#3A2E2A]/40 focus:bg-white focus:border-primary-dark"
                    />
                    {errors.email && <span className="text-[10px] text-primary-dark block font-semibold">{errors.email}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                        Select Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] focus:bg-white focus:border-primary-dark"
                      />
                      {errors.date && <span className="text-[10px] text-primary-dark block font-semibold">{errors.date}</span>}
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                        Select Time
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] focus:bg-white focus:border-primary-dark h-[54px]"
                      >
                        <option value="" className="text-near-black">Choose Time</option>
                        {timeSlots.map(t => <option key={t} value={t} className="text-near-black">{t}</option>)}
                      </select>
                      {errors.time && <span className="text-[10px] text-primary-dark block font-semibold">{errors.time}</span>}
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                        Party Size
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] focus:bg-white focus:border-primary-dark h-[54px]"
                      >
                        <option value="" className="text-near-black">Guests count</option>
                        {partySizes.map(g => <option key={g} value={g} className="text-near-black">{g}</option>)}
                      </select>
                      {errors.guests && <span className="text-[10px] text-primary-dark block font-semibold">{errors.guests}</span>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">
                      Special seating or Dietary notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Allergies, seating requests..."
                      rows={3}
                      className="form-input text-xs bg-white border border-primary-dark/15 text-[#3A2E2A] placeholder:text-[#3A2E2A]/40 focus:bg-white focus:border-primary-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-center text-[10px] py-4 cursor-pointer"
                    style={{ backgroundColor: '#6B2523', borderColor: '#6B2523', color: '#DEC8AB' }}
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
