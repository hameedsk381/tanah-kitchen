import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import defaultMenuData from '../data/menu.json'
import defaultGalleryData from '../data/gallery.json'

const MenuContext = createContext(null)

const LOCAL_STORAGE_MENU_KEY = 'tanah_kitchen_custom_menu_v1'
const LOCAL_STORAGE_BENTO_KEY = 'tanah_kitchen_custom_bento_v1'
const LOCAL_STORAGE_GALLERY_KEY = 'tanah_kitchen_custom_gallery_v1'

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

export function MenuProvider({ children }) {
  // 1. Menu Items State
  const [menuData, setMenuData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_MENU_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Using default menu data:', e)
    }
    return defaultMenuData
  })

  // 2. Bento Grid Items State
  const [bentoItems, setBentoItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BENTO_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === 6) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Using default bento data:', e)
    }
    return DEFAULT_BENTO_ITEMS
  })

  // 3. Gallery Items State
  const [galleryData, setGalleryData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Using default gallery data:', e)
    }
    return defaultGalleryData
  })

  // Persistence
  useEffect(() => {
    try {
      if (menuData !== defaultMenuData) {
        localStorage.setItem(LOCAL_STORAGE_MENU_KEY, JSON.stringify(menuData))
      }
    } catch (e) {}
  }, [menuData])

  useEffect(() => {
    try {
      if (bentoItems !== DEFAULT_BENTO_ITEMS) {
        localStorage.setItem(LOCAL_STORAGE_BENTO_KEY, JSON.stringify(bentoItems))
      }
    } catch (e) {}
  }, [bentoItems])

  useEffect(() => {
    try {
      if (galleryData !== defaultGalleryData) {
        localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(galleryData))
      }
    } catch (e) {}
  }, [galleryData])

  // Menu Methods
  const updateItem = useCallback((id, updatedFields) => {
    setMenuData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    }))
  }, [])

  const addItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || `custom_${Date.now()}`
    }
    setMenuData((prev) => ({
      ...prev,
      items: [itemWithId, ...prev.items]
    }))
  }, [])

  const deleteItem = useCallback((id) => {
    setMenuData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }))
  }, [])

  const resetToDefault = useCallback(() => {
    setMenuData(defaultMenuData)
    try {
      localStorage.removeItem(LOCAL_STORAGE_MENU_KEY)
    } catch (e) {}
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

  // Bento Methods
  const updateBentoSlot = useCallback((slotIndex, updatedFields) => {
    setBentoItems((prev) =>
      prev.map((item, idx) => (idx === slotIndex ? { ...item, ...updatedFields } : item))
    )
  }, [])

  const resetBento = useCallback(() => {
    setBentoItems(DEFAULT_BENTO_ITEMS)
    try {
      localStorage.removeItem(LOCAL_STORAGE_BENTO_KEY)
    } catch (e) {}
  }, [])

  // Gallery Methods
  const updateGalleryItemCategory = useCallback((id, newCategory) => {
    setGalleryData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, category: newCategory } : item
      )
    }))
  }, [])

  const resetGallery = useCallback(() => {
    setGalleryData(defaultGalleryData)
    try {
      localStorage.removeItem(LOCAL_STORAGE_GALLERY_KEY)
    } catch (e) {}
  }, [])

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
      categories: menuData.categories || defaultMenuData.categories,
      items: menuData.items || defaultMenuData.items,
      updateItem,
      addItem,
      deleteItem,
      resetToDefault,
      exportJsonFile,
      rawMenuData: menuData,
      // Bento
      bentoItems,
      updateBentoSlot,
      resetBento,
      // Gallery
      galleryCategories: galleryData.categories || defaultGalleryData.categories,
      galleryItems: galleryData.items || defaultGalleryData.items,
      updateGalleryItemCategory,
      resetGallery,
      exportGalleryJson
    }),
    [
      menuData,
      updateItem,
      addItem,
      deleteItem,
      resetToDefault,
      exportJsonFile,
      bentoItems,
      updateBentoSlot,
      resetBento,
      galleryData,
      updateGalleryItemCategory,
      resetGallery,
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
