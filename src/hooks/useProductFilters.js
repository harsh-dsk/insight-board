/**
 * hooks/useProductFilters.js
 *
 * Reads and writes all Products-page filter state via URL search params.
 * This ensures filters survive page refresh and can be shared via URL.
 *
 * Usage:
 *   const { filters, setFilter, resetFilters } = useProductFilters()
 *
 * Every call to setFilter() updates the URL without causing a full
 * navigation — page is reset to 1 whenever any filter changes.
 */

import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS_DEFAULTS } from '@/constants'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Derive current filter values from URL, falling back to defaults.
  const filters = useMemo(() => ({
    search:    searchParams.get('search')    ?? PRODUCTS_DEFAULTS.SEARCH,
    category:  searchParams.get('category')  ?? PRODUCTS_DEFAULTS.CATEGORY,
    sort:      searchParams.get('sort')       ?? PRODUCTS_DEFAULTS.SORT,
    minRating: searchParams.get('minRating') ?? PRODUCTS_DEFAULTS.MIN_RATING,
    page:      Number(searchParams.get('page') ?? PRODUCTS_DEFAULTS.PAGE),
    limit:     Number(searchParams.get('limit') ?? PRODUCTS_DEFAULTS.LIMIT),
    view:      searchParams.get('view')      ?? PRODUCTS_DEFAULTS.VIEW,
  }), [searchParams])

  /**
   * Update a single filter key in the URL.
   * Resets page to 1 for any filter change except page itself.
   */
  const setFilter = useCallback((key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      if (value === '' || value === null || value === undefined) {
        next.delete(key)
      } else {
        next.set(key, String(value))
      }

      // Reset to page 1 when filters change (not when changing page itself).
      if (key !== 'page') {
        next.set('page', '1')
      }

      return next
    }, { replace: true })
  }, [setSearchParams])

  /** Clear all filters back to defaults. */
  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  return { filters, setFilter, resetFilters }
}
