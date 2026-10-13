import type { Metadata } from 'next';
import AccessibilityPage from './AccessibilityPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.accessibility.title },
  description: draft.meta.accessibility.description,
};

export default function Page() {
  return <AccessibilityPage />;
}
