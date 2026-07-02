/**
 * hooks/useProductsQuery.js
 *
 * Unified data-fetching hook for the Products page.
 * Receives the current filter state and decides which API endpoint
 * to call (list / search / category), then applies client-side
 * sorting and rating filtering (DummyJSON doesn't support these server-side).
 *
 * @param {object} filters - From useProductFilters()
 * @returns {{ products, total, isLoading, error, refetch }}
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from '@/services'

/** Sort a product array by the given sort key. */
function applySort(products, sort) {
  const arr = [...products]
  switch (sort) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price)
    case 'price-desc': return arr.sort((a, b) => b.price - a.price)
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating)
    case 'name-asc':   return arr.sort((a, b) => a.title.localeCompare(b.title))
    case 'name-desc':  return arr.sort((a, b) => b.title.localeCompare(a.title))
    case 'newest':
    default:           return arr // DummyJSON returns newest first by default
  }
}

export function useProductsQuery(filters) {
  const { search, category, sort, minRating, page, limit } = filters

  const skip = (page - 1) * limit

  const [rawProducts, setRawProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      let data

      if (search && search.trim()) {
        // Search overrides category filter
        ;({ data } = await searchProducts(search.trim(), 100, 0))
      } else if (category) {
        ;({ data } = await getProductsByCategory(category, 100, 0))
      } else {
        ;({ data } = await getProducts(100, 0))
      }

      setRawProducts(data.products ?? [])
      // Total will be recalculated after client-side filters below
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load products. Please try again.')
      setRawProducts([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }, [search, category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Apply client-side rating filter and sort, then paginate.
  const { products, filteredTotal } = useMemo(() => {
    let filtered = rawProducts

    if (minRating) {
      filtered = filtered.filter((p) => p.rating >= Number(minRating))
    }

    const sorted = applySort(filtered, sort)
    const filteredTotal = sorted.length
    const paginated = sorted.slice(skip, skip + limit)

    return { products: paginated, filteredTotal }
  }, [rawProducts, minRating, sort, skip, limit])

  // Sync total after filtering
  useEffect(() => {
    setTotal(filteredTotal)
  }, [filteredTotal])

  return { products, total: filteredTotal, isLoading, error, refetch: fetchProducts }
}
