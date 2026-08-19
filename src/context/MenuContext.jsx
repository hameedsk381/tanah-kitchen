import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import defaultMenuData from '../data/menu.json'

const MenuContext = createContext(null)

const LOCAL_STORAGE_KEY = 'tanah_kitchen_custom_menu_v1'

export function MenuProvider({ children }) {
  const [menuData, setMenuData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Could not read custom menu from localStorage, using default:', e)
    }
    return defaultMenuData
  })

  // Persist to localStorage only when menuData changes
  useEffect(() => {
    try {
      if (menuData !== defaultMenuData) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(menuData))
      }
    } catch (e) {
      console.error('Failed to save custom menu to localStorage:', e)
    }
  }, [menuData])

  // Update a single item
  const updateItem = useCallback((id, updatedFields) => {
    setMenuData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    }))
  }, [])

  // Add a new item
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

  // Delete an item
  const deleteItem = useCallback((id) => {
    setMenuData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }))
  }, [])

  // Reset to default menu.json
  const resetToDefault = useCallback(() => {
    setMenuData(defaultMenuData)
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } catch (e) {
      // ignore
    }
  }, [])

  // Export current menu data as a downloadable JSON file
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

  const contextValue = useMemo(
    () => ({
      categories: menuData.categories || defaultMenuData.categories,
      items: menuData.items || defaultMenuData.items,
      updateItem,
      addItem,
      deleteItem,
      resetToDefault,
      exportJsonFile,
      rawMenuData: menuData
    }),
    [menuData, updateItem, addItem, deleteItem, resetToDefault, exportJsonFile]
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
