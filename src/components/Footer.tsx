import React from 'react';
import logoDark from '../assets/logo-dark.png';

interface FooterProps {
  onNavigate: (page: 'home' | 'services', hash?: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="w-full bg-cinema-black text-warm-ivory border-t border-hairline-dark/70 pt-16 sm:pt-20 pb-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-hairline-dark/50">
          {/* Logo & Brand statement (6 cols) */}
          <div className="md:col-span-6 space-y-6">
            <div className="h-8 w-auto">
              <img
                src={logoDark}
                alt="Elsewhere Films"
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="max-w-md text-xs sm:text-sm font-light text-warm-ivory/60 leading-relaxed font-sans">
              Helping South Asian independent cinema find its way into the world.
              Festival strategy, circulation pathways, distribution networks, and
              co-production.
            </p>
            <div className="flex items-center space-x-2 text-[11px] tracking-widest text-muted-grey uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
              <span>BEYOND THE FINAL FRAME</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs tracking-[0.16em] uppercase">
            <span className="text-muted-grey block mb-4 text-[10px] tracking-[0.2em] font-medium">
              NAVIGATION
            </span>
            <div>
              <button
                onClick={() => onNavigate('home')}
                className="text-warm-ivory/80 hover:text-signature-red transition-colors"
              >
                Home
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('services')}
                className="text-warm-ivory/80 hover:text-signature-red transition-colors"
              >
                Services
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('home', 'vision')}
                className="text-warm-ivory/80 hover:text-signature-red transition-colors"
              >
                About & Vision
              </button>
            </div>
            <div>
              <button
                onClick={onOpenContact}
                className="text-warm-ivory/80 hover:text-signature-red transition-colors"
              >
                Start a conversation
              </button>
            </div>
          </div>

          {/* Direct Contact & Inquiries (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs tracking-[0.16em]">
            <span className="text-muted-grey block mb-4 text-[10px] tracking-[0.2em] uppercase font-medium">
              INQUIRIES
            </span>
            <p className="text-warm-ivory/90 hover:text-signature-red transition-colors">
              <a href="mailto:hello@elsewherefilms.com">hello@elsewherefilms.com</a>
            </p>
            <p className="text-muted-grey text-[11px] uppercase">
              INTERNATIONAL FESTIVAL & SALES STRATEGY
            </p>
          </div>
        </div>

        {/* Bottom Legal & Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-grey/70 tracking-wider space-y-4 sm:space-y-0 font-normal">
          <div>
            © {new Date().getFullYear()} ELSEWHERE FILMS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span>SOUTH ASIAN INDEPENDENT CINEMA</span>
            <span className="text-signature-red">•</span>
            <span>RESTRICTED ACCESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
