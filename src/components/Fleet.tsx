import { fleet } from '../data/fleet';
import CarCard from './CarCard';

interface FleetProps {
  onBook: (carId: string) => void;
  featured?: boolean;
}

export default function Fleet({ onBook, featured }: FleetProps) {
  const cars = featured ? fleet.slice(0, 4) : fleet;
  return (
    <section id="cars" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-burgundy/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {featured ? 'Featured Vehicles' : 'Our Cars'}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {featured
              ? 'Handpicked selection of our most popular vehicles for every journey.'
              : 'Browse our selection of premium vehicles — comfort, style and reliability for every journey.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} onBook={onBook} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
