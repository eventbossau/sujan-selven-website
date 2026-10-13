import type { Metadata } from 'next';
import { NewsPage } from './NewsPages.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.news.title },
  description: draft.meta.news.description,
};

export default function Page() {
  return <NewsPage />;
}
