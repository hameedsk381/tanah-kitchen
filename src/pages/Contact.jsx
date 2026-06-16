import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, MessageSquare, Mail, Clock, CheckCircle } from 'lucide-react'
import contactData from '../data/contact.json'

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
    document.title = 'Contact & Location | Tanah Kitchen & Bar'
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
    <main className="flex-grow pt-28 bg-bg-primary">
      
      {/* Editorial Header */}
      <section className="relative py-28 md:py-36 text-center border-b border-gold/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src={contactData.heroImage}
            alt="Tanah Bar ambience banner"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative z-10 px-8 max-w-container mx-auto">
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-4">
            Connect
          </span>
          <h1 
            className="font-display font-light text-text-light leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
          >
            Contact & Coordinates
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-text-muted leading-relaxed">
            Reach out to our hospitality desk. Ask about events, corporate bookings, or special dining arrangements.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative py-20 bg-bg-primary">
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Info Coordinates */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block">
                  Location & Contacts
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-light text-text-light">
                  {contactData.brandName}
                </h2>
              </div>

              <div className="space-y-6 text-sm font-light text-text-muted leading-relaxed">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-light mb-1">Address</h4>
                    <p>{contactData.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-light mb-1">Reservations</h4>
                    <p>{contactData.phone1}</p>
                    <p>{contactData.phone2}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-light mb-1">E-Mail</h4>
                    <p>{contactData.email}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-light mb-1">Operating timinigs</h4>
                    <p>{contactData.timings.days}</p>
                    <p>Lunch: {contactData.timings.lunch}</p>
                    <p>Dinner: {contactData.timings.dinner}</p>
                    <p className="text-[10px] text-gold mt-1">{contactData.timings.note}</p>
                  </div>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`tel:${contactData.phone1.replace(/\s+/g, '')}`}
                  className="btn-primary py-3.5 px-8 text-[9px] tracking-[0.2em] flex items-center gap-3"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call CTA
                </a>
                <a
                  href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline py-3.5 px-8 text-[9px] tracking-[0.2em] flex items-center gap-3 border-gold/40 text-gold hover:bg-gold/5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp CTA
                </a>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 border border-gold/20 bg-bg-secondary text-center space-y-6"
                >
                  <CheckCircle className="w-12 h-12 text-gold mx-auto" />
                  <h3 className="font-display text-2xl font-light text-text-light">
                    Inquiry Received
                  </h3>
                  <p className="text-xs font-light text-text-muted leading-relaxed">
                    Thank you for contacting Tanah Kitchen & Bar. Our hospitality desk will get in touch with you at <span className="text-text-light font-medium">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }) }}
                    className="btn-gold-outline text-[10px] py-3 px-6 mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-8 md:p-12 border border-gold/15 bg-bg-secondary space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold block">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input text-xs"
                      />
                      {errors.name && <span className="text-[10px] text-terracotta block">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="form-input text-xs"
                      />
                      {errors.phone && <span className="text-[10px] text-terracotta block">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="form-input text-xs"
                    />
                    {errors.email && <span className="text-[10px] text-terracotta block">{errors.email}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold block">Message / Inquiry Details</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you would like to ask..."
                      rows={5}
                      className="form-input text-xs resize-none"
                    />
                    {errors.message && <span className="text-[10px] text-terracotta block">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-center text-[10px] py-4"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Embedded grayscale map */}
      <section className="w-full relative leading-none border-t border-gold/15">
        <iframe
          title="Tanah Kitchen & Bar Google Map Location"
          src={contactData.mapUrl}
          width="100%"
          height="450"
          style={{ border: 0, filter: 'grayscale(1) contrast(1.1) invert(0.9)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </main>
  )
}
