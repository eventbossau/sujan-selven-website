'use client';
import React from 'react';
import { DoubleTriangle } from '../brand/DoubleTriangle.jsx';
import { TriangleImage } from '../brand/TriangleImage.jsx';
import { Icon } from '../core/Icon.jsx';
const TONES = { brand: ['var(--green-500)', 'var(--green-700)'], housing: ['var(--issue-housing)', 'var(--issue-housing-ink)'], energy: ['var(--issue-energy)', 'var(--issue-energy-ink)'], cost: ['var(--issue-cost)', 'var(--issue-cost-ink)'], community: ['var(--issue-community)', 'var(--issue-community-ink)'] };
export function Hero({ variant = 'page', overline, title, lead, actions, image, media, breadcrumbs, tone = 'brand', meta, decor = true, className = '' }) {
  if (variant === 'campaign') {
    return (
      <section className={'ss-hero ss-hero--campaign ' + className} style={{ '--hero-pos': image && image.position }}>
        <div className="ss-hero__media">{media || (image && <img src={image.src} alt={image.alt || ''} />)}</div>
        {decor && <DoubleTriangle className="ss-hero__tri" size={null} color="var(--white)" />}
        <div className="ss-container ss-hero__in">
          {overline && <p className="ss-overline">{overline}</p>}
          <h1 className="ss-hero__title">{title}</h1>
          {lead && <p className="ss-hero__lead">{lead}</p>}
          {actions && <div className="ss-hero__actions">{actions}</div>}
        </div>
      </section>
    );
  }
  if (variant === 'issue') {
    const [c, ink] = TONES[tone] || TONES.brand;
    return (
      <section className={'ss-hero ss-hero--issue ' + className} style={{ '--issue': c, '--issue-ink': ink }}>
        <div className="ss-container ss-hero__in">
          <div className="ss-hero__text">
            {breadcrumbs}
            {overline && <div>{overline}</div>}
            <h1 className="ss-hero__title">{title}</h1>
            {lead && <p className="ss-hero__lead">{lead}</p>}
            {actions && <div className="ss-hero__actions">{actions}</div>}
          </div>
          <div className="ss-hero__issue-media">{media || (image && <TriangleImage src={image.src} alt={image.alt} shape="slant" ratio="4/5" position={image.position} />)}</div>
        </div>
      </section>
    );
  }
  if (variant === 'article') {
    return (
      <header className={'ss-hero ss-hero--article ' + className}>
        <div className="ss-container ss-hero__in">
          {breadcrumbs}
          {overline && <div>{overline}</div>}
          <h1 className="ss-hero__title">{title}</h1>
          {lead && <p className="ss-hero__lead">{lead}</p>}
          {meta && <div className="ss-hero__meta">{meta.map((m, i) => <span key={i}>{m.icon && <Icon name={m.icon} size={16} />}{m.label}</span>)}</div>}
        </div>
        {(media || image) && <div className="ss-container ss-hero__figure">{media || <TriangleImage src={image.src} alt={image.alt} shape="corner" ratio="16/9" position={image.position} caption={image.caption} />}</div>}
      </header>
    );
  }
  const hasImg = !!(media || image);
  return (
    <section className={'ss-hero ss-hero--page' + (hasImg ? '' : ' ss-hero--noimg') + ' ' + className}>
      {decor && !hasImg && <DoubleTriangle className="ss-hero__decor" size={null} color="var(--green-100)" />}
      <div className="ss-container ss-hero__in">
        <div className="ss-hero__text">
          {breadcrumbs}
          {overline && <p className="ss-overline">{overline}</p>}
          <h1 className="ss-hero__title">{title}</h1>
          {lead && <p className="ss-hero__lead">{lead}</p>}
          {actions && <div className="ss-hero__actions">{actions}</div>}
        </div>
        {hasImg && <div>{media || <TriangleImage src={image.src} alt={image.alt} shape="slant" frame={decor ? 'bl' : 'none'} ratio="4/5" position={image.position} />}</div>}
      </div>
    </section>
  );
}
