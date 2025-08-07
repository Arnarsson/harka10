import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId, user } = await auth()
  
  if (!userId) {
    return NextResponse.json({ 
      error: 'Not authenticated',
      authenticated: false 
    })
  }

  return NextResponse.json({
    authenticated: true,
    userId,
    email: user?.emailAddresses?.[0]?.emailAddress,
    publicMetadata: user?.publicMetadata,
    role: user?.publicMetadata?.role || 'no-role-set',
    sessionClaims: (user as any)?.sessionClaims,
    debug: {
      hasPublicMetadata: !!user?.publicMetadata,
      hasRole: !!(user?.publicMetadata as any)?.role,
      roleValue: (user?.publicMetadata as any)?.role
    }
  })
}