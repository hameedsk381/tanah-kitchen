import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

export default function GalleryPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-secondary py-[var(--spacing-section)] overflow-hidden"
    >
      <div className="max-w-container px-8 mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 border-b border-terracotta/10 pb-8">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
              VISUAL ARCHIVES
            </span>
            <h2 className="font-display font-light text-warm-ivory" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
              A View of <span className="italic text-copper">Tanah</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase text-copper hover:text-warm-ivory transition-colors duration-300 flex items-center gap-2"
          >
            Explore Full Archives &rarr;
          </Link>
        </div>

        {/* Off-Grid Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left tall image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 aspect-[3/4] relative hover-zoom overflow-hidden border border-terracotta/10"
          >
            <img
              src="/assets/Tanha Ambiance/Ambiance-8.webp"
              alt="Luxury skyline view on the rooftop of Tanha"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent flex items-end p-8">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-copper tracking-widest block">AMBIENCE</span>
                <span className="font-display text-2xl font-light text-warm-ivory block">
                  Skyline Vistas
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right side: vertical stack of wide and square images */}
          <div className="md:col-span-5 space-y-8 lg:space-y-12">
            
            {/* Right Top wide image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/3] relative hover-zoom overflow-hidden border border-terracotta/10"
            >
              <img
                src="/assets/Tanha Ambiance/Ambiance-14.webp"
                alt="Wood-fired hearth fire grills"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent flex items-end p-8">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-copper tracking-widest block">HEARTH</span>
                  <span className="font-display text-2xl font-light text-warm-ivory block">
                    The Fire Hearth
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Bottom square/portrait image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square relative hover-zoom overflow-hidden border border-terracotta/10 lg:translate-x-6"
            >
              <img
                src="/assets/Tanha Ambiance/Tanha Food/food-21.webp"
                alt="Specialty organic ingredient plating"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent flex items-end p-8">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-copper tracking-widest block">PLATING</span>
                  <span className="font-display text-2xl font-light text-warm-ivory block">
                    Heritage Recipes
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
