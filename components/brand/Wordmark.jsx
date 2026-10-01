'use client';
import React from 'react';
export function Wordmark({ variant = 'green', height = 40, href, label = 'Sujan Selven', className = '', ...rest }) {
  const mark = <span role="img" aria-label={label} className={'ss-wordmark ss-wordmark--' + variant + ' ' + (href ? '' : className)} style={{ '--wm-h': typeof height === 'number' ? height + 'px' : height }} {...(href ? {} : rest)} />;
  if (!href) return mark;
  return <a href={href} className={'ss-wordmark-link ' + className} style={{ display: 'inline-flex', lineHeight: 0 }} {...rest}>{mark}</a>;
}
