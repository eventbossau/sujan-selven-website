'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function AnnouncementBar({ tone = 'brand', href, linkLabel, dismissible = true, onDismiss, children }) {
  const [shown, setShown] = React.useState(true);
  if (!shown) return null;
  return (
    <div className={'ss-announce' + (tone === 'deep' ? ' ss-announce--deep ss-on-dark' : '')} role="region" aria-label="Announcement">
      <div className="ss-container ss-announce__in">
        <p className="ss-announce__text">{children}{href && <> <a href={href}>{linkLabel || 'Find out more'}</a></>}</p>
        {dismissible && <button type="button" className="ss-announce__close" aria-label="Dismiss announcement" onClick={() => { setShown(false); onDismiss && onDismiss(); }}><Icon name="x" size={18} /></button>}
      </div>
    </div>
  );
}
