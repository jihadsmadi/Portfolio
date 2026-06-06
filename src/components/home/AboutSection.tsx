'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { PersonalInfo } from '@/lib/types'

const EASE = [0.23, 1, 0.32, 1] as const


type Props = { personal: PersonalInfo | null }

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
      <span
        style={{
          width: 24,
          height: 2,
          background: 'var(--primary)',
          borderRadius: 'var(--radius-full)',
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  )
}

export default function AboutSection({ personal }: Props) {
  const locationCity = personal?.location_city ?? 'Damascus'
  const locationCountry = personal?.location_country ?? 'SY'
  const openToWork = personal?.open_to_work ?? true
  const cvUrl = personal?.cv_url ?? null
  const avatarUrl = personal?.avatar_url ?? null
  const yearsExp = personal?.years_experience ?? 2
 

  const rawEngagement = personal?.work_engagement ?? 'parttime'
  const engagementLabel =
    rawEngagement === 'fulltime' ? 'Full-time'
    : rawEngagement === 'parttime' ? 'Part-time'
    : rawEngagement

  const rawLocationType = personal?.work_location_type ?? 'remote'
  const locationTypeLabel =
    rawLocationType === 'remote' ? 'Remote'
    : rawLocationType === 'hybrid' ? 'Hybrid'
    : rawLocationType === 'onsite' ? 'On-site'
    : rawLocationType

  const bio = personal?.bio ?? null
  const bioParagraphs: string[] = bio ? bio.split('\n\n').filter(Boolean) : []

  // scroll-entry ref for the whole section
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const stats = [
    {
      label: 'Location',
      value: locationCity,
      sub: locationCountry === 'SY' ? 'Syria' : locationCountry,
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      label: 'Experience',
      value: yearsExp,
      suffix: '+',
      sub: 'years',
      numeric: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      label: 'Status',
      value: openToWork ? 'Open' : 'Busy',
      sub: 'to work',
      highlight: openToWork,
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
    ...(openToWork ? [{
      label: 'Mode',
      value: engagementLabel,
      sub: locationTypeLabel,
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    }] : []),
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: 'var(--width-max)',
        margin: '0 auto',
        padding: '120px 32px',
      }}
    >
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
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 3.6vw, 56px)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 20px',
          color: 'var(--on-surface)',
        }}
      >
        Architecture is{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--tint))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          craft.
        </span>{' '}
        I treat it that way.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
        style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: 'var(--on-surface-variant)',
          maxWidth: '60ch',
          margin: '0 0 64px',
          fontWeight: 400,
        }}
      >
        Building production SaaS and ERP systems, from domain model to deployment.
        Clean architecture, real-time features, and a backend that doesn&apos;t fall over.
      </motion.p>

      {/* Content grid */}
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
          style={{ position: 'sticky', top: 96 }}
        >
          <div
            style={{
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: avatarUrl
                ? undefined
                : 'linear-gradient(160deg, var(--surface-container), var(--surface-high))',
              border: '1px solid var(--outline)',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt="Jihad Al-Smadi"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, color-mix(in oklab, var(--primary) 22%, transparent), transparent 50%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '32%',
                    transform: 'translateX(-50%)',
                    width: '44%',
                    aspectRatio: '1',
                    borderRadius: '50%',
                    background: 'color-mix(in oklab, var(--primary) 20%, var(--surface-high))',
                    border: '2px solid var(--outline)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '40%',
                    borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
                    background: 'color-mix(in oklab, var(--primary) 12%, var(--surface-high))',
                    border: '2px solid var(--outline)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 18,
                    left: 18,
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(0,0,0,0.25)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Jihad Al-Smadi
                </span>
              </>
            )}

            {/* Open to work badge */}
            <span
              style={{
                position: 'absolute',
                bottom: 18,
                right: 18,
                background: 'color-mix(in oklab, var(--secondary-container) 80%, transparent)',
                border: '1px solid color-mix(in oklab, var(--secondary) 30%, transparent)',
                color: 'var(--secondary)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: openToWork ? 'var(--secondary)' : 'var(--error)',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {openToWork && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'color-mix(in oklab, var(--secondary) 30%, transparent)',
                      animation: 'about-pulse 2s ease-out infinite',
                    }}
                  />
                )}
              </span>
              {openToWork ? 'Open to work' : 'Not available'}
            </span>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 28,
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
              margin: '0 0 20px',
              color: 'var(--on-surface)',
            }}
          >
            I design and build production-grade systems with clean architecture, strong domain
            modeling, and real-time capabilities.
          </h3>

          {bioParagraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 0 ? 18 : 16.5,
                lineHeight: 1.72,
                color: i === 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                margin: '0 0 22px',
                maxWidth: '64ch',
                paddingLeft: 16,
                borderLeft: '2px solid color-mix(in oklab, var(--primary) 30%, transparent)',
              }}
            >
              {para}
            </p>
          ))}

          {/* Stats strip */}
          <div
            style={{
              display: 'flex',
              marginTop: 32,
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--outline)',
              overflow: 'hidden',
              background: 'var(--surface-low)',
            }}
          >
            {stats.map(({ label, value, sub, highlight, numeric, suffix, icon }, i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  padding: '18px 20px',
                  borderLeft: i > 0 ? '1px solid var(--outline)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--surface-container)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--on-surface-variant)',
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: 'var(--primary)', opacity: 0.7 }}>{icon}</span>
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    color: highlight ? 'var(--secondary)' : 'var(--on-surface)',
                    lineHeight: 1.2,
                  }}
                >
                  {numeric ? `${value}${suffix ?? ''}` : value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--on-surface-variant)',
                    marginTop: 2,
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
            <button
              onClick={() => cvUrl && (window.location.href = `${cvUrl}?download`)}
              disabled={!cvUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: cvUrl
                  ? 'linear-gradient(135deg, var(--primary), var(--tint))'
                  : 'var(--surface-container)',
                color: cvUrl ? '#fff' : 'var(--on-surface-variant)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.02em',
                boxShadow: cvUrl ? 'var(--shadow-btn)' : 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: cvUrl ? 'pointer' : 'default',
                opacity: cvUrl ? 1 : 0.6,
              }}
              onMouseEnter={e => {
                if (!cvUrl) return
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 24px -6px rgba(53,37,205,.55)'
              }}
              onMouseLeave={e => {
                if (!cvUrl) return
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'var(--shadow-btn)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              {cvUrl ? 'Download CV' : 'CV coming soon'}
            </button>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--on-surface)',
                border: '1.5px solid var(--outline)',
                background: 'var(--surface-low)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--primary)'
                el.style.color = 'var(--primary)'
                const arr = el.querySelector<HTMLElement>('.about-arr')
                if (arr) arr.style.transform = 'translateX(5px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--outline)'
                el.style.color = 'var(--on-surface)'
                const arr = el.querySelector<HTMLElement>('.about-arr')
                if (arr) arr.style.transform = 'translateX(0)'
              }}
            >
              Get in touch
              <span className="about-arr" style={{ transition: 'transform 0.25s cubic-bezier(.23,1,.32,1)' }}>→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes about-pulse {
          0%   { transform: scale(1); opacity: .8 }
          100% { transform: scale(2.4); opacity: 0 }
        }
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-grid > *:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}
