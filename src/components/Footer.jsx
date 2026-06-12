import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Leaf, MapPin, Phone, Mail,
  Globe, Share2,
  Send, ArrowUp
} from 'lucide-react'

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Seasonal Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact & Booking', path: '/contact' },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Globe, label: 'Website', href: '/' },
  { icon: Share2, label: 'Share', href: '#' },
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
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-forest-dark)',
        paddingTop: '6rem',
        paddingBottom: '2.5rem',
        color: 'var(--color-cream)'
      }}
      aria-label="Site footer"
    >
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '60px', transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C480,60 960,0 1440,60 L1440,80 L0,80 Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>

      {/* Subtle organic decorations */}
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] opacity-5 pointer-events-none rounded-full"
        style={{
          background: 'var(--color-terracotta)',
          filter: 'blur(80px)'
        }}
      />

      <div 
        className="px-6 md:px-12 relative z-10"
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
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
            </div>
            <p
              className="text-sm font-light mb-8 leading-relaxed"
              style={{ color: 'rgba(255,253,248,0.7)' }}
            >
              Tanah means Earth. Our farm-to-table sanctuary honors natural rhythms and traditional culinary craftsmanship. Every dish is a story of slow-cooked passion and pure seasonal ingredients.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border"
                  style={{
                    borderColor: 'rgba(255, 253, 248, 0.15)',
                    background: 'rgba(255, 253, 248, 0.04)',
                    color: 'var(--color-cream)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-terracotta)'
                    e.currentTarget.style.borderColor = 'var(--color-terracotta)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 253, 248, 0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255, 253, 248, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:pl-8">
            <h4
              className="font-body text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-terracotta-light)' }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm font-light transition-all duration-300 flex items-center gap-3 hover:pl-2"
                    style={{ color: 'rgba(255,253,248,0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-cream)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,253,248,0.7)'
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-terracotta)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              className="font-body text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-terracotta-light)' }}
            >
              Hours & Location
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3.5">
                <MapPin
                  className="w-4 h-4 mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-terracotta)' }}
                />
                <span
                  className="text-sm font-light leading-relaxed"
                  style={{ color: 'rgba(255,253,248,0.7)' }}
                >
                  Tanah Farmstead, 12 Green Valley, <br />
                  Aravalli Foothills, Gurgaon - 122102
                </span>
              </li>
              <li className="flex items-center gap-3.5">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: 'var(--color-terracotta)' }}
                />
                <span
                  className="text-sm font-light"
                  style={{ color: 'rgba(255,253,248,0.7)' }}
                >
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3.5">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: 'var(--color-terracotta)' }}
                />
                <span
                  className="text-sm font-light"
                  style={{ color: 'rgba(255,253,248,0.7)' }}
                >
                  contact@tanahkitchen.in
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Seasonal updates */}
          <div>
            <h4
              className="font-body text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-terracotta-light)' }}
            >
              Newsletter
            </h4>
            <p
              className="text-sm font-light mb-6 leading-relaxed"
              style={{ color: 'rgba(255,253,248,0.7)' }}
            >
              Sign up to receive rare recipes, seasonal menu releases, and priority reservations.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs py-4 px-5 border"
                style={{
                  background: 'rgba(188, 108, 37, 0.1)',
                  color: 'var(--color-cream)',
                  borderColor: 'rgba(188, 108, 37, 0.3)'
                }}
              >
                🌿 You have been subscribed. Welcome to Tanah.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                noValidate
                aria-label="Newsletter signup"
                className="space-y-3"
              >
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError('')
                    }}
                    placeholder="Enter email address"
                    className="form-input-light text-sm flex-1 py-3 px-4"
                    maxLength={120}
                    aria-label="Email address"
                    aria-invalid={!!emailError}
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: 'var(--color-terracotta)', color: 'var(--color-cream)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-forest-light)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-terracotta)' }}
                    aria-label="Submit email"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {emailError && (
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-terracotta-light)' }}
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Separator line */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'rgba(255,253,248,0.08)' }}
        />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-xs font-light text-center sm:text-left"
            style={{ color: 'rgba(255,253,248,0.4)' }}
          >
            © {new Date().getFullYear()} Tanah Kitchen Private Limited. All rights reserved. Made in harmony with Earth.
          </p>
          <div className="flex gap-6 text-xs font-light">
            <a href="#" style={{ color: 'rgba(255,253,248,0.4)' }} className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,253,248,0.4)' }} className="hover:text-cream transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-none cursor-pointer"
        style={{ background: 'var(--color-terracotta)', color: 'var(--color-cream)' }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
