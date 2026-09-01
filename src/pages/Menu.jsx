import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import menuData from '../data/menu.json'
import { useMenu } from '../context/MenuContext'
import { LogoOwl } from '../components/illustrations'
import SEO from '../components/SEO'
import { liquidLibraryData } from '../data/barMenuData'
import { getCdnUrl } from '../utils/cdn'

// Dynamic category helper using item data directly from Admin / Database
function getMappedCategory(item) {
  return item.category || 'Main Course'
}

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
    tags.includes('special')
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
      const itemIsNonVeg = isNonVeg(item)
      return {
        ...item,
        mappedCategory: getMappedCategory(item),
        isVeg: !itemIsNonVeg,
        nonVeg: itemIsNonVeg,
        special: isChefSpecial(item)
      }
    })

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

    if (searchQuery.trim() !== '') {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(result)
  }, [selectedCategory, dietaryFilter, searchQuery, contextItems])

  const activeShowcaseItem = hoveredItem || filteredItems[0] || menuData.items[0]

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] pt-24 font-body">
      <SEO
        title="Curated Menu & Liquid Library | Tanah Kitchen & Bar"
        description="Explore the curated gastronomy and artisanal Liquid Library of Tanah Kitchen & Bar in Gachibowli, Hyderabad."
        pathname="/menu"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Menu',
          'name': 'Tanah Dining & Bar Menu',
          'url': 'https://tanahkitchen.in/menu',
          'mainEntity': {
            '@type': 'FoodEstablishment',
            'name': 'Tanah Kitchen & Bar'
          }
        }}
      />
      
      {/* 1. Page Header with Food/Liquid Switcher */}
      <section className="section-dark bg-[#5E332E] relative py-20 md:py-24 text-center border-b border-[#E5E2DC]/15">
        <div className="relative z-10 px-8 max-width-container mx-auto">
          
          {/* Main Menu Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-white/20 p-1.5 bg-black/30 backdrop-blur-md shadow-lg">
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

          {menuType === 'food' ? (
            <>
              <div className="mb-3 flex justify-center">
                <img
                  src="/assets/logos/logo-wordmark-light.png"
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
            </>
          ) : (
            <>
              <div className="mb-3 flex justify-center">
                <img
                  src="/assets/logos/logo-wordmark-light.png"
                  alt="Tanah Kitchen & Bar"
                  className="h-8 md:h-10 w-auto object-contain opacity-95"
                />
              </div>
              <div className="mb-4">
                <span className="wp-badge wp-badge-gold">
                  ARTISANAL SPIRITS &amp; MIXOLOGY
                </span>
              </div>
              <h1
                className="font-display font-extrabold leading-tight text-[#E5E2DC] mb-4"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
              >
                The Liquid Library
              </h1>
              <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full mb-4" />
              <p className="text-sm md:text-base font-light max-w-2xl mx-auto text-[#FAF8F5]/90 leading-relaxed font-body">
                From aged single malts and craft botanical gin to bespoke rooftop cocktails and refreshing mocktails—curated for discerning palates.
              </p>
            </>
          )}
        </div>
      </section>

      {menuType === 'food' ? (
        /* ==========================================
           FOOD MENU SECTION (Clean Card Architecture)
           ========================================== */
        <section className="wp-section bg-[#FAF8F5] text-[#1E1B18]">
          <div className="wp-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* LEFT COLUMN: Controls & Menu list */}
              <div className="lg:col-span-7 space-y-8 w-full">
                
                {/* CHEF'S SIGNATURE HIGHLIGHTS */}
                {selectedCategory === 'All' && dietaryFilter === 'all' && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="wp-badge wp-badge-maroon">
                          CHEF RECOMMENDATIONS
                        </span>
                        <h2 className="text-sm font-bold tracking-wider uppercase text-[#5E332E]">
                          Signature Highlights
                        </h2>
                      </div>
                      <span className="text-[11px] text-[#1E1B18]/60 font-body">Curated Gastronomy</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {menuData.items.filter(i => isChefSpecial(i)).slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setHoveredItem(item)}
                          className="group relative rounded-2xl overflow-hidden bg-white border border-[#5E332E]/10 p-3 hover:border-[#5E332E]/40 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                          {item.image && item.image.trim() !== '' ? (
                            <div className="aspect-square w-full rounded-xl overflow-hidden mb-2 relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-1.5 left-1.5 shadow-sm">
                                {item.nonVeg ? <NonVegMark /> : <VegMark />}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-2 flex items-center gap-1.5">
                              {item.nonVeg ? <NonVegMark /> : <VegMark />}
                            </div>
                          )}
                          <h4 className="font-display font-bold text-xs text-[#5E332E] line-clamp-1 group-hover:text-[#5E332E]">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#1E1B18]/60 font-medium block mt-0.5">
                            {item.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filters and Search Bar */}
                <div className="space-y-4 border-b border-[#5E332E]/10 pb-6">
                  {/* Category selection */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
                      {availableCategories.map((cat) => {
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
                      })}
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
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E332E]/60 mr-1 flex-shrink-0">
                      Filter:
                    </span>
                    {[
                      { id: 'all', label: 'All Items', count: (categoryCounts._vegTotal || 0) + (categoryCounts._nvTotal || 0) },
                      { id: 'veg', label: '🟢 Veg Only', count: categoryCounts._vegTotal || 0 },
                      { id: 'non-veg', label: '🔴 Non-Veg', count: categoryCounts._nvTotal || 0 },
                      { id: 'special', label: '✦ Chef Specials', count: categoryCounts._specialTotal || 0 },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleDietaryFilterChange(btn.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 border flex items-center gap-1.5 ${
                          dietaryFilter === btn.id
                            ? 'bg-[#5E332E] text-[#E5E2DC] border-[#5E332E] shadow-xs'
                            : 'bg-white text-[#1E1B18]/70 border-[#5E332E]/15 hover:border-[#5E332E]/40'
                        }`}
                      >
                        <span>{btn.label}</span>
                        <span className="text-[10px] opacity-75">({btn.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Items List */}
                <motion.div layout className="space-y-4">
                  <AnimatePresence>
                    {filteredItems.map((item) => {
                      const hasImage = Boolean(item.image && item.image.trim() !== '')
                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          key={item.id}
                          onMouseEnter={() => setHoveredItem(item)}
                          className="wp-card p-5 flex gap-4 sm:gap-5 items-start group cursor-pointer text-left hover:border-[#5E332E]/30"
                        >
                          {/* Thumbnail with Dietary Marker (Only if image exists) */}
                          {hasImage && (
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0 relative border border-[#5E332E]/10">
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-1.5 left-1.5 shadow-sm">
                                {item.nonVeg ? <NonVegMark /> : <VegMark />}
                              </div>
                            </div>
                          )}

                          {/* Text Description & Badges */}
                          <div className="flex-grow space-y-1.5 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                                {!hasImage && (
                                  <div className="flex-shrink-0">
                                    {item.nonVeg ? <NonVegMark /> : <VegMark />}
                                  </div>
                                )}
                                <h3 className="font-display text-lg font-bold text-[#5E332E] group-hover:text-[#5E332E] transition-colors leading-snug">
                                  {item.name}
                                </h3>

                                {item.special && (
                                  <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-[#E5E2DC]/30 text-[#5E332E] border border-[#E5E2DC] rounded-full uppercase">
                                    ✦ Special
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-xs font-light text-[#1E1B18]/80 leading-relaxed font-body">
                              {item.desc}
                            </p>

                            {/* Pairing Suggestion */}
                            {getPairingSuggestion(item) && (
                              <div className="text-[10px] text-[#5E332E] font-semibold flex items-center gap-1.5 pt-0.5">
                                <span className="px-2 py-0.5 bg-[#E5E2DC]/20 rounded-md border border-[#E5E2DC]/50 font-sans">
                                  {getPairingSuggestion(item)}
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags && item.tags.map((tag, tIdx) => (
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
                    {activeShowcaseItem.image && activeShowcaseItem.image.trim() !== '' ? (
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
                            {activeShowcaseItem.nonVeg ? <NonVegMark /> : <VegMark />}
                            {activeShowcaseItem.category}
                          </span>
                          {activeShowcaseItem.special && (
                            <span className="text-[9px] tracking-widest uppercase bg-[#5E332E] text-[#E5E2DC] px-3 py-1 rounded-full font-bold shadow-sm">
                              ✦ Chef Pick
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[#5E332E]/5 border border-[#5E332E]/10 flex items-center justify-between">
                        <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-white border border-[#5E332E]/20 text-[#5E332E] font-bold flex items-center gap-1.5">
                          {activeShowcaseItem.nonVeg ? <NonVegMark /> : <VegMark />}
                          {activeShowcaseItem.category}
                        </span>
                        {activeShowcaseItem.special && (
                          <span className="text-[9px] tracking-widest uppercase bg-[#5E332E] text-[#E5E2DC] px-3 py-1 rounded-full font-bold shadow-sm">
                            ✦ Chef Pick
                          </span>
                        )}
                      </div>
                    )}

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
                        {activeShowcaseItem.tags && activeShowcaseItem.tags.map((tag, tIdx) => (
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
                ) : (
                  <div className="p-12 text-center rounded-2xl border border-dashed border-[#5E332E]/20 text-[#1E1B18]/40">
                    Hover over a dish to view its details
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ==========================================
           LIQUID LIBRARY SECTION (16 Categories - Solid Silver Birch Canvas)
           ========================================== */
        <section className="wp-section bg-[#FAF8F5] text-[#1E1B18] py-16">
          <div className="wp-container">
            {/* Liquid Library Menu Cards Grid */}
            <div className="w-full max-w-[900px] mx-auto flex flex-col gap-10">
              {LIQUID_SECTIONS.map((section) => (
                <div 
                  key={section.id}
                  id={`liquid-${section.id}`}
                  className="w-full relative rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden border border-[#5E332E]/15 bg-white text-[#1E1B18] shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative z-10 space-y-6">
                    {/* Category Heading */}
                    <div className="border-b border-[#5E332E]/15 pb-4 flex items-center justify-between flex-wrap gap-2">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#5E332E]/10 hover:border-[#5E332E]/30 transition-all text-left space-y-1.5">
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
                                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#5E332E]/10 hover:border-[#5E332E]/30 transition-all text-left space-y-1.5">
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
                      <div className="pt-6 border-t border-[#5E332E]/10 text-center">
                        <p className="text-xs sm:text-sm font-medium font-body text-[#5E332E]">
                          "{section.tagline}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
