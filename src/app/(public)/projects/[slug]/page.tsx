import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/services/projects'
import ProjectLinkButtons from '@/components/projects/ProjectLinkButtons'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary ?? undefined,
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '80px 32px 120px' }}>
      <Link
        href="/projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 13,
          color: 'var(--on-surface-variant)',
          textDecoration: 'none',
          marginBottom: 48,
          letterSpacing: '0.01em',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All projects
      </Link>

      <style>{`
        @media (max-width: 767px) {
          .proj-detail-grid { grid-template-columns: 1fr !important; }
          .proj-detail-aside { position: static !important; }
        }
      `}</style>
      <div className="proj-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>
        <div>
          {project.category && (
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
              {project.category.name}
            </div>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 20px',
              color: 'var(--on-surface)',
            }}
          >
            {project.title}
          </h1>

          {project.summary && (
            <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--on-surface-variant)', maxWidth: '60ch', margin: '0 0 48px' }}>
              {project.summary}
            </p>
          )}

          {project.cover_image && (
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--outline)',
                marginBottom: 48,
                aspectRatio: '16/9',
                background: 'var(--surface-container)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.cover_image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {project.description && (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--on-surface)', maxWidth: '68ch' }}>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: '0 0 20px' }}>{para}</p>
              ))}
            </div>
          )}
        </div>

        <aside className="proj-detail-aside" style={{ position: 'sticky', top: 96 }}>
          <div
            style={{
              background: 'var(--surface-low)',
              border: '1px solid var(--outline)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 12 }}>
                Tech stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tags.map(tag => (
                  <span
                    key={tag.id}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--on-surface-variant)',
                      background: 'var(--surface-container)',
                      border: '1px solid var(--outline)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <ProjectLinkButtons
              github_url={project.github_url}
              live_url={project.live_url}
              layout="column"
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
