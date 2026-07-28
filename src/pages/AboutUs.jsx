import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LogoOwl, TribalDiamond, DiamondDivider, WinkingOwl, FoodOwl, PartyOwl, BambooOwl } from '../components/illustrations'
import SEO from '../components/SEO'

// Logo symbol breakdown from official Brand Story document
const logoSymbols = [
  {
    icon: WinkingOwl,
    symbol: 'Bird Head',
    meaning: 'Freedom',
    desc: "Returning home, finding peace, and enjoying the day's rewards. The bird atop the log represents homecoming and comfort."
  },
  {
    icon: FoodOwl,
    symbol: 'Twig / Branch',
    meaning: 'Food & Nest',
    desc: 'Gathering materials, slow cooking, rustic nourishment. Every branch is intentional—built to make you feel at home.'
  },
  {
    icon: PartyOwl,
    symbol: 'Wine Glass',
    meaning: 'Relax',
    desc: 'Slowing down, evening conversations, social warmth. The glass is an invitation to pause and be present.'
  },
  {
    icon: BambooOwl,
    symbol: 'Bamboo',
    meaning: 'Home',
    desc: 'Shelter, stability, rootedness in nature. Bamboo is the original sanctuary—resilient, grounded, and welcoming.'
  }
]

// 7-step emotional journey from brand document
const emotionalJourney = [
  { step: '01', title: 'Arrive', desc: 'Step through the door and leave the world behind.' },
  { step: '02', title: 'Feel Welcomed', desc: 'Warmth greets you—handcrafted spaces, familiar warmth.' },
  { step: '03', title: 'Relax', desc: 'Unwind. The air, the light, and the calm work their magic.' },
  { step: '04', title: 'Share Food', desc: 'Plates arrive. Stories begin. Flavours open conversations.' },
  { step: '05', title: 'Share Stories', desc: 'The table becomes a stage for laughter, memories and honesty.' },
  { step: '06', title: 'Feel at Home', desc: 'Somewhere in between the food and the company—you belong here.' },
  { step: '07', title: 'Return', desc: "You'll come back. That feeling is rare. We've kept your seat." }
]

const brandKeywords = [
  'Earth', 'Home', 'Gathering', 'Freedom', 'Nature',
  'Food', 'Stories', 'Wine', 'Relaxation', 'Nest',
  'Comfort', 'Community', 'Hospitality'
]

const whyTanahList = [
  'Intimate Dinner Parties',
  'Private Celebrations',
  'Anniversary Dinners',
  'Birthday Celebrations',
  'Corporate Events',
  'Family Gatherings',
  'Wine Tasting Experiences',
  'Curated Dining Experiences',
  'Exclusive Table Reservations'
]

