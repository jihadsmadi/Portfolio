'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { NavIcon } from '@/components/icons/NavIcons'
import { ThemeToggleIcons } from '@/components/icons/ThemeIcons'
import { BrandMark } from '@/components/layout/nav/NavBrand'
import Button from '@/components/ui/Button'
import { EASE } from '@/components/motion/constants'

type Props = {
  name: string
  onClose: () => void
  onToggleTheme: () => void
}

export default function MobileNavDrawer({ name, onClose, onToggleTheme }: Props) {
  const pathname = usePathname()

  function handleNavClick(isActive: boolean) {
    if (isActive) window.scrollTo({ top: 0, behavior: 'smooth' })
    onClose()
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close menu"
        className="nav-mob-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="nav-mob-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <div className="nav-drawer-accent" />

        <div className="nav-drawer-header">
          <div className="nav-drawer-brand">
            <BrandMark size="sm" />
            <div className="nav-drawer-brand-text">
              <div className="nav-drawer-name">{name}</div>
              <div className="nav-drawer-role">Full-stack engineer</div>
            </div>
          </div>
        </div>

        <nav className="nav-drawer-nav">
          <p className="nav-drawer-nav-label">Menu</p>
          <div className="nav-drawer-links">
            {NAV_LINKS.map(({ label, href }, i) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={href}
                    onClick={(e) => {
                      if (isActive) e.preventDefault()
                      handleNavClick(isActive)
                    }}
                    className={`nav-drawer-link${isActive ? ' nav-drawer-link--active' : ''}`}
                  >
                    <span className="nav-drawer-link-icon">
                      <NavIcon label={label} size={18} />
                    </span>
                    <span className="nav-drawer-link-label">{label}</span>
                    <svg className="nav-drawer-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        <div className="nav-drawer-footer">
          <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className="nav-drawer-theme">
            <span className="nav-drawer-theme-left">
              <ThemeToggleIcons />
              Appearance
            </span>
            <span className="nav-drawer-theme-hint">Tap to switch</span>
          </button>

          <Button href="/contact" variant="primary" arrow className="nav-drawer-cta" onClick={onClose}>
            Get in touch
          </Button>
        </div>
      </motion.aside>
    </>
  )
}
