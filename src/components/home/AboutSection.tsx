'use client'

import { motion } from 'framer-motion'
import type { PersonalInfo } from '@/lib/types'
import SectionLabel from '@/components/ui/SectionLabel'
import GradientText from '@/components/ui/GradientText'
import SectionShell from '@/components/ui/SectionShell'
import AboutPhoto from '@/components/home/about/AboutPhoto'
import AboutStatsStrip from '@/components/home/about/AboutStatsStrip'
import AboutBio from '@/components/home/about/AboutBio'
import { buildAboutStats } from '@/components/home/about/aboutStats'
import Button from '@/components/ui/Button'
import { EASE } from '@/components/motion/constants'
import { useSectionInView } from '@/components/motion/useSectionInView'

type Props = { personal: PersonalInfo | null }

export default function AboutSection({ personal }: Props) {
  const avatarUrl = personal?.avatar_url ?? null
  const cvUrl = personal?.cv_url ?? null
  const openToWork = personal?.open_to_work ?? true
  const bio = personal?.bio ?? null
  const bioParagraphs = bio ? bio.split('\n\n').filter(Boolean) : []

  const { ref: sectionRef, inView } = useSectionInView()
  const stats = buildAboutStats(personal)

  return (
    <SectionShell ref={sectionRef} className="about-section" padding="full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <SectionLabel>About me</SectionLabel>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.07 }}
        className="about-headline"
      >
        Architecture is <GradientText>craft.</GradientText> I treat it that way.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
        className="about-lead"
      >
        Building production SaaS and ERP systems, from domain model to deployment.
        Clean architecture, real-time features, and a backend that doesn&apos;t fall over.
      </motion.p>

      <div className="about-grid">
        <AboutPhoto avatarUrl={avatarUrl} openToWork={openToWork} inView={inView} />
        <div>
          <AboutBio bioParagraphs={bioParagraphs} inView={inView} />
          <AboutStatsStrip stats={stats} />
          <div className="home-cta-row about-cta-row">
            <Button
              variant="primary"
              disabled={!cvUrl}
              onClick={() => cvUrl && (window.location.href = `${cvUrl}?download`)}
            >
              {cvUrl ? 'Download CV' : 'CV coming soon'}
            </Button>
            <Button href="/contact" variant="ghost" arrow>
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
