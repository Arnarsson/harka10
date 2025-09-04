import { UltraCleanDashboard } from "./ultra-clean-dashboard"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <UltraCleanDashboard />
    </ErrorBoundary>
  )
}