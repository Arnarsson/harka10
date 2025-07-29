'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  FileText,
  Code,
  Video,
  CheckCircle,
  Circle,
  BookOpen,
  Clock,
  Download,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  Settings,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { CertificateProgressBar } from '@/components/certificates/CertificateProgressBar'

interface Lesson {
  id: string
  title: string
  description: string
  type: 'video' | 'text' | 'code' | 'quiz'
  duration?: number // in minutes
  content: {
    videoUrl?: string
    textContent?: string
    codeSnippet?: string
    language?: string
  }
  resources?: Array<{
    title: string
    url: string
    type: 'pdf' | 'code' | 'link'
  }>
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface InteractiveLessonViewerProps {
  course: {
    id: string
    title: string
    modules: Module[]
  }
  currentProgress?: {
    moduleId: string
    lessonId: string
    progress: number // 0-100
  }
  onProgressUpdate?: (progress: any) => void
  certificateProgress?: number
}

export function InteractiveLessonViewer({
  course,
  currentProgress,
  onProgressUpdate,
  certificateProgress = 0
}: InteractiveLessonViewerProps) {
  const [selectedModule, setSelectedModule] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [bookmarkedLessons, setBookmarkedLessons] = useState<Set<string>>(new Set())
  const [lessonProgress, setLessonProgress] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentModuleData = course.modules[selectedModule]
  const currentLesson = currentModuleData?.lessons[selectedLesson]

  // Calculate overall progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const overallProgress = (completedLessons.size / totalLessons) * 100

  useEffect(() => {
    // Load saved progress
    if (currentProgress) {
      const moduleIndex = course.modules.findIndex(m => m.id === currentProgress.moduleId)
      const lessonIndex = course.modules[moduleIndex]?.lessons.findIndex(l => l.id === currentProgress.lessonId)
      
      if (moduleIndex >= 0 && lessonIndex >= 0) {
        setSelectedModule(moduleIndex)
        setSelectedLesson(lessonIndex)
      }
    }
  }, [currentProgress, course.modules])

  const markLessonComplete = () => {
    const lessonId = currentLesson.id
    setCompletedLessons(prev => new Set(prev).add(lessonId))
    
    if (onProgressUpdate) {
      onProgressUpdate({
        moduleId: currentModuleData.id,
        lessonId: lessonId,
        progress: 100,
        completedLessons: Array.from(completedLessons).concat(lessonId)
      })
    }

    // Auto-advance to next lesson
    if (selectedLesson < currentModuleData.lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1)
    } else if (selectedModule < course.modules.length - 1) {
      setSelectedModule(selectedModule + 1)
      setSelectedLesson(0)
    }
  }

