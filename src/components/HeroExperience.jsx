import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

export default function HeroExperience() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax offsets
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center overflow-hidden bg-bg-primary"
      aria-label="Hero Experience"
    >
      {/* Fullscreen Video Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/Tanha Ambiance/Ambiance-11.webp"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05]"
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
          <img
            src="/assets/Tanha Ambiance/Ambiance-11.webp"
            alt="Luxury rooftop dining ambience at Tanha"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Editorial Content Overlay (Asymmetric & Left-Aligned) */}
      <div className="max-w-container mx-auto px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >


          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-copper block mb-4 font-body">
            TANHA KITCHEN & BAR
          </span>

          <h1
            className="font-display font-light text-warm-ivory leading-[1.02] mb-8"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            }}
          >
            Where Art &<br />
            <span className="font-light italic text-copper">Sky Collide</span>
          </h1>

          <p className="text-sm font-light text-sand-beige max-w-md mb-10 leading-relaxed font-body">
            A premium rooftop destination elevating Hyderabad's dining scene. Experience progressive gastronomy, botanical mixology, and high-altitude art installations under open skies.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Link
              to="/book"
              className="btn-primary py-4 px-10 text-[9px] tracking-[0.25em]"
            >
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-warm-ivory hover:text-copper transition-colors duration-300 flex items-center gap-3 group"
            >
              Explore Menu
              <ArrowDownRight className="w-4 h-4 text-copper group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Floating scroll explorer at bottom-left */}
      <div className="absolute bottom-12 left-8 hidden lg:flex items-center gap-4 z-20">
        <span className="text-[8px] font-mono tracking-[0.3em] text-muted-beige uppercase">
          SCROLL TO DISCOVER
        </span>
        <div className="w-16 h-[1px] bg-terracotta/30 relative overflow-hidden">
          <motion.div
            animate={{ x: [-64, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-8 h-full bg-copper"
          />
        </div>
      </div>
    </section>
  )
}
