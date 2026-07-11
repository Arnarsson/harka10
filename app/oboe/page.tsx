import { createClient } from '@/lib/supabase/server'
import OboeFeed from '@/components/oboe/oboe-feed'

export const dynamic = 'force-dynamic'

export default async function OboePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = await createClient()

  const q = (searchParams.q as string) || ''
  const tag = (searchParams.tag as string) || ''
  const limit = 30

  // Fetch initial published items (newest first)
  // We use the public RLS policy: status = 'published'
  let query = supabase
    .from('content')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (tag) {
    // tags is a text[]; search where array contains the tag
    query = query.contains('tags', [tag])
  }

  if (q) {
    // Simple ILIKE filtering on title/description
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
  }

  const { data: items = [] } = await query

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Stream</h1>
          <p className="text-sm text-neutral-500">Fast notes and links. Search with “s”. Navigate with “j/k”.</p>
        </header>

        <OboeFeed initialItems={items} initialQuery={q} initialTag={tag} pageSize={limit} />

        <footer className="mt-8 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <a href="/oboe/rss" className="hover:text-neutral-700">RSS</a>
            <span>•</span>
            <a href="/oboe/feed.json" className="hover:text-neutral-700">JSON</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
