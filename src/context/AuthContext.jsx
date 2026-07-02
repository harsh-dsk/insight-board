/**
 * context/AuthContext.jsx
 *
 * Provides authentication state and actions to the entire application tree.
 *
 * Exposes via useAuth():
 *   - user              {object|null}  Authenticated user object.
 *   - token             {string|null}  Session token string.
 *   - isLoading         {boolean}      True while restoring session from storage.
 *   - isAuthenticated   {boolean}      Derived: true when token is present.
 *   - signIn(email, pw) {fn}          Validate credentials, persist session.
 *                                      Returns { error } on failure.
 *   - logout()          {fn}          Clear session and reset state.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS, MOCK_USERS } from '@/constants'

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Generate a deterministic mock token for a user.
 * Not cryptographically secure — demo only.
 */
function generateMockToken(userId) {
  return `mock_token_${userId}_${Date.now()}`
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on initial mount.
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        // Corrupted storage — clear it.
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }

    setIsLoading(false)
  }, [])

  /**
   * Validate credentials against MOCK_USERS and persist session.
   *
   * @param {string}  email       - User's email address.
   * @param {string}  password    - User's password.
   * @param {boolean} rememberMe  - If false, session is still persisted
   *                                (extended to a real session-storage
   *                                implementation in production).
   * @returns {{ error: string | null }}
   */
  const signIn = (email, password) => {
    const match = MOCK_USERS[email.toLowerCase().trim()]

    if (!match || match.password !== password) {
      return { error: 'Invalid email or password. Please try again.' }
    }

    // Strip the password before storing.
    const { password: _pw, ...safeUser } = match
    const newToken = generateMockToken(safeUser.id)

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser))
    setToken(newToken)
    setUser(safeUser)

    return { error: null }
  }

  /**
   * Persist a new auth session to state and localStorage.
   * Used by external callers (e.g. OAuth, API login responses).
   */
  const login = (newToken, newUser) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  /**
   * Clear the auth session from state and localStorage.
   */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    signIn,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useAuth — Consume the AuthContext.
 * Must be used within a component tree wrapped by <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return context
}

export default AuthContext
