/**
 * routes/ProtectedRoute.jsx
 *
 * Route guard that requires authentication.
 *
 * Behavior:
 *   - If auth is still loading (session restore in progress): renders null
 *     to avoid a flash-of-login-page while checking localStorage.
 *   - If user is NOT authenticated: redirects to /login, preserving
 *     the intended destination via `state.from` for post-login redirect.
 *   - If user IS authenticated: renders the child route via <Outlet />.
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context'
import { ROUTES } from '@/constants'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Prevent redirect flash while restoring session from localStorage.
  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}
