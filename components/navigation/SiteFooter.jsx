'use client';
import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { GreensMark } from '../brand/GreensMark.jsx';
import { DoubleTriangle } from '../brand/DoubleTriangle.jsx';
import { SocialLinks } from '../core/SocialLinks.jsx';
import { NAV_ITEMS, PRIORITY_LINKS } from './nav-data.js';
export function SiteFooter({ onNavigate, socials = [], statement = true, acknowledgement = 'Sujan Selven acknowledges the Traditional Custodians of the land on which we live and work, the Darug people, and pays respect to Elders past and present. Sovereignty was never ceded.', authorisation = 'Authorised by The Greens NSW.', about = 'Community worker and human rights advocate standing with the people of Cumberland.', contact = { email: 'info@sujanselven.org', phone: '421832255', office: 'Sydney, Sri Lanka' } }) {
  const go = (key, href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(key, href); } };
  return (
    <footer className="ss-footer ss-on-dark">
      <DoubleTriangle className="ss-footer__tri" size={520} color="var(--green-500)" />
      <div className="ss-container">
        {statement && <div className="ss-footer__statement"><h2>Because the <span>people</span> matter</h2><Wordmark variant="white" height={28} /></div>}
        <div className="ss-footer__grid">
          <div className="ss-footer__about"><p>{about}</p>{socials.length > 0 && <SocialLinks tone="inverse" links={socials} />}</div>
          <div className="ss-footer__col"><h3>Explore</h3><ul>{NAV_ITEMS.concat([{ key: 'get-involved', label: 'Get Involved', href: '/get-involved' }]).filter((n) => n.key !== 'home').map((n) => <li key={n.key}><a href={n.href} onClick={go(n.key, n.href)}>{n.label}</a></li>)}</ul></div>
          <div className="ss-footer__col"><h3>Priorities</h3><ul>{PRIORITY_LINKS.map((p) => <li key={p.key}><a href={'/priorities/' + p.key} onClick={go('priorities/' + p.key, '/priorities/' + p.key)}>{p.label}</a></li>)}</ul></div>
          <div className="ss-footer__col"><h3>Contact</h3><ul><li><a href={'mailto:' + contact.email}>{contact.email}</a></li><li><a href={contact.phoneHref || ('tel:' + contact.phone)}>{contact.phone}</a></li><li>{contact.office}</li></ul></div>
        </div>
        <div className="ss-footer__legal">
          <div><p>{acknowledgement}</p><p>{authorisation}</p><div className="ss-footer__legal-links"><a href="/privacy">Privacy</a><a href="/accessibility">Accessibility</a><span>© {new Date().getFullYear()} Sujan Selven</span></div></div>
          <GreensMark variant="white" height={64} />
        </div>
      </div>
    </footer>
  );
}
