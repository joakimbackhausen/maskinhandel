import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function SolisTraktor() {
  useEffect(() => {
    document.title = 'Solis Traktor - CR Maskiner | Din nye stærke minitraktor';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero - full width background image */}
        <div className="relative min-h-[70vh] flex items-center justify-center">
          <img
            src="/solis-gallery.jpg"
            alt="Solis traktor i aktion"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="font-display italic font-bold text-6xl sm:text-7xl lg:text-9xl text-white mb-4 tracking-tight">
              Solis
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-light mb-6">
              din nye stærke minitraktor
            </p>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Kvalitetstraktorer til professionelt og hobbybrug siden 1969
            </p>
          </div>
        </div>

        {/* Modeller - Two Column */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <img
                  src="/solis-tractor.jpeg"
                  alt="Solis traktor"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-8 tracking-tight">
                  Modeller
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Konstruktionen af maskinerne er stærke og enkle, hvilket også gør dem
                  optimale til hobbybrug. Vi fører i øjeblikket 4 maskiner der spænder fra
                  26 til 50 hk.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Perfekte bud på en minitraktor til anlægsgartnere, golfklubber,
                  stutterier, hobby- og fritidslandbrug.
                </p>
                <Link href="/kontakt">
                  <Button size="lg" className="group">
                    Se udvalget
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width image band */}
        <div className="w-full h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src="/solis-equipment.jpeg"
            alt="Solis udstyr og tilbehør"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Udstyr section */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-8 tracking-tight">
              Udstyr
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              Vi har en bred vifte af europæisk produceret udstyr til mindre traktorer.
              Både til forskellige størrelser og i forskellige prisklasser.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Fræsere og slåmaskiner er velafprøvet og klar til levering.
            </p>
          </div>
        </section>

        {/* Award section */}
        <section className="bg-slate-50 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
              <img
                src="/solis-award.png"
                alt="Årets Solis forhandler 2022"
                className="w-48 lg:w-64 flex-shrink-0"
              />
              <div className="text-center lg:text-left max-w-lg">
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-6 tracking-tight">
                  Årets Solis forhandler 2022
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  CR Maskiner blev kåret som Årets Solis forhandler i 2022. Siden 1969 har
                  Solis udviklet traktorer til professionelt- samt hobbybrug med fokus på
                  stabilitet og kvalitet til konkurrencedygtige priser.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4 tracking-tight">
              Kontakt os for mere information
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Vi sidder klar til at hjælpe dig med at finde den rette Solis traktor.
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
