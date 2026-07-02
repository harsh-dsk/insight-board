/**
 * components/layout/MobileDrawer.jsx
 *
 * Sheet-based mobile navigation drawer.
 * Mirrors the Sidebar nav items and closes automatically on route change.
 *
 * Rendered inside MainLayout and triggered by the hamburger button
 * in TopNavbar on small screens.
 */

import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  BarChart3,
  LogOut,
} from 'lucide-react'

import { useAuth } from '@/context'
import { ROUTES, ROLES, APP_NAME } from '@/constants'
import { cn } from '@/lib/utils'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

// ─── Nav item definitions (mirrors Sidebar) ───────────────────────────────────

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.USER],
  },
  {
    label: 'Products',
    to: ROUTES.PRODUCTS,
    icon: Package,
    roles: [ROLES.ADMIN, ROLES.USER],
  },
  {
    label: 'Analytics',
    to: ROUTES.ANALYTICS,
    icon: BarChart3,
    roles: [ROLES.ADMIN],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function MobileDrawer({ open, onClose }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Auto-close the drawer whenever the route changes.
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user?.role)
  )

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const linkClasses = ({ isActive }) =>
    cn(
      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      isActive ? 'bg-accent text-foreground' : 'text-muted-foreground'
    )

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0 flex flex-col">
        {/* ── Header ── */}
        <SheetHeader className="flex h-14 flex-row items-center gap-2 border-b border-border px-4 space-y-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <SheetTitle className="text-sm font-semibold tracking-tight">
            {APP_NAME}
          </SheetTitle>
        </SheetHeader>

        {/* ── Nav items ── */}
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto p-3">
          {visibleItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClasses}
                end={item.to === ROUTES.DASHBOARD}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <Separator />

        {/* ── Logout ── */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Log out</span>
          </button>
        </div>

        {/* ── User info footer ── */}
        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">{user?.name}</p>
          <p className="truncate">{user?.email}</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
