'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, CheckCircle, XCircle } from 'lucide-react'

// SIMPLEST POSSIBLE UPLOAD - Store in localStorage for now
export default function QuickUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setMessage('')

    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File

    try {
      // For now, just store metadata in localStorage
      const uploadData = {
        id: Date.now(),
        title,
        description,
        fileName: file?.name || 'No file',
        fileSize: file?.size || 0,
        uploadedAt: new Date().toISOString()
      }

      // Get existing uploads
      const existing = JSON.parse(localStorage.getItem('harka-uploads') || '[]')
      existing.push(uploadData)
      localStorage.setItem('harka-uploads', JSON.stringify(existing))

      setUploadedFiles(existing)
      setMessage('Content saved successfully! (File upload not implemented yet)')
      
      // Reset form
      (e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error saving content')
    } finally {
      setUploading(false)
    }
  }

  // Load existing uploads
  useState(() => {
    const existing = JSON.parse(localStorage.getItem('harka-uploads') || '[]')
    setUploadedFiles(existing)
  })

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Direct Access Notice */}
      <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">🚀 Quick Upload (Temporary Solution)</h2>
        <p className="text-sm">
          This is a simplified upload interface that stores metadata locally. 
          Perfect for testing and planning your content structure!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Teaching Content</CardTitle>
          <CardDescription>
            Add your videos, documents, and teaching materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Content Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g., Introduction to AI Automation"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="What will students learn from this content?"
              />
            </div>

            <div>
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="video/*,application/pdf,image/*,.doc,.docx"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepts: Videos, PDFs, Images, Word docs
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={uploading}
              className="w-full"
            >
              {uploading ? 'Saving...' : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Save Content
                </>
              )}
            </Button>

            {message && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                message.includes('Error') 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {message.includes('Error') ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Show uploaded content */}
      {uploadedFiles.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Uploaded Content</CardTitle>
            <CardDescription>
              {uploadedFiles.length} items saved locally
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.slice().reverse().map((file) => (
                <div key={file.id} className="p-3 border rounded-lg">
                  <h4 className="font-semibold">{file.title}</h4>
                  <p className="text-sm text-muted-foreground">{file.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>📄 {file.fileName}</span>
                    <span>📅 {new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Direct Links */}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
        <Button variant="outline" onClick={() => localStorage.removeItem('harka-uploads')}>
          Clear Local Data
        </Button>
      </div>
    </div>
  )
}