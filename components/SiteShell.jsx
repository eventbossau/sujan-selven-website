'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/navigation/SiteHeader.jsx';
import { SiteFooter } from '@/components/navigation/SiteFooter.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';

function routeKeyFromPath(pathname) {
  if (!pathname || pathname === '/') return 'home';
  return pathname.replace(/^\//, '');
}

export function SiteShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = routeKeyFromPath(pathname);

  const onNavigate = React.useCallback(
    (key, href) => {
      const target = href || (key === 'home' ? '/' : '/' + key);
      router.push(target);
      window.scrollTo(0, 0);
    },
    [router],
  );

  return (
    <>
      <a className="ss-skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current={current} onNavigate={onNavigate} socials={KIT.socials} />
      <main id="main" data-screen-label={current}>
        {children}
      </main>
      <SiteFooter onNavigate={onNavigate} socials={KIT.socials} about={draft.footer.about} />
    </>
  );
}
