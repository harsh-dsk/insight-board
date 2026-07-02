/**
 * hooks/usePagination.js
 *
 * Manages pagination state (page, limit, skip) for list views.
 *
 * @param {number} initialLimit - Items per page (default 20).
 *
 * Returns:
 *   - page        {number} Current page (1-based).
 *   - limit       {number} Items per page.
 *   - skip        {number} Derived offset: (page - 1) * limit.
 *   - totalPages  {fn}     Function that takes total count and returns total pages.
 *   - goToPage    {fn}     Jump to a specific page.
 *   - nextPage    {fn}     Increment page.
 *   - prevPage    {fn}     Decrement page (clamped at 1).
 *   - setLimit    {fn}     Update items per page and reset to page 1.
 */

import { useState } from 'react'
import { PAGINATION_DEFAULTS } from '@/constants'

export function usePagination(initialLimit = PAGINATION_DEFAULTS.LIMIT) {
  const [page, setPage] = useState(1)
  const [limit, setLimitState] = useState(initialLimit)

  const skip = (page - 1) * limit

  const totalPages = (total) => Math.ceil(total / limit)

  const goToPage = (p) => setPage(p)
  const nextPage = () => setPage((prev) => prev + 1)
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1))
  const setLimit = (newLimit) => {
    setLimitState(newLimit)
    setPage(1) // Reset to first page on limit change.
  }

  return { page, limit, skip, totalPages, goToPage, nextPage, prevPage, setLimit }
}
