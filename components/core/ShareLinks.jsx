'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';

function buildShareLinks(url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    {
      network: 'facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Share on Facebook',
    },
    {
      network: 'linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: 'Share on LinkedIn',
    },
    {
      network: 'mail',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      label: 'Share by email',
    },
  ];
}

export function ShareLinks({ title = 'Sujan Selven', url, className = '', ...rest }) {
  const [pageUrl, setPageUrl] = useState(url || '');

  useEffect(() => {
    if (!url && typeof window !== 'undefined') setPageUrl(window.location.href);
  }, [url]);

  const links = buildShareLinks(pageUrl || 'https://sujanselven.org', title);
  const cls = ['ss-social', className].filter(Boolean).join(' ');

  return (
    <ul className={cls} {...rest}>
      {links.map((link) => (
        <li key={link.network}>
          <a
            href={link.href}
            aria-label={link.label}
            target={link.network === 'mail' ? undefined : '_blank'}
            rel={link.network === 'mail' ? undefined : 'noopener noreferrer'}
          >
            <Icon name={link.network} size={20} className={link.network === 'facebook' ? 'ss-icon--facebook' : ''} />
          </a>
        </li>
      ))}
    </ul>
  );
}
