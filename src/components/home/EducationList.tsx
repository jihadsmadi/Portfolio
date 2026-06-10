'use client'

import type { Education } from '@/lib/types'
import { formatMonthYear } from '@/lib/format'
import AccentBar from '@/components/ui/AccentBar'
import { RevealItem, ScrollReveal } from '@/components/motion/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'

type Props = { items: Education[] }

function educationPeriod(item: Education): string {
  const start = formatMonthYear(item.start_date)
  const end = item.end_date ? formatMonthYear(item.end_date) : 'Present'
  return `${start} — ${end}`
}

export default function EducationList({ items }: Props) {
  if (items.length === 0) return null

  return (
    <div className="home-bg-block" aria-labelledby="home-education-heading">
      <SectionLabel>Education</SectionLabel>
      <h2 id="home-education-heading" className="home-section-heading">
        Academic background
      </h2>

      <ScrollReveal className="about-edu-grid">
        {items.map(item => (
          <RevealItem key={item.id} className="about-edu-card">
            <AccentBar className="accent-bar-top" />
            <div className="about-edu-degree">{item.degree}</div>
            <div className="about-edu-institution">{item.institution}</div>
            {item.field && <div className="about-edu-field">{item.field}</div>}
            <time className="about-edu-period" dateTime={item.start_date}>
              {educationPeriod(item)}
              {!item.end_date && <span className="about-edu-badge">In progress</span>}
            </time>
          </RevealItem>
        ))}
      </ScrollReveal>
    </div>
  )
}
