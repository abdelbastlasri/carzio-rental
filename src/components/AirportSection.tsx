import { Link } from 'react-router-dom';

export default function AirportSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Airport Service
            </h2>
            <p className="text-gold font-heading text-xl md:text-2xl font-semibold mb-3">
              Land. Drive. Discover.
            </p>
            <p className="text-white/60 text-base mb-6">
              Our convenient airport pickup &amp; drop-off service at Agadir Al Massira Airport
              gets you on the road without delays or complications.
            </p>
            <Link
              to="/cars"
              className="inline-block glass-gold text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
