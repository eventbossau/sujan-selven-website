'use client';
import React from 'react';
export function GreensMark({ variant = 'color', height = 56, label = 'The Greens', className = '', ...rest }) {
  return <span role="img" aria-label={label} className={'ss-greens-mark ss-greens-mark--' + variant + ' ' + className} style={{ '--gm-h': typeof height === 'number' ? height + 'px' : height }} {...rest} />;
}
