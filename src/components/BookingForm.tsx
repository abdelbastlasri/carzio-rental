import { locations } from '../data/locations';
import { fleet } from '../data/fleet';

interface BookingFormProps {
  onOpenBooking: () => void;
}

export default function BookingForm({ onOpenBooking }: BookingFormProps) {
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = localDate();
  return (
    <section id="booking" className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black rounded-2xl p-6 md:p-10 shadow-2xl -mt-32 relative z-20">
          <h2 className="text-white font-heading text-2xl md:text-3xl font-bold mb-6 text-center">
            Book Your Car
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Pickup Location</label>
              <select
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Drop Off Location</label>
              <select
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
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
                min={today}
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Drop Off Date</label>
              <input
                type="date"
                min={today}
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 items-center">
              <select
                className="w-full sm:w-64 bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                <option value="">Select a car (optional)</option>
                {fleet.map(car => (
                  <option key={car.id} value={car.id}>{car.name} — {car.pricePerDay}€/day</option>
                ))}
              </select>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black font-semibold px-8 py-2.5 rounded-lg transition text-sm"
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
