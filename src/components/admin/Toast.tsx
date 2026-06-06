'use client'

import { useEffect } from 'react'

export type ToastData = { msg: string; type: 'ok' | 'err' } | null

export default function Toast({ data, onDone }: { data: ToastData; onDone: () => void }) {
  useEffect(() => {
    if (!data) return
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [data, onDone])

  if (!data) return null
  const ok = data.type === 'ok'

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
        background: 'var(--surface-low)',
        border: `1px solid ${ok ? 'color-mix(in oklab, var(--secondary) 35%, transparent)' : 'color-mix(in oklab, var(--error) 30%, transparent)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '11px 18px 11px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,.18)',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500,
        color: 'var(--on-surface)',
        animation: 'toast-in 0.22s ease',
        minWidth: 190,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          background: ok ? 'color-mix(in oklab, var(--secondary) 18%, transparent)' : 'color-mix(in oklab, var(--error) 12%, transparent)',
          display: 'grid', placeItems: 'center',
        }}>
          {ok
            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
          }
        </div>
        {data.msg}
      </div>
      <style>{`@keyframes toast-in { from { opacity:0; transform:translateY(10px) scale(.96); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
    </>
  )
}
