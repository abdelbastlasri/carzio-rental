import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { locations } from '../data/locations';
import { fleet } from '../data/fleet';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: string;
  preselectedLocation?: string;
  preselectedDropoffLocation?: string;
  preselectedPickupDate?: string;
  preselectedDropoffDate?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedCar, preselectedLocation, preselectedDropoffLocation, preselectedPickupDate, preselectedDropoffDate }: BookingModalProps) {
  const { t } = useTranslation();
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = localDate();
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [pickupLocation, setPickupLocation] = useState(preselectedLocation || 'agadir');
  const [dropoffLocation, setDropoffLocation] = useState(preselectedDropoffLocation || preselectedLocation || 'agadir');
  const [pickupDate, setPickupDate] = useState(preselectedPickupDate || today);
  const [dropoffDate, setDropoffDate] = useState(preselectedDropoffDate || '');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  // Step 2 fields
  const [selectedCar, setSelectedCar] = useState(preselectedCar || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [requests, setRequests] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [noDepositAgreed, setNoDepositAgreed] = useState(false);
  const [confirmationMethod, setConfirmationMethod] = useState('email');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [overridePrice, setOverridePrice] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setShowConfirmation(false);
      setSubmitError('');
      setPickupLocation(preselectedLocation || 'agadir');
      setDropoffLocation(preselectedDropoffLocation || preselectedLocation || 'agadir');
      setPickupDate(preselectedPickupDate || today);
      setDropoffDate(preselectedDropoffDate || '');
      setPickupTime('');
      setDropoffTime('');
      setSelectedCar(preselectedCar || '');
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setFlightNumber('');
      setRequests('');
      setSelectedExtras([]);
      setAgreed(false);
      setNoDepositAgreed(false);
      setConfirmationMethod('email');
      setOverridePrice(null);
    }
  }, [isOpen, preselectedCar, preselectedLocation, preselectedPickupDate, preselectedDropoffDate, today]);

  useEffect(() => {
    if (selectedCar) {
      fetch(`/api/prices?car_id=${selectedCar}`)
        .then(r => r.json())
        .then(d => setOverridePrice(d.pricePerDay))
        .catch(() => setOverridePrice(null));
    }
  }, [selectedCar]);

  const car = fleet.find(c => c.id === selectedCar);
  const effectivePricePerDay = overridePrice || car?.pricePerDay || 0;

  const days = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }, [pickupDate, dropoffDate]);

  const transportFee = locations.find(l => l.id === pickupLocation)?.transportFee || 0;

  const totalCarPrice = effectivePricePerDay * days;
  const totalExtrasPrice = useMemo(() => {
    if (!car) return 0;
    return car.extras
      .filter(e => selectedExtras.includes(e.name))
      .reduce((sum, e) => sum + e.price * days, 0);
  }, [car, selectedExtras, days]);

  const totalPrice = totalCarPrice + totalExtrasPrice + transportFee;

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
    if (submitted) return;
    setSubmitted(true);
    setSubmitError('');
    setSubmitting(true);
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
          customerAge: age ? parseInt(age) : null,
          flightNumber,
          extras: selectedExtras,
          specialRequests: requests,
          transportFee,
          paymentMethod: 'payment_upon_delivery',
          confirmationMethod,
          noDepositAgreed,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Server error');
      setShowConfirmation(true);
      setSubmitting(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save booking. Please try again.';
      console.error('Failed to save booking:', err);
      setSubmitError(msg);
      setSubmitted(false);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitted) return;
    onClose();
  };

  const toggleExtra = (name: string) => {
    setSelectedExtras(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-16 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-zinc-900 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl z-10 mb-10 border border-white/5">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div>
            {step === 1 ? (
              <>
                <h2 className="text-white font-heading font-bold text-xl">{t('bookingModal.step1Title')}</h2>
                <p className="text-silver text-xs">{t('bookingModal.step1Subtitle')}</p>
              </>
            ) : (
              <>
                <h2 className="text-white font-heading font-bold text-xl">{t('bookingModal.step2Title', { carName: car?.name || '' })}</h2>
                <p className="text-silver text-xs">{t('bookingModal.step2Subtitle')}</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white text-xs font-medium"
              >
                &larr; {t('bookingModal.back')}
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
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.pickupLocation')}</label>
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
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.dropoffLocation')}</label>
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
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.pickupDate')}</label>
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
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.dropoffDate')}</label>
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
              {t('bookingModal.continue')}
            </button>
          </form>
        )}

        {/* Step 2: Full Booking Form */}
        {step === 2 && car && !showConfirmation && (
          <form onSubmit={handleSubmit} className="divide-y divide-zinc-800">
            {/* Car Details */}
            <div className="p-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-48 h-36 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gray-200">
                  {car.image ? (
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover p-2" />
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
                  <p className="text-gold font-heading font-bold text-lg">{effectivePricePerDay.toFixed(2)}€ <span className="text-gray-400 text-sm font-normal">{t('common.perDay')}</span></p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-2">
                    {car.ac && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{t('bookingModal.airConditioner')}</span>}
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>{t('bookingModal.doorHatchback', { doors: car.doors })}</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{t('bookingModal.suitcaseCapacity', { suitcases: car.suitcases })}</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{t('bookingModal.seatsCount', { seats: car.seats })}</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{car.km}</span>
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>{car.transmission}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary + Description */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-heading font-semibold text-sm mb-2">{t('bookingModal.bookingSummary')}</h4>
                <div className="bg-black rounded-lg p-3 text-xs space-y-1 text-gray-400 border border-zinc-800">
                  <p><span className="font-medium text-white">{t('bookingModal.pickup')}:</span> {t('bookingModal.pickupDetails', { location: locations.find(l => l.id === pickupLocation)?.name || '', date: pickupDate, time: pickupTime || '--:--' })}</p>
                  <p><span className="font-medium text-white">{t('bookingModal.dropoff')}:</span> {t('bookingModal.dropoffDetails', { location: locations.find(l => l.id === dropoffLocation)?.name || '', date: dropoffDate, time: dropoffTime || '--:--' })}</p>
                  <div className="border-t border-zinc-800 pt-1 mt-1 space-y-1">
                    <div className="flex justify-between">
                      <span>{t('bookingModal.carRental')} ({days} {t(days > 1 ? 'bookingModal.days' : 'bookingModal.day')})</span>
                      <span>{totalCarPrice}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('bookingModal.transportFee')}</span>
                      <span>{transportFee === 0 ? t('bookingModal.transportFeeFree') : `${transportFee}€`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-zinc-800">
                      <span>{t('bookingModal.totalAmount')}</span>
                      <span className="text-gold">{totalPrice}€</span>
                    </div>
                  </div>
                  {transportFee > 0 && (
                    <p className="text-amber-400 text-xs mt-1">{t('bookingModal.transportFeeMessage', { fee: transportFee })}</p>
                  )}
                </div>
                <h4 className="text-white font-heading font-semibold text-sm mt-4 mb-1">{t('bookingModal.description')}</h4>
                <p className="text-silver text-xs leading-relaxed">{car.description}</p>
              </div>

              {/* Your Information */}
              <div>
                <h4 className="text-white font-heading font-semibold text-sm mb-2">{t('bookingModal.yourInformation')}</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.fullName')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.email')}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.phoneNumber')}</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.age')} <span className="text-gray-500">({t('bookingModal.ageRequired')})</span></label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min={18}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.confirmationMethod')}</label>
                      <p className="text-gray-400 text-sm">{t('bookingModal.confirmationEmail')}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.flightNumber')}</label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.specialRequests')}</label>
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
              <h4 className="text-white font-heading font-semibold text-sm mb-3">{t('bookingModal.availableExtras')}</h4>
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
                      <span className="text-sm text-gray-200">{t(`extras.${extra.name}`, extra.name)}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {extra.price > 0 ? `${extra.price}€` : t('bookingModal.free')} {t('bookingModal.perDay')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-5">
              <h4 className="text-white font-heading font-semibold text-sm mb-3">{t('bookingModal.paymentMethod')}</h4>
              <div className="bg-black rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center gap-2 text-gold font-semibold text-sm mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {t('bookingModal.paymentUponDelivery')}
                </div>
                <p className="text-gray-400 text-xs">{t('bookingModal.paymentMessage')}</p>
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
                  {t('bookingModal.terms')}{' '}
                  <Link to="/terms" target="_blank" className="text-gold underline hover:text-gold-light">
                    {t('bookingModal.termsLink')}
                  </Link>{' '}
                  of Use
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noDepositAgreed}
                  onChange={(e) => setNoDepositAgreed(e.target.checked)}
                  required
                  className="mt-0.5 accent-gold"
                />
                <span className="text-xs text-gray-400">
                  {t('bookingModal.noDeposit')}
                </span>
              </label>
              {submitError && (
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={!agreed || !noDepositAgreed || !name || !phone || !age || submitting || submitted}
                className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-3 rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                {submitted ? t('bookingModal.submitted') : submitting ? t('bookingModal.submitting') : t('bookingModal.confirmBooking')}
              </button>
            </div>
          </form>
        )}

        {/* Confirmation */}
        {showConfirmation && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-heading font-bold text-xl mb-2">{t('bookingModal.availabilityRequested')}</h3>
            <p className="text-gray-400 text-sm mb-6">{t('bookingModal.availabilityMessage', { method: t('bookingModal.confirmationEmail') })}</p>
            <button
              onClick={onClose}
              className="bg-gold hover:bg-gold-light text-black font-semibold px-8 py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              {t('bookingModal.done')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
