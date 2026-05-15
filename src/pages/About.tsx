import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';

const highlights = [
  {
    title: 'about.highlight1Title',
    description: 'about.highlight1Desc',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'about.highlight2Title',
    description: 'about.highlight2Desc',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'about.highlight3Title',
    description: 'about.highlight3Desc',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'about.highlight4Title',
    description: 'about.highlight4Desc',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="pt-28 md:pt-32">
      <div className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2 tracking-tight">{t('about.title')}</h1>
          <p className="text-white/50">{t('common.qualitySlogan')}</p>
        </div>
      </div>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="h-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: "url('/images/about.jpg')" }}
            />
            <div>
              <span className="text-gold font-heading font-bold text-lg">{t('about.experience')}</span>
              <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">{t('about.heading')}</h2>
              <p className="text-white/50 leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="glass rounded-2xl p-5 group"
                  >
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mb-3 text-gold group-hover:bg-gold/20 transition group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-heading font-semibold text-sm mb-1 tracking-tight">{t(item.title)}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{t(item.description)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
    </div>
  );
}
