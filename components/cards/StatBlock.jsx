'use client';
import React from 'react';
export function StatBlock({ items = [], className = '' }) {
  return (
    <ul className={'ss-stats ' + className}>
      {items.map((it, i) => (
        <li key={i} className="ss-stat">
          <span className="ss-stat__value">{it.value}</span>
          <span className="ss-stat__label">{it.label}</span>
          {it.source && <span className="ss-stat__source">Source: {it.source}</span>}
        </li>
      ))}
    </ul>
  );
}
