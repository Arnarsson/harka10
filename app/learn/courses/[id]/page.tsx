'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Clock, Users, Star, Award, Globe, CheckCircle, 
  Lock, ChevronDown, ChevronUp, Video, FileText, PenTool,
  BarChart, Calendar, Heart
} from 'lucide-react'
import { VideoPlayer } from '@/components/ui/video-player'
import type { Course } from '@/lib/types/course'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    loadCourse()
  }, [params.id])

  const loadCourse = async () => {
    setLoading(true)
    try {
      // Mock course data with full details
      const mockCourse: Course = {
        id: params.id as string,
        title: 'Complete Web Development Bootcamp',
        description: 'The only course you need to learn web development - HTML, CSS, JS, Node, React, MongoDB, and more! This comprehensive bootcamp-style course will take you from zero to hero in web development.',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
        category: 'Development',
        level: 'beginner',
        duration: 2400,
        price: 89.99,
        currency: 'USD',
        instructor: {
          id: '1',
          name: 'Sarah Chen',
          bio: 'Full-stack developer with 10+ years experience building web applications for startups and Fortune 500 companies. Passionate about teaching and helping others learn to code.',
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
              },
              {
                id: 'l3',
                title: 'How the Web Works',
                description: 'Understanding browsers, servers, and HTTP',
                type: 'text',
                content: {
                  text: {
                    content: 'Detailed explanation of web architecture...',
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
            description: 'Master the building blocks of web pages',
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
              },
              {
                id: 'l5',
                title: 'CSS Styling',
                description: 'Style your web pages with CSS',
                type: 'video',
                content: {
                  video: {
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    duration: 1800
                  }
                },
                duration: 30,
                order: 2,
                isPreview: false
              },
              {
                id: 'l6',
                title: 'HTML & CSS Quiz',
                description: 'Test your knowledge',
                type: 'quiz',
                content: {
                  quiz: {
                    questions: [],
                    passingScore: 70
                  }
                },
                duration: 15,
                order: 3,
                isPreview: false
              }
            ]
          },
          {
            id: 'm3',
            title: 'JavaScript Programming',
            description: 'Learn to make your websites interactive',
            duration: 600,
            order: 3,
            lessons: [
              {
                id: 'l7',
                title: 'JavaScript Basics',
                description: 'Variables, functions, and data types',
                type: 'video',
                content: {
                  video: {
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    duration: 2400
                  }
                },
                duration: 40,
                order: 1,
                isPreview: true
              }
            ]
          }
        ],
        tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        language: 'English',
        requirements: [
          'No programming experience needed - I\'ll teach you everything you need to know',
          'A computer with Windows, macOS, or Linux',
          'Basic computer skills (using files, browsing the web, etc.)'
        ],
        objectives: [
          'Build 25+ real-world web development projects',
          'Master modern HTML5, CSS3, and JavaScript ES6+',
          'Learn React.js for building interactive UIs',
          'Build backend applications with Node.js and Express',
          'Work with MongoDB and other databases',
          'Deploy your applications to production'
        ],
        enrollmentCount: 12543,
        rating: 4.7,
        reviewCount: 3421,
        lastUpdated: '2024-01-15',
        createdAt: '2023-06-01',
        publishedAt: '2023-06-15',
        status: 'published'
      }

      setCourse(mockCourse)
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handlePreview = (url: string) => {
    setPreviewUrl(url)
    setShowPreview(true)
  }

  const handleEnroll = () => {
    // In real app, this would handle payment and enrollment
    setIsEnrolled(true)
    router.push(`/courses/${params.id}/learn`)
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />
      case 'text': return <FileText size={16} />
      case 'quiz': return <BarChart size={16} />
      case 'assignment': return <PenTool size={16} />
      default: return <Play size={16} />
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zinc-600">Course not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-white/10 rounded-full">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full capitalize">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-zinc-300">{course.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="fill-current text-yellow-400" size={20} />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-zinc-400">({course.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{course.enrollmentCount.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Created by {course.instructor.name}</p>
                  <p className="text-sm text-zinc-400">{course.instructor.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-zinc-300">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Last updated {new Date(course.lastUpdated).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={16} />
                  {course.language}
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white text-zinc-900 rounded-lg p-6 space-y-4">
                {/* Thumbnail */}
                <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-100">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handlePreview(course.modules[0].lessons[0].content.video?.url || '')}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <Play size={24} className="text-black ml-1" />
                    </div>
                  </button>
                </div>

                {/* Price and Enroll */}
                <div className="space-y-4">
                  <div className="text-3xl font-bold">${course.price}</div>
                  
                  <button
                    onClick={handleEnroll}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium"
                  >
                    {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                  </button>

                  <button className="w-full py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                    <Heart size={20} />
                    Add to Wishlist
                  </button>

                  <p className="text-center text-sm text-zinc-600">
                    30-Day Money-Back Guarantee
                  </p>
                </div>

                {/* Course Includes */}
                <div className="pt-4 border-t border-zinc-200 space-y-3">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Video size={16} className="text-zinc-600" />
                      {formatDuration(course.duration)} of on-demand video
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText size={16} className="text-zinc-600" />
                      {course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'text').length, 0)} articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Award size={16} className="text-zinc-600" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-zinc-600" />
                      Full lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <section>
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{objective}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course curriculum */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Course curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="border border-zinc-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-left">{module.title}</h3>
                        <span className="text-sm text-zinc-600">
                          {module.lessons.length} lessons • {formatDuration(module.duration)}
                        </span>
                      </div>
                      {expandedModules.includes(module.id) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedModules.includes(module.id) && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between py-3 border-t border-zinc-100"
                              >
                                <div className="flex items-center gap-3">
                                  {getLessonIcon(lesson.type)}
                                  <div>
                                    <p className="text-sm font-medium">{lesson.title}</p>
                                    <p className="text-xs text-zinc-600">{lesson.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {lesson.isPreview ? (
                                    <button
                                      onClick={() => handlePreview(lesson.content.video?.url || '')}
                                      className="text-sm text-blue-600 hover:underline"
                                    >
                                      Preview
                                    </button>
                                  ) : (
                                    <Lock size={16} className="text-zinc-400" />
                                  )}
                                  <span className="text-sm text-zinc-600">
                                    {formatDuration(lesson.duration)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-zinc-400">•</span>
                    <span className="text-zinc-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-bold mb-6">About the instructor</h2>
              <div className="flex gap-6">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                    <p className="text-zinc-600">{course.instructor.title}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <Star className="inline mr-1" size={16} />
                      {course.instructor.rating} Instructor Rating
                    </div>
                    <div>
                      <Users className="inline mr-1" size={16} />
                      {course.instructor.students.toLocaleString()} Students
                    </div>
                    <div>
                      <Video className="inline mr-1" size={16} />
                      {course.instructor.courses} Courses
                    </div>
                  </div>
                  <p className="text-zinc-700">{course.instructor.bio}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sticky sidebar content can go here */}
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoPlayer
                url={previewUrl}
                title="Course Preview"
                aspectRatio="16:9"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}