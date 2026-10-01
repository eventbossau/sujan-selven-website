'use client';
import React from 'react';
export function RadioGroup({ name, legend, hint, options = [], value, defaultValue, onChange, required, className = '' }) {
  return (
    <fieldset className={'ss-radios ' + className}>
      <legend className="ss-field__label">{legend}{required && <span className="ss-field__req">Required</span>}</legend>
      {hint && <p className="ss-field__hint">{hint}</p>}
      <div className="ss-radios__grid">
        {options.map((o) => (
          <label key={o.value} className="ss-radio">
            <input type="radio" name={name} value={o.value} disabled={o.disabled} required={required} {...(value !== undefined ? { checked: value === o.value, onChange: () => onChange && onChange(o.value) } : { defaultChecked: defaultValue === o.value, onChange: () => onChange && onChange(o.value) })} />
            <span className="ss-radio__dot" aria-hidden="true" />
            <span className="ss-radio__text">{o.label}{o.description && <small>{o.description}</small>}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
