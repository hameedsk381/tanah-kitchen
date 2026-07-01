import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const dishes = [
  {
    id: 'dish-thali',
    name: 'Heritage Soil Thali',
    desc: 'A masterfully curated selection of local seasonal curries, indigenous red rice, house-made pickles, and rustic coal-baked flatbreads.',
    price: 699,
    tag: 'CHEF SIGNATURE',
    image: '/assets/Tanha Food/food-6.webp',
    badge: 'Legendary'
  },
  {
    id: 'dish-biryani',
    name: 'Forest Claypot Biryani',
    desc: 'Fragrant, aged basmati rice layered with slow-cooked organic forest mushrooms, heritage root vegetables, and rare local spices, sealed in raw clay.',
    price: 549,
    tag: 'SLOW COOKED',
    image: '/assets/Tanha Image/11.webp',
    badge: 'Signature'
  },
  {
    id: 'dish-dessert',
    name: 'Saffron Rabri Terracotta Bowl',
    desc: 'Pasture-fed milk slow-reduced over coal fires, infused with Kashmiri saffron, and finished with a pistachio crumble and organic honey.',
    price: 399,
    tag: 'HANDCRAFTED',
    image: '/assets/Tanha Food/food-26.webp',
    badge: 'Seasonal Dessert'
  }
]

export default function SignatureDishes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section
      id="signature-dishes"
      ref={ref}
      className="relative w-full py-[var(--spacing-section)] bg-bg-secondary overflow-hidden"
      aria-labelledby="signature-heading"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="px-8 max-w-container mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
            CULINARY NARRATIVE
          </span>
          <h2
            id="signature-heading"
            className="font-display font-light text-text-dark leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)' }}
          >
            Signature Gastronomy
          </h2>
        </div>

        {/* Interactive Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Huge Dynamic Showcase Frame */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-bg-primary relative border border-terracotta/10">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={dishes[activeIdx].image}
                  alt={dishes[activeIdx].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
                />
              </AnimatePresence>

              {/* Decorative framing overlay */}
              <div className="absolute inset-6 border border-bg-secondary/15 pointer-events-none" />
              
              <div className="absolute bottom-10 left-10 z-10 text-left">
                <span className="bg-terracotta text-bg-primary text-[8px] font-semibold tracking-widest uppercase py-1.5 px-3 block w-fit mb-2">
                  {dishes[activeIdx].badge}
                </span>
                <p className="text-lg font-display italic text-bg-secondary">
                  Featured Plating
                </p>
              </div>
            </div>

            {/* Behind layout details */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-terracotta/20 -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Menu Detail Selection List */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-2">
            {dishes.map((dish, idx) => {
              const isActive = idx === activeIdx
              
              return (
                <div
                  key={dish.id}
                  className={`p-8 border-b border-terracotta/10 cursor-pointer transition-all duration-500 relative ${
                    isActive ? 'bg-bg-primary/65 border-l-2 border-l-terracotta' : 'hover:bg-bg-primary/20'
                  }`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[9px] font-mono tracking-widest text-accent font-semibold">
                      {dish.tag}
                    </span>
                    <span className="text-xl font-display text-text-dark font-medium">
                      ₹{dish.price}
                    </span>
                  </div>

                  <h3 className="font-display font-light text-2xl text-text-dark mb-3 transition-colors duration-300">
                    {dish.name}
                  </h3>

                  <p className={`text-xs font-light leading-relaxed transition-all duration-300 ${
                    isActive ? 'text-text-dark/80 h-auto opacity-100' : 'text-text-dark/40 h-0 overflow-hidden opacity-0'
                  }`}>
                    {dish.desc}
                  </p>
                </div>
              )
            })}

            <div className="pt-8 pl-8">
              <Link
                to="/menu"
                className="btn-primary py-3.5 px-10 text-[9px] tracking-[0.2em]"
              >
                Discover Full Seasonal Menu
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
