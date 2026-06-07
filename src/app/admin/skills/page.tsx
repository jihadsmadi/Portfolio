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
import type { Skill, SkillCategory } from '@/lib/types'

type Draft = Omit<Skill, 'id' | 'created_at'>
const BLANK: Draft = { name: '', category: 'frontend', proficiency: 80, description: '', icon_name: '', order: 0 }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }

export default function AdminSkillsPage() {
  const [rows, setRows] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | Skill>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() { const { data } = await supabase.from('skills').select('*').order('category').order('order'); setRows(data ?? []); setLoading(false) }
  useEffect(() => { load() }, [])

  function openEdit(row: Skill) { setDraft({ name: row.name, category: row.category, proficiency: row.proficiency, description: row.description ?? '', icon_name: row.icon_name ?? '', order: row.order }); setModal(row) }

  async function save() {
    setSaving(true)
    const payload = { ...draft, proficiency: Number(draft.proficiency), order: Number(draft.order) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'skills', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'skills', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as Skill).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'skills', operation: 'delete', id })
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Skills</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} total · frontend, backend, tools</p>
        </div>
        <button onClick={() => { setDraft(BLANK); setModal('add') }} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add skill
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Name', 'Category', 'Proficiency', 'Icon', 'Order', ''].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={td}>{row.name}</td>
                  <td style={td}><CatBadge cat={row.category} /></td>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 80, height: 4, background: 'var(--surface-container)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${row.proficiency}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.proficiency}%</span>
                    </div>
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.icon_name ?? '—'}</td>
                  <td style={td}>{row.order}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add skill' : 'Edit skill'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <AdminField label="Name" id="name" value={draft.name} onChange={v => set('name', v)} required />
          <AdminField label="Category" id="category" value={draft.category} onChange={v => set('category', v as SkillCategory)} options={[{ value: 'frontend', label: 'Frontend' }, { value: 'backend', label: 'Backend' }, { value: 'tools', label: 'Tools' }]} />
          <AdminField label="Proficiency (0–100)" id="proficiency" type="number" value={String(draft.proficiency)} onChange={v => set('proficiency', Number(v))} />
          <AdminField label="Icon name (simple-icons slug)" id="icon_name" value={draft.icon_name ?? ''} onChange={v => set('icon_name', v)} placeholder="dotnet" />
          <AdminField label="Order" id="order" type="number" value={String(draft.order)} onChange={v => set('order', Number(v))} />
          <AdminField label="Description" id="description" value={draft.description ?? ''} onChange={v => set('description', v)} multiline rows={3} />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This skill will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
const catColors: Record<string, string> = { frontend: '#6366f1', backend: '#0ea5e9', tools: '#10b981' }
function CatBadge({ cat }: { cat: string }) {
  const c = catColors[cat] ?? 'var(--on-surface-variant)'
  return <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 'var(--radius-full)', background: `color-mix(in oklab, ${c} 15%, transparent)`, color: c }}>{cat}</span>
}
function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No skills yet. Add one above.</div>
}
