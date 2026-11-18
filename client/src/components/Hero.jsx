import { ArrowRight } from 'lucide-react';
import { images } from '../data/images.js';
import { site } from '../data/site.js';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <p className="eyebrow">Our Services</p>
          <h1 id="hero-heading" className="display mt-5">
            Every Stage of Building. One Trusted Partner.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-charcoal/75">
            From your first floor plan to the final finish, Jagni Homes brings construction,
            interiors and essential project coordination together under one roof.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-primary">
              Discuss Your Project <ArrowRight size={18} />
            </a>
            <a href="#services" className="btn btn-outline">
              Explore Our Services
            </a>
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-olive-dark">
            Serving {site.areas.join(' · ')}
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 hidden h-full w-full border border-stone lg:block"
            />
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width="1800"
              height="2250"
              fetchPriority="high"
              className="relative aspect-4/3 w-full object-cover sm:aspect-16/10 lg:aspect-4/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}