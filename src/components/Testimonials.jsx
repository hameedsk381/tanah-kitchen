import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Amara Singh',
    role: 'Food Critic, The Daily Palate',
    avatar: '🌿',
    rating: 5,
    text: 'Tanah Kitchen is nothing short of revelatory. The forest claypot biryani transported me to a heritage orchard — yet every ingredient was grown within 50 miles. This is the future of fine dining.',
  },
  {
    id: 'testimonial-2',
    name: 'Luca & Elena Rossi',
    role: 'Anniversary Dinner Guests',
    avatar: '🍃',
    rating: 5,
    text: 'We came for our 10th anniversary and left with a favorite new ritual. The garden ambiance, the attentive staff, the wood-fired risotto — pure magic. We will be back next month.',
  },
  {
    id: 'testimonial-3',
    name: 'Dr. Priya Menon',
    role: 'Nutritionist & Author',
    avatar: '🌱',
    rating: 5,
    text: 'As someone who scrutinizes every ingredient, I can say: Tanah Kitchen is the real deal. Clean, organic, wood-pressed oils, and no compromises. A true sanctuary for healthy eating.',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-lg" style={{ color: 'var(--color-terracotta)' }} aria-hidden="true">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => goTo(current === 0 ? testimonials.length - 1 : current - 1)
  const next = () => goTo(current === testimonials.length - 1 ? 0 : current + 1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28"
      style={{ 
        background: 'var(--color-cream)',
      }}
      aria-labelledby="testimonials-heading"
    >
      <div 
        className="px-6 md:px-12 relative z-10"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase block mb-4"
            style={{ color: 'var(--color-terracotta)' }}
          >
            Guest Journals
          </span>
          <h2
            id="testimonials-heading"
            className="font-display leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-forest)'
            }}
          >
            Voices of Tanah
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden min-h-[340px] relative w-full flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={testimonials[current].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-8 md:p-12 border rounded-3xl"
                style={{
                  background: 'var(--color-beige)',
                  borderColor: 'rgba(27, 67, 50, 0.05)'
                }}
              >
                {/* Quote Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'var(--color-forest)' }}
                >
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Stars */}
                <StarRating count={testimonials[current].rating} />

                {/* Text */}
                <p
                  className="font-display text-lg md:text-xl leading-relaxed mt-6 mb-8"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  "{testimonials[current].text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(27, 67, 50, 0.06)' }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold" style={{ color: 'var(--color-forest)' }}>
                      {testimonials[current].name}
                    </h4>
                    <p className="text-xs font-light tracking-wide mt-0.5" style={{ color: 'var(--color-charcoal)', opacity: 0.75 }}>
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                borderColor: 'var(--color-forest)',
                color: 'var(--color-forest)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-forest)'
                e.currentTarget.style.color = 'var(--color-cream)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-forest)'
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full h-1.5 cursor-pointer"
                  style={{
                    width: i === current ? '24px' : '8px',
                    background: i === current ? 'var(--color-terracotta)' : 'var(--color-forest)',
                    opacity: i === current ? 1 : 0.2
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                borderColor: 'var(--color-forest)',
                color: 'var(--color-forest)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-forest)'
                e.currentTarget.style.color = 'var(--color-cream)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-forest)'
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
