'use client';
import React from 'react';
import { DoubleTriangle } from '../brand/DoubleTriangle.jsx';
export function QuoteBlock({ variant = 'standard', quote, name, role, className = '' }) {
  return (
    <figure className={'ss-quote ss-quote--' + variant + (variant === 'feature' ? ' ss-on-dark' : '') + ' ' + className}>
      {variant === 'feature' && <DoubleTriangle className="ss-quote__tri" size={null} />}
      <span className="ss-quote__mark" aria-hidden="true">“</span>
      <blockquote style={{ margin: 0 }}><p className="ss-quote__text">{quote}</p></blockquote>
      {(name || role) && <figcaption className="ss-quote__cite"><span><span className="ss-quote__name">{name}</span>{role && <><br /><span className="ss-quote__role">{role}</span></>}</span></figcaption>}
    </figure>
  );
}
