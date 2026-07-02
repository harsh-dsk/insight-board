/**
 * services/authService.js
 *
 * Authentication API calls.
 * DummyJSON provides a mock /auth/login endpoint for testing.
 *
 * Docs: https://dummyjson.com/docs/auth
 */

import axiosInstance from './axiosInstance'

/**
 * Log in with username and password.
 * Returns a token and user data on success.
 * @param {{ username: string, password: string }} credentials
 */
export const login = (credentials) =>
  axiosInstance.post('/auth/login', credentials)

/**
 * Fetch the currently authenticated user's profile.
 * Requires a valid Bearer token in the request header.
 */
export const getMe = () => axiosInstance.get('/auth/me')
