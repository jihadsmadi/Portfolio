'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, PERSONAL } from '@/lib/constants'
import type { PersonalInfo, SocialLink } from '@/lib/types'

type Props = {
  personal: PersonalInfo | null
  socials: SocialLink[]
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M22 4.01s-2 .6-3 .8a4 4 0 0 0-7 2.7v1A10 10 0 0 1 3 4.5s-4 9 5 13c-1.95 1.3-3.9 1.8-6 1.5 9 5 20 0 20-11.5 0-.3 0-.6-.1-.9C19.94 5.93 22 4.01 22 4.01z" />
    </svg>
  ),
  email: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
}

function SocialIcon({ platform, icon_name }: Pick<SocialLink, 'platform' | 'icon_name'>) {
  const key = (icon_name ?? platform).toLowerCase()
  return <>{SOCIAL_ICONS[key] ?? SOCIAL_ICONS['email']}</>
}

const CHIPS = ['Problem Solver', 'Clean Code', 'Full-Stack', 'Systems Thinker']

function Chip({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.1)'}`,
        color: hovered ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.4)',
        background: hovered ? 'rgba(255,255,255,.07)' : 'transparent',
        transition: 'border-color .2s, color .2s, background .2s',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  )
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  Home: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Projects: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Blog: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Contact: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
}

function NavCard({ label, href }: { label: string; href: string }) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
  return (
    <Link
      href={href}
      onClick={isActive ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '10px 14px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255,255,255,.07)',
        background: 'rgba(255,255,255,.02)',
        color: 'rgba(255,255,255,.5)',
        textDecoration: 'none',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 13.5,
        transition: 'border-color .2s, background .2s, color .2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,.2)'
        el.style.background = 'rgba(255,255,255,.08)'
        el.style.color = 'rgba(255,255,255,.9)'
        const icon = el.querySelector<HTMLElement>('.nc-icon')
        if (icon) icon.style.color = 'rgba(255,255,255,.7)'
        const arr = el.querySelector<HTMLElement>('.nc-arr')
        if (arr) { arr.style.opacity = '1'; arr.style.transform = 'translateX(0)' }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,.07)'
        el.style.background = 'rgba(255,255,255,.02)'
        el.style.color = 'rgba(255,255,255,.5)'
        const icon = el.querySelector<HTMLElement>('.nc-icon')
        if (icon) icon.style.color = 'rgba(255,255,255,.25)'
        const arr = el.querySelector<HTMLElement>('.nc-arr')
        if (arr) { arr.style.opacity = '0'; arr.style.transform = 'translateX(-4px)' }
      }}
    >
      <span className="nc-icon" style={{ color: 'rgba(255,255,255,.25)', transition: 'color .2s', flexShrink: 0 }}>
        {NAV_ICONS[label]}
      </span>
      {label}
      <span
        className="nc-arr"
        style={{
          marginLeft: 'auto',
          fontSize: 12,
          opacity: 0,
          transform: 'translateX(-4px)',
          transition: 'opacity .2s, transform .2s',
          color: 'rgba(255,255,255,.6)',
        }}
      >
        →
      </span>
    </Link>
  )
}

export default function Footer({ personal, socials }: Props) {
  const name   = personal?.full_name ?? PERSONAL.name
  const isOpen = personal?.open_to_work ?? false
  const year   = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--inverse-surface)',
        color: 'var(--inverse-on-surface)',
        padding: '80px 0 40px',
      }}
    >
      <FooterStyles />

      <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', padding: '0 32px' }}>

        {/* Top grid — 3 columns */}
        <div
          className="footer-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.4fr',
            alignItems: 'start',
            gap: 64,
            marginBottom: 64,
          }}
        >

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span
                style={{
                  width: 36, height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--primary), var(--tint))',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff',
                }}
              >
                JS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16,
                  color: 'var(--inverse-on-surface)',
                }}
              >
                {name}
              </span>
            </div>

            {/* Short tagline */}
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                margin: '0 0 18px',
                color: 'color-mix(in oklab, var(--inverse-on-surface) 65%, transparent)',
                maxWidth: '26ch',
              }}
            >
              Building clean systems and thoughtful interfaces.
            </p>

            {/* Descriptor chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {CHIPS.map(chip => <Chip key={chip} label={chip} />)}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(s => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  style={{
                    width: 34, height: 34,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,.08)',
                    display: 'grid', placeItems: 'center',
                    color: 'color-mix(in oklab, var(--inverse-on-surface) 65%, transparent)',
                    transition: 'background .2s, color .2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,.15)'
                    el.style.color = 'var(--inverse-on-surface)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,.08)'
                    el.style.color = 'color-mix(in oklab, var(--inverse-on-surface) 65%, transparent)'
                  }}
                >
                  <SocialIcon platform={s.platform} icon_name={s.icon_name} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div>
            <h6 style={colHeadStyle}>Navigation</h6>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <NavCard key={href} label={label} href={href} />
              ))}
            </div>
          </div>

          {/* Contact CTA col */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h6 style={colHeadStyle}>Work together</h6>
            <p
              style={{
                fontSize: 22,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: 'var(--inverse-on-surface)',
                margin: '0 0 10px',
              }}
            >
              Have a project in mind?
            </p>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.65,
                color: 'color-mix(in oklab, var(--inverse-on-surface) 60%, transparent)',
                margin: '0 0 0',
              }}
            >
              I&apos;m available for freelance work and full-time roles. Let&apos;s build something solid together.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto', paddingTop: 24 }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  width: 'fit-content',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'color-mix(in oklab, var(--primary) 85%, white)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--primary)'
                }}
              >
                Start a conversation
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,.08)',
            fontSize: 13,
            color: 'color-mix(in oklab, var(--inverse-on-surface) 45%, transparent)',
          }}
        >
          {/* Left — open to work */}
          <div style={{ flex: 1 }}>
            {isOpen && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--secondary)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--secondary)',
                    display: 'inline-block',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                Open to work
              </span>
            )}
          </div>

          {/* Center — copyright */}
          <span>© {year} {name}</span>

          {/* Right — spacer to keep copyright centered */}
          <div style={{ flex: 1 }} />
        </div>

      </div>
    </footer>
  )
}

// ─── shared micro-styles ──────────────────────────────────────────────────────

function FooterStyles() {
  return (
    <style>{`
      @media (max-width: 767px) {
        .footer-cols {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
      }
    `}</style>
  )
}

// Append to footer JSX — the style tag is at top of component for simplicity

const colHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'color-mix(in oklab, var(--inverse-on-surface) 50%, transparent)',
  margin: '0 0 16px',
}