export default function AboutUs() {
  useEffect(() => {
    document.title = 'Philosophy | Tanah Kitchen & Bar'
    window.scrollTo(0, 0)
  }, [])

  const storyRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })

  const whyRef = useRef(null)
  const isWhyInView = useInView(whyRef, { once: true, margin: '-100px' })

  const logoRef = useRef(null)
  const isLogoInView = useInView(logoRef, { once: true, margin: '-100px' })

  const journeyRef = useRef(null)
  const isJourneyInView = useInView(journeyRef, { once: true, margin: '-100px' })

  const sustainabilityRef = useRef(null)
  const isSustainabilityInView = useInView(sustainabilityRef, { once: true, margin: '-100px' })

  return (
    <main className="flex-grow pt-24 overflow-hidden">
      <SEO
        title="Our Philosophy & Brand Story | Tanah Kitchen & Bar Gachibowli"
        description="Discover the story of Tanah Kitchen & Bar. Meaning 'Earth', Tanah is built branch by branch like a nest—celebrating community, rest, organic architecture, and authentic hospitality."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'name': 'The Tanah Story & Philosophy',
          'url': 'https://tanahkitchen.in/about',
          'mainEntity': {
            '@type': 'Organization',
            'name': 'Tanah Kitchen & Bar',
            'foundingDate': '2025',
            'description': 'A community gathering place built on the symbolism of birds, nests, and the earth.'
          }
        }}
      />

      {/* ── Hero Header ── */}
      <section className="section-dark relative py-24 md:py-[8rem] flex items-center justify-center border-b border-light-cream/15">
        <div className="absolute inset-0 opacity-15 mix-blend-multiply">
          <img
            src="/assets/Tanha Ambiance/Ambiance-12.webp"
            alt="Lush agricultural landscape"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative z-10 text-center px-8 max-width-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase section-accent block mb-4">
            The Chronicle
          </span>
          <h1
            className="font-display font-light leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Rooted in Earth, <br />
            <span className="italic section-accent">Choreographed by Fire</span>
          </h1>
          <div className="max-w-md mx-auto mt-4">
            <DiamondDivider className="section-divider" />
          </div>
        </div>
      </section>

      {/* ── Brand Manifesto Banner ── */}
      <section className="bg-[#3A2E2A] py-14 border-b border-[#6B2523]/30">
        <div className="max-width-container px-8 mx-auto text-center">
          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-[#DEC8AB]/60 block mb-5 font-body">
            BRAND MANIFESTO
          </span>
          <blockquote
            className="font-display italic text-[#DEC8AB] leading-snug max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2.1rem)' }}
          >
            "We've built this place like birds build their nests—branch by branch, to make you feel at home."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#DEC8AB]/30" />
            <span className="text-[#FFC470] text-xs tracking-[0.3em] font-body uppercase font-semibold">Tanah Kitchen & Bar · ESTD 2025</span>
            <span className="h-px w-16 bg-[#DEC8AB]/30" />
          </div>
        </div>
      </section>

      {/* ── Logo Symbol Breakdown ── */}
      <section ref={logoRef} className="section-light relative py-20 border-b border-[#6B2523]/10">
        <div className="max-width-container px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isLogoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase section-accent block mb-3 font-body">
              THE TANAH LOGO
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight">
              Every Symbol Has a Story
            </h2>
            <p className="mt-4 text-sm font-light text-[#3A2E2A]/70 max-w-xl mx-auto font-body leading-relaxed">
              The logo was crafted to combine rustic charm, natural textures, and a handcrafted identity. Each element holds deep meaning rooted in the Tanah philosophy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {logoSymbols.map(({ icon: Icon, symbol, meaning, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isLogoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="group border border-[#6B2523]/15 bg-white/40 hover:bg-[#6B2523] p-6 text-left transition-all duration-500 cursor-default"
              >
                <div className="mb-4 text-[#6B2523] group-hover:text-[#DEC8AB] transition-colors duration-500">
                  <Icon className="w-14 h-14" color="currentColor" />
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#6B2523]/50 group-hover:text-[#DEC8AB]/50 font-body transition-colors duration-500 mb-1">
                  {symbol}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#6B2523] group-hover:text-[#FFC470] transition-colors duration-500 mb-3">
                  {meaning}
                </h3>
                <p className="text-xs font-light text-[#3A2E2A]/70 group-hover:text-[#F6E1CB]/80 leading-relaxed font-body transition-colors duration-500">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Brand Keywords Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLogoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 text-center"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B2523]/40 font-body mb-5">Brand DNA</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {brandKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs border border-[#6B2523]/25 text-[#6B2523] px-3 py-1 font-body tracking-widest uppercase hover:bg-[#6B2523] hover:text-[#F6E1CB] transition-all duration-300 cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7-Step Emotional Journey ── */}
      <section ref={journeyRef} className="section-dark relative py-20 border-b border-light-cream/10">
        <div className="max-width-container px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase section-accent block mb-3 font-body">
              THE EXPERIENCE
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight">
              Your Journey at Tanah
            </h2>
            <p className="mt-4 text-sm font-light text-[#EFE1D0]/70 max-w-xl mx-auto font-body leading-relaxed">
              Every visit is designed to move through seven emotional states—from arrival to belonging.
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="relative">
            {/* Connecting vertical line */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#DEC8AB]/20" />

            <div className="space-y-4 lg:space-y-0">
              {emotionalJourney.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={isJourneyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`lg:grid lg:grid-cols-12 lg:gap-8 items-center py-4 ${isLeft ? '' : 'lg:direction-rtl'}`}
                  >
                    {/* Content side */}
                    <div className={`col-span-5 ${isLeft ? 'lg:text-right lg:col-start-1' : 'lg:col-start-8 lg:text-left'}`}>
                      <div className={`flex items-start gap-4 ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        <div className="flex-shrink-0 bg-[#6B2523] border border-[#DEC8AB]/30 w-12 h-12 flex items-center justify-center">
                          <span className="font-display text-xs font-bold text-[#DEC8AB] tracking-wider">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-display text-xl font-bold text-[#DEC8AB] mb-1">{item.title}</h4>
                          <p className="text-xs font-light text-[#EFE1D0]/70 leading-relaxed font-body">{item.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex col-span-2 col-start-6 justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#FFC470] border-2 border-[#6B2523] relative z-10" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Tanah? ── */}
      <section ref={whyRef} className="section-light relative py-20">
        <div className="max-width-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div
              className="col-span-12 lg:col-span-6 space-y-8 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="text-[10px] font-semibold tracking-[0.4em] uppercase section-accent block mb-2 font-body">
                  PRIVATE DINING & EVENTS
                </span>
                <h2 className="font-display font-light text-4xl md:text-5xl leading-tight">
                  Why Tanah?
                </h2>
                <p className="text-lg font-display italic section-accent mt-2">
                  Intimate gatherings, celebrated with exceptional food and ambiance.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-y border-[#6B2523]/10 py-6">
                {whyTanahList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-light">
                    <span className="section-accent text-sm">◇</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-base font-display leading-relaxed bg-[#6B2523]/10 p-4 border-l-2 border-[#6B2523]">
                Whether it's a dinner for <span className="font-semibold section-accent font-body text-lg">10</span> or a celebration for <span className="font-semibold section-accent font-body text-lg">200</span>, Tanah creates private dining experiences people remember.
              </p>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-6 grid grid-cols-12 gap-4 items-center relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isWhyInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="col-span-12 md:col-span-7 aspect-[3/4] overflow-hidden shadow-xl border border-dark-brown/10 relative">
                <img
                  src="/assets/Tanha Food/food-1.webp"
                  alt="Curated food at Tanah"
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col gap-6 items-center">
                <div className="w-full aspect-[3/4] overflow-hidden shadow-xl border border-dark-brown/10">
                  <img
                    src="/assets/Tanha Ambiance/Ambiance-3.webp"
                    alt="Tanah architecture detail"
                    className="w-full h-full object-cover filter brightness-[0.85]"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-[#6B2523]/25 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-[#6B2523]/25 -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── The Story Section ── */}
      <section ref={storyRef} className="section-dark relative py-20">
        <div className="max-width-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div
              className="col-span-12 lg:col-span-7 relative order-2 lg:order-1 hover-zoom"
              initial={{ opacity: 0, x: -30 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[16/10] w-full overflow-hidden relative shadow-lg">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-26.webp"
                  alt="Atmospheric rooftop dining experience at Tanah"
                  className="w-full h-full object-cover filter brightness-90 contrast-105"
                />
              </div>
              <div className="absolute inset-4 border border-light-cream/20 pointer-events-none" />
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5 space-y-6 order-1 lg:order-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase section-accent block">
                THE TANAH STORY
              </span>
              <h2 className="font-display font-light text-4xl leading-tight">
                Our Foundation & Vision
              </h2>
              <p className="text-sm font-light opacity-90 leading-relaxed font-body">
                Every detail of our space—from the organic bamboo weave ceilings to the raw basalt dinner plates—is carefully crafted to reconnect people with nature. We aim to foster a culture of mindful gathering under Hyderabad's sky.
              </p>
              <p className="text-sm font-light opacity-80 leading-relaxed font-body">
                We design environments that are not just beautiful, but deeply personal—where conversations flow naturally and people can build authentic relationships beyond the ordinary.
              </p>
              <div className="border-t border-[#DEC8AB]/20 pt-6">
                <p className="text-sm italic font-display text-[#DEC8AB] leading-relaxed">
                  "Birds find each other mid-flight, and so do we—at the bar, in the kitchen, over shared plates and poured stories."
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Circularity & Sustainability ── */}
      <section
        ref={sustainabilityRef}
        className="section-light relative py-20 border-t border-[#6B2523]/10"
      >
        <div className="max-width-container px-8 mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase section-accent block">
              Circularity
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight">
              Earthy Stewardship
            </h2>
            <p className="text-sm font-light opacity-80 leading-relaxed font-body">
              Our culinary philosophy centers on local stewardship, seasonal circularity, and reducing food waste through natural charcoal preservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Zero Waste Kitchen',
                desc: 'We recycle organic kitchen scraps into compost for native growers, maintaining a closed-loop food lifecycle.'
              },
              {
                title: 'Local Sourcing',
                desc: 'Partnering exclusively with local micro-farms within a 100km radius to ensure the highest quality seasonal ingredients.'
              },
              {
                title: 'Handcrafted Ethos',
                desc: 'All dinnerware, ceramics, and architecture are custom creations by local tribal artisans, preserving regional heritage.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="space-y-4 border-t border-[#6B2523]/20 pt-8 text-left"
              >
                <h3 className="font-display text-2xl font-light section-accent">{item.title}</h3>
                <p className="text-xs font-light opacity-80 leading-relaxed font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
