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
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = localDate();
  return (
    <section id="booking" className="bg-black py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 md:p-10 shadow-2xl -mt-32 relative z-20 border border-white/5">
          <h2 className="text-white font-heading text-2xl md:text-3xl font-bold mb-6 text-center">
            Book Your Car
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Pickup Location</label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Drop Off Location</label>
              <select
                value={formData.dropoffLocation}
                onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Pickup Date</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                min={today}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Drop Off Date</label>
              <input
                type="date"
                value={formData.dropoffDate}
                onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                min={today}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 items-center">
              <select
                value={formData.selectedCar}
                onChange={(e) => setFormData({ ...formData, selectedCar: e.target.value })}
                className="w-full sm:w-64 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                <option value="">Select a car (optional)</option>
                {fleet.map(car => (
                  <option key={car.id} value={car.id}>{car.name} — {car.pricePerDay}€/day</option>
                ))}
              </select>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black font-semibold px-8 py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                Search Available Cars
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            No hidden fees &middot; Free cancellation &middot; Secure booking
          </p>
        </div>
      </div>
    </section>
  );
}
