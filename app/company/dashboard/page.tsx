import { CompanyDashboard } from "@/components/dashboard/company-dashboard"
import { ErrorBoundary } from "@/components/error-boundary"

export default function CompanyDashboardPage() {
  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8 px-4">
        <CompanyDashboard />
      </div>
    </ErrorBoundary>
  )
}