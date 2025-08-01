import dynamic from 'next/dynamic'
import { LoadingPage, CardSkeleton } from '@/components/ui/loading-states'

// Lazy load admin components with appropriate loading states
export const AdminDashboard = dynamic(
  () => import('./admin-dashboard').then(mod => ({ default: mod.AdminDashboard })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const AdminUsers = dynamic(
  () => import('./admin-users').then(mod => ({ default: mod.AdminUsers })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const ContentManagement = dynamic(
  () => import('./content-management').then(mod => ({ default: mod.ContentManagement })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const BlogManagement = dynamic(
  () => import('@/components/blog/blog-management').then(mod => ({ default: mod.BlogManagement })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const ContentModerationDashboard = dynamic(
  () => import('./content-moderation-dashboard').then(mod => ({ default: mod.ContentModerationDashboard })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const BackupRestore = dynamic(
  () => import('./backup-restore').then(mod => ({ default: mod.BackupRestore })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const AdminToolkit = dynamic(
  () => import('./admin-toolkit').then(mod => ({ default: mod.AdminToolkit })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const AdvancedSearch = dynamic(
  () => import('./advanced-search').then(mod => ({ default: mod.AdvancedSearch })),
  {
    loading: () => <CardSkeleton />,
    ssr: false
  }
)

export const AuditTrail = dynamic(
  () => import('./audit-trail').then(mod => ({ default: mod.AuditTrail })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)