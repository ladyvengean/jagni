import { ArrowUpRight } from 'lucide-react';
import Wordmark from './Wordmark.jsx';
import { services } from '../data/services.js';
import { site, navLinks, phoneHref, emailHref, whatsappHref } from '../data/site.js';

const linkCls = 'text-stone transition-colors hover:text-ivory';
const headCls = 'font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ivory';

export default function Footer() {
  const hasContact = phoneHref || emailHref || whatsappHref || site.instagram;

  return (
    <footer className="bg-charcoal text-stone">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark className="text-ivory" />
            <p className="mt-5 max-w-xs leading-relaxed">
              Home construction, interiors and project coordination for independent homes across
              Delhi NCR.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className={headCls}>Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <h2 className={headCls}>Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={linkCls}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={headCls}>Service areas</h2>
            <ul className="mt-5 space-y-3">
              {site.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <h2 className={`${headCls} mt-8`}>Contact</h2>
            <ul className="mt-5 space-y-3">
              {phoneHref && (
                <li>
                  <a href={phoneHref} className={linkCls}>
                    {site.phone}
                  </a>
                </li>
              )}
              {emailHref && (
                <li>
                  <a href={emailHref} className={linkCls}>
                    {site.email}
                  </a>
                </li>
              )}
              {whatsappHref && (
                <li>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    WhatsApp
                  </a>
                </li>
              )}
              {site.instagram && (
                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkCls} inline-flex items-center gap-1`}
                  >
                    Instagram <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              )}
              {!hasContact && (
                <li>
                  <a href="#contact" className={linkCls}>
                    Use our enquiry form
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/15 pt-6 text-sm sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href="#top" className={linkCls}>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}