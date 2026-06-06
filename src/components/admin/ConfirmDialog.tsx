'use client'

import { useEffect } from 'react'

type Props = {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
      if (e.key === 'Enter') { e.preventDefault(); onConfirm() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onConfirm, onCancel])

  if (!open) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--outline)',
        borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 400,
        overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.25)',
        position: 'relative', animation: 'cd-in 0.18s ease',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--error)' }} />

        <div style={{ padding: '28px 24px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: 'color-mix(in oklab, var(--error) 10%, transparent)',
            border: '1px solid color-mix(in oklab, var(--error) 20%, transparent)',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2"><path d="M3 6h18M19 6l-1 14H6L5 6M10 6V4h4v2" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--on-surface)', marginBottom: 6 }}>Delete?</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.65 }}>{message}</p>
          </div>
        </div>

        <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onCancel}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-container)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)' }}
            style={{ padding: '9px 20px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--outline)', background: 'var(--surface)', color: 'var(--on-surface)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', transition: 'background 0.15s' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            style={{ padding: '9px 20px', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--error)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', transition: 'opacity 0.15s' }}
          >
            Delete
          </button>
        </div>
      </div>
      <style>{`@keyframes cd-in { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  )
}
