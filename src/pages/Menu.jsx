import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sliders, Sparkles, Flame, Cookie, Sprout, GlassWater } from 'lucide-react'
import menuData from '../data/menu.json'
import { useMenu } from '../context/MenuContext'
import { LogoOwl } from '../components/illustrations'
import SEO from '../components/SEO'
import { liquidLibraryData } from '../data/barMenuData'

// Dynamic category helper using item data directly from Admin / Database
function getMappedCategory(item) {
  return item.category || 'Main Course'
}

// Calculate sensory profile of a menu item for Food
function calculateSensoryProfile(item) {
  let spicy = 0
  let sweet = 0
  let earthy = 10
  let rich = 10

  const descLower = item.desc.toLowerCase()
  const nameLower = item.name.toLowerCase()
  const tagsLower = item.tags.map(t => t.toLowerCase())

  if (tagsLower.includes('spicy') || tagsLower.includes('lava salt')) {
    spicy = 95
  } else if (descLower.includes('spic') || nameLower.includes('spic') || descLower.includes('chili') || descLower.includes('mustard') || descLower.includes('ginger') || descLower.includes('pepper')) {
    spicy = 75
  } else if (descLower.includes('herb') || descLower.includes('lemongrass') || descLower.includes('mint')) {
    spicy = 30
  }

  if (item.category === 'Desserts' || tagsLower.includes('sweet') || tagsLower.includes('decadent')) {
    sweet = 95
  } else if (descLower.includes('honey') || descLower.includes('jaggery') || descLower.includes('chocolate') || descLower.includes('sweet') || descLower.includes('nectar') || descLower.includes('fig') || descLower.includes('berry') || descLower.includes('apple') || descLower.includes('kokum')) {
    sweet = 80
  } else if (descLower.includes('orange') || descLower.includes('lemonade') || descLower.includes('hibiscus')) {
    sweet = 50
  }

  if (tagsLower.includes('organic') || tagsLower.includes('vegan') || tagsLower.includes('botanical') || tagsLower.includes('coal cooked') || tagsLower.includes('slow cooked')) {
    earthy = 90
  }
  if (descLower.includes('millet') || nameLower.includes('millet') || descLower.includes('soil') || descLower.includes('claypot') || descLower.includes('earth') || descLower.includes('mushroom') || descLower.includes('beetroot') || descLower.includes('barley') || descLower.includes('terracotta') || descLower.includes('basalt') || descLower.includes('wood-fired') || descLower.includes('foraged')) {
    earthy = Math.max(earthy, 85)
  } else if (descLower.includes('chutney') || descLower.includes('sambar') || descLower.includes('spinach') || descLower.includes('avocado') || descLower.includes('cucumber') || descLower.includes('basil') || descLower.includes('rosemary') || descLower.includes('garlic')) {
    earthy = Math.max(earthy, 60)
  }

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

// Liquid Library Dataset (All 16 Sections)
const LIQUID_SECTIONS = liquidLibraryData

function isNonVeg(item) {
  if (!item) return false
  const cat = (item.category || '').toLowerCase()
  if (cat.includes('non-veg') || cat === 'seafood' || cat === 'wings') return true
  if (cat.includes('veg starter') || cat === 'salads' || cat === 'indian breads' || cat === 'desserts') return false
  if (typeof item.isVeg === 'boolean') return !item.isVeg
  if (typeof item.nonVeg === 'boolean') return item.nonVeg
  const name = (item.name || '').toLowerCase()
  const desc = (item.desc || '').toLowerCase()
  const nonVegKeywords = [
    'chicken', 'mutton', 'kodi', 'fish', 'prawn', 'lamb', 'shrimp',
    'crab', 'egg', 'anchov', 'netallu', 'wing', 'pepperoni', 'meat',
    'bacon', 'pork', 'beef', 'duck', 'tuna', 'salmon', 'squid', 'calamari'
  ]
  return nonVegKeywords.some(kw => name.includes(kw) || desc.includes(kw))
}

function isChefSpecial(item) {
  if (typeof item.special === 'boolean') return item.special
  const tags = Array.isArray(item.tags) ? item.tags.map(t => t.toLowerCase()) : []
  return (
    tags.includes('signature') ||
    tags.includes('chef special') ||
    tags.includes('chef selection') ||
    tags.includes('must try') ||
    tags.includes('bestseller') ||
    tags.includes('best seller') ||
    tags.includes('legendary')
  )
}

function getPairingSuggestion(item) {
  if (item.pairing) return item.pairing
  if (item.category === 'Cocktails' || item.category === 'Beverages') return null
  return '🍹 Pairs with: Artisanal House Mocktail / Cocktail'
}

function VegMark() {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 border-[1.5px] border-emerald-600 rounded-[3px] p-[1.5px] bg-white flex-shrink-0 shadow-xs"
      title="Vegetarian"
      aria-label="Vegetarian"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-600" />
    </span>
  )
}

