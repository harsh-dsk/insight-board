/**
 * pages/Dashboard.jsx
 *
 * Main dashboard overview page (protected).
 *
 * Currently a skeleton shell — shows the page header and a placeholder
 * grid area where KPI cards and charts will be implemented.
 *
 * TODO: Implement <KpiCard />, <RevenueChart />, <ActivityFeed />.
 */

import { useAuth } from '@/context'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name}. Here's what's happening today.
        </p>
      </div>

      {/* ── KPI card grid placeholder ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 space-y-3"
          >
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            <div className="h-7 w-16 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-32 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>

      {/* ── Chart area placeholder ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
          <div className="h-4 w-32 rounded bg-muted animate-pulse mb-6" />
          <div className="h-52 rounded bg-muted/50 animate-pulse" />
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="h-4 w-28 rounded bg-muted animate-pulse mb-6" />
          <div className="h-52 rounded bg-muted/50 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
