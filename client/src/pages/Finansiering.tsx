import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Clock, Zap, UserCheck, Phone, Mail } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Fleksible vilkår',
    description:
      'Vi tilbyder fleksible leasingvilkår tilpasset din virksomheds behov og budget.',
  },
  {
    icon: Zap,
    title: 'Hurtig behandling',
    description:
      'Hurtig og effektiv sagsbehandling så du kan komme i gang med dit arbejde hurtigst muligt.',
  },
  {
    icon: UserCheck,
    title: 'Personlig rådgivning',
    description:
      'Få personlig rådgivning om den bedste finansieringsløsning til netop din situation.',
  },
];

export default function Finansiering() {
  useEffect(() => {
    document.title = 'Finansiering - CR Maskiner | Leasing af maskiner';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero - dark slate background */}
        <div className="bg-[#3d4f5f] text-white min-h-[60vh] flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24">
            <h1 className="font-display font-bold text-6xl sm:text-7xl lg:text-9xl text-white mb-6 tracking-tight">
              Leasing
            </h1>
            <p className="text-2xl sm:text-3xl text-white/80 font-light">
              Finansiering af maskiner
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              Vi hjælper gerne med formidling af finansiering, både nye og brugte. Vi har
              nye Weidemann minilæsser og teleskoplæsser, derudover har vi brugte
              minigraver, minilæsser, kompakt traktor.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Vi har et godt samarbejde med Spar Nord Leasing så vi kan hjælpe dig med at
              formidle den finansieringsløsning, som er bedst for dig.
            </p>
          </div>
        </section>

        {/* CTA Box */}
        <section className="pb-24 lg:pb-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#2a3a47] text-white rounded-2xl p-10 lg:p-16 text-center shadow-2xl">
              <h2 className="font-display font-bold text-2xl lg:text-3xl mb-4 tracking-tight">
                Kontakt os
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Er du interesseret i at høre mere om leasing eller at få et uforpligtet
                tilbud?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a
                  href="tel:22232269"
                  className="flex items-center gap-3 text-lg text-white/90 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>22 23 22 69</span>
                </a>
                <a
                  href="mailto:crmaskiner@gmail.com"
                  className="flex items-center gap-3 text-lg text-white/90 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>crmaskiner@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="bg-slate-50 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-xl transition-shadow text-center"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-6 tracking-tight">
              Klar til at komme i gang?
            </h2>
            <Link href="/kontakt">
              <Button size="lg">Kontakt os i dag</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
