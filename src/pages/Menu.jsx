import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sliders, Sparkles, Flame, Cookie, Sprout, GlassWater } from 'lucide-react'
import menuData from '../data/menu.json'
import { useMenu } from '../context/MenuContext'
import { LogoOwl } from '../components/illustrations'
import SEO from '../components/SEO'

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

// Liquid Library (Bar Menu) Sections and Items Dataset
const LIQUID_SECTIONS = [
  {
    id: 'singlemalt',
    name: 'SINGLEMALT',
    headers: ['30ML', 'BTL'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-21.webp',
    items: [
      { name: 'Singleton 12 Yr', prices: ['799/-', '14,999/-'] },
      { name: 'Talisker 10 Yr', prices: ['659/-', '13,999/-'] },
      { name: 'Laphroaig', prices: ['699/-', '12,999/-'] },
      { name: 'Glenlivet 12yr', prices: ['799/-', '13,999/-'] },
      { name: 'Glenlivet 15yr', prices: ['899/-', '14,999/-'] },
      { name: 'Glenlivet 18yr', prices: ['1299/-', '22,999/-'] },
      { name: 'Glenmorangie 10yr', prices: ['899/-', '13,999/-'] },
      { name: 'Glenfiddich 12yr', prices: ['799/-', '13,999/-'] },
      { name: 'Glenfiddich 15yr', prices: ['899/-', '14,999/-'] },
      { name: 'Glenfiddich 18yr', prices: ['1299/-', '23,000/-'] },
      { name: 'Hibiki', prices: ['1899/-', '34,000/-'] }
    ],
    tagline: 'you get better with age'
  },
  {
    id: 'whiskey',
    name: 'WHISKEY',
    headers: ['30ML', 'BTL'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-21.webp',
    items: [
      { name: 'Royal Salute', prices: ['2,999/-', '49,999/-'] },
      { name: 'Chivas 12 YR', prices: ['459/-', '8,999/-'] },
      { name: 'Chivas 18 YR', prices: ['899/-', '18,999/-'] },
      { name: 'JW Black Label', prices: ['549/-', '8,999/-'] },
      { name: "Teacher's Highland", prices: ['399/-', '5,999/-'] },
      { name: "Teacher's 50", prices: ['459/-', '5,999/-'] },
      { name: 'Ballantine', prices: ['459/-', '5,999/-'] },
      { name: '100 Pipers 12YR', prices: ['459/-', '6,999/-'] },
      { name: 'Jim Beam', prices: ['399/-', '5,899/-'] },
      { name: 'Jameson', prices: ['499/-', '5,999/-'] },
      { name: "Jack Daniel's NO 7", prices: ['399/-', '7,999/-'] }
    ],
    tagline: 'never delay opening a bottle of whisky.'
  },
  {
    id: 'vodka',
    name: 'VODKA',
    headers: ['30ML', 'BTL'],
    items: [
      { name: 'Beluga Nobel', prices: ['999/-', '16,999/-'] },
      { name: 'Grey Goose', prices: ['699/-', '12,999/-'] },
      { name: 'Absolut', prices: ['499/-', '8,999/-'] },
      { name: 'Ketel One', prices: ['499/-', '7,999/-'] }
    ],
    tagline: 'my willpower vs vodka (40%) vodka wins!'
  },
  {
    id: 'gin',
    name: 'GIN',
    headers: ['30ML', 'BTL'],
    items: [
      { name: 'Greater Than', prices: ['399/-', '5,999/-'] },
      { name: 'Bombay Sapphire', prices: ['499/-', '7,999/-'] },
      { name: 'Beefeater', prices: ['499/-', '7,999/-'] },
      { name: 'Tanqueray No 10', prices: ['659/-', '14,999/-'] },
      { name: 'Monkey 47', prices: ['659/-', '14,999/-'] },
      { name: 'Roku Gin', prices: ['799/-', '14,999/-'] }
    ],
    tagline: 'my willpower vs vodka (40%) vodka wins!'
  },
  {
    id: 'tequila',
    name: 'TEQUILA',
    headers: ['30ML', 'BTL'],
    items: [
      { name: 'Don Angle', prices: ['599/-', '10,999/-'] },
      { name: 'Jose Cuervo Silver', prices: ['599/-', '10,999/-'] },
      { name: 'Jose Cuervo Reposado', prices: ['699/-', '12,999/-'] },
      { name: '1800 Silver', prices: ['799/-', '13,999/-'] },
      { name: 'Don Jilo', prices: ['899/-', '21,999/-'] },
      { name: 'Patron Silver Tequila', prices: ['1299/-', '22,999/-'] }
    ],
    tagline: 'Magic Water for fun people'
  },
  {
    id: 'rum',
    name: 'RUM',
    headers: ['30ML', 'BTL'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-21.webp',
    items: [
      { name: 'Old Monk', prices: ['299/-', '3,999/-'] },
      { name: 'Bacardi Carta Blanc', prices: ['299/-', '4,999/-'] },
      { name: 'Bacardi Aged Rum', prices: ['499/-', '7,999/-'] }
    ],
    tagline: 'Magic Water for fun people'
  },
  {
    id: 'brandy',
    name: 'BRANDY & COGNAC',
    headers: ['30ML', 'BTL'],
    items: [
      { name: 'Mansion House (Brandy)', prices: ['249/-', '3,999/-'] },
      { name: 'Xclamation Brandy', prices: ['399/-', '5,999/-'] },
      { name: 'Hennessy VS (Cognac)', prices: ['599/-', '14,999/-'] },
      { name: 'St Remy Vsop', prices: ['699/-', '12,999/-'] }
    ],
    tagline: 'Coco cola pepsi, Balayya bab sexy!'
  },
  {
    id: 'liquor',
    name: 'LIQUOR',
    headers: ['30ML', 'BTL'],
    items: [
      { name: 'Baileys', prices: ['499/-', '9,999/-'] },
      { name: 'Sambuca', prices: ['499/-', '9,999/-'] },
      { name: 'Kahlua', prices: ['499/-', '9,999/-'] },
      { name: 'Martini Roso', prices: ['499/-', '9,999/-'] },
      { name: 'Jagermeister', prices: ['599/-', '10,999/-'] }
    ],
    tagline: 'Coco cola pepsi, Balayya bab sexy!'
  },
  {
    id: 'rosewine',
    name: 'ROSE WINE',
    headers: ['Glass', 'BTL'],
    items: [
      { name: 'Sula Zinfandel', prices: ['799/-', '5,999/-'] }
    ],
    tagline: 'Will you accept this rose?'
  },
  {
    id: 'redwhite',
    name: 'RED WINE & WHITE WINE',
    headers: ['Glass', 'BTL'],
    items: [
      { name: 'Sula Chardonnay White', prices: ['799/-', '4,999/-'] },
      { name: 'Sula Cabernet Shiraz (Red)', prices: ['799/-', '4,999/-'] },
      { name: "Jacob's Creek Chardonnay", prices: ['999/-', '5,999/-'] },
      { name: "Jacob's Creek Shiraz", prices: ['999/-', '5,999/-'] }
    ],
    tagline: 'Will you accept this rose?'
  },
  {
    id: 'beer',
    name: 'BEER & ALCOPOPS',
    headers: ['Pint', 'Bucket'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Image/05.webp',
    items: [
      { name: 'Corona Extra', prices: ['699/-', '2,899/-'] },
      { name: 'Hoegaarden', prices: ['699/-', '2,899/-'] },
      { name: 'Heineken', prices: ['459/-', '2,299/-'] },
      { name: 'Kingfisher Ultra', prices: ['459/-', '2,299/-'] },
      { name: 'Budweiser', prices: ['459/-', '2,299/-'] }
    ],
    tagline: 'The sound of celebration begins with a cork.'
  },
  {
    id: 'champagne',
    name: 'CHAMPAGNE & SPARKLING',
    headers: ['BTL only'],
    items: [
      { name: 'Zonin Prosecco', prices: ['10,999/-'] },
      { name: 'Moet Chandon Brut', prices: ['27,999/-'] },
      { name: 'Sula Brut', prices: ['2,499/-'] }
    ],
    tagline: 'The sound of celebration begins with a cork.'
  },
  {
    id: 'softdrink',
    name: 'SOFT DRINK',
    headers: ['Price'],
    items: [
      { name: 'Fresh Lime Soda / Water', prices: ['189/-'] },
      { name: 'Canned Juice', prices: ['199/-'] },
      { name: 'Ginger Ale', prices: ['169/-'] },
      { name: 'Tonic Water', prices: ['169/-'] },
      { name: 'Red Bull', prices: ['299/-'] },
      { name: 'Coke Can', prices: ['129/-'] },
      { name: 'Sprite Can', prices: ['129/-'] },
      { name: 'Water Bottle', prices: ['99/-'] },
      { name: 'Diet Coke', prices: ['129/-'] },
      { name: 'Fresh Juice (Orange, Watermelon)', prices: ['299/-'] },
      { name: 'Aerated Water (Glass)', prices: ['99/-'] },
      { name: 'Soda, Sprite, Thumsup', prices: ['99/-'] }
    ],
    tagline: "It's time to Hydrate!"
  },
  {
    id: 'signature',
    name: 'SIGNATURE COCKTAILS',
    headers: ['Price'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-22.webp',
    items: [
      { name: 'Palapitta Song', prices: ['659/-'], desc: 'Blend of Rum, Pineapple, Falernum, Narial Panni, Lime, & Salin' },
      { name: 'Godavari Gulabi', prices: ['699/-'], desc: 'Bourbon, Blueberry, Lime, Basil, Foam' },
      { name: 'Botanical Garden', prices: ['699/-'], desc: 'Gin, Grapefruit Juice, Simple Syrup, Lime Juice, Tonic Water' },
      { name: 'Japanese Blossom', prices: ['699/-'], desc: 'Whiskey, Orange Juice, Yuzu Puree, Sourmix' },
      { name: 'Profit & Loss (P&L)', prices: ['699/-'], desc: 'Gin, Kaffir Lime, Basil, Lime Simple Syrup' },
      { name: 'Echo of Tanah', prices: ['699/-'], desc: 'Gin, Kaffir Lime, Coconut Water, Salin, Lime' },
      { name: 'Tanah Queen', prices: ['699/-'], desc: 'Tequila, Sour Mix, Bluepea Tea, Apple Juice, Lavender' },
      { name: 'Yuzu Heaven', prices: ['799/-'], desc: 'Dark Rum, Cardamom, Pineapple Cordial, Yuzu & Lime' },
      { name: 'Pineapple Ginger', prices: ['799/-'], desc: 'Vodka, Pineapple Ginger Sourmix, Ginger Beer' },
      { name: 'The Og Picante', prices: ['799/-'], desc: 'Bartender Secret Recipe' }
    ],
    tagline: 'This Is Where We Create'
  },
  {
    id: 'mocktail',
    name: 'MOCKTAIL',
    headers: ['Price'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-22.webp',
    items: [
      { name: 'Mamidi Madhuram', prices: ['349/-'], desc: 'Mango Cordial, Lime Simple Syrup, Bubbles' },
      { name: 'Golconda Glow', prices: ['349/-'], desc: 'Raspberry, Grenadine, Mint, Orange Juice, Simple Syrup, Bubbles' },
      { name: 'Pinky Promise', prices: ['349/-'], desc: 'Watermelon Pulp, Vanilla, Whipped Cream, Pineapple, Simple Syrup' },
      { name: 'Pine Pathar', prices: ['349/-'], desc: 'Coffee Simple Syrup, Tonic Water, Banana Foam' },
      { name: 'Citrus Cluster', prices: ['349/-'], desc: 'Orange Juice, Passionfruit, Yuzu Puree, Lime Juice, Basil Foam' },
      { name: 'Tanah Verde', prices: ['349/-'], desc: 'Cucumber, Basil, Lime, Simple Syrup, Pineapple Bubbles' },
      { name: 'Spicy Melon Tempest', prices: ['349/-'], desc: 'Watermelon Juice, Melon Syrup, Mint, Chatmasala, Soda' },
      { name: 'Slush', prices: ['349/-'], desc: 'Ampanna & Green Apple, Kiwi & Chilly, Mango' },
      { name: 'Ice Tea', prices: ['349/-'], desc: 'Black Tea, Peach, Passion Fruit, Lime' },
      { name: 'Virgin Mojito', prices: ['349/-'], desc: 'Watermelon, Orange, Curry Leaf' }
    ],
    tagline: 'I am unapologetically good'
  },
  {
    id: 'classic',
    name: 'CLASSIC COCKTAIL',
    headers: ['Price'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-22.webp', // The red Earthy Hibiscus Cocktail image from your photo
    items: [
      { name: 'LIIT', prices: ['999/-'], desc: 'Tequila, rum, vodka, gin, triple sec, lemon juice, Coke' },
      { name: 'Cosmopolitan', prices: ['699/-'], desc: 'Vodka, triple sec, cranberry juice' },
      { name: 'Moscow Mule', prices: ['699/-'], desc: 'Vodka, lemon juice, ginger ale' },
      { name: 'Bramble', prices: ['699/-'], desc: 'Gin, lemon juice, simple syrup, raspberry purée' },
      { name: 'Bees Knees', prices: ['699/-'], desc: 'Gin, lemon juice, honey syrup' },
      { name: 'Whiskey Sour', prices: ['699/-'], desc: 'Whiskey, lemon juice, simple syrup, egg white, angostura bitter' },
      { name: 'Mojito', prices: ['659/-'], desc: 'Rum, lemon juice, mint, soda' },
      { name: 'Old Fashioned', prices: ['699/-'], desc: 'Whiskey, angostura bitters, sugar' },
      { name: 'Margarita', prices: ['799/-'], desc: 'Tequila, triple sec, lemon juice' },
      { name: '007 Martini', prices: ['699/-'], desc: 'Vodka or gin, olive brain, white wine' },
      { name: 'Espresso Martini', prices: ['669/-'], desc: 'Vodka, Kahlua, coffee' }
    ],
    tagline: 'We respect the originals'
  },
  {
    id: 'shooter',
    name: 'SHOOTER',
    headers: ['Price'],
    watermark: 'https://storage.googleapis.com/yesj/assets/Tanha Food/food-22.webp', // The red Earthy Hibiscus Cocktail image from your photo
    items: [
      { name: 'Kamikaze Shot', prices: ['499/-'], desc: 'Vodka, triple sec, lemon juice' },
      { name: 'Cheesecake Shot', prices: ['559/-'], desc: 'Vodka, strawberry purée, cream, biscuit' },
      { name: 'B-52', prices: ['669/-'], desc: 'Kahlua, Baileys, triple sec (layered)' },
      { name: 'Flatliner', prices: ['699/-'], desc: 'tequila, tabasco, sambuca, vanilla foam' },
      { name: 'Jager Bomb', prices: ['799/-'], desc: 'Jägermeister, Red Bull' }
    ],
    tagline: "It's Time to call your driver"
  }
]

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

            {/* Menu Cards */}
            <div className="w-full max-w-[780px] mx-auto px-4 sm:px-6 flex flex-col gap-[32px]">
              {LIQUID_SECTIONS.map((section, index) => {
                return (
                  <React.Fragment key={section.id}>
                    <div 
                      className="w-full relative rounded-[8px] p-6 sm:p-10 md:p-12 overflow-hidden"
                      style={{
                        backgroundColor: 'var(--color-beige)',
                        boxShadow: '0 4px 24px rgba(111,41,44,0.18)',
                        // Apply the selective drink watermark directly as a background card overlay
                        backgroundImage: section.watermark 
                          ? `linear-gradient(rgba(236, 233, 218, 0.93), rgba(236, 233, 218, 0.93)), url('${section.watermark}')`
                          : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-end border-b-[1px] pb-3 mb-8 gap-2" style={{ borderColor: 'rgba(117, 36, 42, 0.3)' }}>
                          {/* Category Heading */}
                          <h3 
                            className="uppercase font-bold tracking-wider m-0 leading-none text-left text-2xl sm:text-3xl"
                            style={{ color: 'var(--color-primary-dark)', fontFamily: "'Oswald', Impact, sans-serif" }}
                          >
                            {section.name}
                          </h3>
                        </div>

                        {/* Item Rows */}
                        <div className="flex flex-col gap-[20px]">
                          {section.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-baseline gap-2 sm:gap-6">
                              <div className="flex-1 min-w-0 pr-2">
                                <span className="font-semibold block leading-tight text-left text-sm sm:text-lg" style={{ color: 'var(--color-primary-dark)' }}>
                                  {item.name}
                                </span>
                                {item.desc && (
                                  <p className="mt-1 mb-0 leading-snug text-left text-[11px] sm:text-xs opacity-75" style={{ color: 'var(--color-text-muted)' }}>
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Card Bottom: Tagline & Legal */}
                        <div className="mt-10 flex flex-col items-center justify-center text-center">
                          <p 
                            className="font-bold mb-6"
                            style={{ color: 'var(--color-near-black)', fontSize: '24px', fontFamily: "'Caveat', cursive", lineHeight: 1.2 }}
                          >
                            "{section.tagline}"
                          </p>
                          
                          {/* Very bottom text */}
                          <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-2 pt-6 border-t border-[#75242A]/10 gap-3">
                            <span className="uppercase font-bold tracking-[0.25em]" style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                              TANAH
                            </span>
                            <span className="" style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                              *Subject to availability | Govt. Taxes applicable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
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
