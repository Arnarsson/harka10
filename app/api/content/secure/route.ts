import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Secure content management API
 * All operations require authentication and proper roles
 */

// GET - Fetch content with filters
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const mine = searchParams.get('mine') === 'true'
    const all = searchParams.get('all') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const role = (user.publicMetadata?.role as string) || 'student'
    
    // Only admins can see all content
    if (all && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    let query = supabaseAdmin
      .from('content')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter based on permissions
    if (mine) {
      query = query.eq('teacher_id', userId)
    } else if (role !== 'admin') {
      // Non-admins can only see published content or their own
      query = query.or(`published.eq.true,teacher_id.eq.${userId}`)
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
  } catch (error: any) {
    console.error('Content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new content (requires teacher/admin role)
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { 
      title, 
      description, 
      category = 'general', 
      bucket = 'content', 
      objectPath, 
      fileType, 
      fileSize, 
      publicUrl,
      tags = [],
      difficulty = 'beginner',
      status = 'draft'
    } = body

    if (!title || !objectPath) {
      return NextResponse.json({ error: 'Missing required fields: title and objectPath' }, { status: 400 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // Compute public URL if not provided
    let finalPublicUrl = publicUrl
    if (!finalPublicUrl) {
      const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(objectPath)
      finalPublicUrl = data.publicUrl
    }

    // Insert content with proper teacher_id
    const { data: insertData, error: insertErr } = await supabaseAdmin
      .from('content')
      .insert({
        title,
        description,
        category,
        difficulty,
        tags,
        status,
        file_path: objectPath,
        file_url: finalPublicUrl,
        content_url: finalPublicUrl,
        file_type: fileType,
        file_size: fileSize,
        teacher_id: userId,
        type: fileType?.startsWith('video/') ? 'video' : 'document',
        metadata: {
          uploadedBy: user.emailAddresses[0]?.emailAddress,
          role: role
        },
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertErr) {
      console.error('Insert error:', insertErr)
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, content: insertData })
  } catch (error: any) {
    console.error('Content creation error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Update content (owner or admin only)
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    // Check ownership
    const { data: content, error: fetchError } = await supabaseAdmin
      .from('content')
      .select('teacher_id')
      .eq('id', id)
      .single()

    if (fetchError || !content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const role = (user.publicMetadata?.role as string) || 'student'
    if (content.teacher_id !== userId && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - You can only edit your own content' }, { status: 403 })
    }

    // Update content
    const { data, error } = await supabaseAdmin
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
  } catch (error: any) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete content (owner or admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    // Check ownership
    const { data: content, error: fetchError } = await supabaseAdmin
      .from('content')
      .select('teacher_id, file_path')
      .eq('id', id)
      .single()

    if (fetchError || !content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const role = (user.publicMetadata?.role as string) || 'student'
    if (content.teacher_id !== userId && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - You can only delete your own content' }, { status: 403 })
    }

    // Delete from database
    const { error } = await supabaseAdmin
      .from('content')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting content:', error)
      return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
    }

    // Optionally delete from storage (commented out to preserve files)
    // if (content.file_path) {
    //   await supabaseAdmin.storage.from('content').remove([content.file_path])
    // }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Content deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}