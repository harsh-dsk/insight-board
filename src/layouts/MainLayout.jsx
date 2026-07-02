/**
 * layouts/MainLayout.jsx
 *
 * Shell layout for all authenticated dashboard pages.
 * Renders the sidebar, top header, and a main content area.
 * Child routes are injected via React Router's <Outlet />.
 *
 * Structure:
 *   <div.layout>
 *     <Sidebar />     ← Left navigation panel
 *     <div.main>
 *       <Header />    ← Top bar (user menu, notifications, breadcrumbs)
 *       <main>
 *         <Outlet />  ← Active page content
 *       </main>
 *     </div.main>
 *   </div.layout>
 */

import { Outlet } from 'react-router-dom'

export function MainLayout() {
  // TODO: Replace placeholders with <Sidebar /> and <Header /> components.
  return (
    <div>
      {/* Sidebar placeholder */}
      <aside />

      <div>
        {/* Header placeholder */}
        <header />

        {/* Page content injected by React Router */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
