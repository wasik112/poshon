// Shared site data for Vercel serverless functions.
// Mirror of server/siteData.js for local Express. When you change content,
// update both files (or migrate to a database in Phase 2).

export const site = {
  brand: {
    name: 'POSHON',
    tagline: 'Street Dog Care · Dhaka',
    logoMark: '🐾'
  },
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Pets', href: '#pets' },
    { label: 'Locations', href: '#locations' },
    { label: 'Contact', href: '#contact' }
  ],
  topContact: {
    label: 'Call us today',
    phone: '+880 1234 567890'
  },
  hero: {
    eyebrow: 'Ready to',
    titleA: 'Help!',
    titleB: 'Street dogs across Dhaka',
    subtitle: 'POSHON tracks, rescues, and rehomes stray dogs in Bangladesh. Find a booth, sponsor care, or bring a friend home.',
    primaryCta: { label: 'View Booth Locations', action: 'openMap' },
    secondaryCta: { label: 'Browse Pets', href: '#pets' },
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=80'
  },
  servicesStrip: [
    { title: 'Rescue & Shelter', body: 'Street rescue teams on call across Dhaka 24/7.', icon: 'fa-house-medical' },
    { title: 'Veterinary 24/7', body: 'Vaccination, sterilisation, and emergency care.', icon: 'fa-stethoscope' },
    { title: 'Adoption Support', body: 'Helping rescued pups find loving forever homes.', icon: 'fa-heart' }
  ],
  about: {
    eyebrow: 'About us',
    title: 'The Best Care for Every Street Dog',
    body: 'POSHON is a volunteer-led NGO working in Dhaka and beyond. We feed, treat, sterilise, and rehome thousands of street dogs every year — powered by community booths, local vets, and people who care.',
    bullets: [
      'Over 5,000 dogs treated since 2021',
      'Active booths in Mirpur, Gulshan, Dhanmondi',
      'Free vaccination & sterilisation drives'
    ],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80'
  },
  cta: {
    title: 'Want a pet for your loved ones?',
    body: 'Adopt a rescued dog and change two lives at once — yours and theirs.',
    button: { label: 'Apply Today', href: '#contact' }
  },
  process: {
    eyebrow: 'How We Work',
    title: 'Pet Adoption Process',
    steps: [
      { number: '1', title: 'Find your pet', body: 'Browse rescued dogs at our booths or online listings.' },
      { number: '2', title: 'Know your pet', body: 'Meet them, learn their story, and check medical history.' },
      { number: '3', title: 'Take your pet home', body: 'Complete a simple adoption form and welcome them home.' }
    ]
  },
  stats: [
    { value: '5,200+', label: 'Happy Dogs', icon: 'fa-dog' },
    { value: '24/7', label: 'Emergency Services', icon: 'fa-truck-medical' },
    { value: '120+', label: 'Caretakers', icon: 'fa-user-nurse' },
    { value: '3,400', label: 'Dog Rescues', icon: 'fa-paw' }
  ],
  services: {
    eyebrow: 'Our Services',
    title: 'Taking Care of Pets',
    items: [
      { title: 'Street Feeding', body: 'Daily feeding rounds across booth neighbourhoods.', icon: 'fa-bone' },
      { title: 'Medical Camps', body: 'Free vaccination, sterilisation, and treatment camps.', icon: 'fa-syringe' },
      { title: 'Adoption Drives', body: 'Weekend events to match dogs with new families.', icon: 'fa-handshake-angle' },
      { title: 'Volunteer Training', body: 'Onboarding new volunteers for rescue & care.', icon: 'fa-people-group' }
    ]
  },
  pets: {
    eyebrow: 'Available Pets',
    title: 'Featured Dogs for Adoption',
    items: [
      { name: 'Charlie', age: '3 yrs', description: 'Gentle companion who loves long walks.', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Denise', age: '8 mo', description: 'Playful pup who adores children.', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' },
      { name: 'Rebecca', age: '2 yrs', description: 'Calm and great with other animals.', image: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=600&q=80' },
      { name: 'Jamie', age: '1 yr', description: 'Affectionate and full of energy.', image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bugs', age: '4 yrs', description: 'Loyal and protective, loves the family.', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80' },
      { name: 'Suzie', age: '5 mo', description: 'Curious little explorer.', image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  contact: {
    address: '516 Mirpur Road, Dhaka 1207, Bangladesh',
    phone: '+880 1234 567890',
    email: 'info@poshon.org',
    hours: 'Mon - Sat: 9am - 7pm  ·  Sun: Closed'
  },
  footer: {
    blurb: 'POSHON is a community-driven NGO caring for street dogs across Dhaka and beyond.',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Pets', href: '#pets' },
      { label: 'Locations', href: '#locations' },
      { label: 'Contact', href: '#contact' }
    ],
    social: [
      { label: 'Facebook', icon: 'fa-facebook', href: 'https://facebook.com' },
      { label: 'Twitter', icon: 'fa-twitter', href: 'https://twitter.com' },
      { label: 'Instagram', icon: 'fa-instagram', href: 'https://instagram.com' },
      { label: 'Email', icon: 'fa-envelope', href: 'mailto:info@poshon.org' }
    ],
    copyright: '© POSHON NGO — All rights reserved.'
  }
};

export const locations = [
  {
    id: 1,
    name: 'Mirpur Booth',
    description: 'Street dog assistance and tracking point near Mirpur 10.',
    lat: 23.8090,
    lng: 90.3650,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Gulshan Booth',
    description: 'Volunteer rescue and information booth in Gulshan-2.',
    lat: 23.7928,
    lng: 90.4074,
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Dhanmondi Booth',
    description: 'Adoption support and medical check-up booth at Dhanmondi Lake.',
    lat: 23.7525,
    lng: 90.3662,
    image: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Uttara Booth',
    description: 'Northern Dhaka feeding and rescue station.',
    lat: 23.8759,
    lng: 90.3795,
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80'
  }
];
