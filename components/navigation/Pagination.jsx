'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
function pages(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1]; const s = Math.max(2, cur - 1), e = Math.min(total - 1, cur + 1);
  if (s > 2) out.push('…'); for (let i = s; i <= e; i++) out.push(i); if (e < total - 1) out.push('…'); out.push(total); return out;
}
export function Pagination({ page = 1, total = 1, onChange, label = 'Pagination' }) {
  return (
    <nav aria-label={label} className="ss-pager">
      <button type="button" className="ss-pager__btn ss-pager__btn--step" disabled={page <= 1} onClick={() => onChange && onChange(page - 1)}><Icon name="arrow-left" size={18} /><span className="ss-pager__step-label">Previous</span></button>
      {pages(page, total).map((p, i) => p === '…' ? <span key={'g' + i} className="ss-pager__gap" aria-hidden="true">…</span> : <button key={p} type="button" className="ss-pager__btn" aria-current={p === page ? 'page' : undefined} aria-label={'Page ' + p} onClick={() => onChange && onChange(p)}>{p}</button>)}
      <button type="button" className="ss-pager__btn ss-pager__btn--step" disabled={page >= total} onClick={() => onChange && onChange(page + 1)}><span className="ss-pager__step-label">Next</span><Icon name="arrow-right" size={18} /></button>
    </nav>
  );
}
