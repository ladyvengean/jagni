import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';

export default function Work() {
  const ref = useReveal();

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-stone py-16 md:py-24">
      <div ref={ref} className="reveal container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our Work</p>
            <h2 id="work-heading" className="h2 mt-5">
              Our Projects
            </h2>
          </div>

          <div className="lg:col-span-7">
            {projects.length === 0 ? (
              <>
                <p className="text-lg leading-relaxed text-charcoal/75">
                  Our project portfolio is being prepared. Photographs from Jagni Homes sites will
                  appear here once they are ready. In the meantime, tell us about your plot and
                  what you have in mind.
                </p>
                <a href="#contact" className="link-arrow mt-6">
                  Discuss Your Project <ArrowRight size={18} />
                </a>
              </>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {projects.map((p) => (
                  <figure key={p.title}>
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      width="1200"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="mt-3 text-sm text-charcoal/70">
                      {p.title}
                      {p.location ? `, ${p.location}` : ''}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}