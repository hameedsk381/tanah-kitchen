import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import aboutData from '../data/about.json'

export default function Philosophy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { philosophy } = aboutData

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-bg-primary py-[var(--spacing-section)]"
    >
      <div className="max-w-container px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative hover-zoom"
          >
            <div className="aspect-[4/5] overflow-hidden bg-bg-secondary relative">
              <img
                src={philosophy.image}
                alt="Partner organic farm harvest"
                className="w-full h-full object-cover filter brightness-75 contrast-105"
              />
              <div className="absolute inset-4 border border-terracotta/20 pointer-events-none" />
            </div>
            <div className="absolute -top-6 -left-6 w-full h-full border border-terracotta/10 -z-10 pointer-events-none" />
          </motion.div>

          {/* Right Column: Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-terracotta block">
              {philosophy.subtitle}
            </span>
            
            <h2 className="font-display font-light text-warm-ivory leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {philosophy.title}<br />
              <span className="italic text-copper">{philosophy.titleItalic}</span>
            </h2>

            <p className="text-sm font-light text-sand-beige leading-relaxed">
              {philosophy.paragraph1}
            </p>
            
            <p className="text-sm font-light text-sand-beige leading-relaxed">
              {philosophy.paragraph2}
            </p>

            <div className="pt-6">
              <Link
                to="/about"
                className="btn-gold-outline py-3.5 px-8 text-[9px] tracking-[0.2em]"
              >
                Discover Our Journey
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
