'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, type RefObject } from 'react'
import { NAV_LINKS } from '@/lib/constants'

type Props = {
  linksRef: RefObject<HTMLDivElement | null>
  pillRef: RefObject<HTMLSpanElement | null>
}

export default function DesktopNavLinks({ linksRef, pillRef }: Props) {
  const pathname = usePathname()

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
  }, [pathname, linksRef, pillRef])

  return (
    <div ref={linksRef} className="nav-desktop-links">
      <span ref={pillRef} className="nav-active-pill" />
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            data-nav-link="true"
            className={`nav-desktop-link${isActive ? ' nav-desktop-link--active' : ''}`}
            onClick={isActive ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
