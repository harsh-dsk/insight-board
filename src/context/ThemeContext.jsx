/**
 * context/ThemeContext.jsx
 *
 * Provides theme (light/dark/system) state to the application.
 * Persists preference to localStorage and syncs with the OS via
 * the `prefers-color-scheme` media query when theme is set to "system".
 *
 * Exposes via useTheme():
 *   - theme          {string}  Current theme preference ("light"|"dark"|"system").
 *   - resolvedTheme  {string}  Actual applied theme ("light"|"dark").
 *   - setTheme(t)    {fn}      Update and persist theme preference.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS, THEMES } from '@/constants'

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.THEME) ?? THEMES.SYSTEM
  )

  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT)

  // Resolve system preference and listen for changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const resolve = () => {
      if (theme === THEMES.SYSTEM) {
        setResolvedTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT)
      } else {
        setResolvedTheme(theme)
      }
    }

    resolve()
    mediaQuery.addEventListener('change', resolve)
    return () => mediaQuery.removeEventListener('change', resolve)
  }, [theme])

  // Apply resolved theme to <html> data attribute for Tailwind dark mode.
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    root.classList.toggle('dark', resolvedTheme === THEMES.DARK)
  }, [resolvedTheme])

  const setTheme = (newTheme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme)
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useTheme — Consume the ThemeContext.
 * Must be used within a component tree wrapped by <ThemeProvider>.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return context
}

export default ThemeContext
