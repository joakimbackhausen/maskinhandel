import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import {
  Loader2, ArrowLeft, Phone, Mail, ChevronLeft, ChevronRight,
  ExternalLink, ChevronUp, ChevronDown, Settings, Ruler, Info,
  FileText, Tag, Calendar, Wrench, Gauge, Weight, Box
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  tid: string;
  name: string;
}

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
  category: Category[];
  description: string;
  contact: string;
  address: string;
  extra_parameters: Record<string, { name: string; value: string }>;
}

function formatPrice(price: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return price;
  return num.toLocaleString('da-DK');
}

/* ── Collapsible spec section ── */
function SpecSection({
  icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <span className="font-semibold text-[15px] text-[#1a1a1a]">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Spec item chip ── */
function SpecItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-[#f8f9fb] rounded-xl px-4 py-3.5 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[15px] font-semibold text-[#1a1a1a]">{value}</div>
    </div>
  );
}

export default function MachineDetail() {
  const params = useParams<{ id: string }>();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const response = await fetch('/api/machines');
        if (!response.ok) {
          throw new Error('Kunne ikke hente maskindata');
        }
        const data = await response.json();
        const found = data.find((m: Machine) => m.id.toString() === params.id);
        if (found) {
          setMachine(found);
          document.title = `${found.brand} ${found.model} - CR Maskiner`;
        } else {
          setError('Maskinen blev ikke fundet');
        }
      } catch (err) {
        setError('Der opstod en fejl ved indlæsning');
      } finally {
        setLoading(false);
      }
    }
    fetchMachine();
  }, [params.id]);

  const nextImage = () => {
    if (machine && machine.pictures.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % machine.pictures.length);
    }
  };

  const prevImage = () => {
    if (machine && machine.pictures.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + machine.pictures.length) % machine.pictures.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-[72px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#1a7a3a]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-[72px]">
          <p className="text-xl text-gray-500">{error || 'Maskinen blev ikke fundet'}</p>
          <Link
            href="/maskiner"
            className="inline-flex items-center gap-2 text-[#1a7a3a] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbage til maskiner
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const specifications = Object.entries(machine.extra_parameters || {})
    .filter(([, param]) => param.value && param.value.trim() !== '')
    .map(([key, param]) => ({ key, name: param.name, value: param.value }));

  const categoryPath = machine.category?.map(c => c.name).join(' → ') || '';

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />

      <main className="flex-1 pt-[72px]">
        {/* Breadcrumb bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-3">
            <Link
              href="/maskiner"
              className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-[#1a1a1a] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbage til maskiner
            </Link>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ─── LEFT: Images ─── */}
            <div className="min-w-0">
              <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                {machine.pictures && machine.pictures.length > 0 ? (
                  <>
                    <img
                      src={machine.pictures[currentImageIndex]?.url}
                      alt={machine.title}
                      className="w-full h-full object-cover"
                    />
                    {machine.pictures.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-[#1a1a1a]" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[13px] font-medium">
                          {currentImageIndex + 1} / {machine.pictures.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Intet billede
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {machine.pictures && machine.pictures.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {machine.pictures.map((pic, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[#1a7a3a] shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={pic.url}
                        alt={`Billede ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── RIGHT: Info ─── */}
            <div className="space-y-6">
              {/* Title & Category */}
              <div>
                {categoryPath && (
                  <p className="text-[13px] text-[#1a7a3a] font-semibold tracking-wide uppercase mb-2">
                    {categoryPath}
                  </p>
                )}
                <h1 className="font-serif text-[28px] sm:text-[34px] text-[#1a1a1a] leading-tight">
                  {machine.brand && `${machine.brand} `}{machine.model || machine.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {machine.year && machine.year !== 'Årgang ukendt' && (
                    <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[13px] text-gray-600 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {machine.year}
                    </span>
                  )}
                  {machine.brand && (
                    <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[13px] text-gray-600 px-3 py-1 rounded-full">
                      <Tag className="w-3.5 h-3.5" />
                      {machine.brand}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[13px] text-gray-600 px-3 py-1 rounded-full">
                    #{machine.id}
                  </span>
                </div>
              </div>

              {/* Price card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="text-[13px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                  Pris ekskl. moms
                </div>
                <div className="font-serif text-[36px] text-[#1a7a3a] leading-tight mb-1">
                  {machine.price && !isNaN(parseInt(machine.price, 10))
                    ? `${formatPrice(machine.price)} ${machine.currency || 'DKK'}`
                    : 'Ring for pris'}
                </div>
                {machine.price && !isNaN(parseInt(machine.price, 10)) && (
                  <div className="text-[14px] text-gray-400">
                    Inkl. moms: {formatPrice(String(Math.round(parseInt(machine.price, 10) * 1.25)))} {machine.currency || 'DKK'}
                  </div>
                )}
              </div>

              {/* Contact card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-[15px] text-[#1a1a1a] mb-4">
                  Kontakt os om denne maskine
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+4522232269" className="flex-1">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1a7a3a] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#14632e] transition-colors">
                      <Phone className="w-4 h-4" />
                      Ring: 22 23 22 69
                    </button>
                  </a>
                  <a
                    href={`mailto:crmaskiner@gmail.com?subject=Forespørgsel: ${machine.brand} ${machine.model} (ID: ${machine.id})&body=Hej,%0D%0A%0D%0AJeg er interesseret i følgende maskine:%0D%0A%0D%0A${machine.brand} ${machine.model}%0D%0APris: ${formatPrice(machine.price)} ${machine.currency}%0D%0AID: ${machine.id}%0D%0A%0D%0AMed venlig hilsen`}
                    className="flex-1"
                  >
                    <button className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#1a1a1a] text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                      <Mail className="w-4 h-4" />
                      Send email
                    </button>
                  </a>
                </div>
                <p className="text-[13px] text-gray-400 mt-4 text-center">
                  Kontaktperson: {machine.contact || 'Claus'} · Åben efter aftale
                </p>
              </div>

              {machine.url && (
                <a
                  href={machine.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1a7a3a] hover:underline text-[14px] font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Se annonce på altimaskiner.dk
                </a>
              )}
            </div>
          </div>

          {/* ─── DETAILS: Specs & Description ─── */}
          <div className="mt-10 lg:mt-14 space-y-4">

            {/* Machine info section */}
            <SpecSection
              icon={<Info className="w-5 h-5" />}
              title="Generel information"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {machine.brand && (
                  <SpecItem label="Fabrikat" value={machine.brand} icon={<Tag className="w-3.5 h-3.5" />} />
                )}
                {machine.model && (
                  <SpecItem label="Model" value={machine.model} icon={<Settings className="w-3.5 h-3.5" />} />
                )}
                {machine.year && machine.year !== 'Årgang ukendt' && (
                  <SpecItem label="Årgang" value={machine.year} icon={<Calendar className="w-3.5 h-3.5" />} />
                )}
                {categoryPath && (
                  <SpecItem label="Kategori" value={machine.category?.[machine.category.length - 1]?.name || categoryPath} />
                )}
                <SpecItem label="Annonce nr." value={`${machine.id}`} />
                <SpecItem label="Type" value="Brugt" />
              </div>
            </SpecSection>

            {/* Extra specifications */}
            {specifications.length > 0 && (
              <SpecSection
                icon={<Wrench className="w-5 h-5" />}
                title="Specifikationer"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {specifications.map((spec) => (
                    <SpecItem key={spec.key} label={spec.name} value={spec.value} />
                  ))}
                </div>
              </SpecSection>
            )}

            {/* Description section */}
            {machine.description && (
              <SpecSection
                icon={<FileText className="w-5 h-5" />}
                title="Beskrivelse"
              >
                <div
                  className="prose prose-sm prose-gray max-w-none text-[15px] text-gray-600 leading-relaxed [&_br]:my-1"
                  dangerouslySetInnerHTML={{
                    __html: machine.description
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/<br\s*\/?>/gi, '<br />'),
                  }}
                />
              </SpecSection>
            )}

            {/* Price details */}
            <SpecSection
              icon={<Gauge className="w-5 h-5" />}
              title="Pris & Vilkår"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecItem
                  label="Pris ekskl. moms"
                  value={
                    machine.price && !isNaN(parseInt(machine.price, 10))
                      ? `${formatPrice(machine.price)} ${machine.currency || 'DKK'}`
                      : 'Ring for pris'
                  }
                />
                {machine.price && !isNaN(parseInt(machine.price, 10)) && (
                  <SpecItem
                    label="Pris inkl. moms"
                    value={`${formatPrice(String(Math.round(parseInt(machine.price, 10) * 1.25)))} ${machine.currency || 'DKK'}`}
                  />
                )}
                <SpecItem label="Finansiering" value="Muligt" />
              </div>
            </SpecSection>

            {/* Contact / location info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-[15px] text-[#1a1a1a] mb-4">
                Yderligere oplysninger
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecItem label="Forhandler" value="CR Maskiner" />
                <SpecItem label="Kontaktperson" value={machine.contact || 'Claus'} />
                <SpecItem label="Adresse" value={machine.address || 'Nordmarksvej 2, 4180 Sorø'} />
                <SpecItem label="Telefon" value="22 23 22 69" />
                <SpecItem label="Email" value="crmaskiner@gmail.com" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
