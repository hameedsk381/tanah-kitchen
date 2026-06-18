import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const experiences = [
  {
    num: "01",
    title: "Rooftop Embers & Basalt Hearth",
    desc: "An open-air culinary experience where native wood fires flame-grill seasonal harvest under Gachibowli’s night skies. Savor progressive platings served on raw basalt slate.",
    image: "/assets/Tanha Ambiance/Ambiance-19.webp",
    tag: "FIRE & SKY"
  },
  {
    num: "02",
    title: "Fermented Elixirs & Botanicals",
    desc: "A curated ritual of native tonics, house-made vinegars, and forest honey infusions. Poured in custom architectural ceramics in our glass atrium lounge.",
    image: "/assets/Tanha Ambiance/Ambiance-13.webp",
    tag: "ATRIUM & ALCHEMY"
  },
  {
    num: "03",
    title: "The Gallery Dining Salon",
    desc: "Dine in an environment where modern Indian painting, sculptural clay molding, and gastronomy converge. A collaborative experience featuring seasonal art installations.",
    image: "/assets/Tanha Ambiance/Ambiance-25.webp",
    tag: "ART & CULTURE"
  }
]

export default function SignatureExperiences() {
  return (
    <section id="experiences" className="relative w-full bg-bg-primary">
      <div className="py-24 text-center max-w-container px-8 mx-auto">
        <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
          ATMOSPHERE & SPACES
        </span>
        <h2 className="font-display font-light text-warm-ivory" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
          Signature Spaces
        </h2>
      </div>

      {/* Full-bleed panels */}
      <div className="w-full">
        {experiences.map((exp, idx) => {
          const containerRef = useRef(null)
          const { scrollYProgress } = useScroll({
            target: containerRef,
            offset: ["start end", "end start"]
          })

          // Parallax effect on image
          const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

          return (
            <div
              key={exp.num}
              ref={containerRef}
              className="relative min-h-[80vh] lg:h-[80vh] w-full overflow-hidden flex items-center border-b border-bg-primary py-16 lg:py-0"
            >
              {/* Parallax Background Image */}
              <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/50 to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Typography overlay */}
              <div className="max-w-container px-8 mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tracking-widest text-copper">
                      {exp.tag}
                    </span>
                    <span className="w-6 h-[1px] bg-terracotta" />
                    <span className="font-display text-2xl font-light text-warm-ivory/45">
                      {exp.num}
                    </span>
                  </div>

                  <h3 className="font-display font-light text-warm-ivory text-3xl md:text-5xl leading-tight">
                    {exp.title}
                  </h3>

                  <p className="text-sm font-light text-sand-beige/90 leading-relaxed max-w-lg">
                    {exp.desc}
                  </p>
                </div>
              </div>

              {/* Frame details */}
              <div className="absolute inset-8 border border-warm-ivory/5 pointer-events-none" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
