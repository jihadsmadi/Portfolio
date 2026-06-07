type Props = {
  children: React.ReactNode
  className?: string
}

export default function Tag({ children, className }: Props) {
  return <span className={['tag', className].filter(Boolean).join(' ')}>{children}</span>
}
