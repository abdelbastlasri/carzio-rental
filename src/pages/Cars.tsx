import { useState, useCallback } from 'react';
import Fleet from '../components/Fleet';
import BookingModal from '../components/BookingModal';

export default function Cars() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [modalKey, setModalKey] = useState(0);

  const handleBook = useCallback((carId: string) => {
    setSelectedCar(carId);
    setModalKey(prev => prev + 1);
    setBookingOpen(true);
  }, []);

  return (
    <div className="pt-28 md:pt-32">
      <div className="bg-zinc-900 py-12 text-center">
        <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2">Our Cars</h1>
        <p className="text-silver">Quality You Can Feel, Convenience You Deserve</p>
      </div>
      <Fleet onBook={handleBook} />
      <BookingModal
        key={`booking-${modalKey}`}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={selectedCar}
      />
    </div>
  );
}
