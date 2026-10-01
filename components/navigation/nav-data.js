export const PRIORITY_LINKS = [
  { key: 'housing', label: 'Affordable Housing', desc: 'Safe, secure homes for renters, buyers and families', tone: 'var(--issue-housing)' },
  { key: 'energy', label: 'Clean Energy', desc: 'Renewables, efficiency and lower energy bills', tone: 'var(--issue-energy)' },
  { key: 'cost', label: 'Cost of Living', desc: 'Easing everyday pressure on local households', tone: 'var(--issue-cost)' },
  { key: 'community', label: 'Community & Care', desc: 'Health, education and stronger neighbourhoods', tone: 'var(--issue-community)' },
];
export const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'priorities', label: 'Priorities', href: '/priorities', children: PRIORITY_LINKS.map((p) => ({ ...p, href: '/priorities/' + p.key })) },
  { key: 'community', label: 'Community', href: '/community' },
  { key: 'news', label: 'News', href: '/news' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];
