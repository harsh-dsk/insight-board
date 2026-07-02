/**
 * components/products/StarRating.jsx
 *
 * Visual star rating display (read-only).
 * Supports full and half-star rendering.
 *
 * @param {number} rating  - Value 0–5.
 * @param {number} max     - Total stars (default 5).
 * @param {string} size    - Tailwind size class for each star (default 'h-3.5 w-3.5').
 */

import { Star } from 'lucide-react'
import { memo } from 'react'

export const StarRating = memo(function StarRating({ rating = 0, max = 5, size = 'h-3.5 w-3.5', showValue = false }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = rating >= i + 1
          const half = !filled && rating >= i + 0.5
          return (
            <Star
              key={i}
              className={`${size} shrink-0 ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-none text-muted-foreground/30'
              }`}
            />
          )
        })}
      </span>
      {showValue && (
        <span className="text-xs tabular-nums text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  )
})
