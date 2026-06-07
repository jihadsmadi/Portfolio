'use client'

import { motion } from 'framer-motion'
import type { Skill, SkillCategory } from '@/lib/types'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionShell from '@/components/ui/SectionShell'
import { EASE, DURATION } from '@/components/motion/constants'
import { useSectionInView } from '@/components/motion/useSectionInView'

type Props = { skills: Skill[] }

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend:  'Backend',
  tools:    'DevOps & Tools',
}

const TABS: SkillCategory[] = ['frontend', 'backend', 'tools']

function levelToPercent(skill: Skill): number {
  return skill.proficiency
}

function SkillCard({ skill, delay, visible }: { skill: Skill; delay: number; visible: boolean }) {
  const pct = levelToPercent(skill)
  const circumference = 2 * Math.PI * 16
  const dashOffset = visible ? circumference * (1 - pct / 100) : circumference

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: EASE, delay: delay / 1000 }}
      style={{
        background: 'var(--surface-container)',
        border: '1px solid var(--outline)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Top row: name + ring */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 13,
            color: 'var(--on-surface)',
            lineHeight: 1.3,
          }}
        >
          {skill.name}
        </span>

        {/* Mini ring */}
        <div style={{ position: 'relative', flexShrink: 0, width: 38, height: 38 }}>
          <svg width="38" height="38" viewBox="0 0 38 38" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="19" cy="19" r="16" fill="none" stroke="var(--surface-highest)" strokeWidth="3" />
            <circle
              cx="19" cy="19" r="16"
              fill="none"
              stroke="url(#skill-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(.23,1,.32,1) ${delay + 100}ms` }}
            />
            <defs>
              <linearGradient id="skill-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--tint)" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 10,
              color: 'var(--primary)',
            }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          borderRadius: 'var(--radius-full)',
          background: 'var(--surface-highest)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: visible ? `${pct}%` : '0%',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, var(--primary), var(--tint))',
            transition: `width 1.4s cubic-bezier(.23,1,.32,1) ${delay + 80}ms`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsSection({ skills }: Props) {
  const { ref: sectionRef, inView: visible } = useSectionInView()

  const grouped = TABS.reduce<Record<SkillCategory, Skill[]>>(
    (acc, cat) => {
      acc[cat] = skills.filter(s => s.category === cat).sort((a, b) => a.order - b.order)
      return acc
    },
    { frontend: [], backend: [], tools: [] },
  )

  return (
    <SectionShell
      ref={sectionRef}
      className="skills-section"
      padding="inset"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DURATION.fast, ease: EASE }}
      >
        <SectionLabel>Skill matrix</SectionLabel>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DURATION.normal, ease: EASE, delay: 0.07 }}
        className="skills-headline headline-section"
      >
        Where I can contribute most
      </motion.h2>

      <div className="skills-cols">
        {TABS.map((cat, colIdx) => {
          const catSkills = grouped[cat]
          const panelDelayMs = colIdx * 60

          return (
            <motion.div
              key={cat}
              className="skills-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: panelDelayMs / 1000 + 0.1 }}
              style={{
                background: 'var(--surface-low)',
                border: '1px solid var(--outline)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px 24px 0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: '-0.01em',
                  margin: '0 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'var(--on-surface)',
                  flexShrink: 0,
                }}
              >
                {CATEGORY_LABELS[cat]}
                <span
                  style={{
                    background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
                    color: 'var(--primary)',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {catSkills.length.toString().padStart(2, '0')}
                </span>
              </h5>

              <div
                className="skills-scroll"
                style={{
                  overflowY: 'auto',
                  paddingBottom: 36,
                  paddingRight: 2,
                }}
              >
                <div className="skills-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {catSkills.map((skill, idx) => {
                    const row = Math.floor(idx / 2)
                    const col = idx % 2
                    const delay = panelDelayMs + (row + col) * 55 + 120
                    return (
                      <SkillCard key={skill.id} skill={skill} delay={delay} visible={visible} />
                    )
                  })}
                </div>
              </div>

              <div
                className="skills-panel-fade"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 44,
                  background: 'linear-gradient(to bottom, transparent, var(--surface-low))',
                  pointerEvents: 'none',
                  borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}
