/**
 * services/axiosInstance.js
 *
 * Configured Axios instance used by all service modules.
 * Handles:
 *   - Base URL injection
 *   - Auth token attachment via request interceptor
 *   - Global error handling via response interceptor
 */

import axios from 'axios'
import { API_BASE_URL, STORAGE_KEYS } from '@/constants'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ────────────────────────────────────────────────────
// Attaches the stored auth token to every outgoing request if available.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor ───────────────────────────────────────────────────
// Handles common HTTP errors globally (401 redirect, network errors, etc.).
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Token expired or invalid — clear session and redirect to login.
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
