"use client"

import React, { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { InteractiveCodeEditor } from '@/components/playground/interactive-code-editor'
import { 
  Play, Pause, Plus, Trash2, Clock, Code2, 
  MessageSquare, Brain, Eye, Save, Sparkles,
  Video, FileText, HelpCircle, CheckSquare,
  MousePointer, Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface InteractiveElement {
  id: string
  type: 'pause' | 'quiz' | 'code' | 'discussion' | 'ai_assistant' | 'branch'
  timestamp: number // seconds from start
  title: string
  content: any
  duration?: number
}

interface InteractiveLesson {
  id: string
  title: string
  description: string
  baseContent: {
    type: 'video' | 'document'
    url: string
    duration?: number
  }
  elements: InteractiveElement[]
  settings: {
    allowSkip: boolean
    showProgress: boolean
    enableCollaboration: boolean
    aiAssistanceLevel: 'none' | 'basic' | 'advanced'
  }
}

const ELEMENT_TYPES = [
  {
    id: 'pause',
    name: 'Pause Point',
    icon: Pause,
    description: 'Stop video for reflection or note-taking',
    color: 'bg-blue-500'
  },
  {
    id: 'quiz',
    name: 'Quiz Question',
    icon: CheckSquare,
    description: 'Interactive question to test understanding',
    color: 'bg-green-500'
  },
  {
    id: 'code',
    name: 'Code Exercise',
    icon: Code2,
    description: 'Hands-on coding challenge',
    color: 'bg-purple-500'
  },
  {
    id: 'discussion',
    name: 'Discussion',
    icon: MessageSquare,
    description: 'Student discussion and Q&A',
    color: 'bg-orange-500'
  },
  {
    id: 'ai_assistant',
    name: 'AI Assistant',
    icon: Brain,
    description: 'AI-powered help and suggestions',
    color: 'bg-pink-500'
  },
  {
    id: 'branch',
    name: 'Learning Path',
    icon: Zap,
    description: 'Conditional content based on progress',
    color: 'bg-yellow-500'
  }
]

export function InteractiveBuilder() {
  const [lesson, setLesson] = useState<InteractiveLesson>({
    id: '',
    title: '',
    description: '',
    baseContent: { type: 'video', url: '' },
    elements: [],
    settings: {
      allowSkip: true,
      showProgress: true,
      enableCollaboration: false,
      aiAssistanceLevel: 'basic'
    }
  })
  const [selectedElement, setSelectedElement] = useState<InteractiveElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const addElement = (type: string, timestamp: number) => {
    const newElement: InteractiveElement = {
      id: `element_${Date.now()}`,
      type: type as InteractiveElement['type'],
      timestamp,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Element`,
      content: getDefaultContent(type),
      duration: type === 'pause' ? 30 : undefined
    }

    setLesson(prev => ({
      ...prev,
      elements: [...prev.elements, newElement].sort((a, b) => a.timestamp - b.timestamp)
    }))
    
    setSelectedElement(newElement)
    toast.success(`${type} element added at ${formatTime(timestamp)}`)
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'pause':
        return {
          message: 'Take a moment to reflect on what you\'ve learned so far.',
          allowNotes: true,
          duration: 30
        }
      case 'quiz':
        return {
          question: 'What is the main concept covered in this section?',
          type: 'multiple_choice',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'Explain why this answer is correct.'
        }
      case 'code':
        return {
          language: 'javascript',
          initialCode: '// Your code here\nfunction solution() {\n  // TODO: Implement this\n}',
          expectedOutput: '',
          hints: ['Start by defining variables', 'Use the provided functions'],
          tests: []
        }
      case 'discussion':
        return {
          prompt: 'Discuss your thoughts on this topic with other learners.',
          allowAnonymous: false,
          moderated: true
        }
      case 'ai_assistant':
        return {
          trigger: 'manual',
          context: 'Help students understand the current concept',
          suggestions: ['Explain this concept', 'Show me an example', 'What are common mistakes?']
        }
      case 'branch':
        return {
          condition: 'quiz_score > 80',
          trueContent: 'Advanced content path',
          falseContent: 'Review basic concepts'
        }
      default:
        return {}
    }
  }

  const updateElement = (elementId: string, updates: Partial<InteractiveElement>) => {
    setLesson(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }))
  }

  const deleteElement = (elementId: string) => {
    setLesson(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }))
    if (selectedElement?.id === elementId) {
      setSelectedElement(null)
    }
    toast.success('Element removed')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderElementEditor = () => {
    if (!selectedElement) {
      return (
        <Card>
          <CardContent className="text-center py-8">
            <MousePointer className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Select an Element</h3>
            <p className="text-sm text-muted-foreground">
              Choose an interactive element from the timeline to edit its properties
            </p>
          </CardContent>
        </Card>
      )
    }

    const elementType = ELEMENT_TYPES.find(t => t.id === selectedElement.type)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {elementType && React.createElement(elementType.icon, { className: "h-5 w-5" })}
            <span>Edit {elementType?.name}</span>
            <Badge variant="outline">{formatTime(selectedElement.timestamp)}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={selectedElement.title}
              onChange={(e) => updateElement(selectedElement.id, { title: e.target.value })}
              placeholder="Element title..."
            />
          </div>

          {selectedElement.type === 'pause' && (
            <div className="space-y-3">
              <div>
                <Label>Pause Message</Label>
                <Textarea
                  value={selectedElement.content.message}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, message: e.target.value }
                  })}
                  placeholder="Message to display during pause..."
                />
              </div>
              <div>
                <Label>Duration (seconds)</Label>
                <Input
                  type="number"
                  value={selectedElement.content.duration}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, duration: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={selectedElement.content.allowNotes}
                  onCheckedChange={(checked) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, allowNotes: checked }
                  })}
                />
                <Label>Allow note-taking</Label>
              </div>
            </div>
          )}

          {selectedElement.type === 'quiz' && (
            <div className="space-y-3">
              <div>
                <Label>Question</Label>
                <Textarea
                  value={selectedElement.content.question}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, question: e.target.value }
                  })}
                  placeholder="Enter your quiz question..."
                />
              </div>
              <div>
                <Label>Answer Options</Label>
                <div className="space-y-2">
                  {selectedElement.content.options?.map((option: string, index: number) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...selectedElement.content.options]
                          newOptions[index] = e.target.value
                          updateElement(selectedElement.id, {
                            content: { ...selectedElement.content, options: newOptions }
                          })
                        }}
                        placeholder={`Option ${index + 1}...`}
                      />
                      <Button
                        variant={selectedElement.content.correctAnswer === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateElement(selectedElement.id, {
                          content: { ...selectedElement.content, correctAnswer: index }
                        })}
                      >
                        Correct
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Explanation</Label>
                <Textarea
                  value={selectedElement.content.explanation}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, explanation: e.target.value }
                  })}
                  placeholder="Explain why this answer is correct..."
                />
              </div>
            </div>
          )}

          {selectedElement.type === 'code' && (
            <div className="space-y-3">
              <div>
                <Label>Programming Language</Label>
                <Select
                  value={selectedElement.content.language}
                  onValueChange={(value) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, language: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Initial Code</Label>
                <Textarea
                  value={selectedElement.content.initialCode}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, initialCode: e.target.value }
                  })}
                  placeholder="Starting code for students..."
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedElement(null)}
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteElement(selectedElement.id)}
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderTimeline = () => {
    const duration = lesson.baseContent.duration || 600 // 10 minutes default
    const timelineWidth = 800
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Interactive Timeline</span>
          </CardTitle>
          <CardDescription>
            Add interactive elements at specific timestamps in your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline bar */}
            <div className="w-full h-12 bg-gray-100 dark:bg-gray-800 rounded-lg relative mb-4">
              {/* Timeline markers */}
              {Array.from({ length: Math.ceil(duration / 60) }, (_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full flex items-center"
                  style={{ left: `${(i * 60 / duration) * 100}%` }}
                >
                  <div className="w-px h-full bg-gray-300 dark:bg-gray-600" />
                  <span className="absolute -bottom-6 text-xs text-muted-foreground transform -translate-x-1/2">
                    {i}:00
                  </span>
                </div>
              ))}

              {/* Interactive elements */}
              {lesson.elements.map((element) => {
                const elementType = ELEMENT_TYPES.find(t => t.id === element.type)
                return (
                  <div
                    key={element.id}
                    className={`absolute top-1 h-10 w-6 rounded cursor-pointer transition-all ${
                      selectedElement?.id === element.id 
                        ? 'ring-2 ring-blue-500 transform scale-110' 
                        : 'hover:transform hover:scale-105'
                    }`}
                    style={{ 
                      left: `${(element.timestamp / duration) * 100}%`,
                      backgroundColor: elementType?.color.replace('bg-', '#')
                    }}
                    onClick={() => setSelectedElement(element)}
                    title={`${element.title} at ${formatTime(element.timestamp)}`}
                  >
                    {elementType && React.createElement(elementType.icon, { 
                      className: "h-3 w-3 text-white m-auto mt-2" 
                    })}
                  </div>
                )
              })}

              {/* Current time indicator */}
              <div
                className="absolute top-0 w-1 h-full bg-red-500"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Add element buttons */}
            <div className="flex flex-wrap gap-2">
              {ELEMENT_TYPES.map((elementType) => (
                <Button
                  key={elementType.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addElement(elementType.id, currentTime)}
                  className="flex items-center space-x-2"
                >
                  <elementType.icon className="h-4 w-4" />
                  <span>Add {elementType.name}</span>
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label>Current Time:</Label>
                <Input
                  type="number"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                  min={0}
                  max={duration}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">seconds</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTime(currentTime + 30)}
              >
                +30s
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 30))}
              >
                -30s
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSave = async () => {
    if (!lesson.title.trim()) {
      toast.error('Please add a lesson title')
      return
    }

    if (!lesson.baseContent.url) {
      toast.error('Please add base content (video or document)')
      return
    }

    try {
      // TODO: Save to database
      console.log('Saving interactive lesson:', lesson)
      toast.success('Interactive lesson saved successfully!')
    } catch (error) {
      console.error('Error saving lesson:', error)
      toast.error('Failed to save lesson. Please try again.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interactive Lesson Builder</h1>
          <p className="text-muted-foreground">
            Transform your content into engaging interactive experiences
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Lesson
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Base Content</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Elements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Lesson Title</Label>
                <Input
                  value={lesson.title}
                  onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter lesson title..."
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={lesson.description}
                  onChange={(e) => setLesson(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn..."
                />
              </div>
              <div>
                <Label>Base Content URL</Label>
                <Input
                  value={lesson.baseContent.url}
                  onChange={(e) => setLesson(prev => ({
                    ...prev,
                    baseContent: { ...prev.baseContent, url: e.target.value }
                  }))}
                  placeholder="Video URL, document link, or upload path..."
                />
              </div>
              <div>
                <Label>Duration (seconds)</Label>
                <Input
                  type="number"
                  value={lesson.baseContent.duration || ''}
                  onChange={(e) => setLesson(prev => ({
                    ...prev,
                    baseContent: { ...prev.baseContent, duration: parseInt(e.target.value) }
                  }))}
                  placeholder="Content duration in seconds..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          {renderTimeline()}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Element Editor</h3>
              {renderElementEditor()}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Elements List</h3>
              <Card>
                <CardContent className="p-4">
                  {lesson.elements.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No interactive elements added yet. Use the timeline to add some!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {lesson.elements.map((element) => {
                        const elementType = ELEMENT_TYPES.find(t => t.id === element.type)
                        return (
                          <div
                            key={element.id}
                            className={`p-3 border rounded cursor-pointer transition-colors ${
                              selectedElement?.id === element.id
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedElement(element)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {elementType && React.createElement(elementType.icon, { 
                                  className: "h-4 w-4" 
                                })}
                                <span className="font-medium">{element.title}</span>
                              </div>
                              <Badge variant="outline">
                                {formatTime(element.timestamp)}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Settings</CardTitle>
              <CardDescription>
                Configure how students interact with your lesson
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Skipping</Label>
                  <p className="text-sm text-muted-foreground">
                    Let students skip interactive elements
                  </p>
                </div>
                <Switch
                  checked={lesson.settings.allowSkip}
                  onCheckedChange={(checked) => setLesson(prev => ({
                    ...prev,
                    settings: { ...prev.settings, allowSkip: checked }
                  }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Progress</Label>
                  <p className="text-sm text-muted-foreground">
                    Display completion progress to students
                  </p>
                </div>
                <Switch
                  checked={lesson.settings.showProgress}
                  onCheckedChange={(checked) => setLesson(prev => ({
                    ...prev,
                    settings: { ...prev.settings, showProgress: checked }
                  }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Collaboration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow students to collaborate on exercises
                  </p>
                </div>
                <Switch
                  checked={lesson.settings.enableCollaboration}
                  onCheckedChange={(checked) => setLesson(prev => ({
                    ...prev,
                    settings: { ...prev.settings, enableCollaboration: checked }
                  }))}
                />
              </div>
              
              <div>
                <Label>AI Assistance Level</Label>
                <Select
                  value={lesson.settings.aiAssistanceLevel}
                  onValueChange={(value: any) => setLesson(prev => ({
                    ...prev,
                    settings: { ...prev.settings, aiAssistanceLevel: value }
                  }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No AI Assistance</SelectItem>
                    <SelectItem value="basic">Basic Hints</SelectItem>
                    <SelectItem value="advanced">Advanced AI Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Lesson Preview</span>
              </CardTitle>
              <CardDescription>
                See how your interactive lesson will appear to students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Interactive Preview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Preview functionality will be available in the next update
                </p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}