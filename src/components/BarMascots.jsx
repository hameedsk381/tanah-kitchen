import React from 'react'

// Common styling defaults
// Primary maroon color: #6B2523
export const BirdSingleMalt = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cloud background */}
    <path d="M110,40 C100,30 80,30 75,42 C68,36 50,40 52,55 C42,56 40,70 50,76 C55,80 110,80 115,75 C122,70 120,50 110,40 Z" stroke={color} strokeWidth="3" strokeDasharray="3 3" fill="none" opacity="0.6" />
    
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Eyes */}
    <circle cx="70" cy="95" r="12" stroke={color} strokeWidth="3" />
    <circle cx="70" cy="95" r="4" fill={color} />
    <circle cx="90" cy="95" r="12" stroke={color} strokeWidth="3" />
    <circle cx="90" cy="95" r="4" fill={color} />
    
    {/* Brow feathers */}
    <path d="M58,80 C68,76 72,82 72,82" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M102,80 C92,76 88,82 88,82" stroke={color} strokeWidth="3" strokeLinecap="round" />

    {/* Beak */}
    <path d="M80,102 L76,108 L84,108 Z" fill={color} />

    {/* Hand/Wing holding whisky glass */}
    <path d="M105,115 C115,115 125,120 125,130" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Whisky Glass */}
    <path d="M120,130 L135,130 L132,148 L123,148 Z" stroke={color} strokeWidth="3" fill="none" />
    {/* Liquid inside glass */}
    <path d="M124,138 L131,138 L129,147 L126,147 Z" fill={color} />
    {/* Tiny ice cube in glass */}
    <rect x="126" y="140" width="3" height="3" fill={color} transform="rotate(15 126 140)" />
  </svg>
)

export const BirdWhiskey = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body (slightly tilted/leaning) */}
    <path d="M45,110 C45,65 105,65 105,110 C105,140 90,145 75,145 C60,145 45,140 45,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-8 75 110)" />
    
    {/* Dizzy Spiral Eyes */}
    <path d="M60,95 A8,8 0 1,1 70,100 A5,5 0 1,1 66,93" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M80,95 A8,8 0 1,1 90,100 A5,5 0 1,1 86,93" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Beak */}
    <path d="M75,103 L71,108 L79,108 Z" fill={color} />
    
    {/* Dizzy Stars around head */}
    <path d="M50,55 L53,58 L57,56 L55,60 L58,63 L54,63 L52,67 L51,63 L47,63 L50,60 Z" fill={color} opacity="0.8" />
    <path d="M100,50 L102,53 L106,52 L104,55 L106,58 L103,58 L101,62 L100,58 L96,58 L99,55 Z" fill={color} opacity="0.8" />
    
    {/* Wing holding bottle */}
    <path d="M100,120 Q120,115 115,95" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Whisky Bottle */}
    <path d="M110,95 L120,95 L120,70 L115,70 L115,62 L110,62 L110,70 L105,70 Z" stroke={color} strokeWidth="3" fill="none" transform="rotate(25 112 80)" />
    {/* Liquid inside bottle */}
    <path d="M107,85 L117,89 L114,94 L109,92 Z" fill={color} transform="rotate(25 112 80)" />
  </svg>
)

export const BirdVodkaGin = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Happy Eyes (curved arches) */}
    <path d="M60,95 Q70,88 80,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M85,95 Q95,88 105,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Beak */}
    <path d="M80,103 L76,107 L84,107 Z" fill={color} />
    
    {/* Table with three shot glasses in front */}
    <path d="M30,145 L130,145" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Shot Glass 1 */}
    <path d="M48,145 L56,128 L66,128 L74,145" stroke={color} strokeWidth="2.5" fill="none" />
    {/* Shot Glass 2 (Center) */}
    <path d="M72,145 L80,128 L90,128 L98,145" stroke={color} strokeWidth="2.5" fill="none" />
    {/* Shot Glass 3 */}
    <path d="M96,145 L104,128 L114,128 L122,145" stroke={color} strokeWidth="2.5" fill="none" />

    {/* Splash drops above shots */}
    <circle cx="58" cy="118" r="1.5" fill={color} />
    <circle cx="85" cy="115" r="2" fill={color} />
    <circle cx="110" cy="120" r="1.5" fill={color} />
  </svg>
)

