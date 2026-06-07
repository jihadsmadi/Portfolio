type Props = { size?: number; className?: string }

export default function ArrowRight({ size = 14, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
