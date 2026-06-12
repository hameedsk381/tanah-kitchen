import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
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

  // Close mobile menu on path change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-2xl py-4'
            : 'bg-transparent py-6'
        }`}
        style={{
          background: scrolled
            ? 'rgba(27, 67, 50, 0.95)' // Deep Forest Green #1B4332 with opacity
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(248, 243, 233, 0.1)' : 'none',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          className="px-6 md:px-12 flex items-center justify-between"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Tanah Kitchen Home"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-12"
              style={{ background: 'var(--color-terracotta)' }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-display text-2xl font-bold tracking-wide"
              style={{ color: 'var(--color-cream)' }}
            >
              Tanah<span style={{ color: 'var(--color-terracotta)' }}>.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative py-1 group"
                    style={{ 
                      color: isActive 
                        ? 'var(--color-terracotta)' 
                        : 'rgba(255, 253, 248, 0.85)' 
                    }}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      style={{ background: 'var(--color-terracotta)' }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="btn-primary py-2.5 px-7 text-xs font-semibold tracking-widest uppercase"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: 'var(--color-cream)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-80 flex flex-col pt-28 px-10 pb-10 gap-8 shadow-2xl"
            style={{ background: 'var(--color-forest)' }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className="font-display text-2xl font-medium block py-2 transition-colors duration-300"
                      style={{ 
                        color: isActive 
                          ? 'var(--color-terracotta)' 
                          : 'var(--color-cream)' 
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto"
            >
              <Link
                to="/contact"
                className="btn-primary w-full text-center justify-center py-3.5 tracking-wider uppercase font-semibold text-xs"
              >
                Book a Table
              </Link>
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
