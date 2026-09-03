import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { getAuthHeaders } from '../utils/apiAuth'

const MenuContext = createContext(null)

/** Legacy keys — removed on mount so stale client caches cannot override the server. */
const LEGACY_STORAGE_KEYS = [
  'tanah_kitchen_custom_menu_v1',
  'tanah_kitchen_custom_menu_v2',
  'tanah_kitchen_menu_v1',
  'tanah_kitchen_menu_v2',
  'tanah_kitchen_menu_master_v3',
  'tanah_kitchen_menu_master_v4',
  'tanah_kitchen_custom_bento_v2',
  'tanah_kitchen_custom_gallery_v2'
]

const DEFAULT_BENTO_ITEMS = [
  {
    id: 'bento-1',
    slot: 1,
    title: 'Claypot Mutton Biryani',
    category: 'Wood-Fired Hearth',
    price: 549,
    tag: '★ BESTSELLER',
    isVeg: false,
    image: '/assets/Tanha Food/food-1.webp',
    desc: 'Fragrant aged Basmati & farm-raised mutton slow-simmered in porous earthen clay with caramelized saffron embers.',
    pairing: '🍸 Pairs with: Rooftop Smoked Old Fashioned'
  },
  {
    id: 'bento-2',
    slot: 2,
    title: 'Wild Mushroom Risotto',
    category: 'Continental Gastronomy',
    price: 549,
    tag: '★ SIGNATURE',
    isVeg: true,
    image: '/assets/Tanha Food/food-11.webp',
    desc: 'Hand-foraged forest mushrooms, Italian arborio rice & white truffle oil.',
    pairing: '🍷 Pairs with: Sula Dindori Viognier'
  },
  {
    id: 'bento-3',
    slot: 3,
    title: 'Kodi Crisp',
    category: 'Coastal Spice Bar',
    price: 399,
    tag: '✦ CHEF SPECIAL',
    isVeg: false,
    image: '/assets/Tanha Food/food-14.webp',
    desc: 'Crispy chicken strips tossed in regional roasted podi & curry leaves.',
    pairing: '🍹 Pairs with: Forest Herbal Mule'
  },
  {
    id: 'bento-4',
    slot: 4,
    title: 'Dahi Kebabs',
    category: 'Artisanal Starters',
    price: 449,
    tag: '★ VEG SPECIAL',
    isVeg: true,
    image: '/assets/Tanha Food/food-29.webp',
    desc: 'Pan-seared spiced hung curd patties with green chilies & mint dip.',
    pairing: '🍸 Pairs with: Basalt Stone Margarita'
  },
  {
    id: 'bento-5',
    slot: 5,
    title: 'Mango Tres Leches',
    category: 'Alphonso Mango',
    price: 499,
    tag: '★ DESSERT',
    isVeg: true,
    image: '/assets/Tanha Food/food-44.webp',
    desc: 'Alphonso mango compote with airy sponge steeped in three rich milks.',
    pairing: '☕ Pairs with: Araku Valley Cold Brew'
  },
  {
    id: 'bento-6',
    slot: 6,
    title: 'Desi Tiramisu',
    category: 'Araku Kaapi Infusion',
    price: 549,
    tag: '★ DESSERT',
    isVeg: true,
    image: '/assets/Tanha Food/food-45.webp',
    desc: 'Single-origin Araku Valley filter coffee soaked sponge with saffron mascarpone.',
    pairing: '☕ Pairs with: Single-Origin Espresso'
  }
]

function sanitizeMenuItems(items) {
  if (!Array.isArray(items)) return []
  const seenIds = new Set()
  const seenNames = new Set()
  const clean = []

  for (const item of items) {
    if (!item || !item.name) continue
    const nameKey = item.name.trim().toLowerCase()
    const idKey = item.id || `dish-${clean.length + 1}`

    if (seenNames.has(nameKey) || seenIds.has(idKey)) continue

    seenNames.add(nameKey)
    seenIds.add(idKey)
    clean.push(item)
  }

  return clean
}

function clearLegacyStorage() {
  try {
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
  } catch {
    // ignore
  }
}

