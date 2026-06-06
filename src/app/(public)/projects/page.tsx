import type { Metadata } from 'next'
import { getProjects } from '@/lib/services/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production systems and open-source tools built with .NET, Angular, React, and PostgreSQL.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        color: 'var(--primary)',
        marginBottom: 16,
      }}
    >
      <span style={{ width: 24, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
      {children}
    </div>
  )
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '80px 32px 120px' }}>
      <SectionLabel>Selected work</SectionLabel>

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
        Projects that{' '}
        <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          shipped.
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
        Production systems and open-source tools built with .NET, Angular, React, and PostgreSQL.
      </p>

      <style>{`
        @media (max-width: 767px) {
          .proj-list-grid { grid-template-columns: 1fr !important; }
          .proj-card { grid-column: span 1 !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .proj-card { grid-column: span 6 !important; }
        }
      `}</style>

      {projects.length === 0 ? (
        <div
          style={{
            border: '1px dashed var(--outline)',
            borderRadius: 'var(--radius-xl)',
            minHeight: 240,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--on-surface-variant)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Projects coming soon.
        </div>
      ) : (
        <div className="proj-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
          {featured.map(p => <ProjectCard key={p.id} project={p} featured />)}
          {rest.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  )
}
