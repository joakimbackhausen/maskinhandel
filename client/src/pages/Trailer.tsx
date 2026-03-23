import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Phone, Mail } from 'lucide-react';

export default function Trailer() {
  useEffect(() => {
    document.title = 'Trailer - CR Maskiner | Variant & Ifor Williams maskintrailer';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero - full width background image */}
        <div className="relative min-h-[70vh] flex items-center justify-center">
          <img
            src="/trailer-chassis.jpg"
            alt="Maskintrailer chassis"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl text-white mb-4 tracking-tight">
              Maskintrailer
            </h1>
            <p className="text-2xl sm:text-3xl text-white/90 font-light">
              Variant &amp; Ifor Williams
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              Vi er forhandler af Variant og Ifor Williams maskintrailer. Vi har
              fabriksnye trailer på lager klar til omgående levering!
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Disse modeller er særligt tilpasset til transport af f.eks. tunge
              minigravere eller andet kompakt og tungt materiel. Med det fuldsvejste og
              varmgalvaniserede chassis, får du den helt optimale kombination af ekstrem
              styrke og uovertruffen holdbarhed i en trailer der holder til det hårde
              arbejde.
            </p>
          </div>
        </section>

        {/* Brand Image Cards */}
        <section className="pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Ifor Williams */}
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-xl">
                <img
                  src="/ifor-trailer.jpg"
                  alt="Ifor Williams trailer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight">
                    Ifor Williams
                  </h3>
                  <p className="text-white/80 mt-2 text-lg">
                    Britisk kvalitet siden 1958
                  </p>
                </div>
              </div>

              {/* Variant */}
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-xl">
                <img
                  src="/trailer-chassis.jpg"
                  alt="Variant maskintrailer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight">
                    Variant
                  </h3>
                  <p className="text-white/80 mt-2 text-lg">
                    Dansk produceret kvalitet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4 tracking-tight">
              Kontakt os for priser
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Vi har fabriksnye trailere på lager klar til omgående levering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
              <a
                href="tel:22232269"
                className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>22 23 22 69</span>
              </a>
              <a
                href="mailto:crmaskiner@gmail.com"
                className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>crmaskiner@gmail.com</span>
              </a>
            </div>
            <Link href="/kontakt">
              <Button size="lg">Kontakt os</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
