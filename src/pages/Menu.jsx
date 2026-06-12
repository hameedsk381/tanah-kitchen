import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { menuItems, menuCategories } from '../data/menuData'
import VisitTanah from '../components/VisitTanah'

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    document.title = 'Seasonal Menu | Tanah Kitchen - Luxury Dining'
    window.scrollTo(0, 0)
  }, [])

  // Filter logic
  useEffect(() => {
    let result = menuItems

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory)
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(result)
  }, [selectedCategory, searchQuery])

  return (
    <main className="flex-grow pt-24">
      
      {/* Page Header */}
      <section 
        className="relative py-20 md:py-28 text-center"
        style={{ background: 'var(--color-forest)' }}
      >
        {/* Organic overlay dots */}
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
            GASTRONOMY DIARY
          </span>
          <h1 
            className="font-display font-bold leading-none mb-6"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              color: 'var(--color-cream)'
            }}
          >
            Seasonal Menu
          </h1>
          <p className="text-sm md:text-base font-light max-w-xl mx-auto" style={{ color: 'var(--color-beige)', opacity: 0.9 }}>
            A culinary chronicle of slow food, native grains, and garden herbs, curated to align with local soil cycles. All prices are in Indian Rupees (₹).
          </p>
        </div>
      </section>

      {/* Interactive Menu Container */}
      <section 
        className="relative py-16 md:py-24"
        style={{ background: 'var(--color-cream)' }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          
          {/* Search & Filters Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 border-b pb-8" style={{ borderColor: 'rgba(27, 67, 50, 0.08)' }}>
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto no-scrollbar scroll-smooth py-2">
              {menuCategories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase cursor-pointer whitespace-nowrap transition-all duration-300"
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

            {/* Search Input Bar */}
            <div className="relative w-full lg:w-80 flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seasonal dishes..."
                className="form-input text-xs font-medium pr-10"
                maxLength={60}
              />
              <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-forest opacity-50" />
            </div>

          </div>

          {/* Dishes Display Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col group border-b pb-8"
                  style={{ borderColor: 'rgba(27, 67, 50, 0.05)' }}
                >
                  
                  {/* Image Frame with zoom */}
                  <div className="hover-zoom aspect-[4/3] w-[90%] mx-auto overflow-hidden shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-sm"
                          style={{ background: 'var(--color-cream)', color: 'var(--color-forest)' }}
                        >
                          <Sparkles className="w-2 h-2 text-terracotta" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-baseline justify-between mb-3 gap-4">
                      <h3 className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-terracotta" style={{ color: 'var(--color-forest)' }}>
                        {item.name}
                      </h3>
                      <span className="font-display text-xl font-bold" style={{ color: 'var(--color-terracotta)' }}>
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'var(--color-charcoal)', opacity: 0.85 }}>
                      {item.desc}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-forest/40">
                        Tanah Sustainable Selection
                      </span>
                      <button 
                        className="text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-terracotta cursor-pointer"
                        style={{ color: 'var(--color-forest)' }}
                      >
                        Order Now &rarr;
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state details */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border"
              style={{ background: 'var(--color-beige)', borderColor: 'rgba(27, 67, 50, 0.05)' }}
            >
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--color-forest)' }}>
                No dishes found matching your search.
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn-primary mt-6 text-xs"
              >
                Reset Menu Filters
              </button>
            </motion.div>
          )}

        </div>
      </section>

      <VisitTanah />
    </main>
  )
}
