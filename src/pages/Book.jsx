import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Calendar, Clock, Users, Phone, Mail, MapPin, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import CorporatePackagesSection from '../components/CorporatePackagesSection'

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
]

const partySizes = [
  '1 Guest', '2 Guests', '3 Guests', '4 Guests', '5-6 Guests', '7-10 Guests', '10+ Guests (Corporate)'
]

export default function Book() {
  const [activeMode, setActiveMode] = useState('table') // 'table' | 'corporate'
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '7:30 PM',
    guests: '2 Guests',
    notes: '',
    seatingPreference: 'Rooftop Open-Air'
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
    if (!form.name.trim()) errs.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!form.phone.trim() || form.phone.trim().length < 8) errs.phone = 'Please enter a valid phone number.'
    if (!form.date) errs.date = 'Please choose a date.'
    if (!form.time) errs.time = 'Please select a preferred time.'
    if (!form.guests) errs.guests = 'Please select party size.'
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
    <main className="flex-grow pt-24 bg-[#FAF6F0] text-[#3A2E2A]">
      <SEO
        title="Reserve a Table & Corporate Dining | Tanah Kitchen & Bar Hyderabad"
        description="Book your table or host corporate dining events at Tanah Kitchen & Bar in Gachibowli. Select party size, date, time slots, and customized corporate dining packages."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FoodEstablishment',
          'name': 'Tanah Kitchen & Bar Reservations',
          'url': 'https://tanahkitchen.in/book'
        }}
      />

      {/* ── 1. Page Header (Spacious Luxury Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-[#FFC470]/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/Tanha Ambiance/Ambiance-25.webp"
            alt="Rooftop dining ambiance at Tanah Kitchen & Bar"
            className="w-full h-full object-cover filter brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E0C] via-[#6B2523]/50 to-[#2A0E0C]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="wp-badge wp-badge-gold">
              ✦ RESERVATIONS &amp; PRIVATE DINING ✦
            </span>
          </div>

          <h1
            className="font-display font-extrabold text-[#F6E1CB] leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Reserve Your Experience
          </h1>

          <div className="w-20 h-[2px] bg-[#FFC470]/60 mx-auto rounded-full" />

          <p className="text-sm md:text-base font-light text-[#EFE1D0]/90 max-w-xl mx-auto font-body leading-relaxed">
            Experience wood-fired gastronomy, crafted mixology, and panoramic rooftop ambience in Gachibowli, Hyderabad.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveMode('table')
                document.getElementById('booking-form-card')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
                activeMode === 'table'
                  ? 'bg-[#FFC470] text-[#6B2523]'
                  : 'bg-white/10 text-[#F6E1CB] hover:bg-white/20 border border-white/15'
              }`}
            >
              🍽️ Table Reservation (1–10 Guests)
            </button>

            <a
              href="#corporate-packages"
              onClick={() => setActiveMode('corporate')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
                activeMode === 'corporate'
                  ? 'bg-[#FFC470] text-[#6B2523]'
                  : 'bg-white/10 text-[#F6E1CB] hover:bg-white/20 border border-white/15'
              }`}
            >
              💼 Corporate Packages (25+ Guests)
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Spacious Booking Form & Information Section ── */}
      <section id="booking-form-card" className="py-14 sm:py-20 px-6 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Venue Details & Hours */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B2523]/15 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#882B06] block mb-1">
                  SANCTUARY LOCATION
                </span>
                <h3 className="font-display font-bold text-2xl text-[#6B2523]">
                  Tanah Kitchen &amp; Bar
                </h3>
                <p className="text-xs text-[#3A2E2A]/75 mt-1.5 leading-relaxed">
                  5th Floor, Opp. Meenakshi Bamboos Road, Near AIG Hospital, P Janardhan Reddy Nagar, Gachibowli, Hyderabad – 500032.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#6B2523]/10 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#3A2E2A]/70 font-semibold">Lunch Hours</span>
                  <span className="font-bold text-[#6B2523]">12:00 PM – 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#3A2E2A]/70 font-semibold">Dinner Hours</span>
                  <span className="font-bold text-[#6B2523]">6:30 PM – 11:30 PM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#3A2E2A]/70 font-semibold">Valet Parking</span>
                  <span className="font-bold text-emerald-700">Complimentary</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#3A2E2A]/70 font-semibold">Direct Desk</span>
                  <a href="tel:+918977730291" className="font-bold text-[#882B06] hover:underline">
                    +91 89777 30291
                  </a>
                </div>
              </div>

              {/* Photo Card */}
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-[#6B2523]/15 shadow-sm">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-8.webp"
                  alt="Rooftop terrace seating at Tanah"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10 text-xs text-[#3A2E2A]/85 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#882B06] flex-shrink-0" />
                <span>Instant reservation confirmation via SMS &amp; Email.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Spacious Reservation Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-10 sm:p-12 rounded-3xl bg-white text-center space-y-6 shadow-xl border border-[#6B2523]/15"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-[#6B2523]">
                    Reservation Requested!
                  </h3>
                  <p className="text-sm font-light text-[#3A2E2A]/80 max-w-md mx-auto leading-relaxed font-body">
                    Thank you, <strong className="text-[#6B2523]">{form.name}</strong>. We have reserved a table for your party of <strong className="text-[#6B2523]">{form.guests}</strong> on <strong className="text-[#6B2523]">{form.date}</strong> at <strong className="text-[#6B2523]">{form.time}</strong> ({form.seatingPreference}).
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({
                          name: '',
                          email: '',
                          phone: '',
                          date: '',
                          time: '7:30 PM',
                          guests: '2 Guests',
                          notes: '',
                          seatingPreference: 'Rooftop Open-Air'
                        })
                      }}
                      className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] text-xs font-bold tracking-wider uppercase cursor-pointer"
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
                  className="p-8 sm:p-10 bg-white rounded-3xl space-y-6 shadow-xl text-left border border-[#6B2523]/15 text-[#3A2E2A]"
                >
                  <div className="border-b border-[#6B2523]/10 pb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#882B06] block mb-1">
                      ONLINE TABLE RESERVATION
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#6B2523]">
                      Book Your Rooftop Table
                    </h3>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:border-[#6B2523] bg-[#FAF6F0]/40"
                      />
                      {errors.name && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:border-[#6B2523] bg-[#FAF6F0]/40"
                      />
                      {errors.phone && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:border-[#6B2523] bg-[#FAF6F0]/40"
                    />
                    {errors.email && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.email}</span>}
                  </div>

                  {/* Date, Time & Party Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#6B2523]/20 text-xs sm:text-sm focus:outline-none bg-white"
                      />
                      {errors.date && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.date}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#6B2523]/20 text-xs sm:text-sm focus:outline-none bg-white"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                        Party Size *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#6B2523]/20 text-xs sm:text-sm focus:outline-none bg-white"
                      >
                        {partySizes.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['Rooftop Open-Air', 'Covered Bamboo Nest', 'Bar High-Table'].map((pref) => (
                        <button
                          type="button"
                          key={pref}
                          onClick={() => setForm({ ...form, seatingPreference: pref })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            form.seatingPreference === pref
                              ? 'border-[#6B2523] bg-[#6B2523] text-[#FFC470] shadow-xs'
                              : 'border-[#6B2523]/15 bg-white text-[#3A2E2A] hover:bg-[#FAF6F0]'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1.5">
                      Special Dietary or Occasion Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Birthday celebration, anniversary, allergy notes, quiet corner preference..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none bg-[#FAF6F0]/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] hover:text-white shadow-lg w-full py-4 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all"
                  >
                    Confirm Table Reservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── 3. Corporate Packages Section (Distinct, Airy & Clean) ── */}
      <div className="border-t border-[#6B2523]/15">
        <CorporatePackagesSection />
      </div>
    </main>
  )
}
