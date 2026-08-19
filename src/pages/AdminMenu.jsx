import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Download,
  Copy,
  RotateCcw,
  Check,
  X,
  Sparkles,
  Utensils,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useMenu } from '../context/MenuContext'
import SEO from '../components/SEO'

// Catalog of 54 pure DSLR food photos
const ALL_FOOD_IMAGES = Array.from({ length: 54 }, (_, i) => ({
  path: `/assets/Tanha Food/food-${i + 1}.webp`,
  id: `food-${i + 1}`,
  number: i + 1,
  name: `Photo #${i + 1}`
}))

const DISHES_PER_PAGE = 12
const PHOTOS_PER_PAGE = 8

function VegMark() {
  return (
    <span
      className="inline-block w-3.5 h-3.5 border border-emerald-600 bg-emerald-50 p-0.5 rounded-xs flex-shrink-0"
      title="Pure Vegetarian"
    >
      <span className="block w-full h-full bg-emerald-600 rounded-full" />
    </span>
  )
}

function NonVegMark() {
  return (
    <span
      className="inline-block w-3.5 h-3.5 border border-rose-700 bg-rose-50 p-0.5 rounded-xs flex-shrink-0"
      title="Non-Vegetarian"
    >
      <span className="block w-full h-full bg-rose-700 rounded-full" />
    </span>
  )
}

