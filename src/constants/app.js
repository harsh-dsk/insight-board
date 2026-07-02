/**
 * constants/app.js
 *
 * Application-wide configuration constants.
 * Includes app metadata, role definitions, and localStorage keys.
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
