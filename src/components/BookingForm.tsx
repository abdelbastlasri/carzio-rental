import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { locations } from '../data/locations';
import { fleet } from '../data/fleet';

interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  selectedCar: string;
}

interface BookingFormProps {
  onOpenBooking: () => void;
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
}

export default function BookingForm({ onOpenBooking, formData, setFormData }: BookingFormProps) {
  const { t } = useTranslation();
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({});
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = localDate();
  const pickupLoc = locations.find(l => l.id === formData.pickupLocation);
  const dropoffLoc = locations.find(l => l.id === formData.dropoffLocation);
  const transportFee = (pickupLoc?.transportFee || 0) + (dropoffLoc?.transportFee || 0);

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
    <section id="booking" className="bg-black py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 md:p-10 shadow-2xl -mt-20 md:-mt-32 relative z-20 border border-white/5">
          <h2 className="text-white font-heading text-2xl md:text-3xl font-bold mb-6 text-center">
            {t('bookingForm.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">{t('bookingForm.pickupLocation')}</label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              {transportFee > 0 && (
                <p className="text-amber-400 text-xs mt-1">
                  {t('bookingModal.transportFeeMessage', { fee: transportFee })}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">{t('bookingForm.dropoffLocation')}</label>
              <select
                value={formData.dropoffLocation}
                onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              {(dropoffLoc?.transportFee || 0) > 0 && (
                <p className="text-amber-400 text-xs mt-1">
                  {t('bookingModal.transportFeeMessage', { fee: dropoffLoc?.transportFee })}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">{t('bookingForm.pickupDate')}</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                min={today}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">{t('bookingForm.dropoffDate')}</label>
              <input
                type="date"
                value={formData.dropoffDate}
                onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                min={formData.pickupDate || today}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 items-center">
              <select
                value={formData.selectedCar}
                onChange={(e) => setFormData({ ...formData, selectedCar: e.target.value })}
                className="w-full sm:w-64 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                <option value="">{t('bookingForm.selectCar')}</option>
                {fleet.map(car => (
                  <option key={car.id} value={car.id}>{car.name} — {priceOverrides[car.id] ?? car.pricePerDay}€{t('common.perDay')}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black font-semibold px-8 py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                {t('bookingForm.searchCars')}
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4 flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {t('bookingForm.noHiddenFees')}
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('bookingForm.freeCancellation')}
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {t('bookingForm.secureBooking')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
