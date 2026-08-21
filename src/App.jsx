import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MenuProvider } from './context/MenuContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActionBar from './components/FloatingActionBar'
import AIConcierge from './components/AIConcierge'

// Code-split page chunks
const Home = lazy(() => import('./pages/Home'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Menu = lazy(() => import('./pages/Menu'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Book = lazy(() => import('./pages/Book'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const AdminMenu = lazy(() => import('./pages/AdminMenu'))

// Lightweight luxury loading spinner
function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF6F0] gap-4">
      <div className="w-10 h-10 border-2 border-[#6B2523]/20 border-t-[#6B2523] rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#6B2523]/70 font-body">
        Loading Sanctuary...
      </span>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <MenuProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-bg-primary text-text-dark">
            <Navbar />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/book" element={<Book />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/admin" element={<AdminMenu />} />
                <Route path="/admin/menu" element={<AdminMenu />} />
                <Route path="/menu-manager" element={<AdminMenu />} />
              </Routes>
            </Suspense>
            <Footer />
            <FloatingActionBar />
            <AIConcierge />
          </div>
        </Router>
      </MenuProvider>
    </HelmetProvider>
  )
}

export default App
