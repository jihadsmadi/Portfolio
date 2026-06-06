import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { ProjectWithMeta, Category, Tag } from '@/lib/types'

type RawProject = {
  id: string
  category_id: string | null
  title: string
  slug: string
  summary: string | null
  description: string | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  order: number
  status: string
  created_at: string
  updated_at: string
  category: Category | null
  project_tags: { tag: Tag }[]
  project_images: { url: string }[]
}

function normalize(raw: RawProject): ProjectWithMeta {
  return {
    ...raw,
    status: raw.status as ProjectWithMeta['status'],
    category: raw.category ?? null,
    tags: raw.project_tags.map(pt => pt.tag),
    cover_image: raw.project_images[0]?.url ?? null,
  }
}

export const getProjects = unstable_cache(
  async (): Promise<ProjectWithMeta[]> => {
    const db = createServerClient()
    const { data } = await db
      .from('projects')
      .select(`*, category:categories(*), project_tags(tag:tags(*)), project_images(url)`)
      .eq('status', 'published')
      .order('order')
    return (data as unknown as RawProject[] ?? []).map(normalize)
  },
  ['projects'],
  { revalidate: 3600, tags: ['projects'] },
)

export const getFeaturedProjects = unstable_cache(
  async (): Promise<ProjectWithMeta[]> => {
    const db = createServerClient()
    const { data } = await db
      .from('projects')
      .select(`*, category:categories(*), project_tags(tag:tags(*)), project_images(url)`)
      .eq('status', 'published')
      .eq('featured', true)
      .order('order')
    return (data as unknown as RawProject[] ?? []).map(normalize)
  },
  ['projects_featured'],
  { revalidate: 3600, tags: ['projects'] },
)

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<ProjectWithMeta | null> => {
    const db = createServerClient()
    const { data } = await db
      .from('projects')
      .select(`*, category:categories(*), project_tags(tag:tags(*)), project_images(url)`)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return data ? normalize(data as unknown as RawProject) : null
  },
  ['project_by_slug'],
  { revalidate: 3600, tags: ['projects'] },
)
