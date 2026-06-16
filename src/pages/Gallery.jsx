import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import galleryData from '../data/gallery.json'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredItems, setFilteredItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    document.title = 'Visual Archives | Tanah Kitchen & Bar'
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
    <main className="flex-grow pt-28 bg-bg-primary">
      
      {/* Editorial Header */}
      <section className="relative py-20 md:py-28 text-center border-b border-gold/10">
        <div className="relative z-10 px-8 max-w-container mx-auto">
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-4">
            Archives
          </span>
          <h1 
            className="font-display font-light text-text-light leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
          >
            The Visual Gallery
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-text-muted leading-relaxed">
            A photographic archive documenting our agricultural soils, wood-fired kitchen flames, and architectural layouts.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative py-20 bg-bg-primary">
        <div className="max-w-container px-8 mx-auto space-y-12">
          
          {/* Categories Tab */}
          <div className="flex items-center justify-center gap-6 overflow-x-auto w-full no-scrollbar pb-6 border-b border-gold/10">
            {galleryData.categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
                  style={{
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    borderBottom: isActive ? '1px solid var(--color-gold)' : '1px solid transparent'
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightbox(item)}
                  className={`group relative overflow-hidden cursor-pointer bg-bg-secondary ${item.spanClass}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-75 contrast-105"
                  />
                  
                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-[8px] font-medium tracking-[0.2em] uppercase text-gold block mb-1">
                          {item.category}
                        </span>
                        <p className="font-display text-2xl font-light text-text-light leading-tight">
                          {item.caption}
                        </p>
                      </div>
                      <ZoomIn className="w-5 h-5 text-gold/80" />
                    </div>
                  </div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(15, 15, 15, 0.98)' }}
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
                className="absolute -top-12 right-0 text-text-muted hover:text-gold transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[75vh] object-contain border border-gold/15 shadow-2xl"
              />
              <p className="text-center mt-6 font-display text-2xl font-light text-text-light tracking-wide">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
