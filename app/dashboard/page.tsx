import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { EnhancedDashboard } from "@/components/dashboard/enhanced-dashboard"
import { PageTransition } from "@/components/layout/page-transition"

export default function DashboardPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <EnhancedDashboard />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}