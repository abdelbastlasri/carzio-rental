import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { locations, locationImages } from '../data/locations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Locations() {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">{t('locations.title')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {t('locations.subtitle')}
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 md:gap-6"
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl overflow-hidden group flex flex-col"
            >
              <div
                className="h-44 bg-cover bg-center group-hover:scale-110 transition duration-700 shrink-0"
                style={{ backgroundImage: `url('${locationImages[loc.id]}')` }}
              />
              <div className="p-5 flex-1 flex flex-col">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gold/20 transition">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-heading font-semibold text-lg mb-3 tracking-tight">{loc.name}</h3>
                <div className="mt-auto flex gap-2">
                  <Link
                    to="/cars"
                    className="flex-1 glass-gold text-white font-semibold text-sm py-2.5 rounded-xl text-center transition hover:bg-gold/20"
                  >
                    {t('locations.bookNow')}
                  </Link>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center transition shrink-0 hover:bg-white/10"
                    title="View on map"
                  >
                    <svg className="w-5 h-5 text-white/50 hover:text-gold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
