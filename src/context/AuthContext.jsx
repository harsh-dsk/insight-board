/**
 * context/AuthContext.jsx
 *
 * Provides authentication state and actions to the entire application tree.
 *
 * Exposes via useAuth():
 *   - user          {object|null}  Authenticated user object.
 *   - token         {string|null}  JWT token string.
 *   - isLoading     {boolean}      True while restoring session from storage.
 *   - isAuthenticated {boolean}    Derived: true when token is present.
 *   - login(token, user) {fn}      Persist session and update state.
 *   - logout()      {fn}           Clear session and redirect to login.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS } from '@/constants'

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

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
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  /**
   * Persist a new auth session to state and localStorage.
   * @param {string} newToken - JWT token from login response.
   * @param {object} newUser  - User object from login response.
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
