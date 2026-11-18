import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqs } from '../data/faqs.js';
import { useReveal } from '../hooks/useReveal.js';

export default function Faq() {
  const ref = useReveal();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-stone bg-stone-light/50 py-16 md:py-24"
    >
      <div ref={ref} className="reveal container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="h2 mt-5">
            Questions Homeowners Ask
          </h2>
        </div>

        <div className="border-t border-stone lg:col-span-8">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;

            return (
              <div key={item.q} className="border-b border-stone">
                <h3 className="font-sans text-base">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl leading-snug md:text-2xl"
                  >
                    <span>{item.q}</span>
                    {open ? (
                      <Minus size={20} className="shrink-0" aria-hidden="true" />
                    ) : (
                      <Plus size={20} className="shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 leading-relaxed text-charcoal/75">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}