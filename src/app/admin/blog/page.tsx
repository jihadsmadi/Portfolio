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
import type { BlogPost, Category } from '@/lib/types'

type Draft = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
const BLANK: Draft = { category_id: '', title: '', slug: '', excerpt: '', published: false, published_at: '', reading_time: null }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export default function AdminBlogPage() {
  const [rows, setRows] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | BlogPost>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() {
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').eq('type', 'blog'),
    ])
    setRows(p ?? []); setCategories(c ?? []); setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openAdd() { setDraft(BLANK); setModal('add') }
  function openEdit(row: BlogPost) {
    setDraft({ category_id: row.category_id ?? '', title: row.title, slug: row.slug, excerpt: row.excerpt ?? '', published: row.published, published_at: row.published_at ?? '', reading_time: row.reading_time })
    setModal(row)
  }

  async function save() {
    setSaving(true)
    const payload = { ...draft, slug: draft.slug || slugify(draft.title), category_id: draft.category_id || null, reading_time: draft.reading_time ? Number(draft.reading_time) : null, published_at: draft.published_at || null }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'blog_posts', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'blog_posts', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as BlogPost).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'blog_posts', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { load(); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  const set = (f: keyof Draft, v: unknown) => setDraft(d => ({ ...d, [f]: v }))
  const catOptions = categories.map(c => ({ value: c.id, label: c.name }))
  function fmt(d: string | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Blog Posts</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} total · add MDX file at /content/blog/[slug].mdx</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add post
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Title', 'Slug', 'Published', 'Date', 'Reading time', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 500 }}>{row.title}</div>
                    {row.excerpt && <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.excerpt}</div>}
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.slug}</td>
                  <td style={td}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 'var(--radius-full)', background: row.published ? 'color-mix(in oklab, var(--secondary) 15%, transparent)' : 'color-mix(in oklab, var(--on-surface-variant) 10%, transparent)', color: row.published ? 'var(--secondary)' : 'var(--on-surface-variant)' }}>
                      {row.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ ...td, fontSize: 12, color: 'var(--on-surface-variant)' }}>{fmt(row.published_at)}</td>
                  <td style={{ ...td, fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.reading_time ? `${row.reading_time} min` : '—'}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add blog post' : 'Edit blog post'} onClose={() => setModal(null)} onSave={save} saving={saving} wide>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
            <AdminField label="Title" id="title" value={draft.title} onChange={v => { set('title', v); if (modal === 'add') set('slug', slugify(v)) }} required />
            <AdminField label="Slug" id="slug" value={draft.slug} onChange={v => set('slug', v)} placeholder="auto-generated" />
            <AdminField label="Category" id="category_id" value={draft.category_id ?? ''} onChange={v => set('category_id', v)} options={catOptions} />
            <AdminField label="Published at" id="published_at" type="date" value={draft.published_at ?? ''} onChange={v => set('published_at', v)} />
            <AdminField label="Reading time (min)" id="reading_time" type="number" value={String(draft.reading_time ?? '')} onChange={v => set('reading_time', v === '' ? null : Number(v))} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
              <input id="published" type="checkbox" checked={draft.published} onChange={e => set('published', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
              <label htmlFor="published" style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)', cursor: 'pointer' }}>Published</label>
            </div>
          </div>
          <AdminField label="Excerpt" id="excerpt" value={draft.excerpt ?? ''} onChange={v => set('excerpt', v)} multiline rows={3} placeholder="Short description shown in the post list" />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This blog post will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No posts yet. Add one above.</div>
}
