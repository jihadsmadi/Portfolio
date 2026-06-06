'use client'

import { useState } from 'react'

type Props = {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

export default function AdminField({ label, id, type = 'text', value, onChange, multiline, rows = 4, placeholder, required, options }: Props) {
  const [focused, setFocused] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--outline)'}`,
    borderRadius: 'var(--radius)',
    padding: '9px 12px',
    fontFamily: 'var(--font-body)',
    fontSize: 13.5,
    color: 'var(--on-surface)',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px color-mix(in oklab, var(--primary) 10%, transparent)' : 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxSizing: 'border-box',
  }

  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: focused ? 'var(--primary)' : 'var(--on-surface-variant)', marginBottom: 5, transition: 'color 0.15s' }}
      >
        {label}{required && <span style={{ color: 'var(--primary)', marginLeft: 2 }}>*</span>}
      </label>

      {options ? (
        <div style={{ position: 'relative' }}>
          <select
            id={id}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none',
              paddingRight: 36,
            }}
          >
            <option value="">— select —</option>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: focused ? 'var(--primary)' : 'var(--on-surface-variant)', transition: 'color 0.15s' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      ) : multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  )
}
