import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const role = (user.publicMetadata?.role as string) || 'student'
  if (role !== 'teacher' && role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { title, description, type = 'note', content_url, tags = [] } = body || {}

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const supabaseAdmin = createClient(url, serviceKey)

  const { data, error } = await supabaseAdmin
    .from('content')
    .insert({
      teacher_id: userId,
      title,
      description: description || null,
      type,
      category: 'stream',
      difficulty: 'beginner',
      tags,
      content_url: content_url || null,
      metadata: { createdBy: user.emailAddresses?.[0]?.emailAddress || userId, source: 'oboe-admin' },
      status: 'published',
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ content: data })
}

