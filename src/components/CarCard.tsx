import { motion } from 'framer-motion';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (carId: string) => void;
  index?: number;
}

export default function CarCard({ car, onBook, index = 0 }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass rounded-2xl overflow-hidden group"
    >
      <div className="bg-black/40 h-48 flex items-center justify-center overflow-hidden">
        {car.image ? (
          <motion.img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-contain p-4 mix-blend-multiply brightness-110"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-lg text-white tracking-tight truncate">{car.name}</h3>
          <span className="glass-gold text-gold font-heading font-bold text-lg px-3 py-1 rounded-lg">
            {car.pricePerDay}€<span className="text-white/40 text-xs font-normal">/day</span>
          </span>
        </div>
        <p className="text-white/40 text-xs mb-3">or similar &middot; {car.type}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50 mb-3">
          {car.ac && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>AC</span>}
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>{car.doors}d</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{car.suitcases} bags</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{car.seats} seats</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{car.km}</span>
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>{car.transmission}</span>
        </div>
        <div className="mt-auto">
          <motion.button
            onClick={() => onBook(car.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-burgundy hover:bg-red-900 text-white font-semibold text-sm py-2.5 rounded-xl transition shadow-lg shadow-burgundy/20 hover:shadow-burgundy/40"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
