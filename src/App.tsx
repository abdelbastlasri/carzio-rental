import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import { detectLangFromPath, stripLangPrefix } from './lib/i18nRouting';
import { CurrencyProvider } from './lib/currency';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

const Home = lazy(() => import('./pages/Home'));
const Cars = lazy(() => import('./pages/Cars'));
const AirportPage = lazy(() => import('./pages/AirportPage'));
const About = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const FaqHub = lazy(() => import('./pages/FaqHub'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogHub = lazy(() => import('./pages/BlogHub'));
const BlogCategory = lazy(() => import('./pages/BlogCategory'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NewsHub = lazy(() => import('./pages/NewsHub'));
const NewsCategory = lazy(() => import('./pages/NewsCategory'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));
const CityPage = lazy(() => import('./pages/CityPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminRoutes = lazy(() => import('./pages/admin/AdminRoutes'));

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const urlLang = detectLangFromPath(location.pathname);
  const basePath = stripLangPrefix(location.pathname);
  const isAdmin = window.location.hostname === 'admin.carzio.ma';

  useEffect(() => {
    if (isAdmin) {
      document.title = 'Carzio Admin';
      return;
    }
    if (urlLang && i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang, isAdmin]);

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
        <AdminRoutes />
      </Suspense>
    );
  }

  return (
    <CurrencyProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        {t('common.skipToContent')}
      </a>
      <ScrollToTop />
      <Header />
      <WhatsAppButton />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-[60vh] bg-black" aria-hidden="true" />}>
        <Routes location={{ ...location, pathname: basePath }}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car-rental-agadir-airport" element={<AirportPage />} />
          <Route path="/location-voiture-aeroport-agadir" element={<AirportPage />} />
          <Route path="/mietwagen-agadir-flughafen" element={<AirportPage />} />
          <Route path="/alquiler-coche-aeropuerto-agadir" element={<AirportPage />} />
          <Route path="/wynajem-samochodu-agadir-lotnisko" element={<AirportPage />} />
          <Route path="/auto-huren-agadir-luchthaven" element={<AirportPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/faq" element={<FaqHub />} />
          <Route path="/faq/:slug" element={<FaqPage />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/categorie/:category" element={<BlogCategory />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/news" element={<NewsHub />} />
          <Route path="/news/categorie/:category" element={<NewsCategory />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/location-voiture-agadir" element={<CityPage citySlug="agadir" />} />
          <Route path="/location-voiture-marrakech" element={<CityPage citySlug="marrakech" />} />
          <Route path="/location-voiture-casablanca" element={<CityPage citySlug="casablanca" />} />
          <Route path="/location-voiture-taghazout" element={<CityPage citySlug="taghazout" />} />
          <Route path="/location-voiture-tamraght" element={<CityPage citySlug="tamraght" />} />
          <Route path="/location-voiture-essaouira" element={<CityPage citySlug="essaouira" />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/:slug" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </CurrencyProvider>
  );
}

export default App;
