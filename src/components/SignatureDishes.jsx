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
    image: '/assets/food/06.jpg',
    rating: '4.9',
    badge: 'Legendary'
  },
  {
    id: 'dish-biryani',
    name: 'Forest Claypot Biryani',
    desc: 'Fragrant basmati rice layered with slow-cooked organic farm vegetables and rare local spices, served in an earthen pot.',
    price: 549,
    tag: 'Slow Cooked',
    image: '/assets/food/07.jpg',
    rating: '4.8',
    badge: 'Best Seller'
  },
  {
    id: 'dish-dessert',
    name: 'Saffron Rabri Terracotta Bowl',
    desc: 'Slow-reduced pasture milk infused with Kashmiri saffron, topped with edible silver leaf, pistachio crumble.',
    price: 399,
    tag: 'Handcrafted',
    image: '/assets/food/026.jpg',
    rating: '4.9',
    badge: 'Seasonal Dessert'
  }
]

export default function SignatureDishes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      id="signature-dishes"
      ref={ref}
      className="relative w-full py-[var(--spacing-section)] bg-bg-secondary overflow-hidden"
      aria-labelledby="signature-heading"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="px-8 max-w-container mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
              Earth's Bounty
            </span>
            <h2
              id="signature-heading"
              className="font-display font-light text-warm-ivory leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Signature Gastronomy
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm font-light text-sand-beige leading-relaxed">
              A curated glimpse of our handcrafted seasonal favorites, prepared with pure farm ingredients and coal-fired passion.
            </p>
          </div>
        </div>

        {/* Asymmetrical Staggered Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-stretch">
          {dishes.map((dish, i) => {
            const isSecond = i === 1
            const isThird = i === 2
            
            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col justify-between group cursor-pointer ${
                  isSecond ? 'lg:translate-y-12' : isThird ? 'lg:-translate-y-6' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  {/* Image Container */}
                  <div className="aspect-[4/5] w-full relative mb-8 overflow-hidden bg-bg-primary">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                    
                    {/* Custom Terracotta Border frame on hover */}
                    <div className="absolute inset-4 border border-terracotta/0 group-hover:border-terracotta/40 transition-all duration-500 pointer-events-none" />

                    {/* Floating Badge */}
                    <span className="absolute top-4 left-4 bg-terracotta text-warm-ivory text-[9px] font-semibold tracking-widest uppercase py-1.5 px-3">
                      {dish.badge}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-copper">
                        {dish.tag}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-sand-beige">
                        <Star className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                        {dish.rating}
                      </span>
                    </div>

                    <h3 className="font-display font-light text-2xl text-warm-ivory group-hover:text-copper transition-colors duration-300">
                      {dish.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-light text-sand-beige/85 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-terracotta/10 pt-6 mt-8">
                  <span className="font-display text-2xl text-warm-ivory">
                    ₹{dish.price}
                  </span>
                  
                  <Link
                    to="/menu"
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 text-warm-ivory group-hover:text-terracotta transition-colors duration-300"
                  >
                    Explore Menu
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center mt-24 lg:mt-32"
        >
          <Link
            to="/menu"
            className="btn-primary py-4 px-12"
          >
            Explore Full Seasonal Menu
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
