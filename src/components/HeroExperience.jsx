import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function HeroExperience() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth parallax scroll animations
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

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
      {/* Cinematic Fullscreen Background (Video with Parallax Wrapper) */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/Ambiance/TANAH_Amb01017.jpg"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05]"
          style={{ width: '100vw', height: '100vh' }}
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
          {/* Legacy fallback img inside video tag */}
          <img
            src="/assets/Ambiance/TANAH_Amb01017.jpg"
            alt="Luxury rooftop dining ambience fallback"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Ambient Dark Terracotta Gradient Overlay (65% Opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #2A1208 0%, #3B170A 50%, #5A2410 100%)',
            opacity: 0.65
          }}
        />
      </motion.div>

      {/* Cinematic Hero Content (Centered) */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-6 max-w-container mx-auto"
      >
        {/* Brand Tag */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-semibold tracking-[0.45em] uppercase text-copper block mb-6 font-body"
        >
          Tanah Kitchen & Bar
        </motion.span>

        {/* Hero Title: Where Art, Ambience & Gastronomy Meet */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-warm-ivory leading-[1.05] mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 6.2rem)',
          }}
        >
          Where Art, Ambience<br />
          <span className="font-light italic text-copper">& Gastronomy Meet</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-light text-sand-beige max-w-2xl mx-auto mb-12 leading-relaxed font-body"
        >
          Experience elevated dining, handcrafted cocktails, live sports, and unforgettable evenings at Tanah Kitchen & Bar.
        </motion.p>

        {/* Dynamic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            to="/menu"
            className="btn-primary py-4 px-10 text-[9px] tracking-[0.25em]"
          >
            View Menu
          </Link>
          <Link
            to="/book"
            className="btn-outline py-4 px-10 text-[9px] tracking-[0.25em]"
          >
            Book A Table
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScroll}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none text-warm-ivory/55 hover:text-copper transition-colors duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="text-[8px] font-medium tracking-[0.3em] uppercase">
          Explore
        </span>
        <ChevronDown className="w-4 h-4 text-copper" />
      </motion.button>
    </section>
  )
}
