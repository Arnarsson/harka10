export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  price: number
  currency: string
  instructor: Instructor
  modules: Module[]
  tags: string[]
  language: string
  requirements: string[]
  objectives: string[]
  enrollmentCount: number
  rating: number
  reviewCount: number
  lastUpdated: string
  createdAt: string
  publishedAt: string | null
  status: 'draft' | 'published' | 'archived'
}

export interface Instructor {
  id: string
  name: string
  bio: string
  avatar: string
  title: string
  courses: number
  students: number
  rating: number
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  duration: number // in minutes
  order: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  content: LessonContent
  duration: number // in minutes
  order: number
  isPreview: boolean
}

export interface LessonContent {
  video?: {
    url: string
    duration: number
    transcript?: string
  }
  text?: {
    content: string
    estimatedReadTime: number
  }
  quiz?: {
    questions: QuizQuestion[]
    passingScore: number
    timeLimit?: number
  }
  assignment?: {
    instructions: string
    rubric: string[]
    submissionType: 'text' | 'file' | 'url'
  }
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  completedAt?: string
  progress: CourseProgress
  certificateId?: string
}

export interface CourseProgress {
  courseId: string
  completedLessons: string[]
  currentLessonId?: string
  quizScores: Record<string, number>
  assignments: Record<string, AssignmentSubmission>
  lastAccessedAt: string
  percentComplete: number
}

export interface AssignmentSubmission {
  lessonId: string
  submittedAt: string
  content: string
  grade?: number
  feedback?: string
  status: 'submitted' | 'graded' | 'revision-requested'
}

export interface CourseReview {
  id: string
  courseId: string
  userId: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful: number
  verified: boolean
}