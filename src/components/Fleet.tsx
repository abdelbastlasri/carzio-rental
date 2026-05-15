import { fleet } from '../data/fleet';
import CarCard from './CarCard';

interface FleetProps {
  onBook: (carId: string) => void;
}

export default function Fleet({ onBook }: FleetProps) {
  return (
    <section id="cars" className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-black font-heading text-3xl md:text-4xl font-bold mb-3">Our Cars</h2>
          <p className="text-silver max-w-xl mx-auto">
            Browse our selection of premium vehicles &mdash; comfort, style and reliability for every journey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fleet.map((car) => (
            <CarCard key={car.id} car={car} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
