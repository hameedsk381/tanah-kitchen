import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'

const dishes = [
  {
    id: 'dish-thali',
    name: 'Heritage Soil Thali',
    desc: 'Curated selection of local seasonal curries, indigenous red rice, house-made pickles, and rustic flatbreads.',
    price: 699,
    tag: 'Chef Signature',
    image: '/images/dish_thali.png',
    rating: '4.9',
    badge: 'Legendary'
  },
  {
    id: 'dish-biryani',
    name: 'Forest Claypot Biryani',
    desc: 'Fragrant basmati rice layered with slow-cooked organic farm vegetables and rare local spices, served in an earthen pot.',
    price: 549,
    tag: 'Slow Cooked',
    image: '/images/dish_biryani.png',
    rating: '4.8',
    badge: 'Best Seller'
  },
  {
    id: 'dish-dessert',
    name: 'Saffron Rabri Terracotta Bowl',
    desc: 'Slow-reduced pasture milk infused with Kashmiri saffron, topped with edible silver leaf, pistachio crumble.',
    price: 399,
    tag: 'Handcrafted',
    image: '/images/dish_dessert.png',
    rating: '4.9',
    badge: 'Seasonal Dessert'
  }
]

function DishCard({ dish, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container with Custom Zoom */}
      <div className="hover-zoom aspect-[4/3] w-full relative mb-6 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        
        {/* Soft elegant gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(27, 67, 50, 0.4) 100%)',
            opacity: hovered ? 1 : 0.6
          }}
        />

        {/* Floating Badge */}
        <div
          className="absolute top-4 left-4 px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase"
          style={{ background: 'var(--color-terracotta)', color: 'var(--color-cream)' }}
        >
          {dish.badge}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-terracotta-light)' }}
          >
            {dish.tag}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--color-terracotta)' }} />
            {dish.rating}
          </span>
        </div>

        <h3
          className="font-display text-2xl font-bold mb-3 transition-colors duration-300"
          style={{ color: hovered ? 'var(--color-terracotta)' : 'var(--color-forest)' }}
        >
          {dish.name}
        </h3>
        
        <p
          className="text-sm font-light leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--color-charcoal)', opacity: 0.85 }}
        >
          {dish.desc}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span
            className="font-display text-2xl font-semibold"
            style={{ color: 'var(--color-forest)' }}
          >
            ₹{dish.price}
          </span>
          
          <Link
            to="/menu"
            className="text-xs font-semibold tracking-widest uppercase flex items-center gap-2 group-hover:text-terracotta transition-colors duration-300"
            style={{ color: 'var(--color-forest)' }}
          >
            Order Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function SignatureDishes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="signature-dishes"
      ref={ref}
      className="relative overflow-hidden"
      style={{ 
        background: 'var(--color-beige)',
        paddingTop: '8rem',
        paddingBottom: '8rem'
      }}
      aria-labelledby="signature-heading"
    >
      <div 
        className="px-6 md:px-12 relative z-10"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-4"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Earth's Bounty
            </span>
            <h2
              id="signature-heading"
              className="font-display leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                color: 'var(--color-forest)',
              }}
            >
              Signature Dishes
            </h2>
          </div>
          <p
            className="text-base font-light max-w-sm"
            style={{ color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            A curated glimpse of our handcrafted seasonal favorites, prepared with pure farm ingredients and coal-fired passion.
          </p>
        </div>

        {/* Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} isInView={isInView} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 lg:mt-24"
        >
          <Link
            to="/menu"
            className="btn-primary"
          >
            Explore Full Seasonal Menu
          </Link>
        </motion.div>
      </div>

      {/* Decorative divider curve at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </section>
  )
}
