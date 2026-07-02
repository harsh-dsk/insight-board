/**
 * components/analytics/AnalyticsSkeleton.jsx
 *
 * Skeleton loader representing the Analytics page loading state.
 */

import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const AnalyticsSkeleton = memo(function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* ── KPI Grid Skeleton (6 cards) ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border border-border bg-card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Charts Grid Skeleton (2 cards) ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border border-border bg-card shadow-none">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
              <Skeleton className="h-[280px] w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
})
