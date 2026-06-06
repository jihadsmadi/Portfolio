'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { adminMutate } from '@/lib/admin/db'
import Loader from '@/components/admin/Loader'
import Toast, { ToastData } from '@/components/admin/Toast'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import type { ContactMsg } from '@/lib/types'

function fmt(d: string) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }

export default function AdminMessagesPage() {
  const [rows, setRows] = useState<ContactMsg[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() { const { data } = await supabase.from('contact_msgs').select('*').order('created_at', { ascending: false }); setRows(data ?? []); setLoading(false) }
  useEffect(() => { load() }, [])

  async function markRead(id: string, read: boolean) {
    await adminMutate({ table: 'contact_msgs', operation: 'update', payload: { read }, id })
    setRows(r => r.map(m => m.id === id ? { ...m, read } : m))
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'contact_msgs', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setRows(r => r.filter(m => m.id !== id)); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  const unread = rows.filter(r => !r.read).length

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Messages</h1>
          {unread > 0 && <span style={{ background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11, borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>{unread} new</span>}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} total contact form submissions</p>
      </div>

      {rows.length === 0 ? (
        <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No messages yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map(msg => (
            <div key={msg.id} style={{ background: msg.read ? 'var(--surface-low)' : 'color-mix(in oklab, var(--primary) 4%, var(--surface-low))', border: `1px solid ${msg.read ? 'var(--outline)' : 'color-mix(in oklab, var(--primary) 25%, transparent)'}`, borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {!msg.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />}
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--on-surface)' }}>{msg.name}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--on-surface-variant)' }}>{msg.email} · {fmt(msg.created_at)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    onClick={e => { e.stopPropagation(); markRead(msg.id, !msg.read) }}
                    title={msg.read ? 'Mark unread' : 'Mark read'}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-container)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)' }}
                    style={{ padding: '5px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--outline)', background: 'var(--surface)', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--on-surface-variant)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
                  >
                    {msg.read ? 'Mark unread' : 'Mark read'}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setPendingDel(msg.id) }}
                    title="Delete"
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in oklab, var(--error) 10%, var(--surface))'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'color-mix(in oklab, var(--error) 35%, transparent)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--outline)' }}
                    style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline)', background: 'var(--surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--error)', transition: 'background 0.15s, border-color 0.15s' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M19 6l-1 14H6L5 6M10 6V4h4v2" /></svg>
                  </button>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="1.8" style={{ transform: expanded === msg.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                </div>
              </div>

              {expanded === msg.id && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--outline-variant)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--on-surface)', whiteSpace: 'pre-wrap', paddingTop: 16 }}>{msg.message}</div>
                  <a
                    href={`mailto:${msg.email}?subject=Re: your message`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg>
                    Reply via email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!pendingDel} message="This message will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}
