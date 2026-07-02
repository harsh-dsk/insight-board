/**
 * pages/Login.jsx
 *
 * Public login page.
 * Renders the InsightBoard brand header and the <LoginForm /> component
 * inside a centered card layout.
 *
 * Accessible to unauthenticated users only.
 * Authenticated users are redirected to /dashboard by PublicOnlyRoute.
 */

import { APP_NAME } from '@/constants'
import { LoginForm } from '@/components/auth/LoginForm'
import { LayoutDashboard } from 'lucide-react'

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">

        {/* ── Brand ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {APP_NAME}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your workspace
            </p>
          </div>
        </div>

        {/* ── Card ── */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <LoginForm />
        </div>

        {/* ── Demo credentials hint ── */}
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground">Demo credentials</p>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Admin — </span>
              admin@insightboard.com · admin123
            </p>
            <p>
              <span className="font-medium">User — </span>
              user@insightboard.com · user123
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
