/**
 * pages/NotFound.jsx
 *
 * 404 Not Found page — rendered for all unmatched routes.
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-center p-6">
      <p className="text-6xl font-bold text-foreground">404</p>
      <h1 className="text-xl font-semibold text-foreground">Page not found</h1>
      <p className="text-sm text-muted-foreground max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
      </Button>
    </div>
  )
}
