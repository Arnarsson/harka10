'use client'

import { withAuth } from '@/lib/auth/hooks'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, 
  Eye, Copy, Archive, TrendingUp, Users, DollarSign,
  Calendar, Clock, ChevronLeft
} from 'lucide-react'
import type { Course } from '@/lib/types/course'

function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    setLoading(true)
    try {
      // Mock data for now
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Complete Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
          category: 'Development',
          level: 'beginner',
          duration: 2400,
          price: 89.99,
          currency: 'USD',
          instructor: {
            id: '1',
            name: 'Sarah Chen',
            bio: 'Full-stack developer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            title: 'Senior Developer',
            courses: 5,
            students: 15000,
            rating: 4.8
          },
          modules: [],
          tags: ['Web Development', 'React', 'Node.js'],
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
        },
        {
          id: '2',
          title: 'UI/UX Design Masterclass',
          description: 'Create beautiful and functional designs',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
          category: 'Design',
          level: 'intermediate',
          duration: 1800,
          price: 79.99,
          currency: 'USD',
          instructor: {
            id: '2',
            name: 'Alex Rivera',
            bio: 'Product designer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            title: 'Principal Designer',
            courses: 3,
            students: 8500,
            rating: 4.9
          },
          modules: [],
          tags: ['UI Design', 'UX Design', 'Figma'],
          language: 'English',
          requirements: [],
          objectives: [],
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
          title: 'Advanced Machine Learning',
          description: 'Deep dive into ML algorithms and implementations',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
          category: 'Data Science',
          level: 'advanced',
          duration: 3600,
          price: 0,
          currency: 'USD',
          instructor: {
            id: '3',
            name: 'Dr. Michael Zhang',
            bio: 'ML Researcher',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            title: 'Data Science Lead',
            courses: 4,
            students: 10200,
            rating: 4.7
          },
          modules: [],
          tags: ['Machine Learning', 'Python', 'TensorFlow'],
          language: 'English',
          requirements: [],
          objectives: [],
          enrollmentCount: 0,
          rating: 0,
          reviewCount: 0,
          lastUpdated: '2024-02-10',
          createdAt: '2024-02-01',
          publishedAt: null,
          status: 'draft'
        }
      ]
      setCourses(mockCourses)
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDuplicate = (courseId: string) => {
    console.log('Duplicate course:', courseId)
    // TODO: Implement course duplication
  }

  const handleArchive = (courseId: string) => {
    console.log('Archive course:', courseId)
    // TODO: Implement course archiving
  }

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      console.log('Delete course:', courseId)
      // TODO: Implement course deletion
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">Course Management</h1>
            </div>
            <Link
              href="/admin/courses/new"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Plus size={20} />
              Create Course
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+12%</span>
            </div>
            <p className="text-2xl font-bold">{courses.length}</p>
            <p className="text-sm text-zinc-600">Total Courses</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+18%</span>
            </div>
            <p className="text-2xl font-bold">
              {courses.reduce((sum, c) => sum + c.enrollmentCount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600">Total Enrollments</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+23%</span>
            </div>
            <p className="text-2xl font-bold">
              ${courses.reduce((sum, c) => sum + (c.price * c.enrollmentCount), 0).toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600">Revenue</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <Eye size={20} className="text-zinc-600" />
              <span className="text-sm font-medium">{courses.filter(c => c.status === 'published').length}</span>
            </div>
            <p className="text-2xl font-bold">{courses.filter(c => c.status === 'draft').length}</p>
            <p className="text-sm text-zinc-600">Draft Courses</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
          <div className="flex gap-2">
            {(['all', 'draft', 'published', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-black text-white'
                    : 'bg-white border border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredCourses.map((course) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-9 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-zinc-600">{course.category} • {course.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-zinc-100 text-zinc-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-zinc-400" />
                        <span>{course.enrollmentCount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-zinc-400" />
                        <span>${(course.price * course.enrollmentCount).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-zinc-400" />
                        <span className="text-sm">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(course.id)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => handleArchive(course.id)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Archive size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(AdminCoursesPage, {
  requireAuth: true,
  requireRole: 'admin',
  redirectTo: '/login'
})