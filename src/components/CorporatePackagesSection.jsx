import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, ShieldAlert, Sparkles, ChevronDown, Phone, Mail, MapPin, Wine, Beer, Coffee, Utensils } from 'lucide-react'
import { corporatePackagesData } from '../data/corporatePackages'
import { Link } from 'react-router-dom'

export default function CorporatePackagesSection() {
  const [activeTab, setActiveTab] = useState('packages') // 'packages' | 'comparison' | 'pool' | 'terms'
  const [selectedPoolCategory, setSelectedPoolCategory] = useState('vegStarters')
  const [openTermSection, setOpenTermSection] = useState(true)

  const { packages, comparisonTable, menuPool, terms, contact } = corporatePackagesData

  return (
    <section id="corporate-packages" className="wp-section bg-[#FAF6F0] border-t border-[#6B2523]/10 text-left">
      <div className="max-w-7xl px-6 sm:px-8 mx-auto space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#6B2523]/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="wp-badge wp-badge-maroon">
                ✦ OFFICIAL PACKAGES ✦
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#882B06]">
                Minimum 25 Pax
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-[#6B2523] leading-tight">
              TANAH Corporate & Gathering Packages
            </h2>
            <p className="text-sm md:text-base text-[#3A2E2A]/85 font-body leading-relaxed">
              Curated dining and celebration packages crafted for executive dinners, team offsites, milestone celebrations, and brand receptions on our rooftop sanctuary.
            </p>
          </div>

          {/* Quick Contact Badge */}
          <div className="bg-white p-4 rounded-2xl border border-[#6B2523]/15 shadow-sm space-y-1.5 flex-shrink-0">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#882B06] block">
              Direct Corporate Desk
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-[#6B2523]">
              <Phone className="w-3.5 h-3.5" />
              <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#3A2E2A]/80">
              <Mail className="w-3.5 h-3.5" />
              <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
            </div>
          </div>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'packages', label: '1. Package Tiers (The 4 Plans)' },
            { id: 'comparison', label: '2. Comparison Matrix' },
            { id: 'pool', label: '3. Menu Pool Selection (50+ Dishes)' },
            { id: 'terms', label: '4. Terms & Serving Timings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#6B2523] text-[#FFC470] shadow-md'
                  : 'bg-white text-[#3A2E2A] border border-[#6B2523]/15 hover:border-[#6B2523]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 4 TIERED PACKAGES */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative bg-white border ${
                  pkg.popular
                    ? 'border-[#6B2523] shadow-xl ring-2 ring-[#6B2523]/20'
                    : 'border-[#6B2523]/15 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6B2523] text-[#FFC470] text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    ★ Most Recommended
                  </div>
                )}

                <div className="space-y-4">
                  <div className="border-b border-[#6B2523]/10 pb-4">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#882B06] block mb-1">
                      {pkg.badge}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#6B2523]">
                      {pkg.name}
                    </h3>
                    <div className="mt-2">
                      <span className="font-display font-extrabold text-2xl md:text-3xl text-[#3A2E2A]">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#3A2E2A]/70 font-semibold block">
                        + taxes / person
                      </span>
                    </div>
                  </div>

                  {/* Food Inclusions */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#6B2523] flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-[#882B06]" />
                      Food Courses
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#3A2E2A]">
                      {pkg.food.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Beverages & Alcohol */}
                  <div className="space-y-2 pt-2 border-t border-[#6B2523]/10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#6B2523] flex items-center gap-1.5">
                      {pkg.alcoholList.length > 0 ? (
                        <Beer className="w-3 h-3 text-[#882B06]" />
                      ) : (
                        <Coffee className="w-3 h-3 text-[#882B06]" />
                      )}
                      Beverages & Bar
                    </span>
                    <ul className="space-y-1 text-xs text-[#3A2E2A]">
                      {pkg.beverages.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-[#882B06] font-bold">✦</span>
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {pkg.alcoholList.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10 mt-2 space-y-1">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#6B2523] block">
                          Included Brands:
                        </span>
                        <p className="text-[11px] text-[#3A2E2A]/85 leading-snug">
                          {pkg.alcoholList.join(' • ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#6B2523]/10">
                  <Link
                    to="/book"
                    className="w-full py-2.5 rounded-xl bg-[#6B2523] hover:bg-[#3A2E2A] text-[#FFC470] text-xs font-bold uppercase tracking-wider text-center block shadow-xs transition-all"
                  >
                    Select {pkg.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 2: PACKAGE COMPARISON MATRIX */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B2523]/15 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-[#6B2523]/20 bg-[#FAF6F0]">
                  <th className="p-3.5 font-display font-bold text-[#6B2523] uppercase">Package</th>
                  <th className="p-3.5 font-display font-bold text-[#6B2523] uppercase">Price/Person</th>
                  <th className="p-3.5 font-semibold text-[#3A2E2A] uppercase">Veg Starters</th>
                  <th className="p-3.5 font-semibold text-[#3A2E2A] uppercase">Non-Veg Starters</th>
                  <th className="p-3.5 font-semibold text-[#3A2E2A] uppercase">Veg Mains</th>
                  <th className="p-3.5 font-semibold text-[#3A2E2A] uppercase">Non-Veg Mains</th>
                  <th className="p-3.5 font-semibold text-[#3A2E2A] uppercase">Desserts</th>
                  <th className="p-3.5 font-display font-bold text-[#6B2523] uppercase">Alcohol / Bar</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#6B2523]/10 hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-3.5 font-display font-bold text-[#6B2523] text-base">{row.name}</td>
                    <td className="p-3.5 font-extrabold text-[#882B06]">{row.price}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{row.vegStarters}</td>
                    <td className="p-3.5 font-bold text-rose-700">{row.nonVegStarters}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{row.vegMains}</td>
                    <td className="p-3.5 font-bold text-rose-700">{row.nonVegMains}</td>
                    <td className="p-3.5 font-bold text-[#882B06]">{row.desserts}</td>
                    <td className="p-3.5 text-xs text-[#3A2E2A] font-medium">{row.alcohol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-[#3A2E2A]/70 italic mt-4">
              * All prices are before applicable government taxes and service charges. Minimum guarantee of 25 guests applies.
            </p>
          </div>
        )}

        {/* TAB 3: MENU POOL DATASET */}
        {activeTab === 'pool' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B2523]/15 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-[#6B2523]">
                Corporate Menu Selection Pool
              </h3>
              <p className="text-xs text-[#3A2E2A]/70 mt-0.5">
                Choose your package dishes from this official pool of 50+ artisanal creations.
              </p>
            </div>

            {/* Sub category tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#6B2523]/10 pb-4">
              {[
                { id: 'vegStarters', label: `Vegetarian Starters (${menuPool.vegStarters.length})` },
                { id: 'nonVegStarters', label: `Non-Veg Starters (${menuPool.nonVegStarters.length})` },
                { id: 'vegMains', label: `Veg Mains & Rice` },
                { id: 'nonVegMains', label: `Non-Veg Mains & Biryanis` },
                { id: 'desserts', label: `Desserts (${menuPool.desserts.length})` }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedPoolCategory(sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    selectedPoolCategory === sub.id
                      ? 'bg-[#882B06] text-[#FFC470] shadow-sm'
                      : 'bg-[#FAF6F0] text-[#3A2E2A] hover:bg-[#6B2523]/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Pool Items Grid */}
            <div className="min-h-[220px]">
              {selectedPoolCategory === 'vegStarters' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {menuPool.vegStarters.map((dish, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10 text-xs font-medium text-[#3A2E2A] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                      <span>{dish}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedPoolCategory === 'nonVegStarters' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {menuPool.nonVegStarters.map((dish, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10 text-xs font-medium text-[#3A2E2A] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-700 flex-shrink-0" />
                      <span>{dish}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedPoolCategory === 'vegMains' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B2523] mb-2">Curries</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {menuPool.vegMainCourse.curries.map((c, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] text-xs font-medium text-[#3A2E2A]">
                          🍲 {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B2523] mb-2">Rice & Noodles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {menuPool.vegMainCourse.riceAndNoodles.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] text-xs font-medium text-[#3A2E2A]">
                          🍚 {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedPoolCategory === 'nonVegMains' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B2523] mb-2">Non-Veg Curries</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {menuPool.nonVegMainCourse.curries.map((c, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] text-xs font-medium text-[#3A2E2A]">
                          🍗 {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B2523] mb-2">Biryanis & Pulaos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {menuPool.nonVegMainCourse.riceAndNoodles.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#FAF6F0] text-xs font-medium text-[#3A2E2A]">
                          🥘 {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedPoolCategory === 'desserts' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {menuPool.desserts.map((d, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10 text-xs font-bold text-[#6B2523] flex items-center gap-2">
                      <span>🍨 {d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: TERMS & SERVING TIMINGS */}
        {activeTab === 'terms' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#6B2523]/15 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-xl text-[#6B2523] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#882B06]" />
                <span>Serving Timings</span>
              </h3>
              <div className="space-y-3">
                {terms.servingTimings.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF6F0] border border-[#6B2523]/10">
                    <span className="font-bold text-xs text-[#6B2523]">{t.item}</span>
                    <span className="px-3 py-1 rounded-full bg-[#6B2523] text-[#FFC470] font-mono text-xs font-bold">
                      {t.duration}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B2523] mb-2">
                  Alcohol & Beverage Guidelines
                </h4>
                <ul className="space-y-1.5 text-xs text-[#3A2E2A]/85">
                  {terms.alcoholRules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-[#882B06] font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#6B2523]/15 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-xl text-[#6B2523] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#882B06]" />
                <span>Booking Terms & Guarantees</span>
              </h3>

              <div className="space-y-3 text-xs text-[#3A2E2A]/90 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-0.5">Minimum Guarantee:</span>
                  <span className="text-amber-800">{terms.minimumGuarantee}</span>
                </div>

                <div>
                  <span className="font-bold text-[#6B2523] block mb-1">Payment Schedule:</span>
                  <ul className="space-y-1 pl-3">
                    {terms.payment.map((p, pIdx) => (
                      <li key={pIdx} className="list-disc">{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-[#6B2523] block mb-0.5">Cancellation Policy:</span>
                  <p>{terms.cancellation}</p>
                </div>

                <div>
                  <span className="font-bold text-[#6B2523] block mb-0.5">Additional Billing & Taxes:</span>
                  <ul className="space-y-1 pl-3">
                    {terms.billing.map((b, bIdx) => (
                      <li key={bIdx} className="list-disc">{b}</li>
                    ))}
                    <li className="list-disc">{terms.taxes}</li>
                    <li className="list-disc">{terms.damages}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
