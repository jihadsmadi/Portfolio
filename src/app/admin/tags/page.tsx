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
import type { Tag } from '@/lib/types'

type Draft = Omit<Tag, 'id' | 'created_at'>
const BLANK: Draft = { name: '', slug: '' }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export default function AdminTagsPage() {
  const [rows, setRows] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | Tag>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() { const { data } = await supabase.from('tags').select('*').order('name'); setRows(data ?? []); setLoading(false) }
  useEffect(() => { load() }, [])

  function openEdit(row: Tag) { setDraft({ name: row.name, slug: row.slug }); setModal(row) }

  async function save() {
    setSaving(true)
    const payload = { ...draft, slug: draft.slug || slugify(draft.name) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'tags', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'tags', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as Tag).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'tags', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { load(); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Tags</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} tags — used on projects and blog posts</p>
        </div>
        <button onClick={() => { setDraft(BLANK); setModal('add') }} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add tag
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Name', 'Slug', 'Created', ''].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface-container)', border: '1px solid var(--outline)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--on-surface-variant)' }}>{row.name}</span></td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.slug}</td>
                  <td style={{ ...td, fontSize: 12.5, color: 'var(--on-surface-variant)' }}>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 12 }}>All tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {rows.map(t => <span key={t.id} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface-container)', border: '1px solid var(--outline)', padding: '3px 10px', borderRadius: 'var(--radius-sm)', color: 'var(--on-surface-variant)' }}>{t.name}</span>)}
          </div>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add tag' : 'Edit tag'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <AdminField label="Name" id="name" value={draft.name} onChange={v => { setDraft(d => ({ ...d, name: v, slug: (modal === 'add') ? slugify(v) : d.slug })) }} required />
          <AdminField label="Slug" id="slug" value={draft.slug} onChange={v => setDraft(d => ({ ...d, slug: v }))} placeholder="auto-generated" />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This tag will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No tags yet. Add one above.</div>
}
