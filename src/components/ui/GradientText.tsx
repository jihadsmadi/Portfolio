type Props = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hero'
}

export default function GradientText({ children, className, variant = 'default' }: Props) {
  return (
    <span className={['gradient-text', variant === 'hero' && 'gradient-text-hero', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
