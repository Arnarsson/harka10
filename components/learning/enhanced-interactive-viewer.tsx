"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { InteractiveCodeEditor } from '@/components/playground/interactive-code-editor'
import { 
  Play, Pause, SkipForward, Clock, CheckSquare, 
  MessageSquare, Brain, StickyNote, Users, 
  ChevronRight, ChevronLeft, Volume2, VolumeX
} from 'lucide-react'
import { toast } from 'sonner'

interface InteractiveElement {
  id: string
  type: 'pause' | 'quiz' | 'code' | 'discussion' | 'ai_assistant'
  timestamp: number
  title: string
  content: any
  completed?: boolean
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

// Mock lesson data - in real app this would come from the builder
const MOCK_INTERACTIVE_LESSON: InteractiveLesson = {
  id: 'lesson_1',
  title: 'React Hooks Deep Dive',
  description: 'Master React Hooks with interactive exercises and real-time feedback',
  baseContent: {
    type: 'video',
    url: 'https://example.com/video.mp4',
    duration: 600 // 10 minutes
  },
  elements: [
    {
      id: 'pause_1',
      type: 'pause',
      timestamp: 120,
      title: 'Reflection Point',
      content: {
        message: 'Take a moment to think about what useState does. Why is it useful?',
        duration: 30,
        allowNotes: true
      }
    },
    {
      id: 'quiz_1', 
      type: 'quiz',
      timestamp: 240,
      title: 'useState Quiz',
      content: {
        question: 'What does the useState hook return?',
        type: 'multiple_choice',
        options: [
          'A single state value',
          'An array with state value and setter',
          'A setter function only',
          'An object with state properties'
        ],
        correctAnswer: 1,
        explanation: 'useState returns an array with two elements: the current state value and a function to update it.'
      }
    },
    {
      id: 'code_1',
      type: 'code', 
      timestamp: 360,
      title: 'Build a Counter',
      content: {
        language: 'javascript',
        initialCode: `import React, { useState } from 'react';

function Counter() {
  // TODO: Add useState hook for count
  
  // TODO: Add increment function
  
  return (
    <div>
      <p>Count: {/* display count here */}</p>
      <button onClick={/* add click handler */}>
        Increment
      </button>
    </div>
  );
}`,
        expectedOutput: 'A working counter component',
        hints: [
          'Use useState(0) to initialize count to 0',
          'Create a function to increment count by 1',
          'Use the setter function from useState'
        ],
        tests: []
      }
    }
  ],
  settings: {
    allowSkip: false,
    showProgress: true,
    enableCollaboration: true,
    aiAssistanceLevel: 'basic'
  }
}

interface EnhancedInteractiveViewerProps {
  lesson?: InteractiveLesson
  onComplete?: (lessonId: string) => void
}

export function EnhancedInteractiveViewer({ 
  lesson = MOCK_INTERACTIVE_LESSON, 
  onComplete 
}: EnhancedInteractiveViewerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeElement, setActiveElement] = useState<InteractiveElement | null>(null)
  const [completedElements, setCompletedElements] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState('')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [codeSubmissions, setCodeSubmissions] = useState<Record<string, string>>({})
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Check for interactive elements at current timestamp
  useEffect(() => {
    const elementAtTime = lesson.elements.find(
      el => Math.abs(el.timestamp - currentTime) < 2 && !completedElements.has(el.id)
    )
    
    if (elementAtTime && isPlaying) {
      setActiveElement(elementAtTime)
      setIsPlaying(false) // Pause for interaction
    }
  }, [currentTime, lesson.elements, completedElements, isPlaying])

  // Calculate progress
  const progress = lesson.baseContent.duration 
    ? (currentTime / lesson.baseContent.duration) * 100 
    : 0

  const elementsProgress = (completedElements.size / lesson.elements.length) * 100

  const handleElementComplete = (elementId: string, data?: any) => {
    setCompletedElements(prev => new Set([...prev, elementId]))
    
    // Store specific data based on element type
    const element = lesson.elements.find(el => el.id === elementId)
    if (element?.type === 'quiz' && data?.answer !== undefined) {
      setQuizAnswers(prev => ({ ...prev, [elementId]: data.answer }))
    } else if (element?.type === 'code' && data?.code) {
      setCodeSubmissions(prev => ({ ...prev, [elementId]: data.code }))
    }
    
    setActiveElement(null)
    setIsPlaying(true) // Resume playback
    
    toast.success(`${element?.title} completed!`)
    
    // Check if all elements completed
    if (completedElements.size + 1 === lesson.elements.length) {
      onComplete?.(lesson.id)
    }
  }

  const handleSkip = () => {
    if (lesson.settings.allowSkip && activeElement) {
      handleElementComplete(activeElement.id)
    }
  }

  const renderInteractiveElement = () => {
    if (!activeElement) return null

    return (
      <Card className="mt-4 border-2 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              {getElementIcon(activeElement.type)}
              <span>{activeElement.title}</span>
            </span>
            <Badge variant="secondary">
              {formatTime(activeElement.timestamp)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeElement.type === 'pause' && renderPauseElement()}
          {activeElement.type === 'quiz' && renderQuizElement()}
          {activeElement.type === 'code' && renderCodeElement()}
          {activeElement.type === 'discussion' && renderDiscussionElement()}
          {activeElement.type === 'ai_assistant' && renderAIElement()}
        </CardContent>
      </Card>
    )
  }

