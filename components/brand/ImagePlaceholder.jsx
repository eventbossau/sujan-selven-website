'use client';
import React from 'react';
export function ImagePlaceholder({ label = 'Photo to be supplied', ratio = '4/3', tone = 'light', className = '', style = {}, ...rest }) {
  return <div role="img" aria-label={'Placeholder: ' + label} className={'ss-placeholder' + (tone === 'deep' ? ' ss-placeholder--deep' : '') + ' ' + className} style={{ '--ph-ratio': ratio, ...style }} {...rest}>{label}</div>;
}
