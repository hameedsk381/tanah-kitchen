import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Calendar, Clock, Users, Phone, Mail, MapPin, Sparkles, ChevronRight, ChevronDown, Check, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import CorporatePackagesSection from '../components/CorporatePackagesSection'

const timeSlots = [
  // Lunch Slots
  { slot: '12:00 PM', period: 'Lunch' },
  { slot: '12:30 PM', period: 'Lunch' },
  { slot: '1:00 PM', period: 'Lunch' },
  { slot: '1:30 PM', period: 'Lunch' },
  { slot: '2:00 PM', period: 'Lunch' },
  { slot: '2:30 PM', period: 'Lunch' },
  { slot: '3:00 PM', period: 'Lunch' },
  { slot: '3:30 PM', period: 'Lunch' },
  // Dinner Slots
  { slot: '6:30 PM', period: 'Dinner' },
  { slot: '7:00 PM', period: 'Dinner' },
  { slot: '7:30 PM', period: 'Dinner' },
  { slot: '8:00 PM', period: 'Dinner' },
  { slot: '8:30 PM', period: 'Dinner' },
  { slot: '9:00 PM', period: 'Dinner' },
  { slot: '9:30 PM', period: 'Dinner' },
  { slot: '10:00 PM', period: 'Dinner' },
  { slot: '10:30 PM', period: 'Dinner' },
  { slot: '11:00 PM', period: 'Dinner' }
]

const partySizes = [
  '1 Guest', '2 Guests', '3 Guests', '4 Guests', '5-6 Guests', '7-10 Guests', '10+ Guests (Corporate)'
]