  const renderPauseElement = () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-blue-800 dark:text-blue-200">
          {activeElement!.content.message}
        </p>
      </div>
      
      {activeElement!.content.allowNotes && (
        <div>
          <label className="text-sm font-medium">Your Notes:</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts here..."
            className="mt-2"
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Take {activeElement!.content.duration} seconds to reflect
        </p>
        <div className="space-x-2">
          {lesson.settings.allowSkip && (
            <Button variant="outline" onClick={handleSkip}>
              Skip
            </Button>
          )}
          <Button onClick={() => handleElementComplete(activeElement!.id)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )

  const renderQuizElement = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    
    const handleSubmit = () => {
      if (selectedAnswer === null) return
      setShowResult(true)
      
      setTimeout(() => {
        handleElementComplete(activeElement!.id, { answer: selectedAnswer })
      }, 2000)
    }
    
    const isCorrect = selectedAnswer === activeElement!.content.correctAnswer

    return (
      <div className="space-y-4">
        <h4 className="font-semibold">{activeElement!.content.question}</h4>
        
        <div className="space-y-2">
          {activeElement!.content.options.map((option: string, index: number) => (
            <div
              key={index}
              className={`p-3 border rounded cursor-pointer transition-colors ${
                selectedAnswer === index
                  ? showResult
                    ? index === activeElement!.content.correctAnswer
                      ? 'bg-green-100 border-green-500 dark:bg-green-900/20'
                      : 'bg-red-100 border-red-500 dark:bg-red-900/20'
                    : 'bg-blue-100 border-blue-500 dark:bg-blue-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => !showResult && setSelectedAnswer(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {showResult && (
          <div className={`p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
          }`}>
            <p className="font-semibold">
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-sm mt-1">
              {activeElement!.content.explanation}
            </p>
          </div>
        )}
        
        {!showResult && (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedAnswer === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}
      </div>
    )
  }

  const renderCodeElement = () => {
    const mockLesson = {
      id: activeElement!.id,
      title: activeElement!.title,
      code: activeElement!.content.initialCode,
      language: activeElement!.content.language,
      type: 'code' as const
    }

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>{activeElement!.content.expectedOutput}</p>
        </div>
        
        <InteractiveCodeEditor
          lesson={mockLesson}
          onSave={(code) => handleElementComplete(activeElement!.id, { code })}
          className="min-h-[300px]"
        />
        
        {activeElement!.content.hints.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">💡 Hints</summary>
            <ul className="mt-2 space-y-1">
              {activeElement!.content.hints.map((hint: string, index: number) => (
                <li key={index} className="text-muted-foreground">
                  • {hint}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    )
  }

  const renderDiscussionElement = () => (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <p className="text-orange-800 dark:text-orange-200">
          {activeElement!.content.prompt}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>3 other students are discussing this</span>
      </div>
      
      <Button onClick={() => handleElementComplete(activeElement!.id)}>
        Join Discussion
      </Button>
    </div>
  )

  const renderAIElement = () => (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-800 dark:text-purple-200">
            AI Assistant
          </span>
        </div>
        <p className="text-purple-800 dark:text-purple-200">
          I'm here to help! What would you like to know about this section?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {activeElement!.content.suggestions.map((suggestion: string, index: number) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-left h-auto p-3"
            onClick={() => toast.info(`AI: ${suggestion}`)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      
      <Button onClick={() => handleElementComplete(activeElement!.id)}>
        Continue Learning
      </Button>
    </div>
  )

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'pause': return <Clock className="h-4 w-4" />
      case 'quiz': return <CheckSquare className="h-4 w-4" />
      case 'code': return <MessageSquare className="h-4 w-4" />
      case 'discussion': return <Users className="h-4 w-4" />
      case 'ai_assistant': return <Brain className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Lesson Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>

      {/* Progress */}
      {lesson.settings.showProgress && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Video Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Interactive Elements</span>
                <span>{completedElements.size}/{lesson.elements.length}</span>
              </div>
              <Progress value={elementsProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Video Player</p>
                <p className="text-sm opacity-75">
                  {formatTime(currentTime)} / {formatTime(lesson.baseContent.duration || 0)}
                </p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <div className="flex-1">
                  <Progress value={progress} className="h-1" />
                </div>
                
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(lesson.baseContent.duration || 0)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Element */}
      {activeElement && renderInteractiveElement()}

      {/* Elements Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {lesson.elements.map((element, index) => (
              <div
                key={element.id}
                className={`flex items-center justify-between p-3 rounded border ${
                  completedElements.has(element.id)
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20'
                    : activeElement?.id === element.id
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500">
                    {getElementIcon(element.type)}
                  </div>
                  <div>
                    <p className="font-medium">{element.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(element.timestamp)}
                    </p>
                  </div>
                </div>
                <div>
                  {completedElements.has(element.id) && (
                    <Badge variant="secondary">✓ Complete</Badge>
                  )}
                  {activeElement?.id === element.id && (
                    <Badge>Active</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Debug Controls (for testing) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Debug Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => setCurrentTime(120)}>
              Go to Pause (2:00)
            </Button>
            <Button size="sm" onClick={() => setCurrentTime(240)}>
              Go to Quiz (4:00)
            </Button>
            <Button size="sm" onClick={() => setCurrentTime(360)}>
              Go to Code (6:00)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}