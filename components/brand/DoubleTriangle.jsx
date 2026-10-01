'use client';
import React from 'react';
export function DoubleTriangle({ size = 120, color, rotate = 0, drift = false, className = '', style = {}, ...rest }) {
  const s = { ...(size != null ? { '--tri-size': typeof size === 'number' ? size + 'px' : size } : {}), '--tri-rot': rotate + 'deg', ...(color ? { color } : {}), ...style };
  return <span aria-hidden="true" className={'ss-tri' + (drift ? ' ss-tri--drift' : '') + ' ' + className} style={s} {...rest} />;
}
