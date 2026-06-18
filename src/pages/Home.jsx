import { useEffect } from 'react'
import HeroExperience from '../components/HeroExperience'
import Philosophy from '../components/Philosophy'
import SignatureDishes from '../components/SignatureDishes'
import LiquidAlchemy from '../components/LiquidAlchemy'
import SignatureExperiences from '../components/SignatureExperiences'
import GalleryPreview from '../components/GalleryPreview'
import ReservationCTA from '../components/ReservationCTA'

export default function Home() {
  // Set title & meta
  useEffect(() => {
    document.title = 'Tanah Kitchen & Bar | Architectural Rooftop Destination'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow bg-bg-primary overflow-x-hidden">
      <h1 className="sr-only">Tanah Kitchen & Bar - Luxury Rooftop Dining in Hyderabad</h1>
      
      {/* 1. Hero Experience (Asymmetrical split canvas) */}
      <HeroExperience />
      
      {/* 2. The Tanah Story (Overlapping editorial canvas) */}
      <Philosophy />
      
      {/* 3. Signature Dishes (Staggered interactive split list) */}
      <SignatureDishes />

      {/* 4. Liquid Alchemy (Asymmetrical botanical cocktail showcase) */}
      <LiquidAlchemy />
      
      {/* 5. Spaces & Ambience (Full-bleed parallax panels) */}
      <SignatureExperiences />
      
      {/* 6. Gallery Showcase (Masonry off-grid mosaic) */}
      <GalleryPreview />
      
      {/* 7. Reservation CTA (Luxury booking deck) */}
      <ReservationCTA />
    </main>
  )
}
