import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import aboutData from '../data/about.json'

export default function ArtGastronomy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { quoteSection, philosophy } = aboutData

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-primary py-[var(--spacing-section)]"
    >
      <div className="max-width-container px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block">
              {quoteSection.subtitle}
            </span>
            <h2 className="font-display font-light text-text-light leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Art &<br />
              <span className="text-gold">Gastronomy</span>
            </h2>
            <p className="text-sm font-light text-text-muted leading-relaxed">
              {quoteSection.quote}
            </p>
            <p className="text-sm font-light text-text-muted leading-relaxed">
              We design menus as sensory exhibitions. Just as a gallery presents selected sculptures, our chefs curate heirloom crops, wild honey, and coal-fired smoke. Our plates are handcrafted in partnership with traditional ceramic houses.
            </p>
          </motion.div>

          {/* Visual Showcase */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-8 hover-zoom"
            >
              <div className="aspect-[4/3] overflow-hidden bg-bg-secondary relative">
                <img
                  src="/images/about.png"
                  alt="Raw organic ingredients and architectural ceramics"
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 60 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-4 self-end hover-zoom"
            >
              <div className="aspect-[3/4] overflow-hidden bg-bg-secondary relative">
                <img
                  src="/images/gallery_spices.png"
                  alt="Stone milled organic spices"
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
