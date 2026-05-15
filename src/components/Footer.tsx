import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="block shrink-0">
              <img src="/images/carzio-logo.png" alt="Carzio" className="h-12 md:h-14 w-auto" />
            </Link>
            <p className="text-white/40 text-sm mt-3 leading-relaxed">
              Premium vehicle solutions for discerning clients. Experience the road in unparalleled style and comfort.
            </p>
          </div>
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Our Cars', to: '/cars' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/40 text-sm hover:text-gold transition">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>Airport Agadir, Agadir 80000</li>
              <li><a href="https://wa.me/212680318003" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">+212 680-318003</a></li>
              <li><a href="mailto:contact@carzio.ma" className="hover:text-gold transition">contact@carzio.ma</a></li>
              <li>Mon-Sun: 24/7 Service</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-white/30 text-xs">
          &copy; 2026 Carzio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
