import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sprout, Sparkles, ChefHat, Leaf } from 'lucide-react'

const features = [
  {
    id: 'feature-farm-fresh',
    icon: Sprout,
    title: 'Farm Fresh Ingredients',
    desc: 'Harvested at dawn and served by dusk. We collaborate with regional organic farms to bring unmatched purity and crispness to your palate.',
  },
  {
    id: 'feature-sustainable',
    icon: Leaf,
    title: 'Sustainable Practices',
    desc: 'From solar-powered clay ovens to absolute zero food waste management, our operations feed the soil and protect the ecosystems.',
  },
  {
    id: 'feature-handcrafted',
    icon: ChefHat,
    title: 'Handcrafted Recipes',
    desc: 'We grind our own spices on stone mills, slow-cook on wood embers, and churn butter by hand to preserve ancient gastronomic arts.',
  },
  {
    id: 'feature-authentic',
    icon: Sparkles,
    title: 'Authentic Flavours',
    desc: 'Eschewing artificial colors, additives, or refined white sugars, we honor real Indian flavors in their most honest, rustic state.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="relative overflow-hidden py-[var(--spacing-section)]"
      style={{ 
        background: 'var(--color-cream)',
      }}
      aria-labelledby="why-us-heading"
    >
      {/* Dynamic Background Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(var(--color-terracotta) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div 
        className="max-width-container px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span
            className="text-xs font-semibold tracking-widest uppercase block mb-4"
            style={{ color: 'var(--color-terracotta)' }}
          >
            The Soil & Soul
          </span>
          <h2
            id="why-us-heading"
            className="font-display leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-forest)'
            }}
          >
            Rooted in Principles
          </h2>
          <p
            className="text-base font-light"
            style={{ color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            We believe that how food is grown, harvested, and crafted is as essential as how it tastes. Discover the pillars that define the Tanah experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 transition-all duration-500 hover:shadow-2xl border rounded-3xl"
                style={{
                  background: 'var(--color-beige)',
                  borderColor: 'rgba(27, 67, 50, 0.05)',
                }}
              >
                {/* Elevation & Border Hover Effect */}
                <div
                  className="absolute inset-0 border border-solid scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{ borderColor: 'var(--color-terracotta)' }}
                />

                {/* Big Background Number */}
                <div
                  className="font-display font-bold select-none leading-none absolute top-4 right-6 text-7xl opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10"
                  style={{ color: 'var(--color-forest)' }}
                >
                  0{i + 1}
                </div>

                {/* Icon Circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-[360deg]"
                  style={{ background: 'var(--color-forest)' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3
                  className="font-display text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-forest)' }}
                >
                  {feat.title}
                </h3>
                
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}
                >
                  {feat.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Central visual statement banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 lg:mt-24 p-8 md:p-12 text-center relative overflow-hidden rounded-3xl"
          style={{ background: 'var(--color-forest)' }}
        >
          {/* Subtle design circles */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 opacity-10 rounded-full"
            style={{ background: 'var(--color-terracotta)' }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 rounded-full"
            style={{ background: 'var(--color-beige-dark)' }}
          />

          <p
            className="font-display text-2xl md:text-3xl font-light italic leading-normal mb-4 relative z-10"
            style={{ color: 'var(--color-cream)' }}
          >
            "Earth is not just where we get our food; it is the source of our culinary imagination."
          </p>
          <span
            className="text-xs font-semibold tracking-widest uppercase block relative z-10"
            style={{ color: 'var(--color-terracotta-light)' }}
          >
            — Master Chef Harish Chandra
          </span>
        </motion.div>
      </div>
    </section>
  )
}
