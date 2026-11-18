import { ArrowRight, Check } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';

export default function ServiceSection({ service, index, onEnquire }) {
  const ref = useReveal();
  const imageFirst = index % 2 === 0;
  const { id, number, name, value, headline, intro, note, items, cta, image } = service;
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-stone py-16 md:py-24 ${index % 2 === 1 ? 'bg-stone-light/50' : ''}`}
    >
      <div className="container-x">
        <div ref={ref} className="reveal grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-7 lg:sticky lg:top-28 ${imageFirst ? '' : 'lg:order-2'}`}>
            <img
              src={image.src}
              alt={image.alt}
              width="1600"
              height="1200"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className={`lg:col-span-5 ${imageFirst ? '' : 'lg:order-1'}`}>
            <span
              aria-hidden="true"
              className="block font-serif text-7xl leading-none text-stone md:text-8xl"
            >
              {number}
            </span>
            <p className="eyebrow mt-6">
              {number} — {name}
            </p>
            <h2 id={headingId} className="h2 mt-4">
              {headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{intro}</p>

            <ul className="mt-8 grid border-t border-stone sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-stone py-3 text-[0.95rem] leading-snug"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-olive-dark" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l-2 border-olive pl-4 text-sm leading-relaxed text-charcoal/70">
              {note}
            </p>

            <a
              href="#contact"
              onClick={() => onEnquire(value)}
              className="btn btn-primary mt-8"
            >
              {cta} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}