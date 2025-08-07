'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileVideo, FileText, Image, Code, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// DIRECT UPLOAD - NO AUTH BULLSHIT
export default function DirectUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadType, setUploadType] = useState<'video' | 'document' | 'interactive' | 'image'>('video')
  const router = useRouter()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    // Your upload logic here - connect to Supabase directly
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      // Direct Supabase upload - bypass all the middleware crap
      const response = await fetch('/api/direct-upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        alert('Content uploaded successfully!')
        router.refresh()
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed - check console')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Direct Content Upload</CardTitle>
          <CardDescription>
            Upload your teaching content directly - no role checks, no BS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            {/* Content Type Selection */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { type: 'video', icon: FileVideo, label: 'Video' },
                { type: 'document', icon: FileText, label: 'Document' },
                { type: 'interactive', icon: Code, label: 'Interactive' },
                { type: 'image', icon: Image, label: 'Image' }
              ].map(({ type, icon: Icon, label }) => (
                <Button
                  key={type}
                  type="button"
                  variant={uploadType === type ? 'default' : 'outline'}
                  onClick={() => setUploadType(type as any)}
                  className="h-24 flex-col"
                >
                  <Icon className="h-8 w-8 mb-2" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Enter content title"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe your content"
              />
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="file">Upload File</Label>
              <Input
                id="file"
                name="file"
                type="file"
                required
                accept={
                  uploadType === 'video' ? 'video/*' :
                  uploadType === 'image' ? 'image/*' :
                  uploadType === 'document' ? '.pdf,.doc,.docx,.txt' :
                  '*'
                }
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="general">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="ai-basics">AI Basics</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Content
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <Button variant="outline" onClick={() => router.push('/learn/dashboard')}>
          View Dashboard
        </Button>
        <Button variant="outline" onClick={() => router.push('/admin')}>
          Admin Panel
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  )
}