import { Link } from 'wouter';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Maskiner til salg', href: '/maskiner' },
  { label: 'Solis Traktor', href: '/solis-traktor' },
  { label: 'Trailer', href: '/trailer' },
  { label: 'Finansiering', href: '/finansiering' },
  { label: 'Om os', href: '/om-os' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Footer() {
  return (
    <footer>
      {/* Main footer — dark */}
      <div className="bg-[#111]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* Col 1: Brand */}
            <div>
              <Link href="/" className="inline-block mb-5">
                <img
                  src="/cr-logo.png"
                  alt="CR Maskiner"
                  className="h-14 w-auto"
                />
              </Link>
              <p className="text-white/40 text-[15px] leading-relaxed">
                Din professionelle partner inden for køb og salg af nye og brugte
                entreprenørmaskiner i Sorø.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h3 className="text-[15px] font-semibold text-white uppercase tracking-wider mb-5">
                Sider
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-[15px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="text-[15px] font-semibold text-white uppercase tracking-wider mb-5">
                Kontakt
              </h3>
              <div className="space-y-4 text-[15px]">
                <a href="tel:+4522232269" className="flex items-center gap-3 text-[#4ade80] font-semibold hover:text-[#22c55e] transition-colors">
                  <Phone className="w-4 h-4" />
                  +45 22 23 22 69
                </a>
                <a href="mailto:crmaskiner@gmail.com" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  crmaskiner@gmail.com
                </a>
                <div className="flex items-start gap-3 text-white/40">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Nordmarksvej 2<br />4180 Sorø</span>
                </div>
              </div>
            </div>

            {/* Col 4: CTA */}
            <div>
              <h3 className="text-[15px] font-semibold text-white uppercase tracking-wider mb-5">
                Find din maskine
              </h3>
              <p className="text-white/40 text-[15px] leading-relaxed mb-5">
                Vi har altid over 120 maskiner på lager. Ring for fremvisning.
              </p>
              <Link
                href="/maskiner"
                className="inline-flex items-center gap-2 bg-[#1a7a3a] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#14632e] transition-colors"
              >
                Se maskiner <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-white/25">
            <p>&copy; {new Date().getFullYear()} CR Maskiner — Alle rettigheder forbeholdes</p>
            <p>Nordmarksvej 2, 4180 Sorø</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
