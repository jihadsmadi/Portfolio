'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const json = await res.json()
      setError(json.error ?? 'Invalid password')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: '40px 36px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary), var(--tint))', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
            JS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--on-surface)' }}>Portfolio CMS</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--on-surface-variant)' }}>Admin access</div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--on-surface)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Sign in</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '0 0 28px' }}>Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="password"
              style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: focused ? 'var(--primary)' : 'var(--on-surface-variant)', marginBottom: 6, transition: 'color 0.15s' }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--outline)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '11px 44px 11px 14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'var(--on-surface)',
                  outline: 'none',
                  boxShadow: focused ? '0 0 0 3px color-mix(in oklab, var(--primary) 10%, transparent)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                title={showPw ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 'var(--radius-sm)',
                  color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--on-surface)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--on-surface-variant)' }}
              >
                {showPw ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'color-mix(in oklab, var(--error) 10%, transparent)', border: '1px solid color-mix(in oklab, var(--error) 30%, transparent)', borderRadius: 'var(--radius)', padding: '8px 12px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--error)', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px 20px', borderRadius: 'var(--radius-full)', background: loading ? 'var(--surface-container)' : 'linear-gradient(135deg, var(--primary), var(--tint))', color: loading ? 'var(--on-surface-variant)' : '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                </svg>
                Signing in…
              </>
            ) : 'Sign in'}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
