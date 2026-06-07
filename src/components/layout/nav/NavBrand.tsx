import Link from 'next/link'
import type { SocialLink } from '@/lib/types'

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

export function SocialIcon({ platform, icon_name }: Pick<SocialLink, 'platform' | 'icon_name'>) {
  const key = (icon_name ?? platform).toLowerCase()
  return <>{SOCIAL_ICONS[key] ?? SOCIAL_ICONS.email}</>
}

type SocialLinksProps = {
  links: SocialLink[]
  className?: string
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={['footer-socials', className].filter(Boolean).join(' ')}>
      {links.map(s => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.platform}
          className="footer-social-link"
        >
          <SocialIcon platform={s.platform} icon_name={s.icon_name} />
        </a>
      ))}
    </div>
  )
}

export function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`brand-mark brand-mark--${size}`}>JS</span>
  )
}

export function NavBrandLink({ name, firstName }: { name: string; firstName: string }) {
  return (
    <Link href="/" className="nav-brand">
      <BrandMark />
      <span className="nav-brand-name">{name}</span>
      <div className="nav-mob-brand-meta">
        <span>{firstName}</span>
        <span>Portfolio</span>
      </div>
    </Link>
  )
}
