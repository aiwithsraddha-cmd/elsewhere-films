import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicHero } from '../components/CinematicHero';
import { FilmstripJourney } from '../components/FilmstripJourney';
import { VisionMission } from '../components/VisionMission';
import { WhyWeExist } from '../components/WhyWeExist';
import { ServicesAccordion } from '../components/ServicesAccordion';
import { SignatureClosing } from '../components/SignatureClosing';
import { ActiveTheme } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onOpenContact: () => void;
  onNavigateToServices: () => void;
  onOpenPathwayModal: (type: 'pathway' | 'people') => void;
  onThemeChange?: (theme: ActiveTheme) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenContact,
  onNavigateToServices,
  onOpenPathwayModal,
  onThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section') || window.location.hash.replace('#', '');
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }, 200);
    }

    // Scroll triggers to monitor current section background theme
    const ctx = gsap.context(() => {
      // Vision section is Warm Ivory
      const visionElem = document.getElementById('vision');
      if (visionElem) {
        ScrollTrigger.create({
          trigger: visionElem,
          start: 'top 30%',
          end: 'bottom 30%',
          onEnter: () => onThemeChange && onThemeChange('ivory'),
          onLeaveBack: () => onThemeChange && onThemeChange('dark'),
          onLeave: () => onThemeChange && onThemeChange('dark'),
          onEnterBack: () => onThemeChange && onThemeChange('ivory'),
        });
      }

      // Services accordion is Warm Ivory
      const servicesElem = document.getElementById('services-preview');
      if (servicesElem) {
        ScrollTrigger.create({
          trigger: servicesElem,
          start: 'top 30%',
          end: 'bottom 30%',
          onEnter: () => onThemeChange && onThemeChange('ivory'),
          onLeaveBack: () => onThemeChange && onThemeChange('dark'),
          onLeave: () => onThemeChange && onThemeChange('dark'),
          onEnterBack: () => onThemeChange && onThemeChange('ivory'),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onThemeChange]);

  const handleHeroScrollClick = () => {
    const reel = document.querySelector('[aria-label="The Journey of a Film"]');
    if (reel) {
      reel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-cinema-black text-warm-ivory">
      {/* Cinematic Video Intro */}
      <CinematicHero onScrollClick={handleHeroScrollClick} />

      {/* Film Reel Journey Experience */}
      <FilmstripJourney
        onOpenContact={onOpenContact}
        onThemeChange={onThemeChange}
      />

      {/* Vision and Mission */}
      <VisionMission />

      {/* Why We Exist */}
      <WhyWeExist onOpenPathwayModal={onOpenPathwayModal} />

      {/* What We Do Services */}
      <ServicesAccordion onNavigateToServices={onNavigateToServices} />

      {/* Signature Closing Moment */}
      <SignatureClosing onOpenContact={onOpenContact} />
    </div>
  );
};
