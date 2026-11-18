import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ServiceSection from './components/ServiceSection.jsx';
import Work from './components/Work.jsx';
import WhyJagni from './components/WhyJagni.jsx';
import Process from './components/Process.jsx';
import ServiceAreas from './components/ServiceAreas.jsx';
import Faq from './components/Faq.jsx';
import FinalCta from './components/FinalCta.jsx';
import EnquiryForm from './components/EnquiryForm.jsx';
import Footer from './components/Footer.jsx';
import { services } from './data/services.js';

export default function App() {
  // Service CTAs set this so the enquiry form preselects the right service.
  const [preset, setPreset] = useState({ service: '', nonce: 0 });

  const handleEnquire = useCallback((service) => {
    setPreset((p) => ({ service, nonce: p.nonce + 1 }));
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-charcoal focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />

        <div id="services">
          {services.map((service, index) => (
            <ServiceSection
              key={service.id}
              service={service}
              index={index}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        <Work />
        <WhyJagni />
        <Process />
        <ServiceAreas />
        <Faq />
        <FinalCta />
        <EnquiryForm preset={preset} />
      </main>

      <Footer />
    </>
  );
}