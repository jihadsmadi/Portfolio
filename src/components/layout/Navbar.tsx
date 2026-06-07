'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { ThemeToggleIcons } from '@/components/icons/ThemeIcons'
import { NavBrandLink } from '@/components/layout/nav/NavBrand'
import DesktopNavLinks from '@/components/layout/nav/DesktopNavLinks'
import MobileNavDrawer from '@/components/layout/nav/MobileNavDrawer'
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

  const name = personal?.full_name ?? 'Jihad Al-Smadi'
  const firstName = name.split(' ')[0]

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const nav = navRef.current
    const bar = progressRef.current
    if (!nav || !bar) return

    function onScroll() {
      const y = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      if (y > 20) {
        nav!.classList.add('nav-bar--scrolled')
      } else {
        nav!.classList.remove('nav-bar--scrolled')
      }
      const pct = max > 0 ? (y / max) * 100 : 0
      bar!.style.width = `${pct}%`
      bar!.style.opacity = pct > 2 ? '1' : '0'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav ref={navRef} className={`nav-bar${menuOpen ? ' menu-open' : ''}`}>
        <div className="nav-inner">
          <NavBrandLink name={name} firstName={firstName} />

          <div className="nav-actions">
            <DesktopNavLinks linksRef={linksRef} pillRef={pillRef} />

            <div className="nav-theme-sep">
              <button onClick={toggle} aria-label="Toggle theme" className="theme-btn">
                <ThemeToggleIcons />
              </button>
            </div>

            <button
              type="button"
              className={`nav-mob-toggle${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="ham-line" aria-hidden />
              <span className="ham-line" aria-hidden />
              <span className="ham-line" aria-hidden />
            </button>
          </div>
        </div>

        <div ref={progressRef} className="nav-progress" />
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <MobileNavDrawer
            name={name}
            onClose={() => setMenuOpen(false)}
            onToggleTheme={toggle}
          />
        )}
      </AnimatePresence>
    </>
  )
}
