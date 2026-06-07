type Props = { size?: number; className?: string }

export default function ArrowLeft({ size = 14, className }: Props) {
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
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}
