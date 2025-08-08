"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VideoUpload } from '@/components/admin/video-upload'
import { 
  Upload, FileText, Image, Code, BookOpen, 
  Play, Users, Target, Sparkles, Save, 
  Eye, ChevronRight, Plus, Folder, X,
  Monitor, Smartphone, Tablet, CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface UploadMetadata {
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  estimatedDuration?: number
  makeInteractive: boolean
}

interface ContentType {
  id: string
  name: string
  icon: any
  description: string
  color: string
  badge?: string
}

const CONTENT_TYPES: ContentType[] = [
  {
    id: 'video',
    name: 'Video Lesson',
    icon: Play,
    description: 'Upload or link to video content with rich metadata',
    color: 'bg-blue-500',
    badge: 'Popular'
  },
  {
    id: 'document',
    name: 'Document',
    icon: FileText,
    description: 'Upload PDFs, slides, or text documents',
    color: 'bg-green-500'
  },
  {
    id: 'interactive',
    name: 'Interactive Lesson',
    icon: Sparkles,
    description: 'Create hands-on coding exercises and demos',
    color: 'bg-purple-500',
    badge: 'New'
  },
  {
    id: 'image',
    name: 'Images & Graphics',
    icon: Image,
    description: 'Upload diagrams, screenshots, and visual aids',
    color: 'bg-orange-500'
  }
]

const CATEGORIES = [
  'Web Development',
  'Mobile Development', 
  'Data Science',
  'AI & Machine Learning',
  'DevOps',
  'Design',
  'Business',
  'Other'
]

type PreviewDevice = 'desktop' | 'tablet' | 'mobile'

export function UploadHubEnhanced() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<UploadMetadata>({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    tags: [],
    makeInteractive: false
  })
  const [newTag, setNewTag] = useState('')
  const [uploadedContent, setUploadedContent] = useState<any>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop')
  const router = useRouter()

  const handleVideoUploaded = (url: string, videoMetadata: any) => {
    setUploadedContent({ url, ...videoMetadata })
    toast.success('Video uploaded successfully!')
  }

  const addTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleSave = async (isDraft = false) => {
    if (!metadata.title.trim()) {
      toast.error('Please add a title for your content')
      return
    }

    if (!selectedType) {
      toast.error('Please select a content type')
      return
    }

    try {
      setIsPublishing(true)
      
      const contentData = {
        type: selectedType,
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        difficulty: metadata.difficulty,
        tags: metadata.tags,
        content_url: uploadedContent?.url,
        metadata: {
          ...uploadedContent,
          makeInteractive: metadata.makeInteractive,
          estimatedDuration: metadata.estimatedDuration
        },
        status: isDraft ? 'draft' : 'published'
      }

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData)
      })

      if (!response.ok) {
        throw new Error('Failed to save content')
      }

      const { content } = await response.json()
      
      toast.success(isDraft ? 'Content saved as draft!' : 'Content published successfully!')
      
      // Redirect to content library
      router.push('/teach/dashboard?tab=content')

    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Failed to save content. Please try again.')
    } finally {
      setIsPublishing(false)
    }
  }

  const renderContentTypeSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CONTENT_TYPES.map((type) => (
        <Card
          key={type.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedType === type.id && "ring-2 ring-primary border-primary"
          )}
          onClick={() => setSelectedType(type.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${type.color} text-white`}>
                <type.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{type.name}</h3>
                  {type.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {type.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderPreview = () => {
    const deviceClasses = {
      desktop: 'w-full',
      tablet: 'max-w-md mx-auto',
      mobile: 'max-w-xs mx-auto'
    }

    return (
      <div className="space-y-4">
        {/* Device Selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            variant={previewDevice === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewDevice('desktop')}
          >
            <Monitor className="h-4 w-4 mr-1" />
            Desktop
          </Button>
          <Button
            variant={previewDevice === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewDevice('tablet')}
          >
            <Tablet className="h-4 w-4 mr-1" />
            Tablet
          </Button>
          <Button
            variant={previewDevice === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewDevice('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </Button>
        </div>

        {/* Preview Content */}
        <div className={cn("transition-all", deviceClasses[previewDevice])}>
          <Card className="overflow-hidden">
            {uploadedContent && selectedType === 'video' && (
              <div className="aspect-video bg-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur rounded px-3 py-2">
                    <p className="text-white text-sm font-medium">Video Preview</p>
                    <p className="text-white/80 text-xs">
                      {uploadedContent.duration || 'Duration not set'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Title and Description */}
                <div>
                  <h3 className="text-lg font-semibold">
                    {metadata.title || 'Untitled Content'}
                  </h3>
                  {metadata.description && (
                    <p className="text-muted-foreground mt-2">
                      {metadata.description}
                    </p>
                  )}
                </div>
                
                {/* Metadata badges */}
                <div className="flex flex-wrap gap-2">
                  {metadata.category && (
                    <Badge variant="outline">{metadata.category}</Badge>
                  )}
                  <Badge variant="secondary" className="capitalize">
                    {metadata.difficulty}
                  </Badge>
                  {metadata.makeInteractive && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Interactive
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                {metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Interactive Preview */}
                {metadata.makeInteractive && (
                  <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Interactive Elements</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This content will include interactive quizzes, code exercises, and hands-on activities.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Learning Outcomes */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">What students will learn:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Core concepts of {metadata.category || 'this topic'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Practical examples and real-world applications</span>
                    </li>
                    {metadata.makeInteractive && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Hands-on practice with interactive exercises</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderContentUpload = () => {
    if (!selectedType) return null

    const selectedContentType = CONTENT_TYPES.find(t => t.id === selectedType)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedType(null)}
            className="text-muted-foreground"
          >
            ← Back to Types
          </Button>
          <div className="flex items-center space-x-2">
            {selectedContentType && (
              <>
                {React.createElement(selectedContentType.icon, { className: "h-5 w-5" })}
                <span className="font-semibold">{selectedContentType.name}</span>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList>
            <TabsTrigger value="upload">Upload Content</TabsTrigger>
            <TabsTrigger value="details">Add Details</TabsTrigger>
            <TabsTrigger value="preview">Preview & Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {selectedType === 'video' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Video Upload</span>
                  </CardTitle>
                  <CardDescription>
                    Upload a video file or provide a YouTube/Vimeo link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoUpload onVideoUploaded={handleVideoUploaded} />
                </CardContent>
              </Card>
            )}

            {selectedType === 'interactive' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Interactive Content</span>
                  </CardTitle>
                  <CardDescription>
                    Create interactive coding lessons and demos
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center p-8">
                  <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Interactive Builder</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For now, upload a video and enable "Make Interactive" to add interactive elements.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setMetadata(prev => ({ ...prev, makeInteractive: true }))}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enable Interactive Mode
                  </Button>
                </CardContent>
              </Card>
            )}

            {selectedType === 'document' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Document Upload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop documents here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PPTX up to 50MB
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>
                  Add metadata to help students discover your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a descriptive title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={metadata.description}
                    onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What will students learn from this content?"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select 
                      value={metadata.category} 
                      onValueChange={(value) => setMetadata(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Difficulty Level</Label>
                    <Select 
                      value={metadata.difficulty} 
                      onValueChange={(value: any) => setMetadata(prev => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="makeInteractive"
                    checked={metadata.makeInteractive}
                    onChange={(e) => setMetadata(prev => ({ ...prev, makeInteractive: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="makeInteractive" className="flex items-center gap-2 cursor-pointer">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    Make this content interactive
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
                <CardDescription>
                  Review how your content will appear to students on different devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderPreview()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setSelectedType(null)}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave(true)}
              disabled={isPublishing}
            >
              <Eye className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSave(false)}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Publish Content
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Upload Content</h1>
        <p className="text-muted-foreground">
          Share your knowledge by uploading videos, documents, and interactive content for students.
        </p>
      </div>

      {!selectedType ? renderContentTypeSelector() : renderContentUpload()}
    </div>
  )
}