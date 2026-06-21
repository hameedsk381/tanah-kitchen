import React from 'react'

// 1. Logo Owl: Central brand identity owl sitting on branch holding a leaf/twig with a glass/cup next to it
export const LogoOwl = ({ className = "w-24 h-24", color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head & Body Outline (Artistic, slightly rough hand-drawn look) */}
    <path d="M60,110 C60,50 140,50 140,110 C140,150 120,160 100,160 C80,160 60,150 60,110 Z" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

    {/* Large Single Tribal Eye (Inspired by the profile's stylized one-eyed owl designs) */}
    <circle cx="100" cy="95" r="24" stroke={color} strokeWidth="5" />
    <circle cx="100" cy="95" r="10" fill={color} />

    {/* Brow / Feather detail above eye */}
    <path d="M75,65 C85,60 115,60 125,65" stroke={color} strokeWidth="5" strokeLinecap="round" />

    {/* Branch the owl sits on */}
    <path d="M30,165 L170,165" stroke={color} strokeWidth="7" strokeLinecap="round" />
    {/* Branch details (small twigs) */}
    <path d="M45,165 L35,175" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d="M150,165 L165,155" stroke={color} strokeWidth="5" strokeLinecap="round" />

    {/* Beak / Twig held in beak */}
    <path d="M85,100 L70,95 L85,90" stroke={color} strokeWidth="4" fill="none" />
    {/* Stylized leafy twig held in beak */}
    <path d="M70,95 L40,80" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M45,82 C42,75 48,72 52,78 C56,72 62,75 59,82" stroke={color} strokeWidth="3" fill={color} />

    {/* Cup / Chalice next to the owl (as seen in logo) */}
    <path d="M125,165 L125,145 M115,145 L135,145 M115,120 L135,120 L130,145 L120,145 Z" stroke={color} strokeWidth="4" fill="none" />
    {/* Small steam or liquid drop */}
    <path d="M125,110 C123,115 127,115 125,120" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
)

// 2. Story Nest Owl: Owl perched on branch holding twig/leaf next to its nest basket
export const StoryNestOwl = ({ className = "w-48 h-48", color = "currentColor" }) => (
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Owl Body */}
    <path d="M110,130 C110,70 185,70 185,130 C185,170 165,180 147,180 C130,180 110,170 110,130 Z" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

    {/* Tribal Eye */}
    <circle cx="147" cy="115" r="22" stroke={color} strokeWidth="5" />
    <circle cx="147" cy="115" r="9" fill={color} />
    <path d="M125,88 C135,83 160,83 170,88" stroke={color} strokeWidth="5" strokeLinecap="round" />

    {/* Beak & Twig */}
    <path d="M135,120 L120,115 L135,110" stroke={color} strokeWidth="4" />
    <path d="M120,115 L95,95" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M102,100 C98,92 105,88 110,95 M92,102 C86,96 92,90 98,96" stroke={color} strokeWidth="3" fill={color} />

    {/* Nest (woven basket layout on left branch) */}
    <path d="M25,120 C25,160 85,160 85,120 Z" stroke={color} strokeWidth="5" fill="none" />
    {/* Woven lines in nest */}
    <path d="M30,130 Q55,150 80,130" stroke={color} strokeWidth="3" />
    <path d="M35,140 Q55,155 75,140" stroke={color} strokeWidth="3" />
    <path d="M55,120 L55,155 M40,125 L45,150 M70,125 L65,150" stroke={color} strokeWidth="3" />

    {/* Branch supporting nest and owl */}
    <path d="M15,180 L205,180" stroke={color} strokeWidth="7" strokeLinecap="round" />
    <path d="M100,180 C80,160 65,145 65,120" stroke={color} strokeWidth="5" />
    <path d="M85,180 L95,195" stroke={color} strokeWidth="4" />
  </svg>
)

// 3. Diamond Divider: Repeating diamond dot motif
export const DiamondDivider = ({ className = "w-full my-4", color = "#882B06" }) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <span className="h-[1px] flex-grow bg-current opacity-30" style={{ color }} />
    <div className="flex items-center gap-1.5" style={{ color }}>
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="rotate-45">
        <rect width="8" height="8" x="1" y="1" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-currentColor opacity-60" />
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="rotate-45">
        <rect width="8" height="8" x="1" y="1" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-currentColor opacity-60" />
      <svg width="18" height="18" viewBox="0 0 10 10" fill="none" className="rotate-45">
        <rect width="8" height="8" x="1" y="1" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-currentColor opacity-60" />
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="rotate-45">
        <rect width="8" height="8" x="1" y="1" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-currentColor opacity-60" />
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="rotate-45">
        <rect width="8" height="8" x="1" y="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
    <span className="h-[1px] flex-grow bg-current opacity-30" style={{ color }} />
  </div>
)

