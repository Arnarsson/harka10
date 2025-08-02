import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export type UserRole = 'admin' | 'instructor' | 'student'

interface RolePermissions {
  canViewAllCourses: boolean
  canCreateCourses: boolean
  canEditCourses: boolean
  canDeleteCourses: boolean
  canViewAllUsers: boolean
  canManageUsers: boolean
  canViewAnalytics: boolean
  canManageSubscriptions: boolean
  canViewOwnProgress: boolean
  canTakeCourses: boolean
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    canViewAllCourses: true,
    canCreateCourses: true,
    canEditCourses: true,
    canDeleteCourses: true,
    canViewAllUsers: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canManageSubscriptions: true,
    canViewOwnProgress: true,
    canTakeCourses: true,
  },
  instructor: {
    canViewAllCourses: true,
    canCreateCourses: true,
    canEditCourses: true,
    canDeleteCourses: false,
    canViewAllUsers: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canManageSubscriptions: false,
    canViewOwnProgress: true,
    canTakeCourses: true,
  },
  student: {
    canViewAllCourses: false,
    canCreateCourses: false,
    canEditCourses: false,
    canDeleteCourses: false,
    canViewAllUsers: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canManageSubscriptions: false,
    canViewOwnProgress: true,
    canTakeCourses: true,
  },
}

export async function getUserRole(): Promise<UserRole> {
  const { userId } = auth()
  if (!userId) return 'student'

  // TODO: Fetch actual role from database
  // For now, we'll check metadata or default to student
  try {
    // This would be replaced with actual database query
    // const user = await db.user.findUnique({ where: { clerkId: userId } })
    // return user?.role || 'student'
    
    // Mock implementation
    return 'student'
  } catch (error) {
    console.error('Error fetching user role:', error)
    return 'student'
  }
}

export function getPermissions(role: UserRole): RolePermissions {
  return rolePermissions[role]
}

export async function checkPermission(permission: keyof RolePermissions): Promise<boolean> {
  const role = await getUserRole()
  const permissions = getPermissions(role)
  return permissions[permission]
}

export async function requirePermission(permission: keyof RolePermissions, redirectTo: string = '/') {
  const hasPermission = await checkPermission(permission)
  if (!hasPermission) {
    redirect(redirectTo)
  }
}

// HOC for protecting routes
export function withRoleAuth(requiredRole: UserRole | UserRole[]) {
  return async function checkAuth() {
    const userRole = await getUserRole()
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    
    if (!allowedRoles.includes(userRole)) {
      redirect('/')
    }
  }
}

// Utility functions for common permission checks
export async function canAccessAdminPanel(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin'
}

export async function canCreateContent(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin' || role === 'instructor'
}

export async function canModifyUser(targetUserId: string): Promise<boolean> {
  const { userId } = auth()
  const role = await getUserRole()
  
  // Admins can modify anyone
  if (role === 'admin') return true
  
  // Users can modify their own profile
  if (userId === targetUserId) return true
  
  return false
}

// Hook for client components (to be created)
export function usePermissions() {
  // This would be implemented as a client-side hook
  // that fetches and caches permissions
  // For now, returning a placeholder
  return {
    role: 'student' as UserRole,
    permissions: rolePermissions.student,
    isLoading: false,
  }
}