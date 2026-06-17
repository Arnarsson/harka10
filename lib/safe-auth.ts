import { auth } from '@clerk/nextjs/server'

/**
 * auth() that won't crash a server component when Clerk isn't configured
 * (e.g. a preview deploy with no CLERK_SECRET_KEY). Returns userId: null
 * instead of throwing MIDDLEWARE_INVOCATION_FAILED / auth() errors.
 */
export async function safeAuth(): Promise<{ userId: string | null }> {
  try {
    const { userId } = await auth()
    return { userId: userId ?? null }
  } catch {
    return { userId: null }
  }
}
