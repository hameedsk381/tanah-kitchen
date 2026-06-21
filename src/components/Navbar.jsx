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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 shadow-md' : 'py-5'
        }`}
        style={{
          background: 'rgba(242, 232, 213, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(122, 45, 45, 0.15)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="px-8 flex items-center justify-between max-w-container mx-auto"
        >
          {/* Logo with Custom SVG Owl */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Tanah Kitchen & Bar Home"
          >
            <LogoOwl className="w-10 h-10 text-primary-dark transition-transform duration-500 group-hover:rotate-12" />
            <div className="flex flex-col">
              <span
                className="font-display text-2xl font-bold tracking-[0.1em] uppercase text-primary-dark transition-colors duration-300"
              >
                Tanah
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-accent-gold -mt-1 font-body font-bold">
                Kitchen & Bar
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative py-1 group"
                    style={{
                      color: isActive
                        ? 'var(--color-primary-dark)'
                        : 'var(--color-near-black)'
                    }}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      style={{ background: 'var(--color-primary-dark)' }}
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
              className="btn-primary py-2.5 px-6 text-[9px] tracking-[0.25em] font-semibold"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors cursor-pointer text-near-black hover:text-primary-dark"
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
            className="fixed inset-x-0 top-0 z-40 flex flex-col pt-24 px-10 pb-10 gap-8 shadow-2xl border-b border-primary-dark/20"
            style={{ background: 'var(--color-light-cream)' }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-5 text-center">
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
                      className="font-display text-2xl font-light block py-1.5 transition-colors duration-300"
                      style={{
                        color: isActive
                          ? 'var(--color-primary-dark)'
                          : 'var(--color-near-black)'
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
                className="btn-primary text-center justify-center w-64 py-3 tracking-[0.2em]"
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
            className="fixed inset-0 z-30 bg-dark-brown/40 md:hidden backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
