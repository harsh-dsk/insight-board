/**
 * hooks/useProducts.js
 *
 * Custom hook for fetching a paginated list of products from DummyJSON.
 *
 * Returns:
 *   - products   {Array}   List of product objects.
 *   - total      {number}  Total number of products in the API.
 *   - isLoading  {boolean} True while the request is in flight.
 *   - error      {string|null} Error message if the request failed.
 *   - refetch    {fn}      Trigger a manual re-fetch.
 */

import { useState, useEffect, useCallback } from 'react'
import { getProducts } from '@/services'
import { PAGINATION_DEFAULTS } from '@/constants'

export function useProducts(
  limit = PAGINATION_DEFAULTS.LIMIT,
  skip = PAGINATION_DEFAULTS.SKIP
) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getProducts(limit, skip)
      setProducts(data.products)
      setTotal(data.total)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to fetch products.')
    } finally {
      setIsLoading(false)
    }
  }, [limit, skip])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, total, isLoading, error, refetch: fetchProducts }
}
