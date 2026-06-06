'use client'

import { useRouter } from 'next/navigation'
import type { ProjectWithMeta } from '@/lib/types'

export default function ProjectCard({ project, featured }: { project: ProjectWithMeta; featured?: boolean }) {
  const router = useRouter()

  return (
    <div
      role="link"
      tabIndex={0}
      className="proj-card"
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={e => { if (e.key === 'Enter') router.push(`/projects/${project.slug}`) }}
      style={{
        display: 'block',
        background: 'var(--surface-low)',
        border: '1px solid var(--outline)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        position: 'relative',
        ...(featured ? { gridColumn: 'span 12' } : { gridColumn: 'span 6' }),
        // mobile override applied via .proj-card CSS class
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'color-mix(in oklab, var(--primary) 40%, var(--outline))'
        el.style.boxShadow = 'var(--shadow-card-hover)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--outline)'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

      <div
        style={{
          aspectRatio: featured ? '21/9' : '16/9',
          background: project.cover_image
            ? `url(${project.cover_image}) center/cover no-repeat`
            : 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--surface-container)), var(--surface-container))',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!project.cover_image && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: featured ? 64 : 40,
              color: 'color-mix(in oklab, var(--primary) 30%, transparent)',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
          </span>
        )}
        {project.featured && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: 'color-mix(in oklab, var(--primary) 90%, transparent)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Featured
          </span>
        )}
      </div>

      <div style={{ padding: featured ? '28px 32px' : '22px 24px' }}>
        {project.category && (
          <div style={{ marginBottom: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            {project.category.name}
          </div>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: featured ? 24 : 18,
            letterSpacing: '-0.015em',
            lineHeight: 1.25,
            margin: '0 0 10px',
            color: 'var(--on-surface)',
          }}
        >
          {project.title}
        </h3>

        {project.summary && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--on-surface-variant)', margin: '0 0 16px' }}>
            {project.summary}
          </p>
        )}

        {project.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {project.tags.slice(0, 5).map(tag => (
              <span
                key={tag.id}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: 'var(--on-surface-variant)',
                  background: 'var(--surface-container)',
                  border: '1px solid var(--outline)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--primary)' }}>
            View case study
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
