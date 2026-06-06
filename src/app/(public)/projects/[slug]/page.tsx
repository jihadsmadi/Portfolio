import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/services/projects'

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, var(--primary), var(--tint))',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                  </svg>
                  Live demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--outline)',
                    background: 'var(--surface)',
                    color: 'var(--on-surface)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source code
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
