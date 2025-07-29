'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MoreVertical, Edit, Copy, Archive, Trash2,
  Eye, Rocket, Lock, Clock, Users
} from 'lucide-react'
import Link from 'next/link'
import type { Course } from '@/lib/types/course'

interface CourseQuickActionsProps {
  course: Course
  onDuplicate: (courseId: string) => void
  onArchive: (courseId: string) => void
  onDelete: (courseId: string) => void
  onStatusChange: (courseId: string, status: Course['status']) => void
}

export function CourseQuickActions({ 
  course, 
  onDuplicate, 
  onArchive, 
  onDelete,
  onStatusChange 
}: CourseQuickActionsProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleStatusChange = (status: Course['status']) => {
    onStatusChange(course.id, status)
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-zinc-200 z-40"
            >
              <div className="py-1">
                {/* View/Edit Actions */}
                <Link
                  href={`/courses/${course.id}`}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
                  target="_blank"
                >
                  <Eye size={16} className="text-zinc-600" />
                  View Course
                </Link>
                
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
                >
                  <Edit size={16} className="text-zinc-600" />
                  Edit Course
                </Link>

                <div className="border-t border-zinc-200 my-1" />

                {/* Status Actions */}
                {course.status === 'draft' && (
                  <button
                    onClick={() => handleStatusChange('published')}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                  >
                    <Rocket size={16} className="text-green-600" />
                    Publish Now
                  </button>
                )}

                {course.status === 'published' && (
                  <>
                    <button
                      onClick={() => handleStatusChange('private')}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                    >
                      <Lock size={16} className="text-purple-600" />
                      Make Private
                    </button>
                    <button
                      onClick={() => handleStatusChange('draft')}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                    >
                      <Edit size={16} className="text-yellow-600" />
                      Unpublish to Draft
                    </button>
                  </>
                )}

                {course.status === 'scheduled' && (
                  <button
                    onClick={() => handleStatusChange('published')}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                  >
                    <Rocket size={16} className="text-green-600" />
                    Publish Now
                  </button>
                )}

                <div className="border-t border-zinc-200 my-1" />

                {/* Course Management Actions */}
                <button
                  onClick={() => onDuplicate(course.id)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                >
                  <Copy size={16} className="text-zinc-600" />
                  Duplicate Course
                </button>

                <button
                  onClick={() => onArchive(course.id)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors w-full text-left"
                >
                  <Archive size={16} className="text-zinc-600" />
                  Archive Course
                </button>

                <div className="border-t border-zinc-200 my-1" />

                {/* Danger Zone */}
                <button
                  onClick={() => onDelete(course.id)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors w-full text-left"
                >
                  <Trash2 size={16} />
                  Delete Course
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}