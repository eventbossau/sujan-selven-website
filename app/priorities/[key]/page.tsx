import { PriorityDetailPage } from '../PrioritiesPages.jsx';

const KEYS = ['housing', 'energy', 'cost', 'community'] as const;

export function generateStaticParams() {
  return KEYS.map((key) => ({ key }));
}

export default async function Page({ params }: PageProps<'/priorities/[key]'>) {
  const { key } = await params;
  return <PriorityDetailPage pkey={key} />;
}
