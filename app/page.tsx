import type { Metadata } from 'next';
import HomePage from './HomePage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.home.title },
  description: draft.meta.home.description,
};

export default function Page() {
  return <HomePage />;
}
