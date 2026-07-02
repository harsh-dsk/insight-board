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
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/constants'

// Route guards
import { ProtectedRoute } from './ProtectedRoute'
import { AdminRoute } from './AdminRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

// Layouts
import { MainLayout } from '@/layouts/MainLayout'

// Pages
const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Products = lazy(() => import('@/pages/Products'))
const ProductDetails = lazy(() => import('@/pages/ProductDetails'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Simple loader wrapper helper
function withSuspense(Component, fullscreen = false) {
  return (
    <Suspense
      fallback={
        fullscreen ? (
          <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground text-sm font-medium">
            Loading InsightBoard...
          </div>
        ) : (
          <div className="h-40 w-full flex items-center justify-center text-muted-foreground text-sm">
            Loading...
          </div>
        )
      }
    >
      <Component />
    </Suspense>
  )
}

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
      { path: ROUTES.LOGIN, element: withSuspense(Login, true) },
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
          { path: ROUTES.DASHBOARD, element: withSuspense(Dashboard) },
          { path: ROUTES.PRODUCTS, element: withSuspense(Products) },
          { path: ROUTES.PRODUCT_DETAILS, element: withSuspense(ProductDetails) },
          // Analytics is admin-only — non-admins redirected to /dashboard
          {
            element: <AdminRoute />,
            children: [
              { path: ROUTES.ANALYTICS, element: withSuspense(Analytics) },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: withSuspense(NotFound),
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
