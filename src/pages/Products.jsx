/**
 * pages/Products.jsx
 *
 * Products listing page — assembles all product module components.
 *
 * URL state (via useProductFilters):
 *   ?search=   ?category=   ?sort=   ?minRating=   ?page=   ?limit=   ?view=
 *
 * Data fetching (via useProductsQuery):
 *   Dispatches to list / search / category endpoint based on active filters.
 *   Applies client-side rating filter and sort, then paginates.
 *
 * Category list is fetched once and memoized.
 */

import { useEffect, useState, useCallback, useMemo } from 'react'
import { VIEW_MODES } from '@/constants'
import { useProductFilters, useProductsQuery } from '@/hooks'
import { getProductCategories } from '@/services'

import { ErrorCard } from '@/components/common/ErrorCard'
import { EmptyState } from '@/components/common/EmptyState'

import {
  ProductToolbar,
  ProductTable,
  ProductTableSkeleton,
  ProductGrid,
  ProductCardSkeleton,
  ProductPagination,
} from '@/components/products'

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Products() {
  const { filters, setFilter, resetFilters } = useProductFilters()
  const { products, total, isLoading, error, refetch } = useProductsQuery(filters)

  // Categories: fetched once, never re-fetched.
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getProductCategories()
      .then(({ data }) => setCategories(data ?? []))
      .catch(() => {}) // Non-critical — toolbar degrades gracefully.
  }, [])

  const handlePageChange = useCallback(
    (page) => setFilter('page', page),
    [setFilter]
  )

  const isGrid = filters.view === VIEW_MODES.GRID

  // Normalise category list — DummyJSON may return objects or strings.
  const normCategories = useMemo(
    () =>
      categories.map((c) =>
        typeof c === 'string'
          ? { slug: c, name: c.replace(/-/g, ' ') }
          : { slug: c.slug, name: c.name ?? c.slug }
      ),
    [categories]
  )

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Products
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage your product catalog.
        </p>
      </div>

      {/* ── Toolbar ── */}
      <ProductToolbar
        filters={filters}
        setFilter={setFilter}
        resetFilters={resetFilters}
        categories={normCategories}
        total={total}
      />

      {/* ── Content area ── */}
      {error ? (
        <ErrorCard message={error} onRetry={refetch} />
      ) : isLoading ? (
        isGrid ? (
          <GridSkeleton count={filters.limit} />
        ) : (
          <ProductTableSkeleton rows={10} />
        )
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description={
            filters.search || filters.category || filters.minRating
              ? 'Try adjusting your filters or search term.'
              : 'No products are available at the moment.'
          }
          action={resetFilters}
          actionLabel="Clear filters"
        />
      ) : isGrid ? (
        <ProductGrid products={products} />
      ) : (
        <ProductTable products={products} />
      )}

      {/* ── Pagination ── */}
      {!isLoading && !error && products.length > 0 && (
        <ProductPagination
          page={filters.page}
          total={total}
          limit={filters.limit}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
