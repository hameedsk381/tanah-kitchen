import React from 'react'

export const LogoOwl = ({ className = "w-24 h-24", color = "currentColor" }) => (
  <img src="/assets/logo.png" alt="Tanah Logo" className={className} />
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
export const DiamondDivider = ({ className = "w-full my-4", color = "currentColor" }) => (
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
export const TribalDiamond = ({ className = "w-20 h-20", color = "currentColor" }) => (
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
export const TribalMuralBanner = ({ className = "w-full", color = "currentColor" }) => (
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

// 12. Mixologist Owl (This Is Where We Create - Signature Cocktails)
export const MixologistOwl = ({ className = "w-20 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30,85 C30,45 90,45 90,85 C90,115 75,120 60,120 C45,120 30,115 30,85 Z" stroke={color} strokeWidth="4" />
    <circle cx="60" cy="65" r="14" stroke={color} strokeWidth="4" />
    <circle cx="60" cy="65" r="6" fill={color} />
    <path d="M60,80 L54,86 L66,86 Z" fill={color} />
    {/* Branch */}
    <path d="M15,120 L125,120" stroke={color} strokeWidth="5" strokeLinecap="round" />
    {/* Cocktail Glass with Ice & Straw */}
    <path d="M95,85 L120,85 L112,118 L103,118 Z" stroke={color} strokeWidth="3" fill="none" />
    <path d="M100,75 L115,100" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="102" y="92" width="6" height="6" stroke={color} strokeWidth="2" />
    <rect x="108" y="100" width="6" height="6" stroke={color} strokeWidth="2" />
    {/* Dropper / Leaves */}
    <path d="M80,35 Q95,45 85,60" stroke={color} strokeWidth="2.5" />
    <path d="M85,35 Q75,25 70,35" stroke={color} strokeWidth="2" fill={color} />
  </svg>
)

// 13. Single Malt Owl (you get better with age)
export const SingleMaltOwl = ({ className = "w-20 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M35,70 C35,35 95,35 95,70 C95,105 80,110 65,110 C50,110 35,105 35,70 Z" stroke={color} strokeWidth="4" />
    <circle cx="65" cy="55" r="12" stroke={color} strokeWidth="3.5" />
    <circle cx="65" cy="55" r="5" fill={color} />
    <path d="M65,70 L59,76 L71,76 Z" fill={color} />
    <path d="M20,110 L130,110" stroke={color} strokeWidth="5" strokeLinecap="round" />
    {/* Whiskey Glass on Rock */}
    <path d="M15,80 L35,80 L32,108 L18,108 Z" stroke={color} strokeWidth="3" fill="none" />
    <rect x="22" y="90" width="8" height="8" stroke={color} strokeWidth="2" fill={color} />
    {/* Cloud Doodle */}
    <path d="M25,45 C20,38 30,30 40,35 C48,28 60,35 55,43 Z" stroke={color} strokeWidth="2.5" fill="none" />
  </svg>
)

// 14. Rose Owls (Will you accept this rose?)
export const RoseOwls = ({ className = "w-24 h-24", color = "currentColor" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Owl 1 */}
    <path d="M20,70 C20,40 60,40 60,70 C60,95 50,100 40,100 C30,100 20,95 20,70 Z" stroke={color} strokeWidth="3.5" />
    <circle cx="40" cy="58" r="8" stroke={color} strokeWidth="3" />
    <circle cx="40" cy="58" r="3" fill={color} />
    {/* Owl 2 */}
    <path d="M90,70 C90,40 130,40 130,70 C130,95 120,100 110,100 C100,100 90,95 90,70 Z" stroke={color} strokeWidth="3.5" />
    <path d="M102,60 Q110,65 118,60" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Rose between them */}
    <path d="M75,65 L75,95" stroke={color} strokeWidth="2.5" />
    <circle cx="75" cy="55" r="8" fill={color} />
    <path d="M68,55 C68,48 75,44 82,55" stroke={color} strokeWidth="2" fill="none" />
  </svg>
)

// 15. Shooter Owl (It's Time to call your driver)
export const ShooterOwl = ({ className = "w-20 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M35,65 C35,30 95,30 95,65 C95,95 80,100 65,100 C50,100 35,95 35,65 Z" stroke={color} strokeWidth="4" />
    <circle cx="65" cy="50" r="12" stroke={color} strokeWidth="4" />
    <circle cx="65" cy="50" r="5" fill={color} />
    <path d="M20,100 L125,100" stroke={color} strokeWidth="5" strokeLinecap="round" />
    {/* Shot glass 1 on left wing */}
    <path d="M15,75 L30,75 L26,98 L19,98 Z" stroke={color} strokeWidth="2.5" />
    {/* Shot glass 2 on right wing */}
    <path d="M100,75 L115,75 L111,98 L104,98 Z" stroke={color} strokeWidth="2.5" />
  </svg>
)

// 16. Brand Slogan Badge Banner
export const BarSloganBadge = ({ slogan, className = "" }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-dark/10 border border-primary-dark/30 text-primary-dark rounded-full font-serif italic text-sm md:text-base ${className}`}>
    <span>✦</span>
    <span>"{slogan}"</span>
    <span>✦</span>
  </div>
)


