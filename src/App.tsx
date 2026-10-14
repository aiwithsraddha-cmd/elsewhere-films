import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { StickyContactTab } from './components/StickyContactTab';
import { ContactOverlay } from './components/ContactOverlay';
import { PathwayModal } from './components/PathwayModal';
import { ActiveTheme } from './types';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'services'>('home');
  const [currentTheme, setCurrentTheme] = useState<ActiveTheme>('dark');
  const [contactOpen, setContactOpen] = useState(false);
  const [pathwayModalType, setPathwayModalType] = useState<'pathway' | 'people' | null>(
    null
  );

  // Synchronize with URL path, hash and query params on mount
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);

      if (path === '/services' || hash === '#services' || params.get('page') === 'services') {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }

      if (params.get('contact') === 'open') {
        setContactOpen(true);
      }

      const section = params.get('section');
      if (section) {
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) {
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(el, { immediate: true });
            } else {
              el.scrollIntoView({ behavior: 'auto' });
            }
          }
        }, 150);
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as any).lenis = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Page navigation handler
  const handleNavigate = (page: 'home' | 'services', hash?: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'services' ? '/services' : '/');

    if (page === 'home' && hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-cinema-black text-warm-ivory selection:bg-signature-red selection:text-pure-white">
      {/* Global Header */}
      <Header
        currentTheme={currentTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Page View */}
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        {currentPage === 'home' ? (
          <HomePage
            onOpenContact={() => setContactOpen(true)}
            onNavigateToServices={() => handleNavigate('services')}
            onOpenPathwayModal={(type) => setPathwayModalType(type)}
            onThemeChange={(theme) => setCurrentTheme(theme)}
          />
        ) : (
          <ServicesPage
            onOpenContact={() => setContactOpen(true)}
            onThemeChange={(theme) => setCurrentTheme(theme)}
          />
        )}
      </main>

      {/* Global Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Sitewide Sticky Contact Tab */}
      <StickyContactTab onOpenContact={() => setContactOpen(true)} />

      {/* Contact Modal Overlay */}
      <ContactOverlay
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Pathway & People Narrative Modal */}
      <PathwayModal
        type={pathwayModalType}
        onClose={() => setPathwayModalType(null)}
        onOpenContact={() => {
          setPathwayModalType(null);
          setContactOpen(true);
        }}
      />
    </div>
  );
};
