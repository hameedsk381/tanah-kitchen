import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LogoOwl } from './illustrations'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Philosophy', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Book a Table', path: '/book' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Announcement / Info Bar (WordPress Style) */}
        <div
          className={`hidden lg:block transition-all duration-300 text-[11px] font-medium tracking-wider border-b border-[#FFC470]/15 ${
            scrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-2 bg-[#541B1A] text-[#F6E1CB]/85'
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC470]" />
                Opp. Meenakshi Bamboo Road, Gachibowli, Hyderabad
              </span>
              <span>•</span>
              <span>Open Daily: 12:00 PM – 11:30 PM</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+918977730291" className="hover:text-[#FFC470] transition-colors">
                📞 +91 89777 30291
              </a>
              <span className="text-[#FFC470]/40">|</span>
              <span className="text-[#FFC470] font-semibold tracking-widest uppercase text-[10px]">
                Architectural Gastronomy
              </span>
            </div>
          </div>
        </div>

        {/* Main Sticky Navbar */}
        <nav
          className={`transition-all duration-300 ${
            scrolled
              ? 'py-3.5 bg-[#6B2523]/95 backdrop-blur-md shadow-lg border-b border-[#FFC470]/20'
              : 'py-4 lg:py-5 bg-[#6B2523] border-b border-[#FFC470]/10'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl px-6 sm:px-8 flex items-center justify-between mx-auto">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group"
              aria-label="Tanah Kitchen & Bar Home"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5 border border-[#FFC470]/20 group-hover:border-[#FFC470] transition-colors">
                <LogoOwl className="w-full h-full text-light-cream" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl font-bold tracking-[0.12em] uppercase text-light-cream leading-tight">
                  Tanah
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-accent-gold font-body font-semibold">
                  Kitchen & Bar
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className={`text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-200 relative py-1.5 ${
                        isActive
                          ? 'text-[#FFC470]'
                          : 'text-[#F6E1CB] hover:text-[#FFC470]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FFC470] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/book"
                className="wp-btn-pill bg-[#FFC470] text-[#6B2523] hover:bg-white hover:text-[#6B2523] shadow-md text-xs font-bold px-6 py-2.5"
              >
                Book a Table
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-light-cream hover:text-accent-gold transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer (WordPress Luxury Styling) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 flex flex-col pt-24 px-8 pb-10 gap-6 shadow-2xl border-b border-[#FFC470]/20 bg-[#6B2523] text-[#F6E1CB]"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`font-display text-xl font-bold block py-2 transition-colors duration-200 ${
                        isActive
                          ? 'text-[#FFC470]'
                          : 'text-[#F6E1CB] hover:text-[#FFC470]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="flex flex-col items-center gap-3 pt-2"
            >
              <Link
                to="/book"
                className="wp-btn-pill bg-[#FFC470] text-[#6B2523] hover:bg-white text-center justify-center w-full max-w-xs py-3 text-xs font-bold shadow-lg"
              >
                Book a Table
              </Link>
              <a
                href="tel:+918977730291"
                className="text-xs text-[#FFC470] font-semibold tracking-wider hover:underline"
              >
                📞 Call: +91 89777 30291
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