export const BirdTequilaRum = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Eyes */}
    <circle cx="70" cy="95" r="12" stroke={color} strokeWidth="3" />
    <circle cx="70" cy="95" r="4" fill={color} />
    {/* Winking Eye Right */}
    <path d="M88,95 Q96,102 102,95" stroke={color} strokeWidth="3.5" strokeLinecap="round" />

    {/* Beak */}
    <path d="M78,102 L74,107 L82,107 Z" fill={color} />

    {/* Wing holding cocktail glass */}
    <path d="M102,118 C115,118 122,110 125,102" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Cocktail Glass (Coupe/Martini style) */}
    <path d="M115,102 L135,102 L125,118 Z" stroke={color} strokeWidth="2.5" fill="none" />
    <path d="M125,118 L125,132" stroke={color} strokeWidth="2.5" />
    <path d="M118,132 L132,132" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Citrus Wheel slice on rim */}
    <circle cx="115" cy="100" r="4" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
)

export const BirdBrandyLiquor = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Stylized Owl Face matching branding design */}
    <path d="M50,90 C50,45 110,45 110,90 C110,120 95,128 80,128 C65,128 50,120 50,90 Z" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Large single tribal eye motif (as seen in logo) */}
    <circle cx="80" cy="85" r="22" stroke={color} strokeWidth="4" />
    <circle cx="80" cy="85" r="9" fill={color} />

    {/* Eyebrow details */}
    <path d="M58,58 C68,52 92,52 102,58" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    
    {/* Beak */}
    <path d="M80,97 L75,103 L85,103 Z" fill={color} />

    {/* Twig/Leaf decoration in beak */}
    <path d="M75,100 L55,90" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M58,92 C56,86 62,84 65,88" stroke={color} strokeWidth="2" fill={color} />
  </svg>
)

export const BirdWine = ({ className = "w-40 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Owl 1 (Left) */}
    <g transform="translate(10, 20)">
      <path d="M35,80 C35,45 80,45 80,80 C80,102 70,106 57,106 C45,106 35,102 35,80 Z" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="68" r="8" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="68" r="3" fill={color} />
      <circle cx="66" cy="68" r="8" stroke={color} strokeWidth="2" />
      <circle cx="66" cy="68" r="3" fill={color} />
      <path d="M58,74 L55,78 L61,78 Z" fill={color} />
      
      {/* Hand holding rose */}
      <path d="M78,85 Q88,85 88,95" stroke={color} strokeWidth="2.5" />
    </g>

    {/* Owl 2 (Right) */}
    <g transform="translate(85, 25)">
      <path d="M30,75 C30,42 75,42 75,75 C75,96 65,100 52,100 C40,100 30,96 30,75 Z" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M40,63 Q46,70 52,63" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="62" cy="64" r="7" stroke={color} strokeWidth="2" />
      <circle cx="62" cy="64" r="2.5" fill={color} />
      <path d="M52,70 L49,74 L55,74 Z" fill={color} />
    </g>

    {/* The Rose in the middle */}
    <g transform="translate(88, 88)">
      {/* Stem */}
      <path d="M10,25 L10,1" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Rosebud */}
      <path d="M5,1 C5,-5 15,-5 15,1 C15,5 5,5 5,1 Z" fill={color} />
      <path d="M8,1 C8,-3 12,-3 12,1" stroke="#F6E1CB" strokeWidth="1" />
      {/* Leaf */}
      <path d="M10,12 Q18,10 16,16" stroke={color} strokeWidth="2" fill="none" />
    </g>
  </svg>
)

export const BirdBeerChampagne = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tipsy Bird Body (tilted) */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(10 80 110)" />
    
    {/* One Winking Eye, One Spiral Eye */}
    <g transform="rotate(10 80 110)">
      <path d="M60,95 Q68,102 74,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M84,95 A7,7 0 1,1 94,100 A4,4 0 1,1 90,93" stroke={color} strokeWidth="2.5" />
      <path d="M78,103 L74,107 L82,107 Z" fill={color} />
    </g>
    
    {/* Left wing holding bottle */}
    <path d="M52,118 Q35,115 40,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Champagne Bottle */}
    <path d="M28,95 L38,95 L38,70 L34,70 L34,62 L30,62 L30,70 L26,70 Z" stroke={color} strokeWidth="2.5" fill="none" transform="rotate(-15 32 80)" />
    {/* Sparkling bubbles coming out of bottle */}
    <circle cx="28" cy="48" r="2" fill={color} />
    <circle cx="36" cy="42" r="1.5" fill={color} />
    <circle cx="30" cy="36" r="1" fill={color} />

    {/* Right wing holding glass */}
    <path d="M108,118 Q125,115 125,100" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Champagne Coupe glass */}
    <path d="M118,100 L132,100 L128,112 L122,112 Z" stroke={color} strokeWidth="2.5" fill="none" />
    <path d="M125,112 L125,124" stroke={color} strokeWidth="2.5" />
    <path d="M120,124 L130,124" stroke={color} strokeWidth="2.5" />
  </svg>
)

