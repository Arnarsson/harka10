import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const sp = req.nextUrl.searchParams
    const limit = Math.min(parseInt(sp.get('limit') || '30', 10), 100)
    const before = sp.get('before') // ISO date string
    const q = sp.get('q') || ''
    const tag = sp.get('tag') || ''

    let query = supabase
      .from('content')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (before) {
      // fetch items strictly before the provided timestamp
      query = query.lt('created_at', before)
    }
    if (tag) {
      query = query.contains('tags', [tag])
    }
    if (q) {
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
    }

    const { data, error } = await query
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ items: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}

