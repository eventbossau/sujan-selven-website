import type { Metadata } from 'next';
import PrivacyPage from './PrivacyPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.privacy.title },
  description: draft.meta.privacy.description,
};

export default function Page() {
  return <PrivacyPage />;
}
