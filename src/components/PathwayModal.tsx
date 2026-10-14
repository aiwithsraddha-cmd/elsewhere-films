import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface PathwayModalProps {
  type: 'pathway' | 'people' | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const PathwayModal: React.FC<PathwayModalProps> = ({
  type,
  onClose,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-cinema-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-warm-ivory text-cinema-black p-8 sm:p-12 md:p-14 border border-hairline-light rounded-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-hairline-light">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-signature-red" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-grey font-medium">
              {type === 'pathway' ? 'THE PATHWAY MODEL' : 'THE PEOPLE AROUND THE WORK'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-cinema-black/70 hover:text-signature-red transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content based on type */}
        <div className="py-8">
          {type === 'pathway' ? (
            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-cinema-black font-normal mb-6">
                The Pathway Model
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-cinema-black/80 font-light leading-relaxed">
                <p>
                  The Pathway Model is Elsewhere Films’ proprietary intelligence
                  framework. It synthesizes international festival premiere rules, submission
                  windows, market cycles, and buyer preferences across A-list and specialized
                  cinema circuits worldwide.
                </p>
                <p>
                  Rather than treating festival submissions as speculative attempts, the
                  model structures a sequenced strategy tailored to each film’s cultural
                  specifics, length, premiere eligibility, and commercial trajectory.
                </p>
                <div className="p-4 bg-cinema-black/5 border-l-2 border-signature-red text-xs text-cinema-black/80 my-4 italic">
                  “Drawing on hundreds of film journeys and the experience of people who have
                  spent their careers opening the doors that matter.”
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-cinema-black font-normal mb-6">
                The People Around the Work
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-cinema-black/80 font-light leading-relaxed">
                <p>
                  Elsewhere Films brings together seasoned festival programmers, sales agents,
                  subtitling specialists, international publicists, and co-production partners
                  who care deeply about South Asian independent cinema.
                </p>
                <p>
                  We operate as strategic advocates and navigators, ensuring films are
                  championed inside the rooms where decisions are made, including Cannes, Venice,
                  and Berlin to Toronto, Busan, Sundance, and regional cultural hubs.
                </p>
                <p className="text-xs text-muted-grey pt-2 font-medium">
                  Full advisory collective and partner dossiers are shared directly in
                  filmmaker strategy consultations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="pt-6 border-t border-hairline-light flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-muted-grey hover:text-cinema-black uppercase tracking-widest font-medium"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center space-x-2 text-xs text-signature-red hover:text-cinema-black uppercase tracking-widest font-medium"
          >
            <span>Start a conversation</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
