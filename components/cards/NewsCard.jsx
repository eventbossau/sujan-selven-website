'use client';
import React from 'react';
import { Tag } from '../core/Tag.jsx';
import { Icon } from '../core/Icon.jsx';
export function NewsCard({ layout = 'vertical', image, media, category, categoryTone = 'brand', date, title, excerpt, href = '#', onClick, readMore = 'Read more', titleAs = 'h3', className = '' }) {
  const T = titleAs;
  const pic = (layout !== 'compact') && (media || image) && <div className="ss-ncard__media">{media || <img src={image.src} alt={image.alt || ''} loading="lazy" style={image.position ? { objectPosition: image.position } : undefined} />}</div>;
  const body = (<div className="ss-ncard__body" style={{ display: 'contents' }}>
    <div className="ss-ncard__meta">{category && <Tag tone={categoryTone} plain>{category}</Tag>}{date && <time className="ss-ncard__date">{date}</time>}</div>
    <T className="ss-ncard__title"><a href={href} onClick={onClick}>{title}</a></T>
    {excerpt && layout !== 'compact' && <p className="ss-ncard__excerpt">{excerpt}</p>}
    {layout !== 'compact' && <span className="ss-ncard__more" aria-hidden="true">{readMore}<Icon name="arrow-right" size={16} strokeWidth={2.25} /></span>}
  </div>);
  if (layout === 'horizontal' || layout === 'feature') return <article className={'ss-ncard ss-ncard--' + layout + ' ' + className}>{pic}<div className="ss-ncard__body">{body.props.children}</div></article>;
  return <article className={'ss-ncard' + (layout === 'compact' ? ' ss-ncard--compact' : '') + ' ' + className}>{pic}{body.props.children}</article>;
}
