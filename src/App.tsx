import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { detectLangFromPath, stripLangPrefix } from './lib/i18nRouting';
import { CurrencyProvider } from './lib/currency';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqHub from './pages/FaqHub';
import FaqPage from './pages/FaqPage';
import BlogHub from './pages/BlogHub';
import BlogCategory from './pages/BlogCategory';
import BlogPostPage from './pages/BlogPostPage';
import NewsHub from './pages/NewsHub';
import NewsCategory from './pages/NewsCategory';
import NewsArticle from './pages/NewsArticle';
import CityPage from './pages/CityPage';
import NotFound from './pages/NotFound';
import AdminRoutes from './pages/admin/AdminRoutes';

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
    return <AdminRoutes />;
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
        <Routes location={{ ...location, pathname: basePath }}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </CurrencyProvider>
  );
}

export default App;
