import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FILMSTRIP_FRAMES } from '../data/content';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FilmstripJourneyProps {
  onOpenContact: () => void;
  onThemeChange?: (theme: 'dark' | 'ivory') => void;
}

export const FilmstripJourney: React.FC<FilmstripJourneyProps> = ({
  onOpenContact,
  onThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const expansionSectionRef = useRef<HTMLDivElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const expansion = expansionSectionRef.current;

    if (!container || !track) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check if desktop / large tablet for pinned sequence
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const totalFrames = FILMSTRIP_FRAMES.length;
    // Calculate total horizontal travel
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(trackWidth - windowWidth + 120);
    };

    let lastScrollTime = Date.now();
    let lastScrollY = window.scrollY;

    const ctx = gsap.context(() => {
      // 1. Horizontal Filmstrip Movement
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate active frame based on progress
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * totalFrames),
              totalFrames - 1
            );
            setActiveFrameIndex(idx);

            // Calculate directional scroll velocity for subtle cinematic motion blur
            const now = Date.now();
            const dt = Math.max(now - lastScrollTime, 16);
            const currentY = window.scrollY;
            const dy = Math.abs(currentY - lastScrollY);
            const velocity = Math.min(dy / dt, 6);
            setScrollVelocity(velocity);

            lastScrollTime = now;
            lastScrollY = currentY;

            // Notify parent theme change when transitioning near completion
            if (onThemeChange) {
              if (progress > 0.88) {
                onThemeChange('ivory');
              } else {
                onThemeChange('dark');
              }
            }
          },
        },
      });

      // 2. Seamless Expansion into Warm Ivory Canvas
      if (expansion) {
        gsap.fromTo(
          expansion,
          {
            backgroundColor: '#090909',
            color: '#F4F1EA',
          },
          {
            backgroundColor: '#F4F1EA',
            color: '#090909',
            scrollTrigger: {
              trigger: expansion,
              start: 'top 85%',
              end: 'top 30%',
              scrub: true,
              onEnter: () => onThemeChange && onThemeChange('ivory'),
              onLeaveBack: () => onThemeChange && onThemeChange('dark'),
            },
          }
        );
      }
    }, containerRef);

    // Settle motion blur quickly when scroll halts
    const settleInterval = setInterval(() => {
      setScrollVelocity((prev) => (prev > 0.1 ? prev * 0.7 : 0));
    }, 60);

    return () => {
      clearInterval(settleInterval);
      ctx.revert();
    };
  }, [onThemeChange]);

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-cinema-black text-warm-ivory">
      {/* Film Reel Pinned Sequence Container */}
      <section
        ref={containerRef}
        id="filmstrip-section"
        className="relative w-full max-w-full min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-8 sm:pb-12 bg-cinema-black"
        aria-label="The Journey of a Film"
      >
        {/* Subtle Ambient Film Projector Glow in Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] bg-pure-white/[0.02] blur-[120px] rounded-full" />
        </div>

        {/* Section Header: Analog 35mm Edge Metadata */}
        <div className="relative z-20 px-6 sm:px-12 max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between border-b border-hairline-dark/70 pb-4 mb-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-signature-red flex-shrink-0" />
              <span className="text-[11px] tracking-[0.22em] text-muted-grey uppercase font-medium">
                THE FILM REEL EXPERIENCE
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-pure-white font-light">
              Beyond the Final Frame
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center space-x-6 text-xs tracking-widest text-muted-grey">
            <span className="hidden md:inline">
              STAGE {String(activeFrameIndex + 1).padStart(2, '0')} / 05
            </span>
            <span className="text-signature-red font-medium">
              {FILMSTRIP_FRAMES[activeFrameIndex]?.title}
            </span>
          </div>
        </div>

        {/* The 35mm Physical Filmstrip Track */}
        <div className="relative w-full max-w-full my-auto py-6 sm:py-8 overflow-x-auto lg:overflow-visible no-scrollbar min-w-0">
          {/* Top Perforation / Sprocket Holes Track */}
          <div className="relative w-full max-w-full mb-3 flex items-center overflow-hidden">
            <div className="w-full sprocket-track-top opacity-60 border-y border-white/5" />
          </div>

          {/* Filmstrip Frames Ribbon */}
          <div
            ref={trackRef}
            className="flex items-stretch px-6 sm:px-12 lg:px-24 space-x-6 sm:space-x-10 lg:space-x-12 transition-transform duration-100 ease-out w-max max-w-none"
            style={{
              filter:
                scrollVelocity > 0.8
                  ? `blur(${Math.min(scrollVelocity * 0.4, 2.5)}px)`
                  : 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            {FILMSTRIP_FRAMES.map((frame, index) => {
              const isActive = index === activeFrameIndex;
              return (
                <div
                  key={frame.number}
                  className={`relative flex-shrink-0 w-[300px] sm:w-[420px] lg:w-[540px] xl:w-[620px] bg-soft-black/90 border transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between group ${
                    isActive
                      ? 'border-warm-ivory/40 shadow-2xl scale-[1.01] brightness-100'
                      : 'border-hairline-dark/70 opacity-65 scale-[0.98] brightness-80'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.03)'
                      : 'none',
                  }}
                >
                  {/* Frame Top Header Edge Code */}
                  <div className="px-5 py-3 border-b border-hairline-dark/50 flex items-center justify-between text-[10px] tracking-[0.2em] text-muted-grey bg-cinema-black/40">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-signature-red' : 'bg-muted-grey/40'
                        }`}
                      />
                      <span className="text-warm-ivory/80 font-medium">{frame.code}</span>
                    </div>
                    <span className="text-muted-grey/70">{frame.edgeCode}</span>
                  </div>

                  {/* Frame Visual Aspect Box (2.39:1 Cinema Composition with Real Photography) */}
                  <div className="relative aspect-[2.39/1] w-full bg-cinema-black flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
                    {/* Background Authentic Cinema Still */}
                    <img
                      src={frame.image}
                      alt={frame.title}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        isActive
                          ? 'scale-105 filter contrast-110 brightness-[0.75]'
                          : 'scale-100 filter contrast-100 brightness-[0.42] grayscale-[25%]'
                      }`}
                    />

                    {/* Dark Vignette & Film Overlays for Typographic Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/45 to-cinema-black/60 z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/70 via-transparent to-cinema-black/50 z-10 pointer-events-none" />
                    <div className="absolute inset-0 film-grain z-10 pointer-events-none" />

                    {/* Frame Crosshairs / Safe Zone Grid */}
                    <div className="absolute inset-3 sm:inset-4 border border-white/[0.08] pointer-events-none z-10" />

                    {/* Frame Numbering in Analog Style */}
                    <div className="relative z-20 flex items-center justify-between text-[11px] text-warm-ivory/70 tracking-widest">
                      <span>{frame.aspect} ANAMORPHIC</span>
                      <span className="text-signature-red font-medium">
                        [{frame.number}A]
                      </span>
                    </div>

                    {/* Large Editorial Title Inside Frame */}
                    <div className="relative z-20 my-auto">
                      <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-warm-ivory/60 mb-1 font-medium">
                        STAGE {frame.number}
                      </p>
                      <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-pure-white font-light tracking-wide">
                        {frame.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-warm-ivory/80 max-w-md font-sans font-light leading-relaxed">
                        {frame.subtitle}
                      </p>
                    </div>

                    {/* Frame Footer Marking */}
                    <div className="relative z-20 flex items-center justify-between text-[10px] text-warm-ivory/50 tracking-wider">
                      <span>EASTMAN KODAK 5219</span>
                      <span>SAFETY FILM</span>
                    </div>
                  </div>

                  {/* Frame Narrative Summary Note */}
                  <div className="px-5 py-4 bg-cinema-black/70 border-t border-hairline-dark/50">
                    <p className="text-xs text-warm-ivory/80 leading-relaxed font-sans">
                      {frame.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Perforation / Sprocket Holes Track */}
          <div className="relative w-full max-w-full mt-3 flex items-center overflow-hidden">
            <div className="w-full sprocket-track-bottom opacity-60 border-y border-white/5" />
          </div>
        </div>

        {/* Bottom Pacing Guide */}
        <div className="relative z-20 px-6 sm:px-12 max-w-[1440px] mx-auto w-full flex items-center justify-between text-xs tracking-[0.18em] text-muted-grey/60">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-[1px] bg-signature-red" />
            <span>DRIVE HORIZONTAL REEL VIA SCROLL</span>
          </div>
          <div className="flex items-center space-x-2">
            {FILMSTRIP_FRAMES.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeFrameIndex
                    ? 'w-6 bg-signature-red rounded-sm'
                    : 'bg-hairline-dark'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Frame Expansion Transition to Warm Ivory Editorial Canvas */}
      <section
        ref={expansionSectionRef}
        id="narrative-bridge"
        className="relative w-full py-28 sm:py-36 md:py-44 px-6 sm:px-12 md:px-16 transition-colors duration-700 overflow-hidden"
        style={{ backgroundColor: '#F4F1EA', color: '#090909' }}
        aria-label="Editorial Transition"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Subtle Red Architectural Accent Line */}
          <div className="w-12 h-[2px] bg-signature-red mb-10" />

          {/* Central Editorial Statement */}
          <div className="max-w-4xl">
            <h2 className="font-editorial text-[clamp(36px,5.5vw,76px)] leading-[1.08] tracking-[-0.015em] font-normal mb-8">
              What comes after the cut can be as important as the cut itself.
            </h2>

            {/* Narrative Supporting Text in Narrow Readable Column */}
            <div className="max-w-xl text-base sm:text-lg leading-relaxed text-cinema-black/80 space-y-4">
              <p>
                Festivals, markets, buyers and audiences: the route is shaped uniquely for
                every film.
              </p>
              <p>
                Our approach comes from more than 300 film journeys, and the people
                who have successfully navigated them.
              </p>
            </div>

            {/* Action Trigger */}
            <div className="mt-10 pt-8 border-t border-hairline-light">
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center space-x-3 text-xs sm:text-sm tracking-[0.16em] uppercase text-cinema-black hover:text-signature-red transition-colors focus:outline-none"
              >
                <span className="font-medium">Start a conversation</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 text-signature-red"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
