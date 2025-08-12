import type { Course } from '@/lib/types/course'

export type CourseFilters = {
  category?: string
  level?: string
  search?: string
  limit?: number
  offset?: number
}

export interface CourseRepository {
  getCourses(filters?: CourseFilters): Promise<Course[]>
}

