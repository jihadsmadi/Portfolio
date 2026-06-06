'use client'

import Link from 'next/link'
import type { BlogPostWithMeta } from '@/lib/types'

type Props = { posts: BlogPostWithMeta[] }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        color: 'var(--primary)',
        marginBottom: 16,
      }}
    >
      <span style={{ width: 24, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)', flexShrink: 0 }} />
      {children}
    </div>
  )
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LatestBlog({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '0 32px 120px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <SectionLabel>Writing</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--on-surface)',
            }}
          >
            Notes from the field
          </h2>
        </div>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--primary)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          All posts
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 44px',
              gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid var(--outline-variant)',
              alignItems: 'center',
              textDecoration: 'none',
              position: 'relative',
              transition: 'padding-inline-start 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.paddingInlineStart = '16px'
              const line = el.querySelector<HTMLElement>('.bl')
              if (line) line.style.transform = 'scaleY(1)'
              const title = el.querySelector<HTMLElement>('.bt')
              if (title) title.style.color = 'var(--primary)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.paddingInlineStart = '0'
              const line = el.querySelector<HTMLElement>('.bl')
              if (line) line.style.transform = 'scaleY(0)'
              const title = el.querySelector<HTMLElement>('.bt')
              if (title) title.style.color = 'var(--on-surface)'
            }}
          >
            <div
              className="bl"
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: 'linear-gradient(180deg, var(--primary), var(--tint))',
                transform: 'scaleY(0)', transformOrigin: 'top',
                transition: 'transform .25s',
                borderRadius: 'var(--radius-full)',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                {post.category && (
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                    {post.category.name}
                  </span>
                )}
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--on-surface-variant)' }}>
                  {formatDate(post.published_at)}
                </span>
                {post.reading_time && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--on-surface-variant)' }}>
                    · {post.reading_time} min
                  </span>
                )}
              </div>
              <h3
                className="bt"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19,
                  lineHeight: 1.3, letterSpacing: '-0.01em',
                  margin: '0 0 6px', color: 'var(--on-surface)',
                  transition: 'color .2s',
                }}
              >
                {post.title}
              </h3>
              {post.excerpt && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
              )}
            </div>

            <div
              style={{
                width: 44, height: 44,
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--outline)',
                display: 'grid', placeItems: 'center',
                color: 'var(--on-surface-variant)',
                background: 'var(--surface-low)',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
