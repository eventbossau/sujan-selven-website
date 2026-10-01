'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ id, label, hint, disabled, className = '', ...rest }) {
  return <label className={'ss-check ' + className} htmlFor={id}><input id={id} type="checkbox" disabled={disabled} {...rest} /><span className="ss-check__box" aria-hidden="true"><Icon name="check" size={16} strokeWidth={3} /></span><span>{label}{hint && <span className="ss-check__hint">{hint}</span>}</span></label>;
}
