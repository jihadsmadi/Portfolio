'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Capability } from '@/lib/types'

const EASE = [0.23, 1, 0.32, 1] as const

type Props = { capabilities: Capability[] }

const ICON_MAP: Record<string, React.ReactNode> = {
  fullstack: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  saas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  realtime: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  api: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
    </svg>
  ),
  erp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  auth: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  desktop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 20h8M12 18v2" />
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

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

export default function CapabilityStrip({ capabilities }: Props) {
  const track = [...capabilities, ...capabilities]
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        maxWidth: 'var(--width-max)',
        margin: '0 auto',
        padding: '64px 32px 0',
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <SectionLabel>What I build</SectionLabel>
      </motion.div>

      {/* Outer mask */}
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Inner scrolling track */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            width: 'max-content',
            animation: 'marquee-scroll 32s linear infinite',
          }}
        >
          {track.map((cap, i) => (
            <CapabilityCard key={`${cap.id}-${i}`} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ cap }: { cap: Capability }) {
  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        background: 'var(--surface-low)',
        border: '1px solid var(--outline)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'color-mix(in oklab, var(--primary) 40%, var(--outline))'
        el.style.boxShadow = 'var(--shadow-card)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--outline)'
        el.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--primary), var(--tint))',
          borderRadius: 'var(--radius-full)',
        }}
      />
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
          color: 'var(--primary)',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        {ICON_MAP[cap.icon_name.toLowerCase()] ?? DEFAULT_ICON}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: '-0.01em',
            color: 'var(--on-surface)',
            marginBottom: 6,
          }}
        >
          {cap.title}
        </div>
        <div
          style={{
            fontSize: 13.5,
            lineHeight: 1.6,
            color: 'var(--on-surface-variant)',
          }}
        >
          {cap.body}
        </div>
      </div>
    </div>
  )
}
