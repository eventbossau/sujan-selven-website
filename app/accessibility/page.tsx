import type { Metadata } from 'next';
import AccessibilityPage from './AccessibilityPage.jsx';

export const metadata: Metadata = {
  title: 'Accessibility — Sujan Selven',
  description:
    'Accessibility information for Sujan Selven’s website — because the people matter.',
};

export default function Page() {
  return <AccessibilityPage />;
}
