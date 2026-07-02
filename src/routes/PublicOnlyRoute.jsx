/**
 * routes/PublicOnlyRoute.jsx
 *
 * Route guard for public-only routes (e.g., /login).
 * Redirects already-authenticated users to the dashboard
 * so they don't see the login page after signing in.
 *
 * Behavior:
 *   - If auth is loading: renders null to avoid flash.
 *   - If user IS authenticated: redirects to /dashboard.
 *   - If user is NOT authenticated: renders the child route via <Outlet />.
 */

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context'
import { ROUTES } from '@/constants'

export function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