export default function AdminMenu() {
  const { items, categories, updateItem, addItem, deleteItem, resetToDefault, exportJsonFile } =
    useMenu()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [editingItem, setEditingItem] = useState(null)
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [imageSearchQuery, setImageSearchQuery] = useState('')
  
  // Pagination States
  const [dishPage, setDishPage] = useState(1)
  const [photoPage, setPhotoPage] = useState(1)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Filtered dishes
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
      return matchesCategory && matchesSearch
    })
  }, [items, selectedCategory, searchQuery])

  // Paginated dishes
  const totalDishPages = Math.ceil(filteredItems.length / DISHES_PER_PAGE) || 1
  const paginatedDishes = useMemo(() => {
    const start = (dishPage - 1) * DISHES_PER_PAGE
    return filteredItems.slice(start, start + DISHES_PER_PAGE)
  }, [filteredItems, dishPage])

  // Filtered images in picker
  const filteredImages = useMemo(() => {
    if (!imageSearchQuery) return ALL_FOOD_IMAGES
    return ALL_FOOD_IMAGES.filter((img) =>
      img.name.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
      img.id.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
      String(img.number).includes(imageSearchQuery)
    )
  }, [imageSearchQuery])

  // Paginated images in picker
  const totalPhotoPages = Math.ceil(filteredImages.length / PHOTOS_PER_PAGE) || 1
  const paginatedPhotos = useMemo(() => {
    const start = (photoPage - 1) * PHOTOS_PER_PAGE
    return filteredImages.slice(start, start + PHOTOS_PER_PAGE)
  }, [filteredImages, photoPage])

  // Save handler for the modal
  const handleSaveItem = (e) => {
    e.preventDefault()
    if (!editingItem.name.trim()) {
      showToast('⚠️ Please enter a dish name.')
      return
    }

    if (editingItem.id && items.some((i) => i.id === editingItem.id)) {
      updateItem(editingItem.id, editingItem)
      showToast(`✓ Updated "${editingItem.name}"`)
    } else {
      addItem(editingItem)
      showToast(`✓ Added "${editingItem.name}" to menu`)
    }
    setEditingItem(null)
  }

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    const jsonStr = JSON.stringify({ categories, items }, null, 2)
    navigator.clipboard.writeText(jsonStr)
    showToast('📋 Menu JSON copied to clipboard!')
  }

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#3A2E2A] pt-28 pb-20 font-body">
      <SEO
        title="Menu & Content Management Studio | Tanah Kitchen"
        description="Fast, spacious visual studio for matching dish photography, editing prices, and managing categories."
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#6B2523] text-[#FFC470] px-5 py-3 rounded-2xl shadow-2xl border border-[#FFC470]/30 text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#6B2523]/15 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#6B2523] text-[#FFC470]">
                ✦ CONTENT STUDIO ✦
              </span>
              <span className="text-xs font-semibold text-[#882B06] bg-[#882B06]/10 px-2.5 py-1 rounded-full">
                {items.length} Dishes
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#6B2523]">
              Menu &amp; Visual Content Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#3A2E2A]/80 max-w-xl font-light">
              Visually match authentic restaurant photographs, update descriptions, and synchronize prices live across the website.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditingItem({
                  name: '',
                  category: 'Lunch',
                  desc: '',
                  price: 499,
                  image: '/assets/Tanha Food/food-1.webp',
                  tags: ['Chef Special']
                })
              }}
              className="px-4 py-2.5 rounded-xl bg-[#6B2523] text-[#FFC470] hover:bg-[#3A2E2A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>

            <button
              onClick={exportJsonFile}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#6B2523]/25 hover:bg-[#FAF6F0] text-[#6B2523] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Download updated menu.json"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#6B2523]/25 hover:bg-[#FAF6F0] text-[#6B2523] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Copy JSON to clipboard"
            >
              <Copy className="w-4 h-4" />
              <span>Copy JSON</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all menu data back to factory defaults?')) {
                  resetToDefault()
                  showToast('↺ Menu reset to default')
                }
              }}
              className="p-2.5 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 transition-all shadow-xs"
              title="Reset to default menu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setDishPage(1)
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#6B2523] text-[#FFC470] shadow-md'
                    : 'bg-white text-[#3A2E2A]/75 hover:bg-white/80 border border-[#6B2523]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3A2E2A]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setDishPage(1)
              }}
              placeholder="Search dishes or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#6B2523]/15 text-xs text-[#3A2E2A] placeholder-[#3A2E2A]/40 focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
            />
          </div>
        </div>

        {/* Dishes Grid (Paginated 12 per page) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDishes.map((item) => {
            const isVeg = !item.name.toLowerCase().includes('mutton') &&
              !item.name.toLowerCase().includes('chicken') &&
              !item.name.toLowerCase().includes('kodi') &&
              !item.name.toLowerCase().includes('prawn') &&
              !item.name.toLowerCase().includes('omelette')

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#6B2523]/15 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Change Photo Overlay Button */}
                    <button
                      onClick={() => {
                        setEditingItem(item)
                        setIsPhotoPickerOpen(true)
                        setPhotoPage(1)
                      }}
                      className="absolute inset-0 m-auto w-fit h-fit px-3.5 py-1.5 bg-black/80 hover:bg-[#6B2523] text-[#FFC470] backdrop-blur-md rounded-xl text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>

                    {/* Category & Veg Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
                      {isVeg ? <VegMark /> : <NonVegMark />}
                    </div>

                    {/* Image path pill */}
                    <div className="absolute bottom-2 left-3 text-[10px] text-white/90 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {item.image.replace('/assets/Tanha Food/', '')}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-bold text-lg text-[#6B2523] leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-display text-lg font-extrabold text-[#882B06] flex-shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#3A2E2A]/80 font-light leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#6B2523]/5 text-[#6B2523] border border-[#6B2523]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-[#6B2523]/10 bg-[#FAF6F0]/50 flex items-center justify-between">
                  <span className="text-[10px] text-[#3A2E2A]/50 font-mono">ID: {item.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#6B2523]/20 hover:bg-[#6B2523] hover:text-[#FFC470] text-[#6B2523] text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${item.name}" from menu?`)) {
                          deleteItem(item.id)
                          showToast(`🗑️ Deleted "${item.name}"`)
                        }
                      }}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-all"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Dishes Pagination Bar */}
        {totalDishPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setDishPage((p) => Math.max(1, p - 1))}
              disabled={dishPage === 1}
              className="p-2 rounded-xl bg-white border border-[#6B2523]/20 disabled:opacity-30 hover:bg-[#FAF6F0] text-[#6B2523]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-[#6B2523] px-3">
              Page {dishPage} of {totalDishPages}
            </span>
            <button
              onClick={() => setDishPage((p) => Math.min(totalDishPages, p + 1))}
              disabled={dishPage === totalDishPages}
              className="p-2 rounded-xl bg-white border border-[#6B2523]/20 disabled:opacity-30 hover:bg-[#FAF6F0] text-[#6B2523]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* ── Visual Photo Picker Modal (Clean, Spacious & Paginated) ── */}
      <AnimatePresence>
        {isPhotoPickerOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#6B2523]/20"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#6B2523]/15 flex items-center justify-between bg-[#FAF6F0]">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#6B2523]">
                    Select Photograph for &ldquo;{editingItem.name || 'Dish'}&rdquo;
                  </h3>
                  <p className="text-xs text-[#3A2E2A]/70 font-light mt-0.5">
                    Click any photograph below to assign it. Showing page {photoPage} of {totalPhotoPages} ({filteredImages.length} available photos).
                  </p>
                </div>
                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#3A2E2A]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Filter Tabs & Search */}
              <div className="p-4 border-b border-[#6B2523]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  {[
                    { label: 'Photos 1–8', page: 1 },
                    { label: 'Photos 9–16', page: 2 },
                    { label: 'Photos 17–24', page: 3 },
                    { label: 'Photos 25–32', page: 4 },
                    { label: 'Photos 33–40', page: 5 },
                    { label: 'Photos 41–48', page: 6 },
                    { label: 'Photos 49–54', page: 7 }
                  ].map((tab) => (
                    <button
                      key={tab.page}
                      onClick={() => {
                        setImageSearchQuery('')
                        setPhotoPage(tab.page)
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        photoPage === tab.page && !imageSearchQuery
                          ? 'bg-[#6B2523] text-[#FFC470] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#3A2E2A]/75 hover:bg-[#6B2523]/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-48 flex-shrink-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3A2E2A]/40" />
                  <input
                    type="text"
                    value={imageSearchQuery}
                    onChange={(e) => {
                      setImageSearchQuery(e.target.value)
                      setPhotoPage(1)
                    }}
                    placeholder="Search photo #..."
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FAF6F0] rounded-xl border border-[#6B2523]/15 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Pure Visual Photo Gallery Grid (Zero Text Content) */}
              <div className="p-6 overflow-y-auto max-h-[58vh] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 bg-[#FAF6F0]/40">
                {paginatedPhotos.map((img) => {
                  const isSelected = editingItem.image === img.path
                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setEditingItem({ ...editingItem, image: img.path })
                        setIsPhotoPickerOpen(false)
                        showToast(`✓ Photo assigned`)
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-xs h-40 sm:h-48 bg-white ${
                        isSelected
                          ? 'border-[#6B2523] ring-4 ring-[#6B2523]/30 scale-[1.02] shadow-lg'
                          : 'border-transparent hover:border-[#6B2523]/50 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#6B2523] text-[#FFC470] p-1.5 rounded-full shadow-xl">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Picker Footer with Pagination */}
              <div className="p-4 border-t border-[#6B2523]/15 bg-[#FAF6F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPhotoPage((p) => Math.max(1, p - 1))}
                    disabled={photoPage === 1}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#6B2523]/20 disabled:opacity-30 text-xs font-bold text-[#6B2523]"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-[#3A2E2A]/70 font-semibold px-2">
                    Page {photoPage} of {totalPhotoPages}
                  </span>
                  <button
                    onClick={() => setPhotoPage((p) => Math.min(totalPhotoPages, p + 1))}
                    disabled={photoPage === totalPhotoPages}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#6B2523]/20 disabled:opacity-30 text-xs font-bold text-[#6B2523]"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#6B2523] text-[#FFC470] text-xs font-bold uppercase tracking-wider shadow-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Dish Edit / Create Modal ── */}
      <AnimatePresence>
        {editingItem && !isPhotoPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#6B2523]/20"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#6B2523]/15 flex items-center justify-between bg-[#FAF6F0]">
                <h3 className="font-display font-bold text-xl text-[#6B2523]">
                  {editingItem.id ? 'Edit Dish Details' : 'Create New Menu Dish'}
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#3A2E2A]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveItem} className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
                
                {/* Photo Preview & Browse button */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF6F0] border border-[#6B2523]/15">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#6B2523]/20 bg-black/5">
                    <img
                      src={editingItem.image || '/assets/Tanha Food/food-1.webp'}
                      alt="Selected preview"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#3A2E2A]/70 block font-semibold">
                      {editingItem.image}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPhotoPickerOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#6B2523] text-[#FFC470] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:bg-[#3A2E2A] transition-all"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Browse Photo Catalog</span>
                    </button>
                  </div>
                </div>

                {/* Dish Name */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Claypot Mutton Biryani"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1">
                      Category
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30 bg-white"
                    >
                      {['Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts'].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1">
                    Culinary Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.desc}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    placeholder="Describe ingredients and cooking craft..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B2523] block mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingItem.tags ? editingItem.tags.join(', ') : ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    placeholder="e.g. ★ BESTSELLER, Signature, Vegan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                  />
                </div>

                {/* Submit */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#3A2E2A]/70 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#6B2523] text-[#FFC470] hover:bg-[#3A2E2A] text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  )
}
