/**
 * components/analytics/KPICard.jsx
 *
 * A reusable key performance indicator card.
 * Minimalist design inspired by Stripe/Vercel dashboard.
 */

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const KPICard = memo(function KPICard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <Card className="border border-border bg-card shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground tracking-tight">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
          {value}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
})
