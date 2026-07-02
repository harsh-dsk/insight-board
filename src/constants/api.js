/**
 * constants/api.js
 *
 * API-related constants: base URL, endpoint paths, pagination defaults.
 * Centralizing these avoids repetition in service files.
 */

/** Base URL for DummyJSON REST API */
export const API_BASE_URL = 'https://dummyjson.com'

/** Product-related endpoint paths */
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_SEARCH: '/products/search',
  PRODUCTS_CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
}

/** Default pagination settings */
export const PAGINATION_DEFAULTS = {
  LIMIT: 20,
  SKIP: 0,
}