// 4. Winking Owl: A cute winking owl bird with music notes and stars (Page 1)
export const WinkingOwl = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path d="M35,65 C35,30 85,30 85,65 C85,90 75,95 60,95 C45,95 35,90 35,65 Z" stroke={color} strokeWidth="4" />
    {/* Winking Eye Left */}
    <path d="M45,55 Q52,62 60,55" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Open Eye Right */}
    <circle cx="75" cy="55" r="10" stroke={color} strokeWidth="3" />
    <circle cx="75" cy="55" r="4" fill={color} />
    {/* Beak */}
    <path d="M60,63 L56,69 L64,69 Z" fill={color} />
    {/* Feet */}
    <path d="M48,95 L45,102 M52,95 L52,102 M68,95 L68,102 M72,95 L75,102" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Music Note */}
    <path d="M92,35 L92,50 M92,40 L102,36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="88" cy="50" r="4" fill={color} />
    {/* Little Star */}
    <path d="M22,35 L26,38 L31,35 L28,40 L31,45 L26,42 L22,45 L24,40 Z" fill={color} />
  </svg>
)

// 5. Party Owl: Owl with party hat and balloons (Page 1)
export const PartyOwl = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path d="M35,70 C35,38 85,38 85,70 C85,95 75,100 60,100 C45,100 35,95 35,70 Z" stroke={color} strokeWidth="4" />
    {/* Eyes */}
    <circle cx="48" cy="62" r="8" stroke={color} strokeWidth="3" />
    <circle cx="48" cy="62" r="3" fill={color} />
    <circle cx="72" cy="62" r="8" stroke={color} strokeWidth="3" />
    <circle cx="72" cy="62" r="3" fill={color} />
    {/* Beak */}
    <path d="M60,68 L56,74 L64,74 Z" fill={color} />
    {/* Party Hat */}
    <path d="M50,42 L60,18 L70,42 Z" stroke={color} strokeWidth="3" fill="none" />
    <circle cx="60" cy="15" r="4" fill={color} />
    {/* Balloon */}
    <circle cx="18" cy="45" r="10" stroke={color} strokeWidth="3" />
    <path d="M18,55 Q18,65 24,75" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Balloon 2 */}
    <circle cx="102" cy="50" r="8" stroke={color} strokeWidth="3" />
    <path d="M102,58 Q102,68 96,78" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 6. Food Owl: Owl with a plate of fruits/food (Page 1)
export const FoodOwl = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path d="M35,60 C35,28 85,28 85,60 C85,85 75,90 60,90 C45,90 35,85 35,60 Z" stroke={color} strokeWidth="4" />
    {/* One Tribal Eye */}
    <circle cx="60" cy="48" r="14" stroke={color} strokeWidth="4" />
    <circle cx="60" cy="48" r="6" fill={color} />
    {/* Beak */}
    <path d="M60,62 L56,66 L64,66 Z" fill={color} />
    {/* Plate & Food */}
    <path d="M25,95 L95,95" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <circle cx="45" cy="88" r="5" fill={color} />
    <circle cx="60" cy="86" r="7" fill={color} />
    <circle cx="75" cy="88" r="5" fill={color} />
  </svg>
)

// 7. Bamboo Owl: Owl sitting on bamboo shoots (Page 1)
export const BambooOwl = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path d="M40,55 C40,25 90,25 90,55 C90,80 80,85 65,85 C50,85 40,80 40,55 Z" stroke={color} strokeWidth="4" />
    {/* Tribal Eye */}
    <circle cx="65" cy="48" r="12" stroke={color} strokeWidth="3.5" />
    <circle cx="65" cy="48" r="5" fill={color} />
    {/* Beak */}
    <path d="M50,52 L44,55 L50,58 Z" fill={color} />
    {/* Bamboo Stalks */}
    <path d="M20,105 L20,40" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M20,80 L35,70" stroke={color} strokeWidth="3" />
    <path d="M15,80 L25,80 M15,55 L25,55" stroke={color} strokeWidth="3" />
    {/* Horizontal Bamboo branch owl sits on */}
    <path d="M15,90 L105,90" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d="M80,90 L95,105" stroke={color} strokeWidth="3" />
  </svg>
)

