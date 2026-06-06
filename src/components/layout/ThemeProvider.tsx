'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import storage from '@/lib/services/storage'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Read what the inline script already set on <html> — avoids a double read of localStorage
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light'
    setTheme(current)
  }, [])

  function toggle() {
    // Read from DOM — source of truth — not stale React state
    const current = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light'
    const next: Theme = current === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    storage.set<Theme>('theme', next)
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
