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
import type { TechStack } from '@/lib/types'

type Draft = Omit<TechStack, 'id' | 'created_at'>
const BLANK: Draft = { name: '', abbr: '', category: 'framework', color: '#6366f1', description: null, order: 0 }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }

const CAT_OPTIONS = [
  { value: 'language',  label: 'Language'            },
  { value: 'framework', label: 'Framework / Library'  },
  { value: 'database',  label: 'Database'             },
  { value: 'cloud',     label: 'Cloud & Infra'        },
  { value: 'tool',      label: 'Tool'                 },
  { value: 'platform',  label: 'Platform'             },
]

export default function AdminTechStackPage() {
  const [rows, setRows] = useState<TechStack[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | TechStack>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase.from('tech_stack').select('*').order('category').order('order')
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openEdit(row: TechStack) {
    setDraft({ name: row.name, abbr: row.abbr, category: row.category, color: row.color, description: row.description, order: row.order })
    setModal(row)
  }

  async function save() {
    setSaving(true)
    const payload = { ...draft, order: Number(draft.order) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'tech_stack', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'tech_stack', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as TechStack).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'tech_stack', operation: 'delete', id })
    setPendingDel(null)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { load(); setToast({ msg: 'Deleted', type: 'ok' }) }
  }

  const set = (f: keyof Draft, v: unknown) => setDraft(d => ({ ...d, [f]: v }))

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Tech Stack</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} items — displayed as tech pills on the home page</p>
        </div>
        <button onClick={() => { setDraft(BLANK); setModal('add') }} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add tech
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Name', 'Abbr', 'Category', 'Color', 'Order', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: row.color, flexShrink: 0, boxShadow: `0 0 4px ${row.color}88` }} />
                      <span style={{ fontWeight: 600 }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.abbr || '—'}</td>
                  <td style={td}><CatBadge cat={row.category} /></td>
                  <td style={td}>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)', background: 'var(--surface-container)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>{row.color}</code>
                  </td>
                  <td style={td}>{row.order}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add tech' : 'Edit tech'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <AdminField label="Name" id="name" value={draft.name} onChange={v => set('name', v)} required />
          <AdminField label="Abbreviation" id="abbr" value={draft.abbr} onChange={v => set('abbr', v)} placeholder="e.g. .NET, PG, TS" />
          <AdminField label="Category" id="category" value={draft.category} onChange={v => set('category', v)} options={CAT_OPTIONS} />
          <AdminField label="Color (hex)" id="color" value={draft.color} onChange={v => set('color', v)} placeholder="#6366f1" />
          <AdminField label="Order" id="order" type="number" value={String(draft.order)} onChange={v => set('order', Number(v))} />
          <AdminField label="Description" id="description" value={draft.description ?? ''} onChange={v => set('description', v || null)} multiline rows={2} />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This tech item will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }

const CAT_COLORS: Record<string, string> = { language: '#f59e0b', framework: '#6366f1', database: '#0ea5e9', cloud: '#10b981', tool: '#8b5cf6', platform: '#f43f5e' }
function CatBadge({ cat }: { cat: string }) {
  const c = CAT_COLORS[cat.toLowerCase()] ?? 'var(--on-surface-variant)'
  return <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 'var(--radius-full)', background: `color-mix(in oklab, ${c} 15%, transparent)`, color: c }}>{cat}</span>
}

function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No tech items yet. Add one above.</div>
}
