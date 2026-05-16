import { useTranslation } from 'react-i18next';

export default function MapSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-zinc-900/20" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {t('contact.mapTitle')}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {t('contact.mapSubtitle')}
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.123456789!2d-9.413174!3d30.321789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE5JzE4LjQiTiA5wrAyNCc0Ny40Ilc!5e0!3m2!1sen!2sma!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Agadir Al Massira Airport"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
