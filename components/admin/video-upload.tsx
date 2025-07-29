'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, Film, Link, X, CheckCircle, AlertCircle, 
  Loader2, FileVideo, Youtube, Video, ExternalLink 
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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

export function VideoUpload({ onVideoUploaded, existingUrl }: VideoUploadProps) {
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

      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        throw new Error('Video file must be less than 500MB')
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `course-videos/${fileName}`

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      clearInterval(progressInterval)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath)

      setUploadProgress(100)
      setSuccess(true)

      // Get video metadata
      const videoElement = document.createElement('video')
      videoElement.src = URL.createObjectURL(file)
      
      videoElement.onloadedmetadata = () => {
        const metadata: VideoMetadata = {
          duration: Math.round(videoElement.duration),
          size: file.size,
          filename: file.name,
          type: 'upload'
        }
        
        onVideoUploaded(publicUrl, metadata)
        
        // Cleanup
        URL.revokeObjectURL(videoElement.src)
      }

    } catch (err: any) {
      setError(err.message || 'Failed to upload video')
    } finally {
      setUploading(false)
    }
  }, [supabase, onVideoUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv']
    },
    maxFiles: 1,
    disabled: uploading
  })

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      setError('Please enter a video URL')
      return
    }

    // Validate URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/

    let videoType: 'youtube' | 'vimeo' | null = null
    
    if (youtubeRegex.test(videoUrl)) {
      videoType = 'youtube'
    } else if (vimeoRegex.test(videoUrl)) {
      videoType = 'vimeo'
    } else {
      setError('Please enter a valid YouTube or Vimeo URL')
      return
    }

    setSuccess(true)
    onVideoUploaded(videoUrl, { type: videoType })
  }

  return (
    <div className="space-y-4">
      {/* Upload Method Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-100 rounded-lg">
        <button
          onClick={() => setUploadMethod('url')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'url'
              ? 'bg-white shadow-sm'
              : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Link className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          Video URL
        </button>
        <button
          onClick={() => setUploadMethod('upload')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'upload'
              ? 'bg-white shadow-sm'
              : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Upload className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          Upload File
        </button>
      </div>

      {/* URL Input */}
      {uploadMethod === 'url' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              YouTube or Vimeo URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value)
                  setError(null)
                  setSuccess(false)
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={handleUrlSubmit}
                disabled={!videoUrl.trim()}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Add Video
              </button>
            </div>
          </div>

          {/* Supported Platforms */}
          <div className="flex items-center gap-4 text-sm text-zinc-600">
            <span>Supported platforms:</span>
            <div className="flex items-center gap-2">
              <Youtube size={20} />
              <span>YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={20} />
              <span>Vimeo</span>
            </div>
          </div>
        </div>
      )}

      {/* File Upload */}
      {uploadMethod === 'upload' && (
        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragActive
                ? 'border-black bg-zinc-50'
                : 'border-zinc-300 hover:border-zinc-400'
            } ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="space-y-4">
                <Loader2 size={48} className="mx-auto text-zinc-400 animate-spin" />
                <div>
                  <p className="text-sm font-medium mb-2">Uploading video...</p>
                  <div className="w-full max-w-xs mx-auto bg-zinc-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-black rounded-full h-2"
                    />
                  </div>
                  <p className="text-xs text-zinc-600 mt-2">{uploadProgress}%</p>
                </div>
              </div>
            ) : (
              <>
                <FileVideo size={48} className="mx-auto text-zinc-400 mb-4" />
                <p className="text-sm text-zinc-600 mb-2">
                  {isDragActive
                    ? 'Drop the video here...'
                    : 'Drag and drop a video here, or click to browse'}
                </p>
                <p className="text-xs text-zinc-500">
                  MP4, MOV, AVI, WebM up to 500MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-green-50 text-green-600 rounded-lg"
          >
            <CheckCircle size={20} />
            <span className="text-sm">Video added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}