import type { Metadata } from 'next';
import { PrioritiesPage } from './PrioritiesPages.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.priorities.title },
  description: draft.meta.priorities.description,
};

export default function Page() {
  return <PrioritiesPage />;
}
