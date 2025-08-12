import type { Course } from '@/lib/types/course'
import type { CourseFilters } from '@/lib/repositories/course-repository'
import { getCourseRepository } from '@/lib/infrastructure/supabase'

export async function getCourses(filters?: CourseFilters): Promise<Course[]> {
  const repo = getCourseRepository()
  return repo.getCourses(filters)
}

export async function getCourse(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:instructors(*),
      modules(
        *,
        lessons(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Course
}

export async function enrollInCourse(courseId: string, userId: string) {
  const supabase = createClient()
  
  const enrollment: Partial<Enrollment> = {
    userId,
    courseId,
    enrolledAt: new Date().toISOString(),
    progress: {
      courseId,
      completedLessons: [],
      quizScores: {},
      assignments: {},
      lastAccessedAt: new Date().toISOString(),
      percentComplete: 0
    }
  }

  const { data, error } = await supabase
    .from('enrollments')
    .insert(enrollment)
    .select()
    .single()

  if (error) throw error
  return data as Enrollment
}

export async function getUserEnrollments(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(*)
    `)
    .eq('userId', userId)
    .order('enrolledAt', { ascending: false })

  if (error) throw error
  return data as (Enrollment & { course: Course })[]
}

export async function updateLessonProgress(
  enrollmentId: string,
  lessonId: string,
  completed: boolean
) {
  const supabase = createClient()
  
  // Get current enrollment
  const { data: enrollment, error: fetchError } = await supabase
    .from('enrollments')
    .select('progress')
    .eq('id', enrollmentId)
    .single()

  if (fetchError) throw fetchError

  const progress = enrollment.progress as CourseProgress
  
  if (completed && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
  } else if (!completed) {
    progress.completedLessons = progress.completedLessons.filter(id => id !== lessonId)
  }

  progress.currentLessonId = lessonId
  progress.lastAccessedAt = new Date().toISOString()

  // Calculate percent complete (you'd need to know total lessons)
  // This is simplified - in real app, you'd calculate based on total lessons
  
  const { error: updateError } = await supabase
    .from('enrollments')
    .update({ progress })
    .eq('id', enrollmentId)

  if (updateError) throw updateError
}
