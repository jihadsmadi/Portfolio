import type { Metadata } from 'next'
import { getProjects } from '@/lib/services/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionShell from '@/components/ui/SectionShell'
import PageHeader from '@/components/ui/PageHeader'
import GradientText from '@/components/ui/GradientText'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production systems and open-source tools built with .NET, Angular, React, and PostgreSQL.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <SectionShell as="div" padding="page">
      <PageHeader
        label="Selected work"
        title={<>Projects that <GradientText>shipped.</GradientText></>}
        lead="Production systems and open-source tools built with .NET, Angular, React, and PostgreSQL."
      />

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
        <div className="proj-list-grid">
          {featured.map(p => <ProjectCard key={p.id} project={p} variant="featured" />)}
          {rest.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </SectionShell>
  )
}
