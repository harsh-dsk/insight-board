/**
 * constants/routes.js
 *
 * Centralized route path constants.
 * Use these constants in <Link to={ROUTES.LOGIN} /> and navigate(ROUTES.DASHBOARD)
 * to avoid magic strings scattered across the codebase.
 */

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  ANALYTICS: '/analytics',
  NOT_FOUND: '*',
}
