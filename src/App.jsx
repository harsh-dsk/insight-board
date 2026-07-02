/**
 * App.jsx
 *
 * Application root component.
 * Composes all context providers and mounts the router.
 *
 * Provider order (outermost → innermost):
 *   ThemeProvider  — Applies light/dark theme before anything renders.
 *   AuthProvider   — Supplies authentication state to all child routes.
 *   AppRouter      — Handles all client-side routing.
 */

import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AppRouter } from '@/routes/AppRouter'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}
