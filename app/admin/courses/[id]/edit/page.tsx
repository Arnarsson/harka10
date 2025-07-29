'use client'

import { withAuth } from '@/lib/auth/hooks'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Save, Upload, Plus, X, Trash2, 
  GripVertical, Video, FileText, PenTool, BarChart,
  Globe, DollarSign, Clock, Award, Image as ImageIcon,
  Play, Edit3, Settings, Eye
} from 'lucide-react'
import { VideoPlayer } from '@/components/ui/video-player'
import { LessonEditor } from '@/components/admin/lesson-editor'
import type { Course, Module, Lesson } from '@/lib/types/course'

function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState<'basic' | 'curriculum' | 'pricing' | 'settings'>('basic')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showLessonEditor, setShowLessonEditor] = useState(false)

  useEffect(() => {
    loadCourse()
  }, [params.id])

  const loadCourse = async () => {
    // TODO: Load actual course from Supabase
    // Mock data for now
    const mockCourse: Course = {
      id: params.id as string,
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      category: 'Development',
      level: 'beginner',
      duration: 2400,
      price: 89.99,
      currency: 'USD',
      instructor: {
        id: '1',
        name: 'Sarah Chen',
        bio: 'Full-stack developer with 10+ years experience',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        title: 'Senior Developer',
        courses: 5,
        students: 15000,
        rating: 4.8
      },
      modules: [
        {
          id: 'm1',
          title: 'Introduction to Web Development',
          description: 'Get started with the basics of web development',
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
            }
          ]
        }
      ],
      tags: ['Web Development', 'React', 'Node.js'],
      language: 'English',
      requirements: ['No programming experience needed', 'A computer with Windows, macOS, or Linux'],
      objectives: ['Build 25+ real-world projects', 'Master modern web technologies'],
      enrollmentCount: 12543,
      rating: 4.7,
      reviewCount: 3421,
      lastUpdated: '2024-01-15',
      createdAt: '2023-06-01',
      publishedAt: '2023-06-15',
      status: 'published'
    }
    setCourse(mockCourse)
  }

  const saveCourse = async () => {
    setLoading(true)
    try {
      // TODO: Save to Supabase
      console.log('Saving course:', course)
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/admin/courses')
    } catch (error) {
      console.error('Error saving course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLessonEdit = (moduleId: string, lesson: Lesson) => {
    setSelectedLesson(lesson)
    setShowLessonEditor(true)
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/courses"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Edit Course</h1>
                <p className="text-sm text-zinc-600">{course.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/courses/${course.id}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <Eye size={20} />
                Preview
              </Link>
              <button
                onClick={saveCourse}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-1">Students Enrolled</p>
            <p className="text-2xl font-bold">{course.enrollmentCount.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-1">Average Rating</p>
            <p className="text-2xl font-bold">{course.rating} ⭐</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold">${(course.price * course.enrollmentCount).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold">73%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 border border-zinc-200">
          {[
            { id: 'basic', label: 'Basic Information' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Course Curriculum</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                  <Plus size={20} />
                  Add Module
                </button>
              </div>

              {course.modules.map((module) => (
                <div key={module.id} className="border border-zinc-200 rounded-lg">
                  <div className="p-4 bg-zinc-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical size={20} className="text-zinc-400 cursor-move" />
                        <h3 className="font-medium">{module.title}</h3>
                        <span className="text-sm text-zinc-600">
                          {module.lessons.length} lessons • {Math.floor(module.duration / 60)}h {module.duration % 60}m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors"
                      >
                        <GripVertical size={16} className="text-zinc-400 cursor-move" />
                        {lesson.type === 'video' && <Video size={16} />}
                        {lesson.type === 'text' && <FileText size={16} />}
                        {lesson.type === 'quiz' && <BarChart size={16} />}
                        {lesson.type === 'assignment' && <PenTool size={16} />}
                        <div className="flex-1">
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-zinc-600">{lesson.duration} min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.isPreview && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Preview
                            </span>
                          )}
                          <button
                            onClick={() => handleLessonEdit(module.id, lesson)}
                            className="p-2 hover:bg-zinc-200 rounded-lg transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          {lesson.type === 'video' && lesson.content.video && (
                            <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
                              <Play size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button className="w-full p-3 border-2 border-dashed border-zinc-300 rounded-lg text-zinc-600 hover:border-zinc-400 hover:text-zinc-700 transition-colors">
                      + Add Lesson
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Lesson Editor Modal */}
      {showLessonEditor && selectedLesson && (
        <LessonEditor
          lesson={selectedLesson}
          moduleId={course.modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id || ''}
          onSave={(moduleId, updatedLesson) => {
            // Update the lesson in the course
            setCourse(prev => {
              if (!prev) return prev
              return {
                ...prev,
                modules: prev.modules.map(module => 
                  module.id === moduleId
                    ? {
                        ...module,
                        lessons: module.lessons.map(lesson =>
                          lesson.id === updatedLesson.id ? updatedLesson : lesson
                        )
                      }
                    : module
                )
              }
            })
            setShowLessonEditor(false)
          }}
          onClose={() => setShowLessonEditor(false)}
        />
      )}
    </div>
  )
}

export default withAuth(EditCoursePage, {
  requireAuth: true,
  requireRole: 'admin',
  redirectTo: '/login'
})