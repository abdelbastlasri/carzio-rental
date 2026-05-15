import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/images/1.jpg',
    headline: 'Drive Morocco',
    subhead: 'Your Way',
    desc: 'Explore the Atlantic coast with premium vehicles built for comfort and performance.',
  },
  {
    image: '/images/2.jpg',
    headline: 'Coastal Freedom',
    subhead: 'Endless Views',
    desc: 'Cruise the Agadir shoreline with the wind in your hair and the sun on your skin.',
  },
  {
    image: '/images/3.jpg',
    headline: 'Ascend Higher',
    subhead: 'New Perspectives',
    desc: 'Take the scenic route through the Anti-Atlas mountains in style and confidence.',
  },
  {
    image: '/images/4.jpg',
    headline: 'Vibrant Souks',
    subhead: 'Local Treasures',
    desc: 'Navigate the heart of Agadir\'s markets with the freedom only a rental car brings.',
  },
  {
    image: '/images/5.jpg',
    headline: 'Surf & Sun',
    subhead: 'Beach Escape',
    desc: 'Taghazout is waiting. Your perfect surf trip starts with the perfect ride.',
  },
  {
    image: '/images/6.jpg',
    headline: 'Golden Hours',
    subhead: 'Unwind in Style',
    desc: 'End your day with a sunset drive along Morocco\'s most beautiful coastline.',
  },
  {
    image: '/images/7.jpg',
    headline: 'Ancient Walls',
    subhead: 'History Awaits',
    desc: 'Discover Agadir Oufella and the rich heritage of the Souss region.',
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const touchRef = useRef({ startX: 0, endX: 0 });

  const goTo = useCallback((i: number) => {
    setCurrent(i < 0 ? slides.length - 1 : i >= slides.length ? 0 : i);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [next, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchRef.current.endX = e.changedTouches[0].clientX;
    const diff = touchRef.current.startX - touchRef.current.endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background images with Ken Burns zoom */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? [1, 1.2] : 1.2,
          }}
          transition={{
            opacity: { duration: 1, ease: 'easeInOut' },
            scale: { duration: INTERVAL / 1000, ease: 'linear', repeat: i === current ? 0 : 0 },
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </motion.div>
      ))}

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-burgundy/20 rounded-full blur-[100px]" />

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass text-white/70 hover:text-white w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center transition hover:bg-white/10 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass text-white/70 hover:text-white w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center transition hover:bg-white/10 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-32 md:pt-36">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-gold font-heading font-semibold text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
                Premium Car Rentals &middot; Agadir
              </p>
              <h1 className="text-white font-heading text-4xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-4">
                {slides[current].headline}<br />
                <span className="text-gold">{slides[current].subhead}</span>
              </h1>
              <p className="text-white/60 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                {slides[current].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="glass-gold text-white font-semibold px-8 py-3 rounded-lg transition text-sm md:text-base hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Fleet
            </Link>
            <Link
              to="/contact"
              className="glass text-white/80 hover:text-white font-semibold px-8 py-3 rounded-lg transition text-sm md:text-base hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'bg-gold w-10' : 'bg-white/20 hover:bg-white/40 w-1.5'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
