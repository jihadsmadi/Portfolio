'use client'

import { useEffect } from 'react'

export default function ScrollReset() {
  useEffect(() => {
    // Instant jump to top before the browser restores scroll position
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return null
}
