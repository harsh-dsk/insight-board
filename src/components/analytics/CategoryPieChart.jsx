/**
 * components/analytics/CategoryPieChart.jsx
 *
 * Pie chart displaying the distribution of products across categories.
 * Minimalist style matching Stripe/Vercel design systems.
 */

import { memo, useMemo } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const COLORS = [
  '#0f172a', // Slate 900
  '#2563eb', // Blue 600
  '#16a34a', // Green 600
  '#ca8a04', // Yellow 600
  '#7c3aed', // Violet 600
  '#db2777', // Pink 600
  '#475569', // Slate 600
  '#ea580c', // Orange 600
]

export const CategoryPieChart = memo(function CategoryPieChart({ products = [] }) {
  const chartData = useMemo(() => {
    const counts = {}
    products.forEach((p) => {
      const cat = p.category || 'other'
      counts[cat] = (counts[cat] || 0) + 1
    })

    return Object.entries(counts).map(([name, value]) => ({
      name: name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value,
    })).sort((a, b) => b.value - a.value)
  }, [products])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-popover p-2 shadow-sm text-xs">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-muted-foreground mt-0.5">
            Products: <span className="font-medium text-foreground">{payload[0].value}</span>
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
          Category Distribution
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Share of catalog items by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center text-xs text-muted-foreground">
            No category data available
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="var(--card)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  iconSize={8}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
