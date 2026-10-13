import type { Metadata } from 'next';
import GetInvolvedPage from './GetInvolvedPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.getInvolved.title },
  description: draft.meta.getInvolved.description,
};

export default function Page() {
  return <GetInvolvedPage />;
}
