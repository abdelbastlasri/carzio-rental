import { useState, useCallback, useEffect } from 'react';

const gallery = [
  { src: '/images/home/1.jpg', title: 'Agadir Bay', subtitle: 'Atlantic Coastline' },
  { src: '/images/home/2.jpg', title: 'Marina d\'Agadir', subtitle: 'Puerto Deportivo' },
  { src: '/images/home/3.jpg', title: 'Télécabine', subtitle: 'Cable Car Views' },
  { src: '/images/home/4.jpg', title: 'Souk El Had', subtitle: 'Local Market' },
  { src: '/images/home/5.jpg', title: 'Taghazout Surf', subtitle: 'Coastal Vibe' },
  { src: '/images/home/6.jpg', title: 'Agadir Sunset', subtitle: 'Golden Hour' },
  { src: '/images/home/7.jpg', title: 'Kasbah Ruins', subtitle: 'Agadir Oufella' },
];

export default function HomeGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const open = useCallback((i: number) => setSelected(i), []);
  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected(s => s !== null ? (s - 1 + gallery.length) % gallery.length : null), []);
  const next = useCallback(() => setSelected(s => s !== null ? (s + 1) % gallery.length : null), []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close, prev, next]);

  return (
    <section className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-zinc-900/30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-burgundy/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Discover Agadir
          </h2>
          <p className="text-silver/80 max-w-xl mx-auto text-sm md:text-base">
            Explore the beauty of Agadir through our lens &mdash; every drive tells a story
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {gallery.map((img, i) => {
            const isWide = i === 0 || i === 5;
            const isTall = i === 2 || i === 4;
            return (
              <button
                key={i}
                onClick={() => open(i)}
                className={`group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-gold/30 transition-all duration-500 ${
                  isWide ? 'col-span-2' : ''
                } ${isTall ? 'row-span-2' : ''} aspect-[4/3] ${isTall ? 'aspect-[3/4] md:aspect-[3/4]' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-heading font-semibold text-sm md:text-base">{img.title}</h3>
                  <p className="text-gold/80 text-xs">{img.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[selected].src}
              alt={gallery[selected].title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
              <h3 className="text-white font-heading font-semibold text-lg">{gallery[selected].title}</h3>
              <p className="text-gold text-sm">{gallery[selected].subtitle}</p>
              <p className="text-silver/60 text-xs mt-1">{selected + 1} / {gallery.length}</p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center transition backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center transition backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selected ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
