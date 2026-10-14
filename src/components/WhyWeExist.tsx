import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { asset } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

interface WhyWeExistProps {
  onOpenPathwayModal: (type: 'pathway' | 'people') => void;
}

export const WhyWeExist: React.FC<WhyWeExistProps> = ({ onOpenPathwayModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const image = imageRef.current;

    if (!section || !headline || !body) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        body,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-we-exist"
      className="relative w-full bg-cinema-black text-warm-ivory py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-hairline-dark"
      aria-label="Why We Exist"
    >
      {/* Background Subtle Projector Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-0 w-[50vw] h-[400px] bg-pure-white/[0.015] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Index Header */}
        <div className="flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
          <span className="text-xs tracking-[0.22em] uppercase text-warm-ivory/50 font-medium">
            Why We Exist
          </span>
        </div>

        {/* Stark Impactful Editorial Statement */}
        <div ref={headlineRef} className="max-w-5xl mb-20 sm:mb-28">
          <p className="font-editorial text-[clamp(34px,5.2vw,74px)] text-pure-white leading-[1.08] font-light mb-3 sm:mb-4 tracking-[-0.03em]">
            Some strong films travel the world.
          </p>
          <p className="font-editorial text-[clamp(34px,5.2vw,74px)] text-warm-ivory leading-[1.08] font-light tracking-[-0.03em]">
            Others, just as good,{' '}
            <span className="text-signature-red italic font-light">
              disappear
            </span>{' '}
            after their first screening.
          </p>
        </div>

        {/* Two-Column Editorial Pairing: Evocative Still + Analytical Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* Left Column: Visual Manifestation of the Screening Space */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-hairline-dark bg-soft-black/80 shadow-2xl group">
              <img
                src={asset('/images/analog-reels.jpg')}
                alt="Empty crimson cinema seats in the dark auditorium"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110 brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] tracking-widest text-warm-ivory/70 uppercase font-medium">
                <span>THE EMPTY AUDITORIUM</span>
                <span className="text-signature-red">MARGIN OF ERROR</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-warm-ivory/40 tracking-wider uppercase font-medium">
              Rhythmic red velvet rows • The fragility of the debut release
            </p>
          </div>

          {/* Right Column: Narrative Copy & Pathway Triggers */}
          <div ref={bodyRef} className="lg:col-span-7 flex flex-col justify-between">
            {/* Leading "Why?" */}
            <div className="mb-6">
              <span className="font-editorial text-4xl sm:text-5xl text-pure-white font-light block mb-4 tracking-[-0.02em]">
                Why?
              </span>
            </div>

            <div className="space-y-6 text-base sm:text-[17px] leading-[1.8] text-warm-ivory/80 font-light font-sans">
              <p>
                It could be the wrong premiere, no one championing it in the right
                rooms, no reason for the press to take notice, or simply no plan for
                what comes after the first festival.
              </p>
              <p className="text-warm-ivory/95 pl-4 border-l-2 border-signature-red/80 py-1 font-normal bg-white/[0.015]">
                Unfortunately, the biggest price is paid by films with the least room
                for error, such as a first film, tight budgets and no banner behind it.
              </p>
              <p>
                An entire ecosystem exists to help films get made. But what about help
                for finished films to find their way into the world?
              </p>
              <p className="text-pure-white font-normal pt-2">
                Elsewhere was built for that gap, drawing on hundreds of film journeys
                and the experience of people who have spent their careers opening the
                doors that matter.
              </p>
            </div>

            {/* Bottom Editorial Interactive Pathways */}
            <div className="mt-12 pt-8 border-t border-hairline-dark flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <button
                onClick={() => onOpenPathwayModal('pathway')}
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-[0.18em] uppercase text-warm-ivory hover:text-signature-red transition-colors focus:outline-none"
              >
                <span>Explore the Pathway Model</span>
                <ArrowRight
                  size={14}
                  className="text-signature-red transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => onOpenPathwayModal('people')}
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-[0.18em] uppercase text-warm-ivory/50 hover:text-warm-ivory transition-colors focus:outline-none"
              >
                <span>The people around the work</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
