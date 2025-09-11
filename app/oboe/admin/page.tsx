"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function OboeAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">Stream Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">Create notes and links for the public feed.</p>

        <SignedOut>
          <div className="p-6 border rounded-xl bg-card">
            <p className="mb-4">Please sign in to manage content.</p>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <CreateForm />
        </SignedIn>
      </div>
    </div>
  )
}

function CreateForm() {
  const [mode, setMode] = useState<'note' | 'link'>('note')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    if (!tags.includes(t)) setTags([...tags, t])
    setTagInput('')
  }
  const removeTag = (t: string) => setTags(tags.filter(x => x !== t))

  const save = async () => {
    if (!title.trim()) { toast.error('Title is required'); return }
    if (mode === 'link' && !url.trim()) { toast.error('URL is required for link'); return }
    setSaving(true)
    try {
      // Use the secured content API (auth required). Status 'published' so it appears publicly.
      const res = await fetch('/api/oboe/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          type: mode === 'link' ? 'link' : 'note',
          category: 'stream',
          difficulty: 'beginner',
          content_url: mode === 'link' ? url.trim() : null,
          tags
        })
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to save')
      }
      toast.success('Published')
      setTitle(''); setDescription(''); setUrl(''); setTags([])
      router.refresh()
    } catch (e: any) {
      toast.error(e?.message || 'Error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant={mode === 'note' ? 'default' : 'outline'} size="sm" onClick={() => setMode('note')}>Note</Button>
        <Button variant={mode === 'link' ? 'default' : 'outline'} size="sm" onClick={() => setMode('link')}>Link</Button>
      </div>

      <div className="space-y-2">
        <Input placeholder={mode === 'link' ? 'Title (required)' : 'Note title (required)'} value={title} onChange={(e) => setTitle(e.target.value)} />
        {mode === 'link' && (
          <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
        )}
        <Textarea placeholder="Optional description…" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <div className="flex gap-2 mb-2">
          <Input placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }} />
          <Button variant="outline" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t)}>
              {t} ✕
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={save} disabled={saving}>{saving ? 'Publishing…' : 'Publish'}</Button>
        <Button variant="outline" onClick={() => { setTitle(''); setDescription(''); setUrl(''); setTags([]) }}>Clear</Button>
      </div>
    </div>
  )
}
