import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const designPrinciples = [
  { contrast: 'Handcrafted', over: 'over polished' },
  { contrast: 'Organic', over: 'over geometric' },
  { contrast: 'Warm', over: 'over minimal' },
  { contrast: 'Earth-inspired', over: 'over industrial' },
  { contrast: 'Storytelling', over: 'over advertising' },
  { contrast: 'Community', over: 'over exclusivity' },
]

export default function Philosophy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const principlesRef = useRef(null)
  const isPrinciplesInView = useInView(principlesRef, { once: true, margin: '-100px' })

  return (
    <>
      {/* ── Section 1: The Gathering Place Story ── */}
      <section
        id="philosophy"
        ref={containerRef}
        className="relative w-full bg-[#5E332E] text-[#F2E8D8] py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 via-transparent to-transparent pointer-events-none z-0" />

        <div className="max-width-container px-8 mx-auto relative z-10">

          {/* Official Opening Quote Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-[#F2E8D8]/60 block mb-6 font-body">
              GATHERING PLACE
            </span>
            <blockquote className="font-display leading-snug text-[#F2E8D8]" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
              "Birds find each other mid-flight, and so do we—at the bar, in the kitchen, over shared plates and poured stories."
            </blockquote>
            <DiamondDivider className="mt-8" color="var(--color-light-cream)" />
          </motion.div>

          {/* Two-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Block: The Story Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center text-left"
            >
              <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-[#F2E8D8]/60 block mb-4 font-body">
                OUR HERITAGE
              </span>

              <h2
                className="font-display font-light text-[#F2E8D8] leading-tight mb-8"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
              >
                THE TANAH STORY
              </h2>

              <div className="space-y-6 text-base font-light text-[#F2E8D8]/95 leading-relaxed font-body">
                {/* Etymology */}
                <div className="border-l-2 border-[#E5E2DC]/50 pl-5">
                  <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#E5E2DC] mb-1 font-body">Tanah — تناه — "Earth"</p>
                  <p className="text-sm opacity-85">
                    Grounding. Nourishment. Warmth. Belonging. Named after the word meaning "Earth", Tanah was born from the belief that humans—like birds—always seek a place to rest, reconnect, and belong.
                  </p>
                </div>

                <p className="font-semibold text-lg">
                  Tanah was born from that simple idea.
                </p>

                <p>
                  Tanah is designed as a gathering place where people come together beyond the everyday—to share exceptional food, celebrate moments, strengthen relationships, and create memories worth keeping.
                </p>

                <p>
                  Like a nest built branch by branch, every corner of Tanah has been thoughtfully created to make people feel welcome, comfortable, and connected.
                </p>

                {/* Brand Manifesto */}
                <div className="bg-[#F2E8D8]/10 border border-[#E5E2DC]/30 p-5 mt-2">
                  <p className="text-base font-display text-[#E5E2DC] leading-relaxed">
                    "We've built this place like birds build their nests—branch by branch, to make you feel at home."
                  </p>
                </div>

                <p className="text-xl font-display text-[#E5E2DC] pt-2">
                  Because the best moments are not planned.<br />
                  They happen around a table.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="btn-outline border-[#F2E8D8] text-[#F2E8D8] hover:bg-[#F2E8D8] hover:text-[#5E332E] py-3.5 px-8 text-[9px] tracking-[0.2em]"
                >
                  Discover Our Journey
                </Link>
              </div>
            </motion.div>

            {/* Right Block: Authentic Sanctuary Atmosphere Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center items-center relative"
            >
              <div className="aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#F2E8D8]/20 relative group">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-18.webp"
                  alt="Tanah Sanctuary gathering space"
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Design Principles ── */}
      <section
        ref={principlesRef}
        className="relative w-full bg-[#E5E2DC] py-16 border-t border-[#5E332E]/10 overflow-hidden"
      >
        <div className="max-width-container px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPrinciplesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-[#5E332E] block mb-2 font-body">
              DESIGN PRINCIPLES
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#5E332E]">How We Think</h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {designPrinciples.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isPrinciplesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border border-[#5E332E]/20 p-4 text-center group hover:bg-[#5E332E] hover:border-[#5E332E] transition-all duration-500"
              >
                <p className="font-display font-bold text-sm text-[#5E332E] group-hover:text-[#E5E2DC] transition-colors duration-500 uppercase tracking-wide">
                  {p.contrast}
                </p>
                <p className="text-[10px] text-[#1E1B18]/50 group-hover:text-[#E5E2DC]/60 transition-colors duration-500 mt-1 font-body">
                  {p.over}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
