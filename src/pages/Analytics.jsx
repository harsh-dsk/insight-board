/**
 * pages/Analytics.jsx
 *
 * Analytics page component.
 * Fetches product catalog to calculate and display:
 *   - 6 KPI Cards (Total/Published/Hidden products, avg rating, inventory value, stock)
 *   - Category Distribution Pie Chart
 *   - Inventory Value by Category Bar Chart
 *
 * Employs skeletons during loading, and error states with retry support.
 */

import { useEffect, useState, useCallback } from 'react'
import { getProducts } from '@/services'

import { ErrorCard } from '@/components/common/ErrorCard'
import { EmptyState } from '@/components/common/EmptyState'

import {
  KPIGrid,
  CategoryPieChart,
  InventoryBarChart,
  AnalyticsSkeleton,
} from '@/components/analytics'

export default function Analytics() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAnalyticsData = useCallback(async (isSilent = false) => {
    if (!isSilent) {
      setIsLoading(true)
    }
    setError(null)
    try {
      // Fetch up to 150 items to calculate comprehensive catalog stats
      const { data } = await getProducts(150, 0)
      setProducts(data.products ?? [])
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load catalog data. Please try again.')
      setProducts([])
    } finally {
      if (!isSilent) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchAnalyticsData()
  }, [fetchAnalyticsData])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnalyticsData(true)
    }, 30000)
    return () => clearInterval(interval)
  }, [fetchAnalyticsData])

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Performance metrics and catalog distribution analytics.
        </p>
      </div>

      {/* ── Content area ── */}
      {error ? (
        <ErrorCard message={error} onRetry={fetchAnalyticsData} />
      ) : isLoading ? (
        <AnalyticsSkeleton />
      ) : products.length === 0 ? (
        <EmptyState
          title="No data available"
          description="Please add products to your catalog to calculate analytics."
        />
      ) : (
        <div className="space-y-6">
          {/* KPI Summary Cards */}
          <KPIGrid products={products} />

          {/* Visual Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryPieChart products={products} />
            <InventoryBarChart products={products} />
          </div>
        </div>
      )}
    </div>
  )
}
