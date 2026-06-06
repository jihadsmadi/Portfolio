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
import type { WorkExperience } from '@/lib/types'

type Draft = Omit<WorkExperience, 'id'>
const BLANK: Draft = { company: '', role: '', start_date: '', end_date: null, description: '', current: false, order: 0 }
const td: React.CSSProperties = { padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)' }
function fmtDate(d: string | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }

export default function AdminExperiencePage() {
  const [rows, setRows] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | WorkExperience>(null)
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)
  const [pendingDel, setPendingDel] = useState<string | null>(null)

  async function load() { const { data } = await supabase.from('work_experience').select('*').order('order'); setRows(data ?? []); setLoading(false) }
  useEffect(() => { load() }, [])

  function openEdit(row: WorkExperience) { setDraft({ company: row.company, role: row.role, start_date: row.start_date, end_date: row.end_date, description: row.description ?? '', current: row.current, order: row.order }); setModal(row) }

  async function save() {
    setSaving(true)
    const payload = { ...draft, order: Number(draft.order), end_date: draft.current ? null : (draft.end_date || null) }
    const { error } = modal === 'add'
      ? await adminMutate({ table: 'work_experience', operation: 'insert', payload: payload as Record<string, unknown> })
      : await adminMutate({ table: 'work_experience', operation: 'update', payload: payload as Record<string, unknown>, id: (modal as WorkExperience).id })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else { setModal(null); load(); setToast({ msg: 'Saved!', type: 'ok' }) }
  }

  async function doDelete() {
    if (!pendingDel) return
    const id = pendingDel
    const { error } = await adminMutate({ table: 'work_experience', operation: 'delete', id })
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Work Experience</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{rows.length} entries</p>
        </div>
        <button onClick={() => { setDraft(BLANK); setModal('add') }} style={addBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
          Add entry
        </button>
      </div>

      {rows.length === 0 ? <EmptyState /> : (
        <div style={{ border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-container)' }}>
                {['Company', 'Role', 'Period', 'Current', 'Order', ''].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} style={{ borderTop: i > 0 ? '1px solid var(--outline-variant)' : 'none' }}>
                  <td style={{ ...td, fontWeight: 500 }}>{row.company}</td>
                  <td style={td}>{row.role}</td>
                  <td style={{ ...td, fontSize: 12.5, color: 'var(--on-surface-variant)' }}>{fmtDate(row.start_date)} — {row.current ? 'Present' : fmtDate(row.end_date)}</td>
                  <td style={td}><span style={{ width: 16, height: 16, borderRadius: '50%', background: row.current ? 'var(--secondary)' : 'var(--outline)', display: 'inline-block' }} /></td>
                  <td style={td}>{row.order}</td>
                  <td style={{ ...td, width: 80 }}><Actions onEdit={() => openEdit(row)} onDelete={() => setPendingDel(row.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add experience' : 'Edit experience'} onClose={() => setModal(null)} onSave={save} saving={saving} wide>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
            <AdminField label="Company" id="company" value={draft.company} onChange={v => set('company', v)} required />
            <AdminField label="Role / title" id="role" value={draft.role} onChange={v => set('role', v)} required />
            <AdminField label="Start date" id="start_date" type="date" value={draft.start_date} onChange={v => set('start_date', v)} required />
            <AdminField label="End date" id="end_date" type="date" value={draft.end_date ?? ''} onChange={v => set('end_date', v || null)} />
            <AdminField label="Order" id="order" type="number" value={String(draft.order)} onChange={v => set('order', Number(v))} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
              <input id="current" type="checkbox" checked={draft.current} onChange={e => set('current', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
              <label htmlFor="current" style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)', cursor: 'pointer' }}>Current position</label>
            </div>
          </div>
          <AdminField label="Description" id="description" value={draft.description ?? ''} onChange={v => set('description', v)} multiline rows={4} />
        </Modal>
      )}

      <ConfirmDialog open={!!pendingDel} message="This experience entry will be permanently deleted." onConfirm={doDelete} onCancel={() => setPendingDel(null)} />
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}

const addBtnStyle: React.CSSProperties = { padding: '9px 18px', borderRadius: 'var(--radius-full)', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--tint))', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
function EmptyState() {
  return <div style={{ border: '1px dashed var(--outline)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No experience entries yet. Add one above.</div>
}
