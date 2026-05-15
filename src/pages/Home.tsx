import { useState } from 'react';
import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import ExploreAgadir from '../components/ExploreAgadir';
import HomeGallery from '../components/HomeGallery';
import Locations from '../components/Locations';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: 'agadir',
    dropoffLocation: 'agadir',
    pickupDate: '',
    dropoffDate: '',
    selectedCar: '',
  });

  return (
    <>
      <Hero />
      <BookingForm
        onOpenBooking={() => setBookingOpen(true)}
        formData={formData}
        setFormData={setFormData}
      />
      <Locations />
      <ExploreAgadir />
      <HomeGallery />
      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
      <BookingModal
        key="home-booking"
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={formData.selectedCar}
        preselectedLocation={formData.pickupLocation}
        preselectedPickupDate={formData.pickupDate}
        preselectedDropoffDate={formData.dropoffDate}
      />
    </>
  );
}
