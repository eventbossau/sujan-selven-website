import type { Metadata } from 'next';
import CommunityPage from './CommunityPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.community.title },
  description: draft.meta.community.description,
};

export default function Page() {
  return <CommunityPage />;
}
