'use client'

import type { ReactNode } from 'react'
import AccentBar from '@/components/ui/AccentBar'

export type AboutStat = {
  label: string
  value: string | number
  sub: string
  highlight?: boolean
  numeric?: boolean
  suffix?: string
  icon: ReactNode
}

type Props = { stats: AboutStat[] }

export default function AboutStatsStrip({ stats }: Props) {
  return (
    <div className="about-stats">
      {stats.map(({ label, value, sub, highlight, numeric, suffix, icon }, i) => (
        <div key={label} className="about-stat-cell" data-first={i === 0 || undefined}>
          <AccentBar className="accent-bar-top" />
          <div className="about-stat-label">
            <span className="about-stat-icon">{icon}</span>
            {label}
          </div>
          <div className={`about-stat-value${highlight ? ' about-stat-value--highlight' : ''}`}>
            {numeric ? `${value}${suffix ?? ''}` : value}
          </div>
          <div className="about-stat-sub">{sub}</div>
        </div>
      ))}
    </div>
  )
}
