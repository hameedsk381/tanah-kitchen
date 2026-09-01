import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Edit2,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Download,
  Copy,
  RotateCcw,
  Check,
  X,
  Sparkles,
  Utensils,
  LayoutGrid,
  Images,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Flame,
  Wine,
  Save,
  Upload,
  UploadCloud,
  FolderPlus,
  Lock,
  User,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react'
import { useMenu } from '../context/MenuContext'
import { getAuthHeaders } from '../utils/apiAuth'
import SEO from '../components/SEO'
import { LogoOwl } from '../components/illustrations'

// Catalog of 54 pure DSLR food photos
const ALL_FOOD_IMAGES = Array.from({ length: 54 }, (_, i) => ({
  path: `/assets/Tanha Food/food-${i + 1}.webp`,
  id: `food-${i + 1}`,
  number: i + 1,
  name: `Photo #${i + 1}`,
  isCustom: false
}))

const DISHES_PER_PAGE = 12
const PHOTOS_PER_PAGE = 8
const GALLERY_PER_PAGE = 12

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
  const {
    items,
    categories,
    updateItem,
    addItem,
    deleteItem,
    resetToDefault,
    exportJsonFile,
    // Bento
    bentoItems,
    updateBentoSlot,
    resetBento,
    // Gallery
    galleryCategories,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateGalleryItemCategory,
    resetGallery,
    exportGalleryJson,
    syncError
  } = useMenu()

  // Authentication State
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('tanah_admin_token') || sessionStorage.getItem('tanah_admin_token') || ''
  })
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const u = localStorage.getItem('tanah_admin_user') || sessionStorage.getItem('tanah_admin_user')
      return u ? JSON.parse(u) : null
    } catch (e) {
      return null
    }
  })
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Studio Top Tabs: 'bento' | 'menu' | 'gallery'
  const [activeTab, setActiveTab] = useState('bento')

  // Menu Search & Filter
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [dishPage, setDishPage] = useState(1)

  // Bento Editor State
  const [editingBentoIndex, setEditingBentoIndex] = useState(null)
  const [bentoDraft, setBentoDraft] = useState(null)

  // Gallery Filter & State
  const [galleryFilter, setGalleryFilter] = useState('All')
  const [gallerySearch, setGallerySearch] = useState('')
  const [galleryPage, setGalleryPage] = useState(1)
  const [editingGalleryItem, setEditingGalleryItem] = useState(null)
  const [galleryDraft, setGalleryDraft] = useState(null)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [isAddGallery, setIsAddGallery] = useState(false)
  const [deleteGalleryConfirmId, setDeleteGalleryConfirmId] = useState(null)

  // Custom Uploaded Photos
  const [customUploads, setCustomUploads] = useState(() => {
    try {
      const saved = localStorage.getItem('tanah_custom_uploads_v1')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return []
  })

  // Modals & Photo Picker
  const [editingItem, setEditingItem] = useState(null)
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false)
  const [photoPickerTarget, setPhotoPickerTarget] = useState('menu') // 'menu' or 'bento'
  const [selectedPhotoTab, setSelectedPhotoTab] = useState('all') // 'all' | 'uploads' | page number
  const [imageSearchQuery, setImageSearchQuery] = useState('')
  const [photoPage, setPhotoPage] = useState(1)
  const [toastMessage, setToastMessage] = useState('')
  const [storageInfo, setStorageInfo] = useState({ engine: 'local', provider: 'Local Disk' })

  useEffect(() => {
    fetch('/api/storage/status')
      .then(res => res.json())
      .then(data => {
        if (data && data.provider) setStorageInfo(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (syncError) {
      showToast(`❌ ${syncError}`)
    }
  }, [syncError])

  useEffect(() => {
    if (!authToken) return

    fetch('/api/uploads', { headers: getAuthHeaders({ json: false }) })
      .then(res => res.json())
      .then(serverUploads => {
        if (Array.isArray(serverUploads) && serverUploads.length > 0) {
          const formatted = serverUploads.map((u, idx) => ({
            path: u.url,
            id: `server-upload-${idx}-${u.filename}`,
            number: idx + 1,
            name: u.filename || `Photo #${idx + 1}`,
            isCustom: true,
            storage: u.storage || 'gcs'
          }))
          setCustomUploads(formatted)
          try {
            localStorage.setItem('tanah_custom_uploads_v1', JSON.stringify(formatted))
          } catch(e) {}
        }
      })
      .catch(() => {})
  }, [authToken, isPhotoPickerOpen])

  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      const data = await res.json()

      if (res.ok && data.token) {
        setAuthToken(data.token)
        setAdminUser(data.user)
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('tanah_admin_token', data.token)
        storage.setItem('tanah_admin_user', JSON.stringify(data.user))
        showToast(`✓ Welcome back, ${data.user.name || data.user.username}!`)
      } else {
        setLoginError(data.error || 'Invalid admin credentials')
      }
    } catch (err) {
      setLoginError('Authentication failed. Please verify credentials and server connection.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setAuthToken('')
    setAdminUser(null)
    localStorage.removeItem('tanah_admin_token')
    localStorage.removeItem('tanah_admin_user')
    sessionStorage.removeItem('tanah_admin_token')
    sessionStorage.removeItem('tanah_admin_user')
    showToast('👋 Signed out of Admin Studio')
  }

  // Upload handler for custom photos (Node.js Server API + Offline Fallback)
  const handleFileUpload = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Please select a valid image file.')
      return
    }

    if (file.size > 20 * 1024 * 1024) {
      showToast('⚠️ Image must be under 20MB.')
      return
    }

    showToast('⏳ Uploading photo...')

    try {
      // 1. Try uploading to Express server
      const formData = new FormData()
      formData.append('photo', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: getAuthHeaders({ json: false }),
        body: formData
      })

      if (res.status === 401) {
        showToast('⚠️ Session expired. Please sign in again.')
        return
      }

      if (res.ok) {
        const data = await res.json()
        if (data.url) {
          const newUpload = {
            path: data.url,
            id: `server-upload-${Date.now()}`,
            number: customUploads.length + 1,
            name: file.name || data.filename,
            isCustom: true
          }

          const updatedUploads = [newUpload, ...customUploads]
          setCustomUploads(updatedUploads)
          try {
            localStorage.setItem('tanah_custom_uploads_v1', JSON.stringify(updatedUploads))
          } catch (e) {}

          if (photoPickerTarget === 'bento' && bentoDraft) {
            setBentoDraft({ ...bentoDraft, image: data.url })
          } else if (photoPickerTarget === 'gallery' && galleryDraft) {
            setGalleryDraft({ ...galleryDraft, src: data.url, image: data.url })
          } else if (editingItem) {
            setEditingItem({ ...editingItem, image: data.url })
          }

          setIsPhotoPickerOpen(false)
          showToast('✓ Photo uploaded to server and assigned!')
          return
        }
      } else {
        const errData = await res.json()
        showToast(`⚠️ Upload failed: ${errData.error || 'Unknown error'}`)
      }
    } catch (err) {
      console.error('Server upload failed:', err)
      showToast('⚠️ Server upload failed. Please ensure the backend is running.')
    }
  }

  // Combined photo catalog (Custom Uploads + 54 DSLR Photos)
  const allAvailablePhotos = useMemo(() => {
    return [...customUploads, ...ALL_FOOD_IMAGES]
  }, [customUploads])

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

  const totalDishPages = Math.ceil(filteredItems.length / DISHES_PER_PAGE) || 1
  const paginatedDishes = useMemo(() => {
    const start = (dishPage - 1) * DISHES_PER_PAGE
    return filteredItems.slice(start, start + DISHES_PER_PAGE)
  }, [filteredItems, dishPage])

  // Filtered Gallery Items
  const filteredGallery = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCat =
        galleryFilter === 'All' || item.category.toLowerCase() === galleryFilter.toLowerCase()
      const matchesSearch =
        !gallerySearch ||
        item.id.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        item.src.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        (item.caption && item.caption.toLowerCase().includes(gallerySearch.toLowerCase()))
      return matchesCat && matchesSearch
    })
  }, [galleryItems, galleryFilter, gallerySearch])

  const totalGalleryPages = Math.ceil(filteredGallery.length / GALLERY_PER_PAGE) || 1
  const paginatedGallery = useMemo(() => {
    const start = (galleryPage - 1) * GALLERY_PER_PAGE
    return filteredGallery.slice(start, start + GALLERY_PER_PAGE)
  }, [filteredGallery, galleryPage])

  // Filtered images in Photo Picker
  const filteredImages = useMemo(() => {
    let source = allAvailablePhotos
    if (selectedPhotoTab === 'uploads') {
      source = customUploads
    }
    if (!imageSearchQuery) return source
    return source.filter((img) =>
      img.name.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
      img.id.toLowerCase().includes(imageSearchQuery.toLowerCase()) ||
      String(img.number).includes(imageSearchQuery)
    )
  }, [allAvailablePhotos, customUploads, selectedPhotoTab, imageSearchQuery])

  const totalPhotoPages = Math.ceil(filteredImages.length / PHOTOS_PER_PAGE) || 1
  const paginatedPhotos = useMemo(() => {
    const start = (photoPage - 1) * PHOTOS_PER_PAGE
    return filteredImages.slice(start, start + PHOTOS_PER_PAGE)
  }, [filteredImages, photoPage])

  // Menu Save
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

  // Bento Slot Save
  const handleSaveBentoSlot = (e) => {
    e.preventDefault()
    if (editingBentoIndex !== null && bentoDraft) {
      updateBentoSlot(editingBentoIndex, bentoDraft)
      showToast(`✓ Updated Bento Slot ${editingBentoIndex + 1}: ${bentoDraft.title}`)
      setEditingBentoIndex(null)
      setBentoDraft(null)
    }
  }

  // ── IF NOT AUTHENTICATED: RENDER ADMIN LOGIN GATEWAY ──
  if (!authToken) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 font-body">
        <SEO
          title="Admin Login | Tanah Kitchen & Bar"
          description="Authenticate to access Tanah Kitchen & Bar Content & Bento Management Studio."
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#5E332E]/15 shadow-2xl space-y-6 text-left"
        >
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-3 bg-transparent">
            <img
              src="/assets/logo.png"
              alt="Tanah Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain bg-transparent border-none shadow-none"
            />
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#5E332E] block">
                ✦ TANAH RESTAURANT STUDIO ✦
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#5E332E] mt-1">
                Admin Authentication
              </h1>
            </div>
            <p className="text-xs text-[#1E1B18]/70 max-w-xs font-light leading-relaxed">
              Enter your management credentials to access the live Bento Grid and Menu Studio.
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
            >
              ⚠️ {loginError}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1B18]/40" />
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E332E]/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1B18]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E332E]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E1B18]/40 hover:text-[#5E332E]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#5E332E] focus:ring-[#5E332E]"
                />
                <span className="text-xs text-[#1E1B18]/70 font-medium">Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-[#5E332E] hover:bg-[#1E1B18] text-[#E5E2DC] text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'Verifying Credentials...' : 'Unlock Admin Studio'}</span>
            </button>
          </form>
        </motion.div>
      </main>
    )
  }

  // ── AUTHENTICATED: RENDER FULL ADMIN STUDIO ──
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] pt-28 pb-20 font-body">
      <SEO
        title="Admin Content & Bento Studio | Tanah Kitchen"
        description="Live customizer for Home Page Bento Grid, Menu items, and Gallery category mapping."
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#5E332E] text-[#E5E2DC] px-5 py-3 rounded-2xl shadow-2xl border border-[#E5E2DC]/30 text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#5E332E]/15 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC]">
                ✦ STUDIO CONTROL ✦
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MongoDB Live
              </span>
              <span className="text-xs font-semibold text-[#5E332E] bg-[#5E332E]/10 px-2.5 py-0.5 rounded-full">
                👤 {adminUser?.username || 'admin'} ({adminUser?.role || 'Super Admin'})
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#5E332E]">
              Visual Content &amp; Bento Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#1E1B18]/80 max-w-xl font-light">
              Upload custom photos, customize Home Page Bento Grid tiles, reassign gallery photo categories, and manage seasonal menu dishes.
            </p>
          </div>

          {/* Studio Navigation Tabs & Sign Out */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#5E332E]/15">
              <button
                onClick={() => setActiveTab('bento')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${ activeTab === 'bento' ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'text-[#1E1B18]/70 hover:text-[#5E332E]' }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${ activeTab === 'menu' ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'text-[#1E1B18]/70 hover:text-[#5E332E]' }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Full Menu</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${ activeTab === 'gallery' ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'text-[#1E1B18]/70 hover:text-[#5E332E]' }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('cms')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${ activeTab === 'cms' ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'text-[#1E1B18]/70 hover:text-[#5E332E]' }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>CMS Data</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB 1: HOME BENTO GRID MANAGER
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'bento' && (
          <div className="space-y-6">
            
            {/* Bento Control Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#5E332E]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-[#5E332E] flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#5E332E]" />
                  <span>Home Page Bento Grid (6 Dynamic Slots)</span>
                </h2>
                <p className="text-xs text-[#1E1B18]/70 mt-1">
                  Click any slot below to change the dish, upload custom photos, edit title, pricing, tag, or beverage pairing.
                </p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Reset Bento Grid back to factory layout in MongoDB?')) {
                    resetBento()
                    showToast('↺ Bento Grid reset to default')
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Bento Layout</span>
              </button>
            </div>

            {/* Live Bento Layout Preview / Click-to-Edit */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
              
              {/* Slot 1: Hero Spotlight */}
              {bentoItems[0] && (
                <div
                  onClick={() => {
                    setEditingBentoIndex(0)
                    setBentoDraft({ ...bentoItems[0] })
                  }}
                  className="md:col-span-7 relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer min-h-[320px] sm:min-h-[380px] border-2 border-transparent hover:border-[#5E332E] flex flex-col justify-between p-6 bg-black"
                >
                  <img
                    src={bentoItems[0].image}
                    alt={bentoItems[0].title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md">
                      SLOT 1: {bentoItems[0].tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
                        {bentoItems[0].isVeg ? <VegMark /> : <NonVegMark />}
                      </div>
                      <span className="px-3 py-1 bg-white/20 group-hover:bg-[#5E332E] group-hover:text-[#E5E2DC] text-white backdrop-blur-md rounded-xl text-xs font-bold uppercase transition-colors">
                        Click to Edit
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 text-white space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#E5E2DC] font-semibold block">
                      {bentoItems[0].category}
                    </span>
                    <div className="flex justify-between items-end gap-2">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white">
                          {bentoItems[0].title}
                        </h3>
                        <p className="text-xs text-white/80 font-light max-w-md line-clamp-2 mt-1">
                          {bentoItems[0].desc}
                        </p>
                      </div>
                      <span className="font-display text-2xl font-extrabold text-[#E5E2DC] flex-shrink-0">
                        ₹{bentoItems[0].price}
                      </span>
                    </div>
                    {bentoItems[0].pairing && (
                      <span className="text-[10px] text-[#E5E2DC] block pt-1 font-semibold">
                        {bentoItems[0].pairing}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Slot 2: Wide Top Right */}
              {bentoItems[1] && (
                <div
                  onClick={() => {
                    setEditingBentoIndex(1)
                    setBentoDraft({ ...bentoItems[1] })
                  }}
                  className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer min-h-[320px] sm:min-h-[380px] border-2 border-transparent hover:border-[#5E332E] flex flex-col justify-between p-6 bg-black"
                >
                  <img
                    src={bentoItems[1].image}
                    alt={bentoItems[1].title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md">
                      SLOT 2: {bentoItems[1].tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
                        {bentoItems[1].isVeg ? <VegMark /> : <NonVegMark />}
                      </div>
                      <span className="px-3 py-1 bg-white/20 group-hover:bg-[#5E332E] group-hover:text-[#E5E2DC] text-white backdrop-blur-md rounded-xl text-xs font-bold uppercase transition-colors">
                        Click to Edit
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 text-white space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#E5E2DC] font-semibold block">
                      {bentoItems[1].category}
                    </span>
                    <div className="flex justify-between items-end gap-2">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">
                          {bentoItems[1].title}
                        </h3>
                        <p className="text-xs text-white/80 font-light max-w-xs line-clamp-2 mt-0.5">
                          {bentoItems[1].desc}
                        </p>
                      </div>
                      <span className="font-display text-xl font-extrabold text-[#E5E2DC] flex-shrink-0">
                        ₹{bentoItems[1].price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slots 3, 4, 5, 6: Quad Cards */}
              {[2, 3, 4, 5].map((slotIdx) => {
                const bItem = bentoItems[slotIdx]
                if (!bItem) return null
                return (
                  <div
                    key={slotIdx}
                    onClick={() => {
                      setEditingBentoIndex(slotIdx)
                      setBentoDraft({ ...bItem })
                    }}
                    className="md:col-span-6 lg:col-span-3 relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer min-h-[220px] border-2 border-transparent hover:border-[#5E332E] flex flex-col justify-between p-5 bg-black"
                  >
                    <img
                      src={bItem.image}
                      alt={bItem.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#5E332E] text-[#E5E2DC] border border-[#E5E2DC]/30 shadow-md">
                        SLOT {slotIdx + 1}: {bItem.tag}
                      </span>
                      <div className="bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
                        {bItem.isVeg ? <VegMark /> : <NonVegMark />}
                      </div>
                    </div>

                    <div className="relative z-10 text-white space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#E5E2DC] font-semibold block">
                        {bItem.category}
                      </span>
                      <div className="flex justify-between items-baseline gap-1">
                        <h4 className="font-display text-base font-bold text-white leading-tight">
                          {bItem.title}
                        </h4>
                        <span className="font-display text-lg font-extrabold text-[#E5E2DC]">
                          ₹{bItem.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2: FULL SEASONAL MENU MANAGER
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                {['All', 'Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat)
                      setDishPage(1)
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${ selectedCategory.toLowerCase() === cat.toLowerCase() ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'bg-white text-[#1E1B18]/75 hover:bg-white/80 border border-[#5E332E]/10' }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Action Buttons & Search */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1B18]/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setDishPage(1)
                    }}
                    placeholder="Search dishes..."
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#5E332E]/15 text-xs focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingItem({
                      name: '',
                      category: 'Lunch',
                      desc: '',
                      price: 499,
                      image: '/assets/Tanha Food/food-1.webp',
                      tags: ['Chef Special'],
                      profile: { earthy: 50, smoky: 40, sweet: 20, spicy: 10 }
                    })
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5E332E] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Dish</span>
                </button>

                <button
                  onClick={exportJsonFile}
                  className="p-2 bg-white rounded-xl border border-[#5E332E]/20 hover:bg-[#FAF8F5] text-[#5E332E] shadow-xs"
                  title="Export menu.json"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dishes Grid */}
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
                    className="bg-white rounded-3xl overflow-hidden border border-[#5E332E]/15 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
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

                        <button
                          onClick={() => {
                            setEditingItem(item)
                            setPhotoPickerTarget('menu')
                            setIsPhotoPickerOpen(true)
                            setPhotoPage(1)
                          }}
                          className="absolute inset-0 m-auto w-fit h-fit px-3.5 py-1.5 bg-black/80 hover:bg-[#5E332E] text-[#E5E2DC] backdrop-blur-md rounded-xl text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-lg"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </button>

                        <div className="absolute top-3 left-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                            {item.category}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
                          {isVeg ? <VegMark /> : <NonVegMark />}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-display font-bold text-lg text-[#5E332E] leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-display text-lg font-extrabold text-[#5E332E] flex-shrink-0">
                            ₹{item.price}
                          </span>
                        </div>

                        <p className="text-xs text-[#1E1B18]/80 font-light leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="p-4 border-t border-[#5E332E]/10 bg-[#FAF8F5]/50 flex items-center justify-between">
                      <span className="text-[10px] text-[#1E1B18]/50 font-mono">ID: {item.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#5E332E]/20 hover:bg-[#5E332E] hover:text-[#E5E2DC] text-[#5E332E] text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${item.name}" from MongoDB?`)) {
                              deleteItem(item.id)
                              showToast(`🗑️ Deleted "${item.name}"`)
                            }
                          }}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalDishPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setDishPage((p) => Math.max(1, p - 1))}
                  disabled={dishPage === 1}
                  className="p-2 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 hover:bg-[#FAF8F5] text-[#5E332E]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-[#5E332E] px-3">
                  Page {dishPage} of {totalDishPages}
                </span>
                <button
                  onClick={() => setDishPage((p) => Math.min(totalDishPages, p + 1))}
                  disabled={dishPage === totalDishPages}
                  className="p-2 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 hover:bg-[#FAF8F5] text-[#5E332E]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3: GALLERY PHOTO CATEGORY MANAGER
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Gallery Top Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#5E332E]/15 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-[#5E332E] flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#5E332E]" />
                  <span>Gallery Photo Studio & Category Manager (MongoDB)</span>
                </h2>
                <p className="text-xs text-[#1E1B18]/70 mt-1">
                  Add new photos, update titles and categories, or remove photos. Changes sync live on the website.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    setGalleryDraft({
                      id: `gallery-${Date.now()}`,
                      title: 'New Gallery Highlight',
                      alt: 'Tanah Kitchen & Bar',
                      category: 'Ambience',
                      src: '/assets/Tanha Ambiance/Ambiance-1.webp',
                      caption: ''
                    })
                    setIsAddGallery(true)
                    setIsGalleryModalOpen(true)
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>

                <button
                  onClick={exportGalleryJson}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#5E332E]/20 hover:bg-[#FAF8F5] text-[#5E332E] text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset gallery categories back to factory defaults in MongoDB?')) {
                      resetGallery()
                      showToast('↺ Gallery categories reset to default')
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Category Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                {['All', 'Ambience', 'Rooftop', 'Events', 'Food'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setGalleryFilter(cat)
                      setGalleryPage(1)
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${ galleryFilter.toLowerCase() === cat.toLowerCase() ? 'bg-[#5E332E] text-[#E5E2DC] shadow-md' : 'bg-white text-[#1E1B18]/75 hover:bg-white/80 border border-[#5E332E]/10' }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1B18]/40" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => {
                    setGallerySearch(e.target.value)
                    setGalleryPage(1)
                  }}
                  placeholder="Search photo ID or path..."
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#5E332E]/15 text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Gallery Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedGallery.map((gItem) => (
                <div
                  key={gItem.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#5E332E]/15 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-44 overflow-hidden relative bg-black/5">
                    <img
                      src={gItem.src || gItem.image}
                      alt={gItem.alt || gItem.title || gItem.id}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white rounded text-[10px] font-mono">
                      {gItem.id}
                    </div>

                    {/* Quick Edit / Delete Overlay Buttons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setGalleryDraft({
                            id: gItem.id,
                            title: gItem.title || gItem.alt || 'Tanah Moment',
                            alt: gItem.alt || gItem.title || 'Tanah Moment',
                            category: gItem.category || 'Ambience',
                            src: gItem.src || gItem.image,
                            caption: gItem.caption || ''
                          })
                          setIsAddGallery(false)
                          setIsGalleryModalOpen(true)
                        }}
                        title="Edit Photo"
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-[#5E332E] shadow-md transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete photo "${gItem.id}" from gallery?`)) {
                            deleteGalleryItem(gItem.id)
                            showToast(`🗑️ Deleted ${gItem.id}`)
                          }
                        }}
                        title="Delete Photo"
                        className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2.5 bg-white border-t border-[#5E332E]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E332E] truncate">
                        {gItem.title || gItem.alt || gItem.id}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5E332E]/10 text-[#5E332E] flex-shrink-0">
                        {gItem.category}
                      </span>
                    </div>

                    {/* Quick Category Switcher Select */}
                    <select
                      value={gItem.category}
                      onChange={(e) => {
                        updateGalleryItemCategory(gItem.id, e.target.value)
                        showToast(`✓ Changed ${gItem.id} to "${e.target.value}"`)
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#5E332E]/20 text-xs font-bold text-[#5E332E] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#5E332E]/25 cursor-pointer"
                    >
                      {['Ambience', 'Rooftop', 'Events', 'Food'].map((catOpt) => (
                        <option key={catOpt} value={catOpt}>
                          Move to → {catOpt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Pagination */}
            {totalGalleryPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setGalleryPage((p) => Math.max(1, p - 1))}
                  disabled={galleryPage === 1}
                  className="p-2 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 hover:bg-[#FAF8F5] text-[#5E332E]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-[#5E332E] px-3">
                  Page {galleryPage} of {totalGalleryPages}
                </span>
                <button
                  onClick={() => setGalleryPage((p) => Math.min(totalGalleryPages, p + 1))}
                  disabled={galleryPage === totalGalleryPages}
                  className="p-2 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 hover:bg-[#FAF8F5] text-[#5E332E]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── BENTO SLOT EDIT MODAL ── */}
      <AnimatePresence>
        {editingBentoIndex !== null && bentoDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#5E332E]/20"
            >
              <div className="p-5 border-b border-[#5E332E]/15 flex items-center justify-between bg-[#FAF8F5]">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#5E332E]">
                    Customize Bento Slot {editingBentoIndex + 1}
                  </h3>
                  <p className="text-xs text-[#1E1B18]/70">
                    Upload a custom photo or choose a dish from the catalog.
                  </p>
                </div>
                <button
                  onClick={() => setEditingBentoIndex(null)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#1E1B18]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBentoSlot} className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
                
                {/* Autofill from Menu */}
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#5E332E]/15">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    ⚡ Quick Autofill from Seasonal Menu
                  </label>
                  <select
                    onChange={(e) => {
                      const selectedDish = items.find((i) => i.id === e.target.value)
                      if (selectedDish) {
                        const isVeg = !selectedDish.name.toLowerCase().includes('mutton') &&
                          !selectedDish.name.toLowerCase().includes('chicken') &&
                          !selectedDish.name.toLowerCase().includes('kodi') &&
                          !selectedDish.name.toLowerCase().includes('prawn')

                        setBentoDraft({
                          ...bentoDraft,
                          title: selectedDish.name,
                          category: selectedDish.category || 'Specialty',
                          price: selectedDish.price || 499,
                          image: selectedDish.image || bentoDraft.image,
                          desc: selectedDish.desc || '',
                          isVeg: isVeg
                        })
                        showToast(`✓ Autofilled from "${selectedDish.name}"`)
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#5E332E]/20 text-xs font-semibold bg-white"
                  >
                    <option value="">-- Choose a dish to autofill --</option>
                    {items.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} (₹{i.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Photo Preview & Dual Action Buttons (Upload & Browse) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#5E332E]/15">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-[#5E332E]/20 bg-black">
                    <img
                      src={bentoDraft.image}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-mono text-[#1E1B18]/70 block font-semibold truncate max-w-xs">
                      {bentoDraft.image.startsWith('data:') ? 'Custom Uploaded Image (Base64)' : bentoDraft.image}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-[#5E332E] hover:bg-[#5E332E] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0])
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPickerTarget('bento')
                          setIsPhotoPickerOpen(true)
                          setPhotoPage(1)
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-[#5E332E]/25 text-[#5E332E] hover:bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Browse Catalog</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dish Title */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Tile Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={bentoDraft.title}
                    onChange={(e) => setBentoDraft({ ...bentoDraft, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E332E]/30"
                  />
                </div>

                {/* Subtitle/Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Category / Subtitle
                    </label>
                    <input
                      type="text"
                      value={bentoDraft.category}
                      onChange={(e) => setBentoDraft({ ...bentoDraft, category: e.target.value })}
                      placeholder="e.g. Wood-Fired Hearth"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={bentoDraft.price}
                      onChange={(e) => setBentoDraft({ ...bentoDraft, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tag & Veg/Non-Veg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Tag Badge
                    </label>
                    <input
                      type="text"
                      value={bentoDraft.tag}
                      onChange={(e) => setBentoDraft({ ...bentoDraft, tag: e.target.value })}
                      placeholder="e.g. ★ BESTSELLER"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Dietary Type
                    </label>
                    <select
                      value={bentoDraft.isVeg ? 'veg' : 'non-veg'}
                      onChange={(e) => setBentoDraft({ ...bentoDraft, isVeg: e.target.value === 'veg' })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm bg-white"
                    >
                      <option value="veg">🟢 Pure Veg</option>
                      <option value="non-veg">🔴 Non-Veg</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={bentoDraft.desc}
                    onChange={(e) => setBentoDraft({ ...bentoDraft, desc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                  />
                </div>

                {/* Drink Pairing */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Drink Pairing (Optional)
                  </label>
                  <input
                    type="text"
                    value={bentoDraft.pairing || ''}
                    onChange={(e) => setBentoDraft({ ...bentoDraft, pairing: e.target.value })}
                    placeholder="e.g. 🍸 Pairs with: Rooftop Smoked Old Fashioned"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBentoIndex(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E1B18]/70 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Save Bento Tile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── GALLERY PHOTO EDIT / ADD MODAL ── */}
      <AnimatePresence>
        {isGalleryModalOpen && galleryDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#5E332E]/20"
            >
              <div className="p-5 border-b border-[#5E332E]/15 flex items-center justify-between bg-[#FAF8F5]">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#5E332E]">
                    {isAddGallery ? 'Add New Gallery Photo' : 'Edit Gallery Photo'}
                  </h3>
                  <p className="text-xs text-[#1E1B18]/70">
                    Set title, category, and choose a high-resolution photo.
                  </p>
                </div>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#1E1B18]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isAddGallery) {
                    addGalleryItem({
                      id: galleryDraft.id,
                      title: galleryDraft.title,
                      alt: galleryDraft.alt || galleryDraft.title,
                      category: galleryDraft.category,
                      src: galleryDraft.src,
                      image: galleryDraft.src,
                      caption: galleryDraft.caption
                    })
                    showToast(`✓ Added "${galleryDraft.title}" to Gallery!`)
                  } else {
                    updateGalleryItem(galleryDraft.id, {
                      title: galleryDraft.title,
                      alt: galleryDraft.alt || galleryDraft.title,
                      category: galleryDraft.category,
                      src: galleryDraft.src,
                      image: galleryDraft.src,
                      caption: galleryDraft.caption
                    })
                    showToast(`✓ Updated gallery photo!`)
                  }
                  setIsGalleryModalOpen(false)
                }}
                className="p-6 space-y-4 overflow-y-auto flex-1 text-left"
              >
                {/* Photo Preview & Choose/Upload */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#5E332E]/15">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-[#5E332E]/20 bg-black">
                    <img
                      src={galleryDraft.src}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-xs font-bold text-[#5E332E] block">
                      Gallery Photo Source
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#5E332E] hover:bg-[#1E1B18] text-[#E5E2DC] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setPhotoPickerTarget('gallery')
                              handleFileUpload(e.target.files[0])
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPickerTarget('gallery')
                          setIsPhotoPickerOpen(true)
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#5E332E]/20 hover:bg-white/80 text-[#5E332E] text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>Browse Catalog</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Photo Title / Alt
                    </label>
                    <input
                      type="text"
                      required
                      value={galleryDraft.title}
                      onChange={(e) => setGalleryDraft({ ...galleryDraft, title: e.target.value, alt: e.target.value })}
                      placeholder="e.g. Sunset on the Rooftop"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Category
                    </label>
                    <select
                      value={galleryDraft.category}
                      onChange={(e) => setGalleryDraft({ ...galleryDraft, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm bg-white"
                    >
                      {['Ambience', 'Rooftop', 'Events', 'Food'].map((catOpt) => (
                        <option key={catOpt} value={catOpt}>
                          {catOpt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Caption / Story (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={galleryDraft.caption || ''}
                    onChange={(e) => setGalleryDraft({ ...galleryDraft, caption: e.target.value })}
                    placeholder="Short description of this moment..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#5E332E]/10">
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#5E332E] hover:bg-[#1E1B18] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    {isAddGallery ? 'Add to Gallery' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PHOTO PICKER MODAL (With Upload + Catalog Tabs) ── */}
      <AnimatePresence>
        {isPhotoPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-4xl max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#5E332E]/20"
            >
              {/* Header with Direct Upload Action */}
              <div className="p-5 sm:p-6 border-b border-[#5E332E]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#5E332E]">
                      Select or Upload Food Photograph
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ storageInfo.connected ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300' }`}>
                      {storageInfo.connected ? '☁️ GCS Connected' : '📁 Local Storage'}
                    </span>
                  </div>
                  <p className="text-xs text-[#1E1B18]/70 font-light mt-0.5">
                    Click any photo to assign it, or upload your own custom high-res image.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#5E332E] hover:bg-[#1E1B18] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0])
                        }
                      }}
                    />
                  </label>

                  <button
                    onClick={() => setIsPhotoPickerOpen(false)}
                    className="p-2 rounded-xl hover:bg-black/5 text-[#1E1B18]/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Photo Filter Tabs & Search */}
              <div className="p-4 border-b border-[#5E332E]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  {customUploads.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedPhotoTab('uploads')
                        setImageSearchQuery('')
                        setPhotoPage(1)
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${ selectedPhotoTab === 'uploads' ? 'bg-[#5E332E] text-[#E5E2DC] shadow-xs' : 'bg-[#5E332E]/10 text-[#5E332E] hover:bg-[#5E332E]/20' }`}
                    >
                      <FolderPlus className="w-3 h-3" />
                      <span>Uploaded ({customUploads.length})</span>
                    </button>
                  )}

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
                        setSelectedPhotoTab('all')
                        setImageSearchQuery('')
                        setPhotoPage(tab.page)
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${ photoPage === tab.page && selectedPhotoTab === 'all' && !imageSearchQuery ? 'bg-[#5E332E] text-[#E5E2DC] shadow-xs' : 'bg-[#FAF8F5] text-[#1E1B18]/75 hover:bg-[#5E332E]/10' }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-48 flex-shrink-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1E1B18]/40" />
                  <input
                    type="text"
                    value={imageSearchQuery}
                    onChange={(e) => {
                      setImageSearchQuery(e.target.value)
                      setPhotoPage(1)
                    }}
                    placeholder="Search photo #..."
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] rounded-xl border border-[#5E332E]/15 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Pure Visual Photo Grid */}
              <div className="p-6 overflow-y-auto max-h-[58vh] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 bg-[#FAF8F5]/40">
                
                {/* Upload Card as 1st Item */}
                <label className="group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-dashed border-[#5E332E]/30 hover:border-[#5E332E] transition-all h-40 sm:h-48 bg-white/70 hover:bg-white flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#5E332E]/10 group-hover:bg-[#5E332E] text-[#5E332E] group-hover:text-[#E5E2DC] flex items-center justify-center mb-2 transition-all">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#5E332E] block leading-tight">
                    Upload Custom Photo
                  </span>
                  <span className="text-[9px] text-[#1E1B18]/60 font-medium mt-1">
                    PNG, JPG, WEBP
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>

                {paginatedPhotos.map((img) => {
                  const currentImg =
                    photoPickerTarget === 'bento'
                      ? bentoDraft?.image
                      : photoPickerTarget === 'gallery'
                      ? galleryDraft?.src
                      : editingItem?.image
                  const isSelected = currentImg === img.path

                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        if (photoPickerTarget === 'bento' && bentoDraft) {
                          setBentoDraft({ ...bentoDraft, image: img.path })
                        } else if (photoPickerTarget === 'gallery' && galleryDraft) {
                          setGalleryDraft({ ...galleryDraft, src: img.path, image: img.path })
                        } else if (editingItem) {
                          setEditingItem({ ...editingItem, image: img.path })
                        }
                        setIsPhotoPickerOpen(false)
                        showToast(`✓ Assigned ${img.name || img.id}`)
                      }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-xs h-40 sm:h-48 bg-white ${ isSelected ? 'border-[#5E332E] ring-4 ring-[#5E332E]/30 scale-[1.02] shadow-lg' : 'border-transparent hover:border-[#5E332E]/50 hover:shadow-md' }`}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#5E332E] text-[#E5E2DC] p-1.5 rounded-full shadow-xl">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {img.isCustom && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-bold text-[#E5E2DC]">
                          Custom Upload
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Picker Footer */}
              <div className="p-4 border-t border-[#5E332E]/15 bg-[#FAF8F5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPhotoPage((p) => Math.max(1, p - 1))}
                    disabled={photoPage === 1}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 text-xs font-bold text-[#5E332E]"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-[#1E1B18]/70 font-semibold px-2">
                    Page {photoPage} of {totalPhotoPages}
                  </span>
                  <button
                    onClick={() => setPhotoPage((p) => Math.min(totalPhotoPages, p + 1))}
                    disabled={photoPage === totalPhotoPages}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#5E332E]/20 disabled:opacity-30 text-xs font-bold text-[#5E332E]"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() => setIsPhotoPickerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#5E332E] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider shadow-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DISH EDIT MODAL ── */}
      <AnimatePresence>
        {editingItem && !isPhotoPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#5E332E]/20"
            >
              <div className="p-5 sm:p-6 border-b border-[#5E332E]/15 flex items-center justify-between bg-[#FAF8F5]">
                <h3 className="font-display font-bold text-xl text-[#5E332E]">
                  {editingItem.id ? 'Edit Dish Details' : 'Create New Menu Dish'}
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2 rounded-xl hover:bg-black/5 text-[#1E1B18]/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
                
                {/* Photo Preview & Dual Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#5E332E]/15">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-[#5E332E]/20 bg-black/5">
                    <img
                      src={editingItem.image || '/assets/Tanha Food/food-1.webp'}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-mono text-[#1E1B18]/70 block font-semibold truncate max-w-xs">
                      {editingItem.image?.startsWith('data:') ? 'Custom Uploaded Image (Base64)' : editingItem.image}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-[#5E332E] hover:bg-[#5E332E] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0])
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPickerTarget('menu')
                          setIsPhotoPickerOpen(true)
                          setPhotoPage(1)
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-[#5E332E]/25 text-[#5E332E] hover:bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Browse Catalog</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Name & Special Tag */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Dish Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      placeholder="e.g. Claypot Mutton Biryani"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E332E]/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Special Badge
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, special: !editingItem.special })}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${ editingItem.special ? 'bg-[#5E332E] text-[#E5E2DC] border-[#5E332E]' : 'bg-white text-[#1E1B18]/70 border-[#5E332E]/20' }`}
                    >
                      {editingItem.special ? '✦ Special' : 'Standard'}
                    </button>
                  </div>
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Category
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm bg-white"
                    >
                      {['Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'Beverages', 'Desserts'].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm"
                    />
                  </div>
                </div>

                {/* Dietary Type & Spice Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Dietary Type
                    </label>
                    <select
                      value={editingItem.nonVeg ? 'non-veg' : 'veg'}
                      onChange={(e) => setEditingItem({ ...editingItem, nonVeg: e.target.value === 'non-veg' })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm bg-white"
                    >
                      <option value="veg">🟢 Pure Vegetarian</option>
                      <option value="non-veg">🔴 Non-Vegetarian</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                      Spice Level
                    </label>
                    <select
                      value={
                        editingItem.profile?.spicy >= 70
                          ? '2'
                          : editingItem.profile?.spicy >= 30
                          ? '1'
                          : '0'
                      }
                      onChange={(e) => {
                        const level = Number(e.target.value)
                        const spicyVal = level === 2 ? 85 : level === 1 ? 45 : 10
                        setEditingItem({
                          ...editingItem,
                          profile: {
                            ...(editingItem.profile || { earthy: 50, smoky: 40, sweet: 20 }),
                            spicy: spicyVal
                          }
                        })
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm bg-white"
                    >
                      <option value="0">Mild / Non-Spicy</option>
                      <option value="1">Medium 🌶️</option>
                      <option value="2">Hot &amp; Fiery 🌶️🌶️</option>
                    </select>
                  </div>
                </div>

                {/* Beverage / Liquid Pairing */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Drink Pairing Recommendation
                  </label>
                  <input
                    type="text"
                    value={editingItem.pairing || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, pairing: e.target.value })}
                    placeholder="e.g. 🍸 Pairs with: Rooftop Smoked Old Fashioned"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm"
                  />
                </div>

                {/* Culinary Description */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
                    Culinary Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.desc}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    placeholder="Describe ingredients and cooking craft..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5E332E] block mb-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E332E]/20 text-sm"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E1B18]/70 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Save Dish Details
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CMS DATA TAB */}
      {activeTab === 'cms' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-32">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#5E332E]/10 shadow-sm relative overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#5E332E] mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Advanced CMS Editor
            </h2>
            <div className="p-6 bg-white border border-[#5E332E]/20 rounded-2xl text-center">
              <h3 className="text-[#1E1B18] font-bold mb-2">Editor Under Construction</h3>
              <p className="text-sm text-[#1E1B18]/70">
                The Bar Menu, corporate text, and booking configurations are currently managed via the backend /api/content endpoints. 
                A full graphical editor is planned for the next release.
              </p>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
