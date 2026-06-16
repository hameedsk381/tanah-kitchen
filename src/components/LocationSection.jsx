import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import contactData from '../data/contact.json'

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-secondary py-[var(--spacing-section)] overflow-hidden"
    >
      <div className="max-w-container px-8 mx-auto space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Coordinates/Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-4">
                Coordinates
              </span>
              <h2 className="font-display font-light text-text-light" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
                Find <span className="italic text-gold">Tanah</span>
              </h2>
            </div>

            <div className="space-y-6 text-sm font-light text-text-muted leading-relaxed">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-lg text-text-light mb-1">Location</h4>
                  <p>
                    {contactData.brandName}<br />
                    {contactData.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-lg text-text-light mb-1">Reservations & Inquiries</h4>
                  <p>{contactData.phone1}</p>
                  <p>{contactData.phone2}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions (Call, WhatsApp) */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`tel:${contactData.phone1.replace(/\s+/g, '')}`}
                className="btn-primary py-3.5 px-8 text-[9px] tracking-[0.25em] flex items-center gap-3"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-3.5 px-8 text-[9px] tracking-[0.25em] flex items-center gap-3 border-gold/40 text-gold hover:bg-gold/5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full border border-gold/15 bg-bg-primary overflow-hidden aspect-[16/10]"
          >
            <iframe
              title="Tanah Kitchen & Bar Google Map Gachibowli Location"
              src={contactData.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1) invert(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>

      </div>
    </section>
  )
}
