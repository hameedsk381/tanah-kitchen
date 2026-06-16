import { useEffect } from 'react'
import HeroExperience from '../components/HeroExperience'
import Philosophy from '../components/Philosophy'
import SignatureExperiences from '../components/SignatureExperiences'
import ArtGastronomy from '../components/ArtGastronomy'
import GalleryPreview from '../components/GalleryPreview'
import ReservationCTA from '../components/ReservationCTA'
import LocationSection from '../components/LocationSection'

export default function Home() {
  // Set title & meta
  useEffect(() => {
    document.title = 'Tanah Kitchen & Bar | Architectural Gastronomy'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow">
      <h1 className="sr-only">Tanah Kitchen & Bar - Luxury Organic Dining in Hyderabad</h1>
      <HeroExperience />
      <Philosophy />
      <SignatureExperiences />
      <ArtGastronomy />
      <GalleryPreview />
      <ReservationCTA />
      <LocationSection />
    </main>
  )
}
