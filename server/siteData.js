const site = {
  brand: {
    name: 'POSHON',
    tagline: 'Street Dog Care · Dhaka',
    logoMark: '🐾'
  },
  nav: [
    { label: 'Home' },
    {
      label: 'Who We Are',
      children: [
        { label: 'About Us', route: '/about' },
        { label: 'Our Team', route: '/team' }
      ]
    },
    { label: 'Project' },
    {
      label: 'Resources',
      children: [
        { label: 'Blog', route: '/blog' },
        { label: 'Activists', route: '/activists' },
        { label: 'Booth Locations', route: '/booths' }
      ]
    },
    {
      label: 'Get Involved',
      children: [
        { label: 'Donate', route: '/contact' },
        { label: 'Volunteer', route: '/volunteers' },
        { label: 'Sponsor a Dog', route: '/booths' }
      ]
    },
    { label: 'Contact' }
  ],
  topContact: {
    label: 'Call us today',
    phone: '+880 1994 277717'
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
  prototypes: {
    eyebrow: 'Our project',
    title: 'How we feed street dogs',
    intro: 'Our volunteers and engineers have built several project devices to make street-dog feeding safer, cleaner, and more reliable. Here is what we have shipped so far.',
    items: [
      {
        id: 1,
        name: 'Solar-Powered Auto Feeder',
        body: 'A weatherproof feeder that dispenses dry food twice a day on a solar-charged timer. Holds 5 kg of kibble and runs offline.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
        video: ''
      },
      {
        id: 2,
        name: 'Community Water Bowl with QR Donate',
        body: 'A rust-proof steel bowl with a stencilled QR code. Locals scan to top up the bowl or sponsor a refill. Deployed at 9 Dhaka spots.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',
        video: ''
      },
      {
        id: 3,
        name: 'Mobile Feeding Cart',
        body: 'A foldable trolley that volunteers push through narrow alleys. Insulated containers keep cooked rice + meat warm for the evening round.',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80',
        video: ''
      }
    ]
  },
  waysToHelp: {
    eyebrow: 'Get involved',
    title: 'How you can help',
    intro: 'Every little bit counts — here are three ways you can join our mission for street dogs in Dhaka.',
    items: [
      {
        title: 'Donate',
        body: 'A single donation feeds and treats 5 street dogs for a week. 100% goes to field work.',
        icon: 'fa-heart',
        cta: 'Donate now',
        href: '/contact'
      },
      {
        title: 'Volunteer',
        body: 'Join our weekend rescue rounds, booth duty, or admin support. Training provided.',
        icon: 'fa-hand-holding-heart',
        cta: 'Sign up',
        href: '/contact'
      },
      {
        title: 'Sponsor a Dog',
        body: 'Sponsor monthly care for a specific rescue — food, vaccines, vet visits.',
        icon: 'fa-paw',
        cta: 'Choose a dog',
        href: '/booths'
      }
    ]
  },
  team: {
    eyebrow: 'Our team',
    title: 'The people behind POSHON',
    intro: 'A small but committed crew of volunteers, vets, and field workers keeps the booths running.',
    members: [
      {
        id: 1,
        name: 'Rezwana Hossain',
        role: 'Founder & Director',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
        bio: 'Started POSHON in 2021 after rescuing strays in Mirpur. Leads strategy and partnerships.'
      },
      {
        id: 2,
        name: 'Dr. Tariq Ahmed',
        role: 'Lead Veterinarian',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
        bio: 'Runs medical camps and oversees sterilisation drives across all four booths.'
      },
      {
        id: 3,
        name: 'Mahir Karim',
        role: 'Operations Lead',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        bio: 'Keeps the booths stocked and the volunteer schedule running smoothly.'
      },
      {
        id: 4,
        name: 'Sarah Rahman',
        role: 'Community Outreach',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
        bio: 'Builds relationships with neighbourhoods, schools, and local sponsors.'
      }
    ]
  },
  blog: {
    eyebrow: 'Latest stories',
    title: 'News from the field',
    intro: 'Updates from rescue rounds, new prototypes, and the dogs we have helped.',
    posts: [
      {
        id: 1,
        title: 'How our solar feeder survived Dhaka monsoon',
        excerpt: 'Two weeks of non-stop rain, no power outages, and 1,200 meals dispensed. Here is what we learned.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
        date: '2026-05-21',
        author: 'Rezwana Hossain',
        readMins: 4,
        content: [
          'When we deployed the first POSHON solar feeder in Mirpur in early May, we knew the monsoon would be the real test. The unit is built from welded steel, has a polycarbonate hopper, and runs on a 30W panel feeding a small 12V battery.',
          'Over fourteen straight days of heavy rain, the panel still produced enough charge each morning to run the twice-daily dispense cycle. Total food dispensed: roughly 1,200 meals, give or take a few stolen by an opportunistic crow.',
          'What worked: the sloped roof drained well, the hopper seal held, and the timer never tripped. What we will fix next: the dispense tray clogs when the kibble swells from humidity, so the next version will have a wider chute and a small heater coil to keep things dry.',
          'If you would like to sponsor the next feeder, head to the Get Involved page. Each unit costs about $180 and feeds 30+ dogs a week for years.'
        ]
      },
      {
        id: 2,
        title: 'Mirpur sterilisation camp: 47 dogs, one weekend',
        excerpt: 'Our biggest medical camp yet. A breakdown of the operation, what worked, and what we will fix next time.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',
        date: '2026-04-08',
        author: 'Dr. Tariq Ahmed',
        readMins: 6,
        content: [
          'Last weekend our team ran the largest sterilisation camp POSHON has organised to date. Forty-seven street dogs were caught, sterilised, vaccinated, and released back to their territories within 48 hours.',
          'The camp was held at the Mirpur booth with three vets, eight volunteers, and a mobile surgical tent provided by Dhaka Vet Clinic. Each dog received a TVT screening, rabies and DHPP vaccine, ear-notch identification, and a five-day course of pain medication.',
          'The hardest part was not the surgery — it was the capture. Strays in this neighbourhood are skittish around vans. Next time we will pre-bait the area for three days so the dogs associate the team with food rather than nets.',
          'Huge thanks to the Mirpur community, who not only tolerated our setup but brought us tea and biscuits all weekend. Real partnership with the people who live alongside these dogs is what makes the work sustainable.'
        ]
      },
      {
        id: 5,
        title: 'Why Dhaka\'s street dog policy needs to change in 2026',
        excerpt: 'Five years of municipal data, three years of POSHON observations, and one clear recommendation.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',
        date: '2026-05-30',
        author: 'Karim Ahmed',
        readMins: 7,
        content: [
          'Bangladesh has no single national framework for managing community street dogs. Each city corporation operates on its own — and most defer to outdated culling-based ordinances that contradict both modern animal welfare practice and the published evidence on rabies control.',
          'For the last three years POSHON has been collecting data on the sterilisation–vaccination model in four Dhaka neighbourhoods. The result, even on this small scale, is unambiguous: bite incidents dropped 41% in areas with sustained TNVR (Trap-Neuter-Vaccinate-Return) coverage compared to control areas.',
          'The forthcoming Dhaka Street Dog White Paper, which I co-authored with researchers at North South University, makes three recommendations: (1) replace culling provisions with mandatory TNVR funding, (2) standardise municipal data collection, and (3) recognise community-level NGOs like POSHON as formal partners in implementation.',
          'The paper goes to the DSCC commissioner\'s office in July. Public comments will be open for 60 days. If you live in Dhaka, your voice on this matters — we will publish the public comment link here as soon as it goes live.'
        ]
      },
      {
        id: 6,
        title: 'A photo essay from a Saturday rescue round',
        excerpt: 'Six hours, eleven dogs, two volunteers, and one very tired photographer.',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80',
        date: '2026-05-15',
        author: 'Fariha Sultana',
        readMins: 4,
        content: [
          'I spent last Saturday with Lila and Hasan on a rescue round in Mirpur. I am supposed to be the silent photographer in these situations, but by the third hour I was holding leashes and pouring water for the dogs we had already settled in the van.',
          'The photo essay below is unedited — same colour, same compression, no rearranging. What surprised me most was how quiet the work is. The dramatic moments make the news; the actual work is two volunteers sitting on the ground for twenty minutes at a time, waiting for a dog to feel safe enough to come close.',
          'You should read Lila\'s own piece on her technique if you have not yet. It is a much better explanation of what I watched her do for six hours than anything I could write. My job was just to point the camera.',
          'I will be back out with the Gulshan team next month. If you would like to come along to watch, write to the contact form — POSHON often allows journalists and students to shadow rounds.'
        ]
      },
      {
        id: 4,
        title: 'Catching skittish strays without sedation — what I have learned',
        excerpt: 'After 80 rescue rounds I have figured out a few tricks. None of them involve nets or needles.',
        image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80',
        date: '2026-06-01',
        author: 'Lila Khatun',
        readMins: 5,
        content: [
          'The fastest way to lose a skittish street dog\'s trust is to look like you are hunting them. The second fastest is to come at them in a group. After 80-something Saturdays of rescue rounds in Mirpur, I now do this work mostly alone, mostly squatting, mostly silent.',
          'My basic kit is three things: a clear container of cooked chicken, a cheap blanket, and a soft slip-lead I keep folded in my pocket so it never comes out until the very end. I never bring a carry-cage to the first contact — they associate cages with vans and vans with disappearing forever.',
          'The rhythm is: sit down 6 metres away. Toss a piece of chicken halfway. Wait. Sit. Toss closer. Sit. Eventually I am the human who has been here for an hour, has not stood up, and is the source of food. By the time I slip the lead on, they have decided I am safe.',
          'This does not work for every dog. About 1 in 5 needs a different approach — usually a couple of pre-feeding days first. For genuinely panicked or injured dogs we still use sedation darts, but only as a last resort. The slow way is almost always kinder, and the dog remembers you next week.'
        ]
      },
      {
        id: 3,
        title: 'Meet Rocky — from injured stray to community mascot',
        excerpt: 'Two volunteers found him by the rail tracks. Six months later he is the friendliest dog in Dhanmondi.',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80',
        date: '2026-03-12',
        author: 'Sarah Rahman',
        readMins: 3,
        content: [
          'Rocky was barely a year old when our volunteers Lila and Hasan found him by the Dhanmondi rail tracks last September. He had a deep gash across his hind leg and was too weak to stand. We honestly were not sure he would make it through the night.',
          'Three weeks at the Gulshan booth clinic, two surgeries, and a small army of belly rubs later, Rocky was walking again. He never quite recovered the full use of that leg, but he gets around just fine with a slight bounce that locals now find endearing.',
          'Today Rocky is what we call a community dog — neither fully street nor fully owned. The shopkeepers near Dhanmondi Lake feed him, the kids walking home from school stop to greet him, and the booth team gives him a checkup every two weeks. He has become a fixture, a small advert for what POSHON tries to do.',
          'If you visit the Dhanmondi booth, ask for Rocky. He will probably find you first.'
        ]
      }
    ]
  },
  events: {
    eyebrow: 'Mark your calendar',
    title: 'Global & National Events',
    background: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=1600&q=80',
    items: [
      {
        id: 1,
        day: '12',
        month: 'Jul',
        name: 'Mirpur Vaccination Camp',
        body: 'Free vaccination and health check-up drive for street dogs in Mirpur 10. Volunteers welcome.'
      },
      {
        id: 2,
        day: '20',
        month: 'Jul',
        name: 'Volunteer Training Day',
        body: 'Onboarding session for new volunteers — rescue basics, first aid, and booth duties.'
      },
      {
        id: 3,
        day: '04',
        month: 'Aug',
        name: 'Adoption Drive · Dhanmondi',
        body: 'Weekend matchmaking event between rescued dogs and adopting families at Dhanmondi Lake park.'
      },
      {
        id: 4,
        day: '15',
        month: 'Aug',
        name: 'Sterilisation Camp · Gulshan',
        body: 'Free spay/neuter clinic at the Gulshan booth in partnership with local veterinarians.'
      }
    ]
  },
  activists: {
    eyebrow: 'Storytellers & advocates',
    title: 'Meet our activists',
    intro: 'Writers, advocates, and researchers who tell the story of street dogs in Bangladesh.',
    members: [
      {
        id: 1,
        name: 'Nadia Rahman',
        role: 'Animal Welfare Journalist',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        bio: 'Writes about animal welfare policy and street-dog rescues across South Asia. Long-time POSHON supporter.'
      },
      {
        id: 2,
        name: 'Karim Ahmed',
        role: 'Policy Researcher',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        bio: 'Researches municipal animal welfare policy. Co-author of the 2025 Dhaka Street Dog White Paper.'
      },
      {
        id: 3,
        name: 'Fariha Sultana',
        role: 'Photojournalist',
        image: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?auto=format&fit=crop&w=600&q=80',
        bio: 'Documents POSHON\'s field work through long-form photo essays. Her work has appeared in The Daily Star.'
      }
    ]
  },
  volunteers: {
    eyebrow: 'Our volunteer family',
    title: 'Meet our volunteers',
    intro: 'These are the people who feed, rescue, and care for street dogs across Dhaka every week.',
    members: [
      {
        id: 1,
        name: 'Lila Khatun',
        role: 'Rescue Team — Mirpur',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
        contribution: 'Over 80 weekend rescue rounds. Specialised in catching skittish strays without sedation. Found Rocky by the rail tracks last September.'
      },
      {
        id: 2,
        name: 'Hasan Mahmud',
        role: 'Field Coordinator — Mirpur',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        contribution: 'Volunteer driver and dispatcher for 18 months. Has driven the rescue van to over 200 emergency calls across Dhaka.'
      },
      {
        id: 3,
        name: 'Nusrat Jahan',
        role: 'Booth Volunteer — Dhanmondi',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
        contribution: 'Runs the weekend feeding rounds around Dhanmondi Lake. Sponsors monthly food supplies from her own savings.'
      },
      {
        id: 4,
        name: 'Imran Hossain',
        role: 'Medical Camp Assistant',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
        contribution: 'Assists Dr. Tariq at sterilisation camps. Trained 12 other volunteers in safe handling and post-op care.'
      },
      {
        id: 5,
        name: 'Tasneem Akter',
        role: 'Community Outreach — Gulshan',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        contribution: 'Built our partnerships with local shopkeepers and schools. Recruited 30+ new volunteers through her network.'
      },
      {
        id: 6,
        name: 'Rafiul Islam',
        role: 'Maintenance & Build Team',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        contribution: 'Welded the steel frames for all 3 solar feeders and the mobile feeding cart. Keeps every booth shelter in good repair.'
      }
    ]
  },
  partners: {
    eyebrow: 'Trusted by',
    title: 'Our Partners & Supporters',
    intro: 'Thanks to the organisations, clinics, and donors who make our work possible.',
    items: [
      { id: 1, name: 'Dhaka Vet Clinic' },
      { id: 2, name: 'BRAC Foundation' },
      { id: 3, name: 'Save the Strays BD' },
      { id: 4, name: 'WSPA Asia' },
      { id: 5, name: 'PetSafe Dhaka' },
      { id: 6, name: 'Animal Welfare BD' },
      { id: 7, name: 'Kindness Network' },
      { id: 8, name: 'Stockholm Uni.' }
    ]
  },
  contact: {
    address: '516 Mirpur Road, Dhaka 1207, Bangladesh',
    phone: '+880 1994 277717',
    email: 'info@poshon.org',
    hours: 'Mon - Sat: 9am - 7pm  ·  Sun: Closed'
  },
  footer: {
    blurb: 'POSHON is a community-driven NGO caring for street dogs across Dhaka and beyond.',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
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

let locations = [
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

module.exports = {
  site,
  locations
};
