import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const packages = [
  "Team Lunch Packages",
  "Team Dinner Packages",
  "Happy Hour Packages",
  "Exclusive Area Booking",
  "Full Venue Buyouts",
  "Customized Menus",
  "Custom Branding Opportunities",
  "Entertainment & Engagement Add-ons"
]

export default function LiquidAlchemy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 bg-[#4A2420] text-[#F2E8D8] overflow-hidden"
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/50 to-transparent pointer-events-none" />

      <div className="max-width-container px-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Customizable Corporate Packages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-bg-secondary block opacity-90 font-body">
              TAILORED EXPERIENCES
            </span>

            <h2
              className="font-display font-light text-bg-primary leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
            >
              CUSTOMIZED CORPORATE<br />
              PACKAGES
            </h2>

            <p className="text-base font-light text-bg-secondary/95 leading-relaxed font-body">
              We understand that every organization is unique. Our team works closely with corporate partners to create tailored experiences based on:
            </p>

            <div className="border-t border-bg-secondary/15 pt-6">
              <h3 className="font-display text-xl text-bg-primary mb-4 font-semibold italic">Flexible Options</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {packages.map((pkg, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light text-bg-secondary/90">
                    <span className="text-accent text-sm">◇</span>
                    {pkg}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-base font-display text-bg-secondary italic pt-4">
              We handle the experience so you can focus on your people.
            </p>
          </motion.div>

          {/* Right Block: Image of corporate team dining */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-[4/3] max-w-lg mx-auto w-full overflow-hidden bg-bg-secondary relative border border-bg-secondary/10 shadow-2xl rounded-sm">
              <img
                src="/assets/Tanha Ambiance/Ambiance-6.webp"
                alt="Corporate partners dining together at Tanah"
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Tribal diamond divider overlay at bottom right */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-b border-r border-bg-secondary/25 -z-10 pointer-events-none" />
          </motion.div>

        </div>

        {/* Horizontal Diamond Divider at bottom */}
        <div className="mt-16">
          <DiamondDivider color="var(--color-bg-secondary)" />
        </div>
      </div>
    </section>
  )
}
