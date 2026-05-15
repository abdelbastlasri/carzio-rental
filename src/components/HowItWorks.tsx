import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Select Your Car',
    description: 'Browse our wide selection of vehicles to find the perfect match for your travel style, needs, and budget.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Contact Our Team',
    description: 'Reach out to our friendly team to confirm your booking details and any special requirements.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Hit the Road',
    description: 'Your car is ready! Pick it up, start exploring Agadir, and enjoy the freedom of the open road with confidence.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">Quick &amp; Easy Car Rental</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            Booking your rental car has never been simpler &mdash; choose your vehicle online and hit the road in just a few clicks.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="text-center relative"
            >
              <div className="w-16 h-16 glass-gold rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 group">
                <motion.span
                  className="text-gold"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {step.icon}
                </motion.span>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold rounded-full flex items-center justify-center text-black font-heading font-bold text-xs">
                  {step.number}
                </span>
              </div>
              <h3 className="text-white font-heading font-semibold text-lg mb-2 tracking-tight">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
