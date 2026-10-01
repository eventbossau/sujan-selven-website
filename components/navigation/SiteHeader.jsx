'use client';
import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
import { TextLink } from '../core/TextLink.jsx';
import { MobileNav } from './MobileNav.jsx';
import { NAV_ITEMS } from './nav-data.js';
export function SiteHeader({ current = 'home', items = NAV_ITEMS, onNavigate, ctaLabel = 'Get involved', ctaKey = 'get-involved', ctaHref = '/get-involved', socials = [], className = '' }) {
  const [open, setOpen] = React.useState(null);
  const [drawer, setDrawer] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('pointerdown', out); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', esc); };
  }, []);
  const go = (key, href) => (e) => { setOpen(null); if (onNavigate) { e.preventDefault(); onNavigate(key, href); } };
  return (
    <header className={'ss-header ' + className} ref={ref}>
      <div className="ss-container ss-header__in">
        <a href="/" className="ss-header__brand" onClick={go('home', '/')} aria-label="Sujan Selven — home"><Wordmark height={44} label="Sujan Selven" /></a>
        <nav className="ss-nav" aria-label="Main">
          <ul className="ss-nav__list">
            {items.map((it) => it.children ? (
              <li key={it.key} className={'ss-nav__item' + (open === it.key ? ' ss-nav__item--open' : '')} onMouseEnter={() => setOpen(it.key)} onMouseLeave={() => setOpen(null)}>
                <button type="button" className="ss-nav__link" aria-expanded={open === it.key} aria-current={current === it.key || String(current).startsWith(it.key + '/') ? 'page' : undefined} onClick={() => setOpen(open === it.key ? null : it.key)}>{it.label}<Icon name="chevron-down" size={16} strokeWidth={2.5} /></button>
                <div className="ss-dropdown">
                  {it.children.map((c) => (
                    <a key={c.key} href={c.href} className="ss-dropdown__link" onClick={go(it.key + '/' + c.key, c.href)}>
                      <span className="ss-dropdown__key" style={{ background: c.tone }} aria-hidden="true" />
                      <span className="ss-dropdown__title">{c.label}</span>
                      {c.desc && <span className="ss-dropdown__desc">{c.desc}</span>}
                    </a>
                  ))}
                  <div className="ss-dropdown__all"><TextLink href={it.href} onClick={go(it.key, it.href)}>All priorities</TextLink></div>
                </div>
              </li>
            ) : (
              <li key={it.key} className="ss-nav__item"><a href={it.href} className="ss-nav__link" aria-current={current === it.key ? 'page' : undefined} onClick={go(it.key, it.href)}>{it.label}</a></li>
            ))}
          </ul>
          {ctaLabel && <Button className="ss-nav__cta" href={ctaHref} onClick={go(ctaKey, ctaHref)} aria-current={current === ctaKey ? 'page' : undefined}>{ctaLabel}</Button>}
        </nav>
        <div className="ss-header__actions">
          {ctaLabel && <Button size="sm" href={ctaHref} onClick={go(ctaKey, ctaHref)}>{ctaLabel}</Button>}
          <button type="button" className="ss-menu-btn" aria-label="Menu" aria-expanded={drawer} aria-controls="ss-mobile-nav" onClick={() => setDrawer(true)}><Icon name="menu" size={24} /></button>
        </div>
      </div>
      <MobileNav id="ss-mobile-nav" open={drawer} onClose={() => setDrawer(false)} current={current} items={items} onNavigate={onNavigate} ctaLabel={ctaLabel} ctaKey={ctaKey} ctaHref={ctaHref} socials={socials} />
    </header>
  );
}
