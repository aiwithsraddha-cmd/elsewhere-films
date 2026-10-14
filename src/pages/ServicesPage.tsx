import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY_STAGES, WAYS_OF_WORKING, SERVICES_DATA } from '../data/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { asset } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onOpenContact: () => void;
  onThemeChange?: (theme: 'dark' | 'ivory') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenContact,
  onThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
    if (onThemeChange) onThemeChange('dark');

    const journeySec = journeySectionRef.current;
    const progressBar = timelineProgressRef.current;

    const ctx = gsap.context(() => {
      // Monitor theme transitions across Services sections
      if (journeySec) {
        ScrollTrigger.create({
          trigger: journeySec,
          start: 'top 30%',
          end: 'bottom 30%',
          onEnter: () => onThemeChange && onThemeChange('ivory'),
          onLeaveBack: () => onThemeChange && onThemeChange('dark'),
          onLeave: () => onThemeChange && onThemeChange('dark'),
          onEnterBack: () => onThemeChange && onThemeChange('ivory'),
        });

        // Timeline progression scrub
        if (progressBar) {
          ScrollTrigger.create({
            trigger: journeySec,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
            onUpdate: (self) => {
              gsap.set(progressBar, { width: `${self.progress * 100}%` });
              const idx = Math.min(
                Math.floor(self.progress * JOURNEY_STAGES.length),
                JOURNEY_STAGES.length - 1
              );
              setActiveStage(idx);
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onThemeChange]);

  return (
    <div ref={containerRef} className="w-full bg-cinema-black text-warm-ivory">
      {/* SECTION 01: PAGE OPENING */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Atmospheric Projector Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={asset('/images/projector-beam-dark.jpg')}
            alt=""
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/70 to-cinema-black/85" />
          <div className="absolute inset-0 film-grain" />
        </div>

        {/* Subtle Projected-Light Frame Boundary */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90vw] max-w-[1100px] aspect-[16/9] border border-white/[0.05] rounded-sm relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-signature-red/70" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-signature-red/70" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-signature-red/70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-signature-red/70" />
            <div className="absolute inset-0 bg-radial from-white/[0.02] to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center space-x-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
            <span className="text-xs tracking-[0.24em] uppercase text-warm-ivory/60 font-medium">
              SERVICES & FESTIVAL PATHWAYS
            </span>
          </div>

          <h1 className="font-editorial text-[clamp(44px,7.5vw,104px)] font-light text-pure-white leading-[1.05] tracking-[-0.03em] mb-8">
            Where is your film on its journey?
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-warm-ivory/70 font-sans font-light leading-relaxed">
            Every film enters our process at its own juncture. We examine timing,
            rules, rooms, and audience potential to chart the journey forward.
          </p>
        </div>
      </section>

      {/* SECTION 02: FILM JOURNEY STAGES (WARM IVORY) */}
      <section
        ref={journeySectionRef}
        id="journey-stages"
        className="relative w-full bg-warm-ivory text-cinema-black py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 border-t border-hairline-light"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-hairline-light pb-8 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
                <span className="text-xs tracking-[0.2em] uppercase text-muted-grey font-medium">
                  STAGE ASSESSMENT • 04 ENTRY POINTS
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-cinema-black tracking-[-0.02em]">
                Four Stages of Engagement
              </h2>
            </div>
            <p className="mt-4 sm:mt-0 text-xs text-muted-grey tracking-widest uppercase font-medium">
              CHRONOLOGY & SELECTIVE CO-PRODUCTION
            </p>
          </div>

          {/* Desktop Horizontal Timeline Progress Bar */}
          <div className="hidden lg:block relative w-full mb-16">
            <div className="w-full h-[1.5px] bg-hairline-light relative">
              <div
                ref={timelineProgressRef}
                className="absolute top-0 left-0 h-full bg-signature-red transition-all duration-150"
                style={{ width: `${((activeStage + 1) / JOURNEY_STAGES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Journey Stages Grid (4 Parallel Aligned Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isSelected = idx === activeStage;
              return (
                <div
                  key={stage.id}
                  className={`group relative p-6 sm:p-7 rounded-sm border transition-all duration-300 flex flex-col justify-between bg-pure-white ${
                    isSelected
                      ? 'border-cinema-black/60 shadow-lg ring-1 ring-cinema-black/10'
                      : 'border-hairline-light hover:border-cinema-black/40 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Stage Photography Banner */}
                    {stage.image && (
                      <div className="relative aspect-[16/10] w-full mb-6 rounded-xs overflow-hidden bg-cinema-black/10 border border-hairline-light">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105 brightness-95"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-cinema-black/80 backdrop-blur-sm text-[9px] text-warm-ivory tracking-widest uppercase font-medium">
                          STAGE {stage.number}
                        </div>
                      </div>
                    )}

                    {/* Top Index & Badge */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-semibold text-cinema-black">
                        [{stage.number}]
                      </span>
                      {stage.badge && (
                        <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs bg-cinema-black/5 text-muted-grey font-medium">
                          {stage.badge}
                        </span>
                      )}
                    </div>

                    {/* Aligned Title (Consistent Height) */}
                    <h3 className="font-editorial text-2xl sm:text-[26px] text-cinema-black font-light mb-3 tracking-[-0.02em] leading-tight min-h-[3.25rem] flex items-center">
                      {stage.title}
                    </h3>

                    {/* Aligned Description (Consistent Height) */}
                    <p className="text-sm sm:text-[14.5px] leading-relaxed text-cinema-black/80 font-sans font-light min-h-[5.5rem]">
                      {stage.description}
                    </p>
                  </div>

                  {/* Parallel Aligned Footer for ALL 4 Stages */}
                  <div className="mt-8 pt-4 border-t border-hairline-light flex items-center justify-between text-xs font-medium text-muted-grey group-hover:text-cinema-black transition-colors">
                    <span className="tracking-wider uppercase text-[10.5px]">
                      {idx === 0 && 'Pre-Festival Strategy'}
                      {idx === 1 && 'Premiere Sequencing'}
                      {idx === 2 && 'Market & Audience Life'}
                      {idx === 3 && 'Selective Co-Production'}
                    </span>
                    <span className="text-signature-red group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES BREAKDOWN */}
      <section className="relative w-full bg-cinema-black py-24 sm:py-32 px-6 sm:px-12 md:px-16 border-t border-hairline-dark">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-signature-red font-medium block mb-3">
              WHAT WE DO IN DETAIL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-pure-white font-normal">
              Our Five Core Disciplines
            </h2>
          </div>

          <div className="space-y-6">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="p-8 sm:p-10 border border-hairline-dark bg-soft-black/80 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-1 text-signature-red text-sm font-semibold">
                  {service.number}
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-pure-white font-normal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-grey uppercase tracking-widest font-medium">
                    {service.shortDesc}
                  </p>
                </div>
                <div className="lg:col-span-4 text-sm text-warm-ivory/80 leading-relaxed font-light">
                  {service.fullDesc}
                </div>
                <div className="lg:col-span-3 border-l border-hairline-dark/70 pl-6 text-xs text-warm-ivory/70 space-y-2">
                  <span className="text-[10px] tracking-widest uppercase text-muted-grey font-medium block mb-2">
                    Scope Includes
                  </span>
                  {service.deliverables?.map((d, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle2 size={12} className="text-signature-red flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: TWO WAYS OF WORKING */}
      <section
        id="ways-of-working"
        className="relative w-full bg-soft-black text-warm-ivory py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 border-t border-hairline-dark"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex items-center space-x-3 mb-12">
            <span className="w-2 h-2 rounded-full bg-signature-red" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-grey font-medium">
              Engagement Models • Two Ways of Working
            </span>
          </div>

          <h2 className="font-editorial text-[clamp(36px,5.2vw,72px)] text-pure-white leading-[1.08] font-normal mb-16 sm:mb-24">
            We usually work in one of two ways.
          </h2>

          {/* Asymmetrical Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Card 1: Pathway Partnership (Primary Visual Prominence - 7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 bg-cinema-black border border-warm-ivory/25 rounded-sm flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-signature-red" />
              <div>
                <div className="flex items-center justify-between text-xs text-muted-grey font-medium mb-6">
                  <span className="text-signature-red font-medium">[01] PRIMARY MODEL</span>
                  <span>FINISHED FILMS</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-pure-white font-normal mb-6">
                  {WAYS_OF_WORKING[0].title}
                </h3>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-warm-ivory/85 font-light">
                  <p>{WAYS_OF_WORKING[0].description}</p>
                  <p className="text-sm sm:text-base text-warm-ivory/70 pt-4 border-t border-hairline-dark">
                    {WAYS_OF_WORKING[0].details}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-hairline-dark flex items-center justify-between">
                <span className="text-xs text-muted-grey tracking-widest uppercase font-medium">
                  FESTIVALS • SALES • DISTRIBUTION
                </span>
                <button
                  onClick={onOpenContact}
                  className="group inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-[0.16em] text-pure-white hover:text-signature-red transition-colors"
                >
                  <span>Start a conversation</span>
                  <ArrowRight size={14} className="text-signature-red group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 2: Creative Partnership (Quieter, Selective - 5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 md:p-14 bg-cinema-black/60 border border-hairline-dark rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-grey font-medium mb-6">
                  <span className="text-muted-grey">[02] SELECTIVE</span>
                  <span>DEVELOPMENT / SCRIPT</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-warm-ivory font-normal mb-6">
                  {WAYS_OF_WORKING[1].title}
                </h3>
                <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-warm-ivory/75 font-light">
                  <p className="text-warm-ivory/90">{WAYS_OF_WORKING[1].description}</p>
                  <p className="pt-4 border-t border-hairline-dark/70 text-sm sm:text-base">
                    {WAYS_OF_WORKING[1].details}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-hairline-dark flex items-center justify-between">
                <span className="text-xs text-muted-grey tracking-widest uppercase font-medium">
                  CO-PRODUCTION
                </span>
                <button
                  onClick={onOpenContact}
                  className="group inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-[0.16em] text-warm-ivory hover:text-signature-red transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight size={14} className="text-signature-red group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: PAGE CLOSE */}
      <section className="relative w-full bg-cinema-black text-warm-ivory py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 text-center border-t border-hairline-dark">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-12 h-[2px] bg-signature-red mb-10" />

          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-pure-white leading-relaxed font-normal mb-12">
            Engagements are structured per film as a fixed fee, retainer, or partnership,
            depending on scope.
          </p>

          <button
            onClick={onOpenContact}
            className="group inline-flex items-center space-x-4 px-8 sm:px-12 py-4 sm:py-5 border border-warm-ivory/30 bg-soft-black/80 hover:bg-pure-white hover:text-cinema-black hover:border-pure-white transition-all duration-300 rounded-sm text-xs sm:text-sm font-medium tracking-[0.2em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-signature-red"
          >
            <span>Start a conversation</span>
            <ArrowRight
              size={15}
              className="text-signature-red group-hover:text-cinema-black transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>
        </div>
      </section>
    </div>
  );
};
