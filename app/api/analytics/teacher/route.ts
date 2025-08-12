import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
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
    const supabase = createClient()
    
    // Get overall statistics
    const { data: contentStats, error: contentError } = await supabase
      .from('content')
      .select('id, views, rating, status, type')
      .eq('teacher_id', userId)

    if (contentError) {
      throw contentError
    }

    // Calculate aggregated stats
    const totalContent = contentStats?.length || 0
    const totalViews = contentStats?.reduce((sum, content) => sum + (content.views || 0), 0) || 0
    const publishedContent = contentStats?.filter(c => c.status === 'published').length || 0
    const averageRating = contentStats?.filter(c => c.rating)
      .reduce((sum, content, _, arr) => sum + content.rating / arr.length, 0) || 0

    // Get content by type breakdown
    const contentByType = contentStats?.reduce((acc, content) => {
      acc[content.type] = (acc[content.type] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentViews, error: viewsError } = await supabase
      .from('content_views')
      .select('viewed_at, content_id')
      .gte('viewed_at', sevenDaysAgo.toISOString())
      .in('content_id', contentStats?.map(c => c.id) || [])

    if (viewsError) {
      console.error('Error fetching recent views:', viewsError)
    }

    // Get student count (unique viewers)
    const { data: uniqueViewers, error: viewersError } = await supabase
      .from('content_views')
      .select('user_id')
      .in('content_id', contentStats?.map(c => c.id) || [])

    const uniqueStudents = new Set(uniqueViewers?.map(v => v.user_id) || []).size

    // Get top performing content
    const topContent = contentStats
      ?.sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5) || []

    return NextResponse.json({
      stats: {
        totalContent,
        publishedContent,
        totalViews,
        averageRating: averageRating.toFixed(1),
        totalStudents: uniqueStudents,
        contentByType
      },
      recentActivity: {
        viewsLastWeek: recentViews?.length || 0,
        viewsByDay: groupViewsByDay(recentViews || [])
      },
      topContent,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

function groupViewsByDay(views: any[]): Record<string, number> {
  const grouped: Record<string, number> = {}
  
  views.forEach(view => {
    const date = new Date(view.viewed_at).toISOString().split('T')[0]
    grouped[date] = (grouped[date] || 0) + 1
  })
  
  // Fill in missing days with 0
  const result: Record<string, number> = {}
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    result[dateStr] = grouped[dateStr] || 0
  }
  
  return result
}