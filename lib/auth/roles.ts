import { User } from '@clerk/nextjs/server'

export type UserRole = 'student' | 'teacher' | 'admin'

export interface UserWithRole extends User {
  role?: UserRole
  teacherVerified?: boolean
}

// Role hierarchy for permission checking
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  student: 1,
  teacher: 2, 
  admin: 3
}

// Permission system
export const PERMISSIONS = {
  // Student permissions
  VIEW_COURSES: ['student', 'teacher', 'admin'],
  VIEW_DASHBOARD: ['student', 'teacher', 'admin'],
  VIEW_PLAYGROUND: ['student', 'teacher', 'admin'],
  VIEW_ANALYTICS: ['student', 'teacher', 'admin'],
  
  // Teacher permissions  
  UPLOAD_CONTENT: ['teacher', 'admin'],
  CREATE_INTERACTIVE_LESSONS: ['teacher', 'admin'],
  VIEW_TEACHER_DASHBOARD: ['teacher', 'admin'],
  MANAGE_STUDENT_CONTENT: ['teacher', 'admin'],
  VIEW_TEACHING_ANALYTICS: ['teacher', 'admin'],
  
  // Admin permissions
  MANAGE_USERS: ['admin'],
  VIEW_ADMIN_DASHBOARD: ['admin'],
  MANAGE_SYSTEM_SETTINGS: ['admin'],
  APPROVE_TEACHERS: ['admin']
} as const

export type Permission = keyof typeof PERMISSIONS

/**
 * Get user role from Clerk session claims or metadata
 */
export function getUserRole(user: User | null): UserRole {
  if (!user) return 'student'
  
  // Check public metadata for role (set by admin)
  const roleFromMetadata = user.publicMetadata?.role as UserRole
  if (roleFromMetadata && isValidRole(roleFromMetadata)) {
    return roleFromMetadata
  }
  
  // Check session claims for role 
  const roleFromClaims = (user as any).sessionClaims?.role as UserRole
  if (roleFromClaims && isValidRole(roleFromClaims)) {
    return roleFromClaims
  }
  
  // Default to student
  return 'student'
}

/**
 * Check if user is verified teacher
 */
export function isVerifiedTeacher(user: User | null): boolean {
  if (!user) return false
  
  const role = getUserRole(user)
  const isVerified = user.publicMetadata?.teacherVerified === true
  
  return role === 'teacher' && isVerified
}

/**
 * Validate if a role string is a valid UserRole
 */
export function isValidRole(role: string): role is UserRole {
  return ['student', 'teacher', 'admin'].includes(role)
}

/**
 * Check if user has permission
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false
  
  const userRole = getUserRole(user)
  const allowedRoles = PERMISSIONS[permission] as readonly UserRole[]
  
  return allowedRoles.includes(userRole)
}

/**
 * Check if user role has higher or equal privilege than required role
 */
export function hasRoleLevel(user: User | null, requiredRole: UserRole): boolean {
  if (!user) return false
  
  const userRole = getUserRole(user)
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

/**
 * Route permission mappings
 */
export const ROUTE_PERMISSIONS = {
  // Teacher routes
  '/teach': 'VIEW_TEACHER_DASHBOARD',
  '/teach/dashboard': 'VIEW_TEACHER_DASHBOARD', 
  '/teach/upload': 'UPLOAD_CONTENT',
  '/teach/interactive': 'CREATE_INTERACTIVE_LESSONS',
  '/teach/analytics': 'VIEW_TEACHING_ANALYTICS',
  
  // Admin routes
  '/admin': 'VIEW_ADMIN_DASHBOARD',
  '/admin/users': 'MANAGE_USERS',
  '/admin/settings': 'MANAGE_SYSTEM_SETTINGS',
} as const

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(user: User | null, pathname: string): boolean {
  // Public routes are always accessible
  const publicRoutes = ['/', '/about', '/pricing', '/toolkit', '/team', '/workshop']
  if (publicRoutes.includes(pathname)) return true
  
  // Check specific route permissions
  const permission = ROUTE_PERMISSIONS[pathname as keyof typeof ROUTE_PERMISSIONS]
  if (permission) {
    return hasPermission(user, permission as Permission)
  }
  
  // Default: require authentication for all other routes
  return !!user
}

/**
 * Get user's display role for UI
 */
export function getUserDisplayRole(user: User | null): string {
  const role = getUserRole(user)
  
  switch (role) {
    case 'admin':
      return 'Administrator'
    case 'teacher':
      return isVerifiedTeacher(user) ? 'Verified Teacher' : 'Teacher (Pending)'
    case 'student':
    default:
      return 'Student'
  }
}

/**
 * Check if user can be promoted to teacher
 */
export function canPromoteToTeacher(user: User | null): boolean {
  if (!user) return false
  
  const currentRole = getUserRole(user)
  return currentRole === 'student'
}

/**
 * Check if user can verify teachers (admin only)
 */
export function canVerifyTeachers(user: User | null): boolean {
  return hasPermission(user, 'APPROVE_TEACHERS')
}