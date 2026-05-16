import { useState } from 'react';
import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import ExploreAgadir from '../components/ExploreAgadir';
import Locations from '../components/Locations';
import Fleet from '../components/Fleet';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import MapSection from '../components/MapSection';
import BookingModal from '../components/BookingModal';

export default function Home() {
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
      <Hero />
      <BookingForm
        onOpenBooking={() => setBookingOpen(true)}
        formData={formData}
        setFormData={setFormData}
      />
      <Locations />
      <Fleet onBook={handleBook} featured />
      <ExploreAgadir />
      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
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
