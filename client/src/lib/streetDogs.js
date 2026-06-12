// Shared "Street Dogs of Dhaka" content + resolver, used by both the public
// section and the dashboard editor so they never drift apart.
export const DEFAULT_STREET_DOGS = {
  eyebrow: 'Street Dogs of Dhaka',
  title: 'Dogs you’ll meet on our streets',
  intro:
    'Most dogs on Dhaka’s streets are indigenous Desi (Pariah) dogs and their mixes — hardy, intelligent companions shaped by generations of city life. Here are the ones you’ll meet most often.',
  types: [
    {
      id: 1,
      name: 'Desi Pariah Dog',
      body: 'Bangladesh’s native street dog. Lean and medium-sized with a short tan coat, pointed ears and a curled tail. Smart, alert and incredibly hardy — they have lived alongside people in Dhaka for centuries.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Black Street Dog',
      body: 'Solid black and black-and-tan mixes are a common sight in Dhaka’s alleys. Often gentle and people-friendly, they’re usually the first to greet our volunteers on feeding rounds.',
      image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Spotted Mongrel',
      body: 'White coats patched with brown or black — the result of generations of mixed street ancestry. Playful and resilient, they thrive in markets, parks and residential lanes.',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

// Merge stored data over defaults per-field so the section never renders
// blank, even if only part of it has been edited.
export function resolveStreetDogs(data) {
  const d = data || {};
  return {
    eyebrow: d.eyebrow || DEFAULT_STREET_DOGS.eyebrow,
    title: d.title || DEFAULT_STREET_DOGS.title,
    intro: d.intro ?? DEFAULT_STREET_DOGS.intro,
    types: Array.isArray(d.types) && d.types.length ? d.types : DEFAULT_STREET_DOGS.types
  };
}
