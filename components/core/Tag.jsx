'use client';
import React from 'react';
export function Tag({ tone = 'brand', size = 'md', plain = false, href, onClick, selected, disabled, className = '', children, ...rest }) {
  const cls = ['ss-tag', tone !== 'brand' ? 'ss-tag--' + tone : '', size === 'lg' ? 'ss-tag--lg' : '', plain ? 'ss-tag--plain' : '', className].join(' ');
  const dt = { 'data-tone': tone };
  if (href) return <a {...dt} href={href} className={cls} aria-current={selected ? 'page' : undefined} {...rest}>{children}</a>;
  if (onClick) return <button {...dt} type="button" className={cls} aria-pressed={!!selected} disabled={disabled} onClick={onClick} {...rest}>{children}</button>;
  return <span {...dt} className={cls} {...rest}>{children}</span>;
}
