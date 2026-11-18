// Single source of truth for business details.
// Leave a value as '' until the owner confirms it; empty values are hidden on the site.
export const site = {
  name: 'Jagni Homes',
  tagline: 'Home construction & interiors',
  areas: ['Noida', 'Gurugram', 'Faridabad'],

  phone: '+91 85953 27505',
  whatsapp: '', // fill in '918595327505' only if this number is on WhatsApp
  email: 'jagni9898@gmail.com',
  instagram: '', // e.g. 'https://www.instagram.com/yourhandle'
  siteUrl: '', // e.g. 'https://www.yourdomain.com' (used later for SEO)
};

export const phoneHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : '';
export const emailHref = site.email ? `mailto:${site.email}` : '';
export const whatsappHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
  : '';

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];