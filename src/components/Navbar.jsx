import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-7'
        }`}
        style={{
          borderBottom: scrolled ? '1px solid rgba(200, 164, 106, 0.2)' : '1px solid rgba(245, 242, 234, 0.05)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          className="px-8 flex items-center justify-between max-w-container"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col group"
            aria-label="Tanah Kitchen & Bar Home"
          >
            <span
              className="font-display text-2xl font-bold tracking-[0.15em] uppercase text-text-light transition-colors duration-300 group-hover:text-gold"
            >
              Tanah
            </span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-gold -mt-1 font-body">
              Kitchen & Bar
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
                    className="text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative py-1 group"
                    style={{ 
                      color: isActive 
                        ? 'var(--color-gold)' 
                        : 'rgba(245, 242, 234, 0.8)' 
                    }}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      style={{ background: 'var(--color-gold)' }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/book"
              className="btn-primary py-3 px-8 text-[9px] tracking-[0.25em] font-semibold"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors cursor-pointer text-text-light hover:text-gold"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 flex flex-col pt-28 px-10 pb-12 gap-8 shadow-2xl border-b border-gold/20"
            style={{ background: 'var(--color-bg-secondary)' }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className="font-display text-2xl font-light block py-2 transition-colors duration-300"
                      style={{ 
                        color: isActive 
                          ? 'var(--color-gold)' 
                          : 'var(--color-text-light)' 
                      }}
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
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex justify-center"
            >
              <Link
                to="/book"
                className="btn-primary text-center justify-center w-64 py-3.5 tracking-[0.2em]"
              >
                Reserve Table
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
            className="fixed inset-0 z-30 bg-black/80 md:hidden backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
