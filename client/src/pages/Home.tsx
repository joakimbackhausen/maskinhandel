import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Loader2, ArrowRight, Phone, ChevronRight, ChevronLeft, Truck, Tractor, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MachineSlider from '@/components/MachineSlider';

interface Machine {
  id: number;
  title: string;
  model: string;
  brand: string;
  year: string;
  price: string;
  currency: string;
  url: string;
  pictures: { url: string; date: string }[];
  category: { id: string; name: string }[];
  description: string;
}

/* ── Animated counter ──────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ── Categories ────────────────────────────────────────── */
const categories = [
  {
    title: 'Entreprenørmaskiner',
    desc: 'Minigravere, læssere og meget mere',
    href: '/maskiner',
    image: '/hero-drone.jpg',
  },
  {
    title: 'Solis Traktorer',
    desc: 'Autoriseret Solis forhandler',
    href: '/solis-traktor',
    image: '/solis-tractor.jpeg',
  },
  {
    title: 'Trailere',
    desc: 'Variant & Ifor Williams',
    href: '/trailer',
    image: '/ifor-trailer.jpg',
  },
];

/* ══════════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  const stat1 = useCountUp(120, 2200);
  const stat2 = useCountUp(15, 1800);

  useEffect(() => {
    document.title = 'CR Maskiner — Nye & brugte entreprenørmaskiner i Sorø';
  }, []);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const res = await fetch('/api/machines');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (Array.isArray(data)) setMachines([...data].sort((a, b) => b.id - a.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMachines();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ─── HERO ─── Full-bleed photo, centered text */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="/hero-drone.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-[#4ade80] text-[14px] sm:text-[15px] font-semibold tracking-[0.2em] uppercase mb-6 animate-fade-in">
            Din maskinforhandler i Sorø
          </p>
          <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] text-white leading-[1.05] tracking-tight mb-8 animate-fade-in-up">
            Nye &amp; brugte
            <br />
            kvalitetsmaskiner
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up-delay">
            <Link
              href="/maskiner"
              className="inline-flex items-center gap-2 bg-[#1a7a3a] text-white text-[15px] font-semibold px-8 py-3.5 rounded-full hover:bg-[#14632e] transition-colors"
            >
              Se maskiner på lager
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+4522232269"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-[15px] font-semibold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Ring til os
            </a>
          </div>
        </div>

        {/* Bottom wave/fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── CATEGORIES ─── Horizontal cards with green overlay like Maskinera */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#1a7a3a] text-[13px] font-semibold tracking-[0.15em] uppercase mb-2">
                Kategorier
              </p>
              <h2 className="font-serif text-[32px] lg:text-[40px] text-[#1a1a1a] leading-tight">
                Udforsk vores sortiment
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Green tint overlay like Maskinera */}
                <div className="absolute inset-0 bg-[#111]/50 group-hover:bg-[#111]/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <p className="text-white/60 text-[12px] font-semibold tracking-[0.15em] uppercase mb-1">
                    Kategori
                  </p>
                  <h3 className="font-serif text-white text-[26px] lg:text-[30px] leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-[14px] mt-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MACHINES ─── Light sage bg */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#1a7a3a] text-[13px] font-semibold tracking-[0.15em] uppercase mb-2">
                På lager nu
              </p>
              <h2 className="font-serif text-[32px] lg:text-[40px] text-[#1a1a1a] leading-tight">
                Seneste maskiner
              </h2>
            </div>
            <Link
              href="/maskiner"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#1a7a3a] text-[14px] font-semibold hover:underline"
            >
              Se alle <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#1a7a3a]" />
            </div>
          ) : (
            <MachineSlider machines={machines} />
          )}

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/maskiner"
              className="inline-flex items-center gap-1 text-[#1a7a3a] font-semibold text-[15px]"
            >
              Se alle maskiner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── Clean white section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div ref={stat1.ref} className="text-center md:text-left">
              <span className="font-serif text-[56px] lg:text-[72px] text-[#1a7a3a] leading-none">
                {stat1.value}+
              </span>
              <p className="text-[#666] text-[15px] mt-2">Maskiner på lager</p>
            </div>
            <div ref={stat2.ref} className="text-center md:text-left">
              <span className="font-serif text-[56px] lg:text-[72px] text-[#1a7a3a] leading-none">
                {stat2.value}+
              </span>
              <p className="text-[#666] text-[15px] mt-2">Års erfaring i branchen</p>
            </div>
            <div className="text-center md:text-left">
              <span className="font-serif text-[56px] lg:text-[72px] text-[#1a7a3a] leading-none">
                100%
              </span>
              <p className="text-[#666] text-[15px] mt-2">Finansiering muligt</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── Image + text */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/hero-drone.jpg"
                alt="CR Maskiner plads"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[#1a7a3a] text-[13px] font-semibold tracking-[0.15em] uppercase mb-3">
                Om CR Maskiner
              </p>
              <h2 className="font-serif text-[32px] lg:text-[40px] text-[#1a1a1a] leading-tight mb-6">
                Mere end 15 års erfaring med maskiner
              </h2>
              <p className="text-[#666] text-[16px] leading-relaxed mb-4">
                Vi har altid over 120 maskiner på lager klar til omgående levering.
                Udover brugte maskiner er vi autoriseret forhandler af Solis traktorer
                samt Variant og Ifor Williams maskintrailere.
              </p>
              <p className="text-[#666] text-[16px] leading-relaxed mb-8">
                Vi tilbyder finansiering og leasing på alle vores maskiner i samarbejde
                med Spar Nord Leasing. Ring for fremvisning.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+4522232269"
                  className="inline-flex items-center gap-2 bg-[#111] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Ring til os
                </a>
                <Link
                  href="/maskiner"
                  className="inline-flex items-center gap-2 border-2 border-[#111] text-[#1a7a3a] text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#111] hover:text-white transition-all"
                >
                  Se maskiner <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── Dark green */}
      <section className="bg-[#111] py-16 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-serif text-[32px] lg:text-[44px] text-white leading-tight mb-4">
            Klar til at finde din næste maskine?
          </h2>
          <p className="text-white/60 text-[16px] max-w-lg mx-auto mb-8">
            Kig forbi eller ring — vi hjælper gerne med at finde den rette maskine til dig
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/maskiner"
              className="inline-flex items-center gap-2 bg-[#1a7a3a] text-white text-[15px] font-semibold px-8 py-3.5 rounded-full hover:bg-[#14632e] transition-colors"
            >
              Se maskiner <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+4522232269"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white text-[15px] font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +45 22 23 22 69
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
