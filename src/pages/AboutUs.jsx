import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import aboutData from '../data/about.json'

export default function AboutUs() {
  useEffect(() => {
    document.title = 'Philosophy | Tanah Kitchen & Bar'
    window.scrollTo(0, 0)
  }, [])

  const storyRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })

  const philosophyRef = useRef(null)
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: '-100px' })

  const quoteRef = useRef(null)
  const isQuoteInView = useInView(quoteRef, { once: true, margin: '-100px' })

  const sustainabilityRef = useRef(null)
  const isSustainabilityInView = useInView(sustainabilityRef, { once: true, margin: '-100px' })

  const teamRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' })

  const journeyRef = useRef(null)
  const isJourneyInView = useInView(journeyRef, { once: true, margin: '-100px' })

  return (
    <main className="flex-grow pt-24 bg-bg-primary overflow-hidden text-warm-ivory">
      
      {/* Editorial Page Header */}
      <section className="relative py-[10rem] flex items-center justify-center border-b border-terracotta/10">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/assets/Ambiance/TANAH_Amb01029.jpg"
            alt="Lush agricultural landscape"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-8 max-w-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-6">
            The Chronicle
          </span>
          <h1 
            className="font-display font-light text-warm-ivory leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Rooted in Earth, <br />
            <span className="italic text-copper">Choreographed by Fire</span>
          </h1>
        </div>
      </section>

      {/* Story Spread */}
      <section 
        ref={storyRef}
        className="relative py-[var(--spacing-section)] bg-bg-primary"
      >
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              className="lg:col-span-5 space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
                {aboutData.story.subtitle}
              </span>
              <h2 className="font-display font-light text-warm-ivory text-4xl md:text-5xl leading-tight">
                {aboutData.story.title}
              </h2>
              <p className="text-sm font-light text-sand-beige leading-relaxed">
                {aboutData.story.paragraph1}
              </p>
              <p className="text-sm font-light text-sand-beige leading-relaxed">
                {aboutData.story.paragraph2}
              </p>
            </motion.div>

            {/* Asymmetrical Image Frame */}
            <motion.div 
              className="lg:col-span-7 relative hover-zoom"
              initial={{ opacity: 0, scale: 0.98, x: 30 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-bg-secondary relative">
                <img
                  src={aboutData.story.image}
                  alt={aboutData.story.title}
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
              </div>
              <div className="absolute inset-4 border border-terracotta/20 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-terracotta/5 -z-10 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Philosophy Spread */}
      <section 
        ref={philosophyRef}
        className="relative py-[var(--spacing-section)] bg-bg-secondary"
      >
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Image Frame */}
            <motion.div 
              className="lg:col-span-7 relative hover-zoom order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.98, x: -30 }}
              animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-bg-primary relative">
                <img
                  src={aboutData.philosophy.image}
                  alt="Philosophy visual"
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
              </div>
              <div className="absolute inset-4 border border-terracotta/20 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-full h-full border border-terracotta/5 -z-10 pointer-events-none" />
            </motion.div>

            <motion.div 
              className="lg:col-span-5 space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, y: 40 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
                {aboutData.philosophy.subtitle}
              </span>
              <h2 className="font-display font-light text-warm-ivory text-4xl md:text-5xl leading-tight">
                {aboutData.philosophy.title} <span className="italic text-copper">{aboutData.philosophy.titleItalic}</span>
              </h2>
              <p className="text-sm font-light text-sand-beige leading-relaxed">
                {aboutData.philosophy.paragraph1}
              </p>
              <p className="text-sm font-light text-sand-beige leading-relaxed">
                {aboutData.philosophy.paragraph2}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section 
        ref={quoteRef}
        className="relative py-[var(--spacing-section)] bg-bg-primary"
      >
        <div className="max-w-[900px] px-8 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isQuoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
              {aboutData.quoteSection.subtitle}
            </span>
            <blockquote className="font-display font-light text-warm-ivory text-2xl md:text-4xl italic leading-relaxed">
              "{aboutData.quoteSection.quote}"
            </blockquote>
            <div className="w-16 h-px mx-auto bg-terracotta/30" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-copper font-medium">
              {aboutData.quoteSection.author}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section 
        ref={sustainabilityRef}
        className="relative py-[var(--spacing-section)] bg-bg-secondary"
      >
        <div className="max-w-container px-8 mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block">
              Circularity
            </span>
            <h2 className="font-display font-light text-warm-ivory text-4xl md:text-5xl leading-tight">
              {aboutData.sustainability.title}
            </h2>
            <p className="text-sm font-light text-sand-beige leading-relaxed">
              {aboutData.sustainability.paragraph}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {aboutData.sustainability.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isSustainabilityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="space-y-4 border-t border-terracotta/20 pt-8"
              >
                <h3 className="font-display text-2xl font-light text-copper">{item.title}</h3>
                <p className="text-xs font-light text-sand-beige leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="relative py-[var(--spacing-section)] bg-bg-primary"
      >
        <div className="max-w-container px-8 mx-auto space-y-16">
          <div className="text-center">
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
              Curation Desk
            </span>
            <h2 className="font-display font-light text-warm-ivory text-4xl md:text-5xl">
              Meet the Artisans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {aboutData.team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: idx * 0.2 }}
                className="space-y-6 group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-bg-secondary relative hover-zoom">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-102"
                  />
                  <div className="absolute inset-4 border border-terracotta/15 pointer-events-none" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-copper">{member.role}</span>
                  <h3 className="font-display text-3xl font-light text-warm-ivory">{member.name}</h3>
                  <p className="text-xs font-light text-sand-beige leading-relaxed">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section 
        ref={journeyRef}
        className="relative py-[var(--spacing-section)] bg-bg-secondary border-t border-terracotta/10"
      >
        <div className="max-w-container px-8 mx-auto space-y-16">
          <div className="text-center">
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
              Chronology
            </span>
            <h2 className="font-display font-light text-warm-ivory text-4xl md:text-5xl">
              Our Journey Timeline
            </h2>
          </div>

          <div className="relative border-l border-terracotta/20 max-w-3xl mx-auto pl-8 space-y-12">
            {aboutData.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isJourneyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative space-y-2"
              >
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-bg-secondary border border-terracotta rounded-full animate-pulse-slow" />
                <span className="font-display text-2xl text-copper font-light block">{item.year}</span>
                <h4 className="font-display text-xl text-warm-ivory font-light">{item.title}</h4>
                <p className="text-xs font-light text-sand-beige leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
