import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sliders, Sparkles, Flame, Cookie, Sprout, GlassWater } from 'lucide-react'
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

// Calculate sensory profile of a menu item
function calculateSensoryProfile(item) {
  let spicy = 0
  let sweet = 0
  let earthy = 10
  let rich = 10

  const descLower = item.desc.toLowerCase()
  const nameLower = item.name.toLowerCase()
  const tagsLower = item.tags.map(t => t.toLowerCase())

  // Spicy Profile
  if (tagsLower.includes('spicy') || tagsLower.includes('lava salt')) {
    spicy = 95
  } else if (descLower.includes('spic') || nameLower.includes('spic') || descLower.includes('chili') || descLower.includes('mustard') || descLower.includes('ginger') || descLower.includes('pepper')) {
    spicy = 75
  } else if (descLower.includes('herb') || descLower.includes('lemongrass') || descLower.includes('mint')) {
    spicy = 30
  }

  // Sweet Profile
  if (item.category === 'Desserts' || tagsLower.includes('sweet') || tagsLower.includes('decadent')) {
    sweet = 95
  } else if (descLower.includes('honey') || descLower.includes('jaggery') || descLower.includes('chocolate') || descLower.includes('sweet') || descLower.includes('nectar') || descLower.includes('fig') || descLower.includes('berry') || descLower.includes('apple') || descLower.includes('kokum')) {
    sweet = 80
  } else if (descLower.includes('orange') || descLower.includes('lemonade') || descLower.includes('hibiscus')) {
    sweet = 50
  }

  // Earthy Profile
  if (tagsLower.includes('organic') || tagsLower.includes('vegan') || tagsLower.includes('botanical') || tagsLower.includes('coal cooked') || tagsLower.includes('slow cooked')) {
    earthy = 90
  }
  if (descLower.includes('millet') || nameLower.includes('millet') || descLower.includes('soil') || descLower.includes('claypot') || descLower.includes('earth') || descLower.includes('mushroom') || descLower.includes('beetroot') || descLower.includes('barley') || descLower.includes('terracotta') || descLower.includes('basalt') || descLower.includes('wood-fired') || descLower.includes('foraged')) {
    earthy = Math.max(earthy, 85)
  } else if (descLower.includes('chutney') || descLower.includes('sambar') || descLower.includes('spinach') || descLower.includes('avocado') || descLower.includes('cucumber') || descLower.includes('basil') || descLower.includes('rosemary') || descLower.includes('garlic')) {
    earthy = Math.max(earthy, 60)
  }

  // Richness Profile
  if (tagsLower.includes('luxury') || tagsLower.includes('creamy') || tagsLower.includes('decadent') || tagsLower.includes('hearty')) {
    rich = 95
  }
  if (descLower.includes('butter') || descLower.includes('cheese') || descLower.includes('cream') || descLower.includes('risotto') || descLower.includes('avocado') || descLower.includes('almond') || descLower.includes('coconut milk') || descLower.includes('rabri') || descLower.includes('egg') || descLower.includes('tart') || descLower.includes('paneer')) {
    rich = Math.max(rich, 80)
  } else if (descLower.includes('olive oil') || descLower.includes('oil') || descLower.includes('milk') || descLower.includes('curd') || descLower.includes('sourdough')) {
    rich = Math.max(rich, 50)
  }

  return { spicy, sweet, earthy, rich }
}

const PRESET_JOURNEYS = [
  {
    name: "Wood-Fired & Smoky",
    desc: "Coal-infused, deep earthy elements with moderate spice.",
    profile: { spicy: 75, sweet: 10, earthy: 90, rich: 60 }
  },
  {
    name: "Healing & Clean-Eating",
    desc: "Low-fat, highly organic, zero-mile herbs.",
    profile: { spicy: 20, sweet: 15, earthy: 95, rich: 25 }
  },
  {
    name: "Signature Indulgence",
    desc: "Creamy, decadent, sweet and buttery profiles.",
    profile: { spicy: 20, sweet: 80, earthy: 50, rich: 90 }
  },
  {
    name: "Zesty & Refreshing",
    desc: "Vibrant citrus, botanicals, and high-quality tonics.",
    profile: { spicy: 40, sweet: 60, earthy: 40, rich: 15 }
  }
]