export function MenuProvider({ children }) {
  const [isServerConnected, setIsServerConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Bundled JSON is only the initial placeholder until the first server fetch completes.
  const [menuData, setMenuData] = useState({ categories: [], items: [] })
  const [bentoItems, setBentoItems] = useState([])
  const [galleryData, setGalleryData] = useState({ categories: [], items: [] })

  const refreshFromServer = useCallback(async () => {
    setIsLoading(true)
    let serverReachable = false

    try {
      const [menuRes, bentoRes, galleryRes] = await Promise.allSettled([
        fetch('/api/menu'),
        fetch('/api/bento'),
        fetch('/api/gallery')
      ])

      if (menuRes.status === 'fulfilled' && menuRes.value.ok) {
        const serverMenu = await menuRes.value.json()
        setMenuData({
          categories: serverMenu.categories || [],
          items: sanitizeMenuItems(serverMenu.items),
          config: serverMenu.config || {}
        })
        serverReachable = true
      }

      if (bentoRes.status === 'fulfilled' && bentoRes.value.ok) {
        const serverBento = await bentoRes.value.json()
        if (Array.isArray(serverBento)) {
          setBentoItems(serverBento)
          serverReachable = true
        }
      }

      if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
        const serverGallery = await galleryRes.value.json()
        setGalleryData({
          categories: serverGallery.categories || [],
          items: Array.isArray(serverGallery.items) ? serverGallery.items : []
        })
        serverReachable = true
      }

      setIsServerConnected(serverReachable)
    } catch (err) {
      console.warn('Server fetch warning:', err)
      setIsServerConnected(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    clearLegacyStorage()
    refreshFromServer()
  }, [refreshFromServer])

  const [syncError, setSyncError] = useState(null)

  const handleSyncError = (err) => {
    console.error('Server sync failed:', err)
    setSyncError(err.message || 'Server sync failed. Please check your connection and try again.')
    setIsServerConnected(false)
    refreshFromServer() // Revert optimistic update
  }

  // Menu Methods with Server Sync
  const updateItem = useCallback((id, updatedFields) => {
    setMenuData((prev) => {
      const updated = {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      }
      fetch(`/api/menu/item/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update dish')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const addItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || `dish-${Date.now()}`
    }
    setMenuData((prev) => {
      const updated = {
        ...prev,
        items: [itemWithId, ...prev.items]
      }
      fetch('/api/menu/item', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemWithId)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add dish')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const deleteItem = useCallback((id) => {
    setMenuData((prev) => {
      const updated = {
        ...prev,
        items: prev.items.filter((item) => item.id !== id)
      }
      fetch(`/api/menu/item/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAuthHeaders({ json: false })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete dish')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const exportJsonFile = useCallback(() => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(menuData, null, 2)
    )}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', 'menu.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }, [menuData])

  // Bento Methods with Server Sync
  const updateBentoSlot = useCallback((slotIndex, updatedFields) => {
    setBentoItems((prev) => {
      const updated = prev.map((item, idx) =>
        idx === slotIndex ? { ...item, ...updatedFields } : item
      )
      fetch(`/api/bento/slot/${slotIndex}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update Bento slot')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const resetBento = useCallback(async () => {
    try {
      const res = await fetch('/api/bento/reset', { method: 'POST', headers: getAuthHeaders({ json: false }) })
      if (!res.ok) throw new Error('Failed to reset Bento grid')
      setSyncError(null)
      await refreshFromServer()
    } catch (e) {
      handleSyncError(e)
    }
  }, [refreshFromServer])

  // Gallery Methods with Server Sync
  const addGalleryItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || `gallery-${Date.now()}`
    }
    setGalleryData((prev) => {
      const updated = {
        ...prev,
        items: [itemWithId, ...prev.items]
      }
      fetch('/api/gallery/item', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemWithId)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add gallery photo')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const updateGalleryItem = useCallback((id, updatedFields) => {
    setGalleryData((prev) => {
      const updated = {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      }
      fetch(`/api/gallery/item/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update gallery photo')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const deleteGalleryItem = useCallback((id) => {
    setGalleryData((prev) => {
      const updated = {
        ...prev,
        items: prev.items.filter((item) => item.id !== id)
      }
      fetch(`/api/gallery/item/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAuthHeaders({ json: false })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete gallery photo')
        setSyncError(null)
      })
      .catch(handleSyncError)

      return updated
    })
  }, [])

  const updateGalleryItemCategory = useCallback((id, newCategory) => {
    updateGalleryItem(id, { category: newCategory })
  }, [updateGalleryItem])

  const resetGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery/reset', { method: 'POST', headers: getAuthHeaders({ json: false }) })
      if (!res.ok) throw new Error('Failed to reset gallery')
      setSyncError(null)
      await refreshFromServer()
    } catch (e) {
      handleSyncError(e)
    }
  }, [refreshFromServer])

  const exportGalleryJson = useCallback(() => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(galleryData, null, 2)
    )}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', 'gallery.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }, [galleryData])

  const contextValue = useMemo(
    () => ({
      isServerConnected,
      isLoading,
      syncError,
      refreshFromServer,
      categories: menuData.categories || [],
      items: menuData.items || [],
      menuConfig: menuData.config || {},
      updateItem,
      addItem,
      deleteItem,
      
      exportJsonFile,
      rawMenuData: menuData,
      bentoItems,
      updateBentoSlot,
      
      galleryCategories: galleryData.categories || [],
      galleryItems: galleryData.items || [],
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      updateGalleryItemCategory,
      
      exportGalleryJson
    }),
    [
      isServerConnected,
      isLoading,
      syncError,
      refreshFromServer,
      menuData,
      updateItem,
      addItem,
      deleteItem,
      
      exportJsonFile,
      bentoItems,
      updateBentoSlot,
      
      galleryData,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      updateGalleryItemCategory,
      
      exportGalleryJson
    ]
  )

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