export default function Book() {
  const [activeMode, setActiveMode] = useState('table') // 'table' | 'corporate'
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  const timeDropdownRef = useRef(null)

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

    const handleClickOutside = (event) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setTimeDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
    <main className="flex-grow pt-24 bg-[#FAF8F5] text-[#1E1B18]">
      <SEO
        title="Reserve a Table & Corporate Dining | Tanah Kitchen & Bar Hyderabad"
        description="Book your table or host corporate dining events at Tanah Kitchen & Bar in Gachibowli. Select party size, date, time slots, and customized corporate dining packages."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FoodEstablishment',
          'name': 'Tanah Kitchen & Bar Reservations',
          'url': 'https://tanahkitchen.com/book'
        }}
      />

      {/* ── 1. Page Header (Spacious Luxury Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-[#E5E2DC]/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/Tanha Ambiance/Ambiance-25.webp"
            alt="Rooftop dining ambiance at Tanah Kitchen & Bar"
            className="w-full h-full object-cover filter brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E0C] via-[#5E332E]/50 to-[#2A0E0C]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="wp-badge wp-badge-gold">
              ✦ ONLINE RESERVATIONS ✦
            </span>
          </div>

          <h1
            className="font-display font-extrabold text-[#E5E2DC] leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Reserve Your Table Under the Sky
          </h1>

          <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full" />

          <p className="text-sm md:text-base font-light text-[#FAF8F5]/90 max-w-xl mx-auto font-body leading-relaxed">
            Secure your spot at Tanah for lunch, sunset drinks, or dinner under the stars.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveMode('table')
                document.getElementById('booking-form-card')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${ activeMode === 'table' ? 'bg-[#E5E2DC] text-[#5E332E]' : 'bg-white/10 text-[#E5E2DC] hover:bg-white/20 border border-white/15' }`}
            >
              🍽️ Table Reservation (1–10+ Guests)
            </button>

            <a
              href="#corporate-packages"
              onClick={() => setActiveMode('corporate')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${ activeMode === 'corporate' ? 'bg-[#E5E2DC] text-[#5E332E]' : 'bg-white/10 text-[#E5E2DC] hover:bg-white/20 border border-white/15' }`}
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#5E332E]/15 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5E332E] block mb-1">
                  SANCTUARY LOCATION
                </span>
                <h3 className="font-display font-bold text-2xl text-[#5E332E]">
                  Tanah Kitchen &amp; Bar
                </h3>
                <p className="text-xs text-[#1E1B18]/75 mt-1.5 leading-relaxed">
                  5th Floor, Opp. Meenakshi Bamboos Road, Near AIG Hospital, P Janardhan Reddy Nagar, Gachibowli, Hyderabad – 500032.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#5E332E]/10 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#1E1B18]/70 font-semibold">Fri &amp; Sat</span>
                  <span className="font-bold text-[#5E332E]">12:00 PM – 12:00 AM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#1E1B18]/70 font-semibold">Sun – Thu</span>
                  <span className="font-bold text-[#5E332E]">12:00 PM – 11:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#1E1B18]/70 font-semibold">Valet Parking</span>
                  <span className="font-bold text-emerald-700">Complimentary</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#1E1B18]/70 font-semibold">Reservations</span>
                  <a href="mailto:reservations@tanahkitchen.com" className="font-bold text-[#5E332E] hover:underline">
                    reservations@tanahkitchen.com
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#1E1B18]/70 font-semibold">Direct Desk</span>
                  <a href="tel:+918977730291" className="font-bold text-[#5E332E] hover:underline">
                    +91 89777 30291
                  </a>
                </div>
              </div>

              {/* Photo Card */}
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-[#5E332E]/15 shadow-sm">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-8.webp"
                  alt="Rooftop terrace seating at Tanah"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#5E332E]/10 text-xs text-[#1E1B18]/85 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5E332E] flex-shrink-0" />
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
                  className="p-10 sm:p-12 rounded-3xl bg-white text-center space-y-6 shadow-xl border border-[#5E332E]/15"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-[#5E332E]">
                    Reservation Requested!
                  </h3>
                  <p className="text-sm font-light text-[#1E1B18]/80 max-w-md mx-auto leading-relaxed font-body">
                    Thank you, <strong className="text-[#5E332E]">{form.name}</strong>. We have reserved a table for your party of <strong className="text-[#5E332E]">{form.guests}</strong> on <strong className="text-[#5E332E]">{form.date}</strong> at <strong className="text-[#5E332E]">{form.time}</strong> ({form.seatingPreference}).
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
                      className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-bold tracking-wider uppercase cursor-pointer"
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
                  className="p-8 sm:p-10 bg-white rounded-3xl space-y-6 shadow-xl text-left border border-[#5E332E]/15 text-[#1E1B18]"
                >
                  <div className="border-b border-[#5E332E]/10 pb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5E332E] block mb-1">
                      RESERVE YOUR TABLE UNDER THE SKY
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#5E332E]">
                      Book Your Experience
                    </h3>
                    <p className="text-xs text-[#1E1B18]/70 mt-1 font-body">
                      Secure your spot at Tanah for lunch, sunset drinks, or dinner under the stars.
                    </p>
                  </div>

                  {/* Interactive Booking Tag Options */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-2">
                      Occasion / Gathering Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'tag1', label: 'Table for Friends & Family', icon: '👥' },
                        { id: 'tag2', label: 'Open-Air Rooftop Seating', icon: '✨' },
                        { id: 'tag3', label: 'Celebrations & Dinners', icon: '🎉' },
                        { id: 'tag4', label: 'Drinks & Bites', icon: '🍸' }
                      ].map((tag) => {
                        const isSelected = form.bookingTag === tag.label || (!form.bookingTag && tag.id === 'tag1')
                        return (
                          <button
                            type="button"
                            key={tag.id}
                            onClick={() => setForm({ ...form, bookingTag: tag.label })}
                            className={`p-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 min-h-[58px] ${ isSelected ? 'border-[#5E332E] bg-[#5E332E] text-[#E5E2DC] shadow-sm' : 'border-[#5E332E]/15 bg-[#FAF8F5]/60 text-[#1E1B18] hover:border-[#5E332E]/30' }`}
                          >
                            <span>{tag.icon}</span>
                            <span className="leading-tight">{tag.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:border-[#5E332E] bg-[#FAF8F5]/40"
                      />
                      {errors.name && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:border-[#5E332E] bg-[#FAF8F5]/40"
                      />
                      {errors.phone && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:border-[#5E332E] bg-[#FAF8F5]/40"
                    />
                    {errors.email && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.email}</span>}
                  </div>

                  {/* Date, Time & Number of Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#5E332E]/20 text-xs sm:text-sm focus:outline-none bg-white"
                      />
                      {errors.date && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.date}</span>}
                    </div>

                    <div className="relative" ref={timeDropdownRef}>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                        Time Slot *
                      </label>
                      <button
                        type="button"
                        onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#5E332E]/20 text-xs sm:text-sm bg-white text-left flex items-center justify-between focus:outline-none focus:border-[#5E332E] cursor-pointer shadow-xs"
                      >
                        <div className="flex items-center gap-2 text-[#1E1B18] font-medium">
                          <Clock className="w-4 h-4 text-[#5E332E]/70" />
                          <span>{form.time || 'Select Time'}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#5E332E]/70 transition-transform duration-200 ${timeDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Smoothly Scrollable Time Dropdown Menu */}
                      <AnimatePresence>
                        {timeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-[#5E332E]/20 shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="p-2 border-b border-[#5E332E]/10 bg-[#FAF8F5]/80 flex items-center justify-between text-[11px] font-bold uppercase text-[#5E332E] tracking-wider">
                              <span>Select Time Slot</span>
                              <span className="font-normal text-[10px] text-[#1E1B18]/60">12:00 PM – 12:00 AM</span>
                            </div>

                            <div 
                              className="max-h-56 overflow-y-auto p-1.5 divide-y divide-[#5E332E]/5 scrollbar-thin scrollbar-thumb-[#5E332E]/30"
                              style={{ maxHeight: '220px', WebkitOverflowScrolling: 'touch' }}
                            >
                              {/* Lunch Section */}
                              <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#5E332E]/60">
                                ☀️ Lunch &amp; Afternoon
                              </div>
                              {timeSlots.filter(t => t.period === 'Lunch').map((t) => {
                                const isSelected = form.time === t.slot
                                return (
                                  <button
                                    type="button"
                                    key={t.slot}
                                    onClick={() => {
                                      setForm({ ...form, time: t.slot })
                                      setTimeDropdownOpen(false)
                                    }}
                                    className={`w-full px-3 py-2 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#5E332E] text-[#E5E2DC]'
                                        : 'text-[#1E1B18] hover:bg-[#FAF8F5] hover:text-[#5E332E]'
                                    }`}
                                  >
                                    <span>{t.slot}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                  </button>
                                )
                              })}

                              {/* Dinner Section */}
                              <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#5E332E]/60 mt-1">
                                🌙 Sunset &amp; Dinner
                              </div>
                              {timeSlots.filter(t => t.period === 'Dinner').map((t) => {
                                const isSelected = form.time === t.slot
                                return (
                                  <button
                                    type="button"
                                    key={t.slot}
                                    onClick={() => {
                                      setForm({ ...form, time: t.slot })
                                      setTimeDropdownOpen(false)
                                    }}
                                    className={`w-full px-3 py-2 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#5E332E] text-[#E5E2DC]'
                                        : 'text-[#1E1B18] hover:bg-[#FAF8F5] hover:text-[#5E332E]'
                                    }`}
                                  >
                                    <span>{t.slot}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                  </button>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {errors.time && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.time}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                        Number of Guests *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl border border-[#5E332E]/20 text-xs sm:text-sm focus:outline-none bg-white"
                      >
                        {[
                          '1 Guest',
                          '2 Guests',
                          '3 Guests',
                          '4 Guests',
                          '5 Guests',
                          '6 Guests',
                          '7 Guests',
                          '8 Guests',
                          '9 Guests',
                          '10+ Guests (Group/Event)'
                        ].map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['Rooftop Open-Air', 'Indoor Dining', 'First Available'].map((pref) => (
                        <button
                          type="button"
                          key={pref}
                          onClick={() => setForm({ ...form, seatingPreference: pref })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${ form.seatingPreference === pref ? 'border-[#5E332E] bg-[#5E332E] text-[#E5E2DC] shadow-xs' : 'border-[#5E332E]/15 bg-white text-[#1E1B18] hover:bg-[#FAF8F5]' }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests / Notes */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                      Special Requests / Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Special celebration, dietary requirements, quiet table preference..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none bg-[#FAF8F5]/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] hover:text-white shadow-lg w-full py-4 text-xs font-extrabold tracking-widest uppercase cursor-pointer transition-all"
                  >
                    Confirm Reservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── 3. Corporate Packages Section (Distinct, Airy & Clean) ── */}
      <div className="border-t border-[#5E332E]/15">
        <CorporatePackagesSection />
      </div>
    </main>
  )
}
