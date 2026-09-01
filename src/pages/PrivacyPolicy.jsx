import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import contactData from '../data/contact.json'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow pt-24 overflow-hidden bg-[#FAF8F5] text-[#1E1B18]">
      <SEO
        title="Privacy Policy | Tanah Kitchen & Bar Hyderabad"
        description="Read the official Privacy Policy for Tanah Kitchen & Bar. Learn how we handle table reservation data, contact inquiries, personal information, and data security."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Tanah Kitchen & Bar Privacy Policy',
          'url': 'https://tanahkitchen.com/privacy-policy'
        }}
      />

      {/* ── 1. Page Header (WordPress Dark Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-light-cream/15">
        <div className="relative z-10 wp-container">
          <span className="wp-badge wp-badge-gold mb-4">
            ✦ LEGAL &amp; TRANSPARENCY ✦
          </span>
          <h1
            className="font-display font-extrabold leading-tight text-[#E5E2DC] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            Privacy Policy
          </h1>
          <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base font-light max-w-xl mx-auto text-[#FAF8F5]/90 leading-relaxed font-body">
            Last Updated: February 2025. Your privacy is paramount to our hospitality.
          </p>
        </div>
      </section>

      {/* ── 2. Policy Content (WordPress Document Card) ── */}
      <section className="wp-section bg-[#FAF8F5]">
        <div className="wp-container max-w-4xl">
          <div className="wp-card p-8 sm:p-12 md:p-16 space-y-10 text-left shadow-xl border border-[#5E332E]/10">
            
            {/* Introduction */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  1. Overview &amp; Commitment
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                Tanah Kitchen &amp; Bar ("Tanah", "we", "our", or "us"), located in Gachibowli, Hyderabad, values the trust you place in us when sharing your personal information. This Privacy Policy details the types of information we collect, how it is used, protected, and your rights concerning your personal data when using our website or making reservations.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  2. Information We Collect
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                We collect personal information that you voluntarily submit to us when:
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#1E1B18]/80 font-body list-disc pl-6">
                <li><strong className="text-[#5E332E]">Table Reservations:</strong> Full Name, Email Address, Contact Phone Number, Preferred Date &amp; Time, Guest Party Size, and Special Dietary Requirements.</li>
                <li><strong className="text-[#5E332E]">Corporate &amp; Event Inquiries:</strong> Organization Name, Event Size, Corporate Email, and Specific Audio-Visual / Spatial Preferences.</li>
                <li><strong className="text-[#5E332E]">Newsletter (Chronicles):</strong> Email address for receiving seasonal menu updates and special culinary announcements.</li>
                <li><strong className="text-[#5E332E]">Technical Browsing Data:</strong> Anonymized analytical metadata such as IP address, browser type, and page interaction metrics collected via cookies to optimize site performance.</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  3. How We Use Your Information
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                Your information is solely utilized to deliver seamless culinary experiences, specifically:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-[#1E1B18]/80 font-body list-disc pl-6">
                <li>Confirming, modifying, and managing your dining table reservations.</li>
                <li>Communicating booking confirmations and dietary accommodations via SMS, WhatsApp, or Email.</li>
                <li>Preparing customized corporate event proposals and private space buyouts.</li>
                <li>Enhancing our website navigation, menu presentation, and guest service protocols.</li>
                <li>We do <strong className="text-[#5E332E]">never sell, lease, or distribute</strong> your personal information to third-party advertisers.</li>
              </ul>
            </div>

            {/* Data Protection & Security */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  4. Data Security &amp; Retention
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                We implement industry-standard SSL encryption and strict server access controls to protect your data. Your reservation records are retained only for as long as necessary to fulfill guest service obligations or comply with local legal and taxation requirements.
              </p>
            </div>

            {/* Cookies & Tracking */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                5. Cookies &amp; Tracking Technologies
              </h2>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                Our website utilizes minimal, essential functional cookies to remember your sensory matcher preferences and preserve session states. You can disable cookies at any time via your browser settings without affecting core browsing functionalities.
              </p>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                6. Contact Privacy Desk
              </h2>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                If you have questions regarding this Privacy Policy or wish to request the deletion or correction of your personal data, please contact our hospitality desk:
              </p>
              <div className="p-5 rounded-2xl bg-[#5E332E]/5 border border-[#5E332E]/15 space-y-2 text-xs sm:text-sm font-semibold text-[#5E332E]">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email: {contactData.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone: {contactData.phone1} / {contactData.phone2}</span>
                </p>
                <p className="text-xs text-[#1E1B18]/70 font-normal mt-1">
                  Tanah Kitchen &amp; Bar, 5th Floor, Vaishnavi Splendora, Gachibowli, Hyderabad 500032.
                </p>
              </div>
            </div>

            {/* Back CTA */}
            <div className="pt-6 border-t border-[#5E332E]/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/"
                className="wp-btn-pill bg-[#5E332E] text-[#E5E2DC] hover:bg-[#1E1B18] text-xs font-bold"
              >
                Return to Home
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-xs font-bold text-[#5E332E] hover:underline"
              >
                Read Terms &amp; Conditions →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
