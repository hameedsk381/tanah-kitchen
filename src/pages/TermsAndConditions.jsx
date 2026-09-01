import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Clock, Wine, Shirt, AlertCircle, FileCheck, Mail, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import contactData from '../data/contact.json'

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow pt-24 overflow-hidden bg-[#FAF8F5] text-[#1E1B18]">
      <SEO
        title="Terms & Conditions | Tanah Kitchen & Bar Hyderabad"
        description="Review the Terms and Conditions of dining, reservations, resort casual dress code, and Liquid Library policies at Tanah Kitchen & Bar, Gachibowli."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Tanah Kitchen & Bar Terms and Conditions',
          'url': 'https://tanahkitchen.in/terms-and-conditions'
        }}
      />

      {/* ── 1. Page Header (WordPress Dark Banner) ── */}
      <section className="section-dark relative py-20 lg:py-28 text-center border-b border-light-cream/15">
        <div className="relative z-10 wp-container">
          <span className="wp-badge wp-badge-gold mb-4">
            ✦ GUEST GUIDELINES ✦
          </span>
          <h1
            className="font-display font-extrabold leading-tight text-[#E5E2DC] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            Terms &amp; Conditions
          </h1>
          <div className="w-20 h-[2px] bg-[#E5E2DC]/60 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base font-light max-w-xl mx-auto text-[#FAF8F5]/90 leading-relaxed font-body">
            Last Updated: February 2025. Please review our dining, reservation, and sanctuary policies.
          </p>
        </div>
      </section>

      {/* ── 2. Terms Content (WordPress Document Card) ── */}
      <section className="wp-section bg-[#FAF8F5]">
        <div className="wp-container max-w-4xl">
          <div className="wp-card p-8 sm:p-12 md:p-16 space-y-10 text-left shadow-xl border border-[#5E332E]/10">
            
            {/* Section 1: Agreement to Terms */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  1. Agreement to Terms
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                By accessing this website, making an online table reservation, or visiting Tanah Kitchen &amp; Bar on the 5th Floor, Vaishnavi Splendora, Gachibowli, Hyderabad, you agree to be bound by these Terms and Conditions and our associated house policies.
              </p>
            </div>

            {/* Section 2: Table Reservations & Holding Policy */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  2. Table Reservations &amp; Holding Window
                </h2>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#1E1B18]/80 font-body list-disc pl-6">
                <li><strong className="text-[#5E332E]">15-Minute Grace Period:</strong> Reserved tables will be held for a maximum of 15 minutes past the confirmed reservation time. If your party is delayed, please inform our reception desk to avoid table reallocation.</li>
                <li><strong className="text-[#5E332E]">Seating Allocation:</strong> While we endeavor to fulfill specific area requests (such as the open-air Sunset Terrace or intimate Basalt booths), table allocations are subject to real-time weather and operational availability.</li>
                <li><strong className="text-[#5E332E]">Large Corporate Groups:</strong> Bookings for parties of 15 or more guests may require an advance culinary selection and a customized reservation agreement.</li>
              </ul>
            </div>

            {/* Section 3: Resort Casual Dress Code */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Shirt className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  3. Resort Casual Dress Code
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                To preserve the serene, elevated ambiance of our rooftop sanctuary, we encourage <strong className="text-[#5E332E]">Resort Casual / Smart Casual</strong> attire. Athletic sportswear, beachwear, and flip-flops are respectfully discouraged in the evening dining rooms.
              </p>
            </div>

            {/* Section 4: Liquid Library & Age Regulations */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <Wine className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  4. Liquid Library &amp; Alcoholic Beverages
                </h2>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#1E1B18]/80 font-body list-disc pl-6">
                <li>In accordance with Telangana Excise laws, alcoholic beverages are served strictly to guests aged <strong className="text-[#5E332E]">21 years and older</strong>. Valid government-issued photo identification may be requested.</li>
                <li>Outside alcoholic beverages and food items are strictly prohibited on the premises.</li>
                <li>We uphold responsible service of alcohol and reserve the right to refuse service to intoxicated patrons.</li>
              </ul>
            </div>

            {/* Section 5: Cancellations & Modifications */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  5. Cancellations &amp; Modifications
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                Due to our farm-to-table sourcing and slow-cooked ember preparations, we appreciate a minimum of 4 hours' notice for cancellations or modifications of standard table bookings. Corporate event buyout cancellations are governed by the bespoke event contract.
              </p>
            </div>

            {/* Section 6: Intellectual Property & Media */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5E332E]/10 text-[#5E332E]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                  6. Intellectual Property &amp; Photography
                </h2>
              </div>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                All branding marks, logo owl emblems, photographic archives, menu illustrations, and architectural designs on this website are the proprietary intellectual property of Tanah Kitchen &amp; Bar. Casual photography is welcomed in our spaces; commercial shoots require prior written management clearance.
              </p>
            </div>

            {/* Section 7: Contact & Hospitality Desk */}
            <div className="space-y-4 pt-4 border-t border-[#5E332E]/10">
              <h2 className="font-display text-2xl font-bold text-[#5E332E]">
                7. Hospitality Desk Contact
              </h2>
              <p className="text-sm sm:text-base font-light text-[#1E1B18]/85 leading-relaxed font-body">
                For questions or clarifications regarding our terms, dining policies, or corporate booking contracts, please reach out to us:
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
                to="/privacy-policy"
                className="text-xs font-bold text-[#5E332E] hover:underline"
              >
                ← View Privacy Policy
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
