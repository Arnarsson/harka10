// Input sanitization utilities

// HTML entities that should be escaped
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
}

// Escape HTML to prevent XSS
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char)
}

// Sanitize user input for display
export function sanitizeInput(input: string, options?: {
  maxLength?: number
  allowedChars?: RegExp
  trim?: boolean
}): string {
  let sanitized = input

  // Trim whitespace if requested (default: true)
  if (options?.trim !== false) {
    sanitized = sanitized.trim()
  }

  // Enforce max length
  if (options?.maxLength && sanitized.length > options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength)
  }

  // Filter allowed characters
  if (options?.allowedChars) {
    sanitized = sanitized.replace(new RegExp(`[^${options.allowedChars.source}]`, 'g'), '')
  }

  return sanitized
}

// Sanitize email addresses
export function sanitizeEmail(email: string): string {
  return sanitizeInput(email.toLowerCase(), {
    maxLength: 254, // RFC 5321
    allowedChars: /[a-z0-9._%+-@]/,
    trim: true
  })
}

// Sanitize URLs
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    // Only allow http(s) protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return ''
    }
    return parsed.toString()
  } catch {
    return ''
  }
}

// Sanitize file names
export function sanitizeFileName(fileName: string): string {
  // Remove path traversal attempts
  let safe = fileName.replace(/[\/\\]/g, '_')
  
  // Remove special characters except dots, dashes, and underscores
  safe = safe.replace(/[^a-zA-Z0-9._-]/g, '_')
  
  // Remove multiple dots to prevent extension spoofing
  safe = safe.replace(/\.{2,}/g, '.')
  
  // Ensure it doesn't start with a dot (hidden file)
  if (safe.startsWith('.')) {
    safe = '_' + safe.substring(1)
  }
  
  return safe
}

// Sanitize color hex values
export function sanitizeHexColor(color: string): string {
  const hex = color.replace(/[^#0-9A-Fa-f]/g, '')
  const match = hex.match(/^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
  
  if (match) {
    return '#' + match[1].toUpperCase()
  }
  
  return '#000000' // Default to black if invalid
}

// Sanitize numeric input
export function sanitizeNumber(
  value: string | number,
  options?: {
    min?: number
    max?: number
    integer?: boolean
  }
): number {
  let num = typeof value === 'string' ? parseFloat(value) : value
  
  // Handle NaN
  if (isNaN(num)) {
    return options?.min ?? 0
  }
  
  // Convert to integer if requested
  if (options?.integer) {
    num = Math.floor(num)
  }
  
  // Enforce min/max bounds
  if (options?.min !== undefined && num < options.min) {
    num = options.min
  }
  if (options?.max !== undefined && num > options.max) {
    num = options.max
  }
  
  return num
}

// Sanitize array of strings (e.g., tags, categories)
export function sanitizeStringArray(
  arr: string[],
  options?: {
    maxItems?: number
    maxItemLength?: number
    allowedChars?: RegExp
  }
): string[] {
  let sanitized = arr.map(item => 
    sanitizeInput(item, {
      maxLength: options?.maxItemLength,
      allowedChars: options?.allowedChars,
      trim: true
    })
  ).filter(item => item.length > 0) // Remove empty strings
  
  // Limit number of items
  if (options?.maxItems && sanitized.length > options.maxItems) {
    sanitized = sanitized.slice(0, options.maxItems)
  }
  
  // Remove duplicates
  return [...new Set(sanitized)]
}

// Sanitize object keys to prevent prototype pollution
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  allowedKeys?: string[]
): Partial<T> {
  const sanitized: Partial<T> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip dangerous keys
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }
    
    // If allowedKeys is specified, only include those keys
    if (allowedKeys && !allowedKeys.includes(key)) {
      continue
    }
    
    // Recursively sanitize nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key as keyof T] = sanitizeObject(value) as T[keyof T]
    } else {
      sanitized[key as keyof T] = value
    }
  }
  
  return sanitized
}

// SQL injection prevention (for raw queries - prefer parameterized queries)
export function escapeSql(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\x00/g, '\\0')
    .replace(/\x1a/g, '\\Z')
}

// Validate and sanitize JSON
export function sanitizeJson(jsonString: string): any {
  try {
    const parsed = JSON.parse(jsonString)
    // Additional validation can be added here
    return parsed
  } catch {
    return null
  }
}

// Rate limit key sanitization
export function sanitizeRateLimitKey(key: string): string {
  return sanitizeInput(key, {
    maxLength: 128,
    allowedChars: /[a-zA-Z0-9:_-]/,
    trim: true
  })
}