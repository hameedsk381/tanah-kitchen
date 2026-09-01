import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Sprout, ShieldAlert } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about-preview"
      ref={ref}
      className="relative overflow-hidden py-[var(--spacing-section)]"
      style={{ 
        background: 'var(--color-cream)',
      }}
      aria-labelledby="about-preview-heading"
    >
      <div 
        className="max-width-container px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Premium Interactive Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Primary Image */}
            <div className="hover-zoom aspect-[4/5] overflow-hidden shadow-2xl relative rounded-3xl">
              <img
                src="/images/farm_organic.png"
                alt="Tanah partners organic farm harvest at golden hour"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(27, 67, 50, 0.4) 100%)',
                }}
              />
            </div>

            {/* Overlapping Floating Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={isInView ? { scale: 1, opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -right-4 md:-right-10 p-8 shadow-2xl max-w-[280px] rounded-3xl sm:absolute mt-6 sm:mt-0"
              style={{ background: 'var(--color-forest)', color: 'var(--color-cream)' }}
            >
              <p className="font-display text-xl font-medium leading-snug mb-2">
                100% Organically Certified
              </p>
              <p className="text-xs font-light opacity-80 leading-relaxed">
                Direct partnerships with regional regenerative farms to ensure culinary purity.
              </p>
            </motion.div>

            {/* Subtle organic outline shape */}
            <div
              className="absolute -top-6 -left-6 w-full h-full border border-solid -z-10 pointer-events-none"
              style={{ borderColor: 'var(--color-terracotta)', opacity: 0.15 }}
            />
          </motion.div>

          {/* Right Column: Narrative Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-4"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Our Philosophy
            </span>
            
            <h2
              id="about-preview-heading"
              className="font-display mb-8 leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: 'var(--color-forest)',
              }}
            >
              Nurtured by Soil, <br />
              <span className="" style={{ color: 'var(--color-brown)' }}>Inspired by Earth.</span>
            </h2>

            <p
              className="text-base font-light mb-6 leading-relaxed"
              style={{ color: 'var(--color-charcoal)' }}
            >
              At Tanah Kitchen, we listen to the soil. Named after the Malay word for earth, our kitchen is a tribute to raw ingredients, cyclical farming, and mindful hospitality. We believe that great meals are grown, not manufactured.
            </p>
            
            <p
              className="text-base font-light mb-10 leading-relaxed"
              style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}
            >
              We craft each recipe by celebrating the changing of seasons. Eliminating standard supply chains, we curate daily harvests from family-run farms in Haryana and Rajasthan. What you enjoy tonight was harvested yesterday — pure, native, and full of life.
            </p>

            {/* Feature row */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                  Regenerative Sourcing
                </h4>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                  Our farm partners feed the earth with natural compost, building healthy soils for nutrition-rich crops.
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                  Zero-Waste Culinary
                </h4>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                  Peels, leaves, and stems find purpose in our homemade oils, fermented vinegars, and organic broths.
                </p>
              </div>
            </div>

            <Link
              to="/about"
              className="btn-outline text-xs tracking-widest uppercase font-semibold"
            >
              Discover Our Journey
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