  const toggleBookmark = () => {
    const lessonId = currentLesson.id
    setBookmarkedLessons(prev => {
      const newSet = new Set(prev)
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId)
      } else {
        newSet.add(lessonId)
      }
      return newSet
    })
  }

  const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    const progress = (video.currentTime / video.duration) * 100
    setLessonProgress(progress)
    
    if (progress > 90 && !completedLessons.has(currentLesson.id)) {
      markLessonComplete()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Course Navigation */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-80 bg-white border-r flex flex-col"
      >
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">{course.title}</h2>
          <div className="mt-2 text-sm text-gray-600">
            <Progress value={overallProgress} className="h-2" />
            <p className="mt-1">{completedLessons.size} of {totalLessons} lessons completed</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="border-b">
              <button
                onClick={() => {
                  setSelectedModule(moduleIndex)
                  setSelectedLesson(0)
                }}
                className={cn(
                  "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                  selectedModule === moduleIndex && "bg-gray-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{module.title}</h3>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    selectedModule === moduleIndex && "rotate-90"
                  )} />
                </div>
              </button>

              <AnimatePresence>
                {selectedModule === moduleIndex && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.has(lesson.id)
                      const isBookmarked = bookmarkedLessons.has(lesson.id)
                      const isActive = selectedLesson === lessonIndex

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lessonIndex)}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3",
                            isActive && "bg-blue-50 border-l-4 border-blue-500"
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-sm truncate",
                              isActive && "font-medium"
                            )}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              {lesson.type === 'video' && <Video className="h-3 w-3" />}
                              {lesson.type === 'text' && <FileText className="h-3 w-3" />}
                              {lesson.type === 'code' && <Code className="h-3 w-3" />}
                              {lesson.duration && (
                                <span>{lesson.duration} min</span>
                              )}
                            </div>
                          </div>

                          {isBookmarked && (
                            <BookmarkCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Certificate Progress */}
        <div className="p-4 border-t">
          <CertificateProgressBar
            progress={certificateProgress}
            height="sm"
            showPercentage
            certificateUnlocked={certificateProgress >= 100}
            onUnlock={() => console.log('Show certificate')}
          />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Lesson Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{currentLesson?.title}</h1>
              <p className="text-gray-600 text-sm mt-1">{currentLesson?.description}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatedTooltip content={bookmarkedLessons.has(currentLesson?.id) ? "Remove bookmark" : "Add bookmark"}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleBookmark}
                  className="gap-2"
                >
                  {bookmarkedLessons.has(currentLesson?.id) ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </AnimatedTooltip>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Notes
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-hidden flex">
          <div className={cn(
            "flex-1 p-6 overflow-y-auto",
            showNotes && "pr-0"
          )}>
            {currentLesson?.type === 'video' && currentLesson.content.videoUrl && (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={currentLesson.content.videoUrl}
                  className="w-full aspect-video"
                  onTimeUpdate={handleVideoProgress}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3 text-white">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (videoRef.current) {
                          if (isPlaying) {
                            videoRef.current.pause()
                          } else {
                            videoRef.current.play()
                          }
                        }
                      }}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex-1">
                      <Progress value={lessonProgress} className="h-1" />
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted
                          setIsMuted(!isMuted)
                        }
                      }}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (videoRef.current) {
                          if (isFullscreen) {
                            document.exitFullscreen()
                          } else {
                            videoRef.current.requestFullscreen()
                          }
                          setIsFullscreen(!isFullscreen)
                        }
                      }}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentLesson?.type === 'text' && (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content.textContent || '' }} />
              </div>
            )}

            {currentLesson?.type === 'code' && (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="overflow-x-auto">
                  <code>{currentLesson.content.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Resources */}
            {currentLesson?.resources && currentLesson.resources.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <div className="space-y-2">
                  {currentLesson.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{resource.title}</span>
                      <span className="text-xs text-gray-500 ml-auto">{resource.type.toUpperCase()}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes Panel */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 400 }}
                exit={{ width: 0 }}
                className="border-l bg-white overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Notes</h3>
                  <textarea
                    className="w-full h-64 p-3 border rounded-lg resize-none"
                    placeholder="Take notes about this lesson..."
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (selectedLesson > 0) {
                  setSelectedLesson(selectedLesson - 1)
                } else if (selectedModule > 0) {
                  setSelectedModule(selectedModule - 1)
                  setSelectedLesson(course.modules[selectedModule - 1].lessons.length - 1)
                }
              }}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Lesson {selectedLesson + 1} of {currentModuleData?.lessons.length}
              </span>
            </div>

            <Button
              onClick={() => {
                if (!completedLessons.has(currentLesson.id)) {
                  markLessonComplete()
                } else if (selectedLesson < currentModuleData.lessons.length - 1) {
                  setSelectedLesson(selectedLesson + 1)
                } else if (selectedModule < course.modules.length - 1) {
                  setSelectedModule(selectedModule + 1)
                  setSelectedLesson(0)
                }
              }}
              className="gap-2"
            >
              {!completedLessons.has(currentLesson?.id) ? 'Mark Complete' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}