'use client';
import React from 'react';
export function PhotoBand({ src, alt = '', position = 'center', height, statement, caption, media, className = '' }) {
  return (
    <figure className={'ss-photoband' + (statement ? ' ss-photoband--statement' : '') + ' ' + className} style={{ '--band-pos': position, ...(height ? { '--band-h': typeof height === 'number' ? height + 'px' : height } : {}) }}>
      {media || <img src={src} alt={alt} loading="lazy" />}
      {statement && <div className="ss-photoband__over"><div className="ss-container"><p className="ss-photoband__statement">{statement}</p></div></div>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
