/**
 * constants/app.js
 *
 * Application-wide configuration constants.
 * Includes app metadata, role definitions, localStorage keys,
 * and mock user credentials for demo purposes.
 */

/** Application display name */
export const APP_NAME = 'InsightBoard'

/** User role identifiers used for authorization checks */
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
}

/** Keys used for persisting state in localStorage */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'insightboard_auth_token',
  USER: 'insightboard_user',
  THEME: 'insightboard_theme',
}

/** Theme mode identifiers */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

/**
 * Mock user accounts for offline demo authentication.
 * In production, replace this with a real API call.
 * Keyed by email for O(1) lookup in AuthContext.signIn().
 */
export const MOCK_USERS = {
  'admin@insightboard.com': {
    id: 'usr_admin_001',
    name: 'Admin User',
    email: 'admin@insightboard.com',
    password: 'admin123',
    role: ROLES.ADMIN,
    avatar: null, // Will use initials fallback
  },
  'user@insightboard.com': {
    id: 'usr_user_001',
    name: 'John Doe',
    email: 'user@insightboard.com',
    password: 'user123',
    role: ROLES.USER,
    avatar: null,
  },
}
