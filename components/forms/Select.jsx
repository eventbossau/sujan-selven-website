'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { FieldShell, describeField } from './field-shell.jsx';
export function Select({ id, label, hint, error, required, disabled, options = [], placeholder = 'Select an option', className, ...rest }) {
  const fid = id || 'f-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return <FieldShell id={fid} label={label} hint={hint} error={error} required={required} disabled={disabled} className={className}>
    <div className="ss-select-wrap"><select id={fid} className="ss-select" required={required} disabled={disabled} aria-invalid={error ? true : undefined} aria-describedby={describeField(fid, hint, error)} defaultValue={rest.value === undefined ? '' : undefined} {...rest}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
    </select><Icon name="chevron-down" size={20} /></div>
  </FieldShell>;
}
