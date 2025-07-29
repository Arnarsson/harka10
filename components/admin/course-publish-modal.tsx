'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Calendar, Globe, Lock, Users, Clock, 
  AlertCircle, CheckCircle, Rocket, Eye
} from 'lucide-react'
import type { Course } from '@/lib/types/course'

interface CoursePublishModalProps {
  course: Course
  onClose: () => void
  onPublish: (publishData: PublishData) => Promise<void>
}

interface PublishData {
  status: 'published' | 'draft' | 'scheduled' | 'private'
  scheduledDate?: string
  visibility: 'public' | 'private' | 'unlisted'
  enrollmentLimit?: number
  enrollmentEndDate?: string
}

export function CoursePublishModal({ course, onClose, onPublish }: CoursePublishModalProps) {
  const [publishData, setPublishData] = useState<PublishData>({
    status: course.status || 'draft',
    visibility: 'public',
    scheduledDate: '',
    enrollmentLimit: undefined,
    enrollmentEndDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Check if course is ready to publish
  const readinessChecks = [
    {
      label: 'Course has a title and description',
      passed: !!course.title && !!course.description && course.description.length > 50
    },
    {
      label: 'Course has a thumbnail image',
      passed: !!course.thumbnail
    },
    {
      label: 'Course has at least one module',
      passed: course.modules && course.modules.length > 0
    },
    {
      label: 'Each module has at least one lesson',
      passed: course.modules?.every(module => module.lessons && module.lessons.length > 0) || false
    },
    {
      label: 'Course pricing is set',
      passed: course.price !== undefined && course.price > 0
    },
    {
      label: 'Course category and level are set',
      passed: !!course.category && !!course.level
    }
  ]

  const isReadyToPublish = readinessChecks.every(check => check.passed)

  const handlePublish = async () => {
    if (!isReadyToPublish && publishData.status === 'published') {
      alert('Please complete all requirements before publishing')
      return
    }

    setLoading(true)
    try {
      await onPublish(publishData)
      onClose()
    } catch (error) {
      console.error('Error publishing course:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Publish Course</h2>
                <p className="text-zinc-600 mt-1">{course.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-180px)]">
            {/* Left Panel - Publish Options */}
            <div className="w-1/2 p-6 overflow-y-auto border-r border-zinc-200">
              <div className="space-y-6">
                {/* Publishing Status */}
                <div>
                  <h3 className="font-semibold mb-4">Publishing Status</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 border border-zinc-200 rounded-lg hover:border-zinc-300 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={publishData.status === 'published'}
                        onChange={(e) => setPublishData({ ...publishData, status: 'published' })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Rocket size={16} />
                          <span className="font-medium">Publish Now</span>
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">
                          Make your course immediately available to students
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border border-zinc-200 rounded-lg hover:border-zinc-300 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="status"
                        value="scheduled"
                        checked={publishData.status === 'scheduled'}
                        onChange={(e) => setPublishData({ ...publishData, status: 'scheduled' })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span className="font-medium">Schedule for Later</span>
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">
                          Set a future date and time for automatic publishing
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border border-zinc-200 rounded-lg hover:border-zinc-300 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={publishData.status === 'draft'}
                        onChange={(e) => setPublishData({ ...publishData, status: 'draft' })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Lock size={16} />
                          <span className="font-medium">Save as Draft</span>
                        </div>
                        <p className="text-sm text-zinc-600 mt-1">
                          Continue working on your course before publishing
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Schedule Date */}
                  {publishData.status === 'scheduled' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <label className="block text-sm font-medium mb-2">
                        Schedule Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={publishData.scheduledDate}
                        onChange={(e) => setPublishData({ ...publishData, scheduledDate: e.target.value })}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Visibility Settings */}
                <div>
                  <h3 className="font-semibold mb-4">Visibility Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={publishData.visibility === 'public'}
                        onChange={(e) => setPublishData({ ...publishData, visibility: 'public' })}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Globe size={16} />
                          <span className="font-medium">Public</span>
                        </div>
                        <p className="text-sm text-zinc-600">Anyone can find and enroll</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="visibility"
                        value="unlisted"
                        checked={publishData.visibility === 'unlisted'}
                        onChange={(e) => setPublishData({ ...publishData, visibility: 'unlisted' })}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span className="font-medium">Unlisted</span>
                        </div>
                        <p className="text-sm text-zinc-600">Only people with the link can access</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={publishData.visibility === 'private'}
                        onChange={(e) => setPublishData({ ...publishData, visibility: 'private' })}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Lock size={16} />
                          <span className="font-medium">Private</span>
                        </div>
                        <p className="text-sm text-zinc-600">Only invited students can enroll</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Enrollment Settings */}
                <div>
                  <h3 className="font-semibold mb-4">Enrollment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Users size={16} className="inline mr-2" />
                        Enrollment Limit (optional)
                      </label>
                      <input
                        type="number"
                        placeholder="No limit"
                        value={publishData.enrollmentLimit || ''}
                        onChange={(e) => setPublishData({ 
                          ...publishData, 
                          enrollmentLimit: e.target.value ? parseInt(e.target.value) : undefined 
                        })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Clock size={16} className="inline mr-2" />
                        Enrollment End Date (optional)
                      </label>
                      <input
                        type="date"
                        value={publishData.enrollmentEndDate}
                        onChange={(e) => setPublishData({ ...publishData, enrollmentEndDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Readiness Check */}
            <div className="w-1/2 p-6 bg-zinc-50 overflow-y-auto">
              <h3 className="font-semibold mb-4">Course Readiness</h3>
              
              <div className="space-y-3 mb-6">
                {readinessChecks.map((check, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-zinc-200"
                  >
                    {check.passed ? (
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
                    )}
                    <span className={check.passed ? 'text-zinc-700' : 'text-zinc-600'}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>

              {!isReadyToPublish && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">Course Not Ready</p>
                      <p className="text-sm text-amber-700 mt-1">
                        Please complete all requirements before publishing your course.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Preview */}
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <h4 className="font-medium mb-3">Course Preview</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-600">Title</p>
                    <p className="font-medium">{course.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Price</p>
                    <p className="font-medium">${course.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Duration</p>
                    <p className="font-medium">{Math.floor(course.duration / 60)}h {course.duration % 60}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Modules</p>
                    <p className="font-medium">{course.modules?.length || 0} modules</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full mt-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview Course Page
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-600">
                {publishData.status === 'published' && 'Your course will be available immediately'}
                {publishData.status === 'scheduled' && `Course will be published on ${new Date(publishData.scheduledDate || '').toLocaleString()}`}
                {publishData.status === 'draft' && 'Your course will be saved as a draft'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  disabled={loading || (!isReadyToPublish && publishData.status === 'published')}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Confirm & Publish'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}