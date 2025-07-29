export type Role = 'admin' | 'moderator' | 'instructor' | 'student'

export type Permission = 
  // User management
  | 'users.view'
  | 'users.create' 
  | 'users.edit'
  | 'users.delete'
  | 'users.ban'
  | 'users.export'
  
  // Course management
  | 'courses.view'
  | 'courses.create'
  | 'courses.edit'
  | 'courses.delete'
  | 'courses.publish'
  | 'courses.analytics'
  
  // Content management
  | 'content.view'
  | 'content.create'
  | 'content.edit'
  | 'content.delete'
  | 'content.moderate'
  
  // Blog management
  | 'blog.view'
  | 'blog.create'
  | 'blog.edit'
  | 'blog.delete'
  | 'blog.publish'
  
  // Discussion management
  | 'discussions.view'
  | 'discussions.create'
  | 'discussions.moderate'
  | 'discussions.delete'
  
  // Subscription management
  | 'subscriptions.view'
  | 'subscriptions.manage'
  | 'subscriptions.refund'
  
  // System administration
  | 'system.settings'
  | 'system.analytics'
  | 'system.export'
  | 'system.backup'
  
  // Certificate management
  | 'certificates.view'
  | 'certificates.create'
  | 'certificates.revoke'

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    // Full access to everything
    'users.view', 'users.create', 'users.edit', 'users.delete', 'users.ban', 'users.export',
    'courses.view', 'courses.create', 'courses.edit', 'courses.delete', 'courses.publish', 'courses.analytics',
    'content.view', 'content.create', 'content.edit', 'content.delete', 'content.moderate',
    'blog.view', 'blog.create', 'blog.edit', 'blog.delete', 'blog.publish',
    'discussions.view', 'discussions.create', 'discussions.moderate', 'discussions.delete',
    'subscriptions.view', 'subscriptions.manage', 'subscriptions.refund',
    'system.settings', 'system.analytics', 'system.export', 'system.backup',
    'certificates.view', 'certificates.create', 'certificates.revoke'
  ],
  
  moderator: [
    // Limited user management
    'users.view', 'users.edit', 'users.ban',
    
    // Read-only course access
    'courses.view', 'courses.analytics',
    
    // Content moderation
    'content.view', 'content.moderate',
    
    // Blog management
    'blog.view', 'blog.create', 'blog.edit', 'blog.publish',
    
    // Full discussion management
    'discussions.view', 'discussions.create', 'discussions.moderate', 'discussions.delete',
    
    // View subscriptions
    'subscriptions.view',
    
    // Limited system access
    'system.analytics',
    
    // Certificate viewing
    'certificates.view'
  ],
  
  instructor: [
    // View users (their students)
    'users.view',
    
    // Full course management for own courses
    'courses.view', 'courses.create', 'courses.edit', 'courses.publish', 'courses.analytics',
    
    // Content management for own courses
    'content.view', 'content.create', 'content.edit',
    
    // Blog creation
    'blog.view', 'blog.create', 'blog.edit',
    
    // Discussion participation
    'discussions.view', 'discussions.create',
    
    // View own subscription data
    'subscriptions.view',
    
    // Certificate management for own courses
    'certificates.view', 'certificates.create'
  ],
  
  student: [
    // Basic access
    'courses.view',
    'content.view',
    'blog.view',
    'discussions.view', 'discussions.create',
    'subscriptions.view',
    'certificates.view'
  ]
}

export class PermissionService {
  static hasPermission(userRole: Role, permission: Permission): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole]
    return rolePermissions.includes(permission)
  }

  static hasAnyPermission(userRole: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(userRole, permission))
  }

  static hasAllPermissions(userRole: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(userRole, permission))
  }

  static getRolePermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role] || []
  }

  static canAccessRoute(userRole: Role, route: string): boolean {
    const routePermissions: Record<string, Permission[]> = {
      '/admin/users': ['users.view'],
      '/admin/courses': ['courses.view'],
      '/admin/content': ['content.view'],
      '/admin/blog': ['blog.view'],
      '/admin/subscriptions': ['subscriptions.view'],
      '/admin/settings': ['system.settings'],
      '/admin/analytics': ['system.analytics'],
      '/admin/toolkit': ['system.settings', 'content.create']
    }

    const requiredPermissions = routePermissions[route]
    if (!requiredPermissions) return true // Public route

    return this.hasAnyPermission(userRole, requiredPermissions)
  }

  static filterMenuItems(userRole: Role, menuItems: Array<{href: string, permission?: Permission}>) {
    return menuItems.filter(item => {
      if (!item.permission) return true
      return this.hasPermission(userRole, item.permission)
    })
  }

  static getAccessLevel(userRole: Role, resource: 'users' | 'courses' | 'content' | 'blog' | 'discussions'): 'none' | 'read' | 'write' | 'admin' {
    switch (resource) {
      case 'users':
        if (this.hasPermission(userRole, 'users.delete')) return 'admin'
        if (this.hasPermission(userRole, 'users.edit')) return 'write'
        if (this.hasPermission(userRole, 'users.view')) return 'read'
        return 'none'
        
      case 'courses':
        if (this.hasPermission(userRole, 'courses.delete')) return 'admin'
        if (this.hasPermission(userRole, 'courses.create')) return 'write'
        if (this.hasPermission(userRole, 'courses.view')) return 'read'
        return 'none'
        
      case 'content':
        if (this.hasPermission(userRole, 'content.delete')) return 'admin'
        if (this.hasPermission(userRole, 'content.create')) return 'write'
        if (this.hasPermission(userRole, 'content.view')) return 'read'
        return 'none'
        
      case 'blog':
        if (this.hasPermission(userRole, 'blog.delete')) return 'admin'
        if (this.hasPermission(userRole, 'blog.create')) return 'write'
        if (this.hasPermission(userRole, 'blog.view')) return 'read'
        return 'none'
        
      case 'discussions':
        if (this.hasPermission(userRole, 'discussions.delete')) return 'admin'
        if (this.hasPermission(userRole, 'discussions.moderate')) return 'write'
        if (this.hasPermission(userRole, 'discussions.view')) return 'read'
        return 'none'
        
      default:
        return 'none'
    }
  }
}

// React hook for permission checking
export function usePermissions(userRole: Role) {
  return {
    hasPermission: (permission: Permission) => PermissionService.hasPermission(userRole, permission),
    hasAnyPermission: (permissions: Permission[]) => PermissionService.hasAnyPermission(userRole, permissions),
    hasAllPermissions: (permissions: Permission[]) => PermissionService.hasAllPermissions(userRole, permissions),
    canAccessRoute: (route: string) => PermissionService.canAccessRoute(userRole, route),
    getAccessLevel: (resource: Parameters<typeof PermissionService.getAccessLevel>[1]) => 
      PermissionService.getAccessLevel(userRole, resource)
  }
}

// Higher-order component for protecting routes
export function withPermission<T extends {}>(
  Component: React.ComponentType<T>,
  requiredPermission: Permission,
  fallback?: React.ComponentType
) {
  return function PermissionProtectedComponent(props: T & { userRole: Role }) {
    const { userRole, ...componentProps } = props
    
    if (!PermissionService.hasPermission(userRole, requiredPermission)) {
      if (fallback) {
        const FallbackComponent = fallback
        return <FallbackComponent />
      }
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">You don't have permission to access this resource.</p>
          </div>
        </div>
      )
    }
    
    return <Component {...componentProps as T} />
  }
}