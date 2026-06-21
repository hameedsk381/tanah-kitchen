import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { 
  CalendarDays, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  Quote,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { 
  LogoOwl, 
  StoryNestOwl, 
  DiamondDivider, 
  WinkingOwl, 
  PartyOwl, 
  FoodOwl, 
  BambooOwl, 
  FlyingBird, 
  TribalDiamond 
} from '../components/illustrations'

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
]

const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests']

const NAME_PATTERN = /^[a-zA-Z\s'\-]{2,80}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

export default function Home() {
  useEffect(() => {
    document.title = 'Tanah | Premium Corporate Gathering & Hospitality'
    window.scrollTo(0, 0)
  }, [])

  // Section references for animations
  const sec2Ref = useRef(null)
  const sec3Ref = useRef(null)
  const sec4Ref = useRef(null)
  const sec5Ref = useRef(null)
  const sec6Ref = useRef(null)
  const sec7Ref = useRef(null)
  const sec8Ref = useRef(null)
  const sec9Ref = useRef(null)

  const isSec2InView = useInView(sec2Ref, { once: true, margin: '-100px' })
  const isSec3InView = useInView(sec3Ref, { once: true, margin: '-100px' })
  const isSec4InView = useInView(sec4Ref, { once: true, margin: '-100px' })
  const isSec5InView = useInView(sec5Ref, { once: true, margin: '-100px' })
  const isSec6InView = useInView(sec6Ref, { once: true, margin: '-100px' })
  const isSec7InView = useInView(sec7Ref, { once: true, margin: '-100px' })
  const isSec8InView = useInView(sec8Ref, { once: true, margin: '-100px' })
  const isSec9InView = useInView(sec9Ref, { once: true, margin: '-100px' })

  // Reservation form state
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
    <main className="flex-grow overflow-x-hidden font-body select-none">
      <h1 className="sr-only">Tanah - Premium Corporate Gathering & Hospitality</h1>

      {/* ========================================================
          SECTION 1 – HERO (Theme: DARK)
          ======================================================== */}
      <section 
        className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-8 text-stone-100 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(27, 23, 20, 0.8), rgba(27, 23, 20, 0.82)), url('/assets/Tanha Ambiance/Ambiance-11.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1B1714'
        }}
      >
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        {/* Corner tribal boundaries */}
        <div className="absolute top-32 left-8 w-16 h-16 border-t-2 border-l-2 border-accent-3/30 pointer-events-none" />
        <div className="absolute top-32 right-8 w-16 h-16 border-t-2 border-r-2 border-accent-3/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-accent-3/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-accent-3/30 pointer-events-none" />

        {/* Center Cover */}
        <div className="max-w-container mx-auto w-full z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <LogoOwl className="w-10 h-10 text-accent-3" />
                  <span className="text-[11px] tracking-[0.45em] uppercase text-accent-3 font-semibold font-sans">
                    TANAH HOSPITALITY
                  </span>
                </div>
                
                <h2 className="font-display font-bold text-white leading-[1.1] tracking-wide"
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)' }}>
                  Where Teams Gather.<br />
                  <span className="italic text-accent-3 font-normal">Conversations Flow.</span><br />
                  Connections Grow.
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.2 }}
                className="text-lg md:text-xl font-display italic text-stone-300 max-w-xl"
              >
                An editorial corporate sanctuary inspired by local elements, crafted for meaningful connections.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <Link to="/book" className="btn-primary" style={{ backgroundColor: 'var(--color-accent-1)', borderColor: 'var(--color-accent-1)' }}>
                  Reserve Experience
                </Link>
                <a href="#why-tanah" className="btn-outline border-white/40 text-white hover:bg-white hover:text-black">
                  Explore Profile
                </a>
              </motion.div>
            </div>

            {/* Asymmetrical Framed Graphic Nest */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6 }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden border-4 border-stone-850 p-2 bg-stone-900 shadow-2xl">
                <img 
                  src="/assets/Tanha Ambiance/Ambiance-18.webp" 
                  alt="Tanah architecture and atmospheric dining" 
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>

        <div className="w-full z-10 pt-8">
          <DiamondDivider className="opacity-60" color="var(--color-accent-3)" />
        </div>
      </section>

      {/* ========================================================
          SECTION 2 – WHY TANAH (Theme: LIGHT)
          ======================================================== */}
      <section 
        id="why-tanah"
        ref={sec2Ref}
        className="relative py-28 px-8 text-[#1B1714]"
        style={{ backgroundColor: '#F5F0E6' }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isSec2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent-1 font-sans font-bold block">
                  CORPORATE SANCTUARY
                </span>
                <h3 className="font-display font-bold text-stone-900 text-4xl md:text-6xl leading-tight">
                  Why Tanah?
                </h3>
                <p className="text-xl font-display italic text-accent-2">
                  Building connections, one gathering at a time.
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-6 border-y border-stone-300">
                {[
                  "Team Building Dinners",
                  "Leadership Summits",
                  "Client Entertainment",
                  "Creative Brainstorming Sessions",
                  "Corporate Milestones",
                  "Annual Celebrations",
                  "Retreat Dinners",
                  "Product Launch Dinners"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3.5 text-base text-stone-800">
                    <span className="text-accent-1 text-sm">◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#EFE4D0] p-6 border-l-4 border-accent-1 relative shadow-sm">
                <p className="text-lg font-display text-stone-900 leading-relaxed">
                  More than a corporate venue, Tanah is a carefully orchestrated sanctuary where dialogue flows freely and professional bonds are naturally reinforced.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isSec2InView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-12 gap-4 relative"
            >
              <div className="col-span-8 aspect-[3/4] overflow-hidden shadow-xl border border-stone-350 bg-white p-1">
                <img 
                  src="/assets/Tanha Ambiance/Tanha Food/food-1.webp" 
                  alt="Team sharing food at Tanah" 
                  className="w-full h-full object-cover filter brightness-[0.98]"
                />
              </div>

              <div className="col-span-4 flex flex-col justify-between items-center py-6">
                <div className="animate-spin-slow opacity-80">
                  <TribalDiamond className="w-16 h-16 text-accent-1" />
                </div>
                
                <div className="w-full aspect-[3/4] overflow-hidden shadow-xl border border-stone-350 bg-white p-1">
                  <img 
                    src="/assets/Tanha Ambiance/Ambiance-22.webp" 
                    alt="Rooftop ambiance" 
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 – TANAH STORY (Theme: DARK)
          ======================================================== */}
      <section 
        ref={sec3Ref}
        className="relative py-28 px-8 text-stone-200 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(36, 28, 24, 0.9), rgba(36, 28, 24, 0.9)), url('/assets/Tanha Ambiance/Ambiance-2.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#241C18'
        }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={isSec3InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5 flex justify-center items-center relative order-2 lg:order-1"
            >
              <div className="absolute w-[90%] aspect-square rounded-full border border-accent-3/20 -z-0 animate-[spin_90s_linear_infinite]" />
              <div className="bg-stone-900/80 p-12 rounded-full border border-accent-2/30 shadow-2xl z-10 backdrop-blur-sm">
                <StoryNestOwl className="w-64 h-64 md:w-80 md:h-80 text-accent-3" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isSec3InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2 z-10"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent-3 font-sans font-bold block">
                THE TANAH STORY
              </span>
              
              <h3 className="font-display font-bold text-white text-4xl md:text-6xl leading-tight">
                Rooted in Earth
              </h3>

              <div className="space-y-6 text-lg font-light text-stone-300 leading-relaxed font-body">
                <p className="text-xl md:text-2xl font-display italic text-accent-3 border-b border-stone-700 pb-6">
                  "Architecture inspired by the organic nest, menu driven by local agricultural roots."
                </p>
                
                <p>
                  Tanah represents our deep affinity for the soil. Nestled in Gachibowli, Hyderabad, it serves as a luxurious physical chronicle where professionals transition from formal desks to relaxed, natural atmospheres. 
                </p>
                
                <p>
                  Our architecture is carefully structured from raw bamboo and basalt stone, creating an environment that feels alive, grounded, and inherently sophisticated.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 – EXPERIENCES (Theme: LIGHT)
          ======================================================== */}
      <section 
        ref={sec4Ref}
        className="relative py-28 px-8 text-[#1B1714]"
        style={{ backgroundColor: '#EFE4D0' }}
      >
        <div className="max-w-container mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isSec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-3xl text-left space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent-1 font-sans font-bold block">
              PREMIUM EXPERIENCE SPECTRUM
            </span>
            <h3 className="font-display font-bold text-stone-900 text-4xl md:text-6xl leading-tight">
              Hospitality Packages
            </h3>
            <p className="text-lg font-display italic text-accent-2">
              Bespoke settings tailored for collaborative corporate excellence.
            </p>
          </motion.div>

          {/* Luxury Asymmetric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {[
              {
                title: "Premium Board Dinners",
                desc: "An atmosphere designed for high-level conversations, paired with custom menus and flawless execution.",
                bg: "/assets/Tanha Ambiance/Ambiance-25.webp",
                tag: "EXECUTIVE"
              },
              {
                title: "Social Networking Receptions",
                desc: "Fluid layouts on our high-end open-air nest deck, perfect for key client bonding and celebratory milestones.",
                bg: "/assets/Tanha Ambiance/Ambiance-26.webp",
                tag: "CELEBRATIONS"
              },
              {
                title: "Gastronomic Masterclasses",
                desc: "Direct interactions around our live wood-fired hearths, providing unique hands-on culinary team-building.",
                bg: "/assets/Tanha Ambiance/Ambiance-24.webp",
                tag: "ENGAGEMENT"
              }
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isSec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-[#F5F0E6] border border-stone-300 flex flex-col justify-between text-left group overflow-hidden shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={exp.bg} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-accent-1 text-white font-sans text-[9px] tracking-[0.2em] font-semibold px-3 py-1">
                    {exp.tag}
                  </span>
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="font-display text-2xl font-bold text-stone-900 group-hover:text-accent-1 transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed font-light">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 – GALLERY (Theme: DARK)
          ======================================================== */}
      <section 
        ref={sec5Ref}
        className="relative py-28 px-8 text-stone-200 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(46, 36, 29, 0.92), rgba(46, 36, 29, 0.94)), url('/assets/Tanha Ambiance/Ambiance-18.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#2E241D'
        }}
      >
        <div className="max-w-container mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSec5InView ? { opacity: 1, y: 0 } : {}}
              className="text-left space-y-3"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent-3 font-sans font-bold block">
                VISUAL CHRONICLES
              </span>
              <h3 className="font-display font-bold text-white text-4xl md:text-6xl leading-tight">
                Atmospheric Archives
              </h3>
            </motion.div>
            
            <Link to="/gallery" className="btn-gold-outline flex items-center gap-2 self-start md:self-auto">
              Open Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Magazine Editorial Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-5 space-y-8">
              <div className="relative aspect-[3/4] overflow-hidden border border-stone-700 p-1.5 bg-stone-900 shadow-xl group">
                <img src="/assets/Tanha Ambiance/Ambiance-1.webp" alt="Ambiance" className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display italic text-lg text-white">The Nest Architecture</span>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden border border-stone-700 p-1.5 bg-stone-900 shadow-xl group">
                <img src="/assets/Tanha Ambiance/Ambiance-6.webp" alt="Ambiance" className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>

            <div className="md:col-span-7 space-y-8 md:pt-12">
              <div className="relative aspect-video overflow-hidden border border-stone-700 p-1.5 bg-stone-900 shadow-xl group">
                <img src="/assets/Tanha Ambiance/Ambiance-15.webp" alt="Ambiance" className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-stone-700 p-1.5 bg-stone-900 shadow-xl group">
                <img src="/assets/Tanha Ambiance/Ambiance-26.webp" alt="Ambiance" className="w-full h-full object-cover filter brightness-[0.9] transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6 – CORPORATE EVENTS (Theme: LIGHT)
          ======================================================== */}
      <section 
        ref={sec6Ref}
        className="relative py-28 px-8 text-[#1B1714]"
        style={{ backgroundColor: '#E6D5BB' }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Package Details */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isSec6InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent-1 font-sans font-bold block">
                  BESPOKE RESERVATIONS
                </span>
                <h3 className="font-display font-bold text-stone-900 text-4xl md:text-6xl leading-tight">
                  Corporate Packages
                </h3>
                <p className="text-lg font-display italic text-accent-2">
                  Fine hospitality optimized for your corporate needs.
                </p>
              </div>

              <p className="text-base text-stone-800 leading-relaxed font-body">
                We orchestrate dining profiles tailored specifically to your organization's criteria, providing customizable menus, technical presentation amenities, and completely private spaces.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-stone-400 bg-[#FAF8F5]/60 space-y-3 shadow-sm">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-accent-1">
                    Flexible Venues
                  </span>
                  <ul className="space-y-2 text-sm text-stone-850">
                    <li>✦ Roof-Deck Lounges</li>
                    <li>✦ Private Meeting Dining Rooms</li>
                    <li>✦ Complete Venue Buyouts</li>
                    <li>✦ Cocktails & Networking Layouts</li>
                  </ul>
                </div>

                <div className="p-6 border border-stone-400 bg-[#FAF8F5]/60 space-y-3 shadow-sm">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-accent-1">
                    Amenities & Logistics
                  </span>
                  <ul className="space-y-2 text-sm text-stone-850">
                    <li>✦ Audiovisual Equipments</li>
                    <li>✦ Curated Table Branding</li>
                    <li>✦ Personalized Menus</li>
                    <li>✦ Valet and VIP Coordination</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Image Composition */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={isSec6InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl border border-stone-400 p-2 bg-stone-100">
                <img 
                  src="/assets/Tanha Ambiance/Ambiance-25.webp" 
                  alt="Exclusive corporate booking setup" 
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-accent-1" />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-accent-1" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 – DINING EXPERIENCE (Theme: DARK)
          ======================================================== */}
      <section 
        ref={sec7Ref}
        className="relative py-28 px-8 text-stone-200 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(27, 23, 20, 0.9), rgba(27, 23, 20, 0.92)), url('/assets/Tanha Ambiance/Tanha Food/food-32.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1B1714'
        }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSec7InView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4 }}
              className="lg:col-span-5 grid grid-cols-12 gap-4 relative"
            >
              <div className="col-span-12 aspect-[4/3] overflow-hidden border border-stone-750 p-2 bg-stone-900 shadow-2xl">
                <img 
                  src="/assets/Tanha Ambiance/Tanha Food/food-30.webp" 
                  alt="Corporate dining layout at Tanah" 
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isSec7InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 text-left text-stone-200"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent-3 font-sans font-bold block">
                  ART OF GASTRONOMY
                </span>
                <h3 className="font-display font-bold text-white text-4xl md:text-6xl leading-tight">
                  Dining Experience
                </h3>
                <p className="text-lg font-display italic text-accent-3">
                  Heirloom grains, wood-fired hearths, and stone-ground spices.
                </p>
              </div>

              <p className="text-base text-stone-300 leading-relaxed font-light">
                Our kitchen operates on seasonal cycles, sourcing organic ingredients directly from regional micro-farms. By utilizing traditional fire cooking and charcoal-grill preservation, we showcase dishes rich in earthiness, purity, and heritage.
              </p>

              <div className="pt-4 border-t border-stone-850 flex gap-4">
                <Link to="/menu" className="btn-primary" style={{ backgroundColor: 'var(--color-accent-1)', borderColor: 'var(--color-accent-1)' }}>
                  View Menu Catalog
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8 – TESTIMONIALS (Theme: LIGHT)
          ======================================================== */}
      <section 
        ref={sec8Ref}
        className="relative py-28 px-8 text-[#1B1714]"
        style={{ backgroundColor: '#F5F0E6' }}
      >
        <div className="max-w-container mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSec8InView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent-1 font-sans font-semibold block">
              ENDORSEMENTS
            </span>
            <h3 className="font-display font-bold text-stone-900 text-4xl md:text-5xl leading-tight">
              Corporate Praise
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Tanah provided the exact atmosphere we needed for our leadership retreat. The balance between premium styling and comfortable, natural seating is exceptional.",
                author: "Devendra S.",
                org: "Enterprise Tech Solutions"
              },
              {
                quote: "Hosting our annual client dinner here was an absolute success. The wood-fired culinary experience combined with premium service left a lasting impression on our delegates.",
                author: "Ananya R.",
                org: "Venture Partners"
              },
              {
                quote: "A rare architectural gem in Gachibowli. It completely breaks away from normal templates. Perfect layout for hosting engaging team sessions.",
                author: "Kabir M.",
                org: "Interactive Media Inc."
              }
            ].map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isSec8InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="bg-[#EFE4D0] border border-stone-300 p-8 flex flex-col justify-between text-left relative"
              >
                <Quote className="w-8 h-8 text-accent-1/25 mb-4" />
                <p className="text-sm font-body font-light text-stone-800 leading-relaxed italic mb-8">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="font-display font-bold text-base text-stone-900">
                    {test.author}
                  </h4>
                  <span className="font-sans text-[10px] tracking-wider text-accent-2 font-medium">
                    {test.org}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9 – CONTACT / RESERVATION (Theme: DARK)
          ======================================================== */}
      <section 
        ref={sec9Ref}
        className="relative py-28 px-8 text-stone-200 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(36, 28, 24, 0.9), rgba(36, 28, 24, 0.92)), url('/assets/Tanha Ambiance/Ambiance-24.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#241C18'
        }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Form details / Contact details */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent-3 font-sans font-bold block">
                GET IN TOUCH
              </span>
              <h3 className="font-display font-bold text-white text-4xl md:text-6xl leading-tight">
                Secure Your Nest Space
              </h3>
              <p className="text-base text-stone-300 leading-relaxed font-light">
                Plan your next business outing, private dinner, or celebration with us. Let our team craft an editorial dining experience.
              </p>

              <div className="space-y-6 pt-4 border-t border-stone-800">
                <div className="flex items-center gap-4 text-sm font-light">
                  <MapPin className="w-5 h-5 text-accent-3 flex-shrink-0" />
                  <span>Gachibowli, Hyderabad, Telangana 500032</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-light">
                  <Phone className="w-5 h-5 text-accent-3 flex-shrink-0" />
                  <span>+91 40 4821 9900</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-light">
                  <Mail className="w-5 h-5 text-accent-3 flex-shrink-0" />
                  <span>gatherings@tanahkitchen.com</span>
                </div>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className="lg:col-span-7 w-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center bg-stone-900/60 border border-stone-850 shadow-2xl backdrop-blur-md"
                >
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-accent-3" />
                  <h3 className="font-display text-3xl font-bold mb-4 text-white">
                    Reservation Recorded
                  </h3>
                  <p className="text-sm font-light leading-relaxed mb-6 text-stone-300">
                    Thank you, <span className="font-semibold text-white">{form.name}</span>. We have reserved details for a party of <span className="font-semibold text-white">{form.guests}</span> on <span className="font-semibold text-white">{form.date}</span> at <span className="font-semibold text-white">{form.time}</span>. Our experience curator will follow up via <span className="font-semibold text-white">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                    style={{ backgroundColor: 'var(--color-accent-1)', borderColor: 'var(--color-accent-1)' }}
                  >
                    Host Another Event
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 md:p-12 space-y-6 bg-stone-900/60 border border-stone-850 shadow-2xl backdrop-blur-md"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="text-left">
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="form-input text-xs bg-stone-950 border-stone-800 text-white placeholder:text-stone-600 focus:bg-stone-900 focus:border-accent-3"
                        maxLength={80}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-accent-3 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="text-left">
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="form-input text-xs bg-stone-950 border-stone-800 text-white placeholder:text-stone-600 focus:bg-stone-900 focus:border-accent-3"
                        maxLength={120}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-accent-3 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Date */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                        Select Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        className="form-input text-xs bg-stone-950 border-stone-800 text-white focus:bg-stone-900 focus:border-accent-3"
                        style={{ colorScheme: 'dark' }}
                      />
                      {errors.date && (
                        <span className="text-[10px] text-accent-3 mt-1 block">
                          {errors.date}
                        </span>
                      )}
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                        Select Time
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="form-input text-xs bg-stone-950 border-stone-800 text-white focus:bg-stone-900 focus:border-accent-3"
                        style={{ height: '54px' }}
                      >
                        <option value="">Time Slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <span className="text-[10px] text-accent-3 mt-1 block">
                          {errors.time}
                        </span>
                      )}
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                        Party Size
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="form-input text-xs bg-stone-950 border-stone-800 text-white focus:bg-stone-900 focus:border-accent-3"
                        style={{ height: '54px' }}
                      >
                        <option value="">Guests</option>
                        {guestOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      {errors.guests && (
                        <span className="text-[10px] text-accent-3 mt-1 block">
                          {errors.guests}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="text-left">
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-stone-400">
                      Dietary Requirements / Special Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Add corporate details, allergen queries, or table selections..."
                      className="form-input text-xs bg-stone-950 border-stone-800 text-white placeholder:text-stone-600 focus:bg-stone-900 focus:border-accent-3 resize-none"
                      rows={3}
                      maxLength={500}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-center justify-center py-4 mt-4"
                    style={{ backgroundColor: 'var(--color-accent-1)', borderColor: 'var(--color-accent-1)' }}
                  >
                    <CalendarDays className="w-4 h-4" />
                    Book Gathering Table
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Spacer line */}
      <div className="w-full bg-[#1B1714] py-1">
        <DiamondDivider color="var(--color-accent-3)" className="my-0" />
      </div>
    </main>
  )
}
