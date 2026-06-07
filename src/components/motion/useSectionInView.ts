'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { VIEWPORT_MARGIN, type ViewMargin } from './constants'

export function useSectionInView(margin: ViewMargin = VIEWPORT_MARGIN) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin })
  return { ref, inView }
}
