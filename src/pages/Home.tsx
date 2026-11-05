import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import ExploreAgadir from '../components/ExploreAgadir';
import Locations from '../components/Locations';
import Fleet from '../components/Fleet';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import Seo from '../components/Seo';

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  name: 'Carzio',
  url: 'https://www.carzio.ma/',
  telephone: '+212680318003',
  email: 'contact@carzio.ma',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'MAG N2, Agadir Airport',
    addressLocality: 'Agadir',
    postalCode: '80000',
    addressCountry: 'MA',
  },
  areaServed: ['Agadir', 'Taghazout', 'Tamraght', 'Essaouira', 'Marrakech', 'Casablanca'],
};
import MapSection from '../components/MapSection';
import BookingModal from '../components/BookingModal';
import HomeFaq from '../components/HomeFaq';

export default function Home() {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [formData, setFormData] = useState({
    pickupLocation: 'agadir',
    dropoffLocation: 'agadir',
    pickupDate: '',
    dropoffDate: '',
    selectedCar: '',
  });

  const handleBook = (carId: string) => {
    setSelectedCar(carId);
    setBookingOpen(true);
  };

  return (
    <>
      <Seo
        title={t('pages.homeTitle')}
        description={t('pages.homeDesc')}
        canonical="https://www.carzio.ma/"
        jsonLd={localBusinessLd}
      />
      <Hero />
      <BookingForm
        onOpenBooking={() => setBookingOpen(true)}
        formData={formData}
        setFormData={setFormData}
      />
      <Fleet onBook={handleBook} featured />
      <Locations />
      <ExploreAgadir />
      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
      <HomeFaq />
      <MapSection />
      <BookingModal
        key="home-booking"
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={selectedCar || formData.selectedCar}
        preselectedLocation={formData.pickupLocation}
        preselectedDropoffLocation={formData.dropoffLocation}
        preselectedPickupDate={formData.pickupDate}
        preselectedDropoffDate={formData.dropoffDate}
      />
    </>
  );
}
