export type UserRole = 'admin' | 'instructor' | 'student'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  metadata?: {
    bio?: string
    linkedin_url?: string
    certificates_earned?: number
    courses_created?: number
    courses_enrolled?: number
  }
}

export interface AuthState {
  user: UserProfile | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials extends LoginCredentials {
  full_name: string
  role?: UserRole
}