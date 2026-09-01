import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const occasions = [
  {
    title: "Team Bonding Events",
    desc: "Celebrate milestones, project completions, and achievement"
  },
  {
    title: "Leadership Dinners",
    desc: "Host meaningful conversations with key stakeholders."
  },
  {
    title: "Client Entertainment",
    desc: "Impress clients in a refined yet relaxed setting."
  },
  {
    title: "Employee Recognition Programs",
    desc: "Reward teams with memorable experiences."
  },
  {
    title: "Festival & Seasonal Celebrations",
    desc: "Create moments employees genuinely look forward to"
  }
]

export default function SignatureExperiences() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experiences" ref={ref} className="relative w-full bg-[#E8D8C0] py-24 overflow-hidden">
      <div className="max-width-container px-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Block: Terracotta Occasion Card (Page 5 left column) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-[#5E332E] text-[#F2E8D8] p-8 md:p-12 shadow-2xl flex flex-col justify-between relative border border-[#4A2420]"
          >
            {/* Background pattern details */}
            <div className="absolute top-0 bottom-0 right-4 w-[2px] bg-[#F2E8D8]/10 flex flex-col justify-around py-8 items-center">
              <span className="w-1.5 h-1.5 rotate-45 border border-[#F2E8D8]/30" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#F2E8D8]/30" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#F2E8D8]/30" />
            </div>

            <div>
              <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-bg-secondary block mb-4 opacity-95">
                CURATED EVENTS
              </span>

              <h2 className="font-display font-light text-bg-primary leading-tight mb-10" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
                A SPACE DESIGNED FOR<br />
                EVERY OCCASION
              </h2>

              <div className="space-y-6 max-w-lg">
                {occasions.map((occ, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-bg-secondary/15 pb-4 last:border-b-0">
                    <span className="font-display text-lg text-bg-secondary min-w-[24px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-bg-primary">{occ.title}</h4>
                      <p className="text-sm font-light text-bg-secondary/90 leading-relaxed mt-1">{occ.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-bg-secondary/15">
              <p className="text-base font-display text-bg-secondary">
                At Tanah, every gathering becomes a story worth sharing. Because every great gathering deserves the right setting.
              </p>
            </div>
          </motion.div>

          {/* Right Block: Image with vertical tribal detail on side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col justify-between"
          >
            <div className="aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden relative shadow-xl border border-dark-brown/10">
              <img
                src="/assets/Tanha Ambiance/Ambiance-25.webp"
                alt="Tanah roof dining night view"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/50 to-transparent pointer-events-none" />
            </div>

            {/* Detail underneath the image */}
            <div className="flex items-center justify-between mt-8">
              <div>
                <h4 className="font-display text-lg font-bold uppercase tracking-wider text-text-dark">Corporate Gathering</h4>
                <p className="text-xs text-accent tracking-widest font-mono uppercase">Scale from 10 to 200 Guests</p>
              </div>

              <div className="hidden sm:flex gap-1 text-[#5E332E] opacity-75">
                <span>◇</span><span>.</span><span>◇</span><span>.</span><span>◇</span><span>.</span><span>◇</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
