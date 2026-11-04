import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { reviews } from '../data/reviews';

const INTERVAL = 6000;

export default function Reviews() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % reviews.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + reviews.length) % reviews.length), []);

  const autoplayEnabled = !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplayEnabled) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [autoplayEnabled, next]);

  const review = reviews[current];
  const fmt = new Intl.RelativeTimeFormat(
    i18n.language.split('-')[0],
    { numeric: 'auto', style: 'long' },
  );
  const relativeDate = review.date ? fmt.format(-review.date.count, review.date.unit) : null;
  const meta = [review.country, relativeDate].filter(Boolean).join(' · ');
  const initials = review.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('');

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-zinc-900/20" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-burgundy/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">{t('reviews.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div
          ref={containerRef}
          className="max-w-2xl mx-auto relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={(e) => {
            const target = e.relatedTarget as Node | null;
            if (!target || !containerRef.current?.contains(target)) resume();
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass rounded-2xl p-8 md:p-10 text-center"
              aria-roledescription="carousel item"
            >
              <div className="flex justify-center gap-1 mb-5" aria-hidden="true">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm ring-2 ring-gold/30" aria-hidden="true">
                  {initials}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  {meta && <p className="text-white/55 text-xs">{meta}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button type="button" onClick={prev} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white" aria-label={t('reviews.previous')}>
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-2 min-w-[10rem]">
              <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-white/50 tabular-nums">
                {t('reviews.ofReviews', { current: current + 1, total: reviews.length })}
              </p>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${((current + 1) / reviews.length) * 100}%` }}
                />
              </div>
            </div>
            <button type="button" onClick={next} className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white" aria-label={t('reviews.next')}>
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
