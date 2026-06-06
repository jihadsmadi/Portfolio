'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ProjectWithMeta } from '@/lib/types'

const EASE = [0.23, 1, 0.32, 1] as const

type Props = { projects: ProjectWithMeta[] }

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
      <span style={{ width: 24, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)', flexShrink: 0 }} />
      {children}
    </div>
  )
}

export default function FeaturedProjects({ projects }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  if (projects.length === 0) return null

  return (
    <section ref={sectionRef} style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '0 32px 120px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <SectionLabel>Selected work</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--on-surface)',
            }}
          >
            Things I&apos;ve shipped
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        >
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--primary)',
              textDecoration: 'none',
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid transparent',
              transition: 'border-color .2s, background .2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'color-mix(in oklab, var(--primary) 30%, transparent)'
              el.style.background = 'color-mix(in oklab, var(--primary) 6%, transparent)'
              const arr = el.querySelector<HTMLElement>('.vap-arr')
              if (arr) arr.style.transform = 'translateX(5px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'transparent'
              el.style.background = 'transparent'
              const arr = el.querySelector<HTMLElement>('.vap-arr')
              if (arr) arr.style.transform = 'translateX(0)'
            }}
          >
            View all projects
            <span className="vap-arr" style={{ display: 'inline-flex', transition: 'transform 0.25s cubic-bezier(.23,1,.32,1)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="fp-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.09 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              style={{
                display: 'block',
                background: 'var(--surface-low)',
                border: '1px solid var(--outline)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'color-mix(in oklab, var(--primary) 40%, var(--outline))'
                el.style.boxShadow = 'var(--shadow-card-hover)'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--outline)'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />
              <div
                style={{
                  height: 140,
                  background: project.cover_image
                    ? `url(${project.cover_image}) center/cover no-repeat`
                    : 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, var(--surface-container)), var(--surface-container))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!project.cover_image && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 36,
                      color: 'color-mix(in oklab, var(--primary) 25%, transparent)',
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                    }}
                  >
                    {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
                  </span>
                )}
              </div>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--on-surface)', marginBottom: 6 }}>
                  {project.title}
                </div>
                {project.summary && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--on-surface-variant)', margin: '0 0 14px' }}>
                    {project.summary}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag.id}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--on-surface-variant)',
                        background: 'var(--surface-container)',
                        border: '1px solid var(--outline)',
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .fp-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
