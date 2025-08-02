import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client when env vars are not available (both server and client side)
    console.warn('Supabase environment variables not configured. Using mock client.')
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

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}