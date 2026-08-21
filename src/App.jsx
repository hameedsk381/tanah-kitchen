import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MenuProvider } from './context/MenuContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActionBar from './components/FloatingActionBar'

// Resilient Chunk Loader with Auto-Recovery on Deployments
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageRefreshed = sessionStorage.getItem('tanah_chunk_refreshed') === 'true'
    try {
      const component = await componentImport()
      sessionStorage.setItem('tanah_chunk_refreshed', 'false')
      return component
    } catch (error) {
      if (!pageRefreshed) {
        sessionStorage.setItem('tanah_chunk_refreshed', 'true')
        window.location.reload()
      }
      throw error
    }
  })
}

// Code-split page chunks with auto-reload protection
const Home = lazyWithRetry(() => import('./pages/Home'))
const AboutUs = lazyWithRetry(() => import('./pages/AboutUs'))
const Menu = lazyWithRetry(() => import('./pages/Menu'))
const Gallery = lazyWithRetry(() => import('./pages/Gallery'))
const Book = lazyWithRetry(() => import('./pages/Book'))
const Contact = lazyWithRetry(() => import('./pages/Contact'))
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazyWithRetry(() => import('./pages/TermsAndConditions'))
const AdminMenu = lazyWithRetry(() => import('./pages/AdminMenu'))

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
          </div>
        </Router>
      </MenuProvider>
    </HelmetProvider>
  )
}

export default App
