type Props = {
  className?: string
  position?: 'top' | 'inline'
}

export default function AccentBar({ className, position = 'top' }: Props) {
  return (
    <div
      className={['accent-bar', position === 'top' && 'accent-bar-top', className].filter(Boolean).join(' ')}
      aria-hidden
    />
  )
}
