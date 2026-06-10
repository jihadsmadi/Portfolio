'use client'

import type { WorkExperience } from '@/lib/types'
import { descriptionBullets, formatPeriod } from '@/lib/format'
import { RevealItem, ScrollReveal } from '@/components/motion/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'

type Props = { items: WorkExperience[] }

export default function ExperienceTimeline({ items }: Props) {
  if (items.length === 0) return null

  return (
    <div className="home-bg-block" aria-labelledby="home-experience-heading">
      <SectionLabel>Experience</SectionLabel>
      <h2 id="home-experience-heading" className="home-section-heading">
        Where I&apos;ve built
      </h2>

      <ScrollReveal className="about-timeline">
        {items.map((item, i) => {
          const bullets = descriptionBullets(item.description)
          return (
            <RevealItem key={item.id} className="about-timeline-item">
              <div className="about-timeline-marker" aria-hidden>
                <span className="about-timeline-dot" data-current={item.current || undefined} />
                {i < items.length - 1 && <span className="about-timeline-line" />}
              </div>

              <article className="about-timeline-card">
                <div className="about-timeline-card-head">
                  <div>
                    <h3 className="about-timeline-role">{item.role}</h3>
                    <p className="about-timeline-company">{item.company}</p>
                  </div>
                  <time className="about-timeline-period" dateTime={item.start_date}>
                    {formatPeriod(item.start_date, item.end_date, item.current)}
                  </time>
                </div>

                {bullets.length > 0 && (
                  <ul className="about-timeline-bullets">
                    {bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            </RevealItem>
          )
        })}
      </ScrollReveal>
    </div>
  )
}
