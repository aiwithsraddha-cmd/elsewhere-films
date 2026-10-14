import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import { Plus, Minus, ArrowRight, Check } from 'lucide-react';

interface ServicesAccordionProps {
  onNavigateToServices: () => void;
}

export const ServicesAccordion: React.FC<ServicesAccordionProps> = ({
  onNavigateToServices,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default for immediate context

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="services-preview"
      className="relative w-full bg-warm-ivory text-cinema-black py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-16 border-t border-hairline-light"
      aria-label="What We Do"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-signature-red" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-grey font-medium">
            What We Do
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2 className="font-editorial text-[clamp(36px,5.2vw,72px)] leading-[1.08] tracking-[-0.03em] font-light mb-4">
            Our work begins when your film is finished.
          </h2>
          <p className="text-base sm:text-xl text-cinema-black/75 font-light font-sans">
            And follows it through festivals, markets and distribution.
          </p>
        </div>

        {/* Five Clean Service Accordion Rows */}
        <div className="border-t border-hairline-light">
          {SERVICES_DATA.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={service.id}
                className="border-b border-hairline-light transition-colors duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-8 sm:py-10 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-signature-red transition-all"
                  aria-expanded={isOpen}
                  aria-controls={`service-desc-${service.id}`}
                >
                  <div className="flex items-baseline space-x-6 sm:space-x-12">
                    {/* Index Number */}
                    <span
                      className={`text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
                        isOpen
                          ? 'text-signature-red font-semibold'
                          : 'text-muted-grey group-hover:text-signature-red font-medium'
                      }`}
                    >
                      {service.number}
                    </span>

                    {/* Title with Subtle Hover Translation */}
                    <h3
                      className={`font-editorial text-2xl sm:text-3xl md:text-4xl font-light transition-all duration-300 transform ${
                        isOpen
                          ? 'text-cinema-black translate-x-2'
                          : 'text-cinema-black/90 group-hover:translate-x-2 group-hover:text-cinema-black'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Minimal Interaction Icon */}
                  <div className="flex-shrink-0 ml-4 p-2 text-cinema-black/70 group-hover:text-signature-red transition-colors">
                    {isOpen ? (
                      <Minus size={20} className="stroke-[1.5]" />
                    ) : (
                      <Plus
                        size={20}
                        className="stroke-[1.5] transition-transform duration-300 group-hover:rotate-90"
                      />
                    )}
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                <div
                  id={`service-desc-${service.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-editorial ${
                    isOpen ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <div className="pl-12 sm:pl-20 md:pl-24 max-w-3xl">
                    <p className="text-base sm:text-lg leading-relaxed text-cinema-black/85 font-sans font-light mb-6">
                      {service.fullDesc}
                    </p>

                    {/* Structured Deliverables */}
                    {service.deliverables && (
                      <div className="pt-4 border-t border-hairline-light/60">
                        <p className="text-[11px] tracking-[0.18em] uppercase text-muted-grey mb-3 font-medium">
                          KEY DELIVERABLES
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-cinema-black/75 font-sans">
                          {service.deliverables.map((item, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <Check size={12} className="text-signature-red flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Link to full Services page */}
        <div className="mt-14 sm:mt-18 pt-6 flex justify-between items-center">
          <button
            onClick={onNavigateToServices}
            className="group inline-flex items-center space-x-3 text-xs sm:text-sm tracking-[0.18em] uppercase text-cinema-black hover:text-signature-red transition-colors focus:outline-none"
          >
            <span className="font-medium">See how we work</span>
            <ArrowRight
              size={15}
              className="text-signature-red transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>

          <span className="hidden sm:inline text-[11px] text-muted-grey tracking-widest uppercase">
            FESTIVALS • MARKETS • DISTRIBUTION
          </span>
        </div>
      </div>
    </section>
  );
};
