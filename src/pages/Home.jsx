import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle,
  Briefcase,
  Users,
  Compass,
  ChevronRight
} from 'lucide-react'
import {
  LogoOwl,
  StoryNestOwl,
  TribalDiamond,
  DiamondCornerOrnament
} from '../components/illustrations'

import SEO from '../components/SEO'

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
]

const guestOptions = ['1-4 Guests', '5-10 Guests', '11-20 Guests', '21-50 Guests', '50+ Guests']

const NAME_PATTERN = /^[a-zA-Z\s'-]{2,80}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Section animation hooks
  const sec2Ref = useRef(null)
  const sec3Ref = useRef(null)
  const sec4Ref = useRef(null)
  const sec5Ref = useRef(null)
  const sec6Ref = useRef(null)
  const sec7Ref = useRef(null)
  const sec8Ref = useRef(null)

  const isSec2InView = useInView(sec2Ref, { once: true, margin: '-80px' })
  const isSec3InView = useInView(sec3Ref, { once: true, margin: '-80px' })
  const isSec4InView = useInView(sec4Ref, { once: true, margin: '-80px' })
  const isSec5InView = useInView(sec5Ref, { once: true, margin: '-80px' })
  const isSec6InView = useInView(sec6Ref, { once: true, margin: '-80px' })
  const isSec7InView = useInView(sec7Ref, { once: true, margin: '-80px' })
  const isSec8InView = useInView(sec8Ref, { once: true, margin: '-80px' })

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
          1. CINEMATIC HERO (Theme: Dark Atmosphere)
          ========================================== */}
      <section
        className="section-dark relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 md:px-12 overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="/assets/Tanha%20Ambiance/Ambiance-9.webp"
          alt="Tanah Ambiance"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto text-center flex flex-col items-center space-y-10 z-10 w-full"
        >
          <div className="space-y-4 px-4">
            <span className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-[#FFC470] font-bold">
              TANAH KITCHEN & BAR
            </span>
            <h2 className="font-display font-extrabold leading-[1.2] tracking-wide text-[#F6E1CB]" style={{ fontSize: 'clamp(2.0rem, 6vw, 4.5rem)' }}>
              Where Teams Gather &<br />
              <span className="italic font-normal text-[#FFC470]">Stories Unfold.</span>
            </h2>
          </div>

          <div className="diamond-border-divider max-w-md mx-auto w-[80%]" />

          <p className="text-base md:text-xl font-light max-w-2xl leading-relaxed font-body text-[#EFE1D0] px-6">
            A premium corporate sanctuary inspired by local elements, crafted for meaningful team interactions and refined gastronomy.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md px-6 sm:px-0">
            <a
              href="#contact-form"
              className="btn-primary w-full sm:w-auto text-center"
              style={{ backgroundColor: '#FFC470', borderColor: '#FFC470', color: '#6B2523' }}
            >
              Reserve Experience
            </a>
            <a
              href="#where-teams-gather"
              className="btn-outline w-full sm:w-auto text-center"
            >
              Explore Sanctuary
            </a>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. WHERE TEAMS GATHER (Theme: Light Cream #F2E8D5)
          ========================================== */}
      <section
        id="where-teams-gather"
        ref={sec2Ref}
        className="section-light relative min-h-[90vh] flex flex-col justify-center overflow-hidden lg:grid lg:grid-cols-12"
      >
        {/* Left Column Content */}
        <div className="col-span-6 py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isSec2InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="space-y-6 max-w-xl text-left"
          >
            <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
              CORPORATE SANCTUARY
            </span>

            <h3 className="font-display font-bold leading-tight text-3xl md:text-5xl">
              Where Teams Gather
            </h3>

            <div className="diamond-border-divider-maroon max-w-xs" />

            <p className="text-lg leading-relaxed font-body">
              More than a venue, Tanah is a carefully orchestrated sanctuary. Our atmospheric spaces offer natural lighting, premium wooden features, and custom catering designed to build lasting professional bonds outside the office.
            </p>

            <p className="text-base opacity-80 leading-relaxed font-body">
              Whether conducting board retreats, hosting key clients, or celebrating major milestones, we curate custom dining atmospheres that blend corporate precision with the ease of nature.
            </p>

            <div className="pt-4">
              <a
                href="#why-tanah"
                className="inline-flex items-center gap-2 section-accent font-bold tracking-widest text-xs uppercase hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Full bleed image */}
        <div className="col-span-6 relative min-h-[400px] lg:min-h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#F6E1CB]/20 mix-blend-multiply z-10" />
          <img
            src="/assets/Tanha Image/02.webp"
            alt="Tanah Kitchen Atmosphere"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9]"
          />
        </div>
      </section>

      {/* ==========================================
          3. WHY TANAH (Theme: Dark Maroon #7A2D2D)
          ========================================== */}
      <section
        id="why-tanah"
        ref={sec3Ref}
        className="section-dark relative py-24 md:py-32 px-6 md:px-12"
      >
        <div className="max-width-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isSec3InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                TEAM BONDING EVENTS
              </span>
              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                Why Tanah
              </h3>

              <div className="diamond-border-divider max-w-xs" />

              <p className="text-lg opacity-90 leading-relaxed font-body">
                We believe in the power of shared tables. The name "Tanah" represents our deep connection to the earth, reflected in our rustic elements, raw bamboo layouts, and organic farm-sourced cuisines.
              </p>

              {/* Bullet list in cream/gold text */}
              <ul className="space-y-4 pt-4 border-t border-light-cream/15">
                {[
                  "Premium Board Meetings & Leadership Dinners",
                  "Fluid layouts perfect for client entertainment",
                  "Interactive wood-fired culinary team-building",
                  "Exclusive rooftop spaces with ambient festoon lighting",
                  "Fully customizable culinary packages tailored to dietary needs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base">
                    <span className="section-accent text-lg font-semibold mt-0.5">◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec3InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-12 gap-4 items-center relative"
            >
              {/* Image 1 */}
              <div className="col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border border-light-cream/10 p-1.5 bg-[#6B2523] relative">
                <img
                  src="/assets/Tanha Food/food-1.webp"
                  alt="Fine corporate gathering dish"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 */}
              <div className="col-span-12 md:col-span-4 aspect-[16/10] md:aspect-[3/5] overflow-hidden rounded-sm shadow-2xl border border-light-cream/10 p-1.5 bg-[#6B2523] relative">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-22.webp"
                  alt="Tanah rooftop lighting"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE TANAH STORY (Theme: Light Cream #F2E8D5)
          ========================================== */}
      <section
        ref={sec4Ref}
        className="section-light relative py-24 md:py-32 px-6 md:px-12 overflow-hidden folk-art-bg"
      >
        <div className="max-width-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Story illustration - Nest owl */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isSec4InView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="bg-[#6B2523]/10 p-10 rounded-full border border-[#6B2523]/15 shadow-2xl backdrop-blur-md relative max-w-sm">
                <StoryNestOwl className="w-64 h-64 section-accent" />
                {/* corner decorators */}
                <div className="absolute top-2 left-2">
                  <DiamondCornerOrnament className="w-8 h-8 section-accent" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <DiamondCornerOrnament className="w-8 h-8 section-accent" />
                </div>
              </div>
            </motion.div>

            {/* Paragraph copy */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isSec4InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                OUR ANCESTRY
              </span>
              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                The Tanah Story
              </h3>

              <div className="diamond-border-divider-maroon max-w-sm" />

              <p className="text-xl font-display italic section-accent leading-relaxed">
                "Architecture shaped by the natural nest, menus inspired by agricultural ancestry."
              </p>

              <div className="space-y-4 text-base opacity-90 leading-relaxed font-body">
                <p>
                  Rooted in the earth, Tanah emerged in Gachibowli, Hyderabad, as a sanctuary for professionals to transition from stressful work schedules to relaxed, natural atmospheres. Our architecture utilizes raw bamboo arches, local basalt stone, and thatched roofs, letting teams experience an organic workspace.
                </p>
                <p>
                  Every gathering is elevated by our culinary practices, which draw heavily from fire cooking, seasonal micro-farming, and hand-milled grains. We bring ancient flavours and premium hospitality under one sky.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          5. SPACE DESIGNED FOR EVERY OCCASION (Theme: Dark Maroon #7A2D2D)
          ========================================== */}
      <section
        ref={sec5Ref}
        className="section-dark relative py-24 md:py-32 px-6 md:px-12 folk-art-bg"
      >
        <div className="max-width-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Content: icon-label-description rows */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isSec5InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                  SPATIAL EXCELLENCE
                </span>
                <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                  Designed for Every Occasion
                </h3>
                <div className="diamond-border-divider max-w-sm" />
              </div>

              {/* Rows */}
              <div className="space-y-6">
                {[
                  {
                    icon: <Briefcase className="w-6 h-6 section-accent" />,
                    label: "Executive Board Gatherings",
                    desc: "Closed-door networking and dynamic strategy sessions hosted in raw-stone private dining suites."
                  },
                  {
                    icon: <Users className="w-6 h-6 section-accent" />,
                    label: "Team Bonding Receptions",
                    desc: "Vibrant high-energy spaces with live culinary setups, perfect for milestones and product launches."
                  },
                  {
                    icon: <Compass className="w-6 h-6 section-accent" />,
                    label: "Gastronomy Masterclasses",
                    desc: "Curated wood-fired cooking masterclasses led by our executive culinary curators for teams."
                  }
                ].map((row, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded bg-light-cream/5 border border-light-cream/10 hover:border-light-cream/20 transition-all">
                    <div className="p-3 bg-light-cream/10 rounded flex-shrink-0 self-start">
                      {row.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display text-lg font-bold">
                        {row.label}
                      </h4>
                      <p className="text-sm opacity-80 leading-relaxed font-body">
                        {row.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isSec5InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded shadow-2xl border border-light-cream/10 p-2 bg-light-cream/5 backdrop-blur-md relative">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-25.webp"
                  alt="Tanah space styling"
                  className="w-full h-full object-cover filter brightness-[0.85]"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          6. CUSTOMIZED CORPORATE PACKAGES (Theme: Dark Maroon #7A2D2D)
          {/* ==========================================
          6. CUSTOMIZED CORPORATE PACKAGES (Theme: Light Cream #F2E8D5)
          ========================================== */}
      <section
        ref={sec6Ref}
        className="section-light relative py-24 md:py-32 px-6 md:px-12 overflow-hidden folk-art-bg"
      >
        <div className="max-width-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isSec6InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5 relative order-2 lg:order-1"
            >
              <div className="aspect-[16/10] md:aspect-[4/5] overflow-hidden rounded shadow-2xl border border-primary-dark/10 p-2 bg-white relative">
                <img
                  src="/assets/Tanha Image/10.webp"
                  alt="Exclusive corporate package setup"
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
              </div>
            </motion.div>

            {/* Right Packages Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSec6InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 text-left order-1 lg:order-2"
            >
              <div className="space-y-3">
                <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                  BESPOKE PACKAGES
                </span>
                <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                  Customized Corporate Packages
                </h3>
                {/* Horizontal repeating border/divider */}
                <div className="diamond-border-divider-maroon" />
              </div>

              <p className="text-base opacity-95 leading-relaxed font-body">
                Our curated packages take care of every detail, from multi-course farm-to-table menus to dedicated team co-ordinators and high-end presentation configurations.
              </p>

              {/* Bullet list */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-90">
                {[
                  "✦ Dedicated AV & Screen Setup",
                  "✦ Custom Menu Curation",
                  "✦ Private Host & Service Staff",
                  "✦ Complimentary Valet Parking",
                  "✦ Exclusive Area Booking Options",
                  "✦ Artisanal Cocktail Pairings"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <a
                  href="#contact-form"
                  className="btn-primary border-primary-dark bg-primary-dark text-light-cream hover:bg-[#3A2E2A]"
                  style={{ backgroundColor: '#6B2523', borderColor: '#6B2523', color: '#DEC8AB' }}
                >
                  Request Proposal
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          7. LET'S HOST YOUR NEXT TEAM GATHERING (Theme: Dark Maroon #7A2D2D)
          ========================================== */}
      <section
        ref={sec7Ref}
        className="section-dark relative py-24 md:py-32 px-6 md:px-12"
      >
        <div className="max-width-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isSec7InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                PLAN AN EXPERIENCE
              </span>
              <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                Let's Host Your Next Team Gathering
              </h3>

              <div className="diamond-border-divider max-w-xs" />

              <p className="text-base opacity-90 leading-relaxed font-body">
                Let our corporate curators configure a tailored experience. Fill out the reservation details below or contact our events team.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3">
                  <span className="section-accent">◇</span>
                  <span>Accommodates teams from 10 to 150 members</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="section-accent">◇</span>
                  <span>Premium seating options in the interior and rooftop nests</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="section-accent">◇</span>
                  <span>Bespoke visual branding options for corporate banners</span>
                </li>
              </ul>
            </motion.div>

            {/* Right 2 Photos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec7InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded shadow-xl border border-light-cream/10 p-1 bg-[#6B2523] relative">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-26.webp"
                  alt="Gathering area setup"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="aspect-[3/4] overflow-hidden rounded shadow-xl border border-light-cream/10 p-1 bg-[#6B2523] relative mt-8">
                <img
                  src="/assets/Tanha Image/04.webp"
                  alt="Outdoor gathering setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          8. FOOTER / CTA (Theme: Split Layout – Narrow Cream Sidebar + Maroon Form/Thank You)
          ========================================== */}
      <section
        id="contact-form"
        ref={sec8Ref}
        className="relative flex flex-col md:flex-row border-t border-primary-dark/10"
      >
        {/* Split Left Column: Narrow Cream Sidebar with logo */}
        <div className="section-light w-full md:w-1/4 py-16 px-8 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-primary-dark/10">
          <div className="my-auto space-y-6">
            <div className="flex justify-center">
              <LogoOwl className="w-20 h-20 logo-mark" />
            </div>
            <h4 className="font-display text-2xl font-extrabold uppercase tracking-widest">
              TANAH
            </h4>
            <div className="diamond-border-divider-maroon max-w-[120px] mx-auto" />
            <p className="text-xs uppercase tracking-widest section-accent font-bold">
              Rooted in Nature
            </p>
          </div>

          <div className="text-xs space-y-2 mt-8 font-body">
            <p>Gachibowli, Hyderabad</p>
            <p>gatherings@tanahkitchen.com</p>
            <p>+91 40 4821 9900</p>
          </div>
        </div>

        {/* Split Right Column: Large Maroon background photo area with form / Thank You */}
        <div
          className="section-dark w-full md:w-3/4 py-16 px-6 md:px-16 relative overflow-hidden bg-primary-dark"
          style={{
            background: `linear-gradient(rgba(122, 45, 45, 0.9), rgba(122, 45, 45, 0.95)), url('/assets/Tanha Ambiance/Ambiance-23.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          {/* Subtle noise pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          <div className="max-w-2xl relative z-10 mx-auto text-left space-y-8">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 text-center bg-light-cream text-near-black border border-accent-gold/20 shadow-2xl rounded relative"
              >
                <div className="absolute top-4 left-4">
                  <DiamondCornerOrnament className="w-8 h-8 text-primary-dark" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <DiamondCornerOrnament className="w-8 h-8 text-primary-dark" />
                </div>

                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-primary-dark" />
                <h3 className="font-display text-3xl font-bold mb-4 text-primary-dark">
                  Thank You
                </h3>
                <p className="text-base font-light leading-relaxed mb-6 font-body">
                  Thank you, <span className="font-semibold text-primary-dark">{form.name}</span>. We have reserved your interest for a party of <span className="font-semibold text-primary-dark">{form.guests}</span> on <span className="font-semibold text-primary-dark">{form.date}</span>. Our experience curator will follow up via <span className="font-semibold text-primary-dark">{form.email}</span> shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', date: '', time: '', guests: '', notes: '' }) }}
                  className="btn-primary border-primary-dark bg-primary-dark text-light-cream hover:bg-near-black"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs tracking-[0.4em] uppercase section-accent font-bold font-sans block">
                    RESERVE YOUR NEST
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl font-extrabold text-light-cream">
                    Start Your Corporate Story
                  </h3>
                  <div className="diamond-border-divider max-w-xs" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#F6E1CB] p-6 md:p-10 rounded border border-primary-dark/10 shadow-2xl text-[#3A2E2A]" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark"
                        maxLength={80}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-primary-dark mt-1 block font-semibold">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark"
                        maxLength={120}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-primary-dark mt-1 block font-semibold">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                        Select Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black focus:bg-white focus:border-primary-dark"
                      />
                      {errors.date && (
                        <span className="text-[10px] text-primary-dark mt-1 block font-semibold">
                          {errors.date}
                        </span>
                      )}
                    </div>

                    {/* Time */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black focus:bg-white focus:border-primary-dark h-[54px]"
                      >
                        <option value="" className="text-near-black">Select Slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="text-near-black">{slot}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <span className="text-[10px] text-primary-dark mt-1 block font-semibold">
                          {errors.time}
                        </span>
                      )}
                    </div>

                    {/* Guests */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                        Gathering Size
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black focus:bg-white focus:border-primary-dark h-[54px]"
                      >
                        <option value="" className="text-near-black">Select Size</option>
                        {guestOptions.map((g) => (
                          <option key={g} value={g} className="text-near-black">{g}</option>
                        ))}
                      </select>
                      {errors.guests && (
                        <span className="text-[10px] text-primary-dark mt-1 block font-semibold">
                          {errors.guests}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="text-left">
                    <label className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-primary-dark">
                      Dietary / Event Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Let us know about company name, visual branding needs, or specific layouts..."
                      className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark resize-none"
                      rows={3}
                      maxLength={500}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-center justify-center py-4 mt-2"
                    style={{ backgroundColor: '#6B2523', borderColor: '#6B2523', color: '#DEC8AB' }}
                  >
                    Submit Event Inquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
