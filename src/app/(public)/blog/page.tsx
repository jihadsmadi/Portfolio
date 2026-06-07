import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/services/blog'
import BlogPostRow from '@/components/blog/BlogPostRow'
import SectionShell from '@/components/ui/SectionShell'
import PageHeader from '@/components/ui/PageHeader'
import GradientText from '@/components/ui/GradientText'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Long-form writing on .NET, architecture, and the lessons production systems teach you.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <SectionShell as="div" padding="page">
      <PageHeader
        label="Engineering journal"
        title={<>Notes from the <GradientText>field.</GradientText></>}
        lead="Long-form writing on .NET, architecture, and the lessons production systems teach you."
      />

      {posts.length === 0 ? (
        <div style={{ borderTop: '1px solid var(--outline-variant)', padding: '48px 0', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
          No posts published yet.
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
          {posts.map(post => <BlogPostRow key={post.id} post={post} />)}
        </div>
      )}
    </SectionShell>
  )
}
