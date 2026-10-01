'use client';
import React from 'react';
import { TriangleImage } from '../brand/TriangleImage.jsx';
import { Icon } from '../core/Icon.jsx';
export function StoryCard({ image, media, place, kicker, title, text, href = '#', onClick, ratio = '4/5', shape = 'corner', titleAs = 'h3', className = '' }) {
  const T = titleAs;
  return (
    <article className={'ss-scard ' + className} style={{ '--scard-ratio': ratio }}>
      <div className="ss-scard__media">
        <TriangleImage src={image && image.src} alt={image && image.alt} shape={shape} ratio={ratio} position={image && image.position}>{media}</TriangleImage>
        {place && <span className="ss-scard__place"><Icon name="map-pin" size={14} strokeWidth={2.5} />{place}</span>}
      </div>
      {kicker && <p className="ss-scard__kicker">{kicker}</p>}
      <T className="ss-scard__title"><a href={href} onClick={onClick}>{title}</a></T>
      {text && <p className="ss-scard__text">{text}</p>}
    </article>
  );
}
