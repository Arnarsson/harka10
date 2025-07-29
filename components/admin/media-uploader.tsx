"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  FileText, 
  X,
  Check,
  AlertCircle,
  Youtube,
  Play
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  url?: string
  type: 'image' | 'video' | 'document' | 'other'
}

const getFileType = (file: File): UploadedFile['type'] => {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('sheet')) return 'document'
  return 'other'
}

const getFileIcon = (type: UploadedFile['type']) => {
  switch (type) {
    case 'image': return Image
    case 'video': return Video
    case 'document': return FileText
    default: return File
  }
}

export function MediaUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [vimeoUrl, setVimeoUrl] = useState("")

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: 100, status: 'completed', url: `/uploads/${f.file.name}` }
            : f
        ))
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ))
      }
    }, 200)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'uploading' as const,
      type: getFileType(file)
    }))

    setFiles(prev => [...prev, ...newFiles])
    
    newFiles.forEach(file => {
      simulateUpload(file.id)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    }
  })

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleYouTubeImport = () => {
    if (!youtubeUrl) return
    
    const fileId = Math.random().toString(36).substring(7)
    const mockFile = new File([''], 'youtube-video.mp4', { type: 'video/mp4' })
    
    const newFile: UploadedFile = {
      id: fileId,
      file: mockFile,
      progress: 0,
      status: 'uploading',
      type: 'video',
      url: youtubeUrl
    }
    
    setFiles(prev => [...prev, newFile])
    simulateUpload(fileId)
    setYoutubeUrl("")
  }

  const handleVimeoImport = () => {
    if (!vimeoUrl) return
    
    const fileId = Math.random().toString(36).substring(7)
    const mockFile = new File([''], 'vimeo-video.mp4', { type: 'video/mp4' })
    
    const newFile: UploadedFile = {
      id: fileId,
      file: mockFile,
      progress: 0,
      status: 'uploading',
      type: 'video',
      url: vimeoUrl
    }
    
    setFiles(prev => [...prev, newFile])
    simulateUpload(fileId)
    setVimeoUrl("")
  }

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Media Files</CardTitle>
          <CardDescription>
            Upload images, videos, documents, and other media files. Supports drag & drop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">
                  Supports: Images, Videos, PDFs, Documents, Spreadsheets, Presentations
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video URL Import */}
      <Card>
        <CardHeader>
          <CardTitle>Import Videos from URLs</CardTitle>
          <CardDescription>
            Import videos directly from YouTube, Vimeo, or other video platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <div className="flex gap-2">
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <Button onClick={handleYouTubeImport} disabled={!youtubeUrl}>
                  <Youtube className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vimeo-url">Vimeo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="vimeo-url"
                  placeholder="https://vimeo.com/..."
                  value={vimeoUrl}
                  onChange={(e) => setVimeoUrl(e.target.value)}
                />
                <Button onClick={handleVimeoImport} disabled={!vimeoUrl}>
                  <Play className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({files.length})</CardTitle>
            <CardDescription>
              Manage your uploaded media files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => {
                const Icon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{file.file.name}</p>
                        <Badge variant={file.type === 'video' ? 'default' : file.type === 'image' ? 'secondary' : 'outline'}>
                          {file.type}
                        </Badge>
                      </div>
                      
                      {file.status === 'uploading' && (
                        <div className="space-y-1">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{Math.round(file.progress)}% uploaded</p>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Upload completed
                        </div>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          Upload failed
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}