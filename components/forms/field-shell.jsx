'use client';
import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function FieldShell({ id, label, hint, error, required, optional, disabled, className = '', children }) {
  return (
    <div className={'ss-field' + (error ? ' ss-field--error' : '') + (disabled ? ' ss-field--disabled' : '') + ' ' + className}>
      <label className="ss-field__label" htmlFor={id}>
        {label}
        {required && <span className="ss-field__req">Required</span>}
        {!required && optional && <span className="ss-field__req">Optional</span>}
      </label>
      {hint && <p className="ss-field__hint" id={id + '-hint'}>{hint}</p>}
      {children}
      {error && <p className="ss-field__error" id={id + '-err'}><Icon name="alert-circle" size={16} />{error}</p>}
    </div>
  );
}
export const describeField = (id, hint, error) => [hint && id + '-hint', error && id + '-err'].filter(Boolean).join(' ') || undefined;
