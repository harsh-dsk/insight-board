/**
 * components/products/ProductToolbar.jsx
 *
 * Full toolbar for the Products page.
 * Contains: search, category filter, rating filter, sort, view toggle, count badge.
 * All state changes flow through setFilter() → URL params.
 */

import { memo, useEffect, useState, useCallback } from 'react'
import { Search, X, LayoutGrid, List, SlidersHorizontal } from 'lucide-react'

import { useDebounce } from '@/hooks'
import {
  SORT_OPTIONS,
  RATING_OPTIONS,
  PAGE_SIZE_OPTIONS,
  VIEW_MODES,
} from '@/constants'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert a category slug to a readable label. */
function labelFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ─── Component ───────────────────────────────────────────────────────────────

export const ProductToolbar = memo(function ProductToolbar({
  filters,
  setFilter,
  resetFilters,
  categories,
  total,
}) {
  const { search, category, sort, minRating, view, limit } = filters

  // Local search input state so the field is snappy;
  // the debounced value propagates to the URL after 400 ms.
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    // Sync debounced value → URL only when it differs.
    if (debouncedSearch !== search) {
      setFilter('search', debouncedSearch)
    }
  }, [debouncedSearch, search, setFilter])

  // If URL search param changes externally, reflect it in the input.
  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const hasActiveFilters = search || category || minRating || sort !== 'newest'

  const handleClearSearch = useCallback(() => {
    setSearchInput('')
    setFilter('search', '')
  }, [setFilter])

  return (
    <div className="space-y-3">
      {/* ── Row 1: Search + view toggle ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="products-search"
            type="search"
            placeholder="Search products…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 pr-9 h-9"
            aria-label="Search products by name or brand"
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-md border border-border p-1">
          <Button
            variant={view === VIEW_MODES.GRID ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setFilter('view', VIEW_MODES.GRID)}
            aria-label="Grid view"
            aria-pressed={view === VIEW_MODES.GRID}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={view === VIEW_MODES.TABLE ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => setFilter('view', VIEW_MODES.TABLE)}
            aria-label="Table view"
            aria-pressed={view === VIEW_MODES.TABLE}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ── Row 2: Filters + count ── */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* Category */}
        <Select value={category || '__all__'} onValueChange={(v) => setFilter('category', v === '__all__' ? '' : v)}>
          <SelectTrigger className="h-8 w-[165px] text-xs" aria-label="Filter products by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Min Rating */}
        <Select value={minRating || ''} onValueChange={(v) => setFilter('minRating', v)}>
          <SelectTrigger className="h-8 w-[130px] text-xs" aria-label="Filter products by minimum rating">
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            {RATING_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value || '__any__'}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => setFilter('sort', v)}>
          <SelectTrigger className="h-8 w-[170px] text-xs" aria-label="Sort products by option">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Items per page */}
        <Select value={String(limit)} onValueChange={(v) => setFilter('limit', Number(v))}>
          <SelectTrigger className="h-8 w-[130px] text-xs" aria-label="Number of products shown per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground" onClick={resetFilters}>
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}

        {/* Results count */}
        <div className="ml-auto">
          <Badge variant="secondary" className="text-xs font-normal tabular-nums">
            {total.toLocaleString()} {total === 1 ? 'product' : 'products'}
          </Badge>
        </div>
      </div>
    </div>
  )
})
