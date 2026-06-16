import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, ArrowUp } from 'lucide-react'
import contactData from '../data/contact.json'

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Philosophy', path: '/about' },
  { label: 'Seasonal Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Book a Table', path: '/book' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setSubscribed(true)
    setEmailError('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t"
      style={{
        background: 'var(--color-bg-secondary)',
        borderColor: 'rgba(200, 164, 106, 0.15)',
        paddingTop: '8rem',
        paddingBottom: '3rem',
        color: 'var(--color-text-light)'
      }}
      aria-label="Site footer"
    >
      <div className="px-8 relative z-10 max-w-container mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col group">
              <span className="font-display text-2xl font-bold tracking-[0.15em] uppercase text-text-light group-hover:text-gold transition-colors duration-300">
                Tanah
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-gold -mt-1 font-body">
                Kitchen & Bar
              </span>
            </Link>
            <p className="text-xs font-light leading-relaxed text-text-muted">
              Tanah represents connection to the Earth. Our culinary destination in Hyderabad honors natural architectural design, slow wood-fired hearths, and premium sustainable ingredients.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 text-gold">
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-xs font-light transition-all duration-300 flex items-center gap-3 text-text-muted hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 text-gold">
              Tanah Gachibowli
            </h4>
            <ul className="flex flex-col gap-5 text-xs font-light text-text-muted">
              <li className="leading-relaxed">
                {contactData.address}
              </li>
              <li>
                Reservations: <br />
                <span className="text-text-light hover:text-gold transition-colors font-medium">{contactData.phone1}</span> <br />
                <span className="text-text-light hover:text-gold transition-colors font-medium">{contactData.phone2}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 text-gold">
              Chronicles
            </h4>
            <p className="text-xs font-light mb-6 leading-relaxed text-text-muted">
              Subscribe to recieve updates on rare seasonal menus, events, and table openings.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] py-4 px-5 border border-gold/30 bg-gold/5 text-gold"
              >
                Welcome to Tanah.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError('')
                    }}
                    placeholder="E-mail Address"
                    className="form-input text-xs flex-1 py-3.5 px-4"
                    maxLength={120}
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gold text-bg-primary hover:bg-gold/80"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {emailError && (
                  <p className="text-[10px] text-terracotta" role="alert">
                    {emailError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px mb-8 bg-gold/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-light text-text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Tanah Kitchen & Bar. Architectural Gastronomy. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-light text-text-muted">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center cursor-pointer bg-gold text-bg-primary hover:bg-gold/80"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  )
}
