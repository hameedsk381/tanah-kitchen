import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { 
  LogoOwl, 
  StoryNestOwl, 
  DiamondDivider, 
  WinkingOwl, 
  PartyOwl, 
  FoodOwl, 
  BambooOwl, 
  FlyingBird, 
  TribalDiamond 
} from '../components/illustrations'

export default function Home() {
  useEffect(() => {
    document.title = 'Tanah | Where Teams Gather, Conversations Flow'
    window.scrollTo(0, 0)
  }, [])

  // Refs for in-view animations
  const heroRef = useRef(null)
  const whyRef = useRef(null)
  const storyRef = useRef(null)
  const occasionsRef = useRef(null)
  const packagesRef = useRef(null)
  const hostRef = useRef(null)

  const isWhyInView = useInView(whyRef, { once: true, margin: '-100px' })
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })
  const isOccasionsInView = useInView(occasionsRef, { once: true, margin: '-100px' })
  const isPackagesInView = useInView(packagesRef, { once: true, margin: '-100px' })
  const isHostInView = useInView(hostRef, { once: true, margin: '-100px' })

  return (
    <main className="flex-grow bg-bg-primary overflow-x-hidden text-text-dark font-body select-none">
      <h1 className="sr-only">Tanah Company Profile - Premier Corporate Gathering Destination</h1>

      {/* ========================================================
          PAGE 1 & 2: HERO & COVER EXPERIENCE
          ======================================================== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-8 bg-bg-primary border-b border-accent/15 overflow-hidden"
      >
        {/* Background Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        {/* Decorative corner tribal borders */}
        <div className="absolute top-28 left-6 w-16 h-16 border-t-2 border-l-2 border-accent/25 pointer-events-none" />
        <div className="absolute top-28 right-6 w-16 h-16 border-t-2 border-r-2 border-accent/25 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-accent/25 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-accent/25 pointer-events-none" />

        {/* Floating background motifs */}
        <div className="absolute top-1/4 right-[10%] opacity-10 animate-[pulse_4s_ease-in-out_infinite]">
          <TribalDiamond className="w-24 h-24 text-accent" />
        </div>
        <div className="absolute bottom-1/4 left-[8%] opacity-10 animate-[pulse_5s_ease-in-out_infinite]">
          <TribalDiamond className="w-20 h-20 text-accent" />
        </div>

        {/* Top: Branding Stamp */}
        <div className="flex justify-center w-full z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center text-center gap-1.5"
          >
            <LogoOwl className="w-14 h-14 text-accent" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-muted-earth font-sans font-semibold">
              TANAH EST. 2024
            </span>
          </motion.div>
        </div>

        {/* Center: Editorial Cover Layout */}
        <div className="max-w-container mx-auto w-full z-10 my-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Typography Heading */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <span className="text-[11px] tracking-[0.4em] uppercase text-accent font-semibold font-sans block">
                  COMPANY PROFILE
                </span>
                
                <h2 className="font-display font-light text-text-dark leading-[1.1] tracking-tight"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}>
                  Where Teams Gather.<br />
                  <span className="italic text-accent">Conversations Flow.</span><br />
                  Connections Grow.
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.2 }}
                className="text-lg md:text-xl font-display italic text-muted-earth max-w-xl"
              >
                A place inspired by the earth, built for meaningful moments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <Link to="/book" className="btn-primary">
                  Host an Event
                </Link>
                <a href="#why-tanah" className="btn-outline">
                  View Profile
                </a>
              </motion.div>
            </div>

            {/* Asymmetrical Framed Image Spread */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              {/* Overlapping layout frame */}
              <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden shadow-2xl border-4 border-bg-secondary p-2 bg-bg-primary">
                <img 
                  src="/assets/Tanha Ambiance/Ambiance-11.webp" 
                  alt="Tanah architecture and atmospheric dining" 
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Overlay tribal motif */}
              <div className="absolute -bottom-6 -left-6 bg-bg-secondary p-4 rounded-none shadow-xl border border-accent/20 hidden md:block">
                <div className="flex items-center gap-3">
                  <FlyingBird className="w-10 h-10 text-accent animate-[bounce_3s_infinite]" />
                  <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-semibold text-text-dark">
                    ROOTED IN EARTH
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom: Tribal Divider */}
        <div className="w-full z-10">
          <DiamondDivider className="opacity-70" color="var(--color-accent)" />
        </div>
      </section>

      {/* ========================================================
          PAGE 3: WHY TANAH?
          ======================================================== */}
      <section 
        id="why-tanah"
        ref={whyRef}
        className="relative py-24 px-8 bg-bg-secondary border-b border-accent/15 overflow-hidden"
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Title & Structured Corporate Lists */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-sans font-bold block">
                  CORPORATE SOLUTIONS
                </span>
                <h3 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
                  Why Tanah?
                </h3>
                <p className="text-lg font-display italic text-muted-earth">
                  More than a venue. A place to build stronger teams.
                </p>
              </div>

              {/* Handcrafted checklist grid */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-6 border-y border-accent/15">
                {[
                  "Team Lunches & Dinners",
                  "Employee Engagement Events",
                  "Leadership Gatherings",
                  "Project Celebrations",
                  "Client Meetings",
                  "Annual Team Outings",
                  "Farewell & Welcome Events",
                  "Festival Celebrations",
                  "Informal Networking Sessions"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3.5 text-base text-text-dark/95">
                    <span className="text-accent text-sm">◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight callout box */}
              <div className="bg-bg-primary/60 p-6 border-l-4 border-accent relative shadow-sm">
                <p className="text-lg font-display text-text-dark leading-relaxed">
                  Whether it's a team of <span className="font-bold text-accent font-sans text-xl">10</span> or a celebration of <span className="font-bold text-accent font-sans text-xl">200</span>, Tanah creates experiences people remember.
                </p>
                <div className="absolute top-2 right-2 opacity-10">
                  <TribalDiamond className="w-12 h-12 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Layered Editorial Spreads */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isWhyInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-12 gap-4 relative"
            >
              {/* Outer frame */}
              <div className="col-span-7 aspect-[3/4] overflow-hidden shadow-xl border border-accent/15">
                <img 
                  src="/assets/Tanha Ambiance/Tanha Food/food-1.webp" 
                  alt="Team sharing food at Tanah" 
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>

              <div className="col-span-5 flex flex-col justify-between items-center py-6">
                <div className="animate-spin-slow">
                  <TribalDiamond className="w-16 h-16 text-accent" />
                </div>
                
                <div className="w-full aspect-[3/4] overflow-hidden shadow-xl border border-accent/15">
                  <img 
                    src="/assets/Tanha Ambiance/Ambiance-22.webp" 
                    alt="Rooftop ambiance" 
                    className="w-full h-full object-cover filter brightness-[0.9]"
                  />
                </div>
              </div>

              {/* Cultural border details */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-accent/20" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-accent/20" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 4: THE TANAH STORY
          ======================================================== */}
      <section 
        id="our-story"
        ref={storyRef}
        className="relative py-28 px-8 bg-bg-primary border-b border-accent/15 overflow-hidden"
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Block: Nested Owl Graphic representation */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5 flex justify-center items-center relative order-2 lg:order-1"
            >
              {/* Circular border lines mirroring nest */}
              <div className="absolute w-[85%] aspect-square rounded-full border border-accent/10 -z-0 animate-[spin_80s_linear_infinite]" />
              <div className="absolute w-[98%] aspect-square rounded-full border border-dashed border-accent/10 -z-0" />

              <div className="bg-bg-secondary/40 p-10 rounded-full border border-accent/10 shadow-lg z-10 backdrop-blur-sm">
                <StoryNestOwl className="w-64 h-64 md:w-80 md:h-80 text-accent" />
              </div>
            </motion.div>

            {/* Right Block: The Story Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2 z-10"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-sans font-bold block">
                THE TANAH STORY
              </span>
              
              <h3 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
                Rooted in Earth
              </h3>

              <div className="space-y-6 text-lg font-light text-text-dark/90 leading-relaxed font-body">
                <p className="text-xl md:text-2xl font-display italic text-accent border-b border-accent/10 pb-6">
                  "In nature, birds travel thousands of miles, yet always seek a place to rest, reconnect, and belong."
                </p>
                
                <p className="font-semibold text-lg text-accent">
                  Tanah was born from that simple idea.
                </p>
                
                <p>
                  Named after the word meaning "Earth", Tanah is designed as a gathering place where teams and professionals come together beyond the workplace to unwind after work, share exceptional food, celebrate achievements, strengthen relationships, and create memorable experiences.
                </p>
                
                <p>
                  Like a nest built branch by branch, every corner of Tanah has been thoughtfully created to make people feel welcome, comfortable, and connected.
                </p>

                <p className="text-xl md:text-2xl font-display italic text-accent pt-4 border-t border-accent/10">
                  Because the best teams are not built in meeting rooms.<br />
                  They are built around conversations.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 5: A SPACE DESIGNED FOR EVERY OCCASION
          ======================================================== */}
      <section 
        ref={occasionsRef}
        className="relative py-24 px-8 bg-bg-secondary border-b border-accent/15 overflow-hidden"
      >
        <div className="max-w-container mx-auto text-center space-y-16">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isOccasionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-sans font-bold block">
              GATHERING SPACES
            </span>
            <h3 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
              A Space Designed for Every Occasion
            </h3>
            <p className="text-base font-display italic text-muted-earth">
              At Tanah, every gathering becomes a story worth sharing. Because every great gathering deserves the right setting.
            </p>
          </motion.div>

          {/* Staggered Editorial Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                title: "Team Bonding",
                desc: "Celebrate milestones, project completions, and achievements.",
                icon: PartyOwl,
                color: "text-accent"
              },
              {
                title: "Leadership Dinners",
                desc: "Host meaningful conversations with key stakeholders.",
                icon: LogoOwl,
                color: "text-muted-earth"
              },
              {
                title: "Client Entertainment",
                desc: "Impress clients in a refined yet relaxed setting.",
                icon: BambooOwl,
                color: "text-accent"
              },
              {
                title: "Employee Recognition",
                desc: "Reward teams with memorable experiences.",
                icon: FoodOwl,
                color: "text-muted-earth"
              },
              {
                title: "Seasonal Celebrations",
                desc: "Create moments employees genuinely look forward to.",
                icon: WinkingOwl,
                color: "text-accent"
              }
            ].map((occ, idx) => {
              const IconComp = occ.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isOccasionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="bg-bg-primary border border-accent/15 p-8 flex flex-col items-center justify-between text-center relative group hover:border-accent transition-all duration-500 shadow-sm"
                >
                  {/* Small corners */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/20 group-hover:border-accent transition-colors" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/20 group-hover:border-accent transition-colors" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/20 group-hover:border-accent transition-colors" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/20 group-hover:border-accent transition-colors" />

                  <div className="space-y-4">
                    <div className="p-3 bg-bg-secondary rounded-none inline-block border border-accent/10 group-hover:border-accent/40 transition-colors">
                      <IconComp className="w-12 h-12 text-accent" />
                    </div>
                    <h4 className="font-display text-xl text-text-dark group-hover:text-accent transition-colors">
                      {occ.title}
                    </h4>
                  </div>
                  <p className="text-xs font-sans text-text-dark/75 leading-relaxed mt-4 font-light">
                    {occ.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Large scenic background layout banner */}
          <div className="relative w-full aspect-[21/9] overflow-hidden border border-accent/20 shadow-2xl p-1 bg-bg-primary">
            <img 
              src="/assets/Tanha Ambiance/Ambiance-26.webp" 
              alt="Beautiful custom ceiling and seating landscape" 
              className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-dark/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[9px] tracking-[0.3em] font-sans font-semibold text-bg-primary block mb-1">
                TANAH SPACES
              </span>
              <span className="font-display italic text-lg text-bg-primary">
                A setting designed for collaboration and flow.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 6: CUSTOMIZED CORPORATE PACKAGES
          ======================================================== */}
      <section 
        ref={packagesRef}
        className="relative py-28 px-8 bg-bg-primary border-b border-accent/15 overflow-hidden"
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Block: The Package Details */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPackagesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-sans font-bold block">
                  BESPOKE EXPERIENCES
                </span>
                <h3 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
                  Customized Corporate Packages
                </h3>
                <p className="text-lg font-display italic text-muted-earth">
                  We understand that every organization is unique.
                </p>
              </div>

              <p className="text-base text-text-dark/80 leading-relaxed font-body">
                Our dedicated experiences team works closely with corporate partners to orchestrate bespoke, tailor-made corporate events and packages.
              </p>

              {/* Package category blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-accent/15 bg-bg-secondary/20 space-y-3">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-accent">
                    Flexible Options
                  </span>
                  <ul className="space-y-2 text-sm text-text-dark/90 font-light">
                    <li>✦ Team Lunch Packages</li>
                    <li>✦ Team Dinner Packages</li>
                    <li>✦ Happy Hour Packages</li>
                    <li>✦ Exclusive Area Booking</li>
                    <li>✦ Full Venue Buyouts</li>
                  </ul>
                </div>

                <div className="p-6 border border-accent/15 bg-bg-secondary/20 space-y-3">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-accent">
                    Event Curation
                  </span>
                  <ul className="space-y-2 text-sm text-text-dark/90 font-light">
                    <li>✦ Customized Menus</li>
                    <li>✦ Custom Branding Opportunities</li>
                    <li>✦ Entertainment & Engagement Add-ons</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-accent/15">
                <p className="text-sm font-display italic text-accent">
                  We handle the experience so you can focus on your people.
                </p>
              </div>
            </motion.div>

            {/* Right Block: Image Composition */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={isPackagesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl border border-accent/20 p-2 bg-bg-secondary">
                <img 
                  src="/assets/Tanha Ambiance/Ambiance-25.webp" 
                  alt="Exclusive corporate booking setup" 
                  className="w-full h-full object-cover filter brightness-[0.9]"
                />
              </div>
              
              {/* Tribal decorative corners on right image block */}
              <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-accent" />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-accent" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 7: GATHERING CALL TO ACTION
          ======================================================== */}
      <section 
        id="book-event"
        ref={hostRef}
        className="relative py-24 px-8 bg-bg-secondary overflow-hidden"
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Block: Image collage */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isHostInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4 }}
              className="lg:col-span-5 grid grid-cols-12 gap-4 relative"
            >
              <div className="col-span-12 aspect-[4/3] overflow-hidden shadow-xl border border-accent/15">
                <img 
                  src="/assets/Tanha Ambiance/Ambiance-10.webp" 
                  alt="Corporate gathering layout at Tanah" 
                  className="w-full h-full object-cover filter brightness-[0.93]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15">
                <TribalDiamond className="w-full h-full text-accent" />
              </div>
            </motion.div>

            {/* Right Block: Heading & Features Checklist */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isHostInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-sans font-bold block">
                  LET'S CONNECT
                </span>
                <h3 className="font-display font-light text-text-dark text-4xl md:text-5xl leading-tight">
                  Let's Host Your Next Team Gathering
                </h3>
                <p className="text-base text-text-dark/80 max-w-xl">
                  Whether you're planning a casual team outing, a client dinner, a leadership gathering, or a company-wide celebration, Tanah provides the perfect setting for meaningful experiences.
                </p>
              </div>

              {/* Grid of features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm font-semibold tracking-wide text-text-dark/90">
                {[
                  "Premium yet approachable atmosphere",
                  "Convenient location for corporate teams",
                  "Curated food and beverage experiences",
                  "Flexible event formats",
                  "Dedicated event support",
                  "Memorable ambiance",
                  "Ideal for team bonding and networking",
                  "Seamless planning experience"
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-accent text-[12px]">✦</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Callout & Button */}
              <div className="pt-6 border-t border-accent/15 space-y-6">
                <p className="text-xl font-display italic text-accent">
                  Because stronger teams start with stronger connections.
                </p>
                <div className="flex gap-4">
                  <Link to="/book" className="btn-primary">
                    Book Event Now
                  </Link>
                  <Link to="/contact" className="btn-outline">
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Decorative Tribal Border Strip before footer */}
      <div className="w-full bg-bg-primary py-2 border-t border-accent/15">
        <DiamondDivider color="var(--color-accent)" className="my-0" />
      </div>
    </main>
  )
}
