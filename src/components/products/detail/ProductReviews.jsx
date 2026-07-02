/**
 * components/products/detail/ProductReviews.jsx
 *
 * Renders the reviews[] array from a DummyJSON product.
 * Each review shows: star rating, reviewer name, date, and comment.
 */

import { memo } from 'react'
import { StarRating } from '../StarRating'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/utils'

export const ProductReviews = memo(function ProductReviews({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">No reviews yet.</p>
    )
  }

  return (
    <div className="space-y-5">
      {reviews.map((review, idx) => (
        <div key={idx}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {/* Initials avatar */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground uppercase">
                  {review.reviewerName?.charAt(0) ?? '?'}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {review.reviewerName ?? 'Anonymous'}
                </span>
              </div>
              <StarRating rating={review.rating} size="h-3 w-3" showValue />
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {formatDate(review.date)}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed pl-9">
            {review.comment}
          </p>
          {idx < reviews.length - 1 && <Separator className="mt-5" />}
        </div>
      ))}
    </div>
  )
})
