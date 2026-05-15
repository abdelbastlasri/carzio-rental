import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (carId: string) => void;
}

export default function CarCard({ car, onBook }: CarCardProps) {
  return (
    <div className="bg-zinc-900/80 rounded-xl border border-white/5 hover:border-gold/30 shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col group">
      <div className="bg-black h-48 flex items-center justify-center">
        {car.image ? (
          <img src={car.image} alt={car.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-gray-500 text-xs">{car.name}</span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-lg text-white">{car.name}</h3>
          <span className="text-gold font-heading font-bold text-xl">{car.pricePerDay}€<span className="text-gray-500 text-xs font-normal">/day</span></span>
        </div>
        <p className="text-gray-500 text-xs mb-3">or similar &middot; {car.type}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
          {car.ac && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Air conditioner</span>}
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>{car.doors}-Door</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{car.suitcases} Suitcase{car.suitcases > 1 ? 's' : ''}</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{car.seats} Seats</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{car.km}</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>{car.transmission}</span>
        </div>
        <div className="border-t border-zinc-800 pt-3 mt-auto">
          <p className="text-xs text-gray-500 font-medium mb-2">Extras:</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
            {car.extras.slice(0, 4).map((extra) => (
              <span key={extra.name}>
                {extra.name} {extra.price > 0 ? `+${extra.price}€` : '+0€'}
              </span>
            ))}
          </div>
          <button
            onClick={() => onBook(car.id)}
            className="w-full bg-burgundy hover:bg-red-900 text-white font-semibold text-sm py-2.5 rounded-lg transition shadow-lg shadow-burgundy/30 hover:shadow-burgundy/50"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
