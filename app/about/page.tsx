import type { Metadata } from 'next';
import AboutPage from './AboutPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.about.title },
  description: draft.meta.about.description,
};

export default function Page() {
  return <AboutPage />;
}
