import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import galleryData from '../data/gallery.json'
import SEO from '../components/SEO'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredItems, setFilteredItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(galleryData.items)
    } else {
      setFilteredItems(galleryData.items.filter(item => item.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <main className="flex-grow pt-24 overflow-hidden">
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

      {/* Editorial Header */}
      <section className="section-dark relative py-24 md:py-32 text-center border-b border-light-cream/15">
        <div className="relative z-10 px-8 max-width-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase section-accent block mb-4">
            Visual Archive
          </span>
          <h1
            className="font-display font-light leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Visual Gallery
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto opacity-80 leading-relaxed font-body">
            A photographic archive documenting our agricultural soils, wood-fired kitchen flames, and architectural layouts.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-light relative py-20">
        <div className="max-width-container px-8 mx-auto space-y-12">

          {/* Categories Tab */}
          <div className="flex items-center justify-center gap-6 overflow-x-auto w-full no-scrollbar pb-6 border-b border-primary-dark/10">
            {galleryData.categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 font-semibold"
                  style={{
                    color: isActive ? '#6B2523' : '#3A2E2A',
                    borderBottom: isActive ? '2px solid #6B2523' : '2px solid transparent'
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Magazine-Style Asymmetrical Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                // Set all images to the same square aspect ratio for grid alignment
                const heightClass = "aspect-square";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightbox(item)}
                    className={`group relative overflow-hidden cursor-pointer bg-[#6B2523]/5 ${heightClass} border border-primary-dark/10 shadow-lg`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95 group-hover:brightness-75 contrast-[1.02]"
                    />

                    {/* Hover Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between w-full text-left">
                        <div>
                          <span className="text-[8px] font-semibold tracking-[0.2em] uppercase text-[#E8DCC0] block mb-1">
                            {item.category}
                          </span>
                          <p className="font-display text-xl font-light text-[#F2E8D5] leading-tight">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(58, 58, 58, 0.98)' }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-accent-gold transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[75vh] object-contain border border-light-cream/15 shadow-2xl"
              />
              <p className="text-center mt-6 font-display text-2xl font-light text-white tracking-wide">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
