/**
 * hooks/useProduct.js
 *
 * Custom hook for fetching a single product by ID from DummyJSON.
 *
 * @param {number|string} id - The product ID to fetch.
 *
 * Returns:
 *   - product    {object|null}  The product data object.
 *   - isLoading  {boolean}      True while the request is in flight.
 *   - error      {string|null}  Error message if the request failed.
 *   - refetch    {fn}           Trigger a manual re-fetch.
 */

import { useState, useEffect, useCallback } from 'react'
import { getProductById } from '@/services'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProduct = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getProductById(id)
      setProduct(data)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to fetch product.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return { product, isLoading, error, refetch: fetchProduct }
}
