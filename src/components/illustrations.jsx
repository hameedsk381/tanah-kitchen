import React from 'react'

const GCS_LOGO_BASE = 'https://storage.googleapis.com/yesj/assets/logos';

// Official Tanah Brand Logos (6 Variations - Hosted on Google Cloud Storage)
export const LogoPrimaryHorizontal = ({ className = "h-12 w-auto", alt = "Tanah Kitchen & Bar" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-primary-horizontal-light.png`} alt={alt} className={`object-contain ${className}`} />
)

export const LogoPrimaryVertical = ({ className = "h-20 w-auto", alt = "Tanah Kitchen & Bar" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-primary-vertical-light.png`} alt={alt} className={`object-contain ${className}`} />
)

export const LogoSiren = ({ className = "h-16 w-auto", alt = "Tanah Siren Emblem" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-siren-light.png`} alt={alt} className={`object-contain ${className}`} />
)

export const LogoWordmark = ({ className = "h-10 w-auto", alt = "Tanah Kitchen & Bar Wordmark" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-wordmark-light.png`} alt={alt} className={`object-contain ${className}`} />
)

export const LogoTelugu = ({ className = "h-20 w-auto", alt = "Tanah Telugu Logo" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-telugu-light.png`} alt={alt} className={`object-contain ${className}`} />
)

export const LogoTeluguHorizontal = ({ className = "h-12 w-auto", alt = "Tanah Telugu Horizontal Logo" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-telugu-horizontal-light.png`} alt={alt} className={`object-contain ${className}`} />
)

// Default / Backward compatibility alias
export const LogoOwl = ({ className = "h-14 w-auto", color = "currentColor" }) => (
  <img src={`${GCS_LOGO_BASE}/logo-primary-horizontal-light.png`} alt="Tanah Kitchen & Bar" className={`object-contain ${className}`} />
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
