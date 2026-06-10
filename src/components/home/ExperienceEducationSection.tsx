'use client'

import type { Education, WorkExperience } from '@/lib/types'
import SectionShell from '@/components/ui/SectionShell'
import ExperienceTimeline from '@/components/home/ExperienceTimeline'
import EducationList from '@/components/home/EducationList'

type Props = {
  experience: WorkExperience[]
  education: Education[]
}

export default function ExperienceEducationSection({ experience, education }: Props) {
  if (experience.length === 0 && education.length === 0) return null

  return (
    <SectionShell className="experience-education-section" padding="full">
      <ExperienceTimeline items={experience} />
      <EducationList items={education} />
    </SectionShell>
  )
}
