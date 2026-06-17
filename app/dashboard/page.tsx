import { UltraCleanDashboard } from "./ultra-clean-dashboard"
import { ErrorBoundary } from "@/components/error-boundary"
import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"

export default function DashboardPage() {
  return (
    <DashboardLayoutMinimal>
      <ErrorBoundary>
        <UltraCleanDashboard />
      </ErrorBoundary>
    </DashboardLayoutMinimal>
  )
}