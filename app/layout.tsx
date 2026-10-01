import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell.jsx';
import '@/styles/design-system.css';

export const metadata: Metadata = {
  title: 'Sujan Selven — Because the People Matter',
  description:
    'Public website for Sujan Selven — Because the People Matter. The Greens, Cumberland / Western Sydney.',
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
