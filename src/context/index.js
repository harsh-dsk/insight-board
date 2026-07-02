/**
 * context/index.js
 *
 * Barrel export for all context modules.
 * Import from "@/context" instead of individual files.
 */

export { AuthProvider, useAuth, default as AuthContext } from './AuthContext'
export { ThemeProvider, useTheme, default as ThemeContext } from './ThemeContext'
