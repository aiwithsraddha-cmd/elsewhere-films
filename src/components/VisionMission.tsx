import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VisionMission: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const vision = visionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!section || !vision || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        vision,
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
        text,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
      id="vision"
      className="relative w-full bg-warm-ivory text-cinema-black py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 border-t border-hairline-light overflow-hidden"
      aria-label="Vision and Mission"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Subheader Meta */}
        <div className="flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
          <span className="text-xs tracking-[0.22em] uppercase text-muted-grey font-medium">
            Vision & Mission
          </span>
        </div>

        {/* Vision Statement Headline (High Impact Modern Sans Display) */}
        <div className="max-w-5xl mb-16 sm:mb-24">
          <h2
            ref={visionRef}
            className="font-editorial text-[clamp(36px,5vw,72px)] leading-[1.08] tracking-[-0.03em] font-light"
          >
            A future where South Asian stories are discovered, celebrated, and sustained
            across the world,{' '}
            <span className="text-signature-red italic font-light">
              by design, not by chance.
            </span>
          </h2>
        </div>

        {/* Asymmetric Editorial Content Grid (Photography + Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Authentic Cinema Still (Monograph Presentation) */}
          <div ref={imageRef} className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-cinema-black/10 border border-hairline-light shadow-lg group">
              <img
                src="/images/projector-beam-dark.jpg"
                alt="Cinema auditorium facing the luminous projection screen"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] tracking-widest text-pure-white/80 uppercase font-medium">
                <span>THE PROJECTION ROOM</span>
                <span>FIG. 01</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-grey tracking-wider uppercase font-medium">
              Auditorium in projection • The communal moment of discovery
            </p>
          </div>

          {/* Right Column: Mission Copy */}
          <div
            ref={textRef}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="space-y-6 text-base sm:text-[17px] leading-[1.8] text-cinema-black/85 font-sans font-light">
              <p>
                We work with South Asian independent cinema on visibility,
                circulation, and global pathways. We help films reach the right festivals,
                markets, and distributors, combining our pathway intelligence model
                with the judgment of experienced industry practitioners.
              </p>
              <p className="pt-4 border-t border-hairline-light text-cinema-black/95">
                Elsewhere exists to ensure an independent film’s journey doesn’t end
                with completion, and it keeps reaching the audience long after its
                premiere.
              </p>
            </div>

            {/* Editorial Footer Line */}
            <div className="mt-12 pt-6 border-t border-hairline-light flex items-center justify-between text-xs text-muted-grey tracking-widest font-medium">
              <span>PATHWAY INTELLIGENCE</span>
              <span>EST. INDEPENDENT CINEMA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
