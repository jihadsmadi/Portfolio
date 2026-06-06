'use client'

import Link from 'next/link'
import type { BlogPostWithMeta } from '@/lib/types'

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPostRow({ post }: { post: BlogPostWithMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 44px',
        gap: 40,
        padding: '28px 16px',
        margin: '0 -16px',
        borderBottom: '1px solid var(--outline-variant)',
        alignItems: 'start',
        textDecoration: 'none',
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        transition: 'padding-inline-start 0.2s, background 0.2s',
        background: 'transparent',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.paddingInlineStart = '28px'
        el.style.background = 'var(--surface-low)'
        const line = el.querySelector<HTMLElement>('.bl')
        if (line) line.style.transform = 'scaleY(1)'
        const title = el.querySelector<HTMLElement>('.bt')
        if (title) title.style.color = 'var(--primary)'
        const arrow = el.querySelector<HTMLElement>('.blog-row-arrow')
        if (arrow) { arrow.style.borderColor = 'var(--primary)'; arrow.style.color = 'var(--primary)' }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.paddingInlineStart = '16px'
        el.style.background = 'transparent'
        const line = el.querySelector<HTMLElement>('.bl')
        if (line) line.style.transform = 'scaleY(0)'
        const title = el.querySelector<HTMLElement>('.bt')
        if (title) title.style.color = 'var(--on-surface)'
        const arrow = el.querySelector<HTMLElement>('.blog-row-arrow')
        if (arrow) { arrow.style.borderColor = 'var(--outline)'; arrow.style.color = 'var(--on-surface-variant)' }
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

      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--on-surface-variant)', lineHeight: 1.7, fontWeight: 500 }}>
        <span style={{ display: 'block', color: 'var(--on-surface)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
          {formatDate(post.published_at)}
        </span>
        {post.reading_time && (
          <span style={{ display: 'block' }}>{post.reading_time} min read</span>
        )}
        {post.category && (
          <span style={{ display: 'block', marginTop: 4, color: 'var(--primary)' }}>{post.category.name}</span>
        )}
        {post.tags.length > 0 && !post.category && (
          <span style={{ display: 'block', marginTop: 4, color: 'var(--primary)' }}>{post.tags.map(t => t.name).join(' · ')}</span>
        )}
      </div>

      <div>
        <h3
          className="bt"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22,
            lineHeight: 1.25, letterSpacing: '-0.015em',
            margin: '0 0 8px', color: 'var(--on-surface)',
            transition: 'color .2s',
          }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.65 }}>
            {post.excerpt}
          </p>
        )}
      </div>

      <div
        className="blog-row-arrow"
        style={{
          alignSelf: 'center',
          width: 44, height: 44,
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--outline)',
          display: 'grid', placeItems: 'center',
          color: 'var(--on-surface-variant)',
          background: 'var(--surface-low)',
          flexShrink: 0,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
