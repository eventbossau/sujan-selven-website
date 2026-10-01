'use client';
import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
import { SocialLinks } from '../core/SocialLinks.jsx';
import { NAV_ITEMS } from './nav-data.js';
export function MobileNav({ id, open, onClose, current = 'home', items = NAV_ITEMS, onNavigate, ctaLabel = 'Get involved', ctaKey = 'get-involved', ctaHref = '/get-involved', socials = [] }) {
  const [sub, setSub] = React.useState(null);
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    closeRef.current && closeRef.current.focus();
    const esc = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', esc);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  const go = (key, href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(key, href); } onClose && onClose(); };
  return (
    <div id={id} className="ss-drawer ss-on-dark" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="ss-container ss-drawer__top"><Wordmark variant="white" height={22} /><button ref={closeRef} type="button" className="ss-drawer__close" onClick={onClose}>Close<Icon name="x" size={24} /></button></div>
      <nav className="ss-container" aria-label="Mobile">
        <ul className="ss-drawer__list">
          {items.map((it) => (
            <li key={it.key}>
              {it.children ? (<>
                <button type="button" className="ss-drawer__link" aria-expanded={sub === it.key} aria-current={current === it.key ? 'page' : undefined} onClick={() => setSub(sub === it.key ? null : it.key)}>{it.label}<Icon name={sub === it.key ? 'minus' : 'plus'} size={28} /></button>
                {sub === it.key && <ul className="ss-drawer__sub"><li><a href={it.href} onClick={go(it.key, it.href)}>All priorities</a></li>{it.children.map((c) => <li key={c.key}><a href={c.href} onClick={go(it.key + '/' + c.key, c.href)}><span style={{ width: 10, height: 10, background: c.tone, flex: 'none' }} aria-hidden="true" />{c.label}</a></li>)}</ul>}
              </>) : <a href={it.href} className="ss-drawer__link" aria-current={current === it.key ? 'page' : undefined} onClick={go(it.key, it.href)}>{it.label}</a>}
            </li>
          ))}
        </ul>
      </nav>
      <div className="ss-container ss-drawer__foot">
        {ctaLabel && <Button variant="inverse" size="lg" block href={ctaHref} onClick={go(ctaKey, ctaHref)} icon="arrow-right">{ctaLabel}</Button>}
        {socials.length > 0 && <SocialLinks tone="inverse" links={socials} />}
      </div>
    </div>
  );
}
