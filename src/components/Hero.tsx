import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/puerto-deportivo-agadir.jpg',
    headline: 'Drive Morocco',
    subhead: 'Your Way',
  },
  {
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1600&q=80',
    headline: 'Explore Agadir',
    subhead: 'In Style',
  },
  {
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1600&q=80',
    headline: 'Land. Drive.',
    subhead: 'Discover.',
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden pt-32 md:pt-36">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${slides[0].image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute top-24 right-4 md:right-8 bg-burgundy/90 text-white text-xs md:text-sm font-heading font-semibold px-4 py-2 rounded-l-full tracking-wider">
        الله &middot; الوطن &middot; الملك
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <p className="text-gold font-heading font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
            Premium Car Rentals &middot; Agadir
          </p>
          <h1 className="text-white font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Drive Morocco<br />
            <span className="text-gold">Your Way</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl">
            Get the best value for your trip with transparent pricing, flexible options, and top-notch service you can trust.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cars"
              className="bg-gold hover:bg-gold-light text-black font-semibold px-8 py-3 rounded transition text-sm md:text-base"
            >
              Browse Fleet
            </Link>
            <Link
              to="/contact"
              className="border border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-3 rounded transition text-sm md:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
