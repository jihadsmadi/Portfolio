import { ImageResponse } from 'next/og'
import { getBlogPostBySlug } from '@/lib/services/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  const title       = post?.title    ?? 'Blog post'
  const excerpt     = post?.excerpt  ?? ''
  const category    = post?.category?.name ?? 'Engineering'
  const date        = formatDate(post?.published_at ?? null)
  const readingTime = post?.reading_time

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
          jihad-smadi.dev / blog
        </div>
        <div style={{ display: 'flex', width: 4, height: 4, borderRadius: 99, background: '#334155' }} />
        <div style={{ display: 'flex', color: '#a5a0ff', fontSize: 15, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {category}
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', color: '#e2e8f8', fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24, maxWidth: 960 }}>
        {title}
      </div>

      {/* excerpt */}
      {excerpt && (
        <div style={{ display: 'flex', color: '#94a3b8', fontSize: 22, lineHeight: 1.5, maxWidth: 800 }}>
          {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
        </div>
      )}

      {/* bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 'auto' }}>
        <div style={{ width: 32, height: 3, background: '#a5a0ff', borderRadius: 99 }} />
        <div style={{ display: 'flex', color: '#64748b', fontSize: 16 }}>
          {[date, readingTime ? `${readingTime} min read` : null].filter(Boolean).join(' · ')}
        </div>
      </div>
    </div>,
    { ...size },
  )
}
