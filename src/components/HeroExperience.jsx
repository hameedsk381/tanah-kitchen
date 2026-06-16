import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import heroData from '../data/hero.json'

export default function HeroExperience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth parallax effect
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleScroll = () => {
    const nextSection = document.getElementById('philosophy')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-primary"
      aria-label="Hero Experience"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <img
          src={heroData.imageUrl}
          alt="Luxury rooftop dining ambience"
          className="w-full h-full object-cover filter brightness-50"
        />
        {/* Dark Editorial Overlay Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 15, 15, 0.5) 0%, rgba(15, 15, 15, 0.8) 100%)',
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-6 max-w-container mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-6"
        >
          {heroData.subheading}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-text-light leading-[1.05] mb-8"
          style={{
            fontSize: 'clamp(3.5rem, 8.5vw, 7rem)',
          }}
        >
          {heroData.heading}<br />
          <span className="font-light italic text-gold">{heroData.headingItalic}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="flex justify-center gap-6 mt-12"
        >
          <Link
            to={heroData.ctaPrimary.path}
            className="btn-primary py-4 px-10 text-[9px] tracking-[0.25em]"
          >
            {heroData.ctaPrimary.label}
          </Link>
          <Link
            to={heroData.ctaSecondary.path}
            className="btn-outline py-4 px-10 text-[9px] tracking-[0.25em]"
          >
            {heroData.ctaSecondary.label}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScroll}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none text-text-light/55 hover:text-gold transition-colors duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="text-[8px] font-medium tracking-[0.3em] uppercase">
          Explore
        </span>
        <ChevronDown className="w-4 h-4 text-gold" />
      </motion.button>
    </section>
  )
}
