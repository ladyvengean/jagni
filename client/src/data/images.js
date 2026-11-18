// All imagery in one place. Replace `src` with your own photos later
// (put files in client/public/images/ and use '/images/your-file.webp').
//
// The Unsplash URLs below are TEMPORARY PLACEHOLDERS. They are stock photos,
// not Jagni Homes projects. Do not label them as completed work.
//
// IMPORTANT: Unsplash photo IDs can be removed by their authors. After pasting,
// open the site and check every image loads. If one is broken, search
// unsplash.com for the description in `alt`, open a photo, and copy a new ID.

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: {
    src: u('photo-1600585154340-be6161a56a0c', 1800),
    alt: 'Modern independent home with a clean contemporary facade',
  },
  construction: {
    src: u('photo-1503387762-592deb58ef4e'),
    alt: 'Residential construction site with structural work in progress',
  },
  structure: {
    src: u('photo-1541888946425-d81bb19240f5'),
    alt: 'Reinforced concrete structure being built on site',
  },
  interiors: {
    src: u('photo-1600210492486-724fe5c67fb0'),
    alt: 'Warm, modern living room interior with natural light',
  },
  drawings: {
    src: u('photo-1503387837-b154d5074bd2'),
    alt: 'Architectural drawings and plans laid out on a table',
  },
  coordination: {
    src: u('photo-1504307651254-35680f356dfd'),
    alt: 'Site team reviewing plans during a home construction project',
  },
  cta: {
    src: u('photo-1600607687939-ce8a6c25118c', 1800),
    alt: 'Contemporary home exterior at dusk',
  },
};