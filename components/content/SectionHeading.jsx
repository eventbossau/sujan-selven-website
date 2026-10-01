'use client';
import React from 'react';
export function SectionHeading({ overline, title, intro, action, align = 'start', size = 'm', as = 'h2', id, className = '' }) {
  const T = as;
  return (
    <div className={'ss-shead' + (align === 'center' ? ' ss-shead--center' : '') + (size === 'l' ? ' ss-shead--l' : '') + ' ' + className}>
      <div className="ss-shead__text">
        {overline && <p className="ss-overline">{overline}</p>}
        <T className="ss-shead__title" id={id}>{title}</T>
        {intro && <p className="ss-shead__intro">{intro}</p>}
      </div>
      {action && <div className="ss-shead__action">{action}</div>}
    </div>
  );
}
