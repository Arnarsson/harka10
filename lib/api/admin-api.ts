import type { AdminSettings } from '@/lib/types/admin'
import { withRetry, withTimeout, CircuitBreaker } from '@/lib/utils/retry'

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const API_TIMEOUT = 30000 // 30 seconds

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`
    let errorDetails = null

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
      errorDetails = errorData
    } catch {
      // Ignore JSON parse errors for non-JSON error responses
    }

    throw new ApiError(errorMessage, response.status, undefined, errorDetails)
  }

  try {
    return await response.json()
  } catch {
    // Return empty object for successful responses with no body (204, etc)
    return {} as T
  }
}

// API client with built-in auth, timeout, and error handling
export class AdminApiClient {
  private static instance: AdminApiClient
  private abortControllers: Map<string, AbortController> = new Map()
  private circuitBreaker: CircuitBreaker

  constructor() {
    // Initialize circuit breaker
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 5,
      resetTimeout: 60000, // 1 minute
      onStateChange: (state) => {
        console.log(`Circuit breaker state changed to: ${state}`)
      }
    })
  }

  static getInstance(): AdminApiClient {
    if (!AdminApiClient.instance) {
      AdminApiClient.instance = new AdminApiClient()
    }
    return AdminApiClient.instance
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requestId?: string,
    skipRetry?: boolean
  ): Promise<T> {
    // Use circuit breaker for all requests
    return this.circuitBreaker.execute(async () => {
      // Wrap in retry logic unless explicitly skipped
      const makeRequest = async () => {
        // Cancel any existing request with the same ID
        if (requestId && this.abortControllers.has(requestId)) {
          this.abortControllers.get(requestId)?.abort()
        }

        // Create new abort controller
        const abortController = new AbortController()
        if (requestId) {
          this.abortControllers.set(requestId, abortController)
        }

        try {
          // Use timeout wrapper
          const response = await withTimeout(
            async () => fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              signal: abortController.signal,
              headers: {
                'Content-Type': 'application/json',
                ...options.headers,
              },
              credentials: 'include', // Include cookies for auth
            }),
            API_TIMEOUT,
            new ApiError('Request timeout', 408, 'TIMEOUT')
          )

          return await handleResponse<T>(response)
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              throw new ApiError('Request aborted', 0, 'ABORTED')
            }
            throw new ApiError(error.message, 0, 'NETWORK_ERROR')
          }
          throw error
        } finally {
          if (requestId) {
            this.abortControllers.delete(requestId)
          }
        }
      }

      // Apply retry logic for GET requests or if not explicitly skipped
      if (!skipRetry && (options.method === 'GET' || !options.method)) {
        return withRetry(makeRequest, {
          maxAttempts: 3,
          retryCondition: (error) => {
            // Don't retry on client errors (4xx)
            if (error.status >= 400 && error.status < 500) return false
            // Retry on network errors, timeouts, and server errors
            return true
          },
          onRetry: (error, attempt) => {
            console.log(`Retrying request to ${endpoint} (attempt ${attempt}):`, error.message)
          }
        })
      }

      return makeRequest()
    })
  }

  // Cancel a specific request
  cancelRequest(requestId: string) {
    this.abortControllers.get(requestId)?.abort()
    this.abortControllers.delete(requestId)
  }

  // Cancel all pending requests
  cancelAllRequests() {
    this.abortControllers.forEach(controller => controller.abort())
    this.abortControllers.clear()
  }

  // Settings API
  async getSettings(): Promise<AdminSettings> {
    return this.request<AdminSettings>('/admin/settings', {
      method: 'GET',
    })
  }

  async updateSettings(
    section: keyof AdminSettings,
    data: Partial<AdminSettings[typeof section]>
  ): Promise<AdminSettings> {
    return this.request<AdminSettings>(`/admin/settings/${section}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // User management API
  async getUsers(params?: {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value))
        }
      })
    }

    return this.request(`/admin/users?${queryParams}`, {
      method: 'GET',
    })
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    })
  }

  async suspendUser(userId: string, reason?: string) {
    return this.request(`/admin/users/${userId}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    })
  }

  // Audit log API
  async getAuditLogs(params?: {
    page?: number
    limit?: number
    category?: string
    severity?: string
    startDate?: string
    endDate?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value))
        }
      })
    }

    return this.request(`/admin/audit-logs?${queryParams}`, {
      method: 'GET',
    })
  }

  // File upload with progress
  async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; id: string }> {
    const formData = new FormData()
    formData.append('file', file)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100)
            onProgress(progress)
          }
        })
      }

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (error) {
            reject(new ApiError('Invalid response format'))
          }
        } else {
          reject(new ApiError(`Upload failed: ${xhr.status}`, xhr.status))
        }
      })

      // Handle errors
      xhr.addEventListener('error', () => {
        reject(new ApiError('Upload failed'))
      })

      // Set up request
      xhr.open('POST', `${API_BASE_URL}/admin/upload`)
      xhr.withCredentials = true // Include cookies

      // Send request
      xhr.send(formData)
    })
  }

  // Bulk operations
  async bulkDeleteUsers(userIds: string[]) {
    return this.request('/admin/users/bulk-delete', {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    })
  }

  async exportData(type: 'users' | 'courses' | 'analytics', format: 'csv' | 'json') {
    const response = await fetch(`${API_BASE_URL}/admin/export/${type}?format=${format}`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new ApiError('Export failed', response.status)
    }

    // Return blob for file download
    return response.blob()
  }
}

// Export singleton instance
export const adminApi = AdminApiClient.getInstance()

// React hook for API calls with loading and error states
import { useState, useCallback } from 'react'

export function useAdminApi<T, P extends any[]>(
  apiCall: (...args: P) => Promise<T>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (...args: P) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall(...args)
      setData(result)
      return result
    } catch (err) {
      const apiError = err instanceof ApiError ? err : new ApiError('Unknown error')
      setError(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  return {
    execute,
    loading,
    error,
    data,
    reset: () => {
      setError(null)
      setData(null)
    }
  }
}