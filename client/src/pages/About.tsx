import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Truck, Tractor, CreditCard, Warehouse, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const stats = [
  { value: '15+', label: 'Års erfaring' },
  { value: '120+', label: 'Maskiner på lager' },
  { value: '2009', label: 'Grundlagt' },
  { value: '100%', label: 'Finansiering muligt' },
];

const ctaCards = [
  {
    title: 'Maskiner på lager',
    description: 'Se vores udvalg af brugte entreprenørmaskiner',
    href: '/maskiner',
    icon: Warehouse,
  },
  {
    title: 'Solis Traktor',
    description: 'Vi er autoriseret Solis traktor forhandler',
    href: '/solis-traktor',
    icon: Tractor,
  },
  {
    title: 'Trailer',
    description: 'Variant og Ifor Williams maskintrailere',
    href: '/trailer',
    icon: Truck,
  },
  {
    title: 'Finansiering',
    description: 'Leasing og finansiering i samarbejde med Spar Nord',
    href: '/finansiering',
    icon: CreditCard,
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'Om os - CR Maskiner | 15+ års erfaring med entreprenørmaskiner';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero with background image */}
        <section className="relative h-[70vh] min-h-[450px] overflow-hidden">
          <img
            src="/hero-drone.jpg"
            alt="CR Maskiner plads"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#1a2332]/70 to-[#1a2332]/40" />

          <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-3">
              Siden 2009
            </p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight"
              data-testid="text-page-title"
            >
              Om CR Maskiner
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              Din professionelle partner inden for handel med entreprenørmaskiner.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-navy-light border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <div className="font-display font-bold text-3xl lg:text-4xl text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content — two column like Kapema's "Mød teamet" */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/hero-drone.jpg"
                  alt="CR Maskiner set fra luften"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Hvem er vi
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Mere end 15 års erfaring med maskiner
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Vi har mere end 15 års erfaring i salg af nye &amp; brugte entreprenørmaskiner.
                  </p>
                  <p>
                    Vi har altid over 120 maskiner på lager. Ring for fremvisning, da vi ikke har faste
                    åbningstider.
                  </p>
                  <p>
                    Udover brugte maskiner er vi også forhandler af Solis traktorer, samt Variant og Ifor
                    Williams maskintrailere.
                  </p>
                  <p>
                    Vi tilbyder finansiering og leasing på alle vores maskiner i samarbejde med Spar Nord
                    Leasing.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded font-semibold hover:bg-black transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Kontakt os
                  </Link>
                  <Link
                    href="/maskiner"
                    className="inline-flex items-center gap-2 border border-gray-300 text-foreground px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all"
                  >
                    Se maskiner
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA cards */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Vores ydelser
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
                Udforsk hvad vi tilbyder
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ctaCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">
                    <card.icon className="w-6 h-6 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 group-hover:gap-2 transition-all">
                    Læs mere <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
