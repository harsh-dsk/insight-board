/**
 * pages/ProductDetails.jsx
 *
 * Full product detail page at /products/:id.
 * Fetches product data via useProduct(id), renders:
 *   - Image carousel (left column)
 *   - Title, rating, pricing, description, metadata grid, tags (right column)
 *   - Reviews section below
 */

import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Tag, ShieldCheck, RotateCcw, Package, Truck } from 'lucide-react'

import { useProduct } from '@/hooks'
import { formatCurrency, formatPercentage } from '@/utils'
import { ROUTES } from '@/constants'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ErrorCard } from '@/components/common/ErrorCard'
import { StarRating } from '@/components/products/StarRating'
import {
  ProductImageCarousel,
  ProductReviews,
  ProductDetailSkeleton,
} from '@/components/products'

// ─── Metadata row ─────────────────────────────────────────────────────────────

function MetaItem({ label, value, icon: Icon }) {
  if (!value && value !== 0) return null
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}

// ─── Stock indicator ──────────────────────────────────────────────────────────

function StockIndicator({ stock, availabilityStatus }) {
  const color =
    stock === 0 ? 'bg-destructive' : stock <= 10 ? 'bg-amber-500' : 'bg-emerald-500'
  const label =
    stock === 0 ? 'Out of stock' : availabilityStatus ?? `${stock} in stock`

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color} shrink-0`} />
      <span className="text-sm text-foreground">{label}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetails() {
  const { id } = useParams()
  const { product, isLoading, error, refetch } = useProduct(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32">
          <Button variant="ghost" size="sm" disabled className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
        <ProductDetailSkeleton />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link to={ROUTES.PRODUCTS}>
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
        </Button>
        <ErrorCard message={error ?? 'Product not found.'} onRetry={refetch} />
      </div>
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0

  return (
    <div className="space-y-8">
      {/* ── Back button ── */}
      <Button variant="ghost" size="sm" asChild className="gap-2 -ml-1">
        <Link to={ROUTES.PRODUCTS}>
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </Button>

      {/* ── Main grid ── */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Image carousel */}
        <ProductImageCarousel images={product.images} title={product.title} />

        {/* Right: Info panel */}
        <div className="space-y-5">
          {/* Category + brand */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="capitalize text-xs">
              {product.category?.replace(/-/g, ' ')}
            </Badge>
            {product.brand && (
              <span className="text-xs text-muted-foreground">by {product.brand}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-snug">
            {product.title}
          </h1>

          {/* Rating + reviews */}
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} showValue size="h-4 w-4" />
            {product.reviews?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Separator />

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-foreground tabular-nums">
                {formatCurrency(discountedPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through tabular-nums pb-0.5">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge className="mb-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                    {formatPercentage(product.discountPercentage, 0)} off
                  </Badge>
                </>
              )}
            </div>
            <StockIndicator stock={product.stock} availabilityStatus={product.availabilityStatus} />
          </div>

          <Separator />

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <MetaItem label="SKU" value={product.sku} />
            <MetaItem label="Weight" value={product.weight ? `${product.weight} g` : null} />
            <MetaItem
              label="Dimensions"
              value={
                product.dimensions
                  ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                  : null
              }
            />
            <MetaItem label="Minimum Order" value={product.minimumOrderQuantity ? `×${product.minimumOrderQuantity}` : null} />
            <MetaItem
              label="Warranty"
              value={product.warrantyInformation}
              icon={ShieldCheck}
            />
            <MetaItem
              label="Return Policy"
              value={product.returnPolicy}
              icon={RotateCcw}
            />
            <MetaItem
              label="Shipping"
              value={product.shippingInformation}
              icon={Truck}
            />
            <MetaItem
              label="Status"
              value={product.availabilityStatus}
              icon={Package}
            />
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs: Reviews ── */}
      <Tabs defaultValue="reviews">
        <TabsList>
          <TabsTrigger value="reviews">
            Reviews
            {product.reviews?.length > 0 && (
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
                {product.reviews.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-5">
          <ProductReviews reviews={product.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
