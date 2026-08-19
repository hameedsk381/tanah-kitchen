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
    <main className="flex-grow pt-24 overflow-hidden bg-[#FAF6F0] text-[#3A2E2A]">
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

      {/* ── 1. Hero Header (WordPress Page Title Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 flex items-center justify-center border-b border-light-cream/15">
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <img
            src="/assets/Tanha Ambiance/Ambiance-12.webp"
            alt="Lush agricultural landscape"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2A]/90 via-[#6B2523]/70 to-[#6B2523]/85" />

        <div className="relative z-10 text-center px-6 wp-container">
          <span className="wp-badge wp-badge-gold mb-4">
            ✦ THE CHRONICLE ✦
          </span>
          <h1
            className="font-display font-extrabold leading-tight text-[#F6E1CB] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
          >
            Rooted in Earth, <br />
            <span className="italic font-normal text-[#FFC470]">Choreographed by Fire</span>
          </h1>
          <div className="w-20 h-[2px] bg-[#FFC470]/60 mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* ── 2. Brand Manifesto Banner (WordPress Callout Block) ── */}
      <section className="bg-[#541B1A] py-14 border-b border-[#6B2523]/40 text-[#DEC8AB]">
        <div className="wp-container text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#FFC470] block mb-4 font-body">
            BRAND MANIFESTO
          </span>
          <blockquote
            className="font-display italic text-[#F6E1CB] leading-snug max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
          >
            "We've built this place like birds build their nests—branch by branch, to make you feel at home."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#DEC8AB]/30" />
            <span className="text-[#FFC470] text-xs tracking-[0.3em] font-body uppercase font-semibold">
              Tanah Kitchen & Bar · ESTD 2025
            </span>
            <span className="h-px w-16 bg-[#DEC8AB]/30" />
          </div>
        </div>
      </section>

      {/* ── 3. Logo Symbol Breakdown (WordPress 4-Column Card Grid) ── */}
      <section ref={logoRef} className="wp-section bg-[#FAF6F0] border-b border-[#6B2523]/10">
        <div className="wp-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isLogoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-14"
          >
            <span className="wp-badge wp-badge-maroon mb-3">
              THE TANAH LOGO
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#6B2523]">
              Every Symbol Has a Story
            </h2>
            <p className="mt-4 text-base font-light text-[#3A2E2A]/75 max-w-xl mx-auto font-body leading-relaxed">
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
                className="wp-card p-7 text-left group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#6B2523]/10 flex items-center justify-center p-3 text-[#6B2523] mb-5 group-hover:bg-[#6B2523] group-hover:text-[#FFC470] transition-colors duration-300">
                  <Icon className="w-full h-full" color="currentColor" />
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#6B2523]/60 font-body mb-1">
                  {symbol}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#6B2523] mb-3">
                  {meaning}
                </h3>
                <p className="text-xs font-light text-[#3A2E2A]/75 leading-relaxed font-body">
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
            <p className="text-xs tracking-[0.3em] uppercase text-[#6B2523]/70 font-bold font-body mb-4">
              ✦ BRAND DNA ✦
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
              {brandKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold rounded-full bg-white border border-[#6B2523]/20 text-[#6B2523] px-4 py-1.5 font-body tracking-wider uppercase shadow-sm hover:bg-[#6B2523] hover:text-[#F6E1CB] transition-all duration-300 cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. 7-Step Emotional Journey (WordPress Step Timeline) ── */}
      <section ref={journeyRef} className="wp-section section-dark text-[#EFE1D0] border-b border-light-cream/10">
        <div className="wp-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-14"
          >
            <span className="wp-badge wp-badge-gold mb-3">
              THE EXPERIENCE
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#DEC8AB]">
              Your Journey at Tanah
            </h2>
            <p className="mt-4 text-base font-light text-[#EFE1D0]/80 max-w-xl mx-auto font-body leading-relaxed">
              Every visit is designed to move through seven emotional states—from arrival to belonging.
            </p>
          </motion.div>

          {/* Journey Steps Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {emotionalJourney.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="wp-card-dark p-6 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#FFC470]/20 text-[#FFC470] flex items-center justify-center font-display font-bold text-sm">
                      {item.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#FFC470]/60 font-body font-semibold">
                      Phase {item.step}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#DEC8AB] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs font-light text-[#EFE1D0]/75 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Tanah? (WordPress 2-Column Split Block) ── */}
      <section ref={whyRef} className="wp-section bg-[#FAF6F0] border-b border-[#6B2523]/10">
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <motion.div
              className="col-span-12 lg:col-span-6 space-y-6 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="wp-badge wp-badge-maroon mb-3">
                  PRIVATE DINING & EVENTS
                </span>
                <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#6B2523]">
                  Why Tanah?
                </h2>
                <p className="text-lg font-display italic text-[#6B2523]/85 mt-2">
                  Intimate gatherings, celebrated with exceptional food and ambiance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {whyTanahList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#6B2523]/10 flex items-center gap-2.5 shadow-sm text-sm font-medium text-[#3A2E2A]"
                  >
                    <span className="text-[#6B2523] font-bold">✦</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-[#6B2523]/5 border-l-4 border-[#6B2523]">
                <p className="text-base font-display leading-relaxed text-[#6B2523]">
                  Whether it's a dinner for <span className="font-bold text-[#6B2523]">10</span> or a celebration for <span className="font-bold text-[#6B2523]">200</span>, Tanah creates private dining experiences people remember.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-6 grid grid-cols-12 gap-4 items-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isWhyInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="col-span-12 md:col-span-7 aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-[#6B2523]/15">
                <img
                  src="/assets/Tanha Food/food-1.webp"
                  alt="Curated food at Tanah"
                  className="w-full h-full object-cover filter brightness-[0.92] hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-[#6B2523]/15">
                  <img
                    src="/assets/Tanha Ambiance/Ambiance-3.webp"
                    alt="Tanah architecture detail"
                    className="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 6. The Story Section (WordPress Editorial Block) ── */}
      <section ref={storyRef} className="wp-section section-dark text-[#EFE1D0]">
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <motion.div
              className="col-span-12 lg:col-span-7 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 relative group">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-26.webp"
                  alt="Atmospheric rooftop dining experience at Tanah"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                />
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5 space-y-6 order-1 lg:order-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="wp-badge wp-badge-gold">
                THE TANAH STORY
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#DEC8AB]">
                Our Foundation & Vision
              </h2>
              <p className="text-base font-light text-[#EFE1D0]/90 leading-relaxed font-body">
                Every detail of our space—from the organic bamboo weave ceilings to the raw basalt dinner plates—is carefully crafted to reconnect people with nature. We aim to foster a culture of mindful gathering under Hyderabad's sky.
              </p>
              <p className="text-base font-light text-[#EFE1D0]/80 leading-relaxed font-body">
                We design environments that are not just beautiful, but deeply personal—where conversations flow naturally and people can build authentic relationships beyond the ordinary.
              </p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-base italic font-display text-[#FFC470] leading-relaxed">
                  "Birds find each other mid-flight, and so do we—at the bar, in the kitchen, over shared plates and poured stories."
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 7. Circularity & Sustainability (WordPress 3-Column Card Grid) ── */}
      <section
        ref={sustainabilityRef}
        className="wp-section bg-[#FAF6F0] text-[#3A2E2A]"
      >
        <div className="wp-container space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="wp-badge wp-badge-maroon">
              CIRCULARITY
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#6B2523]">
              Earthy Stewardship
            </h2>
            <p className="text-base font-light text-[#3A2E2A]/75 leading-relaxed font-body">
              Our culinary philosophy centers on local stewardship, seasonal circularity, and reducing food waste through natural charcoal preservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="wp-card p-8 text-left space-y-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6B2523]/10 text-[#6B2523] flex items-center justify-center font-bold text-lg">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#6B2523]">{item.title}</h3>
                <p className="text-sm font-light text-[#3A2E2A]/75 leading-relaxed font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
