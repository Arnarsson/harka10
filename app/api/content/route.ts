import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Fetch content with optional filters
export async function GET(request: NextRequest) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const teacherId = searchParams.get('teacherId')
  const contentType = searchParams.get('type')
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    const supabase = createClient()
    
    let query = supabase
      .from('content')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by teacher if specified
    if (teacherId) {
      query = query.eq('teacher_id', teacherId)
    }

    // Filter by content type
    if (contentType) {
      query = query.eq('type', contentType)
    }

    // Filter by status
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching content:', error)
      return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
    }

    return NextResponse.json({
      content: data || [],
      total: count || 0,
      limit,
      offset
    })
  } catch (error) {
    console.error('Content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user has teacher or admin role
  const role = sessionClaims?.metadata?.role || sessionClaims?.role as string
  if (role !== 'teacher' && role !== 'admin') {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { title, description, type, category, difficulty, tags, content_url, metadata } = body

    // Validate required fields
    if (!title || !type) {
      return NextResponse.json({ error: 'Title and type are required' }, { status: 400 })
    }

    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('content')
      .insert({
        teacher_id: userId,
        title,
        description,
        type,
        category,
        difficulty,
        tags: tags || [],
        content_url,
        metadata: metadata || {},
        status: 'draft',
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating content:', error)
      return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
    }

    return NextResponse.json({ content: data })
  } catch (error) {
    console.error('Content creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Update content
export async function PATCH(request: NextRequest) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
    }

    const supabase = createClient()
    
    // First check if user owns this content or is admin
    const { data: content, error: fetchError } = await supabase
      .from('content')
      .select('teacher_id')
      .eq('id', id)
      .single()

    if (fetchError || !content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const role = sessionClaims?.metadata?.role || sessionClaims?.role as string
    if (content.teacher_id !== userId && role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Update the content
    const { data, error } = await supabase
      .from('content')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating content:', error)
      return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
    }

    return NextResponse.json({ content: data })
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
  }

  try {
    const supabase = createClient()
    
    // First check if user owns this content or is admin
    const { data: content, error: fetchError } = await supabase
      .from('content')
      .select('teacher_id')
      .eq('id', id)
      .single()

    if (fetchError || !content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const role = sessionClaims?.metadata?.role || sessionClaims?.role as string
    if (content.teacher_id !== userId && role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Delete the content
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting content:', error)
      return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Content deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}