import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import VisitTanah from '../components/VisitTanah'

const categories = ['All', 'Ambiance', 'Food', 'Farming']

const galleryItems = [
  {
    id: 'g1',
    category: 'Ambiance',
    src: '/images/gallery_ambiance.png',
    alt: 'Luxury Indian restaurant interior with hand-carved wooden arches and warm lighting',
    caption: 'Our Carved Pillars Ambiance',
    spanClass: 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
  },
  {
    id: 'g2',
    category: 'Food',
    src: '/images/dish_thali.png',
    alt: 'Royal Indian Thali spread on brass plate',
    caption: 'Signature Heritage Thali Platter',
    spanClass: 'aspect-square'
  },
  {
    id: 'g3',
    category: 'Farming',
    src: '/images/farm_organic.png',
    alt: 'Organic farm rows at sunrise',
    caption: 'Sunset Harvest at the Aravalli Farmstead',
    spanClass: 'aspect-square'
  },
  {
    id: 'g4',
    category: 'Ambiance',
    src: '/images/gallery_dining.png',
    alt: 'Elegant candlelight setup on table',
    caption: 'Candlelit Intimacy',
    spanClass: 'aspect-[3/4]'
  },
  {
    id: 'g5',
    category: 'Food',
    src: '/images/dish_biryani.png',
    alt: 'Earthen claypot Biryani rice',
    caption: 'Forest Claypot Biryani Savor',
    spanClass: 'md:col-span-2 aspect-[16/9]'
  },
  {
    id: 'g6',
    category: 'Farming',
    src: '/images/gallery_spices.png',
    alt: 'Indian spices flat-lay arrangement',
    caption: 'Stone-Milled Organic Spices',
    spanClass: 'aspect-square'
  },
  {
    id: 'g7',
    category: 'Food',
    src: '/images/dish_dessert.png',
    alt: 'Artisan plated dessert in clay bowl',
    caption: 'Saffron Rabri Clay Bowl Sweet',
    spanClass: 'aspect-[3/4]'
  },
  {
    id: 'g8',
    category: 'Ambiance',
    src: '/images/about_chef.png',
    alt: 'Co-founder Chef Harish standing in rustic kitchen',
    caption: 'Chef Harish in our Hearth',
    spanClass: 'aspect-square'
  },
  {
    id: 'g9',
    category: 'Farming',
    src: '/images/about_farm.png',
    alt: 'Woven baskets of direct partner farm fresh carrots',
    caption: 'Daily Jute Baskets Delivery',
    spanClass: 'aspect-square'
  }
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredItems, setFilteredItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    document.title = 'Visual Gallery | Tanah Kitchen'
    window.scrollTo(0, 0)
  }, [])

  // Filter gallery items
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <main className="flex-grow pt-24">
      
      {/* Editorial Header */}
      <section 
        className="relative py-20 md:py-28 text-center"
        style={{ background: 'var(--color-forest)' }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'radial-gradient(var(--color-cream) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div 
          className="relative z-10 px-6"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta-light)' }}>
            VISUAL MEMORIES
          </span>
          <h1 
            className="font-display font-bold leading-none mb-6"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              color: 'var(--color-cream)'
            }}
          >
            The Gallery
          </h1>
          <p className="text-sm md:text-base font-light max-w-xl mx-auto" style={{ color: 'var(--color-beige)', opacity: 0.9 }}>
            A photographic anthology of our soil cultivation, kitchen fires, handcrafted plates, and organic estate ambiance.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section 
        className="relative py-16 md:py-24"
        style={{ background: 'var(--color-cream)' }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          
          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto w-full no-scrollbar pb-8 mb-16 border-b" style={{ borderColor: 'rgba(27, 67, 50, 0.08)' }}>
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300"
                  style={{
                    background: isActive ? 'var(--color-forest)' : 'transparent',
                    color: isActive ? 'var(--color-cream)' : 'var(--color-forest)',
                    border: isActive ? '1px solid var(--color-forest)' : '1px solid transparent'
                  }}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {/* Masonry / Responsive Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightbox(item)}
                  className={`group relative overflow-hidden cursor-pointer shadow-sm ${item.spanClass}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div 
                    className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(27, 67, 50, 0.85) 0%, transparent 60%)'
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-[9px] font-semibold tracking-widest uppercase text-white/50 block mb-1">
                          {item.category}
                        </span>
                        <p className="font-display text-xl font-bold text-white leading-tight">
                          {item.caption}
                        </p>
                      </div>
                      <ZoomIn className="w-5 h-5 text-white/80" />
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/95"
            style={{ background: 'rgba(30,30,30,0.95)' }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[75vh] object-contain shadow-2xl"
              />
              <p className="text-center mt-6 font-display text-2xl font-bold text-cream tracking-wide">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VisitTanah />
    </main>
  )
}
