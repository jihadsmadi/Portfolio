export const EASE = [0.23, 1, 0.32, 1] as const

export const VIEWPORT_MARGIN = '-80px' as const
export const VIEWPORT_MARGIN_LOOSE = '-60px' as const

export type ViewMargin = typeof VIEWPORT_MARGIN | typeof VIEWPORT_MARGIN_LOOSE

export const DURATION = {
  fast: 0.45,
  normal: 0.55,
  slow: 0.65,
} as const
