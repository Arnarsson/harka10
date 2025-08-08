import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// POST - Request or update user role
export async function POST(request: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { role } = await request.json()
    
    if (!['teacher', 'student'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Update user metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role
      }
    })

    return NextResponse.json({ 
      success: true,
      role,
      message: `Role updated to ${role}`
    })
  } catch (error) {
    console.error('Role update error:', error)
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
  }
}

// GET - Get current user role
export async function GET() {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await clerkClient.users.getUser(userId)
    const role = user.publicMetadata?.role || sessionClaims?.metadata?.role || 'student'
    
    return NextResponse.json({ 
      role,
      userId,
      email: user.emailAddresses[0]?.emailAddress,
      isTeacher: role === 'teacher' || role === 'admin',
      isAdmin: role === 'admin'
    })
  } catch (error) {
    console.error('Role fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 })
  }
}