import Link from 'next/link'
import ArrowRight from '@/components/icons/ArrowRight'

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'link'
  arrow?: boolean
  className?: string
  children: React.ReactNode
}

type LinkProps = BaseProps & {
  href: string
  onClick?: () => void
  type?: never
  disabled?: never
}

type ButtonProps = BaseProps & {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button(props: LinkProps | ButtonProps) {
  const variant = props.variant ?? 'primary'
  const classes = ['btn', `btn-${variant}`, props.className].filter(Boolean).join(' ')

  const content = (
    <>
      {props.children}
      {props.arrow && (
        <span className="btn-arrow">
          <ArrowRight size={variant === 'link' ? 13 : 14} />
        </span>
      )}
    </>
  )

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('mailto:') || props.href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={props.href}
          className={classes}
          onClick={props.onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {content}
    </button>
  )
}
