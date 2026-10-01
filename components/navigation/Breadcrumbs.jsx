'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Breadcrumbs({ items = [], tone = 'default', onNavigate, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={'ss-crumbs' + (tone === 'inverse' ? ' ss-crumbs--inverse' : '') + ' ' + className}>
      <ol>{items.map((it, i) => { const last = i === items.length - 1; return (
        <li key={i}>{last ? <span aria-current="page">{it.label}</span> : <a href={it.href} onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(it.key, it.href); } : undefined}>{it.label}</a>}{!last && <Icon name="chevron-right" size={14} strokeWidth={2.5} />}</li>
      ); })}</ol>
    </nav>
  );
}
