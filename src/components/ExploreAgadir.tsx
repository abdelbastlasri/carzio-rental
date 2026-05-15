import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/images/puerto-deportivo-agadir.jpg',
    title: 'Agadir Marina',
    subtitle: 'Puerto Deportivo',
  },
  {
    image: '/images/cable-car.jpg',
    title: 'Télécabine d\'Agadir',
    subtitle: 'Cable Car',
  },
  {
    image: '/images/agadir-oufella.jpg',
    title: 'Agadir Oufella',
    subtitle: 'Kasbah Hilltop',
  },
];

export default function ExploreAgadir() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-2 tracking-tight">Explore Agadir</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            Discover the beauty of Agadir while driving with Carzio
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] glass p-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="text-white font-heading text-xl md:text-2xl font-bold tracking-tight">{slides[current].title}</h3>
                  <p className="text-gold text-sm">{slides[current].subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 glass text-white/70 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 glass text-white/70 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40 w-1.5'}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/cars"
            className="inline-block glass-gold text-white font-semibold px-8 py-3 rounded-xl transition text-sm hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
          >
            Book a Car to Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
