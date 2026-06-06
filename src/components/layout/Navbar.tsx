'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { NAV_LINKS } from '@/lib/constants'
import type { PersonalInfo } from '@/lib/types'

type Props = {
  personal: Pick<PersonalInfo, 'full_name'> | null
}

export default function Navbar({ personal }: Props) {
  const pathname = usePathname()
  const { toggle } = useTheme()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Scroll effects
  useEffect(() => {
    const nav = navRef.current
    const bar = progressRef.current
    if (!nav || !bar) return

    function onScroll() {
      const y = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      if (y > 20) {
        nav!.style.borderBottomColor = 'var(--outline)'
        nav!.style.boxShadow = 'var(--shadow-nav)'
      } else {
        nav!.style.borderBottomColor = 'transparent'
        nav!.style.boxShadow = 'none'
      }
      const pct = max > 0 ? (y / max) * 100 : 0
      bar!.style.width = `${pct}%`
      bar!.style.opacity = pct > 2 ? '1' : '0'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Liquid pill
  useEffect(() => {
    const container = linksRef.current
    const pill = pillRef.current
    if (!container || !pill) return

    const links = container.querySelectorAll<HTMLElement>('[data-nav-link]')
    const activeIdx = NAV_LINKS.findIndex(({ href }) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href),
    )
    if (activeIdx >= 0 && links[activeIdx]) {
      const cRect = container.getBoundingClientRect()
      const lRect = links[activeIdx].getBoundingClientRect()
      pill.style.left = `${lRect.left - cRect.left}px`
      pill.style.width = `${lRect.width}px`
      pill.style.opacity = '1'
    }
  }, [pathname])

  const name = personal?.full_name ?? 'Jihad Al-Smadi'

  return (
    <>
      <style>{`
        .theme-btn {
          width: 36px; height: 36px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--outline);
          background: none;
          display: grid; place-items: center;
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          flex-shrink: 0;
        }
        .theme-btn:hover { background: var(--surface-container); border-color: var(--primary); color: var(--primary); }
        .theme-btn .t-moon { display: block; }
        .theme-btn .t-sun  { display: none; }
        [data-theme="dark"] .theme-btn .t-moon { display: none; }
        [data-theme="dark"] .theme-btn .t-sun  { display: block; }

        .nav-desktop-links { display: flex; align-items: center; gap: 2px; }
        .nav-ham-btn {
          display: none;
          width: 36px; height: 36px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--outline);
          background: none;
          place-items: center;
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: background .2s, border-color .2s;
        }
        .nav-ham-btn:hover { background: var(--surface-container); border-color: var(--primary); }

        .nav-mob-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 49;
          background: color-mix(in oklab, var(--inverse-surface) 85%, transparent);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          flex-direction: column;
          align-items: stretch;
          padding-top: 72px;
        }
        .nav-mob-overlay.open { display: flex; }
        .nav-mob-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px 20px 40px;
          gap: 6px;
          overflow-y: auto;
        }

        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-theme-sep { display: none !important; }
          .nav-ham-btn { display: grid; }
        }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'color-mix(in oklab, var(--surface) 72%, transparent)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          backdropFilter: 'blur(12px) saturate(180%)',
          borderBottom: '1px solid transparent',
          boxShadow: 'none',
          transition: 'border-color .3s, box-shadow .3s',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--width-max)',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            gap: 16,
          }}
        >
          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary), var(--tint))', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.01em', flexShrink: 0 }}>
              JS
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--on-surface)' }}>
              {name}
            </span>
          </Link>

          {/* Desktop: nav links + theme */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <div ref={linksRef} className="nav-desktop-links" style={{ position: 'relative' }}>
              <span
                ref={pillRef}
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: 0, height: 36, opacity: 0, background: 'var(--surface-container)', borderRadius: 'var(--radius-full)', transition: 'left .3s cubic-bezier(.23,1,.32,1), width .3s cubic-bezier(.23,1,.32,1), opacity .2s', pointerEvents: 'none', zIndex: 0 }}
              />
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    data-nav-link="true"
                    onClick={isActive ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
                    style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 'var(--radius-full)', color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)', background: 'none', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--on-surface)' }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--on-surface-variant)' }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            <div className="nav-theme-sep" style={{ paddingInlineStart: 16, borderInlineStart: '1px solid var(--outline)', marginInlineStart: 8 }}>
              <button onClick={toggle} aria-label="Toggle theme" className="theme-btn">
                <svg className="t-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <svg className="t-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile: hamburger */}
          <button className="nav-ham-btn" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            )}
          </button>
        </div>

        <div ref={progressRef} style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: '0%', opacity: 0, background: 'linear-gradient(90deg, var(--primary), var(--tint))', transition: 'width 0.08s linear, opacity .3s', borderRadius: '0 var(--radius-full) var(--radius-full) 0', pointerEvents: 'none' }} />
      </nav>

      {/* Mobile overlay menu */}
      <div className={`nav-mob-overlay${menuOpen ? ' open' : ''}`}>
        <div className="nav-mob-menu">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={isActive ? (e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) } : () => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-xl)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '-0.01em',
                  color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.85)',
                  background: isActive ? 'color-mix(in oklab, var(--primary) 15%, transparent)' : 'transparent',
                  textDecoration: 'none',
                  border: `1px solid ${isActive ? 'color-mix(in oklab, var(--primary) 30%, transparent)' : 'transparent'}`,
                  transition: 'background .15s',
                }}
              >
                {label}
                {isActive && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            )
          })}

          <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={toggle} aria-label="Toggle theme" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.7)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer', flex: 1 }}>
              <svg className="t-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <svg className="t-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              Toggle theme
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
