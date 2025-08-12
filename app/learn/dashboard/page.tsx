import { SimpleDashboard } from "@/app/dashboard/simple-dashboard"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <SimpleDashboard />
    </ErrorBoundary>
  )
}