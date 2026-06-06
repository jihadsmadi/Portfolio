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
import type { Project, Category } from '@/lib/types'

type Draft = Omit<Project, 'id' | 'created_at' | 'updated_at'>
const BLANK: Draft = { category_id: '', title: '', slug: '', summary: '', description: '', live_url: '', github_url: '', featured: false, order: 0, status: 'draft' }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export default function AdminProjectsPage() {
  const [rows, setRows] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | Project>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() {
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from('projects').select('*').order('order'),
      supabase.from('categories').select('*').eq('type', 'project'),
    ])
    setRows(p ?? []); setCategories(c ?? []); setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openAdd() { setDraft(BLANK); setModal('add') }
  function openEdit(row: Project) {
    setDraft({ category_id: row.category_id ?? '', title: row.title, slug: row.slug, summary: row.summary ?? '', description: row.description ?? '', live_url: row.live_url ?? '', github_url: row.github_url ?? '', featured: row.featured, order: row.order, status: row.status })
    setModal(row)
  }

  async function save() {
    setSaving(true)
    const payload = { ...draft, order: Number(draft.order), category_id: draft.category_id || null, slug: draft.slug || slugify(draft.title) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'projects', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'projects', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as Project).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'projects', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { load(); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  const set = (f: keyof Draft, v: unknown) => setDraft(d => ({ ...d, [f]: v }))
  const catOptions = categories.map(c => ({ value: c.id, label: c.name }))

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Projects</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} total</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add project
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Title', 'Slug', 'Status', 'Featured', 'Order', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 500 }}>{row.title}</div>
                    {row.summary && <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.summary}</div>}
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.slug}</td>
                  <td style={td}><StatusBadge status={row.status} /></td>
                  <td style={td}><span style={{ width: 16, height: 16, borderRadius: '50%', background: row.featured ? 'var(--secondary)' : 'var(--outline)', display: 'inline-block' }} /></td>
                  <td style={td}>{row.order}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add project' : 'Edit project'} onClose={() => setModal(null)} onSave={save} saving={saving} wide>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
            <AdminField label="Title" id="title" value={draft.title} onChange={v => { set('title', v); if (modal === 'add') set('slug', slugify(v)) }} required />
            <AdminField label="Slug" id="slug" value={draft.slug} onChange={v => set('slug', v)} placeholder="auto-generated" />
            <AdminField label="Status" id="status" value={draft.status} onChange={v => set('status', v)} options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }]} />
            <AdminField label="Category" id="category_id" value={draft.category_id ?? ''} onChange={v => set('category_id', v)} options={catOptions} />
            <AdminField label="Live URL" id="live_url" value={draft.live_url ?? ''} onChange={v => set('live_url', v)} placeholder="https://..." />
            <AdminField label="GitHub URL" id="github_url" value={draft.github_url ?? ''} onChange={v => set('github_url', v)} placeholder="https://github.com/..." />
            <AdminField label="Order" id="order" type="number" value={String(draft.order)} onChange={v => set('order', Number(v))} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
              <input id="featured" type="checkbox" checked={draft.featured} onChange={e => set('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
              <label htmlFor="featured" style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)', cursor: 'pointer' }}>Featured</label>
            </div>
          </div>
          <AdminField label="Summary" id="summary" value={draft.summary ?? ''} onChange={v => set('summary', v)} placeholder="One-line description" />
          <AdminField label="Description" id="description" value={draft.description ?? ''} onChange={v => set('description', v)} multiline rows={5} placeholder="Full description (use \\n\\n for paragraph breaks)" />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This project will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    published: { bg: 'color-mix(in oklab, var(--secondary) 15%, transparent)', text: 'var(--secondary)' },
    draft:     { bg: 'color-mix(in oklab, var(--on-surface-variant) 10%, transparent)', text: 'var(--on-surface-variant)' },
    archived:  { bg: 'color-mix(in oklab, var(--error) 12%, transparent)', text: 'var(--error)' },
  }
  const c = colors[status] ?? colors.draft
  return <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 'var(--radius-full)', background: c.bg, color: c.text }}>{status}</span>
}
function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No projects yet. Add one above.</div>
}
