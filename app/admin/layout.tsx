'use client'

import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminGuard } from "@/components/auth/admin-guard"
import { ErrorBoundary } from "@/components/error/error-boundary"

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <AdminGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminGuard>
    </ErrorBoundary>
  )
}