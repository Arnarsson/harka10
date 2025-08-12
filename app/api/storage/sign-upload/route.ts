import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Secure signed upload URL generation
 * Request body:
 * { bucket: "videos" | "content", pathHint?: string } 
 * Response:
 * { path: string, token: string } for uploadToSignedUrl
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = (user.publicMetadata?.role as string) || 'student'
    if (role !== 'teacher' && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Teacher or Admin role required' }, { status: 403 })
    }

    const { bucket = 'content', pathHint = 'upload' } = await req.json()

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    // Validate bucket name
    if (!['content', 'videos'].includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket name' }, { status: 400 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // Construct a secure path: <role>/<clerkUserId>/<timestamp>-<pathHint>
    const safeHint = String(pathHint).replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50)
    const path = `${role}/${userId}/${Date.now()}-${safeHint}`

    // Generate signed upload URL
    const { data, error } = await supabaseAdmin
      .storage
      .from(bucket)
      .createSignedUploadUrl(path)

    if (error || !data) {
      console.error('Supabase error:', error)
      return NextResponse.json({ 
        error: error?.message || 'Failed to create signed upload URL' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      path: data.path, 
      token: data.token,
      expiresIn: 3600 // 1 hour
    })
  } catch (err: any) {
    console.error('Sign upload error:', err)
    return NextResponse.json({ 
      error: err?.message || 'Server error' 
    }, { status: 500 })
  }
}