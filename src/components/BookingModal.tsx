import { useState, useMemo, useEffect } from 'react';
import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import { locations } from '../data/locations';
import { fleet } from '../data/fleet';
import { useCurrency } from '../lib/currency';
import DateRangePicker from './DateRangePicker';
import CarAd from './CarAd';
import { billedDays, hasStartedBlock, insuranceQuote, isValidRental, FULL_INSURANCE_MIN_DAYS } from '../lib/rental';

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
  const { formatPrice } = useCurrency();
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
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('10:00');

  // Step 2 fields
  const [selectedCar, setSelectedCar] = useState(preselectedCar || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [requests, setRequests] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [fullInsurance, setFullInsurance] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [noDepositAgreed, setNoDepositAgreed] = useState(false);
  const [confirmationMethod, setConfirmationMethod] = useState('email');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [dateError, setDateError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [overridePrice, setOverridePrice] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(preselectedCar && preselectedPickupDate && preselectedDropoffDate ? 2 : 1);
      setShowConfirmation(false);
      setSubmitError('');
      setPickupLocation(preselectedLocation || 'agadir');
      setDropoffLocation(preselectedDropoffLocation || preselectedLocation || 'agadir');
      setPickupDate(preselectedPickupDate || today);
      setDropoffDate(preselectedDropoffDate || '');
      setPickupTime('10:00');
      setDropoffTime('10:00');
      setSelectedCar(preselectedCar || '');
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setFlightNumber('');
      setRequests('');
      setSelectedExtras([]);
      setFullInsurance(false);
      setAgreed(false);
      setNoDepositAgreed(false);
      setConfirmationMethod('email');
      setOverridePrice(null);
      setDateError('');
    }
  }, [isOpen, preselectedCar, preselectedLocation, preselectedDropoffLocation, preselectedPickupDate, preselectedDropoffDate, today]);

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

  const days = useMemo(
    () => billedDays(pickupDate, dropoffDate, pickupTime, dropoffTime),
    [pickupDate, dropoffDate, pickupTime, dropoffTime],
  );

  const pickupLoc = locations.find(l => l.id === pickupLocation);
  const dropoffLoc = locations.find(l => l.id === dropoffLocation);
  const pickupFee = pickupLoc?.transportFee || 0;
  const dropoffFee = dropoffLoc?.transportFee || 0;
  const transportFee = pickupFee + dropoffFee;
  const hasOnRequest = !!(pickupLoc?.onRequest || dropoffLoc?.onRequest);

  const insurance = insuranceQuote(car?.insuranceBand || 'low', days, fullInsurance);

  useEffect(() => {
    if (days < FULL_INSURANCE_MIN_DAYS && fullInsurance) setFullInsurance(false);
  }, [days, fullInsurance]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitted) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, submitted, onClose]);

  const totalCarPrice = effectivePricePerDay * days;
  const totalExtrasPrice = useMemo(() => {
    if (!car) return 0;
    return car.extras
      .filter(e => selectedExtras.includes(e.name))
      .reduce((sum, e) => sum + e.price * days, 0);
  }, [car, selectedExtras, days]);

  const totalPrice = totalCarPrice + totalExtrasPrice + transportFee + insurance.fullPrice;

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRental(pickupDate, dropoffDate, pickupTime, dropoffTime)) {
      setDateError(t('dateRange.errorMin'));
      return;
    }
    setDateError('');
    if (!selectedCar) {
      setDateError(t('bookingModal.selectCarRequired'));
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim()) {
      setSubmitError(t('bookingModal.flightRequired'));
      return;
    }
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
          insuranceType: fullInsurance ? 'full' : 'standard',
          insurancePrice: insurance.fullPrice,
          insuranceFranchise: insurance.excess,
          insuranceBand: car?.insuranceBand || 'low',
          fullInsurance,
          fullInsurancePrice: insurance.fullPrice,
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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative bg-zinc-900 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl z-10 mb-10 border border-white/5"
      >

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div>
            {step === 1 ? (
              <>
                <h2 id="booking-modal-title" className="text-white font-heading font-bold text-xl">{t('bookingModal.step1Title')}</h2>
                <p className="text-silver text-xs">{t('bookingModal.step1Subtitle')}</p>
              </>
            ) : (
              <>
                <h2 id="booking-modal-title" className="text-white font-heading font-bold text-xl">{t('bookingModal.step2Title', { carName: car?.name || '' })}</h2>
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
            {!selectedCar && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.selectCarLabel')} <span className="text-red-400">*</span></label>
                <select
                  value={selectedCar}
                  onChange={(e) => { setSelectedCar(e.target.value); setDateError(''); }}
                  required
                  className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold"
                >
                  <option value="">{t('bookingModal.selectCarLabel')}</option>
                  {fleet.map((fleetCar) => (
                    <option key={fleetCar.id} value={fleetCar.id}>{fleetCar.name} — {formatPrice(fleetCar.pricePerDay)}{t('common.perDay')}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.pickupLocation')}</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                {pickupLoc?.onRequest && (
                  <p className="text-amber-400 text-xs mt-1">{t('bookingModal.onRequestNote')}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">{t('bookingModal.dropoffLocation')}</label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                {dropoffLoc?.onRequest && (
                  <p className="text-amber-400 text-xs mt-1">{t('bookingModal.onRequestNote')}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">{t('dateRange.label')}</label>
              <DateRangePicker
                variant="inline"
                value={{ pickupDate, dropoffDate, pickupTime, dropoffTime }}
                onChange={(dates) => {
                  setPickupDate(dates.pickupDate);
                  setDropoffDate(dates.dropoffDate);
                  setPickupTime(dates.pickupTime || '');
                  setDropoffTime(dates.dropoffTime || '');
                  setDateError('');
                }}
                pricePerDay={effectivePricePerDay || undefined}
                error={dateError}
              />
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
                  <p className="text-gold font-heading font-bold text-lg">{formatPrice(effectivePricePerDay)} <span className="text-gray-400 text-sm font-normal">{t('common.perDay')}</span></p>
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
                      <span>{formatPrice(totalCarPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('bookingModal.transportFee')}</span>
                      <span>{hasOnRequest && transportFee === 0 ? t('bookingModal.transportFeeOnRequest') : transportFee === 0 ? t('bookingModal.transportFeeFree') : formatPrice(transportFee)}</span>
                    </div>
                    {insurance.fullPrice > 0 && (
                      <div className="flex justify-between">
                        <span>{t('bookingModal.fullInsurance')} ({days} {t('bookingModal.days')})</span>
                        <span>{formatPrice(insurance.fullPrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-zinc-800">
                      <span>{t('bookingModal.totalAmount')}</span>
                      <span className="text-gold">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  {hasStartedBlock(pickupDate, dropoffDate, pickupTime, dropoffTime) && (
                    <p className="text-[11px] text-gray-500">{t('dateRange.billedNote')}</p>
                  )}
                  {transportFee > 0 && (
                    <p className="text-amber-400 text-xs mt-1">{t('bookingModal.transportFeeMessage', { fee: formatPrice(transportFee) })}</p>
                  )}
                  {hasOnRequest && (
                    <p className="text-amber-400 text-xs mt-1">{t('bookingModal.onRequestNote')}</p>
                  )}
                </div>
                <h4 className="text-white font-heading font-semibold text-sm mt-4 mb-1">{t('bookingModal.description')}</h4>
                <CarAd carId={car?.id || ''} />
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
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.email')}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.phoneNumber')}</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold"
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
                        min={23}
                        required
                        className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.confirmationMethod')}</label>
                      <p className="text-gray-400 text-sm">{t('bookingModal.confirmationEmail')}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-flight-number" className="block text-gray-300 text-xs font-medium mb-1">
                      {t('bookingModal.flightNumber')}{' '}
                      <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="booking-flight-number"
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      required
                      aria-required="true"
                      autoComplete="off"
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">{t('bookingModal.specialRequests')}</label>
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      rows={2}
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="p-5">
              <h4 className="text-white font-heading font-semibold text-sm mb-3">{t('bookingModal.insuranceTitle')}</h4>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-black/60 p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{t('bookingModal.standardInsurance')} <span className="ml-2 text-xs text-gold">{t('bookingModal.included')}</span></p>
                    <p className="mt-1 text-xs text-gray-400">{t('bookingModal.standardInsuranceDesc')}</p>
                  </div>
                </div>
                {insurance.eligible ? (
                  <label className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 p-3 transition hover:border-gold/40 has-[:checked]:border-gold">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={fullInsurance}
                        onChange={(e) => setFullInsurance(e.target.checked)}
                        className="mt-1 accent-gold"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{t('bookingModal.fullInsurance')}</p>
                        <p className="mt-1 text-xs text-gray-400">{t('bookingModal.fullInsuranceDesc')}</p>
                      </div>
                    </div>
                    <span className="whitespace-nowrap text-xs text-gold">{t('bookingModal.fullInsurancePrice', { price: formatPrice(insurance.fullPerDay) })}</span>
                  </label>
                ) : (
                  <div className="rounded-lg border border-white/5 p-3">
                    <p className="text-xs text-gray-500">{t('bookingModal.fullInsuranceFrom', { days: FULL_INSURANCE_MIN_DAYS })}</p>
                  </div>
                )}
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
                      {extra.price > 0 ? formatPrice(extra.price) : t('bookingModal.free')} {t('bookingModal.perDay')}
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
                  <LangLink to="/terms" target="_blank" className="text-gold underline hover:text-gold-light">
                    {t('bookingModal.termsLink')}
                  </LangLink>{' '}
                  of Use
                </span>
              </label>
              {submitError && (
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={!agreed || !name || !phone || !age || !flightNumber.trim() || submitting || submitted}
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
