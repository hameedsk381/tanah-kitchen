import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { DiamondDivider } from './illustrations'

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
      {/* Ambience Background Photo */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <img
          src="/assets/Tanha Ambiance/Ambiance-11.webp"
          alt="Tanah rooftop architecture and dining ambience"
          className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.05]"
        />
        
        {/* Warm Terracotta and Deep Earth Overlay for Company Profile styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-terracotta/45 to-dark-brown/60 mix-blend-multiply pointer-events-none" />
        {/* Paper grain visual texture layer */}
        <div className="absolute inset-0 opacity-10 bg-repeat bg-center pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </motion.div>

      {/* Editorial Content Overlay */}
      <div className="max-width-container mx-auto px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="lg:col-span-8 flex flex-col justify-center text-left"
        >
          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-bg-primary block mb-3 font-body opacity-80">
            ESTD 2025 • TANAH KITCHEN & BAR
          </span>

          <h1
            className="font-display font-light text-bg-primary leading-[1.1] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
            }}
          >
            Rooftop Dining.<br />
            Wood-Fired.<br />
            <span className="font-light italic text-bg-secondary">Unforgettable.</span>
          </h1>

          {/* Decorative Tribal Divider Exactly Like PDF Page 2 */}
          <div className="w-full max-w-xl mb-6">
            <DiamondDivider color="var(--color-bg-secondary)" className="my-2 justify-start" />
          </div>

          <p className="text-lg font-light text-bg-secondary max-w-xl mb-8 leading-relaxed font-display">
            Premium rooftop dining in Gachibowli — where great food, craft cocktails, and live sports come together under the stars.
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
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-bg-primary hover:text-accent transition-colors duration-300 flex items-center gap-3 group"
            >
              Explore Menu
              <ArrowDownRight className="w-4 h-4 text-bg-secondary group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Floating scroll explorer at bottom-left */}
      <div className="absolute bottom-12 left-8 hidden md:flex items-center gap-4 z-20">
        <span className="text-[8px] font-mono tracking-[0.3em] text-bg-secondary uppercase opacity-75">
          SCROLL TO DISCOVER
        </span>
        <div className="w-16 h-[1px] bg-bg-secondary/35 relative overflow-hidden">
          <motion.div
            animate={{ x: [-64, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-8 h-full bg-bg-secondary"
          />
        </div>
      </div>
    </section>
  )
}
