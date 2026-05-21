import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import AdminRoutes from './pages/admin/AdminRoutes';

function App() {
  const isAdmin = window.location.hostname === 'admin.carzio.ma';

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <WhatsAppButton />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
