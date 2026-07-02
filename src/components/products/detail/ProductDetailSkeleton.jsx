/**
 * components/products/detail/ProductDetailSkeleton.jsx
 *
 * Full-page skeleton for the Product Details page while data is loading.
 */

import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductDetailSkeleton = memo(function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: Image carousel skeleton */}
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-14 rounded-md shrink-0" />
          ))}
        </div>
      </div>

      {/* Right: Info skeleton */}
      <div className="space-y-5">
        {/* Category + brand */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        {/* Title */}
        <Skeleton className="h-8 w-4/5" />
        {/* Rating */}
        <Skeleton className="h-4 w-36" />
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>
        {/* Price */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
