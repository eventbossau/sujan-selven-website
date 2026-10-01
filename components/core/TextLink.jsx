'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
export function TextLink({ href, tone = 'brand', arrow = true, icon, external = false, className = '', children, ...rest }) {
  const ic = icon || (external ? 'arrow-up-right' : arrow ? 'arrow-right' : null);
  const cls = 'ss-link' + (tone === 'inverse' ? ' ss-link--inverse' : tone === 'ink' ? ' ss-link--ink' : '') + ' ' + className;
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const content = <>{children}{ic && <span className="ss-link__icon"><Icon name={ic} size={16} strokeWidth={2.25} /></span>}{external && <span className="ss-visually-hidden"> (opens in a new tab)</span>}</>;
  if (!href) return <button type="button" className={cls} {...rest}>{content}</button>;
  return <a href={href} className={cls} {...ext} {...rest}>{content}</a>;
}
