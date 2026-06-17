import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import aboutData from '../data/about.json'

export default function ReservationCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { quoteSection } = aboutData

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-primary py-[var(--spacing-section)] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] rounded-full border border-terracotta" />
      </div>

      <div className="max-w-[1000px] px-8 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-terracotta block">
            Table Bookings
          </span>
          
          <h2 className="font-display font-light text-warm-ivory leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Experience <span className="italic text-copper">Tanah Kitchen & Bar</span>
          </h2>
          
          <p className="text-sm font-light text-sand-beige max-w-xl mx-auto leading-relaxed">
            Due to our commitment to small-batch farm sourcing and traditional slow coal cooking, we operate primarily on reservations. Secure a basalt hearth table for your evening.
          </p>

          <div className="pt-6">
            <Link
              to="/book"
              className="btn-primary py-4 px-12 text-[9px] tracking-[0.25em]"
            >
              Request a Reservation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
