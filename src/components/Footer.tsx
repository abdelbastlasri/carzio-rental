import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="block shrink-0">
              <img src="/images/carzio-logo.png" alt="Carzio" className="h-12 md:h-14 w-auto" />
            </Link>
            <p className="text-silver text-sm mt-3 leading-relaxed">
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
                  <Link to={link.to} className="text-silver text-sm hover:text-gold transition">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-silver text-sm">
              <li>Airport Agadir, Agadir 80000</li>
              <li><a href="https://wa.me/212680318003" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">+212 680-318003</a></li>
              <li><a href="mailto:contact@carzio.ma" className="hover:text-gold transition">contact@carzio.ma</a></li>
              <li>Mon-Sun: 24/7 Service</li>
            </ul>

          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 text-center text-silver text-xs">
          &copy; 2026 Carzio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
