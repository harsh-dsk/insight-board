/**
 * pages/Dashboard.jsx
 *
 * Main dashboard overview page (protected).
 * Provides catalog KPI metrics, recent products grid, and role-based quick actions.
 */

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Eye,
  EyeOff,
  Star,
  ArrowRight,
  LayoutGrid,
  BarChart3,
} from 'lucide-react'

import { useAuth } from '@/context'
import { ROLES, ROUTES } from '@/constants'
import { getProducts } from '@/services'
import { formatNumber } from '@/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { KPICard } from '@/components/analytics'
import { ProductCard, ProductCardSkeleton } from '@/components/products'
import { ErrorCard } from '@/components/common/ErrorCard'
import { EmptyState } from '@/components/common/EmptyState'

export default function Dashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const isAdmin = user?.role === ROLES.ADMIN

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Fetch up to 150 items to get catalog-wide stats, mirroring Analytics page logic
      const { data } = await getProducts(150, 0)
      setProducts(data.products ?? [])
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load dashboard data. Please try again.')
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Filter products based on user role (RBAC)
  const visibleProducts = useMemo(() => {
    if (isAdmin) {
      return products
    }
    return products.filter((p) => {
      const status = localStorage.getItem(`insightboard_product_status_${p.id}`)
      return status !== 'hidden'
    })
  }, [products, isAdmin])

  // Calculate catalog KPI metrics dynamically
  const metrics = useMemo(() => {
    const total = visibleProducts.length
    let hidden = 0
    let ratingSum = 0

    visibleProducts.forEach((p) => {
      const status = localStorage.getItem(`insightboard_product_status_${p.id}`)
      if (status === 'hidden') {
        hidden++
      }
      ratingSum += p.rating ?? 0
    })

    const published = total - hidden
    const avgRating = total > 0 ? ratingSum / total : 0

    return {
      total,
      published,
      hidden,
      avgRating: avgRating.toFixed(2),
    }
  }, [visibleProducts])

  // Retrieve the 5 most recent products (highest ID/newest)
  const recentProducts = useMemo(() => {
    return [...visibleProducts].sort((a, b) => b.id - a.id).slice(0, 5)
  }, [visibleProducts])

  return (
    <div className="space-y-6">
      {/* ── Welcome Header ── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">
              Here's what's happening in your catalog today.
            </p>
            <Badge variant="secondary" className="capitalize text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      {error ? (
        <ErrorCard message={error} onRetry={fetchDashboardData} />
      ) : isLoading ? (
        <div className="space-y-6">
          {/* KPI Cards Skeletons */}
          <div className={`grid gap-4 ${isAdmin ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:max-w-xs'}`}>
            {Array.from({ length: isAdmin ? 4 : 1 }).map((_, i) => (
              <Card key={i} className="border border-border bg-card shadow-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-2.5 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Grid Layout Skeletons */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Card className="border border-border bg-card shadow-none">
                <CardContent className="pt-6 space-y-4">
                  <Skeleton className="h-10 w-full" />
                  {isAdmin && <Skeleton className="h-10 w-full" />}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ── KPI Grid ── */}
          <div className={`grid gap-4 ${isAdmin ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:max-w-xs'}`}>
            <KPICard
              title="Total Products"
              value={formatNumber(metrics.total)}
              description={isAdmin ? "Total items in catalog" : "Available items in catalog"}
              icon={Package}
            />
            {isAdmin && (
              <>
                <KPICard
                  title="Published Products"
                  value={formatNumber(metrics.published)}
                  description="Visible products"
                  icon={Eye}
                />
                <KPICard
                  title="Hidden Products"
                  value={formatNumber(metrics.hidden)}
                  description="Unavailable products"
                  icon={EyeOff}
                />
                <KPICard
                  title="Average Rating"
                  value={metrics.avgRating}
                  description="Catalog score (out of 5.0)"
                  icon={Star}
                />
              </>
            )}
          </div>

          {/* ── Main Layout Grid ── */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Recent Products */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Recent Products
                </h2>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link to={ROUTES.PRODUCTS} className="flex items-center gap-1">
                    View All <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>

              {recentProducts.length === 0 ? (
                <EmptyState
                  title="No products available"
                  description="There are no products in the catalog at this time."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Quick Actions
              </h2>
              <Card className="border border-border bg-card shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Navigation Shortcuts</CardTitle>
                  <CardDescription className="text-xs">
                    Quickly jump to key sections of the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-xs h-9" asChild>
                    <Link to={ROUTES.PRODUCTS} className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                      {isAdmin ? 'Manage Products' : 'Browse Products'}
                    </Link>
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" className="w-full justify-start text-xs h-9" asChild>
                      <Link to={ROUTES.ANALYTICS} className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        View Analytics
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
