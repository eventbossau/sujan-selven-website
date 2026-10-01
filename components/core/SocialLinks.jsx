'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
const LABEL = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', mail: 'Email' };
export function SocialLinks({ links = [], tone = 'default', size = 'md', labelled = false, className = '', ...rest }) {
  const cls = ['ss-social', tone === 'inverse' ? 'ss-social--inverse' : '', size === 'lg' ? 'ss-social--lg' : '', labelled ? 'ss-social--labelled' : '', className].join(' ');
  return (
    <ul className={cls} {...rest}>
      {links.map((l) => {
        const name = l.label || LABEL[l.network] || l.network;
        return <li key={l.network + l.href}><a href={l.href} aria-label={labelled ? undefined : name} target={l.network === 'mail' ? undefined : '_blank'} rel="noopener noreferrer"><Icon name={l.network} size={size === 'lg' ? 22 : 20} />{labelled && <span>{name}</span>}</a></li>;
      })}
    </ul>
  );
}
