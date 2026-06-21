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
    <main className="flex-grow pt-24 bg-bg-primary text-text-dark">

      {/* Editorial Header */}
      <section className="relative py-28 md:py-36 text-center border-b border-terracotta/15 bg-bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply">
          <img
            src="/assets/Tanha Ambiance/Ambiance-21.webp"
            alt="Tanah Bar ambience banner"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative z-10 px-8 max-w-container mx-auto">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-terracotta block mb-4">
            Connect
          </span>
          <h1
            className="font-display font-light text-text-dark leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Contact & Coordinates
          </h1>
          <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-text-dark/80 leading-relaxed">
            Reach out to our hospitality desk. Ask about events, corporate bookings, or special dining arrangements.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative py-20 bg-bg-primary">
        <div className="max-w-container px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Column: Info Coordinates */}
            <div className="lg:col-span-5 space-y-10 text-left">
              <div className="space-y-4">
                <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-accent block">
                  Location & Contacts
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-light text-text-dark">
                  {contactData.brandName}
                </h2>
              </div>

              <div className="space-y-6 text-sm font-light text-text-dark/95 leading-relaxed font-body">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-dark mb-1 font-semibold">Address</h4>
                    <p className="whitespace-pre-line text-text-dark/80">{contactData.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-dark mb-1 font-semibold">Reservations</h4>
                    <p className="text-text-dark/80">{contactData.phone1}</p>
                    <p className="text-text-dark/80">{contactData.phone2}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-dark mb-1 font-semibold">E-Mail</h4>
                    <p className="text-text-dark/80">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-text-dark mb-1 font-semibold">Operating Timings</h4>
                    <p className="text-text-dark/80">{contactData.timings.days}</p>
                    <p className="text-text-dark/80">Lunch: {contactData.timings.lunch}</p>
                    <p className="text-text-dark/80">Dinner: {contactData.timings.dinner}</p>
                    <p className="text-[10px] text-accent mt-1">{contactData.timings.note}</p>
                  </div>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`tel:${contactData.phone1.replace(/\s+/g, '')}`}
                  className="btn-primary py-3.5 px-8 text-[9px] tracking-[0.2em] flex items-center gap-3 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline py-3.5 px-8 text-[9px] tracking-[0.2em] flex items-center gap-3 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp Us
                </a>
              </div>

              {/* Ambient preview image frame */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-bg-secondary relative border border-terracotta/10 pt-4">
                <img
                  src="/assets/Tanha Ambiance/Ambiance-18.webp"
                  alt="Tanha glass atrium dining details"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
                />
                <div className="absolute inset-3 border border-bg-primary/10 pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 border border-terracotta/20 bg-bg-secondary text-center space-y-6"
                >
                  <CheckCircle className="w-12 h-12 text-terracotta mx-auto animate-pulse-slow" />
                  <h3 className="font-display text-2xl font-light text-text-dark">
                    Inquiry Received
                  </h3>
                  <p className="text-xs font-light text-text-dark/80 leading-relaxed font-body">
                    Thank you for contacting Tanah Kitchen & Bar. Our hospitality desk will get in touch with you at <span className="text-text-dark font-medium">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }) }}
                    className="btn-primary text-[10px] py-3 px-6 mt-4 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-8 md:p-12 border border-primary-dark/10 bg-light-cream space-y-6 shadow-2xl text-left rounded"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark"
                      />
                      {errors.name && <span className="text-[10px] text-primary-dark block font-semibold">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark"
                      />
                      {errors.phone && <span className="text-[10px] text-primary-dark block font-semibold">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark"
                    />
                    {errors.email && <span className="text-[10px] text-primary-dark block font-semibold">{errors.email}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary-dark block">Message / Inquiry Details</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you would like to ask..."
                      rows={5}
                      className="form-input text-xs bg-white border border-primary-dark/15 text-near-black placeholder:text-near-black/40 focus:bg-white focus:border-primary-dark resize-none"
                    />
                    {errors.message && <span className="text-[10px] text-primary-dark block font-semibold">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-center text-[10px] py-4 cursor-pointer"
                    style={{ backgroundColor: '#7A2D2D', borderColor: '#7A2D2D', color: '#F2E8D5' }}
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
      <section className="w-full relative leading-none border-t border-terracotta/15">
        <iframe
          title="Tanah Kitchen & Bar Google Map Location"
          src={contactData.mapUrl}
          width="100%"
          height="450"
          style={{ border: 0, filter: 'sepia(0.2) contrast(1.1) brightness(0.95)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </main>
  )
}
