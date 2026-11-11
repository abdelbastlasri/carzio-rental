import { useState, useEffect, useRef, useCallback } from 'react';
import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/images/explore/corniche-agadir.webp',
    title: "Corniche d'Agadir",
    subtitle: 'Balade en bord de mer',
  },
  {
    image: '/images/explore/aeroport-agadir.webp',
    title: 'Aéroport Agadir Al Massira',
    subtitle: 'Accueil à l\u2019arrivée',
  },
  {
    image: '/images/explore/remise-des-cles.webp',
    title: 'Votre voiture vous attend',
    subtitle: 'Prête pour le départ',
  },
];

export default function ExploreAgadir() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchRef = useRef({ startX: 0, endX: 0 });
  const mouseRef = useRef({ dragging: false, startX: 0 });

  const goTo = useCallback((i: number) => {
    setCurrent(i < 0 ? slides.length - 1 : i >= slides.length ? 0 : i);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchRef.current.endX = e.changedTouches[0].clientX;
    const diff = touchRef.current.startX - touchRef.current.endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
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
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-2 tracking-tight">{t('explore.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {t('explore.subtitle')}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl aspect-[16/9] glass p-1 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { mouseRef.current.dragging = false; setIsPaused(false); }}
            onMouseEnter={() => setIsPaused(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <motion.img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="w-full h-full object-cover rounded-xl"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="text-white font-heading text-xl md:text-2xl font-bold tracking-tight">{slides[current].title}</h3>
                  <p className="text-gold text-sm">{slides[current].subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={slides[i].title}
                aria-pressed={i === current}
                className="group flex h-11 w-8 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                    i === current ? 'w-8 bg-gold' : 'w-1.5 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <LangLink
            to="/cars"
            className="inline-block glass-gold text-white font-semibold px-8 py-3 rounded-xl transition text-sm hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
          >
            {t('explore.bookCar')}
          </LangLink>
        </div>
      </div>
    </section>
  );
}
