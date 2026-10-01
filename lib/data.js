export const P = '/assets/photos/';

export const priorities = [
  {
    key: 'housing',
    tone: 'housing',
    n: '01',
    title: 'Affordable Housing',
    short: 'Safe, secure homes for renters, buyers and families.',
    human:
      '[Human consequence first — e.g. what rising rents mean for a local family deciding whether they can stay in the suburb they grew up in.]',
    body: 'Creating a Cumberland where everyone has access to safe, secure and affordable housing. We support practical solutions that help first home buyers, renters and families build stable futures close to the communities they call home.',
  },
  {
    key: 'energy',
    tone: 'energy',
    n: '02',
    title: 'Clean Energy',
    short: 'Renewables, efficiency and lower household energy bills.',
    human:
      '[Human consequence first — e.g. what a summer power bill means for a household already stretched.]',
    body: 'Driving the transition to a cleaner, more sustainable future through renewable energy, energy efficiency and local environmental initiatives. Our focus is reducing emissions while lowering household energy costs and creating long-term opportunities for Cumberland.',
  },
  {
    key: 'cost',
    tone: 'cost',
    n: '03',
    title: 'Cost of Living',
    short: 'Easing everyday pressure on local households.',
    human:
      '[Human consequence first — e.g. the trade-offs a parent makes at the checkout each week.]',
    body: 'Helping ease everyday financial pressures by advocating for lower household costs, affordable transport, fair wages and greater support for local families. We believe everyone should have the opportunity to thrive, not just get by.',
  },
  {
    key: 'community',
    tone: 'community',
    n: '04',
    title: 'Community & Care',
    short: 'Health, education and stronger neighbourhoods.',
    human:
      '[Human consequence first — e.g. how long a local family waits to see a GP, or travels to reach a service.]',
    body: 'Building stronger, more connected neighbourhoods by investing in healthcare, education, local services and community wellbeing. We believe a thriving Cumberland starts with supporting people at every stage of life and ensuring no one is left behind.',
  },
];

export const categories = ['All', 'Community', 'Council & local', 'Priorities', 'Announcements'];

export const catTone = {
  Community: 'brand',
  'Council & local': 'neutral',
  Priorities: 'housing',
  Announcements: 'neutral',
};

export const news = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  category: categories[1 + (i % 4)],
  date: '[DD Mon YYYY]',
  title: [
    '[Headline for a community update in sentence case]',
    '[Headline for a council or local update]',
    '[Headline linking an issue to the people affected]',
    '[Headline for an announcement]',
  ][i % 4],
  excerpt: '[One or two sentence summary of the story, written plainly and locally.]',
  image:
    i % 3 === 0
      ? {
          src:
            P +
            ['portrait-blazer-02.jpg', 'portrait-shirt-04.jpg', 'portrait-shirt-06.jpg'][
              ((i / 3) | 0) % 3
            ],
          alt: 'Sujan Selven',
          position: '50% 30%',
        }
      : null,
  ph: [
    'Community event photo',
    'Council chambers / local street',
    'Residents affected by the issue',
    'Announcement image',
  ][i % 4],
}));

export const stories = [
  {
    place: '[Suburb]',
    title: '[Local initiative title]',
    text: '[What happened, who was involved and why it matters to people nearby.]',
    ph: 'Local initiative photo',
  },
  {
    place: '[Suburb]',
    title: '[Community event title]',
    text: '[Short summary of the event and the people behind it.]',
    ph: 'Community event photo',
  },
  {
    place: '[Suburb]',
    title: '[Local issue raised by residents]',
    text: '[The issue, in residents’ words, and what is being done.]',
    ph: 'Street / neighbourhood photo',
  },
];

export const events = [
  { d: '[DD]', m: '[MON]', title: '[Event name]', where: '[Venue, suburb]', time: '[Time]' },
  { d: '[DD]', m: '[MON]', title: '[Event name]', where: '[Venue, suburb]', time: '[Time]' },
  { d: '[DD]', m: '[MON]', title: '[Event name]', where: '[Venue, suburb]', time: '[Time]' },
];

export const socials = [
  { network: 'facebook', href: 'https://www.facebook.com/sujanselven/' },
  { network: 'instagram', href: 'https://www.instagram.com/sujanselven/' },
  { network: 'linkedin', href: 'https://www.linkedin.com/in/sujanselven/' },
  { network: 'mail', href: 'mailto:info@sujanselven.org' },
];

export const contact = {
  email: 'info@sujanselven.org',
  phone: '421832255',
  phoneHref: 'tel:+61421832255',
  office: 'Sydney, Sri Lanka',
};

export const KIT = { P, priorities, categories, catTone, news, stories, events, socials, contact };
