import { ImageResponse } from 'next/og'
import { getProjectBySlug } from '@/lib/services/projects'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  const title    = project?.title    ?? 'Project'
  const summary  = project?.summary  ?? ''
  const category = project?.category?.name ?? 'Project'
  const tags     = project?.tags?.slice(0, 4).map(t => t.name) ?? []

  return new ImageResponse(
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: '#0f172a',
        padding: '60px 80px',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #a5a0ff, #8b85ff)' }} />

      {/* site + category label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <div style={{ display: 'flex', color: '#64748b', fontSize: 15, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          jihad-smadi.dev / projects
        </div>
        <div style={{ display: 'flex', width: 4, height: 4, borderRadius: 99, background: '#334155' }} />
        <div style={{ display: 'flex', color: '#a5a0ff', fontSize: 15, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {category}
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', color: '#e2e8f8', fontSize: 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24, maxWidth: 900 }}>
        {title}
      </div>

      {/* summary */}
      {summary && (
        <div style={{ display: 'flex', color: '#94a3b8', fontSize: 22, lineHeight: 1.5, maxWidth: 800 }}>
          {summary.length > 120 ? summary.slice(0, 120) + '…' : summary}
        </div>
      )}

      {/* tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
          {tags.map(tag => (
            <div key={tag} style={{ display: 'flex', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, padding: '6px 14px', color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>,
    { ...size },
  )
}