// 8. Flying Bird: Flying bird/owl carrying twig (Page 1)
export const FlyingBird = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <path d="M35,60 C35,45 65,40 85,55 C95,62 90,75 75,75 C60,75 45,72 35,60 Z" stroke={color} strokeWidth="4" />
    {/* Wings */}
    <path d="M55,45 L35,20 L50,38 Z" stroke={color} strokeWidth="3.5" fill="none" />
    <path d="M68,50 L88,25 L73,43 Z" stroke={color} strokeWidth="3.5" fill="none" />
    {/* Eye */}
    <circle cx="78" cy="58" r="4" fill={color} />
    {/* Beak & Twig */}
    <path d="M88,60 L98,62" stroke={color} strokeWidth="3" />
    <path d="M96,62 L110,54" stroke={color} strokeWidth="2.5" />
    <path d="M102,58 C102,54 106,54 108,58" stroke={color} strokeWidth="2" fill={color} />
  </svg>
)

// 9. Tribal Diamond: Standalone graphic symbol (Page 3)
export const TribalDiamond = ({ className = "w-20 h-20", color = "#882B06" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ color }}>
    {/* Outer Diamond */}
    <path d="M50,10 L90,50 L50,90 L10,50 Z" stroke="currentColor" strokeWidth="4" />
    {/* Inner Diamond */}
    <path d="M50,25 L75,50 L50,75 L25,50 Z" stroke="currentColor" strokeWidth="3" />
    {/* Center Core */}
    <rect x="44" y="44" width="12" height="12" transform="rotate(45 50 50)" fill="currentColor" />

    {/* Tribal spike marks around the outer diamond */}
    <path d="M50,10 L50,2 M90,50 L98,50 M50,90 L50,98 M10,50 L2,50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M30,30 L24,24 M70,30 L76,24 M70,70 L76,76 M30,70 L24,76" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)

// 10. Horizontal Row of Owls and Figures (As seen on Cover Page 1)
export const TribalMuralBanner = ({ className = "w-full", color = "#882B06" }) => (
  <div className={`flex flex-col items-center gap-4 ${className}`}>
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12" style={{ color }}>
      <div className="flex items-center gap-2">
        <LogoOwl className="w-12 h-12" color="currentColor" />
      </div>
      <div className="hidden sm:block text-2xl opacity-40">◇</div>
      <div className="flex items-center gap-2">
        <PartyOwl className="w-12 h-12" color="currentColor" />
      </div>
      <div className="hidden sm:block text-2xl opacity-40">◇</div>
      <div className="flex items-center gap-2">
        <FoodOwl className="w-12 h-12" color="currentColor" />
      </div>
      <div className="hidden sm:block text-2xl opacity-40">◇</div>
      <div className="flex items-center gap-2">
        <WinkingOwl className="w-12 h-12" color="currentColor" />
      </div>
      <div className="hidden sm:block text-2xl opacity-40">◇</div>
      <div className="flex items-center gap-2">
        <BambooOwl className="w-12 h-12" color="currentColor" />
      </div>
      <div className="hidden sm:block text-2xl opacity-40">◇</div>
      <div className="flex items-center gap-2">
        <FlyingBird className="w-12 h-12" color="currentColor" />
      </div>
    </div>
    <DiamondDivider className="w-full" color={color} />
  </div>
)

// 11. Diamond-in-Diamond Corner Ornament Icon (looks like a target made of crossed lines and nested diamonds)
export const DiamondCornerOrnament = ({ className = "w-12 h-12", color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crossed lines (target style) */}
    <path d="M50 5 L50 95 M5 50 L95 50" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 18 L82 82 M18 82 L82 18" stroke={color} strokeWidth="1.5" strokeDasharray="3,3" strokeLinecap="round" />
    
    {/* Nested diamonds */}
    <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M50 30 L70 50 L50 70 L30 50 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    
    {/* Central target core */}
    <circle cx="50" cy="50" r="5" fill={color} />
    <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="1" />
  </svg>
)

