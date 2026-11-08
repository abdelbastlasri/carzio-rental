import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { stripLangPrefix, withLangPrefix, type Lang } from '../lib/i18nRouting';
import CurrencySwitcher from './CurrencySwitcher';
import { blogCategories } from '../content/blog/categories';
import { newsCategories } from '../content/news/categories';

const WHATSAPP_URL = 'https://wa.me/212680318003';

// Desktop: logo handles "home" — keep the bar free of a redundant fifth item.
const navLinks = [
  { label: 'nav.ourCars', path: '/cars' },
  { label: 'nav.about', path: '/about' },
  { label: 'nav.blog', path: '/blog' },
  { label: 'nav.news', path: '/news' },
  { label: 'nav.faq', path: '/faq' },
  { label: 'nav.contact', path: '/contact' },
];
const mobileNavLinks = [
  { label: 'nav.home', path: '/' },
  ...navLinks,
];

const languages = [
  { code: 'en', label: 'lang.en', flag: '/images/flags/gb.svg' },
  { code: 'fr', label: 'lang.fr', flag: '/images/flags/fr.svg' },
  { code: 'es', label: 'lang.es', flag: '/images/flags/es.svg' },
  { code: 'pl', label: 'lang.pl', flag: '/images/flags/pl.svg' },
  { code: 'de', label: 'lang.de', flag: '/images/flags/de.svg' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [dropdown, setDropdown] = useState<'blog' | 'news' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = stripLangPrefix(location.pathname);
  const isActive = (path: string) => {
    const targetBase = path === '/' ? '/' : path;
    const actualBase = basePath === '/' ? '/' : basePath;
    return actualBase === targetBase || (targetBase !== '/' && actualBase.startsWith(`${targetBase}/`));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-500"
      style={{ background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent' }}
    >
      <div className={`backdrop-blur-xl border-b transition-colors duration-500 ${
        scrolled ? 'border-white/5 bg-black/60' : 'border-transparent bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <LangLink to="/" className="block shrink-0">
            <img src="/images/carzio-logo.png" alt="Carzio" className="h-14 md:h-16 w-auto transition-transform hover:scale-105" />
          </LangLink>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4 text-sm font-medium lg:gap-7" ref={dropdownRef}>
            {navLinks.map((link) => {
              if (link.path === '/blog' || link.path === '/news') {
                const categories = link.path === '/blog' ? blogCategories : newsCategories;
                const isOpen = dropdown === (link.path === '/blog' ? 'blog' : 'news');
                return (
                  <div key={link.path} className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdown(isOpen ? null : link.path === '/blog' ? 'blog' : 'news')}
                      onMouseEnter={() => setDropdown(link.path === '/blog' ? 'blog' : 'news')}
                      className={`relative whitespace-nowrap transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold after:transition-[width] after:duration-300 ${
                        isActive(link.path) ? 'text-gold after:w-full' : 'text-white/80 hover:text-gold after:w-0 hover:after:w-full'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                    >
                      {t(link.label)}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl"
                          role="menu"
                          onMouseLeave={() => setDropdown(null)}
                        >
                          <LangLink
                            to={link.path}
                            onClick={() => setDropdown(null)}
                            className="block rounded-xl px-3 py-2 text-sm font-semibold text-gold transition hover:bg-white/5"
                            role="menuitem"
                          >
                            {t(link.label)}
                          </LangLink>
                          <div className="my-1 h-px bg-white/5" />
                          {categories.map((category) => {
                            const copy = category[i18n.language.startsWith('fr') ? 'fr' : 'en'];
                            return (
                              <LangLink
                                key={category.slug}
                                to={`${link.path}/categorie/${category.slug}`}
                                onClick={() => setDropdown(null)}
                                className="block rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-gold"
                                role="menuitem"
                              >
                                {copy.name}
                              </LangLink>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <LangLink
                  key={link.path}
                  to={link.path}
                  className={`relative whitespace-nowrap transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold after:transition-[width] after:duration-300 ${
                    isActive(link.path)
                      ? 'text-gold after:w-full'
                      : 'text-white/80 hover:text-gold after:w-0 hover:after:w-full'
                  }`}
                >
                  {t(link.label)}
                </LangLink>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('common.callUs')}
              className="text-white/70 hover:text-gold text-sm font-medium transition flex items-center gap-1.5"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden lg:inline">{t('common.callUs')}</span>
            </a>
            <LangLink
              to="/cars"
              className="glass-gold text-white font-semibold text-sm px-4 py-2 rounded-lg transition hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20 lg:px-5"
            >
              {t('common.bookNow')}
            </LangLink>
            <CurrencySwitcher />
          </div>

          {/* Language Selector */}
          <div className="md:hidden mr-1"><CurrencySwitcher /></div>
          <div className="relative ml-1 lg:ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-white/70 hover:text-gold text-sm font-medium transition flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5"
              aria-label={t('common.selectLanguage')}
              aria-expanded={langOpen}
            >
              <img
                src={languages.find((l) => l.code === i18n.language)?.flag || languages[0].flag}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <svg
                aria-hidden="true"
                className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 md:right-0 top-full mt-1 z-20 glass-dark rounded-xl py-1 min-w-[140px] border border-white/5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                        const target = withLangPrefix(basePath, lang.code as Lang);
                        navigate(target);
                      }}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition ${
                        i18n.language === lang.code ? 'text-gold bg-gold/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <img
                        src={lang.flag}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                      />
                      {t(lang.label)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            id="mobile-menu"
            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col items-center gap-1 text-base font-medium">
              {mobileNavLinks.map((link) => (
                <div key={link.path} className="w-full">
                  <LangLink
                    to={link.path}
                    className={`flex min-h-[44px] w-full items-center justify-center rounded-lg px-3 transition ${isActive(link.path) ? 'text-gold' : 'text-white/80 hover:bg-white/5 hover:text-gold'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.label)}
                  </LangLink>
                  {(link.path === '/blog' || link.path === '/news') && (
                    <div className="mb-2 flex flex-col gap-1 pl-4">
                      {(link.path === '/blog' ? blogCategories : newsCategories).map((category) => {
                        const copy = category[i18n.language.startsWith('fr') ? 'fr' : 'en'];
                        return (
                          <LangLink
                            key={category.slug}
                            to={`${link.path}/categorie/${category.slug}`}
                            className="flex min-h-[40px] w-full items-center justify-center rounded-lg px-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-gold"
                            onClick={() => setMenuOpen(false)}
                          >
                            {copy.name}
                          </LangLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center justify-center text-gold font-medium text-center">{t('common.callUs')}</a>
              <LangLink
                to="/cars"
                className="glass-gold text-white font-semibold text-center px-4 py-3 rounded-lg w-full max-w-[220px]"
                onClick={() => setMenuOpen(false)}
              >
                {t('common.bookNow')}
              </LangLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
