import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews } from '../data/reviews';

const INTERVAL = 6000;

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % reviews.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + reviews.length) % reviews.length), []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const review = reviews[current];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-zinc-900/20" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-burgundy/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">What Our Clients Say</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            Real stories from travellers who trusted us with their journey across Morocco.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass rounded-2xl p-8 md:p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-5">
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
                <div className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm ring-2 ring-gold/30">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.country}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="glass text-white/50 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-white/10" aria-label="Previous review">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40 w-1.5'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="glass text-white/50 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-white/10" aria-label="Next review">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
