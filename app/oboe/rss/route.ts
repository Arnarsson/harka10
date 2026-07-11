import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function esc(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

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

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Stream</title>
    <link>${site}/oboe</link>
    <description>Fast notes and links</description>
    <language>en</language>
    ${items
      .map((it) => {
        const link = it.content_url || `${site}/oboe#${it.id}`
        const pubDate = new Date(it.created_at).toUTCString()
        return `
        <item>
          <title>${esc(it.title || 'Note')}</title>
          <link>${esc(link)}</link>
          <guid>${esc(it.id)}</guid>
          <pubDate>${pubDate}</pubDate>
          ${it.description ? `<description>${esc(it.description)}</description>` : ''}
        </item>`
      })
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    },
  })
}

