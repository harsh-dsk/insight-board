/**
 * components/layout/Sidebar.jsx
 *
 * Desktop sidebar navigation.
 *
 * Features:
 *   - Collapsible: full (240 px) ↔ icon-only (64 px) via toggle button
 *   - Active route highlighting using NavLink
 *   - Analytics nav item hidden for non-admin users
 *   - Logout button at the bottom
 *   - Smooth width transition
 */

import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context'
import { ROUTES, ROLES, APP_NAME } from '@/constants'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

// ─── Nav item definitions ─────────────────────────────────────────────────────

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
    roles: [ROLES.ADMIN], // Admin only
  },
]

// ─── Single nav item ──────────────────────────────────────────────────────────

function SidebarNavItem({ item, collapsed }) {
  const Icon = item.icon

  const linkClasses = ({ isActive }) =>
    cn(
      'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      isActive
        ? 'bg-accent text-foreground'
        : 'text-muted-foreground'
    )

  const content = (
    <NavLink to={item.to} className={linkClasses} end={item.to === ROUTES.DASHBOARD}>
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user?.role)
  )

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <aside
      className={cn(
        'relative hidden md:flex flex-col border-r border-border bg-sidebar',
        'transition-[width] duration-200 ease-in-out shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* ── Logo ── */}
      <div
        className={cn(
          'flex h-14 items-center border-b border-border px-4 shrink-0',
          collapsed ? 'justify-center' : 'gap-2'
        )}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight text-foreground truncate">
            {APP_NAME}
          </span>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto p-3">
        {visibleItems.map((item) => (
          <SidebarNavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <Separator />

      {/* ── Logout ── */}
      <div className="p-3">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4 shrink-0" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Log out
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Log out</span>
          </button>
        )}
      </div>

      {/* ── Collapse toggle button ── */}
      <button
        onClick={onToggle}
        className={cn(
          'absolute -right-3 top-[58px] z-10 flex h-6 w-6 items-center justify-center',
          'rounded-full border border-border bg-background shadow-sm',
          'hover:bg-accent transition-colors',
          'text-muted-foreground hover:text-foreground'
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  )
}
