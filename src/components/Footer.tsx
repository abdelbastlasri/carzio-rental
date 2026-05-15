import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative border-t border-white/5 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="block shrink-0">
              <img src="/images/carzio-logo.png" alt="Carzio" className="h-12 md:h-14 w-auto" />
            </Link>
            <p className="text-white/40 text-sm mt-3 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { label: 'footer.home', to: '/' },
                { label: 'footer.ourCars', to: '/cars' },
                { label: 'footer.aboutUs', to: '/about' },
                { label: 'footer.contact', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/40 text-sm hover:text-gold transition">{t(link.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.getInTouch')}</h3>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>{t('footer.address')}</li>
              <li><a href="https://wa.me/212680318003" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">{t('footer.phone')}</a></li>
              <li><a href="mailto:contact@carzio.ma" className="hover:text-gold transition">{t('footer.email')}</a></li>
              <li>{t('footer.hours')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-white/30 text-xs">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
