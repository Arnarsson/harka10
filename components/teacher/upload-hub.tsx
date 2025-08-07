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
  Eye, ChevronRight, Plus, Folder
} from 'lucide-react'
import { toast } from 'sonner'

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

export function UploadHub() {
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

  const handleSave = async () => {
    if (!metadata.title.trim()) {
      toast.error('Please add a title for your content')
      return
    }

    if (!selectedType) {
      toast.error('Please select a content type')
      return
    }

    try {
      // TODO: Save to database with teacher's ID
      const contentData = {
        type: selectedType,
        metadata,
        uploadedContent,
        teacherId: 'current-user-id', // From auth context
        createdAt: new Date().toISOString()
      }

      console.log('Saving content:', contentData)
      toast.success('Content saved successfully!')

      // Reset form
      setSelectedType(null)
      setMetadata({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        tags: [],
        makeInteractive: false
      })
      setUploadedContent(null)

    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Failed to save content. Please try again.')
    }
  }

  const renderContentTypeSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CONTENT_TYPES.map((type) => (
        <Card
          key={type.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedType === type.id 
              ? 'ring-2 ring-primary border-primary' 
              : 'hover:border-gray-300'
          }`}
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
            <TabsTrigger value="preview">Preview</TabsTrigger>
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
                  <h3 className="font-semibold mb-2">Interactive Builder Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The visual interactive lesson builder is in development. 
                    For now, you can upload videos and we'll help you add interactive elements.
                  </p>
                  <Badge variant="secondary">Phase 2 Feature</Badge>
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
                          ×
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
                <CardDescription>
                  Review how your content will appear to students
                </CardDescription>
              </CardHeader>
              <CardContent>
                {metadata.title ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{metadata.title}</h3>
                      {metadata.description && (
                        <p className="text-muted-foreground mt-1">{metadata.description}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {metadata.category && (
                        <Badge variant="outline">{metadata.category}</Badge>
                      )}
                      <Badge variant="secondary" className="capitalize">
                        {metadata.difficulty}
                      </Badge>
                      {metadata.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {uploadedContent && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {uploadedContent.type === 'upload' 
                            ? `Uploaded file: ${uploadedContent.filename}` 
                            : `${uploadedContent.type} video linked`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Add content details to see preview</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setSelectedType(null)}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Publish Content
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