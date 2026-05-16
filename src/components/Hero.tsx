import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { image: '/images/55.jpg', key: 'hero.slideSurf' },
  { image: '/images/Taghazout-by-night.jpg', key: 'hero.slideTaghazoutNight' },
  { image: '/images/Tamraght.jpg', key: 'hero.slideTamraght' },
  { image: '/images/2.jpg', key: 'hero.slide1' },
  { image: '/images/3.jpg', key: 'hero.slide2' },
  { image: '/images/66.jpg', key: 'hero.slide5' },
  { image: '/images/7.jpg', key: 'hero.slide6' },
];

const INTERVAL = 6000;

export default function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const touchRef = useRef({ startX: 0, endX: 0 });
  const mouseRef = useRef({ dragging: false, startX: 0 });

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

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current.dragging = true;
    mouseRef.current.startX = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseRef.current.dragging) return;
    mouseRef.current.dragging = false;
    const diff = mouseRef.current.startX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-black overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
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

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-burgundy/20 rounded-full blur-[100px]" />

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
                {t('hero.label')}
              </p>
              <h1 className="text-white font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                {t(`${slides[current].key}.headline`)}<br />
                <span className="text-gold">{t(`${slides[current].key}.subhead`)}</span>
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                {t(`${slides[current].key}.desc`)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="glass-gold text-white font-semibold px-8 py-3 rounded-lg transition text-sm md:text-base hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('common.browseFleet')}
            </Link>
            <Link
              to="/contact"
              className="glass text-white/80 hover:text-white font-semibold px-8 py-3 rounded-lg transition text-sm md:text-base hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </div>

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