export default function Menu() {
  const [viewMode, setViewMode] = useState('classic') // 'classic' or 'sensory'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)

  // Sensory Matcher State
  const [sensoryPrefs, setSensoryPrefs] = useState({
    spicy: 50,
    sweet: 30,
    earthy: 50,
    rich: 40
  })

  useEffect(() => {
    document.title = 'Seasonal Menu | Tanah Kitchen & Bar'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let result = menuData.items.map(item => {
      const profile = calculateSensoryProfile(item)
      
      // Calculate match percentage
      const diffSpicy = Math.abs(profile.spicy - sensoryPrefs.spicy)
      const diffSweet = Math.abs(profile.sweet - sensoryPrefs.sweet)
      const diffEarthy = Math.abs(profile.earthy - sensoryPrefs.earthy)
      const diffRich = Math.abs(profile.rich - sensoryPrefs.rich)
      
      const avgDiff = (diffSpicy + diffSweet + diffEarthy + diffRich) / 4
      const matchScore = Math.max(0, Math.min(100, Math.round(100 - avgDiff)))

      return {
        ...item,
        mappedCategory: getMappedCategory(item),
        profile,
        matchScore
      }
    })

    if (viewMode === 'classic') {
      if (selectedCategory !== 'All') {
        result = result.filter(item => item.mappedCategory === selectedCategory)
      }
    } else {
      // Sort by sensory match percentage in sensory mode
      result = result.sort((a, b) => b.matchScore - a.matchScore)
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredItems(result)
    // Default to first item if current hovered item is not in filtered list
    if (result.length > 0) {
      setHoveredItem(result[0])
    } else {
      setHoveredItem(null)
    }
  }, [selectedCategory, searchQuery, viewMode, sensoryPrefs])

  const handlePresetSelect = (profile) => {
    setSensoryPrefs(profile)
  }

  const handleSliderChange = (key, val) => {
    setSensoryPrefs(prev => ({
      ...prev,
      [key]: parseInt(val)
    }))
  }

  // Active showcase item
  const activeShowcaseItem = hoveredItem || filteredItems[0]

  return (
    <main className="flex-grow pt-24 bg-bg-primary text-text-dark">
      
      {/* Page Header */}
      <section className="relative py-20 md:py-28 text-center border-b border-terracotta/15 bg-bg-secondary">
        <div className="relative z-10 px-8 max-w-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
            Gastronomy Catalog
          </span>
          <h1 
            className="font-display font-light text-text-dark leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Seasonal Menu
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-text-dark/80 leading-relaxed">
            A chronicle of wood-fired gastronomy, traditional slow cooking, and stone-ground spices. Rested, prepared, and plated in Hyderabad.
          </p>

          {/* Mode Selector Toggle */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex border border-terracotta/20 p-1 bg-bg-primary/90 backdrop-blur">
              <button
                onClick={() => setViewMode('classic')}
                className={`px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === 'classic' 
                    ? 'bg-terracotta text-bg-primary font-medium' 
                    : 'text-text-dark/70 hover:text-terracotta'
                }`}
              >
                Classic Catalog
              </button>
              <button
                onClick={() => setViewMode('sensory')}
                className={`px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  viewMode === 'sensory' 
                    ? 'bg-terracotta text-bg-primary font-medium' 
                    : 'text-text-dark/70 hover:text-terracotta'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Sensory Matcher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Container */}
      <section className="relative py-16 bg-bg-primary">
        <div className="max-w-container px-8 mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT COLUMN: Controls & Menu list */}
            <div className="lg:col-span-7 space-y-12 w-full">
              
              {/* SENSORY CONTROLS PANEL */}
              <AnimatePresence mode="wait">
                {viewMode === 'sensory' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 md:p-8 border border-terracotta/15 bg-bg-secondary/45 backdrop-blur space-y-8"
                  >
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-light text-text-dark tracking-wide font-display">
                        Curate Your Culinary Profile
                      </h2>
                      <p className="text-xs text-text-dark/70 mt-1">
                        Adjust the flavor dimensions or select a journey to align the menu.
                      </p>
                    </div>

                    {/* Preset Journeys */}
                    <div className="grid grid-cols-2 gap-3">
                      {PRESET_JOURNEYS.map((journey) => (
                        <button
                          key={journey.name}
                          onClick={() => handlePresetSelect(journey.profile)}
                          className="p-3 text-left border border-terracotta/10 bg-bg-primary/45 hover:border-terracotta/40 transition-all duration-300 group cursor-pointer"
                        >
                          <span className="block text-[10px] uppercase tracking-wider text-accent group-hover:text-terracotta transition-colors font-semibold">
                            {journey.name}
                          </span>
                          <span className="block text-[9px] text-text-dark/60 mt-1 font-light leading-snug">
                            {journey.desc}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Sliders Grid */}
                    <div className="grid grid-cols-2 gap-6 pt-2">
                      {/* Spicy Slider */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-text-dark/80">
                            <Flame className="w-3.5 h-3.5 text-orange-600" />
                            Heat & Spice
                          </span>
                          <span className="text-terracotta font-semibold">{sensoryPrefs.spicy}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sensoryPrefs.spicy}
                          onChange={(e) => handleSliderChange('spicy', e.target.value)}
                          className="w-full accent-terracotta bg-bg-secondary h-1 cursor-ew-resize"
                        />
                      </div>

                      {/* Sweet Slider */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-text-dark/80">
                            <Cookie className="w-3.5 h-3.5 text-amber-600" />
                            Sweetness
                          </span>
                          <span className="text-terracotta font-semibold">{sensoryPrefs.sweet}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sensoryPrefs.sweet}
                          onChange={(e) => handleSliderChange('sweet', e.target.value)}
                          className="w-full accent-terracotta bg-bg-secondary h-1 cursor-ew-resize"
                        />
                      </div>

                      {/* Earthy Slider */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-text-dark/80">
                            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                            Earthiness
                          </span>
                          <span className="text-terracotta font-semibold">{sensoryPrefs.earthy}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sensoryPrefs.earthy}
                          onChange={(e) => handleSliderChange('earthy', e.target.value)}
                          className="w-full accent-terracotta bg-bg-secondary h-1 cursor-ew-resize"
                        />
                      </div>

                      {/* Rich Slider */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-text-dark/80">
                            <GlassWater className="w-3.5 h-3.5 text-sky-500" />
                            Richness
                          </span>
                          <span className="text-terracotta font-semibold">{sensoryPrefs.rich}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sensoryPrefs.rich}
                          onChange={(e) => handleSliderChange('rich', e.target.value)}
                          className="w-full accent-terracotta bg-bg-secondary h-1 cursor-ew-resize"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-terracotta/10 pb-6">
                
                {/* Category selection - Only visible in Classic view */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
                  {viewMode === 'classic' ? (
                    DISPLAY_CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className="px-5 py-2 text-[10px] tracking-[0.25em] uppercase cursor-pointer transition-all duration-300 whitespace-nowrap"
                          style={{
                            color: isActive ? 'var(--color-terracotta)' : 'var(--color-text-dark)',
                            borderBottom: isActive ? '2px solid var(--color-terracotta)' : '2px solid transparent'
                          }}
                        >
                          {cat}
                        </button>
                      )
                    })
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-terracotta uppercase whitespace-nowrap font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta animate-pulse" />
                      Sorted by match accuracy
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..."
                    className="form-input text-xs pr-10 py-3 text-text-dark"
                    maxLength={50}
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta/60" />
                </div>
              </div>

              {/* Editorial Menu Grid */}
              <motion.div 
                layout
                className="flex flex-col gap-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHoveredItem(item)}
                      className="flex gap-6 items-start pb-6 border-b border-terracotta/5 group relative cursor-pointer text-left"
                    >
                      {/* Inline thumbnail */}
                      <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden bg-bg-secondary flex-shrink-0 relative lg:group-hover:border-terracotta/30 border border-transparent transition-all">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Text Description */}
                      <div className="flex-grow space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-lg md:text-xl font-light text-text-dark group-hover:text-terracotta transition-colors duration-300">
                              {item.name}
                            </h3>
                            
                            {/* Match Tag in Sensory Mode */}
                            {viewMode === 'sensory' && (
                              <span className="text-[9px] tracking-[0.1em] px-2 py-0.5 bg-terracotta/10 border border-terracotta/30 text-terracotta rounded-full font-sans font-semibold">
                                {item.matchScore}% Match
                              </span>
                            )}
                          </div>
                          <span className="font-display text-base text-terracotta font-medium">
                            ₹{item.price}
                          </span>
                        </div>
                        
                        <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                          {item.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[8px] tracking-[0.15em] uppercase text-accent bg-accent/5 px-2 py-0.5 border border-accent/10 font-semibold"
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
                  className="text-center py-20 border border-terracotta/15 bg-bg-secondary"
                >
                  <p className="font-display text-xl text-text-dark">
                    No items match your search.
                  </p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    className="btn-primary mt-6 text-[10px] py-3 px-8 cursor-pointer"
                  >
                    Reset Catalog
                  </button>
                </motion.div>
              )}
              
            </div>

            {/* RIGHT COLUMN: Sticky Hover Showcase (Large Image View) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-28 w-full text-left">
              {activeShowcaseItem ? (
                <motion.div
                  layout
                  className="border border-terracotta/15 bg-bg-secondary p-6 space-y-6 shadow-xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-primary border border-terracotta/10">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeShowcaseItem.id}
                        src={activeShowcaseItem.image}
                        alt={activeShowcaseItem.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                      />
                    </AnimatePresence>

                    {/* Sensory Scores overlay */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="text-[8px] tracking-[0.2em] uppercase bg-bg-primary/95 backdrop-blur px-2.5 py-1 border border-terracotta/20 text-terracotta font-semibold">
                        {activeShowcaseItem.category}
                      </span>
                    </div>

                    {viewMode === 'sensory' && (
                      <div className="absolute bottom-4 right-4 bg-bg-primary/95 backdrop-blur px-3 py-2 border border-terracotta/20 text-[10px] tracking-[0.1em] font-semibold flex items-center gap-1.5 rounded text-terracotta">
                        <Sparkles className="w-3.5 h-3.5 text-terracotta animate-spin-slow" />
                        <span>{activeShowcaseItem.matchScore}% Sensory Match</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline border-b border-terracotta/10 pb-3">
                      <h4 className="font-display text-2xl font-light text-text-dark">
                        {activeShowcaseItem.name}
                      </h4>
                      <span className="font-display text-xl text-terracotta font-medium">
                        ₹{activeShowcaseItem.price}
                      </span>
                    </div>

                    <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                      {activeShowcaseItem.desc}
                    </p>

                    {/* Sensory radar profile summary */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-terracotta/10 text-[9px] uppercase tracking-wider text-text-dark/70 font-semibold">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-600" /> Spice
                        </span>
                        <span className="text-terracotta font-mono">{activeShowcaseItem.profile.spicy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Cookie className="w-3 h-3 text-amber-600" /> Sweet
                        </span>
                        <span className="text-terracotta font-mono">{activeShowcaseItem.profile.sweet}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Sprout className="w-3 h-3 text-emerald-600" /> Earth
                        </span>
                        <span className="text-terracotta font-mono">{activeShowcaseItem.profile.earthy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <GlassWater className="w-3 h-3 text-sky-500" /> Rich
                        </span>
                        <span className="text-terracotta font-mono">{activeShowcaseItem.profile.rich}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[400px] border border-terracotta/10 bg-bg-secondary/40 flex items-center justify-center text-center p-8">
                  <p className="text-xs text-text-dark/50 tracking-widest uppercase">
                    Hover over menu items to preview
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

    </main>
  )
}

