'use client';
import React from 'react';
import { TriangleImage } from '../brand/TriangleImage.jsx';
export function SplitSection({ image, media, imageSide = 'left', shape = 'slant', frame = 'none', tone = 'none', ratio = '4/5', overline, title, titleAs = 'h2', actions, children, className = '' }) {
  const T = titleAs;
  const sh = imageSide === 'right' && shape === 'slant' ? 'slant-left' : shape;
  return (
    <div className={'ss-split' + (imageSide === 'right' ? ' ss-split--image-right' : '') + ' ' + className}>
      <div className="ss-split__media">{media || (image && <TriangleImage src={image.src} alt={image.alt} shape={sh} frame={frame} tone={tone} ratio={ratio} position={image.position} caption={image.caption} />)}</div>
      <div className="ss-split__body">
        {overline && <p className="ss-overline">{overline}</p>}
        {title && <T className="ss-split__title">{title}</T>}
        <div className="ss-split__text">{children}</div>
        {actions && <div className="ss-hero__actions">{actions}</div>}
      </div>
    </div>
  );
}
