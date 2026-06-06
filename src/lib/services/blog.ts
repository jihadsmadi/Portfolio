import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { BlogPostWithMeta, Category, Tag } from '@/lib/types'

type RawPost = {
  id: string
  category_id: string | null
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  published_at: string | null
  reading_time: number | null
  created_at: string
  updated_at: string
  category: Category | null
  blog_post_tags: { tag: Tag }[]
}

function normalize(raw: RawPost): BlogPostWithMeta {
  return {
    ...raw,
    category: raw.category ?? null,
    tags: raw.blog_post_tags.map(pt => pt.tag),
  }
}

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPostWithMeta[]> => {
    const db = createServerClient()
    const { data } = await db
      .from('blog_posts')
      .select(`*, category:categories(*), blog_post_tags(tag:tags(*))`)
      .eq('published', true)
      .order('published_at', { ascending: false })
    return (data as unknown as RawPost[] ?? []).map(normalize)
  },
  ['blog_posts'],
  { revalidate: 3600, tags: ['blog'] },
)

export const getLatestBlogPosts = unstable_cache(
  async (limit = 3): Promise<BlogPostWithMeta[]> => {
    const db = createServerClient()
    const { data } = await db
      .from('blog_posts')
      .select(`*, category:categories(*), blog_post_tags(tag:tags(*))`)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit)
    return (data as unknown as RawPost[] ?? []).map(normalize)
  },
  ['blog_posts_latest'],
  { revalidate: 3600, tags: ['blog'] },
)

export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPostWithMeta | null> => {
    const db = createServerClient()
    const { data } = await db
      .from('blog_posts')
      .select(`*, category:categories(*), blog_post_tags(tag:tags(*))`)
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return data ? normalize(data as unknown as RawPost) : null
  },
  ['blog_post_by_slug'],
  { revalidate: 3600, tags: ['blog'] },
)
