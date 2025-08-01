import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { LearningAnalytics } from "@/components/analytics/learning-analytics"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { PerformanceInsights } from "@/components/analytics/performance-insights"
import { PredictiveAnalytics } from "@/components/ai/predictive-analytics"
import { ErrorBoundary } from "@/components/error-boundary"

export default function AnalyticsPage() {
  return (
    <ErrorBoundary>
      <DashboardLayoutMinimal>
        <div className="space-y-8">
          {/* AI-Powered Predictive Analytics */}
          <PredictiveAnalytics />

          <AnalyticsOverview />

          <div className="grid lg:grid-cols-2 gap-8">
            <LearningAnalytics />
            <EngagementMetrics />
          </div>

          <PerformanceInsights />
        </div>
      </DashboardLayoutMinimal>
    </ErrorBoundary>
  )
}
