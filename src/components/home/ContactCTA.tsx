'use client'

import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '0 32px 140px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, var(--surface-low)), var(--surface-low))',
          border: '1px solid color-mix(in oklab, var(--primary) 20%, var(--outline))',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(48px, 6vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--primary), var(--tint))' }} />

        {/* Decorative blur blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'color-mix(in oklab, var(--primary) 6%, transparent)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'color-mix(in oklab, var(--tint) 6%, transparent)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'color-mix(in oklab, var(--secondary) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--secondary) 25%, transparent)',
              color: 'var(--secondary)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--secondary)', flexShrink: 0 }} />
            Open to work
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
              color: 'var(--on-surface)',
            }}
          >
            Have a project in mind?{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Let&apos;s talk.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--on-surface-variant)',
              maxWidth: '52ch',
              margin: '0 auto 36px',
            }}
          >
            From architecture reviews to full-stack builds — I work best on complex problems that need clean, maintainable solutions.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 32px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--primary), var(--tint))',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-btn)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 24px -6px rgba(53,37,205,.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'var(--shadow-btn)'
              }}
            >
              Start a conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="mailto:jihadsmadi41@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 32px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--outline)',
                background: 'var(--surface-low)',
                color: 'var(--on-surface)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--primary)'
                el.style.color = 'var(--primary)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--outline)'
                el.style.color = 'var(--on-surface)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              Send email directly
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
