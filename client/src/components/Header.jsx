import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Wordmark from './Wordmark.jsx';
import { navLinks } from '../data/site.js';

// Sections the header watches to highlight the current nav item.
const TRACKED = ['services', 'work', 'about', 'process', 'areas', 'faq', 'contact'];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  // Highlight the nav link for the section currently on screen.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = '#top';
      for (const id of TRACKED) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = `#${id}`;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: close on Escape or when the screen becomes desktop-sized, and lock page scroll.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-ivory">
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <a href="#top" onClick={close} aria-label="Jagni Homes, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`border-b py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-charcoal/70 hover:border-stone hover:text-charcoal'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden lg:inline-flex">
            Get a Consultation
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ivory lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active === link.href ? 'location' : undefined}
                className={`border-b border-stone py-5 font-serif text-3xl ${
                  active === link.href ? 'text-olive-dark' : 'text-charcoal'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={close} className="btn btn-primary mt-8">
              Get a Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}