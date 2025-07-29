"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Pause, 
  Square, 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Code, 
  Link2,
  Trash2,
  Edit,
  Eye,
  Save,
  Plus,
  Mic,
  Volume2,
  FileAudio,
  Download,
  Maximize,
  Settings,
  Type,
  List,
  CheckSquare,
  Quote,
  Hash,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LessonContent {
  id: string
  type: 'text' | 'video' | 'audio' | 'image' | 'code' | 'quiz' | 'assignment' | 'link' | 'file'
  title: string
  content: any
  order: number
  duration?: number
  settings: {
    visibility: 'public' | 'premium' | 'hidden'
    preview: boolean
    downloadable: boolean
    interactive: boolean
  }
}

interface LessonData {
  id: string
  title: string
  description: string
  duration: number
  content: LessonContent[]
  prerequisites: string[]
  objectives: string[]
  tags: string[]
  status: 'draft' | 'published' | 'scheduled'
  thumbnail?: string
}

export function AdvancedLessonEditor({ lessonId, onSave }: { lessonId?: string, onSave: (lesson: LessonData) => void }) {
  const [lesson, setLesson] = useState<LessonData>({
    id: lessonId || '',
    title: '',
    description: '',
    duration: 0,
    content: [],
    prerequisites: [],
    objectives: [],
    tags: [],
    status: 'draft'
  })

  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const addContentBlock = (type: LessonContent['type']) => {
    const newContent: LessonContent = {
      id: Date.now().toString(),
      type,
      title: `New ${type} block`,
      content: getDefaultContent(type),
      order: lesson.content.length,
      settings: {
        visibility: 'public',
        preview: false,
        downloadable: false,
        interactive: false
      }
    }

    setLesson(prev => ({
      ...prev,
      content: [...prev.content, newContent]
    }))
  }

  const getDefaultContent = (type: LessonContent['type']) => {
    switch (type) {
      case 'text':
        return { html: '<p>Enter your text content here...</p>', markdown: '' }
      case 'video':
        return { url: '', thumbnail: '', captions: [], chapters: [] }
      case 'audio':
        return { url: '', transcript: '', waveform: null }
      case 'image':
        return { url: '', alt: '', caption: '', zoom: false }
      case 'code':
        return { language: 'javascript', code: '// Your code here', runnable: false }
      case 'quiz':
        return { questions: [], passing_score: 70, attempts: 3 }
      case 'assignment':
        return { instructions: '', submission_types: ['file'], max_score: 100 }
      case 'link':
        return { url: '', title: '', description: '', embed: false }
      case 'file':
        return { url: '', filename: '', size: 0, type: '' }
      default:
        return {}
    }
  }

  const updateContentBlock = (id: string, updates: Partial<LessonContent>) => {
    setLesson(prev => ({
      ...prev,
      content: prev.content.map(block =>
        block.id === id ? { ...block, ...updates } : block
      )
    }))
  }

  const deleteContentBlock = (id: string) => {
    setLesson(prev => ({
      ...prev,
      content: prev.content.filter(block => block.id !== id)
    }))
  }

  const reorderContent = (dragIndex: number, dropIndex: number) => {
    const newContent = [...lesson.content]
    const draggedItem = newContent[dragIndex]
    newContent.splice(dragIndex, 1)
    newContent.splice(dropIndex, 0, draggedItem)
    
    setLesson(prev => ({
      ...prev,
      content: newContent.map((item, index) => ({ ...item, order: index }))
    }))
  }

  const handleFileUpload = async (file: File, contentId: string) => {
    // Simulate file upload
    const formData = new FormData()
    formData.append('file', file)
    
    // Mock upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress >= 100) {
        clearInterval(interval)
        // Update content block with uploaded file URL
        const mockUrl = URL.createObjectURL(file)
        updateContentBlock(contentId, {
          content: {
            ...lesson.content.find(c => c.id === contentId)?.content,
            url: mockUrl,
            filename: file.name,
            size: file.size,
            type: file.type
          }
        })
      }
    }, 200)
  }

  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      })
      
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
      // Handle recording end
      stream.getVideoTracks()[0].onended = () => {
        setIsRecording(false)
        clearInterval(timer)
      }
      
    } catch (error) {
      console.error('Error starting screen recording:', error)
    }
  }

  const renderContentEditor = (content: LessonContent) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
              <Button size="sm" variant="outline"><Bold className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><Italic className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><Underline className="h-3 w-3" /></Button>
              <div className="w-px h-6 bg-gray-300" />
              <Button size="sm" variant="outline"><AlignLeft className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><AlignCenter className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><AlignRight className="h-3 w-3" /></Button>
              <div className="w-px h-6 bg-gray-300" />
              <Button size="sm" variant="outline"><List className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><Quote className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline"><Link2 className="h-3 w-3" /></Button>
            </div>
            <Textarea
              value={content.content.html}
              onChange={(e) => updateContentBlock(content.id, {
                content: { ...content.content, html: e.target.value }
              })}
              className="min-h-[200px] font-mono"
              placeholder="Enter your content here..."
            />
          </div>
        )
        
      case 'video':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Video Source</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter video URL or upload file"
                    value={content.content.url}
                    onChange={(e) => updateContentBlock(content.id, {
                      content: { ...content.content, url: e.target.value }
                    })}
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Thumbnail</Label>
                <Input
                  placeholder="Thumbnail URL"
                  value={content.content.thumbnail}
                  onChange={(e) => updateContentBlock(content.id, {
                    content: { ...content.content, thumbnail: e.target.value }
                  })}
                />
              </div>
            </div>
            
            {content.content.url && (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={content.content.url}
                  controls
                  className="w-full aspect-video"
                  poster={content.content.thumbnail}
                />
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={startScreenRecording}
                disabled={isRecording}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2 text-red-500" />
                    Recording {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4 mr-2" />
                    Record Screen
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Mic className="h-4 w-4 mr-2" />
                Record Audio
              </Button>
            </div>
          </div>
        )
        
      case 'code':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Language</Label>
                <select
                  value={content.content.language}
                  onChange={(e) => updateContentBlock(content.id, {
                    content: { ...content.content, language: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="sql">SQL</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`runnable-${content.id}`}
                  checked={content.content.runnable}
                  onChange={(e) => updateContentBlock(content.id, {
                    content: { ...content.content, runnable: e.target.checked }
                  })}
                />
                <Label htmlFor={`runnable-${content.id}`}>Make runnable</Label>
              </div>
            </div>
            
            <div className="relative">
              <Textarea
                value={content.content.code}
                onChange={(e) => updateContentBlock(content.id, {
                  content: { ...content.content, code: e.target.value }
                })}
                className="font-mono text-sm min-h-[300px] bg-gray-900 text-green-400 border-gray-700"
                placeholder="Enter your code here..."
              />
              {content.content.runnable && (
                <Button className="absolute top-2 right-2" size="sm">
                  <Play className="h-3 w-3 mr-1" />
                  Run
                </Button>
              )}
            </div>
          </div>
        )
        
      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Passing Score (%)</Label>
                <Input
                  type="number"
                  value={content.content.passing_score}
                  onChange={(e) => updateContentBlock(content.id, {
                    content: { ...content.content, passing_score: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label>Max Attempts</Label>
                <Input
                  type="number"
                  value={content.content.attempts}
                  onChange={(e) => updateContentBlock(content.id, {
                    content: { ...content.content, attempts: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Questions</h4>
                <Button size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Question
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                No questions added yet. Click "Add Question" to create your first question.
              </div>
            </div>
          </div>
        )
        
      default:
        return (
          <div className="p-8 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Content editor for {content.type} is not implemented yet.</p>
          </div>
        )
    }
  }

  const getContentIcon = (type: LessonContent['type']) => {
    switch (type) {
      case 'text': return Type
      case 'video': return Video
      case 'audio': return FileAudio
      case 'image': return Image
      case 'code': return Code
      case 'quiz': return CheckSquare
      case 'assignment': return FileText
      case 'link': return Link2
      case 'file': return Upload
      default: return FileText
    }
  }

  const getDevicePreviewWidth = () => {
    switch (devicePreview) {
      case 'mobile': return 'w-80'
      case 'tablet': return 'w-[768px]'
      default: return 'w-full'
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Content Structure */}
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Lesson Content</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('text')}
            >
              <Type className="h-3 w-3 mr-1" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('video')}
            >
              <Video className="h-3 w-3 mr-1" />
              Video
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('image')}
            >
              <Image className="h-3 w-3 mr-1" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('code')}
            >
              <Code className="h-3 w-3 mr-1" />
              Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('quiz')}
            >
              <CheckSquare className="h-3 w-3 mr-1" />
              Quiz
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addContentBlock('file')}
            >
              <Upload className="h-3 w-3 mr-1" />
              File
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {lesson.content.map((content, index) => {
              const Icon = getContentIcon(content.type)
              return (
                <motion.div
                  key={content.id}
                  layout
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedContent === content.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedContent(content.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{content.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteContentBlock(content.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                value={lesson.title}
                onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Lesson Title"
                className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={devicePreview === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevicePreview('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={devicePreview === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevicePreview('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={devicePreview === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevicePreview('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant={previewMode ? 'default' : 'outline'}
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              
              <Button onClick={() => onSave(lesson)}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 overflow-hidden">
          {selectedContent ? (
            <div className="h-full overflow-y-auto p-6">
              <div className={`mx-auto ${getDevicePreviewWidth()}`}>
                {previewMode ? (
                  <div className="border rounded-lg p-6 bg-white">
                    <h2 className="text-2xl font-bold mb-4">Preview Mode</h2>
                    <p className="text-muted-foreground">
                      This is how your content will appear to students.
                    </p>
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {(() => {
                            const Icon = getContentIcon(lesson.content.find(c => c.id === selectedContent)?.type || 'text')
                            return <Icon className="h-5 w-5" />
                          })()}
                          Edit Content Block
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge>{lesson.content.find(c => c.id === selectedContent)?.type}</Badge>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {lesson.content.find(c => c.id === selectedContent) && 
                        renderContentEditor(lesson.content.find(c => c.id === selectedContent)!)
                      }
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Content Selected</h3>
                <p>Select a content block from the left panel to start editing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,audio/*,image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file && selectedContent) {
            handleFileUpload(file, selectedContent)
          }
        }}
      />
    </div>
  )
}