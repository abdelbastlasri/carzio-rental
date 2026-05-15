import { motion } from 'framer-motion';

const stats = [
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '15k+', label: 'Happy Travelers' },
  { value: 'Fully Insured', label: 'Drive Worry-Free' },
  { value: '24/7', label: 'Support' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Stats() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-black to-zinc-900/30" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-2xl md:text-3xl font-bold tracking-tight">Why Choose Carzio</h2>
          <p className="text-white/50 text-sm mt-2">Trusted by thousands of travelers across Morocco</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={statVariants}
              whileHover={{ y: -2 }}
              className="glass rounded-2xl px-6 py-8 text-center"
            >
              <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1 tracking-tight">{stat.value}</div>
              <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
