import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Fleet from '../components/Fleet';
import BookingModal from '../components/BookingModal';
import MobileStickyCta from '../components/MobileStickyCta';
import Seo from '../components/Seo';
import { trackEvent } from '../lib/analytics';
import { fleet } from '../data/fleet';

const fleetLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Carzio rental fleet in Agadir',
  numberOfItems: fleet.length,
  itemListElement: fleet.map((car, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: car.name,
      image: `https://www.carzio.ma${car.image}`,
      description: car.description,
      brand: { '@type': 'Brand', name: 'Carzio' },
      category: car.type,
      offers: {
        '@type': 'Offer',
        url: 'https://www.carzio.ma/en/cars',
        price: car.pricePerDay,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Carzio' },
      },
    },
  })),
};

export default function Cars() {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    trackEvent('view_fleet', { page: 'cars' });
  }, []);

  const handleBook = useCallback((carId: string) => {
    setSelectedCar(carId);
    setModalKey(prev => prev + 1);
    setBookingOpen(true);
  }, []);

  return (
    <div className="pt-28 pb-28 md:pt-32 md:pb-0">
      <Seo
        title={t('pages.carTitle')}
        description={t('pages.carDesc')}
        canonical="https://www.carzio.ma/cars"
        jsonLd={fleetLd}
      />
      <div className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2 tracking-tight">{t('fleet.title')}</h1>
           <p className="text-white/50">{t('fleet.subtitle')}</p>
        </div>
      </div>
      <Fleet onBook={handleBook} />
      <MobileStickyCta onBook={() => handleBook('')} />
      <BookingModal
        key={`booking-${modalKey}`}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={selectedCar}
      />
    </div>
  );
}
