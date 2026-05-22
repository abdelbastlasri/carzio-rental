import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fleet } from '../data/fleet';
import CarCard from './CarCard';

interface FleetProps {
  onBook: (carId: string) => void;
  featured?: boolean;
}

export default function Fleet({ onBook, featured }: FleetProps) {
  const { t } = useTranslation();
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({});
  const cars = featured ? fleet.slice(0, 4) : fleet;

  useEffect(() => {
    fetch('/api/car-prices')
      .then(r => r.json())
      .then(data => {
        const map: Record<string, number> = {};
        data.forEach((p: { car_id: string; price_per_day: number }) => {
          map[p.car_id] = p.price_per_day;
        });
        setPriceOverrides(map);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="cars" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-burgundy/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t(featured ? 'fleet.featuredTitle' : 'fleet.title')}
          </h2>
          {featured && (
            <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
              {t('fleet.featuredSubtitle')}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} onBook={onBook} index={i} overridePrice={priceOverrides[car.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}
