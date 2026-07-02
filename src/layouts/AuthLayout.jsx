/**
 * layouts/AuthLayout.jsx
 *
 * Centered layout wrapper for authentication pages (Login, Register, etc.).
 * Provides a vertically and horizontally centered card container.
 *
 * Structure:
 *   <div.auth-layout>   ← Full-screen background
 *     <div.auth-card>   ← Centered card panel
 *       <Outlet />      ← Login / Register page content
 *     </div.auth-card>
 *   </div.auth-layout>
 */

import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  // TODO: Add background styles and brand logo header.
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
