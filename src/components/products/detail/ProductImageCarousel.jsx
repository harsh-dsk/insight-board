/**
 * components/products/detail/ProductImageCarousel.jsx
 *
 * Image gallery for the Product Details page.
 * Shows a main large image with a thumbnail strip below.
 * Clicking a thumbnail updates the main view.
 */

import { memo, useState } from 'react'
import { cn } from '@/lib/utils'

export const ProductImageCarousel = memo(function ProductImageCarousel({ images = [], title = '' }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const allImages = images.length > 0 ? images : ['/placeholder-product.png']

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
        <img
          key={activeIdx}
          src={allImages[activeIdx]}
          alt={`${title} — image ${activeIdx + 1}`}
          className="h-full w-full object-contain transition-opacity duration-200"
          loading="eager"
        />
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={cn(
                'shrink-0 h-14 w-14 rounded-md overflow-hidden border-2 transition-colors',
                i === activeIdx
                  ? 'border-primary'
                  : 'border-border hover:border-foreground/30'
              )}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIdx}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
