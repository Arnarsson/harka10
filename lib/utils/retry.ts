// Retry and resilience utilities

export interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  backoffMultiplier?: number
  retryCondition?: (error: any, attempt: number) => boolean
  onRetry?: (error: any, attempt: number) => void
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    if (error.status >= 500 && error.status < 600) return true
    if (error.code === 'NETWORK_ERROR') return true
    if (error.code === 'TIMEOUT') return true
    return false
  },
  onRetry: () => {}
}

// Exponential backoff with jitter
function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
  const exponentialDelay = options.initialDelay * Math.pow(options.backoffMultiplier, attempt - 1)
  const delay = Math.min(exponentialDelay, options.maxDelay)
  
  // Add jitter (±25%) to prevent thundering herd
  const jitter = delay * 0.25
  return delay + (Math.random() * 2 - 1) * jitter
}

// Retry wrapper for async functions
export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...defaultOptions, ...options }
  let lastError: any
  
  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      // Check if we should retry
      if (attempt === opts.maxAttempts || !opts.retryCondition(error, attempt)) {
        throw error
      }
      
      // Call retry callback
      opts.onRetry(error, attempt)
      
      // Calculate and apply delay
      const delay = calculateDelay(attempt, opts)
      await sleep(delay)
    }
  }
  
  throw lastError
}

// Circuit breaker implementation
export class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'
  
  constructor(
    private readonly options: {
      failureThreshold: number
      resetTimeout: number
      onStateChange?: (state: 'closed' | 'open' | 'half-open') => void
    }
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      const now = Date.now()
      if (now - this.lastFailureTime > this.options.resetTimeout) {
        this.setState('half-open')
      } else {
        throw new Error('Circuit breaker is OPEN')
      }
    }
    
    try {
      const result = await fn()
      
      // Success - reset circuit
      if (this.state === 'half-open') {
        this.setState('closed')
        this.failures = 0
      }
      
      return result
    } catch (error) {
      this.recordFailure()
      throw error
    }
  }
  
  private recordFailure() {
    this.failures++
    this.lastFailureTime = Date.now()
    
    if (this.failures >= this.options.failureThreshold) {
      this.setState('open')
    }
  }
  
  private setState(state: 'closed' | 'open' | 'half-open') {
    if (this.state !== state) {
      this.state = state
      this.options.onStateChange?.(state)
    }
  }
  
  getState() {
    return this.state
  }
}

// Rate limiter
export class RateLimiter {
  private tokens: number
  private lastRefill: number = Date.now()
  
  constructor(
    private readonly maxTokens: number,
    private readonly refillRate: number // tokens per second
  ) {
    this.tokens = maxTokens
  }
  
  async acquire(tokens: number = 1): Promise<void> {
    // Refill tokens based on elapsed time
    const now = Date.now()
    const elapsed = (now - this.lastRefill) / 1000
    const tokensToAdd = elapsed * this.refillRate
    this.tokens = Math.min(this.tokens + tokensToAdd, this.maxTokens)
    this.lastRefill = now
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens
      return
    }
    
    // Calculate wait time
    const tokensNeeded = tokens - this.tokens
    const waitTime = (tokensNeeded / this.refillRate) * 1000
    
    await sleep(waitTime)
    this.tokens = 0
  }
  
  getAvailableTokens(): number {
    // Refill tokens to get current count
    const now = Date.now()
    const elapsed = (now - this.lastRefill) / 1000
    const tokensToAdd = elapsed * this.refillRate
    return Math.min(this.tokens + tokensToAdd, this.maxTokens)
  }
}

// Timeout wrapper
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  timeoutError?: Error
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError || new Error(`Operation timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })
  
  return Promise.race([fn(), timeoutPromise])
}

// Debounce for async functions
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null
  let promiseResolve: ((value: any) => void) | null = null
  let promiseReject: ((reason?: any) => void) | null = null
  
  return ((...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        // Reject previous promise
        if (promiseReject) {
          promiseReject(new Error('Debounced'))
        }
      }
      
      promiseResolve = resolve
      promiseReject = reject
      
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args)
          if (promiseResolve) {
            promiseResolve(result)
          }
        } catch (error) {
          if (promiseReject) {
            promiseReject(error)
          }
        }
      }, delay)
    })
  }) as T
}

// Batch requests
export class BatchProcessor<T, R> {
  private batch: Array<{ item: T; resolve: (value: R) => void; reject: (error: any) => void }> = []
  private timeoutId: NodeJS.Timeout | null = null
  
  constructor(
    private readonly processBatch: (items: T[]) => Promise<R[]>,
    private readonly options: {
      maxBatchSize?: number
      maxWaitTime?: number
    } = {}
  ) {}
  
  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.batch.push({ item, resolve, reject })
      
      // Process immediately if batch is full
      if (this.batch.length >= (this.options.maxBatchSize || 10)) {
        this.flush()
      } else {
        // Schedule batch processing
        if (!this.timeoutId) {
          this.timeoutId = setTimeout(() => {
            this.flush()
          }, this.options.maxWaitTime || 100)
        }
      }
    })
  }
  
  private async flush() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    
    if (this.batch.length === 0) return
    
    const currentBatch = this.batch
    this.batch = []
    
    try {
      const items = currentBatch.map(b => b.item)
      const results = await this.processBatch(items)
      
      currentBatch.forEach((b, index) => {
        b.resolve(results[index])
      })
    } catch (error) {
      currentBatch.forEach(b => {
        b.reject(error)
      })
    }
  }
}

// Utility sleep function
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}