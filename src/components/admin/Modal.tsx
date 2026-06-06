'use client'

import { useEffect } from 'react'

type Props = {
  title: string
  onClose: () => void
  onSave: () => void
  saving?: boolean
  children: React.ReactNode
  wide?: boolean
}

export default function Modal({ title, onClose, onSave, saving, children, wide }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Enter' && !e.shiftKey) {
        const tag = (document.activeElement as HTMLElement)?.tagName
        if (tag !== 'TEXTAREA' && tag !== 'BUTTON' && tag !== 'SELECT') {
          e.preventDefault()
          if (!saving) onSave()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onSave, saving])

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'var(--surface)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: wide ? 720 : 520, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-card-hover)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid var(--outline)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--on-surface)' }}>{title}</span>
          <button
            onClick={onClose}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-container)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)', padding: 6, borderRadius: 'var(--radius-sm)', display: 'grid', placeItems: 'center', transition: 'background 0.15s' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {children}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--outline)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onClose}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-container)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)' }}
            style={{ padding: '9px 18px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--outline)', background: 'var(--surface)', color: 'var(--on-surface)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', transition: 'background 0.15s' }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = saving ? '0.7' : '1' }}
            style={{ padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: saving ? 'var(--surface-container)' : 'linear-gradient(135deg, var(--primary), var(--tint))', color: saving ? 'var(--on-surface-variant)' : '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'opacity 0.15s', display: 'flex', alignItems: 'center', gap: 7 }}
          >
            {saving ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ animation: 'modal-spin 0.7s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                </svg>
                Saving…
              </>
            ) : 'Save'}
          </button>
        </div>
      </div>
      <style>{`@keyframes modal-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
