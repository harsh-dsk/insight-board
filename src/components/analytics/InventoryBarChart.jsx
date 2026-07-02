/**
 * components/analytics/InventoryBarChart.jsx
 *
 * Bar chart showing inventory value grouped by product category.
 * Styled to look premium and minimal (Stripe style).
 */

import { memo, useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatCurrency } from '@/utils'

export const InventoryBarChart = memo(function InventoryBarChart({ products = [] }) {
  const chartData = useMemo(() => {
    const valueMap = {}

    products.forEach((p) => {
      const cat = p.category || 'other'
      const stock = p.stock ?? 0
      const discount = p.discountPercentage ?? 0
      const sellingPrice = p.price * (1 - discount / 100)
      const invValue = sellingPrice * stock

      valueMap[cat] = (valueMap[cat] || 0) + invValue
    })

    return Object.entries(valueMap)
      .map(([name, value]) => ({
        name: name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        value: Math.round(value),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8) // Limit to top 8 categories for visual clarity
  }, [products])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-popover p-2 shadow-sm text-xs">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-muted-foreground mt-0.5">
            Value:{' '}
            <span className="font-medium text-foreground">
              {formatCurrency(payload[0].value)}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border border-border bg-card shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
          Inventory Value by Category
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Total stock value (selling price) for top categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">
            No inventory data available
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0, 0, 0, 0.05)"
                  className="dark:stroke-white/5"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: '10px', fill: 'var(--muted-foreground)' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: '10px', fill: 'var(--muted-foreground)' }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)', radius: 4 }} />
                <Bar
                  dataKey="value"
                  fill="#2563eb" // Blue 600
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
