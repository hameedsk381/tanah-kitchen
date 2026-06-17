import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import menuData from '../data/menu.json'

// Frontend categories requested by the user
const DISPLAY_CATEGORIES = ["All", "Starters", "Main Course", "Cocktails", "Beverages", "Desserts"]

// Helper function to map database categories/items to requested frontend categories
function getMappedCategory(item) {
  if (item.category === 'Cocktails') return 'Cocktails'
  if (item.category === 'Beverages') return 'Beverages'
  if (item.category === 'Desserts') return 'Desserts'
  
  // Custom mapping for Breakfast/Lunch/Dinner into Starters/Mains
  const startersNames = [
    "Ancient Grain Granola", 
    "Millet Idli & Heirloom Chutney", 
    "Earthy Quinoa Upma", 
    "Tanah Green Salad", 
    "Smoked Terracotta Paneer", 
    "Wood-fired Herb Crusted Potatoes"
  ]
  
  if (startersNames.includes(item.name)) {
    return 'Starters'
  }
  return 'Main Course'
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    document.title = 'Seasonal Menu | Tanah Kitchen & Bar'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let result = menuData.items.map(item => ({
      ...item,
      mappedCategory: getMappedCategory(item)
    }))

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.mappedCategory === selectedCategory)
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredItems(result)
  }, [selectedCategory, searchQuery])

  return (
    <main className="flex-grow pt-24 bg-bg-primary text-warm-ivory">
      
      {/* Page Header */}
      <section className="relative py-24 md:py-32 text-center border-b border-terracotta/10">
        <div className="relative z-10 px-8 max-w-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
            Gastronomy Catalog
          </span>
          <h1 
            className="font-display font-light text-warm-ivory leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Seasonal Menu
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-sand-beige leading-relaxed">
            A chronicle of wood-fired gastronomy, traditional slow cooking, and stone-ground spices. Rested, prepared, and plated in Hyderabad.
          </p>
        </div>
      </section>

      {/* Menu Container */}
      <section className="relative py-20 bg-bg-primary">
        <div className="max-w-container px-8 mx-auto space-y-16">
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-terracotta/10 pb-6">
            {/* Category selection */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
              {DISPLAY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
                    style={{
                      color: isActive ? 'var(--color-terracotta)' : 'var(--color-sand-beige)',
                      borderBottom: isActive ? '2px solid var(--color-terracotta)' : '2px solid transparent'
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="form-input text-xs pr-10 py-3"
                maxLength={50}
              />
              <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-copper/60" />
            </div>
          </div>

          {/* Editorial Menu Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6 items-start pb-8 border-b border-terracotta/5 group"
                >
                  {/* Circular/Square luxury thumbnail */}
                  <div className="w-20 h-20 md:w-28 md:h-28 overflow-hidden bg-bg-secondary flex-shrink-0 relative hover-zoom">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Description */}
                  <div className="flex-grow space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl md:text-2xl font-light text-warm-ivory group-hover:text-copper transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="font-display text-lg text-copper font-light">
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <p className="text-xs font-light text-sand-beige leading-relaxed">
                      {item.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[8px] tracking-[0.15em] uppercase text-copper/85 bg-copper/5 px-2 py-0.5 border border-copper/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-terracotta/15 bg-bg-secondary"
            >
              <p className="font-display text-xl text-warm-ivory">
                No items match your search.
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn-gold-outline mt-6 text-[10px] py-3 px-8 cursor-pointer"
              >
                Reset Catalog
              </button>
            </motion.div>
          )}

        </div>
      </section>

    </main>
  )
}
