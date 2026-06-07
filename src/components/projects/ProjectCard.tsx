'use client'

import { useRouter } from 'next/navigation'
import type { ProjectWithMeta } from '@/lib/types'
import { initialsFromTitle } from '@/lib/format'
import AccentBar from '@/components/ui/AccentBar'
import Tag from '@/components/ui/Tag'
import ArrowRight from '@/components/icons/ArrowRight'
import ProjectLinkButtons from '@/components/projects/ProjectLinkButtons'

type Props = {
  project: ProjectWithMeta
  variant?: 'grid' | 'compact' | 'featured'
}

export default function ProjectCard({ project, variant = 'grid' }: Props) {
  const router = useRouter()
  const isFeatured = variant === 'featured'
  const isCompact = variant === 'compact'
  const maxTags = isCompact ? 4 : 5

  const coverStyle: React.CSSProperties = {
    background: project.cover_image
      ? `url(${project.cover_image}) center/cover no-repeat`
      : 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--surface-container)), var(--surface-container))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(isCompact ? {} : { aspectRatio: isFeatured ? '21/9' : '16/9' }),
  }

  const content = (
    <>
      <AccentBar />
      <div className={isCompact ? 'proj-card-img fp-card-img' : undefined} style={coverStyle}>
        {!project.cover_image && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isFeatured ? 64 : isCompact ? 36 : 40,
              color: `color-mix(in oklab, var(--primary) ${isCompact ? 25 : 30}%, transparent)`,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            {initialsFromTitle(project.title)}
          </span>
        )}
        {!isCompact && project.featured && (
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

      <div style={{ padding: isFeatured ? '28px 32px' : isCompact ? '20px 22px' : '22px 24px' }}>
        {!isCompact && project.category && (
          <div style={{ marginBottom: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            {project.category.name}
          </div>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: isFeatured ? 24 : isCompact ? 16 : 18,
            letterSpacing: '-0.015em',
            lineHeight: 1.25,
            margin: isCompact ? '0 0 6px' : '0 0 10px',
            color: 'var(--on-surface)',
          }}
        >
          {project.title}
        </h3>

        {project.summary && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: isCompact ? 13.5 : 14, lineHeight: isCompact ? 1.6 : 1.65, color: 'var(--on-surface-variant)', margin: isCompact ? '0 0 14px' : '0 0 16px' }}>
            {project.summary}
          </p>
        )}

        {project.tags.length > 0 && (
          <div style={{ display: 'flex', gap: isCompact ? 5 : 6, flexWrap: 'wrap', marginBottom: isCompact ? 12 : 16 }}>
            {project.tags.slice(0, maxTags).map(tag => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>
        )}

        {(!isCompact || project.github_url || project.live_url) && (
          <div className="proj-card-actions">
            {!isCompact && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--primary)' }}>
                View case study
                <ArrowRight size={13} />
              </span>
            )}
            <ProjectLinkButtons
              github_url={project.github_url}
              live_url={project.live_url}
              size="sm"
              stopPropagation
            />
          </div>
        )}
      </div>
    </>
  )

  const goToProject = () => router.push(`/projects/${project.slug}`)

  return (
    <div
      role="link"
      tabIndex={0}
      className={isCompact ? 'card-interactive fp-card' : 'proj-card card-interactive'}
      onClick={goToProject}
      onKeyDown={e => { if (e.key === 'Enter') goToProject() }}
      style={isFeatured ? { gridColumn: 'span 12' } : isCompact ? undefined : { gridColumn: 'span 6' }}
    >
      {content}
    </div>
  )
}
