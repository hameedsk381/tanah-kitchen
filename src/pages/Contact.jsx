import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, MessageSquare, Mail, Clock, CheckCircle } from 'lucide-react'
import contactData from '../data/contact.json'
import SEO from '../components/SEO'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email.'
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.'
    if (!form.message.trim()) errs.message = 'Please enter your message details.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    console.log('Form Submitted (Console Track Only):', form)
    setSubmitted(true)
  }

  return (
    <main className="flex-grow pt-24 overflow-hidden bg-[#FAF6F0] text-[#3A2E2A]">
      <SEO
        title="Contact Us & Location Directions | Tanah Kitchen & Bar Gachibowli"
        description="Get directions and contact information for Tanah Kitchen & Bar. Located on 5th Floor, Vaishnavi Splendora, opp Meenakshi Bamboos, beside AIG Hospital, Gachibowli, Hyderabad."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          'name': 'Tanah Kitchen & Bar',
          'url': 'https://tanahkitchen.in/contact',
          'telephone': '+91-8977730291',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '5th Floor, Vaishnavi Splendora, opp Meenakshi Bamboos, beside AIG Hospital',
            'addressLocality': 'Gachibowli',
            'addressRegion': 'Telangana',
            'postalCode': '500032',
            'addressCountry': 'IN'
          }
        }}
      />

      {/* ── 1. Page Header (WordPress Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-light-cream/15 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply">
          <img
            src="/assets/Tanha Image/02.webp"
            alt="Tanah Bar ambience banner"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2A]/90 via-[#6B2523]/70 to-[#6B2523]/85" />

        <div className="relative z-10 wp-container">
          <span className="wp-badge wp-badge-gold mb-4">
            ✦ GET IN TOUCH ✦
          </span>
          <h1
            className="font-display font-extrabold leading-tight text-[#F6E1CB] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            Contact & Coordinates
          </h1>
          <div className="w-20 h-[2px] bg-[#FFC470]/60 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base font-light max-w-xl mx-auto text-[#EFE1D0]/90 leading-relaxed font-body">
            Reach out to our hospitality desk. Ask about events, corporate bookings, or special dining arrangements.
          </p>
        </div>
      </section>

      {/* ── 2. Details & Form Section (WordPress 2-Column Block) ── */}
      <section className="wp-section bg-[#FAF6F0]">
        <div className="wp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Info Coordinates in WordPress Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="wp-badge wp-badge-maroon mb-2">
                  LOCATION & CONTACTS
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#6B2523]">
                  {contactData.brandName}
                </h2>
              </div>

              <div className="space-y-3.5">
                <div className="wp-card p-5 flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-[#6B2523]/10 text-[#6B2523] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#6B2523] mb-1">Address</h4>
                    <p className="whitespace-pre-line text-xs text-[#3A2E2A]/80 font-body leading-relaxed">{contactData.address}</p>
                  </div>
                </div>

                <div className="wp-card p-5 flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-[#6B2523]/10 text-[#6B2523] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#6B2523] mb-1">Reservations</h4>
                    <p className="text-xs text-[#3A2E2A]/80 font-body">{contactData.phone1}</p>
                    <p className="text-xs text-[#3A2E2A]/80 font-body">{contactData.phone2}</p>
                  </div>
                </div>

                <div className="wp-card p-5 flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-[#6B2523]/10 text-[#6B2523] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#6B2523] mb-1">E-Mail</h4>
                    <p className="text-xs text-[#3A2E2A]/80 font-body">{contactData.email}</p>
                  </div>
                </div>

                <div className="wp-card p-5 flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-[#6B2523]/10 text-[#6B2523] flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-[#6B2523] mb-1">Operating Timings</h4>
                    <p className="text-xs text-[#3A2E2A]/80 font-body">{contactData.timings.days}</p>
                    <p className="text-xs text-[#3A2E2A]/80 font-body">Lunch: {contactData.timings.lunch} | Dinner: {contactData.timings.dinner}</p>
                    <p className="text-[11px] text-[#6B2523] font-semibold mt-1">{contactData.timings.note}</p>
                  </div>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${contactData.phone1.replace(/\s+/g, '')}`}
                  className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] text-xs font-bold"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-btn-pill bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 bg-white rounded-3xl text-center space-y-6 shadow-xl border border-[#6B2523]/10"
                >
                  <CheckCircle className="w-16 h-16 text-[#6B2523] mx-auto" />
                  <h3 className="font-display text-3xl font-bold text-[#6B2523]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm font-light text-[#3A2E2A]/80 leading-relaxed font-body max-w-md mx-auto">
                    Thank you for contacting Tanah Kitchen & Bar. Our hospitality desk will get in touch with you at <span className="font-semibold text-[#6B2523]">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }) }}
                    className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-8 md:p-12 bg-white rounded-3xl space-y-5 shadow-xl text-left border border-[#6B2523]/10 text-[#3A2E2A]"
                >
                  <div>
                    <span className="wp-badge wp-badge-maroon mb-2">
                      MESSAGE US
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[#6B2523]">
                      Send an Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="wp-form-input text-sm"
                      />
                      {errors.name && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 89777 30291"
                        className="wp-form-input text-sm"
                      />
                      {errors.phone && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.phone}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="wp-form-input text-sm"
                    />
                    {errors.email && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-[#6B2523] block mb-1.5">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you would like to ask..."
                      rows={4}
                      className="wp-form-input text-sm resize-none"
                    />
                    {errors.message && <span className="text-xs text-red-600 block mt-1 font-medium">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="wp-btn-pill bg-[#6B2523] text-[#F6E1CB] hover:bg-[#3A2E2A] hover:text-white shadow-lg w-full py-4 text-xs font-bold tracking-widest mt-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Embedded Google Map ── */}
      <section className="w-full relative leading-none border-t border-[#6B2523]/15">
        <iframe
          title="Tanah Kitchen & Bar Google Map Location"
          src={contactData.mapUrl}
          width="100%"
          height="450"
          style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </main>
  )
}