export const BirdSoftDrink = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Happy Eyes */}
    <circle cx="70" cy="95" r="11" stroke={color} strokeWidth="3" />
    <circle cx="70" cy="95" r="4" fill={color} />
    <circle cx="90" cy="95" r="11" stroke={color} strokeWidth="3" />
    <circle cx="90" cy="95" r="4" fill={color} />
    
    {/* Beak */}
    <path d="M80,101 L76,106 L84,106 Z" fill={color} />

    {/* Wing holding glass of ice */}
    <path d="M106,120 Q122,120 122,105" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Tumbler Glass */}
    <path d="M115,105 L130,105 L126,125 L119,125 Z" stroke={color} strokeWidth="2.5" fill="none" />
    {/* Ice Cubes inside */}
    <rect x="119" y="112" width="4" height="4" stroke={color} strokeWidth="1.5" transform="rotate(10 119 112)" />
    <rect x="122" y="118" width="4" height="4" stroke={color} strokeWidth="1.5" transform="rotate(-20 122 118)" />
    {/* Straw */}
    <path d="M125,120 L132,95" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const BirdSignatureCocktail = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Focused Eyes */}
    <circle cx="70" cy="95" r="11" stroke={color} strokeWidth="3" />
    <path d="M68,95 L72,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <circle cx="90" cy="95" r="11" stroke={color} strokeWidth="3" />
    <path d="M88,95 L92,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Beak */}
    <path d="M80,102 L76,107 L84,107 Z" fill={color} />

    {/* Right wing holding a dropper */}
    <path d="M108,110 Q122,100 120,80" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Dropper */}
    <path d="M120,80 L115,70 L118,65 L125,72 L120,80 Z" stroke={color} strokeWidth="2" fill="none" />
    <path d="M115,70 L105,90" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Liquid drop falling */}
    <path d="M104,94 C104,96 102,98 102,96 C102,94 104,92 104,94 Z" fill={color} />

    {/* Left wing holding citrus garnish wheel */}
    <path d="M52,118 Q40,115 42,100" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Citrus Garnish Wheel */}
    <circle cx="38" cy="96" r="10" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="38" cy="96" r="1.5" fill={color} />
    <path d="M38,86 L38,106 M28,96 L48,96" stroke={color} strokeWidth="1" />
  </svg>
)

export const BirdMocktail = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Apron straps & details */}
    <path d="M62,115 L62,145 M98,115 L98,145" stroke={color} strokeWidth="2" strokeDasharray="2 3" />
    <path d="M60,122 L100,122 L90,145 L70,145 Z" stroke={color} strokeWidth="2" fill="none" />
    {/* Pocket on apron */}
    <path d="M73,130 L87,130 L84,140 L76,140 Z" stroke={color} strokeWidth="1.5" />

    {/* Eyes */}
    <circle cx="70" cy="95" r="11" stroke={color} strokeWidth="3" />
    <circle cx="70" cy="95" r="3.5" fill={color} />
    <circle cx="90" cy="95" r="11" stroke={color} strokeWidth="3" />
    <circle cx="90" cy="95" r="3.5" fill={color} />
    
    {/* Beak */}
    <path d="M80,102 L76,106 L84,106 Z" fill={color} />

    {/* Wings shaking a cocktail shaker */}
    <path d="M48,118 Q38,102 52,90" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M112,118 Q122,102 108,90" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Cocktail Shaker (slightly angled/motion) */}
    <g transform="translate(68, 70) rotate(15)">
      {/* Main shaker body */}
      <path d="M2,18 L18,18 L15,42 L5,42 Z" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Shaker lid cap */}
      <path d="M5,18 L5,10 L15,10 L15,18 Z" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M8,10 L8,6 L12,6 L12,10 Z" stroke={color} strokeWidth="2" fill="none" />
      {/* Motion lines for shake */}
      <path d="M-8,15 Q-14,18 -8,21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28,15 Q34,18 28,21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
)

export const BirdShooter = ({ className = "w-32 h-32", color = "#6B2523" }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird Body */}
    <path d="M50,110 C50,65 110,65 110,110 C110,140 95,145 80,145 C65,145 50,140 50,110 Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Happy / Laughing Eyes (screentime look) */}
    <path d="M60,98 L70,90 L76,96" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100,98 L90,90 L84,96" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Beak (happy open beak) */}
    <path d="M76,102 L84,102 L80,109 Z" fill={color} />
    
    {/* Left wing holding shot glass */}
    <path d="M48,118 Q32,112 36,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M26,95 L34,80 L42,80 L50,95 Z" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Right wing holding shot glass */}
    <path d="M112,118 Q128,112 124,95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M110,95 L118,80 L126,80 L134,95 Z" stroke={color} strokeWidth="2" fill="none" />
  </svg>
)
