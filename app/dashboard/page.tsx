import { SimpleDashboard } from "./simple-dashboard"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <SimpleDashboard />
    </ErrorBoundary>
  )
}