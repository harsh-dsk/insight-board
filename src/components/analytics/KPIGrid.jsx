/**
 * components/analytics/KPIGrid.jsx
 *
 * Grid container for KPI cards.
 * Computes all metrics dynamically from the raw products list
 * and reads hidden product statuses from localStorage.
 */

import { useMemo } from 'react'
import {
  Package,
  Eye,
  EyeOff,
  Star,
  Coins,
  Warehouse,
} from 'lucide-react'
import { KPICard } from './KPICard'
import { formatCurrency, formatNumber } from '@/utils'

export function KPIGrid({ products = [] }) {
  const metrics = useMemo(() => {
    const total = products.length

    let hidden = 0
    let ratingSum = 0
    let totalValue = 0
    let totalStock = 0

    products.forEach((p) => {
      // 1. Check if product is marked hidden in localStorage
      const status = localStorage.getItem(`insightboard_product_status_${p.id}`)
      if (status === 'hidden') {
        hidden++
      }

      // 2. Rating sum
      ratingSum += p.rating ?? 0

      // 3. Stock sum
      const stock = p.stock ?? 0
      totalStock += stock

      // 4. Inventory Value = discountedPrice * stock
      const discount = p.discountPercentage ?? 0
      const sellingPrice = p.price * (1 - discount / 100)
      totalValue += sellingPrice * stock
    })

    const published = total - hidden
    const avgRating = total > 0 ? ratingSum / total : 0

    return {
      total,
      published,
      hidden,
      avgRating: avgRating.toFixed(2),
      totalValue,
      totalStock,
    }
  }, [products])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <KPICard
        title="Total Products"
        value={formatNumber(metrics.total)}
        description="Total items in the catalog"
        icon={Package}
      />
      <KPICard
        title="Published Products"
        value={formatNumber(metrics.published)}
        description="Visible to users in the storefront"
        icon={Eye}
      />
      <KPICard
        title="Hidden Products"
        value={formatNumber(metrics.hidden)}
        description="Toggled invisible by administrators"
        icon={EyeOff}
      />
      <KPICard
        title="Average Rating"
        value={metrics.avgRating}
        description="Out of 5.00 stars average score"
        icon={Star}
      />
      <KPICard
        title="Total Inventory Value"
        value={formatCurrency(metrics.totalValue)}
        description="Value of current stock after discounts"
        icon={Coins}
      />
      <KPICard
        title="Total Stock"
        value={formatNumber(metrics.totalStock)}
        description="Aggregate physical units in warehouse"
        icon={Warehouse}
      />
    </div>
  )
}
