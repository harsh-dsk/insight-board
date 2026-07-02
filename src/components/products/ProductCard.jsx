/**
 * components/products/ProductCard.jsx
 *
 * Memoized product card for the grid view.
 * Shows thumbnail, category badge, title, dual price, star rating,
 * stock indicator, published badge, and a "View Details" button.
 */

import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, ToggleLeft, ToggleRight } from 'lucide-react'

import { formatCurrency, truncate } from '@/utils'
import { ROLES } from '@/constants'
import { useAuth } from '@/context'
import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StarRating } from './StarRating'

function StockBadge({ stock }) {
  if (stock === 0)
    return <span className="text-[10px] font-medium text-destructive">Out of stock</span>
  if (stock <= 10)
    return <span className="text-[10px] font-medium text-amber-600">{stock} left</span>
  return null
}

export const ProductCard = memo(function ProductCard({ product }) {
  const { user } = useAuth()
  const isAdmin = user?.role === ROLES.ADMIN
  const [published, setPublished] = useState(() => {
    const saved = localStorage.getItem(`insightboard_product_status_${product.id}`)
    return saved !== 'hidden'
  })

  const handleToggle = () => {
    const nextState = !published
    setPublished(nextState)
    localStorage.setItem(
      `insightboard_product_status_${product.id}`,
      nextState ? 'published' : 'hidden'
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-foreground/20 transition-colors">
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge overlay */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-[10px] font-normal capitalize bg-background/80 backdrop-blur-sm">
            {product.category.replace(/-/g, ' ')}
          </Badge>
        </div>
        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <Badge className="text-[10px] bg-primary text-primary-foreground">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Title */}
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {product.title}
        </p>

        {/* Rating */}
        <StarRating rating={product.rating} showValue size="h-3 w-3" />

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {formatCurrency(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatCurrency(product.price)}
            </span>
          )}
          <StockBadge stock={product.stock} />
        </div>

        {/* Footer: status toggle + view */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
          {isAdmin ? (
            <button
              onClick={handleToggle}
              className={cn(
                'flex items-center gap-1 text-[10px] font-medium transition-colors',
                published ? 'text-emerald-600' : 'text-muted-foreground'
              )}
              aria-label={published ? 'Set hidden' : 'Set published'}
            >
              {published ? (
                <ToggleRight className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <ToggleLeft className="h-3.5 w-3.5" />
              )}
              {published ? 'Published' : 'Hidden'}
            </button>
          ) : (
            <Badge variant="outline" className="text-[10px] font-normal">
              {published ? 'Published' : 'Hidden'}
            </Badge>
          )}

          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" asChild>
            <Link to={`/products/${product.id}`}>
              <Eye className="h-3 w-3" />
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
})
