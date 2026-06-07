type Props = {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: Props) {
  return (
    <div className={['section-label', className].filter(Boolean).join(' ')}>
      <span className="section-label-bar" aria-hidden />
      {children}
    </div>
  )
}
