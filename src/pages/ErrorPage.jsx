/**
 * pages/ErrorPage.jsx
 *
 * Professional error page shown when an unhandled runtime error or route error occurs.
 * Replaces the React Router default black-and-white error screen.
 */

import { useRouteError, Link } from 'react-router-dom'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'

export default function ErrorPage() {
  const error = useRouteError()
  console.error('Unhandled route error:', error)

  const errorMessage =
    error?.statusText || error?.message || 'An unexpected error occurred.'
  const errorStatus = error?.status || '500'

  const handleReset = () => {
    window.location.href = ROUTES.DASHBOARD
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md space-y-6">
        {/* Visual indicator */}
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-destructive uppercase tracking-wider tabular-nums">
            Error {errorStatus}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {errorMessage}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={handleReset} variant="default" className="w-full sm:w-auto gap-2">
            <RotateCcw className="h-4 w-4" />
            Reload App
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
            <Link to={ROUTES.DASHBOARD}>
              <Home className="h-4 w-4" />
              Go Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
