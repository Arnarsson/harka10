'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, Menu, X, CheckCircle, 
  Circle, Lock, PlayCircle, FileText, PenTool, BarChart,
  MessageSquare, Award, Download
} from 'lucide-react'
import { VideoPlayer } from '@/components/ui/video-player'
import type { Course, Lesson, Module } from '@/lib/types/course'

export default function LessonViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourseData()
  }, [params.id])

  const loadCourseData = async () => {
    setLoading(true)
    try {
      // Mock course data - same as detail page
      const mockCourse: Course = {
        id: params.id as string,
        title: 'Complete Web Development Bootcamp',
        description: 'The only course you need to learn web development',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
        category: 'Development',
        level: 'beginner',
        duration: 2400,
        price: 89.99,
        currency: 'USD',
        instructor: {
          id: '1',
          name: 'Sarah Chen',
          bio: 'Full-stack developer with 10+ years experience',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
          title: 'Senior Full-Stack Developer',
          courses: 5,
          students: 15000,
          rating: 4.8
        },
        modules: [
          {
            id: 'm1',
            title: 'Introduction to Web Development',
            description: 'Get started with the basics',
            duration: 180,
            order: 1,
            lessons: [
              {
                id: 'l1',
                title: 'Welcome to the Course',
                description: 'Course overview and what you\'ll learn',
                type: 'video',
                content: {
                  video: {
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    duration: 300
                  }
                },
                duration: 5,
                order: 1,
                isPreview: true
              },
              {
                id: 'l2',
                title: 'Setting Up Your Development Environment',
                description: 'Install all the tools you need',
                type: 'video',
                content: {
                  video: {
                    url: 'https://vimeo.com/76979871',
                    duration: 900
                  }
                },
                duration: 15,
                order: 2,
                isPreview: false
              },
              {
                id: 'l3',
                title: 'How the Web Works',
                description: 'Understanding browsers, servers, and HTTP',
                type: 'text',
                content: {
                  text: {
                    content: `# How the Web Works

## Introduction
The World Wide Web is a system of interlinked hypertext documents accessed via the Internet. With a web browser, one can view web pages that may contain text, images, videos, and other multimedia.

## Key Components

### 1. Web Browser
A web browser is a software application used to locate, retrieve, and display content on the World Wide Web. Popular browsers include:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

### 2. Web Server
A web server is a computer that stores web content and delivers it to users. When you type a URL into your browser:
1. The browser sends an HTTP request to the server
2. The server processes the request
3. The server sends back an HTTP response with the requested content

### 3. HTTP/HTTPS
HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. HTTPS is the secure version of HTTP.

### 4. HTML, CSS, and JavaScript
- **HTML**: Provides the structure and content
- **CSS**: Controls the presentation and layout
- **JavaScript**: Adds interactivity and dynamic behavior

## The Request-Response Cycle
1. User enters a URL in the browser
2. Browser performs DNS lookup to find the server's IP address
3. Browser establishes a TCP connection with the server
4. Browser sends an HTTP request
5. Server processes the request and sends back a response
6. Browser receives the response and renders the page

## Summary
Understanding how the web works is fundamental to becoming a web developer. In the next lessons, we'll dive deeper into each of these components.`,
                    estimatedReadTime: 10
                  }
                },
                duration: 10,
                order: 3,
                isPreview: false
              }
            ]
          },
          {
            id: 'm2',
            title: 'HTML & CSS Fundamentals',
            description: 'Master the building blocks',
            duration: 360,
            order: 2,
            lessons: [
              {
                id: 'l4',
                title: 'HTML Basics',
                description: 'Learn HTML tags and structure',
                type: 'video',
                content: {
                  video: {
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    duration: 1200
                  }
                },
                duration: 20,
                order: 1,
                isPreview: false
              }
            ]
          }
        ],
        tags: [],
        language: 'English',
        requirements: [],
        objectives: [],
        enrollmentCount: 12543,
        rating: 4.7,
        reviewCount: 3421,
        lastUpdated: '2024-01-15',
        createdAt: '2023-06-01',
        publishedAt: '2023-06-15',
        status: 'published'
      }

      setCourse(mockCourse)
      
      // Set first lesson as current
      if (mockCourse.modules.length > 0 && mockCourse.modules[0].lessons.length > 0) {
        setCurrentModule(mockCourse.modules[0])
        setCurrentLesson(mockCourse.modules[0].lessons[0])
      }

      // Load saved progress (mock data)
      setCompletedLessons(['l1'])
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLessonIcon = (type: string, size = 16) => {
    switch (type) {
      case 'video': return <PlayCircle size={size} />
      case 'text': return <FileText size={size} />
      case 'quiz': return <BarChart size={size} />
      case 'assignment': return <PenTool size={size} />
      default: return <PlayCircle size={size} />
    }
  }

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
      // In real app, save progress to backend
    }
  }

  const navigateToLesson = (module: Module, lesson: Lesson) => {
    setCurrentModule(module)
    setCurrentLesson(lesson)
  }

  const goToNextLesson = () => {
    if (!course || !currentModule || !currentLesson) return

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id)
    
    // Check if there's a next lesson in current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex + 1])
    } else {
      // Move to next module
      const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id)
      if (currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1]
        setCurrentModule(nextModule)
        setCurrentLesson(nextModule.lessons[0])
      }
    }
  }

  const goToPreviousLesson = () => {
    if (!course || !currentModule || !currentLesson) return

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id)
    
    // Check if there's a previous lesson in current module
    if (currentLessonIndex > 0) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex - 1])
    } else {
      // Move to previous module
      const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id)
      if (currentModuleIndex > 0) {
        const prevModule = course.modules[currentModuleIndex - 1]
        setCurrentModule(prevModule)
        setCurrentLesson(prevModule.lessons[prevModule.lessons.length - 1])
      }
    }
  }

  const calculateProgress = () => {
    if (!course) return 0
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    return Math.round((completedLessons.length / totalLessons) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
      </div>
    )
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zinc-600">Course not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed lg:relative w-80 h-screen bg-white border-r border-zinc-200 overflow-y-auto z-40"
          >
            <div className="sticky top-0 bg-white border-b border-zinc-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold line-clamp-1">{course.title}</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-zinc-600 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Your progress</span>
                  <span className="font-medium">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div 
                    className="bg-black rounded-full h-2 transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
              {course.modules.map((module) => (
                <div key={module.id} className="mb-6">
                  <h3 className="font-medium text-sm text-zinc-600 mb-3">
                    {module.title}
                  </h3>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id)
                      const isCurrent = currentLesson?.id === lesson.id
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigateToLesson(module, lesson)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                            isCurrent 
                              ? 'bg-zinc-100 border border-zinc-300' 
                              : 'hover:bg-zinc-50'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle size={20} className="text-zinc-400 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {getLessonIcon(lesson.type)}
                              <p className="text-sm font-medium line-clamp-1">
                                {lesson.title}
                              </p>
                            </div>
                            <p className="text-xs text-zinc-600">
                              {lesson.duration} min
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-zinc-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-zinc-600 hover:text-black"
              >
                <Menu size={24} />
              </button>
              <nav className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => router.push('/courses')}
                  className="text-zinc-600 hover:text-black"
                >
                  Courses
                </button>
                <ChevronRight size={16} className="text-zinc-400" />
                <button 
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="text-zinc-600 hover:text-black line-clamp-1"
                >
                  {course.title}
                </button>
                <ChevronRight size={16} className="text-zinc-400" />
                <span className="font-medium line-clamp-1">{currentLesson.title}</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {getLessonIcon(currentLesson.type, 24)}
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              </div>
              <p className="text-zinc-600">{currentLesson.description}</p>
            </div>

            {/* Lesson Content */}
            <div className="mb-8">
              {currentLesson.type === 'video' && currentLesson.content.video && (
                <VideoPlayer
                  url={currentLesson.content.video.url}
                  title={currentLesson.title}
                  aspectRatio="16:9"
                  onComplete={() => markLessonComplete(currentLesson.id)}
                />
              )}

              {currentLesson.type === 'text' && currentLesson.content.text && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="prose prose-zinc max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: currentLesson.content.text.content.replace(/\n/g, '<br />') 
                    }} />
                  </div>
                </div>
              )}

              {currentLesson.type === 'quiz' && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Quiz</h2>
                  <p className="text-zinc-600">Quiz content would go here...</p>
                </div>
              )}

              {currentLesson.type === 'assignment' && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Assignment</h2>
                  <p className="text-zinc-600">Assignment content would go here...</p>
                </div>
              )}
            </div>

            {/* Lesson Actions */}
            <div className="flex items-center justify-between pb-8">
              <button
                onClick={goToPreviousLesson}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {!completedLessons.includes(currentLesson.id) && (
                <button
                  onClick={() => markLessonComplete(currentLesson.id)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Mark as Complete
                </button>
              )}

              <button
                onClick={goToNextLesson}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Additional Resources */}
            <div className="border-t border-zinc-200 pt-8">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                  <MessageSquare size={20} />
                  <div className="text-left">
                    <p className="font-medium">Q&A</p>
                    <p className="text-sm text-zinc-600">Ask questions and get answers</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                  <Download size={20} />
                  <div className="text-left">
                    <p className="font-medium">Downloads</p>
                    <p className="text-sm text-zinc-600">Course materials and resources</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}