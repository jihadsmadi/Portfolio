function IconBtn({ icon, onClick, title, danger }: { icon: string; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = danger ? 'color-mix(in oklab, var(--error) 10%, var(--surface))' : 'var(--surface-container)'
        el.style.borderColor = danger ? 'color-mix(in oklab, var(--error) 35%, transparent)' : 'var(--outline-variant)'
        el.style.transform = 'scale(1.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'var(--surface)'
        el.style.borderColor = 'var(--outline)'
        el.style.transform = 'scale(1)'
      }}
      style={{
        width: 30, height: 30, borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--outline)', background: 'var(--surface)',
        display: 'grid', placeItems: 'center', cursor: 'pointer',
        color: danger ? 'var(--error)' : 'var(--on-surface-variant)',
        transition: 'background 0.15s, border-color 0.15s, transform 0.12s',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d={icon} />
      </svg>
    </button>
  )
}

export function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <IconBtn icon="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" onClick={onEdit} title="Edit" />
      <IconBtn icon="M3 6h18M19 6l-1 14H6L5 6M10 6V4h4v2" onClick={onDelete} title="Delete" danger />
    </div>
  )
}
