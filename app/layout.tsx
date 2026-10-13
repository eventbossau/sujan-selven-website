import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell.jsx';
import { draft } from '@/lib/copy';
import '@/styles/design-system.css';

export const metadata: Metadata = {
  title: {
    default: draft.meta.home.title,
    template: '%s | Sujan Selven for Prospect',
  },
  description: draft.meta.home.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-AU">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
