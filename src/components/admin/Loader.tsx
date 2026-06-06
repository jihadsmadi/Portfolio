export default function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          border: '3px solid color-mix(in oklab, var(--primary) 15%, transparent)',
          borderTopColor: 'var(--primary)',
          animation: 'ld-spin 0.7s linear infinite',
        }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--on-surface-variant)', letterSpacing: '0.01em' }}>Loading…</span>
      </div>
      <style>{`@keyframes ld-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
