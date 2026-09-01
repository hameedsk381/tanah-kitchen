import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Briefcase,
  Users,
  Compass,
  ChevronRight
} from 'lucide-react'
import {
  LogoOwl
} from '../components/illustrations'

import SEO from '../components/SEO'
import { useMenu } from '../context/MenuContext'
import CorporatePackagesSection from '../components/CorporatePackagesSection'

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
]

const guestOptions = ['1-4 Guests', '5-10 Guests', '11-20 Guests', '21-50 Guests', '50+ Guests']

const NAME_PATTERN = /^[a-zA-Z\s'-]{2,80}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function VegMark() {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 border-[1.5px] border-emerald-600 rounded-[3px] p-[1.5px] bg-white flex-shrink-0 shadow-xs"
      title="Vegetarian"
      aria-label="Vegetarian"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-600" />
    </span>
  )
}

function NonVegMark() {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 border-[1.5px] border-red-700 rounded-[3px] p-[1.5px] bg-white flex-shrink-0 shadow-xs"
      title="Non-Vegetarian"
      aria-label="Non-Vegetarian"
    >
      <span className="w-2 h-2 rounded-full bg-red-700" />
    </span>
  )
}

export default function Home() {
  const { bentoItems } = useMenu()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Section animation hooks
  const sec2Ref = useRef(null)
  const secFoodRef = useRef(null)
  const sec3Ref = useRef(null)
  const sec4Ref = useRef(null)
  const sec5Ref = useRef(null)
  const sec6Ref = useRef(null)
  const sec7Ref = useRef(null)
  const sec8Ref = useRef(null)

  const isSec2InView = useInView(sec2Ref, { once: true, margin: '-80px' })
  const isSecFoodInView = useInView(secFoodRef, { once: true, margin: '-80px' })
  const isSec3InView = useInView(sec3Ref, { once: true, margin: '-80px' })
  const isSec4InView = useInView(sec4Ref, { once: true, margin: '-80px' })
  const isSec5InView = useInView(sec5Ref, { once: true, margin: '-80px' })
  const isSec6InView = useInView(sec6Ref, { once: true, margin: '-80px' })
  const isSec7InView = useInView(sec7Ref, { once: true, margin: '-80px' })
  const isSec8InView = useInView(sec8Ref, { once: true, margin: '-80px' })

  // Quick Hero Table Booking State
  const [quickGuests, setQuickGuests] = useState('2 Guests')
  const [quickMeal, setQuickMeal] = useState('Dinner (7:30 PM)')
  const [selectedDishIndex, setSelectedDishIndex] = useState(0)

  // Form State
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    notes: ''
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
    <main className="flex-grow overflow-x-hidden select-none bg-light-cream text-near-black">
      <SEO
        title="Tanah Kitchen & Bar | Rooftop Restaurant & Bar in Gachibowli, Hyderabad"
        description="Experience Tanah Kitchen & Bar in Gachibowli, Hyderabad. Rooftop dining, organic farm-to-table cuisine, wood-fired hearths, Liquid Library signature cocktails, and corporate gathering spaces."
        schema={{
          '@context': 'https://schema.org',
          '@type': ['Restaurant', 'BarOrPub'],
          'name': 'Tanah Kitchen & Bar',
          'url': 'https://tanahkitchen.in/',
          'telephone': '+91-8977730291',
          'servesCuisine': ['Indian', 'Continental', 'Wood-Fired', 'Cocktails'],
          'priceRange': '₹₹₹',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '5th Floor, Vaishnavi Splendora, opp Meenakshi Bamboos, beside AIG Hospital',
            'addressLocality': 'Gachibowli',
            'addressRegion': 'Telangana',
            'postalCode': '500032',
            'addressCountry': 'IN'
          }
        }}
      />
      <h1 className="sr-only">Tanah Kitchen & Bar - Premium Corporate Gathering & Dining</h1>

      {/* ==========================================
          1. CINEMATIC HERO (WordPress Elementor Style Hero Banner with Live Badge & Quick Booking)
          ========================================== */}
      <section className="section-dark relative min-h-[95vh] flex flex-col justify-center items-center pt-32 pb-20 px-6 md:px-12 overflow-hidden brand-dots-dark">
        {/* Background Image */}
        <img
          src="/assets/Tanha%20Ambiance/Ambiance-9.webp"
          alt="Tanah Ambiance"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-[1.05]"
        />
        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/95 via-[#5E332E]/60 to-[#5E332E]/80 z-[1]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10 w-full"
        >
          {/* Live Status Eyebrow Badge */}
          <div className="mb-5 flex items-center gap-2">
            <span className="wp-badge wp-badge-gold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OPEN TODAY • 12:00 PM – 11:30 PM • GACHIBOWLI</span>
            </span>
          </div>

          <h2
            className="font-display font-extrabold leading-[1.15] tracking-wide text-[#E5E2DC] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}
          >
            Your Urban Nest in the<br />
            <span className="italic font-normal text-[#E5E2DC]">Heart of Gachibowli.</span>
          </h2>

          <div className="w-24 h-[2px] bg-[#E5E2DC]/60 rounded-full mb-6" />

          <p className="text-base md:text-lg font-light max-w-2xl leading-relaxed font-body text-[#FAF8F5]/95 px-4 mb-8">
            An earthy sanctuary where conversations flow, plates are shared, and stories unfold over artisanal cocktails and open skies.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md px-4 sm:px-0 mb-8">
            <a
              href="/book"
              className="wp-btn-pill bg-[#E5E2DC] text-[#5E332E] hover:bg-white hover:text-[#5E332E] shadow-lg w-full sm:w-auto text-center font-bold"
            >
              Reserve a Table
            </a>
            <a
              href="/menu"
              className="wp-btn-pill bg-white/10 text-[#E5E2DC] border border-[#E5E2DC]/40 hover:bg-[#E5E2DC] hover:text-[#5E332E] w-full sm:w-auto text-center font-semibold backdrop-blur-sm"
            >
              Explore Menu
            </a>
          </div>

          {/* Restaurant Quick Table Booking Selector Card */}
          <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl text-left grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#E5E2DC] block mb-1">
                Party Size
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#E5E2DC]"
              >
                <option value="2 Guests" className="text-black">2 Guests</option>
                <option value="4 Guests" className="text-black">4 Guests</option>
                <option value="6-8 Guests" className="text-black">6-8 Guests</option>
                <option value="10+ Corporate" className="text-black">10+ Corporate Party</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#E5E2DC] block mb-1">
                Dining Slot
              </label>
              <select
                value={quickMeal}
                onChange={(e) => setQuickMeal(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#E5E2DC]"
              >
                <option value="Lunch (1:00 PM)" className="text-black">Lunch (1:00 PM)</option>
                <option value="Dinner (7:30 PM)" className="text-black">Dinner (7:30 PM)</option>
                <option value="Rooftop Sunset (6:00 PM)" className="text-black">Rooftop Sunset (6:00 PM)</option>
              </select>
            </div>

            <div className="sm:pt-4">
              <a
                href="/book"
                className="wp-btn-pill bg-[#E5E2DC] text-[#5E332E] hover:bg-white w-full text-center text-xs font-bold py-2.5 shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Book Table</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. WHERE TEAMS GATHER (WordPress Alternating Split Block)
          ========================================== */}
      <section
        id="where-teams-gather"
        ref={sec2Ref}
        className="wp-section bg-[#FAF8F5] text-[#1E1B18] border-b border-[#5E332E]/10 brand-dots-light"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isSec2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="wp-badge wp-badge-maroon">
                CORPORATE SANCTUARY
              </span>

              <h3 className="font-display font-bold leading-tight text-3xl md:text-5xl text-[#5E332E]">
                Where Teams Gather
              </h3>

              <div className="w-16 h-[2px] bg-[#5E332E]/40 rounded-full" />

              <p className="text-lg leading-relaxed font-body text-[#1E1B18]/90">
                More than a venue, Tanah is a carefully orchestrated sanctuary. Our atmospheric spaces offer natural lighting, premium wooden features, and custom catering designed to build lasting professional bonds outside the office.
              </p>

              <p className="text-base text-[#1E1B18]/80 leading-relaxed font-body">
                Whether conducting board retreats, hosting key clients, or celebrating major milestones, we curate custom dining atmospheres that blend corporate precision with the ease of nature.
              </p>

              <div className="pt-2">
                <a
                  href="#why-tanah"
                  className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] hover:text-white shadow-md text-xs font-semibold"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Framed Showcase Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isSec2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#5E332E]/15 aspect-[4/3] relative group">
                <img
                  src="/assets/Tanha Image/02.webp"
                  alt="Tanah Kitchen Atmosphere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          CHEF'S CULINARY SIGNATURES (Image Grid Bento)
          ========================================== */}
      <section
        ref={secFoodRef}
        className="wp-section bg-[#FAF8F5] text-[#1E1B18] border-b border-[#5E332E]/10 pt-16 pb-20 brand-dots-light"
      >
        <div className="wp-container space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="wp-badge wp-badge-maroon">
              ✦ TASTE OF TANAH ✦
            </span>
            <h3 className="font-display font-extrabold text-3xl md:text-5xl text-[#5E332E]">
              Chef's Culinary Signatures
            </h3>
            <div className="w-20 h-[2px] bg-[#5E332E]/40 mx-auto rounded-full" />
            <p className="text-sm md:text-base text-[#1E1B18]/80 font-body leading-relaxed">
              Crafted from zero-mile agricultural crops, slow wood-fired embers, and centuries-old culinary traditions.
            </p>
          </div>

          {/* BENTO IMAGE GRID (6-Tile Asymmetric Culinary Bento) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 text-left">
            
            {/* Bento Tile 1: Hero Large (Left 7 Cols) */}
            {bentoItems[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="md:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] border border-[#5E332E]/15 flex flex-col justify-between p-6 sm:p-8"
              >
                <img
                  src={bentoItems[0].image}
                  alt={bentoItems[0].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/40 shadow-lg font-sans">
                    {bentoItems[0].tag || '★ BESTSELLER'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-md">
                    {bentoItems[0].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                {/* Bottom Info Overlay */}
                <div className="relative z-10 space-y-2 text-white">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#E5E2DC] font-bold font-sans">
                    {bentoItems[0].category}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {bentoItems[0].title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/85 font-body leading-relaxed max-w-lg mt-1 font-light">
                        {bentoItems[0].desc}
                      </p>
                    </div>
                  </div>
                  {bentoItems[0].pairing && (
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#E5E2DC]">
                      <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
                        {bentoItems[0].pairing}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Bento Tile 2: Wide Top (Right 5 Cols) */}
            {bentoItems[1] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-xl group min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] border border-[#5E332E]/15 flex flex-col justify-between p-6 sm:p-8"
              >
                <img
                  src={bentoItems[1].image}
                  alt={bentoItems[1].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md font-sans">
                    {bentoItems[1].tag || '★ SIGNATURE'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md">
                    {bentoItems[1].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                <div className="relative z-10 text-white flex justify-between items-end gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E5E2DC] font-semibold font-sans">
                      {bentoItems[1].category}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      {bentoItems[1].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 font-body leading-relaxed mt-1 font-light">
                      {bentoItems[1].desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Row: Quad 4-Card Bento (3 Cols each on Desktop) */}
            
            {/* Bento Tile 3 */}
            {bentoItems[2] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="md:col-span-6 lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl group min-h-[230px] border border-[#5E332E]/15 flex flex-col justify-between p-5"
              >
                <img
                  src={bentoItems[2].image}
                  alt={bentoItems[2].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md font-sans">
                    {bentoItems[2].tag || '✦ SPECIAL'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md">
                    {bentoItems[2].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#E5E2DC] font-semibold font-sans">
                    {bentoItems[2].category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {bentoItems[2].title}
                  </h4>
                </div>
              </motion.div>
            )}

            {/* Bento Tile 4 */}
            {bentoItems[3] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="md:col-span-6 lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl group min-h-[230px] border border-[#5E332E]/15 flex flex-col justify-between p-5"
              >
                <img
                  src={bentoItems[3].image}
                  alt={bentoItems[3].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md font-sans">
                    {bentoItems[3].tag || '★ VEG SPECIAL'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md">
                    {bentoItems[3].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#E5E2DC] font-semibold font-sans">
                    {bentoItems[3].category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {bentoItems[3].title}
                  </h4>
                </div>
              </motion.div>
            )}

            {/* Bento Tile 5 */}
            {bentoItems[4] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:col-span-6 lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl group min-h-[230px] border border-[#5E332E]/15 flex flex-col justify-between p-5"
              >
                <img
                  src={bentoItems[4].image}
                  alt={bentoItems[4].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md font-sans">
                    {bentoItems[4].tag || '★ DESSERT'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md">
                    {bentoItems[4].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#E5E2DC] font-semibold font-sans">
                    {bentoItems[4].category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {bentoItems[4].title}
                  </h4>
                </div>
              </motion.div>
            )}

            {/* Bento Tile 6 */}
            {bentoItems[5] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSecFoodInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="md:col-span-6 lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl group min-h-[230px] border border-[#5E332E]/15 flex flex-col justify-between p-5"
              >
                <img
                  src={bentoItems[5].image}
                  alt={bentoItems[5].title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md font-sans">
                    {bentoItems[5].tag || '★ DESSERT'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md">
                    {bentoItems[5].isVeg ? <VegMark /> : <NonVegMark />}
                  </div>
                </div>

                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#E5E2DC] font-semibold font-sans">
                    {bentoItems[5].category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {bentoItems[5].title}
                  </h4>
                </div>
              </motion.div>
            )}

          </div>

          {/* Action Row */}
          <div className="text-center pt-4 flex flex-wrap justify-center items-center gap-4">
            <a
              href="/menu"
              className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] hover:text-white text-xs font-bold tracking-widest uppercase shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Full Seasonal Menu</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="/book"
              className="wp-btn-pill bg-[#E5E2DC] text-[#5E332E] hover:bg-white text-xs font-bold tracking-widest uppercase shadow-lg inline-flex items-center gap-2"
            >
              <span>Reserve a Table</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. WHY TANAH (WordPress Feature Cards & Gallery)
          ========================================== */}
      <section
        id="why-tanah"
        ref={sec3Ref}
        className="wp-section section-dark text-[#FAF8F5] brand-dots-dark"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSec3InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="wp-badge wp-badge-gold">
                ✦ CORPORATE HOSPITALITY &amp; RETREATS ✦
              </span>

              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#E5E2DC]">
                Why Leaders &amp; Teams Choose Tanah
              </h3>

              <div className="w-16 h-[2px] bg-[#E5E2DC]/60 rounded-full" />

              <p className="text-lg opacity-90 leading-relaxed font-body">
                We believe in the transformative power of the shared table. Located in the heart of Gachibowli, Hyderabad, Tanah fuses raw architectural tranquility, zero-mile farm gastronomy, and bespoke luxury hospitality to host Hyderabad's most distinguished corporate retreats and celebrations.
              </p>

              {/* Bullet list in WordPress Card Container */}
              <div className="space-y-3 pt-2">
                {[
                  "Premium corporate and leadership gatherings",
                  "Spacious, flexible layouts engineered for premium client entertainment",
                  "A hands-on culinary team experience",
                  "Panoramic open-sky rooftop terrace with ambient festoon lighting",
                  "Bespoke multi-course culinary packages tailored to all dietary preferences"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-[#E5E2DC]/15 hover:border-[#E5E2DC]/40 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E5E2DC]/15 text-[#E5E2DC] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm md:text-base font-medium text-[#E5E2DC]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec3InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-12 md:col-span-7 aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl border border-white/10 relative">
                <img
                  src="/assets/Tanha Food/food-1.webp"
                  alt="Fine corporate gathering dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl border border-white/10 relative">
                  <img
                    src="/assets/Tanha Ambiance/Ambiance-22.webp"
                    alt="Tanah rooftop lighting"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE TANAH STORY (WordPress Editorial Block)
          ========================================== */}
      <section
        ref={sec4Ref}
        className="wp-section bg-[#FAF8F5] text-[#1E1B18] border-b border-[#5E332E]/10 brand-dots-light"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Story Showcase - Authentic Sanctuary Ambiance Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec4InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="rounded-3xl overflow-hidden border border-[#5E332E]/15 shadow-xl aspect-[4/5] w-full max-w-sm relative group bg-white">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-2.webp"
                  alt="Tanah architectural rooftop sanctuary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E5E2DC]">
                    Tanah Sanctuary
                  </span>
                  <span className="text-xs text-white/90 font-light mt-1 font-body">
                    Handcrafted Bamboo Arches &amp; Basalt Stone
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Paragraph copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSec4InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="wp-badge wp-badge-maroon">
                OUR ANCESTRY &amp; ETHOS
              </span>

              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#5E332E]">
                The Tanah Story
              </h3>

              <div className="w-16 h-[2px] bg-[#5E332E]/40 rounded-full" />

              {/* Callout Quote Card */}
              <div className="p-6 rounded-2xl bg-[#5E332E]/5 border-l-4 border-[#5E332E]">
                <p className="text-lg md:text-xl font-display italic text-[#5E332E] leading-relaxed">
                  "Architecture shaped by the sanctuary of the nest, cuisine inspired by agricultural ancestry."
                </p>
              </div>

              <div className="space-y-4 text-base text-[#1E1B18]/85 leading-relaxed font-body">
                <p>
                  Rooted in the Sanskrit &amp; regional earth tradition, Tanah emerged in Gachibowli, Hyderabad, as an architectural sanctuary where founders, corporate teams, and connoisseurs transition from demanding schedules to grounded, natural atmospheres. Our design blends handcrafted bamboo arches, local basalt stone, and living canopies into an organic gathering haven.
                </p>
                <p>
                  Every gathering is elevated by our authentic wood-fired hearths, seasonal micro-farm produce, and hand-milled heirloom grains. We bring ancient gastronomic wisdom and world-class luxury hospitality together under one panoramic sky.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          5. SPACE DESIGNED FOR EVERY OCCASION (WordPress Icon Box Cards)
          ========================================== */}
      <section
        ref={sec5Ref}
        className="wp-section section-dark text-[#FAF8F5] brand-dots-dark"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content: icon-label-description rows */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isSec5InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="space-y-3">
                <span className="wp-badge wp-badge-gold">
                  SPATIAL EXCELLENCE
                </span>
                <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#E5E2DC]">
                  Designed for Every Occasion
                </h3>
                <div className="w-16 h-[2px] bg-[#E5E2DC]/60 rounded-full" />
              </div>

              {/* WordPress Cards Grid with Space Capacities */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    icon: <Briefcase className="w-6 h-6 text-[#E5E2DC]" />,
                    label: "Rooftop Corporate Dining",
                    capacity: "Capacity: 15–30 Guests • Private & Rooftop Dining",
                    desc: "Host team dinners and corporate gatherings in Tanah’s relaxed rooftop setting, with great food, crafted drinks, and a comfortable ambience that makes every business gathering more enjoyable."
                  },
                  {
                    icon: <Users className="w-6 h-6 text-[#E5E2DC]" />,
                    label: "Corporate Celebrations & Team Events",
                    capacity: "Capacity: 30–60 Guests • Rooftop Event Space",
                    desc: "From team celebrations and office parties to brand events and milestone gatherings, Tanah offers a vibrant rooftop setting with delicious food, drinks, music, and an atmosphere designed for memorable celebrations."
                  },
                  {
                    icon: <Compass className="w-6 h-6 text-[#E5E2DC]" />,
                    label: "Team Dining & Curated Experiences",
                    capacity: "Capacity: 20–40 Guests • Food, Drinks & Entertainment",
                    desc: "Bring your team together over specially curated food, signature cocktails, and engaging entertainment. Whether it’s a team dinner, celebration, or casual get-together, Tanah creates the perfect setting to connect, unwind, and make memories."
                  }
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="wp-card-dark p-6 flex items-start gap-4"
                  >
                    <div className="p-3 bg-[#E5E2DC]/15 rounded-xl flex-shrink-0 text-[#E5E2DC]">
                      {row.icon}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display text-lg md:text-xl font-bold text-[#E5E2DC]">
                          {row.label}
                        </h4>
                        <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-[#E5E2DC] border border-[#E5E2DC]/30 font-sans">
                          {row.capacity}
                        </span>
                      </div>
                      <p className="text-sm text-[#FAF8F5]/80 leading-relaxed font-body">
                        {row.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec5InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] relative group">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-25.webp"
                  alt="Tanah space styling"
                  className="w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          EVENTS & WEEKEND SUNDOWNERS CALLOUT BANNER
          ========================================== */}
      <section className="bg-[#4A2420] border-y border-[#E5E2DC]/20 py-12 px-6 text-center text-[#E5E2DC] relative overflow-hidden">
        <div className="wp-container relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="wp-badge wp-badge-gold">
              ✦ LIVE ROOFTOP EXPERIENCES ✦
            </span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#E5E2DC] uppercase tracking-wide">
            Weekend Sundowners &amp; Live Music
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF8F5]/85 max-w-xl mx-auto font-body leading-relaxed">
            Unwind with rooftop views, soulful live music, refreshing cocktails, and delicious food. The perfect setting to relax, connect, and enjoy beautiful evenings at Tanah.
          </p>
          <div className="pt-2">
            <a
              href="/book"
              className="wp-btn-pill bg-[#E5E2DC] text-[#5E332E] hover:bg-white text-xs font-bold py-2.5 px-6 shadow-lg inline-flex items-center gap-2"
            >
              <span>Reserve Sunset Table</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. CUSTOMIZED CORPORATE PACKAGES
          ========================================== */}
      <CorporatePackagesSection />

      {/* ==========================================
          7. LET'S HOST YOUR NEXT TEAM GATHERING (WordPress Event Showcase)
          ========================================== */}
      <section
        ref={sec7Ref}
        className="wp-section section-dark text-[#FAF8F5] brand-dots-dark"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSec7InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="wp-badge wp-badge-gold">
                PLAN AN EXPERIENCE
              </span>

              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#E5E2DC]">
                Let's Host Your Next Team Gathering
              </h3>

              <div className="w-16 h-[2px] bg-[#E5E2DC]/60 rounded-full" />

              <p className="text-base opacity-90 leading-relaxed font-body">
                Let our corporate curators configure a tailored experience. Fill out the reservation details below or contact our events team.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Accommodates teams from 10 to 150 members",
                  "Premium seating options in the interior and rooftop nests",
                  "Bespoke visual branding options for corporate banners"
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E5E2DC]/20 text-[#E5E2DC] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ◇
                    </span>
                    <span className="text-sm font-medium text-[#E5E2DC]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right 2 Photos in WordPress Masonry Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec7InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-white/10 relative group">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-26.webp"
                  alt="Gathering area setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-white/10 relative group mt-6 sm:mt-8">
                <img
                  src="/assets/Tanha Image/04.webp"
                  alt="Outdoor gathering setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          GUEST EXPERIENCES & 5-STAR TESTIMONIALS (WordPress Review Cards)
          ========================================== */}
      <section className="wp-section bg-[#FAF8F5] text-[#1E1B18] border-b border-[#5E332E]/10 pt-16 pb-20 brand-dots-light">
        <div className="wp-container space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="wp-badge wp-badge-maroon">
              ✦ GUEST REVIEWS &amp; PRAISE ✦
            </span>
            <h3 className="font-display font-extrabold text-3xl md:text-5xl text-[#5E332E]">
              Voices from Our Tables
            </h3>
            <div className="w-20 h-[2px] bg-[#5E332E]/40 mx-auto rounded-full" />
            
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#5E332E]/15 shadow-sm text-xs font-bold text-[#5E332E]">
              <span className="text-amber-500 text-sm">★★★★★</span>
              <span>4.9 / 5.0 Google &amp; Dining Reviews (420+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                quote: "Tanah provided our executive leadership team an unforgettable dining retreat. The wood-fired wild mushroom risotto and basalt terrace breeze set a new standard for corporate dining in Hyderabad.",
                author: "Rohit Varma",
                role: "VP of Engineering",
                company: "Tech Mahindra",
                stars: 5
              },
              {
                quote: "The Liquid Library cocktail pairings and claypot mutton biryani are hands-down the finest in Gachibowli. Attentive hospitality, exquisite acoustics, and effortless ambience.",
                author: "Ananya Sen",
                role: "Marketing Director",
                company: "Deloitte India",
                stars: 5
              },
              {
                quote: "We hosted our annual strategic client celebration here with 45 guests. The private dining room, seamless AV, and organic farm-to-table cuisine left every client thoroughly impressed.",
                author: "Vikramaditya Rao",
                role: "Managing Partner",
                company: "Alpha Capital",
                stars: 5
              }
            ].map((review, rIdx) => (
              <div
                key={rIdx}
                className="wp-card p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-[#5E332E]/30 transition-all shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(review.stars)}
                  </div>
                  <p className="text-xs sm:text-sm font-light text-[#1E1B18]/85 italic leading-relaxed font-body">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#5E332E]/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5E332E]/10 text-[#5E332E] flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {review.author[0]}
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-bold text-[#5E332E]">
                      {review.author}
                    </h5>
                    <p className="text-[11px] text-[#1E1B18]/70 font-body">
                      {review.role} • <span className="font-semibold text-[#5E332E]">{review.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          8. RESERVATION & EVENT INQUIRY FORM (WordPress WPForms Style)
          ========================================== */}
      <section
        id="contact-form"
        ref={sec8Ref}
        className="wp-section bg-[#FAF8F5] text-[#1E1B18] brand-dots-light"
      >
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* Left Brand Summary Card */}
            <div className="lg:col-span-4 bg-[#5E332E] text-[#E5E2DC] p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-xl border border-[#E5E2DC]/20 text-left">
              <div className="space-y-6">
                <img
                  src="/assets/logo.png"
                  alt="Tanah Kitchen & Bar"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain bg-transparent border-none shadow-none"
                />
                
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5E2DC] font-bold block font-body">
                    GACHIBOWLI • HYDERABAD
                  </span>
                </div>

                <div className="w-16 h-[2px] bg-[#E5E2DC]/40 rounded-full" />

                <p className="text-sm font-light text-[#FAF8F5]/90 leading-relaxed font-body">
                  Rooted in nature, crafted for people. We create intimate corporate dining experiences and celebrations that inspire authentic relationships.
                </p>
              </div>

              <div className="pt-8 border-t border-[#E5E2DC]/20 space-y-3 text-xs text-[#FAF8F5]/85 font-body">
                <p className="flex items-center gap-2">
                  <span>📍</span> 5th Floor, Opp. Meenakshi Bamboo Road, Gachibowli
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span> reservations@tanahkitchen.com
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span> +91 89777 30291 / +91 89777 30292
                </p>
              </div>
            </div>

            {/* Right WordPress Reservation Form Card */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#5E332E]/10 text-left">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center space-y-6"
                >
                  <CheckCircle className="w-16 h-16 mx-auto text-[#5E332E]" />
                  <h3 className="font-display text-3xl font-bold text-[#5E332E]">
                    Thank You
                  </h3>
                  <p className="text-base text-[#1E1B18]/80 leading-relaxed max-w-lg mx-auto font-body">
                    Thank you, <span className="font-semibold text-[#5E332E]">{form.name}</span>. We have reserved your interest for a party of <span className="font-semibold text-[#5E332E]">{form.guests}</span> on <span className="font-semibold text-[#5E332E]">{form.date}</span>. Our experience curator will follow up via <span className="font-semibold text-[#5E332E]">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', date: '', time: '', guests: '', notes: '' }) }}
                    className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <span className="wp-badge wp-badge-maroon mb-2">
                      RESERVE YOUR NEST
                    </span>
                    <h3 className="font-display text-2xl md:text-4xl font-extrabold text-[#5E332E]">
                      Start Your Corporate Story
                    </h3>
                    <p className="text-sm text-[#1E1B18]/70 mt-1 font-body">
                      Fill in the details below and our team will get back to confirm your booking.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className="wp-form-input text-sm"
                          maxLength={80}
                        />
                        {errors.name && (
                          <span className="text-xs text-red-600 mt-1 block font-medium">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                          Email Address *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. rahul@company.com"
                          className="wp-form-input text-sm"
                          maxLength={120}
                        />
                        {errors.email && (
                          <span className="text-xs text-red-600 mt-1 block font-medium">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Date */}
                      <div>
                        <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                          Date *
                        </label>
                        <input
                          name="date"
                          type="date"
                          value={form.date}
                          onChange={handleChange}
                          min={today}
                          className="wp-form-input text-sm h-[48px]"
                        />
                        {errors.date && (
                          <span className="text-xs text-red-600 mt-1 block font-medium">
                            {errors.date}
                          </span>
                        )}
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                          Time Slot *
                        </label>
                        <select
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className="wp-form-input text-sm h-[48px]"
                        >
                          <option value="">Select Slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        {errors.time && (
                          <span className="text-xs text-red-600 mt-1 block font-medium">
                            {errors.time}
                          </span>
                        )}
                      </div>

                      {/* Guests */}
                      <div>
                        <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                          Party Size *
                        </label>
                        <select
                          name="guests"
                          value={form.guests}
                          onChange={handleChange}
                          className="wp-form-input text-sm h-[48px]"
                        >
                          <option value="">Select Size</option>
                          {guestOptions.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        {errors.guests && (
                          <span className="text-xs text-red-600 mt-1 block font-medium">
                            {errors.guests}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase mb-1.5 text-[#5E332E]">
                        Dietary / Event Notes
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Company name, branding needs, audio/visual requirements, seating preferences..."
                        className="wp-form-input text-sm resize-none"
                        rows={3}
                        maxLength={500}
                      />
                    </div>

                    <button
                      type="submit"
                      className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] hover:text-white shadow-lg w-full py-4 text-xs font-bold tracking-widest mt-2"
                    >
                      Submit Event Inquiry
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
