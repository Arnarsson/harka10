import React from 'react'

export enum Permission {
  // Admin permissions
  ADMIN_ACCESS = 'admin:access',
  ADMIN_DASHBOARD = 'admin:dashboard',
  
  // User management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  
  // Course management
  COURSE_CREATE = 'course:create',
  COURSE_READ = 'course:read',
  COURSE_UPDATE = 'course:update',
  COURSE_DELETE = 'course:delete',
  COURSE_PUBLISH = 'course:publish',
  
  // Content management
  CONTENT_CREATE = 'content:create',
  CONTENT_READ = 'content:read',
  CONTENT_UPDATE = 'content:update',
  CONTENT_DELETE = 'content:delete',
  
  // Blog management
  BLOG_CREATE = 'blog:create',
  BLOG_READ = 'blog:read',
  BLOG_UPDATE = 'blog:update',
  BLOG_DELETE = 'blog:delete',
  BLOG_PUBLISH = 'blog:publish',
  
  // Subscription management
  SUBSCRIPTION_READ = 'subscription:read',
  SUBSCRIPTION_UPDATE = 'subscription:update',
  SUBSCRIPTION_DELETE = 'subscription:delete',
}

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  USER = 'user',
}

// Role permissions mapping
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  [Role.ADMIN]: [
    Permission.ADMIN_ACCESS,
    Permission.ADMIN_DASHBOARD,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_DELETE,
    Permission.COURSE_PUBLISH,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_READ,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_DELETE,
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.BLOG_DELETE,
    Permission.BLOG_PUBLISH,
    Permission.SUBSCRIPTION_READ,
    Permission.SUBSCRIPTION_UPDATE,
  ],
  [Role.INSTRUCTOR]: [
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_READ,
    Permission.CONTENT_UPDATE,
  ],
  [Role.USER]: [
    Permission.COURSE_READ,
    Permission.CONTENT_READ,
    Permission.BLOG_READ,
  ],
}

export class PermissionService {
  static hasPermission(userRole: Role | string, requiredPermission: Permission): boolean {
    if (typeof userRole === 'string') {
      // Convert string to Role enum if needed
      userRole = userRole as Role
    }
    
    const rolePermissions = ROLE_PERMISSIONS[userRole as Role] || []
    return rolePermissions.includes(requiredPermission)
  }
  
  static hasAnyPermission(userRole: Role | string, requiredPermissions: Permission[]): boolean {
    return requiredPermissions.some(permission => 
      this.hasPermission(userRole, permission)
    )
  }
  
  static hasAllPermissions(userRole: Role | string, requiredPermissions: Permission[]): boolean {
    return requiredPermissions.every(permission => 
      this.hasPermission(userRole, permission)
    )
  }
  
  static getUserPermissions(userRole: Role | string): Permission[] {
    if (typeof userRole === 'string') {
      userRole = userRole as Role
    }
    return ROLE_PERMISSIONS[userRole as Role] || []
  }
}

// Permission check hook
export function usePermissions(userRole: Role | string) {
  const hasPermission = (permission: Permission) => {
    return PermissionService.hasPermission(userRole, permission)
  }
  
  const hasAnyPermission = (permissions: Permission[]) => {
    return PermissionService.hasAnyPermission(userRole, permissions)
  }
  
  const hasAllPermissions = (permissions: Permission[]) => {
    return PermissionService.hasAllPermissions(userRole, permissions)
  }
  
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: PermissionService.getUserPermissions(userRole),
  }
}

// Permission wrapper component
interface PermissionWrapperProps {
  userRole: Role | string
  requiredPermission: Permission
  children: React.ReactNode
  fallback?: React.ComponentType
  requireAll?: boolean
}

export function PermissionWrapper({
  userRole,
  requiredPermission,
  children,
  fallback
}: PermissionWrapperProps) {
  if (!PermissionService.hasPermission(userRole, requiredPermission)) {
    if (fallback) {
      const FallbackComponent = fallback
      return <FallbackComponent />
    }
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-400 mb-2">🔒</div>
          <p className="text-gray-600">Access Denied</p>
          <p className="text-sm text-gray-500">You don't have permission to view this content</p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}

// Multi-permission wrapper
interface MultiPermissionWrapperProps {
  userRole: Role | string
  requiredPermissions: Permission[]
  children: React.ReactNode
  fallback?: React.ComponentType
  requireAll?: boolean
}

export function MultiPermissionWrapper({
  userRole,
  requiredPermissions,
  children,
  fallback,
  requireAll = false
}: MultiPermissionWrapperProps) {
  const hasAccess = requireAll 
    ? PermissionService.hasAllPermissions(userRole, requiredPermissions)
    : PermissionService.hasAnyPermission(userRole, requiredPermissions)
  
  if (!hasAccess) {
    if (fallback) {
      const FallbackComponent = fallback
      return <FallbackComponent />
    }
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-400 mb-2">🔒</div>
          <p className="text-gray-600">Access Denied</p>
          <p className="text-sm text-gray-500">You don't have permission to view this content</p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}

// Higher-order component for permission checking
export function withPermissions<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission: Permission,
  fallback?: React.ComponentType
) {
  return function PermissionCheckedComponent(props: P & { userRole: Role | string }) {
    const { userRole, ...componentProps } = props
    
    return (
      <PermissionWrapper
        userRole={userRole}
        requiredPermission={requiredPermission}
        fallback={fallback}
      >
        <Component {...(componentProps as P)} />
      </PermissionWrapper>
    )
  }
}

export default PermissionService