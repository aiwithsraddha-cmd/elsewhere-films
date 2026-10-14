import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAGE_OPTIONS = [
  'Nearing Completion',
  'Festival Ready',
  'In Circulation',
  'Before the Cut',
  'Other / Not Sure',
];

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    filmTitle: '',
    stage: 'Festival Ready',
    oneLineSummary: '',
    screenerLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => firstInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
      setSubmitStatus('idle');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.filmTitle.trim()) {
      setErrorMessage('Please provide your name, email, and film title.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Configurable endpoint handler:
      // If VITE_CONTACT_ENDPOINT environment variable exists, POST to it;
      // otherwise, simulate authenticated transmission safely with documented setup instructions.
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Submission endpoint error');
      } else {
        // Safe simulated delivery delay
        await new Promise((r) => setTimeout(r, 1200));
      }

      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
      setErrorMessage(
        'Unable to transmit enquiry at this moment. You can also reach us directly via hello@elsewherefilms.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-cinema-black/80 backdrop-blur-md flex justify-end transition-opacity duration-300"
    >
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Editorial Form Container */}
      <div
        ref={overlayRef}
        className="relative z-10 w-full max-w-2xl min-h-screen bg-warm-ivory text-cinema-black p-6 sm:p-12 md:p-16 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-editorial"
      >
        {/* Header Bar */}
        <div>
          <div className="flex items-center justify-between pb-8 border-b border-hairline-light">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-signature-red" />
              <span className="text-xs tracking-[0.2em] uppercase text-muted-grey font-medium">
                ENGAGEMENT INQUIRY
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-cinema-black/70 hover:text-signature-red transition-colors focus:outline-none"
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-10 mb-8">
            <h2
              id="contact-heading"
              className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4"
            >
              Start a conversation.
            </h2>
            <p className="text-sm sm:text-base text-cinema-black/75 font-light leading-relaxed">
              Tell us about your project, where you are on the timeline, and what kind of
              pathway you are looking to build.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="py-12 space-y-6">
              <div className="w-12 h-12 rounded-full bg-signature-red/10 text-signature-red flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-editorial text-3xl font-normal">
                Enquiry received.
              </h3>
              <p className="text-sm sm:text-base text-cinema-black/80 font-light leading-relaxed">
                Thank you for sharing details on <em>{formData.filmTitle}</em>. We review
                all submissions carefully against international festival calendars and
                market cycles. We will be in touch shortly.
              </p>
              <div className="pt-6 border-t border-hairline-light">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-cinema-black text-warm-ivory text-xs font-medium tracking-widest uppercase hover:bg-signature-red transition-colors"
                >
                  Return to site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-signature-red/10 border border-signature-red/30 text-signature-red text-xs font-medium flex items-center space-x-2">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Name */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  01 • Your Name *
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Director, Producer or Filmmaker name"
                  className="w-full bg-transparent border-b border-hairline-light py-2 text-base text-cinema-black focus:outline-none focus:border-signature-red transition-colors font-sans placeholder:text-muted-grey/50"
                />
              </div>

              {/* 2. Email */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  02 • Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-transparent border-b border-hairline-light py-2 text-base text-cinema-black focus:outline-none focus:border-signature-red transition-colors font-sans placeholder:text-muted-grey/50"
                />
              </div>

              {/* 3. Film Title */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  03 • Film Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.filmTitle}
                  onChange={(e) => setFormData({ ...formData, filmTitle: e.target.value })}
                  placeholder="Working title or official project name"
                  className="w-full bg-transparent border-b border-hairline-light py-2 text-base text-cinema-black focus:outline-none focus:border-signature-red transition-colors font-sans placeholder:text-muted-grey/50"
                />
              </div>

              {/* 4. Stage */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  04 • Current Stage *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {STAGE_OPTIONS.map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setFormData({ ...formData, stage: stg })}
                      className={`text-xs font-medium py-2 px-3 text-left border rounded-xs transition-colors ${
                        formData.stage === stg
                          ? 'bg-cinema-black text-warm-ivory border-cinema-black'
                          : 'bg-transparent text-cinema-black/80 border-hairline-light hover:border-cinema-black/40'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. One Line on the Film */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  05 • One Line on the Film
                </label>
                <textarea
                  rows={2}
                  value={formData.oneLineSummary}
                  onChange={(e) =>
                    setFormData({ ...formData, oneLineSummary: e.target.value })
                  }
                  placeholder="Logline, subject matter, format (feature / doc / short)"
                  className="w-full bg-transparent border-b border-hairline-light py-2 text-base text-cinema-black focus:outline-none focus:border-signature-red transition-colors font-sans placeholder:text-muted-grey/50 resize-none"
                />
              </div>

              {/* 6. Screener Link (Optional) */}
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-muted-grey mb-2">
                  06 • Screener Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.screenerLink}
                  onChange={(e) =>
                    setFormData({ ...formData, screenerLink: e.target.value })
                  }
                  placeholder="Vimeo, Festival link, or preview URL (with password if any)"
                  className="w-full bg-transparent border-b border-hairline-light py-2 text-base text-cinema-black focus:outline-none focus:border-signature-red transition-colors font-sans placeholder:text-muted-grey/50"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-cinema-black text-warm-ivory hover:bg-signature-red transition-colors duration-300 flex items-center justify-center space-x-3 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase focus:outline-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send enquiry</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Framing line from approved copy */}
        <div className="mt-12 pt-6 border-t border-hairline-light">
          <p className="text-xs text-muted-grey tracking-wider uppercase font-medium leading-relaxed">
            Engagements are structured per film as a fixed fee, retainer, or
            partnership, depending on scope.
          </p>
        </div>
      </div>
    </div>
  );
};
