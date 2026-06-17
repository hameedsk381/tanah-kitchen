import { useEffect } from 'react'
import HeroExperience from '../components/HeroExperience'
import Philosophy from '../components/Philosophy'
import SignatureDishes from '../components/SignatureDishes'
import SignatureExperiences from '../components/SignatureExperiences'
import GalleryPreview from '../components/GalleryPreview'
import LiveSportsEvents from '../components/LiveSportsEvents'
import ReservationCTA from '../components/ReservationCTA'

export default function Home() {
  // Set title & meta
  useEffect(() => {
    document.title = 'Tanah Kitchen & Bar | Architectural Rooftop Gastronomy'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow bg-bg-primary overflow-x-hidden">
      <h1 className="sr-only">Tanah Kitchen & Bar - Luxury Rooftop Dining in Hyderabad</h1>
      
      {/* 1. Hero Experience */}
      <HeroExperience />
      
      {/* 2. The Tanah Story */}
      <Philosophy />
      
      {/* 3. Signature Dishes */}
      <SignatureDishes />
      
      {/* 4. Ambience & Rooftop Experience */}
      <SignatureExperiences />
      
      {/* 5. Gallery Showcase */}
      <GalleryPreview />
      
      {/* 6. Live Sports & Events */}
      <LiveSportsEvents />
      
      {/* 7. Reservation CTA */}
      <ReservationCTA />
    </main>
  )
}
