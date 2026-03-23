import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Maskiner', href: '/maskiner' },
  { label: 'Solis Traktor', href: '/solis-traktor' },
  { label: 'Trailer', href: '/trailer' },
  { label: 'Finansiering', href: '/finansiering' },
  { label: 'Om os', href: '/om-os' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !isHome || scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/cr-logo.png"
              alt="CR Maskiner"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  solid
                    ? location === link.href
                      ? 'text-[#111] bg-[#111]/5'
                      : 'text-[#555] hover:text-[#111] hover:bg-[#111]/5'
                    : location === link.href
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+4522232269"
              className={`flex items-center gap-2 text-[14px] font-medium transition-colors ${
                solid ? 'text-[#555] hover:text-[#111]' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              22 23 22 69
            </a>
            <Link
              href="/kontakt"
              className="bg-[#1a7a3a] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#14632e] transition-colors"
            >
              Kontakt os
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              solid ? 'text-[#111]' : 'text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <nav className="max-w-[1360px] mx-auto px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-[15px] font-medium rounded-xl transition-colors ${
                  location === link.href
                    ? 'text-[#1a7a3a] bg-[#1a7a3a]/5'
                    : 'text-[#333] hover:bg-gray-50'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
              <a href="tel:+4522232269" className="flex items-center gap-3 px-4 py-3 text-[15px] text-[#333]">
                <Phone className="w-4 h-4 text-[#1a7a3a]" /> +45 22 23 22 69
              </a>
              <a href="mailto:crmaskiner@gmail.com" className="flex items-center gap-3 px-4 py-3 text-[15px] text-[#333]">
                <Mail className="w-4 h-4 text-[#1a7a3a]" /> crmaskiner@gmail.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
