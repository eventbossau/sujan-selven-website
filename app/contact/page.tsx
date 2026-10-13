import type { Metadata } from 'next';
import ContactPage from './ContactPage.jsx';
import { draft } from '@/lib/copy';

export const metadata: Metadata = {
  title: { absolute: draft.meta.contact.title },
  description: draft.meta.contact.description,
};

export default function Page() {
  return <ContactPage />;
}
