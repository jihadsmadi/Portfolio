'use client'

import { motion } from 'framer-motion'
import type { ProjectWithMeta } from '@/lib/types'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionShell from '@/components/ui/SectionShell'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'
import { EASE, DURATION } from '@/components/motion/constants'
import { useSectionInView } from '@/components/motion/useSectionInView'
import { RevealBlock } from '@/components/motion/ScrollReveal'

type Props = { projects: ProjectWithMeta[] }

export default function FeaturedProjects({ projects }: Props) {
  const { ref, inView } = useSectionInView()

  if (projects.length === 0) return null

  return (
    <SectionShell ref={ref} className="fp-section" padding="inset">
      <div className="fp-header">
        <RevealBlock inView={inView}>
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="headline-section">Things I&apos;ve shipped</h2>
        </RevealBlock>

        <RevealBlock inView={inView} delay={0.15}>
          <Button href="/projects" variant="link" arrow>
            View all projects
          </Button>
        </RevealBlock>
      </div>

      <div className="fp-cols">
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, ease: EASE, delay: 0.1 + i * 0.09 }}
          >
            <ProjectCard project={project} variant="compact" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
