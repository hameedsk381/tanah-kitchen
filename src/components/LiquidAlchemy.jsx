import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

export default function LiquidAlchemy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="relative w-full py-[var(--spacing-section)] bg-bg-primary overflow-hidden"
    >
      {/* Dynamic glow element */}
      <div className="absolute -right-20 top-1/4 w-[35vw] h-[35vw] rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-container px-8 mx-auto relative z-10">
        
        {/* Asymmetrical composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Narrative text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8 order-2 lg:order-1"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
              BOTANICAL MIXOLOGY
            </span>

            <h2
              className="font-display font-light text-warm-ivory leading-tight"
              style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)' }}
            >
              Liquid Alchemy &<br />
              <span className="italic text-copper">Slow Infusions</span>
            </h2>

            <p className="text-sm font-light text-sand-beige leading-relaxed">
              Our cocktail program is a curated ritual of native botanicals, organic honey, house-fermented vinegars, and hand-pressed fruit elixirs. Inspired by Vedic apothecary traditions, each drink is structured to complement the elevation and atmosphere of our rooftop deck.
            </p>

            <p className="text-xs font-light text-muted-beige/80 font-mono tracking-wide leading-relaxed">
              HIGHLIGHTS: Wildflower Mead, Fermented Aravalli Nectar, Smoked Claypot Toddy
            </p>

            <div className="pt-6">
              <Link
                to="/menu"
                className="btn-gold-outline py-3.5 px-10 text-[9px] tracking-[0.2em]"
              >
                View Spirits Collection
              </Link>
            </div>
          </motion.div>

          {/* Right Block: Image frame with offset border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative order-1 lg:order-2"
          >
            <div className="aspect-[16/10] xl:aspect-[16/9] w-full overflow-hidden bg-bg-secondary relative border border-terracotta/10">
              <img
                src="/assets/Tanha Ambiance/Tanha Food/food-11.webp"
                alt="Slow-infused botanical cocktails and elixirs"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.08] transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-6 border border-warm-ivory/10 pointer-events-none" />
            </div>

            {/* Architectural Grid Details */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-terracotta/20 -z-10 pointer-events-none" />
          </motion.div>

        </div>

      </div>
    </section>
  )
}
