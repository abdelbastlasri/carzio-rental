import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const slides = Array.from({ length: 7 }, (_, i) => ({
  image: `/images/home/${i + 1}.jpg`,
  headline: i === 0 ? 'Drive Morocco' : i === 1 ? 'Explore Agadir' : i === 2 ? 'Land. Drive.' : i === 3 ? 'Your Journey' : i === 4 ? 'Freedom Awaits' : i === 5 ? 'On Your Terms' : 'Unforgettable',
  subhead: i === 0 ? 'Your Way' : i === 1 ? 'In Style' : i === 2 ? 'Discover.' : i === 3 ? 'Starts Here' : i === 4 ? 'Book Now' : i === 5 ? 'Anywhere' : 'Road Trips',
}));

const INTERVAL = 5000;

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
      className="relative min-h-screen flex items-center bg-black overflow-hidden pt-32 md:pt-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition backdrop-blur-sm border border-white/10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition backdrop-blur-sm border border-white/10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-8' : 'bg-white/40 hover:bg-white/60 w-2'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <p className="text-gold font-heading font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
            Premium Car Rentals &middot; Agadir
          </p>
          <h1 className="text-white font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            {slides[current].headline}<br />
            <span className="text-gold">{slides[current].subhead}</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl">
            Get the best value for your trip with transparent pricing, flexible options, and top-notch service you can trust.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="bg-gold hover:bg-gold-light text-black font-semibold px-8 py-3 rounded transition text-sm md:text-base shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              Browse Fleet
            </Link>
            <Link
              to="/contact"
              className="border border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-3 rounded transition text-sm md:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
