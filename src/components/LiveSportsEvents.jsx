import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Calendar, Trophy, Music, Tv } from 'lucide-react'

const events = [
  {
    id: 'ev-1',
    title: 'Match Screening Under the Stars',
    category: 'Live Sports',
    desc: 'Live high-definition projection of premier football & cricket tournament matches on our ambient rooftop deck.',
    schedule: 'Every Weekend | 7:30 PM onwards',
    icon: Tv
  },
  {
    id: 'ev-2',
    title: 'Sufi & Hearthside Acoustics',
    category: 'Live Music',
    desc: 'Soul-stirring live Sufi melodies and acoustic performances paired with slow tandoor grill highlights.',
    schedule: 'Wednesday & Thursday | 8:00 PM onwards',
    icon: Music
  },
  {
    id: 'ev-3',
    title: 'Sunset & Soundscapes Session',
    category: 'Rooftop DJ Set',
    desc: 'Progressive organic house beats by guest selectors as the sun dips below the Gachibowli skyline.',
    schedule: 'Friday | 6:00 PM onwards',
    icon: Calendar
  }
]

export default function LiveSportsEvents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full py-[var(--spacing-section)] bg-bg-primary overflow-hidden"
      aria-labelledby="events-heading"
    >
      {/* Texture Details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-burnt-earth/5 rounded-full blur-3xl pointer-events-none" />

      <div className="px-8 max-width-container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Storytelling & Calendar Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-10"
          >
            <div>
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
                Culture & Rhythm
              </span>
              <h2
                id="events-heading"
                className="font-display font-light text-warm-ivory leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Live Sports &<br />
                <span className="text-copper">Rooftop Gatherings</span>
              </h2>
              <p className="text-sm font-light text-sand-beige mt-6 leading-relaxed max-w-xl">
                Experience the thrills of live sports and live soundscapes at Hyderabad's premier rooftop destination. Giant screens, acoustic performances, and slow-matured cocktails come together under the open skies.
              </p>
            </div>

            {/* List of Events */}
            <div className="space-y-6">
              {events.map((ev, idx) => {
                const Icon = ev.icon
                return (
                  <div 
                    key={ev.id}
                    className="flex gap-6 p-6 bg-bg-secondary border border-terracotta/10 hover:border-terracotta/25 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-terracotta/10 border border-terracotta/20 text-terracotta">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-semibold tracking-widest uppercase text-copper block">
                        {ev.category}
                      </span>
                      <h3 className="font-display text-xl text-warm-ivory font-light">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-light text-sand-beige/90 leading-relaxed">
                        {ev.desc}
                      </p>
                      <span className="text-[10px] font-medium text-muted-beige block pt-1">
                        {ev.schedule}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase (Large-scale rooftop projection/social environment image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative hover-zoom"
          >
            <div className="aspect-[4/5] overflow-hidden bg-bg-secondary relative">
              <img
                src="/assets/Ambiance/TANAH_Amb01031.jpg"
                alt="Live match screening social event on Tanah Rooftop Deck"
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
              <div className="absolute inset-6 border border-terracotta/20 pointer-events-none" />
            </div>
            
            {/* Architectural Layer Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-terracotta/30 -z-10 pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r border-t border-terracotta/30 -z-10 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
