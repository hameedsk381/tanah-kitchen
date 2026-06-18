import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import aboutData from '../data/about.json'

export default function Philosophy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { philosophy } = aboutData

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Premium background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02])

  // Direct premium WebP reference to avoid broken paths
  const displayImage = "/assets/Tanha Ambiance/Ambiance-2.webp"

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-bg-primary py-[var(--spacing-section)] overflow-hidden"
    >
      {/* Background parallax image */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-[0.08] filter grayscale brightness-50"
      >
        <img
          src="/assets/Tanha Ambiance/Ambiance-15.webp"
          alt="Atmospheric kitchen hearth background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Background graphic elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-burnt-earth/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-container px-8 mx-auto relative z-10">
        
        {/* Asymmetrical overlapping grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative min-h-[70vh]">
          
          {/* Left Block: Luxury Storytelling Card (Overlaps the image slightly on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 bg-[#141211]/90 backdrop-blur-md border border-terracotta/10 p-6 sm:p-10 lg:p-14 z-20 shadow-2xl relative lg:translate-x-12"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-6 font-body">
              {philosophy.subtitle}
            </span>
            
            <h2 
              className="font-display font-light text-warm-ivory leading-tight mb-8" 
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
            >
              {philosophy.title}<br />
              <span className="italic text-copper">{philosophy.titleItalic}</span>
            </h2>

            <p className="text-sm font-light text-sand-beige leading-relaxed mb-6">
              {philosophy.paragraph1}
            </p>
            
            <p className="text-sm font-light text-sand-beige leading-relaxed mb-10">
              {philosophy.paragraph2}
            </p>

            <div>
              <Link
                to="/about"
                className="btn-gold-outline py-3.5 px-8 text-[9px] tracking-[0.2em]"
              >
                Discover Our Journey
              </Link>
            </div>
          </motion.div>

          {/* Right Block: Large Vertical Frame (Bleeds into background) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-7 xl:col-span-7 relative"
          >
            <div className="aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/3] w-full overflow-hidden bg-bg-secondary relative">
              <img
                src={displayImage}
                alt="Architectural dining hearth and basalt slate design"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-8 border border-warm-ivory/10 pointer-events-none" />
            </div>

            {/* Geometric Accent Line */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border-r border-b border-terracotta/20 -z-10 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
