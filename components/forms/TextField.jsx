'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { FieldShell, describeField } from './field-shell.jsx';
export function TextField({ id, label, hint, error, required, optional, disabled, type = 'text', className, ...rest }) {
  const fid = id || 'f-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return <FieldShell id={fid} label={label} hint={hint} error={error} required={required} optional={optional} disabled={disabled} className={className}><input id={fid} type={type} className="ss-input" required={required} disabled={disabled} aria-invalid={error ? true : undefined} aria-describedby={describeField(fid, hint, error)} {...rest} /></FieldShell>;
}
