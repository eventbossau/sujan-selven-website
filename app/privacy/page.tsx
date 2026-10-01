import type { Metadata } from 'next';
import PrivacyPage from './PrivacyPage.jsx';

export const metadata: Metadata = {
  title: 'Privacy — Sujan Selven',
  description: 'How personal information is handled on Sujan Selven’s website.',
};

export default function Page() {
  return <PrivacyPage />;
}
