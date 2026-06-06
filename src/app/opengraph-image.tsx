import { ImageResponse } from 'next/og'
import { getPersonalInfo } from '@/lib/services/personal'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const personal = await getPersonalInfo()
  const name  = personal?.full_name  ?? 'Jihad Al-Smadi'
  const title = personal?.title      ?? 'Full-stack Engineer'

  return new ImageResponse(
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: '#0f172a',
        padding: '60px 80px',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #a5a0ff, #8b85ff)' }} />

      {/* site label */}
      <div style={{ display: 'flex', color: '#a5a0ff', fontSize: 16, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 48 }}>
        jihad-smadi.dev
      </div>

      {/* name */}
      <div style={{ display: 'flex', color: '#e2e8f8', fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
        {name}
      </div>

      {/* title */}
      <div style={{ display: 'flex', color: '#a8b4c8', fontSize: 32, fontWeight: 400, lineHeight: 1.4 }}>
        {title}
      </div>

      {/* bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 'auto' }}>
        <div style={{ width: 40, height: 3, background: '#a5a0ff', borderRadius: 99 }} />
        <div style={{ display: 'flex', color: '#64748b', fontSize: 18 }}>
          Building production SaaS &amp; ERP systems with .NET · React · Angular
        </div>
      </div>
    </div>,
    { ...size },
  )
}
