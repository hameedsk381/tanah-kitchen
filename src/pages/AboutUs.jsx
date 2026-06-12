import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Award, Recycle, Heart } from 'lucide-react'
import VisitTanah from '../components/VisitTanah'

const team = [
  {
    name: 'Chef Harish Chandra',
    role: 'Co-Founder & Culinary Director',
    desc: 'With over 22 years of heritage Indian cooking experience, Harish spent years studying seed varieties and organic farming methods before founding Tanah.',
    image: '/images/about_chef.png'
  },
  {
    name: 'Devika Nair',
    role: 'Partner Farm Coordinator',
    desc: 'Devika oversees our direct relationships with agriculturalists, working on soil health, seeds conservation, and crop rotation schedules.',
    image: '/images/about.png'
  },
  {
    name: 'Aravind Swamy',
    role: 'Beverage Specialist',
    desc: 'Aravind designs our organic sodas, cold brews, and nectar infusions, drawing inspiration from native flora and ancient ayurvedic tonics.',
    image: '/images/about_farm.png'
  }
]

const timeline = [
  {
    year: '2016',
    title: 'The Seed is Sown',
    desc: 'Founders Harish and Devika start a small 2-acre experimental organic farm in the Aravalli foothills to test ancient seed cultivation.'
  },
  {
    year: '2018',
    title: 'Direct Farm network',
    desc: 'We expand our vision by establishing the Tanah Cooperative, partnering with 8 small-scale farmers to secure fair trade crop prices.'
  },
  {
    year: '2021',
    title: 'Tanah Kitchen Opens',
    desc: 'The restaurant opens its doors, featuring a wood-fired kitchen, claypot-only slow cooking, and composting grids.'
  },
  {
    year: '2025',
    title: '100% Circular Goal',
    desc: 'Achieved complete zero-waste kitchen certification, recycling 100% of organic waste back into composting soil for our farms.'
  }
]

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About Us | Tanah Kitchen - Our Heritage and Vision'
    window.scrollTo(0, 0)
  }, [])

  const storyRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })

  const philosophyRef = useRef(null)
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: '-100px' })

  const sustainabilityRef = useRef(null)
  const isSustainabilityInView = useInView(sustainabilityRef, { once: true, margin: '-100px' })

  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-100px' })

  const teamRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' })

  return (
    <main className="flex-grow pt-24">
      
      {/* Editorial Page Header */}
      <section 
        className="relative py-24 md:py-36 flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--color-forest)' }}
      >
        <div className="absolute inset-0 opacity-20 z-0">
          <img
            src="/images/farm_organic.png"
            alt="Lush fields background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark to-transparent opacity-80" />
        
        <div 
          className="relative z-10 text-center px-6"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: 'var(--color-terracotta-light)' }}>
            OUR HERITAGE
          </span>
          <h1 
            className="font-display font-bold leading-none"
            style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              color: 'var(--color-cream)'
            }}
          >
            Rooted in Soil, <br />
            <span className="italic" style={{ color: 'var(--color-terracotta-light)' }}>Sustained by Nature</span>
          </h1>
        </div>
      </section>

      {/* Brand Story (Asymmetrical Section) */}
      <section 
        ref={storyRef}
        className="relative"
        style={{ 
          background: 'var(--color-cream)',
          paddingTop: '8rem',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              className="lg:col-span-6 order-2 lg:order-1"
              initial={{ opacity: 0, y: 35 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
                THE JOURNEY
              </span>
              <h2 
                className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight"
                style={{ color: 'var(--color-forest)' }}
              >
                Where It All Began
              </h2>
              <div className="space-y-6 text-base font-light leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>
                <p>
                  Tanah Kitchen was founded not inside a bustling cityscape, but in the muddy furrows of a family-run heritage farm. Our journey began with a question: Why has modern cuisine disconnected itself from the seasons and soils that give it life?
                </p>
                <p>
                  We set out to create a dining experience that acts as a portal back to the earth. Starting with only five heirloom crops, our co-founders partnered with small organic growers who practiced regenerative agriculture — farming with composting, worm casts, and manual soil rotation.
                </p>
                <p className="font-medium" style={{ color: 'var(--color-terracotta)' }}>
                  Today, Tanah Kitchen stands as a proud voice of slow-cooking, celebrating pure, raw culinary craftsmanship without short-cuts or chemical enhancers.
                </p>
              </div>
            </motion.div>

            {/* Asymmetrical Image Frame */}
            <motion.div 
              className="lg:col-span-6 order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hover-zoom aspect-[4/3] w-[90%] overflow-hidden shadow-2xl relative">
                <img
                  src="/images/about.png"
                  alt="Traditional Indian kitchen details with spices and clayware"
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute right-0 bottom-[-10%] aspect-[3/4] w-[45%] overflow-hidden shadow-2xl border-4"
                style={{ borderColor: 'var(--color-cream)' }}
              >
                <img
                  src="/images/gallery_spices.png"
                  alt="Artisanal spice arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Philosophy (Editorial Quote layout) */}
      <section 
        ref={philosophyRef}
        className="relative"
        style={{ 
          background: 'var(--color-beige)',
          paddingTop: '8rem',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase block mb-6" style={{ color: 'var(--color-terracotta)' }}>
              PHILOSOPHY OF CARE
            </span>
            <blockquote 
              className="font-display text-2xl md:text-4xl font-light italic leading-relaxed mb-8"
              style={{ color: 'var(--color-forest)' }}
            >
              "We do not inherit the earth from our ancestors; we borrow it from our children. At Tanah, our cooking is an act of stewardship and respect for the natural rhythms of life."
            </blockquote>
            <div className="w-12 h-px mx-auto my-6" style={{ background: 'var(--color-terracotta)' }} />
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--color-charcoal)' }}>
              Ancient Agrarian Wisdom
            </h3>
            <p className="text-xs font-light tracking-wider uppercase mt-1" style={{ color: 'var(--color-terracotta)' }}>
              Our guiding light since day one
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Mission (Editorial grid) */}
      <section 
        ref={sustainabilityRef}
        className="relative"
        style={{ 
          background: 'var(--color-cream)',
          paddingTop: '8rem',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Interactive Image */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -40 }}
              animate={isSustainabilityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="hover-zoom aspect-square overflow-hidden shadow-2xl relative">
                <img
                  src="/images/about_farm.png"
                  alt="Sustainable bio-farming soil and greens"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-forest opacity-10" />
              </div>
            </motion.div>

            {/* Right: Grid of Sustainability Accomplishments */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 40 }}
              animate={isSustainabilityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
                THE COMMITTMENT
              </span>
              <h2 
                className="font-display text-4xl font-bold mb-8 leading-tight"
                style={{ color: 'var(--color-forest)' }}
              >
                Sustainability Mission
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Leaf, title: 'Zero Food Waste', desc: 'Every vegetable scrap is fermented into premium broth, pickled, or composted back into agricultural soil.' },
                  { icon: Recycle, title: 'Plastic-Free Sourcing', desc: 'All kitchen ingredients are received in woven jute sacks, brass canisters, or reusable terracotta crates.' },
                  { icon: Award, title: 'Regenerative Agriculture', desc: 'Direct funding to farmers to encourage crop-rotation, preserving natural soil biodiversity.' },
                  { icon: Heart, title: 'Solar Powered Cooking', desc: 'Our tandoors and wood ovens operate in balance with green solar power grids to heat water and run machines.' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(27, 67, 50, 0.06)' }}>
                      <item.icon className="w-5 h-5" style={{ color: 'var(--color-forest)' }} />
                    </div>
                    <h4 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-forest)' }}>
                      {item.title}
                    </h4>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section 
        ref={timelineRef}
        className="relative"
        style={{ 
          background: 'var(--color-beige)',
          paddingTop: '8rem',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
              HISTORICAL LINE
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ color: 'var(--color-forest)' }}
            >
              Our Journey Timeline
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 max-w-3xl mx-auto pl-8 space-y-12" style={{ borderColor: 'rgba(27, 67, 50, 0.1)' }}>
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-[-41px] top-1.5 w-6 h-6 border-4 flex items-center justify-center rounded-full"
                  style={{ background: 'var(--color-beige)', borderColor: 'var(--color-terracotta)' }}
                />
                
                <span className="font-display text-3xl font-extrabold block mb-1" style={{ color: 'var(--color-terracotta)' }}>
                  {item.year}
                </span>
                <h4 className="font-display text-xl font-bold mb-2 text-forest-dark" style={{ color: 'var(--color-forest)' }}>
                  {item.title}
                </h4>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Meet Our Team */}
      <section 
        ref={teamRef}
        className="relative"
        style={{ 
          background: 'var(--color-cream)',
          paddingTop: '8rem',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
              PEOPLE BEHIND THE PLATES
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ color: 'var(--color-forest)' }}
            >
              Meet Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group"
              >
                <div className="hover-zoom aspect-[3/4] overflow-hidden mb-6 relative shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-forest opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                
                <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--color-forest)' }}>
                  {member.name}
                </h3>
                <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-terracotta)' }}>
                  {member.role}
                </p>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <VisitTanah />
    </main>
  )
}
