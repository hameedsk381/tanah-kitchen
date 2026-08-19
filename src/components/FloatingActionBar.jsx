import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageSquare, Phone } from 'lucide-react'
import contactData from '../data/contact.json'

export default function FloatingActionBar() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  // Show floating bar after scrolling 150px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Do not show on the /book page if already booking
  const isBookPage = location.pathname === '/book'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-24 sm:translate-x-0 z-40 flex items-center gap-2.5 p-1.5 rounded-full bg-[#3A2E2A]/90 backdrop-blur-md border border-white/20 shadow-2xl"
        >
          {/* Reserve Table Button */}
          {!isBookPage && (
            <Link
              to="/book"
              className="wp-btn-pill bg-[#FFC470] text-[#6B2523] hover:bg-white hover:text-[#6B2523] text-xs font-extrabold py-2 px-4 shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </Link>
          )}

          {/* WhatsApp Direct Chat Button */}
          <a
            href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi Tanah Kitchen, I would like to inquire about reservations.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp-btn-pill bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold py-2 px-3.5 shadow-md flex items-center gap-1.5 whitespace-nowrap"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Quick Call Button (Mobile) */}
          <a
            href={`tel:${contactData.phone1.replace(/\s+/g, '')}`}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FFC470] flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Call Restaurant"
            title="Call Restaurant"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
