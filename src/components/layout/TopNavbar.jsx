/**
 * components/layout/TopNavbar.jsx
 *
 * Sticky top navigation bar rendered inside MainLayout.
 *
 * Contains:
 *   - Mobile hamburger toggle (triggers MobileDrawer)
 *   - Search input placeholder (no functionality)
 *   - Notification bell (dummy)
 *   - Theme toggle (light / dark)
 *   - User avatar + dropdown (profile info + logout)
 */

import { Bell, Sun, Moon, Monitor, Menu, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAuth } from '@/context'
import { useTheme } from '@/context'
import { ROUTES, THEMES } from '@/constants'
import { cn } from '@/lib/utils'


import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get the user's initials for the avatar fallback. */
function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}

// ─── Theme cycle button ───────────────────────────────────────────────────────

const THEME_CYCLE = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM]
const THEME_ICONS = {
  [THEMES.LIGHT]: Sun,
  [THEMES.DARK]: Moon,
  [THEMES.SYSTEM]: Monitor,
}
const THEME_LABELS = {
  [THEMES.LIGHT]: 'Light mode',
  [THEMES.DARK]: 'Dark mode',
  [THEMES.SYSTEM]: 'System theme',
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = THEME_ICONS[theme] ?? Sun

  const cycleTheme = () => {
    const idx = THEME_CYCLE.indexOf(theme)
    setTheme(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length])
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={THEME_LABELS[theme]}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {THEME_LABELS[theme]}
      </TooltipContent>
    </Tooltip>
  )
}

// ─── TopNavbar ────────────────────────────────────────────────────────────────

export function TopNavbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    if (path === ROUTES.DASHBOARD) return 'Dashboard'
    if (path === ROUTES.PRODUCTS) return 'Products'
    if (path.startsWith('/products/')) return 'Product Details'
    if (path === ROUTES.ANALYTICS) return 'Analytics'
    return 'InsightBoard'
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-sm">

      {/* ── Mobile menu button ── */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-8 w-8 text-muted-foreground"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* ── Page Title ── */}
      <h2 className="hidden sm:inline-block text-sm font-semibold tracking-tight text-foreground md:text-base">
        {getPageTitle()}
      </h2>

      {/* ── Right actions ── */}
      <div className="ml-auto flex items-center gap-1">

        {/* Notification bell (dummy) */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {/* Dummy unread indicator */}
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Notifications
          </TooltipContent>
        </Tooltip>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'ml-1 flex items-center gap-2 rounded-md px-2 py-1',
                'hover:bg-accent transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium text-foreground truncate max-w-28">
                {user?.name}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <Badge
                  variant="secondary"
                  className="mt-1.5 w-fit text-xs capitalize"
                >
                  {user?.role}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
