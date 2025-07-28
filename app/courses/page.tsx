'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Clock, Users, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getCourses } from '@/lib/services/courses'
import type { Course } from '@/lib/types/course'

const categories = [
  'All',
  'Development',
  'Business',
  'Design',
  'Marketing',
  'Data Science',
  'Personal Growth'
]

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [selectedCategory, selectedLevel, searchQuery])

  const loadCourses = async () => {
    setLoading(true)
    try {
      // For demo purposes, using mock data
      const mockCourses: Course[] = [
        {
          id: '1',
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
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
            title: 'Senior Developer',
            courses: 5,
            students: 15000,
            rating: 4.8
          },
          modules: [],
          tags: ['Web Development', 'React', 'Node.js'],
          language: 'English',
          requirements: ['Basic computer skills', 'No programming experience required'],
          objectives: ['Build 25+ web projects', 'Master modern web technologies'],
          enrollmentCount: 12543,
          rating: 4.7,
          reviewCount: 3421,
          lastUpdated: '2024-01-15',
          createdAt: '2023-06-01',
          publishedAt: '2023-06-15',
          status: 'published'
        },
        {
          id: '2',
          title: 'UI/UX Design Masterclass',
          description: 'Create beautiful and functional designs. Learn Figma, design principles, and user research',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
          category: 'Design',
          level: 'intermediate',
          duration: 1800,
          price: 79.99,
          currency: 'USD',
          instructor: {
            id: '2',
            name: 'Alex Rivera',
            bio: 'Product designer at top tech companies',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
            title: 'Principal Designer',
            courses: 3,
            students: 8500,
            rating: 4.9
          },
          modules: [],
          tags: ['UI Design', 'UX Design', 'Figma'],
          language: 'English',
          requirements: ['Basic design knowledge helpful'],
          objectives: ['Design 10+ UI projects', 'Master design tools'],
          enrollmentCount: 8234,
          rating: 4.8,
          reviewCount: 1876,
          lastUpdated: '2024-02-01',
          createdAt: '2023-08-01',
          publishedAt: '2023-08-15',
          status: 'published'
        },
        {
          id: '3',
          title: 'Data Science with Python',
          description: 'Master data analysis, machine learning, and visualization with Python',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
          category: 'Data Science',
          level: 'intermediate',
          duration: 3600,
          price: 99.99,
          currency: 'USD',
          instructor: {
            id: '3',
            name: 'Dr. Michael Zhang',
            bio: 'Data scientist and ML researcher',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            title: 'Data Science Lead',
            courses: 4,
            students: 10200,
            rating: 4.7
          },
          modules: [],
          tags: ['Python', 'Machine Learning', 'Data Analysis'],
          language: 'English',
          requirements: ['Basic Python knowledge', 'High school math'],
          objectives: ['Build ML models', 'Analyze real datasets'],
          enrollmentCount: 9876,
          rating: 4.6,
          reviewCount: 2145,
          lastUpdated: '2024-01-20',
          createdAt: '2023-07-01',
          publishedAt: '2023-07-10',
          status: 'published'
        }
      ]

      // Filter courses based on selections
      let filtered = mockCourses
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(c => c.category === selectedCategory)
      }
      
      if (selectedLevel !== 'All') {
        filtered = filtered.filter(c => c.level === selectedLevel.toLowerCase())
      }
      
      if (searchQuery) {
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      setCourses(filtered)
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold">Explore Courses</h1>
          <p className="text-zinc-600 mt-2">
            Discover courses to advance your skills and career
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 hover:bg-zinc-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Level</h3>
                  <div className="flex gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedLevel === level
                            ? 'bg-black text-white'
                            : 'bg-zinc-100 hover:bg-zinc-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-zinc-200 rounded-lg h-48" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 rounded" />
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-600">No courses found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/courses/${course.id}`}>
                  <div className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-100">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                        {course.level}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <h3 className="font-semibold group-hover:text-zinc-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-zinc-600 mt-1 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-zinc-200">
                          <Image
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-zinc-600">
                          {course.instructor.name}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3 text-sm text-zinc-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDuration(course.duration)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {course.enrollmentCount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-current" />
                          {course.rating}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold">
                          ${course.price}
                        </span>
                        <ChevronRight size={20} className="text-zinc-400 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}