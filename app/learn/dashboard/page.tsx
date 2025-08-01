import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { EnhancedDashboard } from "@/components/dashboard/enhanced-dashboard"
import { AuthDebug } from "@/components/debug/auth-debug"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardLayoutMinimal>
        <EnhancedDashboard />
        <AuthDebug />
      </DashboardLayoutMinimal>
    </ErrorBoundary>
  )
}