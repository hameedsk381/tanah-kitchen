import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation, Calendar } from 'lucide-react'

export default function VisitTanah() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Google Maps directions URL for Hyderabad Gachibowli area
  const mapDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Tanah+Kitchen+Gachibowli+Hyderabad"

  return (
    <section
      id="visit-tanah"
      ref={ref}
      style={{
        background: 'var(--color-charcoal)', // Dark earth charcoal tone #1E1B18
        color: 'var(--color-cream)'
      }}
      className="relative overflow-hidden w-full py-28"
      aria-labelledby="visit-heading"
    >
      {/* Warm ambient rooftop lighting effects */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[45rem] h-[45rem] opacity-25 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-terracotta-light) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] opacity-15 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-brown-light) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,253,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,248,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div 
        className="px-8 relative z-10"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Location, Hours & Booking Info */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase block mb-4"
                style={{ color: 'var(--color-terracotta-light)' }}
              >
                ROOFTOP LOUNGE & BAR
              </span>
              <h2
                id="visit-heading"
                className="font-display leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  color: 'var(--color-cream)'
                }}
              >
                Visit <span className="italic font-light" style={{ color: 'var(--color-terracotta-light)' }}>Tanah</span>
              </h2>
              <p
                className="text-base font-light mt-4"
                style={{ color: 'var(--color-beige)', opacity: 0.8 }}
              >
                Experience Hyderabad's premier rooftop sanctuary. Enjoy open-air dining under the stars, seasonal recipes, and handcrafted botanical cocktails.
              </p>
            </motion.div>

            {/* Glassmorphism Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="p-6 md:p-8 flex flex-col justify-between rounded-3xl"
                style={{
                  background: 'rgba(255, 253, 248, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 253, 248, 0.08)',
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--color-terracotta-light)' }} />
                    <h4 className="font-display text-lg font-bold text-white">Location</h4>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-beige)' }}>
                    Tanah Kitchen & Bar <br />
                    5th Floor, Opp. Meenakshi Bamboo Road, <br />
                    Gachibowli, Hyderabad, Telangana
                  </p>
                </div>
              </motion.div>

              {/* Opening Hours & Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-6 md:p-8 space-y-6 flex flex-col justify-between rounded-3xl"
                style={{
                  background: 'rgba(255, 253, 248, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 253, 248, 0.08)',
                }}
              >
                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5" style={{ color: 'var(--color-terracotta-light)' }} />
                    <h4 className="font-display text-lg font-bold text-white">Opening Hours</h4>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-beige)' }}>
                    4:00 PM – 11:00 PM <br />
                    Open Every Day
                  </p>
                </div>

                {/* Reservations */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,253,248,0.1)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5" style={{ color: 'var(--color-terracotta-light)' }} />
                    <h4 className="font-display text-lg font-bold text-white">Reservations</h4>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-beige)' }}>
                    +91 89777 30291 <br />
                    +91 89777 30292
                  </p>
                </div>
              </motion.div>

            </div>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex justify-center items-center gap-2"
                style={{ padding: '14px 28px' }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href="#reservation"
                onClick={(e) => {
                  e.preventDefault()
                  const section = document.querySelector('#reservation')
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    // Fallback to routing to Contact/Reservation page
                    window.location.href = "/contact"
                  }
                }}
                className="btn-outline flex justify-center items-center gap-2"
                style={{ padding: '14px 28px' }}
              >
                <Calendar className="w-4 h-4" />
                Reserve Table
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Map Showcase */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient map glow border */}
            <div
              className="absolute -inset-1 opacity-20 blur-lg rounded-lg -z-10"
              style={{
                background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-forest))'
              }}
            />
            
            <div 
              className="w-full h-[320px] sm:h-[450px] shadow-2xl overflow-hidden relative border rounded-3xl"
              style={{ 
                borderColor: 'rgba(255, 253, 248, 0.08)',
                background: 'var(--color-near-black)'
              }}
            >
              {/* Google Maps iFrame */}
              <iframe
                title="Tanah Kitchen Rooftop Gachibowli Map Location"
                src="https://maps.google.com/maps?q=17.44367702161119,78.36776618465711+(Tanah+Kitchen+%26+Bar)&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
