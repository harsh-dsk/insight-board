/**
 * components/products/ProductCardSkeleton.jsx
 *
 * Skeleton card shown while product grid data is loading.
 */

import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg border border-border overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-20" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-7 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
})
