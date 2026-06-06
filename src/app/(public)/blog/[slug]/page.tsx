import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/services/blog'
import { getMdxContent } from '@/lib/mdx'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(p => ({ slug: p.slug }))
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const prettyCodeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: false,
  defaultLang: 'plaintext',
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '48px 0 16px', color: 'var(--on-surface)' }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(17px, 2vw, 22px)', letterSpacing: '-0.015em', lineHeight: 1.3, margin: '36px 0 12px', color: 'var(--on-surface)' }} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, lineHeight: 1.8, color: 'var(--on-surface-variant)', margin: '0 0 20px' }} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} style={{ paddingLeft: 24, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--on-surface-variant)' }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ fontWeight: 700, color: 'var(--on-surface)' }} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} style={{ fontStyle: 'italic', color: 'var(--on-surface)' }} />
  ),
  figure: (props: React.HTMLAttributes<HTMLElement>) => (
    <figure {...props} style={{ margin: '0 0 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--outline)', overflow: 'hidden', background: 'var(--surface-container)' }} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} style={{ padding: '20px 24px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.7, margin: 0 }} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (className?.includes('language-')) return <code className={className} {...props} />
    return <code {...props} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88em', background: 'var(--surface-container)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)', padding: '1px 6px', color: 'var(--primary)' }} />
  },
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--outline-variant)', margin: '40px 0' }} />,
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, content] = await Promise.all([
    getBlogPostBySlug(slug),
    Promise.resolve(getMdxContent(slug)),
  ])

  if (!post) notFound()

  return (
    <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '80px 32px 120px' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--on-surface-variant)', textDecoration: 'none', marginBottom: 48, letterSpacing: '0.01em' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        All posts
      </Link>

      <style>{`
        @media (max-width: 767px) {
          .blog-detail-grid { grid-template-columns: 1fr !important; }
          .blog-detail-aside { display: none !important; }
        }
      `}</style>
      <div className="blog-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 64, alignItems: 'start' }}>
        <article style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {post.category && (
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--primary)', background: 'color-mix(in oklab, var(--primary) 10%, transparent)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                {post.category.name}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--on-surface-variant)' }}>{formatDate(post.published_at)}</span>
            {post.reading_time && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--on-surface-variant)' }}>· {post.reading_time} min read</span>}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px', color: 'var(--on-surface)' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--on-surface-variant)', margin: '0 0 48px', paddingBottom: 48, borderBottom: '1px solid var(--outline-variant)' }}>
              {post.excerpt}
            </p>
          )}

          {content ? (
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode as never, prettyCodeOptions]] } }}
            />
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--on-surface-variant)', fontSize: 16 }}>Full post content coming soon.</p>
          )}
        </article>

        <aside className="blog-detail-aside" style={{ position: 'sticky', top: 96 }}>
          {post.tags.length > 0 && (
            <div style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 12 }}>Topics</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {post.tags.map(tag => (
                  <span key={tag.id} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--on-surface-variant)', background: 'var(--surface-container)', border: '1px solid var(--outline)', padding: '3px 10px', borderRadius: 'var(--radius-sm)' }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
