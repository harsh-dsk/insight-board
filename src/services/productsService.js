/**
 * services/productsService.js
 *
 * All API calls related to the Products resource (DummyJSON Products API).
 * Functions return the Axios response object; callers handle state updates.
 *
 * Docs: https://dummyjson.com/docs/products
 */

import axiosInstance from './axiosInstance'
import { API_ENDPOINTS, PAGINATION_DEFAULTS } from '@/constants'

/**
 * Fetch a paginated list of products.
 * @param {number} limit - Number of products to return (default 20).
 * @param {number} skip  - Number of products to skip for pagination (default 0).
 */
export const getProducts = (
  limit = PAGINATION_DEFAULTS.LIMIT,
  skip = PAGINATION_DEFAULTS.SKIP
) => axiosInstance.get(API_ENDPOINTS.PRODUCTS, { params: { limit, skip } })

/**
 * Fetch a single product by its ID.
 * @param {number|string} id - Product ID.
 */
export const getProductById = (id) =>
  axiosInstance.get(API_ENDPOINTS.PRODUCT_BY_ID(id))

/**
 * Search products by a query string.
 * @param {string} query - Search term.
 * @param {number} limit - Result limit.
 * @param {number} skip  - Pagination offset.
 */
export const searchProducts = (
  query,
  limit = PAGINATION_DEFAULTS.LIMIT,
  skip = PAGINATION_DEFAULTS.SKIP
) =>
  axiosInstance.get(API_ENDPOINTS.PRODUCTS_SEARCH, {
    params: { q: query, limit, skip },
  })

/**
 * Fetch all available product categories.
 */
export const getProductCategories = () =>
  axiosInstance.get(API_ENDPOINTS.PRODUCTS_CATEGORIES)

/**
 * Fetch products belonging to a specific category.
 * @param {string} category - Category slug.
 * @param {number} limit    - Result limit.
 * @param {number} skip     - Pagination offset.
 */
export const getProductsByCategory = (
  category,
  limit = PAGINATION_DEFAULTS.LIMIT,
  skip = PAGINATION_DEFAULTS.SKIP
) =>
  axiosInstance.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category), {
    params: { limit, skip },
  })
