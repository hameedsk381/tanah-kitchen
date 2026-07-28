import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const galleryItems = [
  {
    id: 'gallery-ambiance',
    src: '/images/gallery_ambiance.png',
    alt: 'Luxury Indian restaurant interior with hand-carved arches and warm candlelit tables',
    caption: 'The Ambiance',
    span: 'row-span-2'
  },
  {
    id: 'gallery-farm',
    src: '/images/farm_organic.png',
    alt: 'A lush organic farm path at golden hour',
    caption: 'Our Partner Farms',
    span: ''
  },
  {
    id: 'gallery-spices',
    src: '/images/gallery_spices.png',
    alt: 'Flat-lay of colorful Indian spices in terracotta bowls',
    caption: 'Handcrafted Masalas',
    span: ''
  },
  {
    id: 'gallery-dish1',
    src: '/images/dish_thali.png',
    alt: 'Royal Indian Thali spread on brass plate',
    caption: 'Heritage Thali',
    span: ''
  },
  {
    id: 'gallery-dish2',
    src: '/images/dish_dessert.png',
    alt: 'Artisan plated gulab jamun in clay bowl',
    caption: 'Saffron Desserts',
    span: ''
  }
]

function LightboxModal({ item, onClose }) {
  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${item.caption}`}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(30, 30, 30, 0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        className="relative max-w-4xl w-full mx-6 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-14 right-0 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={item.src}
          alt={item.alt}
          className="w-full shadow-2xl object-cover rounded-3xl"
          style={{ maxHeight: '70vh' }}
        />
        <p
          className="text-center mt-6 font-display text-2xl font-bold tracking-wide"
          style={{ color: 'var(--color-cream)' }}
        >
          {item.caption}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightbox, setLightbox] = useState(null)

  return (
    <section
      id="experience-preview"
      ref={ref}
      className="relative overflow-hidden py-[var(--spacing-section)]"
      style={{ 
        background: 'var(--color-beige)',
      }}
      aria-labelledby="experience-heading"
    >
      <div 
        className="max-width-container px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span
            className="text-xs font-semibold tracking-widest uppercase block mb-4"
            style={{ color: 'var(--color-terracotta)' }}
          >
            Visual Storytelling
          </span>
          <h2
            id="experience-heading"
            className="font-display leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-forest)'
            }}
          >
            The Tanah Experience
          </h2>
          <p
            className="text-base font-light"
            style={{ color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            A visual documentation of daily life at Tanah Kitchen — from fresh morning harvests to curated dinner ambiance.
          </p>
        </div>

        {/* Desktop Masonry Grid */}
        <div
          className="hidden md:grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '240px',
          }}
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(item)}
              className="group overflow-hidden relative cursor-pointer rounded-3xl"
              style={{
                gridRow: item.span === 'row-span-2' ? 'span 2' : 'span 1',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(27, 67, 50, 0.85) 0%, transparent 70%)'
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60 mb-1 block">
                      Click to View
                    </span>
                    <p className="font-display text-2xl font-bold text-white">
                      {item.caption}
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: 2-column Grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {galleryItems.map((item) => (
            <div
              key={`mobile-${item.id}`}
              onClick={() => setLightbox(item)}
              className="relative overflow-hidden aspect-square cursor-pointer rounded-3xl"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-end p-4"
                style={{
                  background: 'linear-gradient(to top, rgba(27, 67, 50, 0.7) 0%, transparent 60%)'
                }}
              >
                <p className="font-display text-base font-bold text-white leading-tight">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Link */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            to="/gallery"
            className="btn-outline text-xs tracking-widest uppercase font-semibold"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <LightboxModal item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
