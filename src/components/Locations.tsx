import { Link } from 'react-router-dom';
import { locations, locationImages } from '../data/locations';

export default function Locations() {
  return (
    <section className="bg-zinc-900 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3">Our Locations</h2>
          <p className="text-silver max-w-xl mx-auto">
            Visit our pickup points across Morocco &mdash; convenient airport service and city locations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-black/80 rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 shadow-lg hover:shadow-xl transition group"
            >
              <div
                className="h-44 bg-cover bg-center group-hover:scale-105 transition duration-500"
                style={{ backgroundImage: `url('${locationImages[loc.id]}')` }}
              />
              <div className="p-5">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-gold/20 transition">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-heading font-semibold text-lg mb-3">{loc.name}</h3>
                <div className="flex gap-2">
                  <Link
                    to="/cars"
                    className="flex-1 bg-gold hover:bg-gold-light text-black font-semibold text-sm py-2.5 rounded-lg text-center transition shadow-lg shadow-gold/20 hover:shadow-gold/40"
                  >
                    Book Now
                  </Link>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-800 hover:bg-gold/20 rounded-lg flex items-center justify-center transition shrink-0 border border-zinc-700"
                    title="View on map"
                  >
                    <svg className="w-5 h-5 text-gray-400 hover:text-gold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
