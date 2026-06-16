import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import galleryData from '../data/gallery.json'

export default function GalleryPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Take first 3 images for the preview homepage layout
  const previewImages = galleryData.items.slice(0, 3)

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-secondary py-[var(--spacing-section)] overflow-hidden"
    >
      <div className="max-w-container px-8 mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-6">
          <div>
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold block mb-4">
              Visual Archives
            </span>
            <h2 className="font-display font-light text-text-light" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
              A View of <span className="italic text-gold">Tanah</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold hover:text-text-light transition-colors duration-300"
          >
            Explore Full Gallery &rarr;
          </Link>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-12 gap-8 md:gap-12 pb-12">
          {previewImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`${img.spanClass || 'col-span-12 md:col-span-4 aspect-video'} relative hover-zoom overflow-hidden`}
            >
              <div className="w-full h-full bg-bg-primary relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <span className="font-display text-2xl font-light text-text-light">
                    {img.caption}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
