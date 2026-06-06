'use client'

import { useState } from 'react'

export const dynamic = 'force-dynamic'

const TABLES = [
  'personal_info', 'social_links', 'work_experience', 'education', 'categories',
  'tags', 'projects', 'project_images', 'skills', 'blog_posts', 'contact_msgs', 'capabilities'
] as const

type Table = (typeof TABLES)[number]

export default function DebugPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <p style={{ padding: 40, fontFamily: 'var(--font-mono)', fontSize: 13 }}>Debug page is only available in development.</p>
  }
  return <DebugUI />
}

function DebugUI() {
  const [active, setActive]   = useState<Table | 'all' | null>(null)
  const [data, setData]       = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function fetch_(table: Table | 'all') {
    setActive(table); setData(null); setError(null); setLoading(true)
    try {
      const url = table === 'all' ? '/api/debug' : `/api/debug?table=${table}`
      const res = await fetch(url)
      setData(await res.json())
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  return (
    <div style={{ fontFamily: 'var(--font-mono)', padding: 40, maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Supabase Debug</h1>
      <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 32 }}>Development only · blocked in production</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        <Btn label="All (counts)" active={active === 'all'} onClick={() => fetch_('all')} />
        {TABLES.map(t => <Btn key={t} label={t} active={active === t} onClick={() => fetch_(t)} />)}
      </div>
      <div style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', padding: 24, minHeight: 200 }}>
        {loading && <p style={{ color: 'var(--on-surface-variant)', fontSize: 13 }}>Loading…</p>}
        {error && <p style={{ color: 'var(--error)', fontSize: 13 }}>{error}</p>}
        {!loading && !error && data === null && <p style={{ color: 'var(--on-surface-variant)', fontSize: 13 }}>Pick a table above to see the response.</p>}
        {!loading && !error && data !== null && <pre style={{ fontSize: 12, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}

function Btn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--outline)', background: active ? 'var(--primary)' : 'var(--surface-container)', color: active ? '#fff' : 'var(--on-surface)', cursor: 'pointer', transition: 'background .15s, color .15s' }}>
      {label}
    </button>
  )
}
