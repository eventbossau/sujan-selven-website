'use client';
import React from 'react';
import { DoubleTriangle } from '../brand/DoubleTriangle.jsx';
import { Icon } from '../core/Icon.jsx';
export function PriorityCard({ tone = 'brand', number, title, summary, href = '#', onClick, cta = 'Why it matters', media, titleAs = 'h3', className = '' }) {
  const T = titleAs;
  return (
    <article data-tone={tone} className={'ss-pcard' + (tone !== 'brand' ? ' ss-pcard--' + tone : '') + ' ' + className}>
      {media && <div className="ss-pcard__media">{media}</div>}
      {number && <span className="ss-pcard__num" aria-hidden="true">{number}</span>}
      <T className="ss-pcard__title"><a href={href} onClick={onClick}>{title}</a></T>
      {summary && <p className="ss-pcard__summary">{summary}</p>}
      <span className="ss-pcard__foot" aria-hidden="true">{cta}<Icon name="arrow-right" size={18} strokeWidth={2.25} /></span>
      <DoubleTriangle className="ss-pcard__tri" size={null} />
    </article>
  );
}
