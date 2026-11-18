import { useReveal } from '../hooks/useReveal.js';

const steps = [
  {
    number: '01',
    title: 'Discover',
    text: 'Understand the plot, location, requirements, priorities and budget.',
  },
  {
    number: '02',
    title: 'Plan',
    text: 'Discuss the scope, drawings, estimated costs, responsibilities and applicable documentation.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Execute the agreed work and coordinate construction, materials, finishes and relevant professionals.',
  },
  {
    number: '04',
    title: 'Complete',
    text: 'Carry out the agreed finishing checks, walkthrough and handover.',
  },
];

export default function Process() {
  const ref = useReveal();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-charcoal py-16 text-ivory md:py-24"
    >
      <div ref={ref} className="reveal container-x">
        <p className="eyebrow text-stone">Our Process</p>
        <h2 id="process-heading" className="h2 mt-5 max-w-2xl">
          A Clear Path From First Conversation to Handover.
        </h2>

        <ol className="mt-14 lg:grid lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.number}
              className="relative border-l border-ivory/25 pb-12 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-8"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-stone lg:-top-[6px] lg:left-0"
              />
              <p aria-hidden="true" className="font-serif text-5xl text-olive lg:text-6xl">
                {s.number}
              </p>
              <h3 className="mt-4 font-sans text-sm font-semibold uppercase tracking-[0.22em]">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-stone">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}