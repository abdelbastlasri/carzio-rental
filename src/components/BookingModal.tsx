import { useState, useMemo, useEffect } from 'react';
import { locations } from '../data/locations';
import { fleet } from '../data/fleet';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: string;
  preselectedLocation?: string;
  preselectedPickupDate?: string;
  preselectedDropoffDate?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedCar, preselectedLocation, preselectedPickupDate, preselectedDropoffDate }: BookingModalProps) {
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = localDate();
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [pickupLocation, setPickupLocation] = useState(preselectedLocation || 'agadir');
  const [dropoffLocation, setDropoffLocation] = useState(preselectedLocation || 'agadir');
  const [pickupDate, setPickupDate] = useState(preselectedPickupDate || today);
  const [dropoffDate, setDropoffDate] = useState(preselectedDropoffDate || '');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  // Step 2 fields
  const [selectedCar, setSelectedCar] = useState(preselectedCar || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [requests, setRequests] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setShowConfirmation(false);
      setSubmitError('');
      setPickupLocation(preselectedLocation || 'agadir');
      setDropoffLocation(preselectedLocation || 'agadir');
      setPickupDate(preselectedPickupDate || today);
      setDropoffDate(preselectedDropoffDate || '');
      setPickupTime('');
      setDropoffTime('');
      setSelectedCar(preselectedCar || '');
      setName('');
      setEmail('');
      setPhone('');
      setFlightNumber('');
      setRequests('');
      setSelectedExtras([]);
      setAgreed(false);
    }
  }, [isOpen, preselectedCar, preselectedLocation, preselectedPickupDate, preselectedDropoffDate, today]);

  const car = fleet.find(c => c.id === selectedCar);

  const days = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }, [pickupDate, dropoffDate]);

  const totalCarPrice = car ? car.pricePerDay * days : 0;
  const totalExtrasPrice = useMemo(() => {
    if (!car) return 0;
    return car.extras
      .filter(e => selectedExtras.includes(e.name))
      .reduce((sum, e) => sum + e.price * days, 0);
  }, [car, selectedExtras, days]);

  const totalPrice = totalCarPrice + totalExtrasPrice;

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) {
      const firstCar = fleet[0];
      setSelectedCar(firstCar.id);
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const pickupLoc = locations.find(l => l.id === pickupLocation)?.name || '';
    const dropoffLoc = locations.find(l => l.id === dropoffLocation)?.name || '';
    const carName = car?.name || 'Car';

    try {
      const res = await fetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carName,
          totalPrice,
          days,
          pickupLocation: pickupLoc,
          dropoffLocation: dropoffLoc,
          pickupDate,
          dropoffDate,
          pickupTime,
          dropoffTime,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          flightNumber,
          extras: selectedExtras,
          specialRequests: requests,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Server error');
      setShowConfirmation(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save booking. Please try again.';
      console.error('Failed to save booking:', err);
      setSubmitError(msg);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const toggleExtra = (name: string) => {
    setSelectedExtras(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 md:pt-16 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-zinc-900 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl z-10 mb-10 border border-white/5">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div>
            {step === 1 ? (
              <>
                <h2 className="text-white font-heading font-bold text-xl">Enter Booking Details</h2>
                <p className="text-silver text-xs">Choose pickup &amp; drop-off details</p>
              </>
            ) : (
              <>
                <h2 className="text-white font-heading font-bold text-xl">Book {car?.name || ''}</h2>
                <p className="text-silver text-xs">Complete your reservation</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white text-xs font-medium"
              >
                &larr; Back
              </button>
            )}
            <button onClick={handleClose} className="text-gray-400 hover:text-white transition" aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Step 1: Booking Details */}
        {step === 1 && (
          <form onSubmit={handleContinue} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Pickup Location</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Drop Off Location</label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Pickup Date</label>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={today}
                    required
                    className="w-2/3 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-1/3 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Drop Off Date</label>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    min={pickupDate}
                    required
                    className="w-2/3 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    type="time"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-1/3 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-3 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Full Booking Form */}
        {step === 2 && car && (
          <form onSubmit={handleSubmit} className="divide-y divide-zinc-800">
            {/* Car Details */}
            <div className="p-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-48 h-36 bg-black rounded-lg flex items-center justify-center shrink-0 border border-zinc-800">
                  {car.image ? (
                    <img src={car.image} alt={car.name} className="w-full h-full object-contain p-3" />
                  ) : (
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-500 text-xs">{car.name}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-heading font-bold text-xl">{car.name}</h3>
                  <p className="text-gold font-heading font-bold text-lg">{car.pricePerDay.toFixed(2)}€ <span className="text-gray-400 text-sm font-normal">/day</span></p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-2">
                    {car.ac && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Air conditioner</span>}
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>{car.doors}-Door Hatchback</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{car.suitcases}-Suitcase Capacity</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{car.seats}-Seats</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{car.km}</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>{car.transmission}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary + Description */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-heading font-semibold text-sm mb-2">Booking Summary</h4>
                <div className="bg-black rounded-lg p-3 text-xs space-y-1 text-gray-400 border border-zinc-800">
                  <p><span className="font-medium text-white">Pickup:</span> {locations.find(l => l.id === pickupLocation)?.name} on {pickupDate} at {pickupTime || '--:--'}</p>
                  <p><span className="font-medium text-white">Dropoff:</span> {locations.find(l => l.id === dropoffLocation)?.name} on {dropoffDate} at {dropoffTime || '--:--'}</p>
                  <p><span className="font-medium text-white">Total Price:</span> <span className="text-gold font-bold">{totalPrice}€</span> ({days} day{days > 1 ? 's' : ''})</p>
                </div>
                <h4 className="text-white font-heading font-semibold text-sm mt-4 mb-1">Description</h4>
                <p className="text-silver text-xs leading-relaxed">{car.description}</p>
              </div>

              {/* Your Information */}
              <div>
                <h4 className="text-white font-heading font-semibold text-sm mb-2">Your Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">Flight Number</label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">Special Requests</label>
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      rows={2}
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Available Extras */}
            <div className="p-5">
              <h4 className="text-white font-heading font-semibold text-sm mb-3">Available Extras</h4>
              <div className="space-y-2">
                {car.extras.map((extra) => (
                  <label key={extra.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(extra.name)}
                        onChange={() => toggleExtra(extra.name)}
                        className="accent-gold"
                      />
                      <span className="text-sm text-gray-200">{extra.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {extra.price > 0 ? `${extra.price}€` : '-'} (per day)
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms + Submit */}
            <div className="p-5 space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 accent-gold"
                />
                <span className="text-xs text-gray-400">
                  I acknowledge having read and accepted the Terms and Conditions of Use
                </span>
              </label>
              {submitError && (
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={!agreed || !name || !phone}
                className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-3 rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {/* Confirmation */}
        {showConfirmation && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-heading font-bold text-xl mb-6">Booking Confirmed!</h3>
            <button
              onClick={handleClose}
              className="bg-gold hover:bg-gold-light text-black font-semibold px-8 py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
