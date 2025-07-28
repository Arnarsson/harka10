import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client during build time when env vars are not available
    if (typeof window === 'undefined') {
      return {
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          signInWithPassword: async () => ({ data: null, error: new Error('Auth not configured') }),
          signUp: async () => ({ data: null, error: new Error('Auth not configured') }),
          signOut: async () => ({ error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: new Error('Database not configured') })
            })
          }),
          insert: async () => ({ data: null, error: new Error('Database not configured') })
        })
      } as any
    }
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}