import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-2">Explore Agadir</h2>
        <p className="text-silver mb-10 max-w-xl mx-auto">
          Discover the beauty of Agadir while driving with Carzio
        </p>
        <div className="relative max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="text-white font-heading text-xl md:text-2xl font-bold">{slide.title}</h3>
                  <p className="text-gold text-sm">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
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
                className={`w-2.5 h-2.5 rounded-full transition ${i === current ? 'bg-gold w-6' : 'bg-gray-600 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
        <Link
          to="/cars"
          className="inline-block mt-8 bg-gold hover:bg-gold-light text-black font-semibold px-8 py-3 rounded transition"
        >
          Book a Car to Explore
        </Link>
      </div>
    </section>
  );
}
