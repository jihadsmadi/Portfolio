'use client'

import { useState } from 'react'
import type { SocialLink } from '@/lib/types'

type Status = 'idle' | 'sending' | 'success' | 'error'

function Field({
  label, id, type = 'text', value, onChange, multiline, maxLength, placeholder, required,
}: {
  label: string; id: string; type?: string; value: string; onChange: (v: string) => void
  multiline?: boolean; maxLength?: number; placeholder?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface)',
    border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--outline)'}`,
    borderRadius: 'var(--radius-lg)', padding: '14px 16px',
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--on-surface)',
    outline: 'none', resize: 'none',
    minHeight: multiline ? 140 : undefined,
    overflow: multiline ? 'hidden' : undefined,
    boxShadow: focused ? '0 0 0 3px color-mix(in oklab, var(--primary) 12%, transparent)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
  }
  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: focused ? 'var(--primary)' : 'var(--on-surface-variant)', marginBottom: 7, transition: 'color 0.2s' }}>
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </label>
      {multiline ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onInput={e => { const el = e.currentTarget; el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px' }} maxLength={maxLength} placeholder={placeholder} style={inputStyle} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} maxLength={maxLength} placeholder={placeholder} style={inputStyle} />
      )}
      {multiline && maxLength && <div style={{ textAlign: 'right', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 4 }}>{value.length}/{maxLength}</div>}
    </div>
  )
}

export default function ContactForm({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending'); setErrorMsg('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) })
      const json = await res.json()
      if (!res.ok) { setErrorMsg(json.error ?? 'Something went wrong.'); setStatus('error') }
      else { setStatus('success'); setName(''); setEmail(''); setMessage('') }
    } catch { setErrorMsg('Network error. Please try again.'); setStatus('error') }
  }

  return (
    <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '80px 32px 120px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 16 }}>
        <span style={{ width: 24, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
        Get in touch
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 16px', color: 'var(--on-surface)' }}>
        Let&apos;s build something{' '}
        <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>solid.</span>
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--on-surface-variant)', maxWidth: '56ch', margin: '0 0 72px' }}>
        Whether it&apos;s a multi-tenant rebuild, a real-time feature, or an architecture review — I&apos;d love to hear about it.
      </p>
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 80, alignItems: 'start' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 12px', color: 'var(--on-surface)' }}>
            Tell me about{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>the problem.</span>
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--on-surface-variant)', margin: '0 0 32px', maxWidth: '40ch' }}>I reply within 24 hours. For urgent engagements reach out on LinkedIn directly.</p>
          <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
            {socialLinks.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--outline-variant)', textDecoration: 'none', transition: 'padding .2s, color .2s', color: 'var(--on-surface)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.paddingInlineStart = '8px'; el.style.color = 'var(--primary)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.paddingInlineStart = '0'; el.style.color = 'var(--on-surface)' }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>{link.platform}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.005em' }}>{link.url.replace(/^https?:\/\//, '')}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: 36, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'color-mix(in oklab, var(--secondary) 12%, transparent)', border: '1.5px solid var(--secondary)', display: 'grid', placeItems: 'center', margin: '0 auto 20px', color: 'var(--secondary)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--on-surface)', marginBottom: 8 }}>Message sent!</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--on-surface-variant)', margin: '0 0 24px' }}>I&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Field label="Full name" id="name" value={name} onChange={setName} placeholder="Jihad Al-Smadi" required maxLength={100} />
              <Field label="Email address" id="email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required maxLength={200} />
              <Field label="Project brief" id="message" value={message} onChange={setMessage} multiline placeholder="Tell me what you're building..." required maxLength={2000} />
              {status === 'error' && errorMsg && (
                <div style={{ background: 'color-mix(in oklab, var(--error, #b00020) 10%, transparent)', border: '1px solid color-mix(in oklab, var(--error, #b00020) 30%, transparent)', borderRadius: 'var(--radius-lg)', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--error, #b00020)', marginBottom: 16 }}>{errorMsg}</div>
              )}
              <button type="submit" disabled={status === 'sending'} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 'var(--radius-full)', background: status === 'sending' ? 'var(--surface-container)' : 'linear-gradient(135deg, var(--primary), var(--tint))', color: status === 'sending' ? 'var(--on-surface-variant)' : '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', transition: 'background 0.2s, opacity 0.2s', opacity: status === 'sending' ? 0.7 : 1, marginTop: 8 }}>
                {status === 'sending' ? (<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.22-8.56" /></svg>Sending…</>) : (<>Send message<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" /></svg></>)}
              </button>
            </form>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  )
}
