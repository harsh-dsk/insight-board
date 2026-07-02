/**
 * components/products/ProductTableRow.jsx
 *
 * Memoized single table row for the products list.
 * Separated from ProductTable to avoid re-rendering all rows
 * when only one row's status changes.
 */

import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, ToggleLeft, ToggleRight } from 'lucide-react'

import { formatCurrency } from '@/utils'
import { ROLES } from '@/constants'
import { useAuth } from '@/context'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { StarRating } from './StarRating'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Stock status helper
function StockCell({ stock }) {
  if (stock === 0) return <span className="text-xs text-destructive font-medium">Out of stock</span>
  if (stock <= 10) return <span className="text-xs text-amber-600 font-medium">{stock} left</span>
  return <span className="text-xs text-muted-foreground tabular-nums">{stock}</span>
}

export const ProductTableRow = memo(function ProductTableRow({ product }) {
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

  return (
    <TableRow className="group hover:bg-muted/40">
      {/* Image */}
      <TableCell className="w-14">
        <div className="h-10 w-10 rounded-md overflow-hidden border border-border bg-muted shrink-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </TableCell>

      {/* Title */}
      <TableCell className="max-w-[180px]">
        <Link
          to={`/products/${product.id}`}
          className="text-sm font-medium text-foreground hover:underline underline-offset-2 line-clamp-1"
        >
          {product.title}
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{product.brand}</p>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Badge variant="secondary" className="text-xs font-normal capitalize">
          {product.category.replace(/-/g, ' ')}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="tabular-nums">
        <p className="text-sm font-medium text-foreground">{formatCurrency(discountedPrice)}</p>
        {product.discountPercentage > 0 && (
          <p className="text-xs text-muted-foreground line-through">{formatCurrency(product.price)}</p>
        )}
      </TableCell>

      {/* Rating */}
      <TableCell>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="h-3 w-3" />
          <span className="text-xs tabular-nums text-muted-foreground">{product.rating.toFixed(1)}</span>
        </div>
      </TableCell>

      {/* Stock */}
      <TableCell>
        <StockCell stock={product.stock} />
      </TableCell>

      {/* Status — admin can toggle */}
      <TableCell>
        {isAdmin ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleToggle}
                className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                aria-label={published ? 'Set to hidden' : 'Set to published'}
              >
                {published ? (
                  <>
                    <ToggleRight className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Published</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Hidden</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Click to {published ? 'hide' : 'publish'}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Badge variant={published ? 'outline' : 'secondary'} className="text-xs">
            {published ? 'Published' : 'Hidden'}
          </Badge>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
          <Link to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
            <Eye className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
})
