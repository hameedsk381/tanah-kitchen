import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import eventsData from '../data/events.json'

export default function SignatureExperiences() {
  return (
    <section
      id="experiences"
      className="relative w-full bg-bg-secondary py-[var(--spacing-section)]"
    >
      <div className="max-w-container px-8 mx-auto">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-4">
            {eventsData.featuredTitle}
          </span>
          <h2 className="font-display font-light text-text-light" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
            {eventsData.featuredSubtitle}
          </h2>
        </div>

        {/* Experiences List */}
        <div className="space-y-36">
          {eventsData.items.map((exp, idx) => {
            const rowRef = useRef(null)
            const isInView = useInView(rowRef, { once: true, margin: '-100px' })
            const isEven = idx % 2 === 0

            return (
              <div
                key={exp.num}
                ref={rowRef}
                className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 relative hover-zoom"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-bg-primary relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover filter brightness-75 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/45 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-4 border border-gold/10 pointer-events-none" />
                </motion.div>

                {/* Info side */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl font-light text-gold/30">
                      {exp.num}
                    </span>
                    <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold">
                      {exp.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-text-light text-3xl md:text-4xl leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-light text-text-muted leading-relaxed">
                    {exp.desc}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
