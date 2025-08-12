'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Film, Link, X, CheckCircle, AlertCircle, Loader2, FileVideo, Youtube, Video, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface VideoUploadProps {
  onVideoUploaded: (url: string, metadata: VideoMetadata) => void
  existingUrl?: string
}

interface VideoMetadata {
  duration?: number
  size?: number
  filename?: string
  type: 'upload' | 'youtube' | 'vimeo'
}

export function VideoUploadSecure({ onVideoUploaded, existingUrl }: VideoUploadProps) {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('url')
  const [videoUrl, setVideoUrl] = useState(existingUrl || '')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setUploading(true)
    setUploadProgress(0)

    try {
      // Validate file
      if (!file.type.startsWith('video/')) {
        throw new Error('Please upload a video file')
      }
      
      if (file.size > 500 * 1024 * 1024) {
        throw new Error('Video must be less than 500MB')
      }

      // Step 1: Request signed upload URL from our secure API
      setUploadProgress(10)
      const pathHint = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '').slice(0, 50)
      
      const signRes = await fetch('/api/storage/sign-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bucket: 'videos', 
          pathHint 
        })
      })

      if (!signRes.ok) {
        const errorData = await signRes.json()
        throw new Error(errorData.error || 'Failed to get upload permission')
      }

      const { path, token } = await signRes.json()
      
      // Step 2: Upload to Supabase using the signed URL
      setUploadProgress(30)
      const { data: uploadData, error: uploadErr } = await supabase
        .storage
        .from('videos')
        .uploadToSignedUrl(path, token, file, {
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 70) + 30
            setUploadProgress(percent)
          }
        })

      if (uploadErr) {
        throw new Error(uploadErr.message)
      }

      // Step 3: Get public URL
      const { data: urlData } = supabase.storage.from('videos').getPublicUrl(path)
      const publicUrl = urlData.publicUrl

      // Step 4: Extract video metadata
      const videoElement = document.createElement('video')
      videoElement.src = URL.createObjectURL(file)
      
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => resolve()
        setTimeout(() => resolve(), 2000) // Fallback
      })

      const metadata: VideoMetadata = {
        duration: Number.isFinite(videoElement.duration) ? Math.round(videoElement.duration) : undefined,
        size: file.size,
        filename: file.name,
        type: 'upload'
      }

      // Clean up
      URL.revokeObjectURL(videoElement.src)

      setUploadProgress(100)
      setSuccess(true)
      
      // Call parent callback
      onVideoUploaded(publicUrl, metadata)
      
      // Show success message
      toast.success('Video uploaded successfully!')
      
    } catch (e: any) {
      console.error('Upload error:', e)
      setError(e?.message || 'Upload failed')
      toast.error(e?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [supabase, onVideoUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    disabled: uploading
  })

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      setError('Please enter a video URL')
      return
    }

    // Validate URL format
    try {
      const url = new URL(videoUrl)
      const isYouTube = url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')
      const isVimeo = url.hostname.includes('vimeo.com')
      
      if (!isYouTube && !isVimeo) {
        setError('Please enter a YouTube or Vimeo URL')
        return
      }

      const metadata: VideoMetadata = {
        type: isYouTube ? 'youtube' : 'vimeo',
        filename: url.href
      }

      setSuccess(true)
      onVideoUploaded(videoUrl, metadata)
      toast.success('Video URL added successfully!')
      
    } catch {
      setError('Please enter a valid URL')
    }
  }

  return (
    <div className="space-y-4">
      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto">
              <X size={16} />
            </button>
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg"
          >
            <CheckCircle size={20} />
            <span className="text-sm">Video added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Method Selector */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setUploadMethod('upload')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            uploadMethod === 'upload' 
              ? 'bg-background shadow-sm' 
              : 'hover:bg-background/50'
          }`}
        >
          <FileVideo className="inline-block w-4 h-4 mr-2" />
          Upload File
        </button>
        <button
          onClick={() => setUploadMethod('url')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            uploadMethod === 'url' 
              ? 'bg-background shadow-sm' 
              : 'hover:bg-background/50'
          }`}
        >
          <Link className="inline-block w-4 h-4 mr-2" />
          Video URL
        </button>
      </div>

      {/* Upload Content */}
      {uploadMethod === 'upload' ? (
        <>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-base mb-2">
                  {isDragActive ? 'Drop your video here' : 'Drag & drop a video file'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse • Max 500MB • MP4, MOV, AVI, MKV, WebM
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Video URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                className="flex-1 px-3 py-2 border rounded-md bg-background"
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <button
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Add Video
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Youtube className="w-3 h-3" /> YouTube
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3" /> Vimeo
            </span>
          </div>
        </div>
      )}
    </div>
  )
}