function NonVegMark() {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 border-[1.5px] border-red-700 rounded-[3px] p-[1.5px] bg-white flex-shrink-0 shadow-xs"
      title="Non-Vegetarian"
      aria-label="Non-Vegetarian"
    >
      <span className="w-2 h-2 rounded-full bg-red-700" />
    </span>
  )
}

export default function Menu() {
  const { items: contextItems, refreshFromServer } = useMenu()
  const [menuType, setMenuType] = useState('food') // 'food' or 'liquid'
  const [viewMode, setViewMode] = useState('classic') // 'classic' or 'sensory'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [dietaryFilter, setDietaryFilter] = useState('all') // 'all', 'veg', 'non-veg', 'special'
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    if (refreshFromServer) {
      refreshFromServer()
    }
  }, [refreshFromServer])

  // Sensory Matcher State
  const [sensoryPrefs, setSensoryPrefs] = useState({
    spicy: 50,
    sweet: 30,
    earthy: 50,
    rich: 40
  })

  // Dynamic Category & Dietary Counts
  const categoryCounts = useMemo(() => {
    const raw = (contextItems && contextItems.length >= menuData.items.length) ? contextItems : menuData.items
    const counts = { All: 0 }
    let vegTotal = 0
    let nvTotal = 0
    let specialTotal = 0

    for (const item of raw) {
      if (!item || !item.name) continue
      const nv = isNonVeg(item)
      const isSpecial = isChefSpecial(item)

      if (!nv) vegTotal++
      if (nv) nvTotal++
      if (isSpecial) specialTotal++

      let matchesDiet = true
      if (dietaryFilter === 'veg') matchesDiet = !nv && item.category !== 'Cocktails'
      else if (dietaryFilter === 'non-veg') matchesDiet = nv
      else if (dietaryFilter === 'special') matchesDiet = isSpecial

      if (matchesDiet) {
        counts.All = (counts.All || 0) + 1
        const cat = getMappedCategory(item)
        counts[cat] = (counts[cat] || 0) + 1
      }
    }
    return { ...counts, _vegTotal: vegTotal, _nvTotal: nvTotal, _specialTotal: specialTotal }
  }, [contextItems, dietaryFilter])

  const availableCategories = useMemo(() => {
    const raw = (contextItems && contextItems.length >= menuData.items.length) ? contextItems : menuData.items
    const allCats = ['All', ...Array.from(new Set(raw.map(i => getMappedCategory(i)).filter(Boolean)))]
    return allCats.filter(cat => (categoryCounts[cat] || 0) > 0)
  }, [contextItems, categoryCounts])

  const handleDietaryFilterChange = (filterId) => {
    setDietaryFilter(filterId)
    // If the currently selected category has 0 items under the new filter, seamlessly reset to 'All'
    if (selectedCategory !== 'All') {
      const raw = (contextItems && contextItems.length >= menuData.items.length) ? contextItems : menuData.items
      const hasMatchingInCat = raw.some(item => {
        if (getMappedCategory(item) !== selectedCategory) return false
        const nv = isNonVeg(item)
        if (filterId === 'veg') return !nv && item.category !== 'Cocktails'
        if (filterId === 'non-veg') return nv
        if (filterId === 'special') return isChefSpecial(item)
        return true
      })
      if (!hasMatchingInCat) {
        setSelectedCategory('All')
      }
    }
  }

  useEffect(() => {
    document.title = menuType === 'food' ? 'Seasonal Menu | Tanah Kitchen & Bar' : 'Liquid Library | Tanah Kitchen & Bar'
    window.scrollTo(0, 0)
  }, [menuType])

  useEffect(() => {
    const rawItems = (contextItems && contextItems.length >= menuData.items.length) ? contextItems : menuData.items
    
    // Deduplicate by name and ID
    const seenNames = new Set()
    const seenIds = new Set()
    const uniqueRaw = []
    for (const item of rawItems) {
      if (!item || !item.name) continue
      const nameKey = item.name.trim().toLowerCase()
      if (seenNames.has(nameKey) || seenIds.has(item.id)) continue
      seenNames.add(nameKey)
      seenIds.add(item.id)
      uniqueRaw.push(item)
    }

    let result = uniqueRaw.map(item => {
      const profile = calculateSensoryProfile(item)

      // Calculate match percentage
      const diffSpicy = Math.abs(profile.spicy - sensoryPrefs.spicy)
      const diffSweet = Math.abs(profile.sweet - sensoryPrefs.sweet)
      const diffEarthy = Math.abs(profile.earthy - sensoryPrefs.earthy)
      const diffRich = Math.abs(profile.rich - sensoryPrefs.rich)

      const avgDiff = (diffSpicy + diffSweet + diffEarthy + diffRich) / 4
      const matchScore = Math.max(0, Math.min(100, Math.round(100 - avgDiff)))
      const itemIsNonVeg = isNonVeg(item)

      return {
        ...item,
        mappedCategory: getMappedCategory(item),
        profile,
        matchScore,
        isVeg: !itemIsNonVeg,
        nonVeg: itemIsNonVeg,
        special: isChefSpecial(item)
      }
    })

    if (viewMode === 'classic') {
      if (selectedCategory !== 'All') {
        result = result.filter(item => item.mappedCategory === selectedCategory)
      }
      if (dietaryFilter === 'veg') {
        result = result.filter(item => !item.nonVeg && item.category !== 'Cocktails')
      } else if (dietaryFilter === 'non-veg') {
        result = result.filter(item => item.nonVeg)
      } else if (dietaryFilter === 'special') {
        result = result.filter(item => item.special)
      }
    } else {
      if (dietaryFilter === 'veg') {
        result = result.filter(item => !item.nonVeg && item.category !== 'Cocktails')
      } else if (dietaryFilter === 'non-veg') {
        result = result.filter(item => item.nonVeg)
      } else if (dietaryFilter === 'special') {
        result = result.filter(item => item.special)
      }
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
  }, [selectedCategory, dietaryFilter, searchQuery, viewMode, sensoryPrefs, contextItems])

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
    <main 
      className={`flex-grow pt-24 overflow-hidden text-left transition-colors duration-500 ${ menuType === 'liquid' ? 'min-h-screen relative' : 'bg-[#E5E2DC]' }`}
      style={menuType === 'liquid' ? { backgroundColor: 'var(--color-primary-dark)' } : {}}
    >
      <SEO
        title="Food Catalog & Liquid Library Bar Menu | Tanah Kitchen & Bar"
        description="Explore the full culinary catalog and Liquid Library bar menu at Tanah Kitchen & Bar in Gachibowli. Sourdough wood-fired pizzas, South India Kodi Chips, mutton biryani, and 17 spirit categories."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Menu',
          'name': 'Tanah Kitchen & Bar Gastronomy & Liquid Library Catalog',
          'url': 'https://tanahkitchen.in/menu',
          'mainEntity': {
            '@type': 'FoodEstablishment',
            'name': 'Tanah Kitchen & Bar'
          }
        }}
      />
      
      {/* 1. Page Header with Food/Liquid Switcher */}
      <section className={`relative py-20 md:py-24 text-center ${menuType === 'liquid' ? 'border-b border-[#ECE9DA]/15 bg-transparent' : 'section-dark border-b border-light-cream/15'}`}>
        <div className="relative z-10 px-8 max-width-container mx-auto">
          
          {/* Main Menu Type Selector */}
          {/* Main Top Tab Switcher: Food vs Liquid Library (WordPress Pill Switcher) */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-white/20 p-1.5 bg-black/20 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setMenuType('food')}
                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${ menuType === 'food' ? 'bg-[#E5E2DC] text-[#5E332E] shadow-md' : 'text-[#E5E2DC]/80 hover:text-white' }`}
              >
                Food Menu
              </button>
              <button
                onClick={() => setMenuType('liquid')}
                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${ menuType === 'liquid' ? 'bg-[#E5E2DC] text-[#5E332E] shadow-md' : 'text-[#E5E2DC]/80 hover:text-white' }`}
              >
                Liquid Library
              </button>
            </div>
          </div>

          {menuType === 'food' && (
            <>
              <div className="mb-3 flex justify-center">
                <img
                  src="https://storage.googleapis.com/yesj/assets/logos/logo-wordmark-light.png"
                  alt="Tanah Kitchen & Bar"
                  className="h-8 md:h-10 w-auto object-contain opacity-95"
                />
              </div>
              <div className="mb-4">
                <span className="wp-badge wp-badge-gold">
                  GASTRONOMY CATALOG
                </span>
              </div>
              <h1
                className="font-display font-extrabold leading-tight text-[#E5E2DC] mb-4"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
              >
                A Symphony of Global &amp; <br />
                <span className="font-normal text-[#E5E2DC]">Regional Flavors</span>
              </h1>
              <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full mb-4" />
              <p className="text-sm md:text-base font-light max-w-2xl mx-auto text-[#FAF8F5]/90 leading-relaxed font-body">
                Crafted with fresh ingredients, bold spices, and culinary artistry—our menu spans regional heritage to international favorites.
              </p>

              {/* Mode Selector Toggle (Classic Catalog vs Sensory Matcher) */}
              <div className="flex justify-center mt-8">
                <div className="inline-flex rounded-full border border-white/15 p-1 bg-black/20 backdrop-blur">
                  <button
                    onClick={() => setViewMode('classic')}
                    className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${ viewMode === 'classic' ? 'bg-white text-[#5E332E] shadow-sm' : 'text-white/75 hover:text-white' }`}
                  >
                    Classic Catalog
                  </button>
                  <button
                    onClick={() => setViewMode('sensory')}
                    className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${ viewMode === 'sensory' ? 'bg-white text-[#5E332E] shadow-sm' : 'text-white/75 hover:text-white' }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    Sensory Matcher
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {menuType === 'food' ? (
        /* ==========================================
           FOOD MENU SECTION (WordPress Card Architecture)
           ========================================== */
        <section className="wp-section bg-[#FAF8F5] text-[#1E1B18]">
          <div className="wp-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* LEFT COLUMN: Controls & Menu list */}
              <div className="lg:col-span-7 space-y-10 w-full">
                
                {/* SENSORY CONTROLS PANEL */}
                <AnimatePresence mode="wait">
                  {viewMode === 'sensory' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 md:p-8 rounded-2xl bg-white border border-[#5E332E]/15 shadow-md space-y-6 text-left"
                    >
                      <div>
                        <span className="wp-badge wp-badge-maroon mb-2">
                          FLAVOUR EXPLORER
                        </span>
                        <h2 className="text-2xl font-bold font-display text-[#5E332E]">
                          Curate Your Culinary Profile
                        </h2>
                        <p className="text-xs text-[#1E1B18]/75 mt-1 font-body">
                          Adjust the flavour dimensions or select a journey to align the menu.
                        </p>
                      </div>

                      {/* Preset Journeys */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {PRESET_JOURNEYS.map((journey) => (
                          <button
                            key={journey.name}
                            onClick={() => handlePresetSelect(journey.profile)}
                            className="p-3.5 rounded-xl text-left border border-[#5E332E]/15 bg-[#FAF8F5] hover:bg-[#5E332E] hover:border-[#5E332E] transition-all duration-300 group cursor-pointer"
                          >
                            <span className="block text-xs uppercase tracking-wider font-bold text-[#5E332E] group-hover:text-[#E5E2DC] transition-colors">
                              {journey.name}
                            </span>
                            <span className="block text-xs text-[#1E1B18]/70 group-hover:text-white/85 mt-1 font-light leading-snug font-body">
                              {journey.desc}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Sliders Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-2">
                        {/* Spicy Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-[#5E332E]">
                            <span className="flex items-center gap-1.5">
                              <Flame className="w-4 h-4 text-orange-600" />
                              Heat & Spice
                            </span>
                            <span className="font-mono">{sensoryPrefs.spicy}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sensoryPrefs.spicy}
                            onChange={(e) => handleSliderChange('spicy', e.target.value)}
                            className="w-full accent-[#5E332E] bg-[#5E332E]/20 h-1.5 rounded cursor-ew-resize"
                          />
                        </div>

                        {/* Sweet Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-[#5E332E]">
                            <span className="flex items-center gap-1.5">
                              <Cookie className="w-4 h-4 text-amber-600" />
                              Sweetness
                            </span>
                            <span className="font-mono">{sensoryPrefs.sweet}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sensoryPrefs.sweet}
                            onChange={(e) => handleSliderChange('sweet', e.target.value)}
                            className="w-full accent-[#5E332E] bg-[#5E332E]/20 h-1.5 rounded cursor-ew-resize"
                          />
                        </div>

                        {/* Earthy Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-[#5E332E]">
                            <span className="flex items-center gap-1.5">
                              <Sprout className="w-4 h-4 text-emerald-600" />
                              Earthiness
                            </span>
                            <span className="font-mono">{sensoryPrefs.earthy}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sensoryPrefs.earthy}
                            onChange={(e) => handleSliderChange('earthy', e.target.value)}
                            className="w-full accent-[#5E332E] bg-[#5E332E]/20 h-1.5 rounded cursor-ew-resize"
                          />
                        </div>

                        {/* Rich Slider */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-[#5E332E]">
                            <span className="flex items-center gap-1.5">
                              <GlassWater className="w-4 h-4 text-sky-500" />
                              Richness
                            </span>
                            <span className="font-mono">{sensoryPrefs.rich}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sensoryPrefs.rich}
                            onChange={(e) => handleSliderChange('rich', e.target.value)}
                            className="w-full accent-[#5E332E] bg-[#5E332E]/20 h-1.5 rounded cursor-ew-resize"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ==========================================
                    CHEF'S SIGNATURE HIGHLIGHTS (Featured Restaurant Specials)
                    ========================================== */}
                {viewMode === 'classic' && selectedCategory === 'All' && dietaryFilter === 'all' && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="wp-badge wp-badge-maroon">
                          ✦ CHEF'S CURATED SELECTION ✦
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#5E332E] uppercase tracking-wider hidden sm:inline">
                        Handcrafted Daily
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {((filteredItems.filter(item => item.special).length >= 3 
                          ? filteredItems.filter(item => item.special) 
                          : filteredItems
                        ).slice(0, 3)).map((special, sIdx) => (
                        <div
                          key={special.id || sIdx}
                          className="wp-card overflow-hidden group hover:border-[#5E332E]/30 transition-all flex flex-col justify-between"
                        >
                          <div className="relative aspect-[1/1] sm:aspect-[4/4.2] overflow-hidden bg-[#1E1B18]/5">
                            <img
                              src={special.image || "https://storage.googleapis.com/yesj/assets/Tanha Food/food-1.webp"}
                              alt={special.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 z-10">
                              <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#5E332E]/90 text-[#E5E2DC] backdrop-blur-md border border-[#E5E2DC]/30 shadow-md">
                                {special.special ? "✦ CHEF SPECIAL" : (special.tags?.[0] || "★ FEATURED")}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3 z-10 shadow-md">
                              {special.nonVeg ? <NonVegMark /> : <VegMark />}
                            </div>
                          </div>

                          <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-display text-base font-bold text-[#5E332E]">
                                  {special.name}
                                </h4>
                              </div>
                              <p className="text-xs text-[#1E1B18]/75 font-body leading-relaxed mt-1">
                                {special.desc}
                              </p>
                            </div>
                            {special.spice > 0 && (
                              <div className="text-[10px] text-orange-700 font-semibold flex items-center gap-1 pt-1">
                                <span>{'🌶️'.repeat(special.spice)}</span>
                                <span className="text-[9px] text-[#1E1B18]/60 font-body">Spice Level</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filters and Search Bar */}
                <div className="space-y-3.5 border-b border-[#5E332E]/10 pb-6">
                  {/* Category selection */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
                      {viewMode === 'classic' ? (
                        availableCategories.map((cat) => {
                          const isActive = selectedCategory === cat
                          const count = categoryCounts[cat] || 0
                          return (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${ isActive ? 'bg-[#5E332E] text-[#E5E2DC] shadow-sm' : 'bg-white text-[#1E1B18] border border-[#5E332E]/15 hover:border-[#5E332E]/40' }`}
                            >
                              <span>{cat}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${ isActive ? 'bg-[#E5E2DC]/30 text-[#E5E2DC]' : 'bg-[#5E332E]/10 text-[#5E332E]' }`}>
                                {count}
                              </span>
                            </button>
                          )
                        })
                      ) : (
                        <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-bold text-[#5E332E]">
                          <Sparkles className="w-4 h-4 text-[#5E332E] animate-pulse" />
                          Sorted by match accuracy
                        </div>
                      )}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-64 flex-shrink-0">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dishes..."
                        className="wp-form-input text-xs pr-10 py-2.5"
                        maxLength={50}
                      />
                      <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E332E]/60" />
                    </div>
                  </div>

                  {/* Dietary Quick Filter Row */}
                  {viewMode === 'classic' && (
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E332E]/60 mr-1 flex-shrink-0">
                        Filter:
                      </span>
                      {[
                        { id: 'all', label: 'All Items', count: (categoryCounts._vegTotal || 68) + (categoryCounts._nvTotal || 100) },
                        { id: 'veg', label: '🟢 Veg Only', count: categoryCounts._vegTotal || 68 },
                        { id: 'non-veg', label: '🔴 Non-Veg', count: categoryCounts._nvTotal || 100 },
                        { id: 'special', label: '✦ Chef Specials', count: categoryCounts._specialTotal || 35 }
                      ].map((df) => {
                        const isDietActive = dietaryFilter === df.id
                        return (
                          <button
                            key={df.id}
                            onClick={() => handleDietaryFilterChange(df.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${ isDietActive ? 'bg-[#5E332E] text-[#E5E2DC] border border-[#5E332E] font-bold shadow-sm' : 'bg-white/90 text-[#1E1B18]/75 border border-[#5E332E]/15 hover:border-[#5E332E]/40' }`}
                          >
                            <span>{df.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${ isDietActive ? 'bg-[#E5E2DC]/30 text-[#E5E2DC]' : 'bg-[#5E332E]/10 text-[#5E332E]' }`}>
                              {df.count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Menu Items List */}
                <motion.div layout className="flex flex-col gap-3.5">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => {
                      const spiceLevel = item.profile.spicy >= 70 ? 2 : item.profile.spicy >= 30 ? 1 : 0
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.35 }}
                          onMouseEnter={() => setHoveredItem(item)}
                          className="wp-card p-5 flex gap-4 sm:gap-5 items-start group cursor-pointer text-left hover:border-[#5E332E]/30"
                        >
                          {/* Thumbnail with Dietary Marker */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0 relative border border-[#5E332E]/10">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {item.category !== 'Cocktails' && item.category !== 'Beverages' && (
                              <div className="absolute top-1.5 left-1.5 shadow-sm">
                                {item.nonVeg ? <NonVegMark /> : <VegMark />}
                              </div>
                            )}
                          </div>

                          {/* Text Description & Badges */}
                          <div className="flex-grow space-y-1.5 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <div className="flex items-center gap-2 flex-wrap min-w-0">
                                <h3 className="font-display text-lg font-bold text-[#5E332E] group-hover:text-[#5E332E] transition-colors leading-snug">
                                  {item.name}
                                </h3>

                                {item.special && (
                                  <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-[#E5E2DC]/30 text-[#5E332E] border border-[#E5E2DC] rounded-full uppercase">
                                    ✦ Special
                                  </span>
                                )}

                                {spiceLevel > 0 && (
                                  <span className="text-xs" title={`Spice Level: ${spiceLevel}/2`}>
                                    {'🌶️'.repeat(spiceLevel)}
                                  </span>
                                )}

                                {viewMode === 'sensory' && (
                                  <span className="text-[10px] tracking-wider px-2.5 py-0.5 bg-[#5E332E]/10 text-[#5E332E] rounded-full font-bold">
                                    {item.matchScore}% Match
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-xs font-light text-[#1E1B18]/80 leading-relaxed font-body">
                              {item.desc}
                            </p>

                            {/* Food & Liquid Pairing Suggestion */}
                            {getPairingSuggestion(item) && (
                              <div className="text-[10px] text-[#5E332E] font-semibold flex items-center gap-1.5 pt-0.5">
                                <span className="px-2 py-0.5 bg-[#E5E2DC]/20 rounded-md border border-[#E5E2DC]/50 font-sans">
                                  {getPairingSuggestion(item)}
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[9px] tracking-wider uppercase font-semibold text-[#5E332E] bg-[#5E332E]/5 px-2 py-0.5 rounded border border-[#5E332E]/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 rounded-2xl border border-[#5E332E]/15 bg-white p-8"
                  >
                    <p className="font-display text-xl font-bold text-[#5E332E]">
                      No items match your search.
                    </p>
                    <button
                      onClick={() => { setSelectedCategory('All'); setDietaryFilter('all'); setSearchQuery(''); }}
                      className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] mt-4 text-xs font-bold"
                    >
                      Reset Filter
                    </button>
                  </motion.div>
                )}
              </div>

              {/* RIGHT COLUMN: Sticky Hover Showcase */}
              <div className="hidden lg:block lg:col-span-5 sticky top-28 w-full text-left">
                {activeShowcaseItem ? (
                  <motion.div layout className="wp-card p-6 space-y-6 shadow-2xl border border-[#5E332E]/15">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white border border-[#5E332E]/10">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeShowcaseItem.id}
                          src={activeShowcaseItem.image}
                          alt={activeShowcaseItem.name}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
                        />
                      </AnimatePresence>

                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="text-[9px] tracking-widest uppercase bg-white/95 backdrop-blur px-3 py-1 rounded-full border border-[#5E332E]/20 text-[#5E332E] font-bold shadow-sm flex items-center gap-1.5">
                          {activeShowcaseItem.category !== 'Cocktails' && activeShowcaseItem.category !== 'Beverages' && (
                            activeShowcaseItem.nonVeg ? <NonVegMark /> : <VegMark />
                          )}
                          {activeShowcaseItem.category}
                        </span>
                        {activeShowcaseItem.special && (
                          <span className="text-[9px] tracking-widest uppercase bg-[#5E332E] text-[#E5E2DC] px-3 py-1 rounded-full font-bold shadow-sm">
                            ✦ Chef Pick
                          </span>
                        )}
                      </div>

                      {viewMode === 'sensory' && (
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3.5 py-1.5 border border-[#5E332E]/20 text-[10px] tracking-wider font-bold flex items-center gap-1.5 rounded-full text-[#5E332E] shadow-md">
                          <Sparkles className="w-3.5 h-3.5 text-[#5E332E] animate-spin-slow" />
                          <span>{activeShowcaseItem.matchScore}% Match</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline border-b border-[#5E332E]/10 pb-3">
                        <h4 className="font-display text-2xl font-bold text-[#5E332E]">
                          {activeShowcaseItem.name}
                        </h4>
                      </div>

                      <p className="text-xs font-light text-[#1E1B18]/80 leading-relaxed font-body">
                        {activeShowcaseItem.desc}
                      </p>

                      {getPairingSuggestion(activeShowcaseItem) && (
                        <div className="p-2.5 rounded-xl bg-[#E5E2DC]/20 border border-[#E5E2DC]/50 text-xs text-[#5E332E] font-semibold flex items-center gap-2">
                          <span>{getPairingSuggestion(activeShowcaseItem)}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeShowcaseItem.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] tracking-wider uppercase font-semibold text-[#5E332E] bg-[#5E332E]/5 px-2 py-0.5 rounded border border-[#5E332E]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-[#5E332E]/10 text-[9px] uppercase tracking-wider opacity-80 font-bold text-[#5E332E]">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-600" /> Spice
                          </span>
                          <span className="font-mono">{activeShowcaseItem.profile.spicy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            <Cookie className="w-3.5 h-3.5 text-amber-600" /> Sweet
                          </span>
                          <span className="font-mono">{activeShowcaseItem.profile.sweet}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            <Sprout className="w-3.5 h-3.5 text-emerald-600" /> Earth
                          </span>
                          <span className="font-mono">{activeShowcaseItem.profile.earthy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            <GlassWater className="w-3.5 h-3.5 text-sky-500" /> Rich
                          </span>
                          <span className="font-mono">{activeShowcaseItem.profile.rich}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-[400px] border border-primary-dark/10 bg-primary-dark/5 flex items-center justify-center text-center p-8">
                    <p className="text-xs opacity-50 tracking-widest uppercase font-semibold">
                      Hover over menu items to preview
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      ) : (
        /* ==========================================
           LIQUID LIBRARY SECTION (Redesigned Bar Menu Book Layout)
           ========================================== */
        <div className="w-full relative overflow-x-hidden font-body pb-16">
          {/* Global Background Image with 85% #6F292C overlay */}
          <div 
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: "url('https://storage.googleapis.com/yesj/assets/Tanha Ambiance/Ambiance-9.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div 
              className="absolute inset-0 z-10" 
              style={{ backgroundColor: 'var(--color-primary-dark)', opacity: 0.85 }} 
            />
          </div>

          <div className="relative z-10 w-full pt-10">
            {/* Diamond Border Strip */}
            <div 
              className="w-full overflow-hidden mb-16 flex justify-center tracking-[0.5em] font-bold opacity-90 select-none"
              style={{ color: 'var(--color-beige)', fontSize: '18px' }}
            >
               ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆
            </div>

            {/* Page Header */}
            <div className="text-center px-6 mb-16 space-y-2">
              <h2 
                className="font-bold tracking-wider leading-none m-0 uppercase"
                style={{ 
                  color: 'var(--color-beige)', 
                  fontSize: 'clamp(56px, 8vw, 64px)', 
                  fontFamily: "'Oswald', Impact, sans-serif" 
                }}
              >
                LIQUID LIBRARY
              </h2>
              <p 
                className="font-bold m-0"
                style={{ 
                  color: 'rgba(236, 233, 218, 0.8)', 
                  fontSize: '28px', 
                  fontFamily: "'Caveat', cursive" 
                }}
              >
                The Bar Menu
              </p>
            </div>

            {/* Liquid Library Menu Cards */}
            <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
              {LIQUID_SECTIONS.map((section) => (
                <div 
                  key={section.id}
                  id={`liquid-${section.id}`}
                  className="w-full relative rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden border border-[#5E332E]/15 bg-[#FAF8F5] text-[#1E1B18] shadow-lg"
                  style={{
                    backgroundImage: section.watermark 
                      ? `linear-gradient(rgba(250, 248, 245, 0.94), rgba(250, 248, 245, 0.94)), url('${section.watermark}')`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-10 space-y-6">
                    {/* Category Heading */}
                    <div className="border-b border-[#5E332E]/20 pb-4 flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5E332E] block mb-1">
                          LIQUID COLLECTION
                        </span>
                        <h3 className="font-display font-extrabold tracking-wide text-2xl sm:text-3xl text-[#5E332E] uppercase">
                          {section.name}
                        </h3>
                      </div>
                      {section.items && (
                        <span className="text-[11px] font-bold px-3 py-1 bg-[#5E332E]/10 text-[#5E332E] rounded-full">
                          {section.items.length} Selections
                        </span>
                      )}
                    </div>

                    {/* Standard Items List */}
                    {section.items && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-white/70 border border-[#5E332E]/10 hover:border-[#5E332E]/30 transition-all text-left space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-display text-base font-bold text-[#5E332E]">
                                {item.name}
                              </h4>
                              {item.tag && (
                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[#5E332E] text-[#E5E2DC] rounded-full flex-shrink-0">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            {item.desc && (
                              <p className="text-xs font-light text-[#1E1B18]/75 leading-relaxed font-body">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Wine Subsections List */}
                    {section.subsections && (
                      <div className="space-y-6 pt-2">
                        {section.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-3">
                            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#5E332E] flex items-center gap-2">
                              <span>🍷</span> {sub.title}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {sub.items.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-white/70 border border-[#5E332E]/10 hover:border-[#5E332E]/30 transition-all text-left space-y-1">
                                  <h5 className="font-display text-base font-bold text-[#5E332E]">
                                    {item.name}
                                  </h5>
                                  {item.desc && (
                                    <p className="text-xs font-light text-[#1E1B18]/75 leading-relaxed font-body">
                                      {item.desc}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Bottom Tagline */}
                    {section.tagline && (
                      <div className="pt-6 border-t border-[#5E332E]/15 text-center">
                        <p className="text-sm font-medium font-body text-[#5E332E]">
                          "{section.tagline}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Diamond Border Strip before Footer */}
            <div 
              className="w-full overflow-hidden mt-20 mb-8 flex justify-center tracking-[0.5em] font-bold opacity-90 select-none"
              style={{ color: 'var(--color-beige)', fontSize: '18px' }}
            >
               ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆ · · ◆
            </div>
          </div>
          
          {/* Page Footer */}
          <footer 
            className="w-full relative z-10 py-16 flex flex-col items-center text-center border-t"
            style={{ backgroundColor: 'var(--color-primary-dark)', borderColor: 'rgba(236, 233, 218, 0.15)' }}
          >
            <img 
              src="https://storage.googleapis.com/yesj/assets/logos/logo-primary-vertical-light.png" 
              alt="Tanah Kitchen & Bar" 
              className="h-20 w-auto mb-5 object-contain" 
            />
            <p className="max-w-[320px] leading-relaxed mx-auto" style={{ color: 'var(--color-beige)', fontSize: '13px', opacity: 0.85 }}>
              5th Floor, Vaishnavi Splendora, opp Meenakshi Bamboos, beside AIG Hospital, Gachibowli.
            </p>
          </footer>
        </div>
      )}

    </main>
  )
}
