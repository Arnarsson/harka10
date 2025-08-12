import { createClient } from '@/lib/supabase/client'
import type { Course } from '@/lib/types/course'
import type { CourseFilters, CourseRepository } from '@/lib/repositories/course-repository'

export class SupabaseCourseRepositoryBrowser implements CourseRepository {
  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    const supabase = createClient()

    let query = supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('enrollmentCount', { ascending: false })

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.level) {
      query = query.eq('level', filters.level)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (typeof filters?.offset === 'number') {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query
    if (error) throw error
    return (data || []) as Course[]
  }
}

