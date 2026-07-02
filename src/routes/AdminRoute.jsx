/**
 * routes/AdminRoute.jsx
 *
 * Route guard that requires both authentication AND the "admin" role.
 *
 * Behavior:
 *   - If auth is loading: renders null to avoid flash.
 *   - If user is NOT authenticated: redirects to /login.
 *   - If user IS authenticated but does NOT have the admin role:
 *     redirects to /dashboard with a 403 state flag.
 *   - If user IS an admin: renders the child route via <Outlet />.
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context'
import { ROUTES, ROLES } from '@/constants'

export function AdminRoute() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (user?.role !== ROLES.ADMIN) {
    // Authenticated but insufficient privileges — redirect to dashboard.
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        state={{ forbidden: true, from: location }}
        replace
      />
    )
  }

  return <Outlet />
}
