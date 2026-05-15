import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PHONE_NUMBER = '+212 680-318003';
const WHATSAPP_URL = 'https://wa.me/212680318003';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Cars', path: '/cars' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black">
      <div className="hidden md:flex bg-zinc-900 text-silver text-xs py-1.5 px-4 justify-center items-center gap-6">
        <span>Airport Agadir, Agadir 80000</span>
        <span>Mon-Sun: 24/7 Service</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="block shrink-0">
          <img src="/images/carzio-logo.png" alt="Carzio" className="h-16 md:h-20 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition ${
                location.pathname === link.path
                  ? 'text-gold'
                  : 'text-white hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:text-gold transition"
          >
            WhatsApp us <span className="text-gold font-semibold">{PHONE_NUMBER}</span>
          </a>
          <Link
            to="/cars"
            className="bg-gold hover:bg-gold-light text-black font-semibold text-sm px-5 py-2 rounded transition"
          >
            Book Now
          </Link>
        </div>
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
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-4 py-4 flex flex-col gap-3 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white hover:text-gold transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gold font-medium">{PHONE_NUMBER}</a>
          <Link
            to="/cars"
            className="bg-gold text-black font-semibold text-center px-4 py-2 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
