'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { adminMutate } from '@/lib/admin/db'
import AdminField from '@/components/admin/AdminField'
import Modal from '@/components/admin/Modal'
import Loader from '@/components/admin/Loader'
import Toast, { ToastData } from '@/components/admin/Toast'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { Actions } from '@/components/admin/ActionBtns'
import type { SocialLink } from '@/lib/types'

type Draft = Omit<SocialLink, 'id'>
const BLANK: Draft = { platform: '', url: '', icon_name: '', order: 0 }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }

export default function AdminSocialLinksPage() {
  const [rows, setRows] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | SocialLink>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase.from('social_links').select('*').order('order')
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openAdd() { setDraft(BLANK); setModal('add') }
  function openEdit(row: SocialLink) { setDraft({ platform: row.platform, url: row.url, icon_name: row.icon_name ?? '', order: row.order }); setModal(row) }

  async function save() {
    setSaving(true)
    const payload = { ...draft, order: Number(draft.order) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'social_links', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'social_links', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as SocialLink).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'social_links', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { load(); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px', maxWidth: 800 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Social Links</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>Links shown in footer and hero</p>
        </div>
        <button onClick={openAdd} style={{ padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add link
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Platform', 'URL', 'Icon', 'Order', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}>{row.platform}</td>
                  <td style={{ ...td, color: 'var(--on-surface-variant)', fontSize: 12, fontFamily: 'var(--font-mono)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.url}</td>
                  <td style={td}>{row.icon_name ?? '—'}</td>
                  <td style={td}>{row.order}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add social link' : 'Edit social link'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <AdminField label="Platform" id="platform" value={draft.platform} onChange={v => setDraft(d => ({ ...d, platform: v }))} placeholder="GitHub" required />
          <AdminField label="URL" id="url" value={draft.url} onChange={v => setDraft(d => ({ ...d, url: v }))} placeholder="https://github.com/..." required />
          <AdminField label="Icon name" id="icon_name" value={draft.icon_name ?? ''} onChange={v => setDraft(d => ({ ...d, icon_name: v }))} placeholder="github" />
          <AdminField label="Order" id="order" type="number" value={String(draft.order)} onChange={v => setDraft(d => ({ ...d, order: Number(v) }))} />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This social link will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No social links yet. Add one above.</div>
}
