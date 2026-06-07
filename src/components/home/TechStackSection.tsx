'use client'

import { motion } from 'framer-motion'
import type { TechStack } from '@/lib/types'
import SectionLabel from '@/components/ui/SectionLabel'
import { EASE, VIEWPORT_MARGIN_LOOSE } from '@/components/motion/constants'
import { useSectionInView } from '@/components/motion/useSectionInView'

const CAT_ORDER = ['language', 'framework', 'database', 'cloud', 'tool', 'platform']
const CAT_LABELS: Record<string, string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  database: 'Databases',
  cloud: 'Cloud & Infra',
  tool: 'Tools',
  platform: 'Platforms',
}

type Props = { stack: TechStack[] }

export default function TechStackSection({ stack }: Props) {
  const { ref, inView } = useSectionInView(VIEWPORT_MARGIN_LOOSE)

  if (stack.length === 0) return null

  const grouped = stack.reduce<Record<string, TechStack[]>>((acc, item) => {
    const key = item.category.toLowerCase()
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const sortedCats = [
    ...CAT_ORDER.filter(c => grouped[c]),
    ...Object.keys(grouped).filter(c => !CAT_ORDER.includes(c)),
  ]

  return (
    <section ref={ref} style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '0 32px 120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <SectionLabel>Tech stack</SectionLabel>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.07 }}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 48px', color: 'var(--on-surface)' }}
      >
        Tools I build with
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {sortedCats.map((cat, gi) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 + gi * 0.06 }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 12 }}>
              {CAT_LABELS[cat] ?? cat}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {grouped[cat].map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '9px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--outline)',
                    background: 'var(--surface-low)',
                    transition: 'border-color 0.2s, background 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = item.color
                    el.style.background = `color-mix(in oklab, ${item.color} 10%, var(--surface-low))`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--outline)'
                    el.style.background = 'var(--surface-low)'
                  }}
                >
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 6px ${item.color}66` }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: 'var(--on-surface)' }}>{item.name}</span>
                  {item.abbr && item.abbr !== item.name && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--on-surface-variant)', paddingLeft: 2 }}>{item.abbr}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
