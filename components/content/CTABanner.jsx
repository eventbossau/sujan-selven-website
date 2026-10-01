'use client';
import React from 'react';
import { DoubleTriangle } from '../brand/DoubleTriangle.jsx';
import { TriangleImage } from '../brand/TriangleImage.jsx';
export function CTABanner({ variant = 'green', overline, title, text, actions, image, media, decor = true, titleAs = 'h2', className = '' }) {
  const T = titleAs; const hasImg = !!(image || media);
  return (
    <section className={'ss-cta ss-cta--' + variant + (hasImg ? '' : ' ss-cta--noimg') + (variant === 'paper' ? '' : ' ss-on-dark') + ' ' + className}>
      {decor && !hasImg && <DoubleTriangle className="ss-cta__tri" size={null} />}
      <div className="ss-container ss-cta__in">
        <div className="ss-cta__body">
          {overline && <p className="ss-overline">{overline}</p>}
          <T className="ss-cta__title">{title}</T>
          {text && <p className="ss-cta__text">{text}</p>}
          {hasImg && actions && <div className="ss-hero__actions">{actions}</div>}
        </div>
        {hasImg ? <div>{media || <TriangleImage src={image.src} alt={image.alt} shape="rise" ratio="1/1" position={image.position} />}</div> : actions && <div className="ss-hero__actions">{actions}</div>}
      </div>
    </section>
  );
}
