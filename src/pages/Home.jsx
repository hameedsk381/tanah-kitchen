import { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import SignatureDishes from '../components/SignatureDishes'
import WhyChooseUs from '../components/WhyChooseUs'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import Reservation from '../components/Reservation'
import VisitTanah from '../components/VisitTanah'

export default function Home() {
  // Set title & meta
  useEffect(() => {
    document.title = 'Tanah Kitchen | Rooted in Nature. Crafted with Passion.'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow">
      <h1 className="sr-only">Tanah Kitchen - Luxury Organic Restaurant</h1>
      <Hero />
      <About />
      <SignatureDishes />
      <WhyChooseUs />
      <Experience />
      <Testimonials />
      <Reservation />
      <VisitTanah />
    </main>
  )
}
