import { useReveal } from '../hooks/useReveal.js';

const points = [
  {
    title: 'Several stages, one connected process',
    text: 'Construction, interiors and project coordination are planned to work together, so decisions made early carry through to the finish.',
  },
  {
    title: 'A clear scope and clear communication',
    text: 'We aim to agree what is included, and who is responsible for what, before work begins.',
  },
  {
    title: 'Construction and interiors, connected',
    text: 'Interiors are considered as part of the home from the start, not as an afterthought once the structure is done.',
  },
  {
    title: 'Attention to finishing details',
    text: 'Finishes, fittings and small details shape how a home feels every day, so we treat them as part of the work.',
  },
  {
    title: 'Local to Delhi NCR',
    text: 'We work across Noida, Gurugram and Faridabad.',
  },
];

export default function WhyJagni() {
  const ref = useReveal();

  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-stone py-16 md:py-24">
      <div ref={ref} className="reveal container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why Jagni Homes</p>
          <h2 id="about-heading" className="h2 mt-5">
            A Connected Way to Build.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
            This is how we intend to work with every homeowner who brings us a project.
          </p>
        </div>

        <ol className="border-t border-stone lg:col-span-7">
          {points.map((p, i) => (
            <li key={p.title} className="grid gap-3 border-b border-stone py-7 sm:grid-cols-[4rem_1fr]">
              <span aria-hidden="true" className="font-serif text-2xl text-olive">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="h3">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/75">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}