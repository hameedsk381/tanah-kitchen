import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LogoOwl, TribalDiamond, DiamondDivider } from '../components/illustrations'

const whyTanahList = [
  "Team Lunches & Dinners",
  "Employee Engagement Events",
  "Leadership Gatherings",
  "Project Celebrations",
  "Client Meetings",
  "Annual Team Outings",
  "Farewell & Welcome Events",
  "Festival Celebrations",
  "Informal Networking Sessions"
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

  const sustainabilityRef = useRef(null)
  const isSustainabilityInView = useInView(sustainabilityRef, { once: true, margin: '-100px' })

  return (
    <main className="flex-grow pt-24 bg-bg-primary overflow-hidden text-text-dark">
      
      {/* Editorial Page Header */}
      <section className="relative py-24 md:py-[8rem] flex items-center justify-center border-b border-terracotta/15 bg-bg-secondary">
        <div className="absolute inset-0 opacity-15 mix-blend-multiply">
          <img
            src="/assets/Tanha Ambiance/Ambiance-12.webp"
            alt="Lush agricultural landscape"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative z-10 text-center px-8 max-w-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-terracotta block mb-4">
            The Chronicle
          </span>
          <h1 
            className="font-display font-light text-text-dark leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Rooted in Earth, <br />
            <span className="italic text-terracotta">Choreographed by Fire</span>
          </h1>
          <div className="max-w-md mx-auto mt-4">
            <DiamondDivider color="var(--color-terracotta)" />
          </div>
        </div>
      </section>

      {/* Why Tanah? Booklet Section (Matches Page 3 of PDF) */}
      <section 
        ref={whyRef}
        className="relative py-20 bg-bg-primary"
      >
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Why Tanah text & list */}
            <motion.div 
              className="lg:col-span-6 space-y-8 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-accent block mb-2 font-body">
                  CORPORATE SOLUTIONS
                </span>
                <h2 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
                  Why Tanah?
                </h2>
                <p className="text-lg font-display italic text-terracotta mt-2">
                  More than a venue. A place to build stronger teams.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-y border-terracotta/10 py-6">
                {whyTanahList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-light text-text-dark/90">
                    <span className="text-terracotta text-sm">◇</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-base font-display text-text-dark/95 leading-relaxed bg-bg-secondary/40 p-4 border-l-2 border-terracotta">
                Whether it's a team of <span className="font-semibold text-terracotta font-body text-lg">10</span> or a celebration of <span className="font-semibold text-terracotta font-body text-lg">200</span>, Tanah creates experiences people remember.
              </p>
            </motion.div>

            {/* Right Column: Double Editorial Image Spread with Tribal motif */}
            <motion.div 
              className="lg:col-span-6 grid grid-cols-12 gap-4 items-center relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isWhyInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="col-span-7 aspect-[3/4] overflow-hidden shadow-xl border border-dark-brown/10 relative">
                <img
                  src="/assets/Tanha Ambiance/Tanha Food/01.webp"
                  alt="Curated food at Tanah"
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
              </div>

              <div className="col-span-5 flex flex-col gap-6 items-center">
                <TribalDiamond className="w-16 h-16 text-terracotta" color="var(--color-terracotta)" />
                
                <div className="w-full aspect-[3/4] overflow-hidden shadow-xl border border-dark-brown/10">
                  <img
                    src="/assets/Tanha Ambiance/Ambiance-3.webp"
                    alt="Tanah architecture detail"
                    className="w-full h-full object-cover filter brightness-[0.85]"
                  />
                </div>
              </div>

              {/* Background accent details */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-terracotta/25 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-terracotta/25 -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section 
        ref={storyRef}
        className="relative py-20 bg-bg-secondary"
      >
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              className="lg:col-span-7 relative order-2 lg:order-1 hover-zoom"
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
              <div className="absolute inset-4 border border-terracotta/20 pointer-events-none" />
            </motion.div>

            <motion.div 
              className="lg:col-span-5 space-y-6 order-1 lg:order-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
                THE TANAH STORY
              </span>
              <h2 className="font-display font-light text-text-dark text-4xl leading-tight">
                Our Foundation & Vision
              </h2>
              <p className="text-sm font-light text-text-dark/80 leading-relaxed font-body">
                Every detail of our space, from the organic bamboo weave ceilings to the raw basalt dinner plates, is carefully crafted to reconnect people with nature. We aim to foster a culture of mindful gathering under Hyderabad's sky.
              </p>
              <p className="text-sm font-light text-text-dark/80 leading-relaxed font-body">
                We design environments that are not just beautiful, but deeply personal—where conversations flow naturally and professionals can build authentic relationships beyond office walls.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Circularity & Sustainability Section */}
      <section 
        ref={sustainabilityRef}
        className="relative py-20 bg-bg-primary border-t border-terracotta/10"
      >
        <div className="max-w-container px-8 mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
              Circularity
            </span>
            <h2 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
              Earthy Stewardship
            </h2>
            <p className="text-sm font-light text-text-dark/70 leading-relaxed font-body">
              Our culinary philosophy centers on local stewardship, seasonal circularity, and reducing food waste through natural charcoal preservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4 border-t border-terracotta/20 pt-8 text-left"
            >
              <h3 className="font-display text-2xl font-light text-terracotta">Zero Waste Kitchen</h3>
              <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                We recycle organic kitchen scraps into compost for native growers, maintaining a closed-loop food lifecycle.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 border-t border-terracotta/20 pt-8 text-left"
            >
              <h3 className="font-display text-2xl font-light text-terracotta">Local Sourcing</h3>
              <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                Partnering exclusively with local micro-farms within a 100km radius to ensure the highest quality seasonal ingredients.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 border-t border-terracotta/20 pt-8 text-left"
            >
              <h3 className="font-display text-2xl font-light text-terracotta">Handcrafted Ethos</h3>
              <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                All dinnerware, ceramics, and architecture are custom creations by local tribal artisans, preserving regional heritage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
