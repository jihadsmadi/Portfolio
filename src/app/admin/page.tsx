'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

const SECTIONS = [
  { label: 'Projects',     table: 'projects',      href: '/admin/projects',      icon: 'M3 7h18M3 12h18M3 17h18', color: 'var(--primary)' },
  { label: 'Blog Posts',   table: 'blog_posts',    href: '/admin/blog',          icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z', color: 'var(--tint)' },
  { label: 'Skills',       table: 'skills',        href: '/admin/skills',        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: '#6366f1' },
  { label: 'Capabilities', table: 'capabilities',  href: '/admin/capabilities',  icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#0ea5e9' },
  { label: 'Experience',   table: 'work_experience', href: '/admin/experience',  icon: 'M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z', color: '#10b981' },
  { label: 'Messages',     table: 'contact_msgs',  href: '/admin/messages',      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z', color: '#f59e0b' },
] as const

type Count = { table: string; count: number; extra?: number }

function StatCard({ label, count, href, icon, color, extra }: { label: string; count: number | null; href: string; icon: string; color: string; extra?: number }) {
  return (
    <Link
      href={href}
      style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: '20px 24px', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s, border-color 0.2s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-card-hover)'; el.style.borderColor = 'color-mix(in oklab, var(--primary) 30%, transparent)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.borderColor = 'var(--outline)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: `color-mix(in oklab, ${color} 15%, transparent)`, display: 'grid', placeItems: 'center', color }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={icon} /></svg>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--on-surface)', lineHeight: 1 }}>
        {count === null ? '—' : count}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 4 }}>
        {label}
        {label === 'Messages' && extra !== undefined && extra > 0 && (
          <span style={{ marginLeft: 6, background: 'var(--primary)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 'var(--radius-full)', padding: '1px 6px' }}>{extra} new</span>
        )}
      </div>
    </Link>
  )
}

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Count[]>([])
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        SECTIONS.map(async s => {
          const { count } = await supabase.from(s.table).select('*', { count: 'exact', head: true })
          return { table: s.table, count: count ?? 0 }
        })
      )
      setCounts(results)

      const { count: unreadCount } = await supabase.from('contact_msgs').select('*', { count: 'exact', head: true }).eq('read', false)
      setUnread(unreadCount ?? 0)
    }
    load()
  }, [])

  function getCount(table: string) {
    return counts.find(c => c.table === table)?.count ?? null
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>
          Overview
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
          Manage your portfolio content
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {SECTIONS.map(s => (
          <StatCard
            key={s.table}
            label={s.label}
            count={getCount(s.table)}
            href={s.href}
            icon={s.icon}
            color={s.color}
            extra={s.table === 'contact_msgs' ? unread : undefined}
          />
        ))}
      </div>

      {/* Quick links */}
      <div style={{ background: 'var(--surface-low)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 16 }}>
          Quick actions
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: '+ New project',    href: '/admin/projects' },
            { label: '+ New blog post',  href: '/admin/blog' },
            { label: '+ New skill',      href: '/admin/skills' },
            { label: 'Edit personal',    href: '/admin/personal' },
            { label: 'View site',        href: '/' },
          ].map(a => (
            <Link
              key={a.href}
              href={a.href}
              style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--outline)', background: 'var(--surface)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, color: 'var(--on-surface)', textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--primary)'; el.style.color = 'var(--primary)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--outline)'; el.style.color = 'var(--on-surface)' }}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
