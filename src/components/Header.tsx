import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/212680318003';

const navLinks = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.ourCars', path: '/cars' },
  { label: 'nav.about', path: '/about' },
  { label: 'nav.contact', path: '/contact' },
];

const languages = [
  { code: 'en', label: 'lang.en', flag: 'https://flagcdn.com/16x12/gb.png' },
  { code: 'fr', label: 'lang.fr', flag: 'https://flagcdn.com/16x12/fr.png' },
  { code: 'es', label: 'lang.es', flag: 'https://flagcdn.com/16x12/es.png' },
  { code: 'pl', label: 'lang.pl', flag: 'https://flagcdn.com/16x12/pl.png' },
  { code: 'de', label: 'lang.de', flag: 'https://flagcdn.com/16x12/de.png' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-500"
      style={{ background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent' }}
    >
      <div className={`backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled ? 'border-white/5 bg-black/60' : 'border-transparent bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="block shrink-0">
            <img src="/images/carzio-logo.png" alt="Carzio" className="h-14 md:h-16 w-auto transition-transform hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold after:w-full'
                    : 'text-white/80 hover:text-gold after:w-0 hover:after:w-full'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold text-sm font-medium transition flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('common.callUs')}
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-white/70 hover:text-gold text-sm font-medium transition flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5"
                aria-label="Select language"
              >
                <img src={languages.find(l => l.code === i18n.language)?.flag} alt={i18n.language} className="w-6 h-6 object-cover rounded-full" />
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 glass-dark rounded-xl py-1 min-w-[140px] border border-white/5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition ${
                          i18n.language === lang.code ? 'text-gold bg-gold/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <img src={lang.flag} alt={lang.code} className="w-6 h-6 object-cover rounded-full" />
                        {t(lang.label)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              to="/cars"
              className="glass-gold text-white font-semibold text-sm px-5 py-2 rounded-lg transition hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
            >
              {t('common.bookNow')}
            </Link>
          </div>

          {/* Mobile Language Flags */}
          <div className="md:hidden flex items-center gap-1 mr-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                  i18n.language === lang.code ? 'ring-1 ring-gold' : ''
                }`}
                title={t(lang.label)}
              >
                <img src={lang.flag} alt={lang.code} className="w-5 h-5 object-cover rounded-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col items-center gap-3 text-base font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition text-center ${location.pathname === link.path ? 'text-gold' : 'text-white/80 hover:text-gold'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(link.label)}
                </Link>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gold font-medium text-center">{t('common.callUs')}</a>
              <Link
                to="/cars"
                className="glass-gold text-white font-semibold text-center px-4 py-2 rounded w-full max-w-[200px]"
                onClick={() => setMenuOpen(false)}
              >
                {t('common.bookNow')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
