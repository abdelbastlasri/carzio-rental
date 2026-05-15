import { Link } from 'react-router-dom';

export default function AirportSection() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')" }}
      />
      <div className="relative z-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-4">
              Airport Service
            </h2>
            <p className="text-gold font-heading text-xl md:text-2xl font-semibold mb-3">
              Land. Drive. Discover.
            </p>
            <p className="text-gray-300 text-base mb-6">
              Our convenient airport pickup &amp; drop-off service at Agadir Al Massira Airport
              gets you on the road without delays or complications.
            </p>
            <Link
              to="/cars"
              className="inline-block bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded transition text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
