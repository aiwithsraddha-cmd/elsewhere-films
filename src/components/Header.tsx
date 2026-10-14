import React, { useState, useEffect } from 'react';
import { ActiveTheme } from '../types';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';

interface HeaderProps {
  currentTheme: ActiveTheme;
  currentPage: 'home' | 'services';
  onNavigate: (page: 'home' | 'services', hash?: string) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  currentPage,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = currentTheme === 'dark';

  const handleNavClick = (page: 'home' | 'services', hash?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    onOpenContact();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled
            ? isDark
              ? 'bg-cinema-black/85 backdrop-blur-md border-b border-hairline-dark/60'
              : 'bg-warm-ivory/85 backdrop-blur-md border-b border-hairline-light/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-20 sm:h-24 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-signature-red"
            aria-label="Elsewhere Films Home"
          >
            <div className="relative h-7 sm:h-8 w-auto">
              <img
                src={isDark ? logoDark : logoLight}
                alt="Elsewhere Films"
                className="h-full w-auto object-contain transition-opacity duration-300"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-11 text-xs tracking-[0.16em] uppercase"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`relative py-1 transition-colors duration-300 ${
                currentPage === 'home'
                  ? isDark
                    ? 'text-pure-white font-medium'
                    : 'text-cinema-black font-medium'
                  : isDark
                  ? 'text-warm-ivory/70 hover:text-pure-white'
                  : 'text-cinema-black/70 hover:text-cinema-black'
              }`}
            >
              <span>Home</span>
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-signature-red" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`relative py-1 transition-colors duration-300 ${
                currentPage === 'services'
                  ? isDark
                    ? 'text-pure-white font-medium'
                    : 'text-cinema-black font-medium'
                  : isDark
                  ? 'text-warm-ivory/70 hover:text-pure-white'
                  : 'text-cinema-black/70 hover:text-cinema-black'
              }`}
            >
              <span>Services</span>
              {currentPage === 'services' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-signature-red" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('home', 'vision')}
              className={`py-1 transition-colors duration-300 ${
                isDark
                  ? 'text-warm-ivory/70 hover:text-pure-white'
                  : 'text-cinema-black/70 hover:text-cinema-black'
              }`}
            >
              <span>About</span>
            </button>

            <button
              onClick={handleContactClick}
              className={`group flex items-center space-x-2 py-1 transition-colors duration-300 ${
                isDark
                  ? 'text-warm-ivory/90 hover:text-pure-white'
                  : 'text-cinema-black/90 hover:text-cinema-black'
              }`}
            >
              <span>Contact</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signature-red transition-transform duration-300 group-hover:scale-125" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-xs tracking-widest uppercase flex items-center space-x-2 focus:outline-none flex-shrink-0"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`text-[11px] tracking-[0.2em] font-medium transition-colors ${
                isDark ? 'text-warm-ivory' : 'text-cinema-black'
              }`}
            >
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div className="w-5 h-4 flex flex-col justify-between py-0.5">
              <span
                className={`h-[1px] w-full transition-transform duration-300 ${
                  isDark ? 'bg-warm-ivory' : 'bg-cinema-black'
                } ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
              />
              <span
                className={`h-[1px] w-full transition-opacity duration-300 ${
                  isDark ? 'bg-warm-ivory' : 'bg-cinema-black'
                } ${mobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-[1px] w-full transition-transform duration-300 ${
                  isDark ? 'bg-warm-ivory' : 'bg-cinema-black'
                } ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-cinema-black flex flex-col justify-between p-8 sm:p-12 transition-all duration-500 ease-editorial ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between">
          <div className="h-7 w-auto">
            <img src={logoDark} alt="Elsewhere Films" className="h-full w-auto object-contain" />
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-warm-ivory text-xs tracking-[0.2em] uppercase p-2"
          >
            CLOSE ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-editorial text-4xl sm:text-5xl text-warm-ivory hover:text-signature-red transition-colors flex items-center justify-between group"
          >
            <span>Home</span>
            <span className="text-xs tracking-widest text-muted-grey group-hover:text-signature-red font-medium">
              01
            </span>
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className="text-left font-editorial text-4xl sm:text-5xl text-warm-ivory hover:text-signature-red transition-colors flex items-center justify-between group"
          >
            <span>Services</span>
            <span className="text-xs tracking-widest text-muted-grey group-hover:text-signature-red font-medium">
              02
            </span>
          </button>

          <button
            onClick={() => handleNavClick('home', 'vision')}
            className="text-left font-editorial text-4xl sm:text-5xl text-warm-ivory hover:text-signature-red transition-colors flex items-center justify-between group"
          >
            <span>About</span>
            <span className="text-xs tracking-widest text-muted-grey group-hover:text-signature-red font-medium">
              03
            </span>
          </button>

          <button
            onClick={handleContactClick}
            className="text-left font-editorial text-4xl sm:text-5xl text-warm-ivory hover:text-signature-red transition-colors flex items-center justify-between group pt-4 border-t border-hairline-dark"
          >
            <span>Contact</span>
            <span className="text-signature-red text-xl">→</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-hairline-dark flex flex-col sm:flex-row justify-between text-xs text-muted-grey tracking-wider gap-3 font-normal">
          <span>BEYOND THE FINAL FRAME</span>
          <span>SOUTH ASIAN INDEPENDENT CINEMA</span>
        </div>
      </div>
    </>
  );
};
