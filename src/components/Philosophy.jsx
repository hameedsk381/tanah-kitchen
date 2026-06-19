import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { StoryNestOwl, DiamondDivider } from './illustrations'

export default function Philosophy() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-[#882B06] text-[#F2E8D8] py-24 md:py-32 overflow-hidden"
    >
      {/* Background Tribal Mural Overlay effect */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,100 L150,100 M100,50 L100,150 M300,200 L400,250 M500,80 L550,150 M700,300 C650,250 600,300 580,350 M250,550 L350,550 M300,500 L300,600 M600,600 L680,680 M100,650 C120,600 180,620 200,680' stroke='%23ffffff' stroke-width='3' stroke-linecap='round' fill='none'/%3E%3Ccircle cx='450' cy='450' r='40' stroke='%23ffffff' stroke-width='3' fill='none'/%3E%3Cpath d='M450,380 L450,420 M450,480 L450,520 M380,450 L420,450 M480,450 L520,450' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }} 
      />
      {/* Dark earth gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 via-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-container px-8 mx-auto relative z-10">
        
        {/* Two-Column Editorial Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: The Story Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-bg-secondary block mb-4 font-body opacity-90">
              OUR HERITAGE
            </span>
            
            <h2 
              className="font-display font-light text-bg-primary leading-tight mb-8" 
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              THE TANAH STORY
            </h2>

            <div className="space-y-6 text-base font-light text-bg-primary/95 leading-relaxed font-body">
              <p className="text-xl italic font-display text-bg-secondary">
                In nature, birds travel thousands of miles, yet always seek a place to rest, reconnect, and belong.
              </p>
              
              <p className="font-semibold text-lg">
                Tanah was born from that simple idea.
              </p>
              
              <p>
                Named after the word meaning "Earth", Tanah is designed as a gathering place where teams and professionals come together beyond the workplace to unwind after work, share exceptional food, celebrate achievements, strengthen relationships, and create memorable experiences.
              </p>
              
              <p>
                Like a nest built branch by branch, every corner of Tanah has been thoughtfully created to make people feel welcome, comfortable, and connected.
              </p>

              <p className="text-xl font-display text-bg-secondary italic pt-4">
                Because the best teams are not built in meeting rooms.<br />
                They are built around conversations.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/about"
                className="btn-outline border-bg-primary text-bg-primary hover:bg-bg-primary hover:text-terracotta py-3.5 px-8 text-[9px] tracking-[0.2em]"
              >
                Discover Our Journey
              </Link>
            </div>
          </motion.div>

          {/* Right Block: Large Handcrafted Story Owl Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Round border element representing a nest or halo */}
            <div className="absolute w-[80%] aspect-square rounded-full border border-bg-secondary/25 -z-10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[95%] aspect-square rounded-full border border-dashed border-bg-secondary/15 -z-10" />

            <div className="bg-bg-secondary/10 p-6 md:p-8 rounded-full backdrop-blur-sm border border-bg-secondary/20 shadow-2xl">
              <StoryNestOwl className="w-64 h-64 md:w-80 md:h-80 text-bg-secondary" color="var(--color-bg-secondary)" />
            </div>

            {/* Tribal diamond details at corners */}
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-r-2 border-b-2 border-bg-secondary opacity-60" />
            <div className="absolute -top-4 -left-4 w-6 h-6 border-l-2 border-t-2 border-bg-secondary opacity-60" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
