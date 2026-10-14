import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SignatureClosingProps {
  onOpenContact: () => void;
}

export const SignatureClosing: React.FC<SignatureClosingProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const headline = headlineRef.current;
    const button = buttonRef.current;

    if (!section || !line || !headline || !button) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(line, { width: 0 }, { width: 48, duration: 0.8, ease: 'power2.out' })
        .fromTo(
          headline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          button,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cinema-black text-warm-ivory py-32 sm:py-44 md:py-56 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-hairline-dark"
      aria-label="Closing Call to Action"
    >
      {/* Subtle Projected Rectangle / Screen in the Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] max-w-[1000px] aspect-[2.39/1] border border-white/[0.04] bg-white/[0.015] rounded-sm blur-[1px] relative">
          <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Animated Signature Red Line */}
        <div ref={lineRef} className="h-[2px] bg-signature-red mb-10 mx-auto" />

        {/* Closing Visual Headline */}
        <h2
          ref={headlineRef}
          className="font-editorial text-[clamp(40px,6.5vw,92px)] text-pure-white leading-[1.08] font-light tracking-[-0.03em] max-w-4xl mb-12"
        >
          Where could your film go next?
        </h2>

        {/* Start a Conversation CTA */}
        <div ref={buttonRef}>
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center space-x-4 px-8 sm:px-12 py-4 sm:py-5 border border-warm-ivory/30 bg-soft-black/80 hover:bg-pure-white hover:text-cinema-black hover:border-pure-white transition-all duration-300 rounded-sm text-xs sm:text-sm tracking-[0.2em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-signature-red shadow-2xl font-medium"
          >
            <span>Start a conversation</span>
            <ArrowRight
              size={15}
              className="text-signature-red group-hover:text-cinema-black transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>
        </div>

        {/* Subtext Statement */}
        <p className="mt-8 text-xs text-muted-grey tracking-[0.16em] uppercase font-normal">
          Engagements structured per film • International festival & distribution pathways
        </p>
      </div>
    </section>
  );
};
