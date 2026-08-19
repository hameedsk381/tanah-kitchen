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
      className="bg-[#541B1A] text-[#F6E1CB] relative overflow-hidden border-t border-[#FFC470]/20 pt-20 pb-12"
      aria-label="Site footer"
    >
      <div className="wp-container relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 text-left">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex flex-col group">
              <span className="font-display text-3xl font-extrabold tracking-[0.12em] uppercase text-[#F6E1CB] transition-colors duration-300">
                Tanah
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#FFC470] font-body font-bold">
                Kitchen & Bar
              </span>
            </Link>
            <p className="text-xs font-light leading-relaxed text-[#EFE1D0]/80 font-body">
              TANAH is not simply a restaurant—it is a gathering place where people reconnect with one another through food, drink, stories, and the comforting feeling of coming home.
            </p>
            <p className="text-[11px] font-light italic text-[#FFC470]/70 font-body">
              Built on the symbolism of birds, nests, and the earth — celebrating belonging, rest, and authentic hospitality. ESTD 2025.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider mb-5 text-[#FFC470]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 font-body">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-xs text-[#EFE1D0]/80 hover:text-[#FFC470] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#FFC470]/50 text-[10px]">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider mb-5 text-[#FFC470]">
              Tanah Gachibowli
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-light text-[#EFE1D0]/85 font-body">
              <li className="leading-relaxed">
                📍 {contactData.address}
              </li>
              <li>
                <span className="text-[#FFC470] font-semibold">Reservations:</span><br />
                <a href={`tel:${contactData.phone1.replace(/\s+/g, '')}`} className="hover:text-[#FFC470] transition-colors">
                  📞 {contactData.phone1}
                </a><br />
                <a href={`tel:${contactData.phone2.replace(/\s+/g, '')}`} className="hover:text-[#FFC470] transition-colors">
                  📞 {contactData.phone2}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider mb-5 text-[#FFC470]">
              Chronicles
            </h4>
            <p className="text-xs font-light mb-4 leading-relaxed text-[#EFE1D0]/80 font-body">
              Subscribe to receive updates on rare seasonal menus, events, and table openings.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs py-3.5 px-4 rounded-xl border border-[#FFC470]/30 bg-[#FFC470]/10 text-[#FFC470] font-semibold"
              >
                ✓ Welcome to the Tanah Chronicles.
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
                    className="wp-form-input text-xs flex-1 py-2.5 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-[#FFC470]"
                    maxLength={120}
                  />
                  <button
                    type="submit"
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-[#FFC470] text-[#6B2523] hover:bg-white cursor-pointer font-bold shadow-md"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {emailError && (
                  <p className="text-xs text-[#FFC470] font-semibold" role="alert">
                    {emailError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px mb-8 bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
          <p className="text-xs font-light text-[#EFE1D0]/60 text-center sm:text-left">
            © {new Date().getFullYear()} Tanah Kitchen &amp; Bar. Architectural Gastronomy. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-light text-[#EFE1D0]/60">
            <Link to="/privacy-policy" className="hover:text-[#FFC470] transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#FFC470] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer bg-[#FFC470] text-[#6B2523] hover:bg-white shadow-2xl"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5 font-bold" />
      </motion.button>
    </footer>
  )
}
