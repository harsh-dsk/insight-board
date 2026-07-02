/**
 * layouts/MainLayout.jsx
 *
 * Shell layout for all authenticated dashboard pages.
 *
 * Desktop:
 *   Sidebar (collapsible, 240 px ↔ 64 px) | TopNavbar + page content
 *
 * Tablet (md):
 *   Sidebar collapses to icon-only mode automatically
 *
 * Mobile (< md):
 *   Sticky TopNavbar + MobileDrawer (Sheet overlay) — sidebar is hidden
 *
 * Child routes are injected via React Router's <Outlet />.
 */

import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLocalStorage } from '@/hooks'
import { STORAGE_KEYS } from '@/constants'

export function MainLayout() {
  // Persist sidebar collapsed state across sessions.
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage(
    `${STORAGE_KEYS.THEME}_sidebar_collapsed`,
    false
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">

        {/* ── Desktop Sidebar ── */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />

        {/* ── Mobile Drawer ── */}
        <MobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* ── Main area ── */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

          {/* Sticky top navbar */}
          <TopNavbar onMenuClick={() => setMobileOpen(true)} />

          {/* Scrollable page content */}
          <ScrollArea className="flex-1 min-h-0">
            <main className="p-6">
              <Outlet />
            </main>
          </ScrollArea>

        </div>
      </div>
    </TooltipProvider>
  )
}
