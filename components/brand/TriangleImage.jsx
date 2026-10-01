'use client';
import React from 'react';
import { DoubleTriangle } from './DoubleTriangle.jsx';
export function TriangleImage({ src, alt = '', shape = 'slant', ratio = '4/5', tone = 'none', frame = 'none', frameColor, position = 'center', caption, zoom = false, className = '', children, ...rest }) {
  const cls = ['ss-timg', 'ss-timg--' + shape, tone === 'green' ? 'ss-timg--green' : '', zoom ? 'ss-timg--zoom' : '', className].join(' ');
  return (
    <figure className={cls} style={{ '--timg-ratio': ratio, '--timg-pos': position }} {...rest}>
      {frame !== 'none' && <DoubleTriangle className={'ss-timg__frame ss-timg__frame--' + frame} color={frameColor} size="56%" />}
      <div className="ss-timg__clip">{children || (src ? <img src={src} alt={alt} loading="lazy" /> : null)}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
