import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/services/projects'
import { getBlogPosts } from '@/lib/services/blog'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jihad-smadi.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/projects`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url:             `${BASE}/projects/${p.slug}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map(p => ({
    url:             `${BASE}/blog/${p.slug}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
