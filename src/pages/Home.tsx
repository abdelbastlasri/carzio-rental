import { useState } from 'react';
import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import ExploreAgadir from '../components/ExploreAgadir';
import Locations from '../components/Locations';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Hero />
      <BookingForm onOpenBooking={() => setBookingOpen(true)} />
      <Locations />
      <ExploreAgadir />
      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
      <BookingModal
        key="home-booking"
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
