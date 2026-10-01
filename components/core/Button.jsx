'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
export function Button({ variant = 'primary', size = 'md', href, icon, iconPosition = 'end', block = false, disabled = false, type = 'button', className = '', children, onClick, ...rest }) {
  const cls = ['ss-btn', 'ss-btn--' + variant, size !== 'md' ? 'ss-btn--' + size : '', block ? 'ss-btn--block' : '', className].join(' ');
  const ic = icon ? <span className={'ss-btn__icon ss-btn__icon--' + iconPosition}><Icon name={icon} size={size === 'lg' ? 20 : 18} /></span> : null;
  const inner = <>{iconPosition === 'start' && ic}<span>{children}</span>{iconPosition === 'end' && ic}</>;
  if (href) return <a href={disabled ? undefined : href} className={cls} aria-disabled={disabled || undefined} onClick={disabled ? (e) => e.preventDefault() : onClick} {...rest}>{inner}</a>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick} {...rest}>{inner}</button>;
}
