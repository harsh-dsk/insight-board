/**
 * routes/AppRouter.jsx
 *
 * Central routing configuration using React Router v6 (createBrowserRouter).
 *
 * Route tree:
 *   /                   → Redirect to /dashboard
 *   /login              → Login page (redirects to /dashboard if already authed)
 *   /                   → ProtectedRoute (requires auth)
 *     /                 → MainLayout wrapper
 *       /dashboard      → Dashboard page
 *       /products       → Products listing page
 *       /products/:id   → Product detail page
 *       /               → AdminRoute (requires admin role)
 *         /analytics    → Analytics page
 *   *                   → 404 NotFound page
 */

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

// Route guards
import { ProtectedRoute } from './ProtectedRoute'
import { AdminRoute } from './AdminRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

// Layouts
import { MainLayout } from '@/layouts/MainLayout'

// Pages
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Analytics from '@/pages/Analytics'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    // Redirect root to /dashboard
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    // Public-only route — authenticated users are redirected to /dashboard
    element: <PublicOnlyRoute />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
    ],
  },
  {
    // All authenticated routes nested under ProtectedRoute
    element: <ProtectedRoute />,
    children: [
      {
        // Shared layout (sidebar, header, etc.)
        element: <MainLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.PRODUCTS, element: <Products /> },
          { path: ROUTES.PRODUCT_DETAILS, element: <ProductDetails /> },
          // Analytics is admin-only — non-admins redirected to /dashboard
          {
            element: <AdminRoute />,
            children: [
              { path: ROUTES.ANALYTICS, element: <Analytics /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
