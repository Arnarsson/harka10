import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST - Track content view
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  const contentId = params.id

  if (!contentId) {
    return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
  }

  try {
    const supabase = createClient()
    
    // First, increment the view count for the content
    const { data: content, error: contentError } = await supabase
      .rpc('increment_content_views', { content_id: contentId })

    if (contentError) {
      console.error('Error incrementing views:', contentError)
      // If the function doesn't exist, try a direct update
      const { error: updateError } = await supabase
        .from('content')
        .update({ views: supabase.sql`views + 1` })
        .eq('id', contentId)
      
      if (updateError) {
        return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
      }
    }

    // If user is authenticated, track individual view
    if (userId) {
      const { error: viewError } = await supabase
        .from('content_views')
        .insert({
          content_id: contentId,
          user_id: userId,
          viewed_at: new Date().toISOString()
        })
        .select()

      // Ignore conflict errors (user already viewed)
      if (viewError && !viewError.message.includes('duplicate')) {
        console.error('Error tracking user view:', viewError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('View tracking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}