'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { label: 'Overview',      href: '/admin',              icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'Personal',      href: '/admin/personal',     icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { label: 'Projects',      href: '/admin/projects',     icon: 'M3 7h18M3 12h18M3 17h18' },
  { label: 'Blog',          href: '/admin/blog',         icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
  { label: 'Skills',        href: '/admin/skills',       icon: 'M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { label: 'Tech Stack',    href: '/admin/tech-stack',   icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { label: 'Capabilities',  href: '/admin/capabilities', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Experience',    href: '/admin/experience',   icon: 'M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z' },
  { label: 'Education',     href: '/admin/education',    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z' },
  { label: 'Social Links',  href: '/admin/social-links', icon: 'M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1' },
  { label: 'Categories',    href: '/admin/categories',   icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A1.994 1.994 0 0 1 3 12V7a4 4 0 0 1 4-4z' },
  { label: 'Tags',          href: '/admin/tags',         icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A1.994 1.994 0 0 1 3 12V7a4 4 0 0 1 4-4z' },
  { label: 'Messages',      href: '/admin/messages',     icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <nav
      style={{
        width: 240,
        minHeight: '100vh',
        background: 'var(--surface-low)',
        borderRight: '1px solid var(--outline)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--outline)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius)',
              background: 'linear-gradient(135deg, var(--primary), var(--tint))',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            JS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--on-surface)' }}>
              Admin
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--on-surface-variant)' }}>
              Portfolio CMS
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV.map(({ label, href, icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius)',
                marginBottom: 2,
                fontFamily: 'var(--font-body)',
                fontWeight: active ? 600 : 400,
                fontSize: 13.5,
                color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
                background: active ? 'color-mix(in oklab, var(--primary) 10%, transparent)' : 'transparent',
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                if (!active) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--surface-container)'
                  el.style.color = 'var(--on-surface)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = 'var(--on-surface-variant)'
                }
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d={icon} />
              </svg>
              {label}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--outline)' }}>
        <Link
          href="/"
          target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--on-surface-variant)', textDecoration: 'none', marginBottom: 4 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
          View site
        </Link>
        <button
          onClick={logout}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', width: '100%', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
          Sign out
        </button>
      </div>
    </nav>
  )
}
