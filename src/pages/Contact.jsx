import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, MessageSquare, CheckCircle } from 'lucide-react'

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
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

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Globe, label: 'Website', href: '/' },
  { icon: MessageSquare, label: 'WhatsApp Chat', href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Table Booking Inquiry',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.title = 'Contact & Location | Tanah Kitchen'
    window.scrollTo(0, 0)
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.'
    if (!form.message.trim()) errs.message = 'Please type a message details.'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <main className="flex-grow pt-24">
      
      {/* Page Header */}
      <section 
        className="relative py-20 md:py-28 text-center"
        style={{ background: 'var(--color-forest)' }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'radial-gradient(var(--color-cream) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div 
          className="relative z-10 px-6"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta-light)' }}>
            REACH OUT
          </span>
          <h1 
            className="font-display font-bold leading-none mb-6"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              color: 'var(--color-cream)'
            }}
          >
            Contact & Bookings
          </h1>
          <p className="text-sm md:text-base font-light max-w-xl mx-auto" style={{ color: 'var(--color-beige)', opacity: 0.9 }}>
            Join us for an evening of handcrafted hospitality. Book tables, request custom event catering, or drop by our farm.
          </p>
        </div>
      </section>

      {/* Main Details and Form Section */}
      <section 
        className="relative py-16 md:py-24"
        style={{ background: 'var(--color-cream)' }}
      >
        <div 
          className="px-6 md:px-12"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Business Details */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
                  OUR HEARTH
                </span>
                <h2 className="font-display text-3xl font-bold mb-6" style={{ color: 'var(--color-forest)' }}>
                  Location & Contact Details
                </h2>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-terracotta)' }} />
                    <div>
                      <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-forest)' }}>Address</h4>
                      <p className="text-sm font-light leading-relaxed mt-1" style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}>
                        Tanah Farmstead, 12 Green Valley,<br />
                        Aravalli Foothills, Gurgaon - 122102
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-terracotta)' }} />
                    <div>
                      <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-forest)' }}>Reservations</h4>
                      <p className="text-sm font-light leading-relaxed mt-1" style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}>
                        +91 98765 43210 <br />
                        +91 124 2345 6789
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-terracotta)' }} />
                    <div>
                      <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-forest)' }}>E-Mail Inquiry</h4>
                      <p className="text-sm font-light leading-relaxed mt-1" style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}>
                        contact@tanahkitchen.in <br />
                        events@tanahkitchen.in
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
                  OPERATING TIMINGS
                </span>
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-terracotta)' }} />
                  <div>
                    <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-forest)' }}>Weekly Hours</h4>
                    <p className="text-sm font-light leading-relaxed mt-1" style={{ color: 'var(--color-charcoal)', opacity: 0.9 }}>
                      <strong>Tuesday – Sunday:</strong> <br />
                      Lunch: 12:00 PM – 3:30 PM <br />
                      Dinner: 6:00 PM – 11:00 PM <br />
                      <span className="text-xs italic mt-2 block" style={{ color: 'var(--color-terracotta)' }}>
                        * Monday: Closed (Staff farm rest day)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Connections */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase block mb-4" style={{ color: 'var(--color-terracotta)' }}>
                  FOLLOW OUR GROWTH
                </span>
                <div className="flex gap-4">
                  {socials.map((soc, sIdx) => (
                    <a
                      key={sIdx}
                      href={soc.href}
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: 'rgba(27, 67, 50, 0.15)',
                        background: 'transparent',
                        color: 'var(--color-forest)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-forest)'
                        e.currentTarget.style.color = 'var(--color-cream)'
                        e.currentTarget.style.borderColor = 'var(--color-forest)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--color-forest)'
                        e.currentTarget.style.borderColor = 'rgba(27, 67, 50, 0.15)'
                      }}
                    >
                      <soc.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Premium Contact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center border"
                  style={{
                    background: 'var(--color-beige)',
                    borderColor: 'rgba(27, 67, 50, 0.05)'
                  }}
                >
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-terracotta" style={{ color: 'var(--color-terracotta)' }} />
                  <h3 className="font-display text-3xl font-bold mb-4 text-forest" style={{ color: 'var(--color-forest)' }}>
                    Message Received
                  </h3>
                  <p className="text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--color-charcoal)' }}>
                    Thank you for writing to Tanah. Our hospitality team will review your inquiry details regarding <span className="font-semibold text-forest">"{form.subject}"</span> and reply back via <span className="font-semibold text-forest">{form.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'Table Booking Inquiry', message: '' }); }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleSubmit}
                  className="p-8 md:p-12 space-y-6 border"
                  style={{
                    background: 'var(--color-beige)',
                    borderColor: 'rgba(27, 67, 50, 0.05)'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-forest/70">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input"
                        maxLength={80}
                      />
                      {errors.name && (
                        <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta)' }}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-forest/70">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="form-input"
                        maxLength={20}
                      />
                      {errors.phone && (
                        <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta)' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-forest/70">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="form-input"
                      maxLength={120}
                    />
                    {errors.email && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta)' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-forest/70">
                      Nature of Inquiry
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="form-input"
                      style={{ height: '54px' }}
                    >
                      <option value="Table Booking Inquiry">Table Booking Inquiry</option>
                      <option value="Private Event Catering">Private Event Catering</option>
                      <option value="Media & Press Relations">Media & Press Relations</option>
                      <option value="Farm Sourcing Partnership">Farm Sourcing Partnership</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase mb-2 text-forest/70">
                      Tell Us More
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please details what you need..."
                      className="form-input resize-none"
                      rows={5}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-terracotta)' }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-center justify-center py-4"
                  >
                    Send Secure Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section 
        className="w-full relative leading-none"
        style={{ borderTop: '1px solid rgba(27, 67, 50, 0.05)' }}
      >
        <iframe
          title="Tanah Kitchen Estate Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112340.91223940182!2d76.99341498145155!3d28.369342931448834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d3c80fffff7%3A0x6b453ebce01e4a1a!2sSohna%20Road%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="480"
          style={{ border: 0, filter: 'grayscale(0.9) contrast(1.1) invert(0)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </main>
  )
}
