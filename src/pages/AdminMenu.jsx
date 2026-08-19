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
  Eye,
  SlidersHorizontal
} from 'lucide-react'
import { useMenu } from '../context/MenuContext'
import SEO from '../components/SEO'

// Generate full catalog of available food photos (1 to 54)
const ALL_FOOD_IMAGES = Array.from({ length: 54 }, (_, i) => ({
  path: `/assets/Tanha Food/food-${i + 1}.webp`,
  id: `food-${i + 1}`,
  name: `Food Photo #${i + 1}`
}))

function VegMark() {
  return (
    <span
      className="inline-block w-4 h-4 border border-emerald-600 bg-emerald-50 p-0.5 rounded-sm flex-shrink-0"
      title="Pure Vegetarian"
    >
      <span className="block w-full h-full bg-emerald-600 rounded-full" />
    </span>
  )
}

function NonVegMark() {
  return (
    <span
      className="inline-block w-4 h-4 border border-rose-700 bg-rose-50 p-0.5 rounded-sm flex-shrink-0"
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

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
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

  // Filtered images in the picker
  const filteredImages = useMemo(() => {
    if (!imageSearchQuery) return ALL_FOOD_IMAGES
    return ALL_FOOD_IMAGES.filter((img) =>
      img.name.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
      img.id.toLowerCase().includes(imageSearchQuery.toLowerCase())
    )
  }, [imageSearchQuery])

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
        description="Internal visual management dashboard for updating dish photography, prices, descriptions, and categories."
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#6B2523] text-[#FFC470] px-5 py-3 rounded-xl shadow-2xl border border-[#FFC470]/30 text-sm font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#6B2523]/15 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#6B2523] text-[#FFC470]">
                ✦ ADMIN STUDIO ✦
              </span>
              <span className="text-xs font-semibold text-[#882B06] bg-[#882B06]/10 px-2.5 py-1 rounded-full">
                {items.length} Total Dishes
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#6B2523]">
              Menu &amp; Visual Content Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#3A2E2A]/80 max-w-xl">
              Match authentic food photos, edit culinary descriptions, change prices, and customize dietary badges. Changes update the live site instantly.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() =>
                setEditingItem({
                  name: '',
                  category: 'Lunch',
                  desc: '',
                  price: 499,
                  image: '/assets/Tanha Food/food-1.webp',
                  tags: ['Chef Special'],
                  isVeg: true
                })
              }
              className="px-4 py-2.5 rounded-xl bg-[#6B2523] text-[#FFC470] hover:bg-[#3A2E2A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>

            <button
              onClick={exportJsonFile}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#6B2523]/25 hover:bg-[#FAF6F0] text-[#6B2523] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Download updated menu.json"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#6B2523]/25 hover:bg-[#FAF6F0] text-[#6B2523] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Copy raw JSON to clipboard"
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
              className="p-2.5 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 transition-all shadow-sm"
              title="Reset to default menu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#6B2523]/15 text-xs text-[#3A2E2A] placeholder-[#3A2E2A]/40 focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
            />
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isVeg = !item.name.toLowerCase().includes('mutton') &&
              !item.name.toLowerCase().includes('chicken') &&
              !item.name.toLowerCase().includes('kodi') &&
              !item.name.toLowerCase().includes('prawn') &&
              !item.name.toLowerCase().includes('omelette')

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#6B2523]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Dish Photo Box with Quick Change button */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Change Photo Overlay Button */}
                    <button
                      onClick={() => {
                        setEditingItem(item)
                        setIsPhotoPickerOpen(true)
                      }}
                      className="absolute inset-0 m-auto w-fit h-fit px-3.5 py-1.5 bg-black/75 hover:bg-[#6B2523] text-[#FFC470] backdrop-blur-md rounded-xl text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-lg"
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

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1 rounded-md shadow-md">
                      {isVeg ? <VegMark /> : <NonVegMark />}
                    </div>

                    {/* Image path pill */}
                    <div className="absolute bottom-2 left-3 text-[10px] text-white/80 font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.image.replace('/assets/Tanha Food/', '')}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
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
                      <div className="flex flex-wrap gap-1.5 pt-1">
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

                {/* Card Action Footer */}
                <div className="p-4 border-t border-[#6B2523]/10 bg-[#FAF6F0]/50 flex items-center justify-between">
                  <span className="text-[10px] text-[#3A2E2A]/60 font-mono">ID: {item.id}</span>
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

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6B2523]/15 p-8 space-y-3">
            <Utensils className="w-12 h-12 text-[#6B2523]/40 mx-auto" />
            <h3 className="font-display text-xl font-bold text-[#6B2523]">No dishes found</h3>
            <p className="text-xs text-[#3A2E2A]/70">Try adjusting your search query or category filter.</p>
          </div>
        )}

      </div>

      {/* ── Visual Photo Picker Modal ── */}
      <AnimatePresence>
        {isPhotoPickerOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#6B2523]/20"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[#6B2523]/15 flex items-center justify-between bg-[#FAF6F0]">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#6B2523]">
                    Visual Photo Gallery Picker
                  </h3>
                  <p className="text-xs text-[#3A2E2A]/70">
                    Click any food photograph to assign it to <strong>{editingItem.name || 'this dish'}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#3A2E2A]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Photo */}
              <div className="p-4 border-b border-[#6B2523]/10 bg-white">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3A2E2A]/40" />
                  <input
                    type="text"
                    value={imageSearchQuery}
                    onChange={(e) => setImageSearchQuery(e.target.value)}
                    placeholder="Filter photos (e.g. food-1, food-20)..."
                    className="w-full pl-9 pr-4 py-2 bg-[#FAF6F0] rounded-xl border border-[#6B2523]/15 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo Gallery Grid */}
              <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 flex-1">
                {filteredImages.map((img) => {
                  const isSelected = editingItem.image === img.path
                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setEditingItem({ ...editingItem, image: img.path })
                        setIsPhotoPickerOpen(false)
                        showToast(`Selected ${img.id}.webp`)
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all aspect-square ${
                        isSelected
                          ? 'border-[#6B2523] ring-4 ring-[#6B2523]/20 scale-105'
                          : 'border-transparent hover:border-[#6B2523]/40 hover:scale-102'
                      }`}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 inset-x-1.5 text-center text-[10px] font-mono text-white font-semibold truncate bg-black/40 py-0.5 rounded backdrop-blur-xs">
                        {img.id}.webp
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#6B2523] text-[#FFC470] p-1 rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[#6B2523]/15 bg-[#FAF6F0] flex justify-end">
                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#6B2523] text-[#FFC470] text-xs font-bold uppercase tracking-wider"
                >
                  Done
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#6B2523]/20"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#6B2523]/15 flex items-center justify-between bg-[#FAF6F0]">
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
                
                {/* Photo Preview & Change trigger */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF6F0] border border-[#6B2523]/15">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#6B2523]/20">
                    <img
                      src={editingItem.image || '/assets/Tanha Food/food-1.webp'}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#3A2E2A]/70 block">
                      {editingItem.image}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPhotoPickerOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#6B2523] text-[#FFC470] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
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
                    Culinary Description / Tasting Notes
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.desc}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    placeholder="Describe the ingredients, cooking method, and flavor notes..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                  />
                </div>

                {/* Tags (comma separated) */}
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
                    placeholder="e.g. ★ BESTSELLER, Wood-Fired, Gluten-Free"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B2523]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2523]/30"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-end gap-3">
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
