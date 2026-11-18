import { MessageCircle, Phone } from 'lucide-react';
import { images } from '../data/images.js';
import { site, phoneHref, whatsappHref } from '../data/site.js';

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-charcoal text-ivory"
    >
      {/* Decorative background photo (alt is empty on purpose). */}
      <img
        src={images.cta.src}
        alt=""
        width="1800"
        height="1200"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/55" />

      <div className="container-x py-20 md:py-32">
        <p className="eyebrow text-stone">Get in Touch</p>
        <h2 id="final-cta-heading" className="display mt-5 max-w-3xl">
          Let&rsquo;s Build a Home That Feels Like Yours.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
          Tell us where you&rsquo;re building, what you have in mind, and how far along you are.
          We&rsquo;ll use that information to understand your requirements.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn btn-light">
            Send an Enquiry
          </a>
          {phoneHref && (
            <a
              href={phoneHref}
              className="btn border-ivory text-ivory hover:bg-ivory hover:text-charcoal"
            >
              <Phone size={18} aria-hidden="true" /> Call {site.phone}
            </a>
          )}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-ivory text-ivory hover:bg-ivory hover:text-charcoal"
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}