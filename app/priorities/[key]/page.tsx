import type { Metadata } from 'next';
import { PriorityDetailPage } from '../PrioritiesPages.jsx';
import { priorities } from '@/lib/data';

const KEYS = ['housing', 'energy', 'cost', 'community'] as const;

export function generateStaticParams() {
  return KEYS.map((key) => ({ key }));
}

export async function generateMetadata({ params }: PageProps<'/priorities/[key]'>): Promise<Metadata> {
  const { key } = await params;
  const p = priorities.find((x) => x.key === key);
  return {
    title: { absolute: p?.metaTitle || 'Priorities | Sujan Selven for Prospect' },
    description: p?.metaDescription,
  };
}

export default async function Page({ params }: PageProps<'/priorities/[key]'>) {
  const { key } = await params;
  return <PriorityDetailPage pkey={key} />;
}
