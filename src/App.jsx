import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Book from './pages/Book'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActionBar from './components/FloatingActionBar'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bg-primary text-text-dark">
        <Navbar />
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
        </Routes>
        <Footer />
        <FloatingActionBar />
      </div>
    </Router>
  )
}

export default App
