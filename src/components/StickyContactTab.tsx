import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StickyContactTabProps {
  onOpenContact: () => void;
}

export const StickyContactTab: React.FC<StickyContactTabProps> = ({ onOpenContact }) => {
  return (
    <>
      {/* Desktop Sticky Vertical Edge Tab (Right Viewport Edge) */}
      <aside
        className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-40"
        aria-label="Direct Contact Action"
      >
        <button
          onClick={onOpenContact}
          className="group flex items-center bg-cinema-black/90 hover:bg-signature-red text-warm-ivory border-l border-y border-hairline-dark/80 hover:border-signature-red py-4 px-2.5 rounded-l-md shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-signature-red hover:translate-x-0 translate-x-1"
          title="Start a conversation with Elsewhere Films"
        >
          <div className="flex flex-col items-center space-y-3">
            {/* Signature Red Dot Indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-signature-red group-hover:bg-pure-white transition-colors" />

            {/* Vertical Typography: Start a conversation */}
            <span
              className="text-[11px] tracking-[0.22em] uppercase text-warm-ivory/90 group-hover:text-pure-white transition-colors whitespace-nowrap font-medium"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              Start a conversation
            </span>

            {/* Arrow */}
            <ArrowRight
              size={12}
              className="text-signature-red group-hover:text-pure-white transition-transform duration-300 group-hover:-translate-y-1"
            />
          </div>
        </button>
      </aside>

      {/* Mobile Sticky Floating Bottom Pill */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2.5rem)] max-w-xs pointer-events-auto">
        <button
          onClick={onOpenContact}
          className="w-full py-3 px-5 bg-cinema-black/95 text-warm-ivory border border-white/20 rounded-full shadow-2xl flex items-center justify-between backdrop-blur-md active:scale-95 transition-transform"
        >
          <div className="flex items-center space-x-2 text-[11px] tracking-wider uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
            <span>Start a conversation</span>
          </div>
          <div className="flex items-center space-x-1 text-signature-red text-xs">
            <ArrowRight size={13} />
          </div>
        </button>
      </div>
    </>
  );
};
