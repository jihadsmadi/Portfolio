import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/services/blog'
import BlogPostRow from '@/components/blog/BlogPostRow'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Long-form writing on .NET, architecture, and the lessons production systems teach you.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '80px 32px 120px' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--primary)',
          marginBottom: 16,
        }}
      >
        <span style={{ width: 24, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
        Engineering journal
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 60px)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
          color: 'var(--on-surface)',
        }}
      >
        Notes from the{' '}
        <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          field.
        </span>
      </h1>

      <p
        style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: 'var(--on-surface-variant)',
          maxWidth: '56ch',
          margin: '0 0 64px',
        }}
      >
        Long-form writing on .NET, architecture, and the lessons production systems teach you.
      </p>

      <style>{`
        @media (max-width: 767px) {
          .blog-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .blog-row-arrow { display: none !important; }
        }
      `}</style>

      {posts.length === 0 ? (
        <div style={{ borderTop: '1px solid var(--outline-variant)', padding: '48px 0', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
          No posts published yet.
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
          {posts.map(post => <BlogPostRow key={post.id} post={post} />)}
        </div>
      )}
    </div>
  )
}
