'use client'

import { motion } from 'framer-motion'
import type { PersonalInfo, SocialLink } from '@/lib/types'
import PixelWalker from '@/components/home/PixelWalker'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
import SectionShell from '@/components/ui/SectionShell'
import { EASE, DURATION } from '@/components/motion/constants'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
}

type Props = {
  personal: PersonalInfo | null
  socialLinks: SocialLink[]
}

export default function HeroSection({ personal }: Props) {
  const openToWork = personal?.open_to_work ?? true
  const title = personal?.title ?? ''

  return (
    <SectionShell className="hero-section" padding="hero">
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

      <div className="hero-grid">
        <motion.div variants={heroContainer} initial="hidden" animate="show">
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
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: openToWork ? 'var(--secondary)' : 'var(--error)', position: 'relative', flexShrink: 0 }}>
                {openToWork && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'color-mix(in oklab, var(--secondary) 30%, transparent)',
                    }}
                    className="status-pulse"
                  />
                )}
              </span>
              {openToWork ? (personal?.availability_note ?? 'Available for work') : 'Not currently available'}
            </div>
          </motion.div>

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
            to <GradientText variant="hero">last.</GradientText>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="hero-sub"
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

          <motion.div variants={heroItem} className="home-cta-row hero-ctas" style={{ gap: 14 }}>
            <Button href="/projects" variant="primary" arrow>
              View projects
            </Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-scroll-hint"
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
            <span style={{ flex: 1, maxWidth: 48, height: 1, background: 'currentColor', opacity: 0.4 }} />
            Scroll to explore
          </motion.div>
        </motion.div>

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
    </SectionShell>
  )
}
