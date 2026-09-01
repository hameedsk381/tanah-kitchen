import React from 'react'

// Official Tanah Brand Logos (6 Variations)
export const LogoPrimaryHorizontal = ({ className = "h-12 w-auto", alt = "Tanah Kitchen & Bar" }) => (
  <img src="/assets/logos/logo-primary-horizontal.png" alt={alt} className={`object-contain ${className}`} />
)

export const LogoPrimaryVertical = ({ className = "h-20 w-auto", alt = "Tanah Kitchen & Bar" }) => (
  <img src="/assets/logos/logo-primary-vertical.png" alt={alt} className={`object-contain ${className}`} />
)

export const LogoSiren = ({ className = "h-16 w-auto", alt = "Tanah Siren Emblem" }) => (
  <img src="/assets/logos/logo-siren.png" alt={alt} className={`object-contain ${className}`} />
)

export const LogoWordmark = ({ className = "h-10 w-auto", alt = "Tanah Kitchen & Bar Wordmark" }) => (
  <img src="/assets/logos/logo-wordmark.png" alt={alt} className={`object-contain ${className}`} />
)

export const LogoTelugu = ({ className = "h-20 w-auto", alt = "Tanah Telugu Logo" }) => (
  <img src="/assets/logos/logo-telugu.png" alt={alt} className={`object-contain ${className}`} />
)

export const LogoTeluguHorizontal = ({ className = "h-12 w-auto", alt = "Tanah Telugu Horizontal Logo" }) => (
  <img src="/assets/logos/logo-telugu-horizontal.png" alt={alt} className={`object-contain ${className}`} />
)

// Default / Backward compatibility alias
export const LogoOwl = ({ className = "h-14 w-auto", color = "currentColor" }) => (
  <img src="/assets/logo.png" alt="Tanah Kitchen & Bar" className={`object-contain ${className}`} />
)

// Non-logo decorative SVGs disabled as per brand guidelines
export const StoryNestOwl = () => null
export const DiamondDivider = () => null
export const TribalDiamond = () => null
export const WinkingOwl = () => null
export const FoodOwl = () => null
export const PartyOwl = () => null
export const BambooOwl = () => null
export const FlyingBird = () => null
export const TotemStack = () => null
