'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import type { PersonalInfo, SocialLink } from '@/lib/types'
import PixelWalker from '@/components/home/PixelWalker'

const EASE = [0.23, 1, 0.32, 1] as const

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

type Props = {
  personal: PersonalInfo | null
  socialLinks: SocialLink[]
}

export default function HeroSection({ personal }: Props) {
  const openToWork = personal?.open_to_work ?? true
  const title = personal?.title ?? ''

  return (
    <section
      style={{
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background mesh */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 60% -10%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 50% at 0% 80%, color-mix(in oklab, var(--secondary) 10%, transparent), transparent 60%)
          `,
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: 'radial-gradient(var(--outline) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 55% 35%, #000 20%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse 70% 70% at 55% 35%, #000 20%, transparent 70%)',
          opacity: 0.6,
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: 'var(--width-max)',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* ── Left: text (stagger entry) ── */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          {/* Status chip */}
          <motion.div variants={heroItem}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'color-mix(in oklab, var(--secondary-container) 60%, transparent)',
                border: '1px solid color-mix(in oklab, var(--secondary) 30%, transparent)',
                color: 'var(--secondary)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: openToWork ? 'var(--secondary)' : 'var(--error)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                {openToWork && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'color-mix(in oklab, var(--secondary) 30%, transparent)',
                      animation: 'hero-pulse 2s ease-out infinite',
                    }}
                  />
                )}
              </span>
              {openToWork
                ? (personal?.availability_note ?? 'Available for work')
                : 'Not currently available'}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 5.2vw, 82px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '0 0 24px',
              color: 'var(--on-surface)',
            }}
          >
            Engineered<br />
            to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #7c6fff 50%, var(--tint) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              last.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={heroItem}
            style={{
              fontSize: 19,
              lineHeight: 1.65,
              color: 'var(--on-surface-variant)',
              margin: '0 0 42px',
              maxWidth: '54ch',
              fontWeight: 400,
            }}
          >
            {title}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroItem} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/projects"
              className="hero-cta-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--primary), var(--tint))',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.02em',
                boxShadow: 'var(--shadow-btn)',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 24px -6px rgba(53,37,205,.55)'
                const arr = el.querySelector<HTMLElement>('.arr')
                if (arr) arr.style.transform = 'translateX(5px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'var(--shadow-btn)'
                const arr = el.querySelector<HTMLElement>('.arr')
                if (arr) arr.style.transform = 'translateX(0)'
              }}
            >
              View projects
              <span className="arr" style={{ transition: 'transform 0.25s cubic-bezier(.23,1,.32,1)' }}>→</span>
            </Link>

            <Link
              href="/contact"
              className="hero-cta-ghost"
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
                el.style.background = 'color-mix(in oklab, var(--primary) 5%, var(--surface-low))'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--outline)'
                el.style.color = 'var(--on-surface)'
                el.style.background = 'var(--surface-low)'
              }}
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={heroItem}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 48,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--on-surface-variant)',
            }}
          >
            <span
              style={{
                flex: 1,
                maxWidth: 48,
                height: 1,
                background: 'currentColor',
                opacity: 0.4,
              }}
            />
            Scroll to explore
          </motion.div>
        </motion.div>

        {/* ── Right: pixel walker scene ── */}
        <motion.div
          className="hero-pixel"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          style={{ height: 300 }}
        >
          <PixelWalker />
        </motion.div>
      </div>

      <style>{`
        @keyframes hero-pulse {
          0%   { transform: scale(1); opacity: .8 }
          100% { transform: scale(2.4); opacity: 0 }
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 0 20px !important;
          }
          .hero-pixel { display: none !important; }
        }
      `}</style>
    </section>
  )
}
