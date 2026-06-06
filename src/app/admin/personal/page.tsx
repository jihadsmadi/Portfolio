'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { adminMutate } from '@/lib/admin/db'
import AdminField from '@/components/admin/AdminField'
import Loader from '@/components/admin/Loader'
import Toast, { ToastData } from '@/components/admin/Toast'
import type { PersonalInfo } from '@/lib/types'

type Draft = Omit<PersonalInfo, 'id' | 'updated_at'>

const BLANK: Draft = {
  full_name: '', title: '', bio: '', location_city: '', location_country: '',
  email: '', avatar_url: '', cv_url: '', open_to_work: false,
  work_location_type: '', work_engagement: '', years_experience: null, availability_note: '',
}

function PageHeader() {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>Personal Info</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>Single row — hero, about, and contact details</p>
    </div>
  )
}

export default function AdminPersonalPage() {
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [id, setId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastData>(null)

  useEffect(() => {
    supabase.from('personal_info').select('*').single().then(({ data }) => {
      if (data) { setId(data.id); setDraft({ ...BLANK, ...data }) }
      setLoading(false)
    })
  }, [])

  function set(field: keyof Draft, value: string | boolean | number | null) {
    setDraft(d => ({ ...d, [field]: value }))
  }

  async function save() {
    setSaving(true)
    const payload = { ...draft, years_experience: draft.years_experience ? Number(draft.years_experience) : null }
    const { error } = id
      ? await adminMutate({ table: 'personal_info', operation: 'update', payload: payload as Record<string, unknown>, id })
      : await adminMutate({ table: 'personal_info', operation: 'insert', payload: payload as Record<string, unknown> })
    setSaving(false)
    if (error) setToast({ msg: error.message, type: 'err' })
    else setToast({ msg: 'Saved!', type: 'ok' })
  }

  if (loading) return <Loader />

  return (
    <div style={{ padding: '36px 40px', maxWidth: 760, margin: '0 auto' }}>
      <PageHeader />

      <div style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
          <AdminField label="Full name" id="full_name" value={draft.full_name} onChange={v => set('full_name', v)} required />
          <AdminField label="Title / sub-headline" id="title" value={draft.title} onChange={v => set('title', v)} />
          <AdminField label="Email" id="email" type="email" value={draft.email ?? ''} onChange={v => set('email', v)} />
          <AdminField label="Years experience" id="years_experience" type="number" value={String(draft.years_experience ?? '')} onChange={v => set('years_experience', v === '' ? null : Number(v))} />
          <AdminField label="Location city" id="location_city" value={draft.location_city ?? ''} onChange={v => set('location_city', v)} />
          <AdminField label="Location country (ISO)" id="location_country" value={draft.location_country ?? ''} onChange={v => set('location_country', v)} placeholder="SY" />
          <AdminField label="Avatar URL" id="avatar_url" value={draft.avatar_url ?? ''} onChange={v => set('avatar_url', v)} />
          <AdminField label="CV / Resume URL" id="cv_url" value={draft.cv_url ?? ''} onChange={v => set('cv_url', v)} />
          <AdminField label="Work engagement" id="work_engagement" value={draft.work_engagement ?? ''} onChange={v => set('work_engagement', v)} options={[{ value: 'fulltime', label: 'Full-time' }, { value: 'parttime', label: 'Part-time' }, { value: 'freelance', label: 'Freelance' }]} />
          <AdminField label="Work location type" id="work_location_type" value={draft.work_location_type ?? ''} onChange={v => set('work_location_type', v)} options={[{ value: 'remote', label: 'Remote' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'onsite', label: 'On-site' }]} />
          <AdminField label="Availability note" id="availability_note" value={draft.availability_note ?? ''} onChange={v => set('availability_note', v)} placeholder="Available for work — Q2 2026" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
            <input id="open_to_work" type="checkbox" checked={draft.open_to_work} onChange={e => set('open_to_work', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
            <label htmlFor="open_to_work" style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface)', cursor: 'pointer' }}>Open to work</label>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <AdminField label="Bio (use \\n\\n for paragraph breaks)" id="bio" value={draft.bio ?? ''} onChange={v => set('bio', v)} multiline rows={6} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--outline)' }}>
          <button
            onClick={save}
            disabled={saving}
            onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = saving ? '0.7' : '1' }}
            style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', border: 'none', background: saving ? 'var(--surface-container)' : 'linear-gradient(135deg, var(--primary), var(--tint))', color: saving ? 'var(--on-surface-variant)' : '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'opacity 0.15s', display: 'flex', alignItems: 'center', gap: 7 }}
          >
            {saving ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ animation: 'p-spin 0.7s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                </svg>
                Saving…
              </>
            ) : 'Save changes'}
          </button>
        </div>
      </div>
      <style>{`@keyframes p-spin { to { transform: rotate(360deg); } }`}</style>
      <Toast data={toast} onDone={() => setToast(null)} />
    </div>
  )
}
