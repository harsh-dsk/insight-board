/**
 * components/common/EmptyState.jsx
 *
 * Reusable empty state with icon, title, description, and optional CTA.
 */

import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({
  icon: Icon = PackageX,
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  action,
  actionLabel,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 p-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground max-w-xs">{description}</p>
      </div>
      {action && actionLabel && (
        <Button variant="outline" size="sm" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
