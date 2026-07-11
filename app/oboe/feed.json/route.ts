import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: items = [] } = await supabase
    .from('content')
    .select('id,title,description,content_url,created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(50)

  const host = req.headers.get('host') || 'localhost:3000'
  const proto = host.includes('localhost') ? 'http' : 'https'
  const site = `${proto}://${host}`

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Stream',
    home_page_url: `${site}/oboe`,
    feed_url: `${site}/oboe/feed.json`,
    items: items.map((it) => ({
      id: it.id,
      url: it.content_url || `${site}/oboe#${it.id}`,
      title: it.title,
      content_text: it.description || '',
      date_published: new Date(it.created_at).toISOString(),
    })),
  }

  return NextResponse.json(feed, { status: 200, headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' } })
}

