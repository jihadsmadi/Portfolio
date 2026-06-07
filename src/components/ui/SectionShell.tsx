'use client'

import { forwardRef } from 'react'

export type SectionPadding = 'page' | 'full' | 'inset' | 'strip' | 'hero' | 'none'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div'
  padding?: SectionPadding
  style?: React.CSSProperties
}

function shellClasses(className: string | undefined, padding: SectionPadding) {
  return [
    'section-shell',
    padding !== 'none' && `section-shell--${padding}`,
    className,
  ].filter(Boolean).join(' ')
}

const SectionShell = forwardRef<HTMLElement, Props>(function SectionShell(
  { children, className, as = 'section', padding = 'inset', style },
  ref,
) {
  const classes = shellClasses(className, padding)

  if (as === 'div') {
    return (
      <div ref={ref as React.ForwardedRef<HTMLDivElement>} className={classes} style={style}>
        {children}
      </div>
    )
  }

  return (
    <section ref={ref} className={classes} style={style}>
      {children}
    </section>
  )
})

export default SectionShell
