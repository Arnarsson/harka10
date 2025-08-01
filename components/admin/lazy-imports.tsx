'use client'

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

export const LessonEditor = dynamic(
  () => import('./lesson-editor').then(mod => ({ default: mod.LessonEditor })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const VideoUpload = dynamic(
  () => import('./video-upload').then(mod => ({ default: mod.VideoUpload })),
  {
    loading: () => <CardSkeleton />,
    ssr: false
  }
)

export const SubscriptionManagement = dynamic(
  () => import('./subscription-management').then(mod => ({ default: mod.SubscriptionManagement })),
  {
    loading: () => <LoadingPage />,
    ssr: false
  }
)

export const CourseQuickActions = dynamic(
  () => import('./course-quick-actions').then(mod => ({ default: mod.CourseQuickActions })),
  {
    loading: () => <CardSkeleton />,
    ssr: false
  }
)

export const CoursePublishModal = dynamic(
  () => import('./course-publish-modal').then(mod => ({ default: mod.CoursePublishModal })),
  {
    loading: () => null, // Modals don't need loading state
    ssr: false
  }
)