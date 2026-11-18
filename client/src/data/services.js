import { images } from './images.js';

// `value` must match the server's SERVICES list exactly (used by the enquiry form).
export const services = [
  {
    id: 'complete-construction',
    number: '01',
    value: 'Complete Home Construction',
    name: 'Complete Home Construction',
    headline: 'From an Empty Plot to a Finished Home.',
    intro:
      'If you own a plot and want a home built on it, we can coordinate the process from planning and construction through to completion, according to the scope of work we agree with you.',
    note:
      'Some parts of the work are carried out by our own team, while others may be coordinated through specialist professionals or contractors. What is included in your project is set out in your agreed scope of work.',
    items: [
      'Initial project consultation',
      'Plot and site assessment',
      'Construction planning and scope definition',
      'Cost estimation and BOQ coordination, where offered',
      'Foundation and civil work',
      'Structural construction',
      'Masonry and plastering',
      'Plumbing and electrical coordination',
      'Finishing and installation work',
      'Project coordination',
      'Final inspection and handover',
    ],
    cta: 'Discuss Your Construction Project',
    image: images.construction,
  },
  {
    id: 'structure-civil',
    number: '02',
    value: 'Main Structure & Civil Work',
    name: 'Main Structure & Civil Work',
    headline: 'Built on a Strong Foundation.',
    intro:
      'The structure is what everything else depends on. Good structural work starts with sound planning, careful execution on site and coordination with qualified professionals.',
    note:
      'The actual scope depends on your project drawings, engineering specifications and the contract we agree on. Structural design and approvals are handled by the appropriate qualified professionals.',
    items: [
      'Site preparation',
      'Excavation and foundation work',
      'RCC work, where applicable',
      'Columns, beams and slabs',
      'Masonry and partition walls',
      'Staircases',
      'Plastering and relevant civil work',
      'Structural drawings and engineering coordination',
    ],
    cta: 'Plan Your Structure',
    image: images.structure,
  },
  {
    id: 'interiors',
    number: '03',
    value: 'Interior Design & Execution',
    name: 'Interior Design & Execution',
    headline: 'The Details That Make It Home.',
    intro:
      'Interiors are a natural continuation of construction. We look at how you live, how each room should work, and which materials, lighting and finishes suit your family and budget.',
    note:
      'Furniture and furnishing coordination is available where offered, depending on the project.',
    items: [
      'Interior planning and space utilisation',
      'Living room and bedroom interiors',
      'Modular kitchen coordination',
      'Wardrobes and storage',
      'False ceilings',
      'Lighting plans and fixture coordination',
      'Flooring and wall finishes',
      'Bathroom finishes and fittings',
      'Joinery and carpentry',
      'Paint, hardware and finishing details',
      'Furniture and furnishing coordination, where offered',
    ],
    cta: 'Explore Interior Solutions',
    image: images.interiors,
  },
  {
    id: 'drawings-approvals',
    number: '04',
    value: 'Drawings, Approvals & Paperwork',
    name: 'Drawings, Approvals & Paperwork',
    headline: 'Clarity Before Construction Begins.',
    intro:
      'Building a home needs the right plans, documents and permissions, and the requirements differ by plot, location and local rules. We help you understand what is needed and coordinate with the relevant consultants.',
    note:
      'Requirements and responsibilities depend on your property, the jurisdiction, your contract and the authorised professionals involved. We do not guarantee approvals and we do not provide legal representation.',
    items: [
      'Documentation checklist',
      'Architectural drawing coordination',
      'Structural drawing coordination',
      'Building plan submission assistance, where offered',
      'Coordination with relevant consultants',
      'Permission and approval process guidance',
      'Documentation and project record organisation',
    ],
    cta: 'Discuss Your Documentation Needs',
    image: images.drawings,
  },
  {
    id: 'coordination',
    number: '05',
    value: 'End-to-End Project Coordination',
    name: 'End-to-End Project Coordination',
    headline: 'One Clear Process. From Start to Handover.',
    intro:
      'A home project involves many people and many decisions. Keeping the stages connected gives you one point of contact and a clearer picture of where your project stands.',
    note:
      'Costs, timelines and the way progress is shared are agreed for each project before work begins.',
    items: [
      'Initial requirements discussion',
      'Scope and budget coordination',
      'Design and drawing coordination',
      'Contractor and vendor coordination',
      'Work-stage scheduling',
      'Material and finish selection coordination',
      'Progress communication',
      'Site reviews according to the agreed arrangement',
      'Quality checks within the contracted scope',
      'Final walkthrough and handover coordination',
    ],
    cta: 'Start Planning Your Home',
    image: images.coordination,
  },
];