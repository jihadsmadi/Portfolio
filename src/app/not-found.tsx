import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
      }}
    >
      <style>{`
        .nf-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px; border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--primary), var(--tint));
          color: #fff; font-family: var(--font-body); font-weight: 600;
          font-size: 14px; text-decoration: none;
          box-shadow: var(--shadow-btn);
          transition: opacity .2s;
        }
        .nf-btn-primary:hover { opacity: .88; }
        .nf-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px; border-radius: var(--radius-full);
          border: 1.5px solid var(--outline); background: var(--surface-low);
          color: var(--on-surface); font-family: var(--font-body); font-weight: 600;
          font-size: 14px; text-decoration: none;
          transition: border-color .2s, color .2s;
        }
        .nf-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
        .nf-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
      `}</style>

      {/* minimal header */}
      <header style={{ borderBottom: '1px solid var(--outline-variant)', padding: '0 32px', flexShrink: 0 }}>
        <div style={{ maxWidth: 'var(--width-max)', margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="nf-brand">
            <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary), var(--tint))', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>
              JS
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em', color: 'var(--on-surface)' }}>
              Jihad Al-Smadi
            </span>
          </Link>
          <Link href="/" className="nf-btn-ghost" style={{ padding: '8px 18px', fontSize: 13 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Go home
          </Link>
        </div>
      </header>

      {/* main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* background mesh */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, color-mix(in oklab, var(--tint) 8%, transparent), transparent 60%)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(var(--outline) 1px, transparent 1px)', backgroundSize: '32px 32px', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 80%)', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 80%)', opacity: 0.5 }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 560 }}>
          {/* 404 */}
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(96px, 18vw, 160px)', lineHeight: 1, letterSpacing: '-0.05em', background: 'linear-gradient(135deg, var(--primary), var(--tint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8, userSelect: 'none' }}>
            404
          </div>

          {/* label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 18 }}>
            <span style={{ width: 20, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
            Page not found
            <span style={{ width: 20, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '-0.025em', lineHeight: 1.2, color: 'var(--on-surface)', margin: '0 0 14px' }}>
            Nothing here but clean code.
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--on-surface-variant)', margin: '0 0 40px' }}>
            This page doesn&apos;t exist or has been moved. Head back and find what you need.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="nf-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to home
            </Link>
            <Link href="/projects" className="nf-btn-ghost">
              View projects
            </Link>
          </div>
        </div>
      </main>

      {/* minimal footer */}
      <footer style={{ borderTop: '1px solid var(--outline-variant)', padding: '18px 32px', textAlign: 'center', fontSize: 13, color: 'var(--on-surface-variant)', flexShrink: 0 }}>
        © {new Date().getFullYear()} Jihad Al-Smadi
      </footer>
    </div>
  )
}
