import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

interface Machine {
  id: number;
  title: string;
  brand: string;
  year: string;
  price: string;
  url: string;
  pictures: { url: string }[];
}

function formatPrice(price: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return price;
  return num.toLocaleString('da-DK');
}

export default function MachineSlider({ machines }: { machines: Machine[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const displayMachines = machines.slice(0, 8);

  if (displayMachines.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {displayMachines.map((machine) => (
            <div 
              key={machine.id} 
              className="flex-none w-[280px] sm:w-[320px] lg:w-[350px]"
            >
              <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  {machine.pictures?.[0]?.url ? (
                    <img
                      src={machine.pictures[0].url}
                      alt={machine.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Ingen billede
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur text-xs font-medium px-2 py-1 rounded text-foreground">
                      {machine.year}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {machine.brand}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {machine.title}
                  </h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-bold text-xl text-primary">
                        {formatPrice(machine.price)} kr
                      </span>
                      <span className="text-xs text-muted-foreground block">ekskl. moms</span>
                    </div>
                    <Link
                      href={`/maskine/${machine.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Se mere →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-colors z-10"
        data-testid="button-slider-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-colors z-10"
        data-testid="button-slider-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}