import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SEO from '../components/SEO'
import { useMenu } from '../context/MenuContext'

export default function Gallery() {
  const { galleryItems, galleryCategories } = useMenu()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredItems, setFilteredItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase()))
    }
  }, [selectedCategory, galleryItems])

  return (
    <main className="flex-grow pt-24 overflow-hidden bg-[#FAF8F5] text-[#1E1B18]">
      <SEO
        title="Visual Gallery & Ambiance | Tanah Kitchen & Bar Hyderabad"
        description="Browse high-definition photos of Tanah Kitchen & Bar. Rooftop dining terrace, woven bamboo tree canopy, custom ceramics, signature dishes, and mixology cocktails in Gachibowli."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          'name': 'Tanah Kitchen & Bar Visual Archives',
          'url': 'https://tanahkitchen.in/gallery'
        }}
      />

      {/* ── 1. Page Header (WordPress Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-light-cream/15">
        <div className="relative z-10 wp-container">
          <span className="wp-badge wp-badge-gold mb-4">
            ✦ VISUAL ARCHIVE ✦
          </span>
          <h1
            className="font-display font-extrabold leading-tight text-[#E5E2DC] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            Moments at Tanah
          </h1>
          <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full mb-4" />
          <p className="text-base md:text-lg font-light max-w-xl mx-auto text-[#FAF8F5]/95 leading-relaxed font-body">
            Step inside our urban nest through the lens.
          </p>
        </div>
      </section>

      {/* ── 2. Main Gallery Grid ── */}
      <section className="wp-section bg-[#FAF8F5]">
        <div className="wp-container space-y-10">

          {/* Categories Tab (Filter Pills: All | Rooftop & Vibe | Culinary Delights | Cocktails & Brews) */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto w-full no-scrollbar pb-2">
            {['All', 'Rooftop & Vibe', 'Culinary Delights', 'Cocktails & Brews'].map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 whitespace-nowrap ${ isActive ? 'bg-[#5E332E] text-[#E5E2DC] shadow-sm' : 'bg-white text-[#1E1B18] border border-[#5E332E]/15 hover:border-[#5E332E]/40' }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Pure Visual Image Grid (Zero Content Overlays) */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightbox(item)}
                  className="group relative overflow-hidden cursor-pointer rounded-2xl aspect-square border border-[#5E332E]/15 shadow-sm hover:shadow-xl transition-all duration-500 bg-white"
                >
                  <img
                    src={item.src || item.image}
                    alt={item.alt || item.title || item.id}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-90 contrast-[1.02]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] bg-[#1E1B18] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] w-full max-h-[75vh]">
                <img
                  src={lightbox.src || lightbox.image}
                  alt={lightbox.alt || lightbox.title || lightbox.id}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
