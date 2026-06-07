'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, PERSONAL } from '@/lib/constants'
import type { PersonalInfo, SocialLink } from '@/lib/types'
import { NavIcon } from '@/components/icons/NavIcons'
import { SocialLinks, BrandMark } from '@/components/layout/nav/NavBrand'
import Button from '@/components/ui/Button'

type Props = {
  personal: PersonalInfo | null
  socials: SocialLink[]
}

const CHIPS = ['Problem Solver', 'Clean Code', 'Full-Stack', 'Systems Thinker']

function FooterNavCard({ label, href }: { label: string; href: string }) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
  return (
    <Link
      href={href}
      className="footer-nav-card"
      onClick={isActive ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
    >
      <span className="footer-nav-card-icon">
        <NavIcon label={label} size={14} />
      </span>
      {label}
      <span className="footer-nav-card-arrow">→</span>
    </Link>
  )
}

export default function Footer({ personal, socials }: Props) {
  const name = personal?.full_name ?? PERSONAL.name
  const isOpen = personal?.open_to_work ?? false
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-cols">
          <div>
            <div className="footer-brand-row">
              <BrandMark />
              <span className="footer-brand-name">{name}</span>
            </div>
            <p className="footer-tagline">Building clean systems and thoughtful interfaces.</p>
            <div className="footer-chips">
              {CHIPS.map(chip => (
                <span key={chip} className="footer-chip">{chip}</span>
              ))}
            </div>
            <SocialLinks links={socials} />
          </div>

          <div>
            <h6 className="footer-col-head">Navigation</h6>
            <div className="footer-nav-grid">
              {NAV_LINKS.map(({ label, href }) => (
                <FooterNavCard key={href} label={label} href={href} />
              ))}
            </div>
          </div>

          <div className="footer-cta-col">
            <h6 className="footer-col-head">Work together</h6>
            <p className="footer-cta-title">Have a project in mind?</p>
            <p className="footer-cta-lead">
              I&apos;m available for freelance work and full-time roles. Let&apos;s build something solid together.
            </p>
            <div className="footer-cta-actions">
              <Button href="/contact" variant="primary" arrow>
                Start a conversation
              </Button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            {isOpen && (
              <span className="footer-open-badge">
                <span className="footer-open-dot">
                  <span className="status-pulse footer-open-dot-ring" aria-hidden />
                </span>
                Open to work
              </span>
            )}
          </div>
          <span>© {year} {name}</span>
          <div className="footer-bottom-right" />
        </div>
      </div>
    </footer>
  )
}
