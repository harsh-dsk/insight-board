/**
 * components/products/ProductPagination.jsx
 *
 * Pagination controls for the Products page.
 * Syncs page state to URL via setFilter('page', n).
 * Shows: prev/next, numbered pages with ellipsis, and "Showing X–Y of Z".
 */

import { memo, useMemo } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Build the page number sequence with ellipsis markers.
function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
}

export const ProductPagination = memo(function ProductPagination({
  page,
  total,
  limit,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / limit)
  const from = Math.min((page - 1) * limit + 1, total)
  const to = Math.min(page * limit, total)

  const pageRange = useMemo(() => buildPageRange(page, totalPages), [page, totalPages])

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Showing X–Y of Z */}
      <p className="text-xs text-muted-foreground tabular-nums">
        Showing <span className="font-medium text-foreground">{from}–{to}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> products
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Numbered pages */}
        {pageRange.map((p, idx) =>
          p === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-8 w-8 items-center justify-center text-xs text-muted-foreground"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? 'default' : 'outline'}
              size="icon"
              className={cn('h-8 w-8 text-xs', p === page && 'pointer-events-none')}
              onClick={() => onPageChange(p)}
              aria-label={`Go to page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
})
