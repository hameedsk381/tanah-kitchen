import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, UtensilsCrossed, CalendarDays } from 'lucide-react'

function BlobShape({ className, style }) {
  return (
    <div
      className={`blob-animate absolute pointer-events-none ${className}`}
      style={style}
    />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about-preview')
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image / Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg, scale }}
      >
        <img
          src="/images/hero_cinematic.png"
          alt="Luxury organic farm-to-table cooking, fresh forest herbs and terracotta accents"
          className="w-full h-full object-cover"
        />
        {/* Cinematic dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(27, 67, 50, 0.75) 0%,
              rgba(27, 67, 50, 0.6) 50%,
              rgba(30, 30, 30, 0.85) 100%
            )`,
          }}
        />
      </motion.div>

      {/* Floating leaf particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-3xl opacity-20 select-none"
          style={{
            top: `${15 + i * 12}%`,
            left: `${8 + i * 16}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 20, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          🌿
        </motion.div>
      ))}

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-8"
        style={{ opacity, maxWidth: '1280px', margin: '0 auto' }}
      >
        {/* Subtle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
          style={{ color: 'var(--color-terracotta-light)' }}
        >
          <span className="w-8 h-px" style={{ background: 'var(--color-terracotta-light)' }} />
          <span className="text-xs font-semibold tracking-widest uppercase">TANAH KITCHEN RESTAURANT</span>
          <span className="w-8 h-px" style={{ background: 'var(--color-terracotta-light)' }} />
        </motion.div>

        {/* Main Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display font-bold leading-none mb-8"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 6rem)', // 60px to 90px+ desktop
            color: 'var(--color-cream)',
            letterSpacing: '-0.02em',
          }}
        >
          Rooted in Nature.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-beige), var(--color-terracotta-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Crafted with Passion.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--color-beige)', lineHeight: '1.8' }}
        >
          An earth-inspired culinary sanctuary. Savor seasonal ingredients sourced 
          directly from local organic farmsteads, prepared by masters of slow food.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            to="/menu"
            className="btn-primary"
            id="hero-view-menu"
          >
            <UtensilsCrossed className="w-4 h-4" />
            View Menu
          </Link>
          <Link
            to="/contact"
            className="btn-outline"
            id="hero-reserve-table"
          >
            <CalendarDays className="w-4 h-4" />
            Reserve Table
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent"
        onClick={handleScrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down to explore"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(255, 253, 248, 0.5)' }}
        >
          Scroll
        </span>
        <ChevronDown
          className="w-5 h-5"
          style={{ color: 'rgba(255, 253, 248, 0.5)' }}
        />
      </motion.button>
    </section>
  )
}
