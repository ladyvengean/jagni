import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';

const areas = ['Noida', 'Gurugram / Gurgaon', 'Faridabad'];

export default function ServiceAreas() {
  const ref = useReveal();

  return (
    <section id="areas" aria-labelledby="areas-heading" className="py-16 md:py-24">
      <div ref={ref} className="reveal container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow">Service Areas</p>
          <h2 id="areas-heading" className="h2 mt-5">
            Building Homes Across Delhi NCR
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/75">
            Planning a home in Noida, Gurugram or Faridabad? Tell us about your plot and what you
            want to build.
          </p>
          <a href="#contact" className="btn btn-primary mt-8">
            Discuss Your Location <ArrowRight size={18} />
          </a>
        </div>

        <ul className="border-t border-stone lg:col-span-6">
          {areas.map((a) => (
            <li
              key={a}
              className="border-b border-stone py-6 font-serif text-4xl tracking-tight md:py-8 md:text-5xl"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}