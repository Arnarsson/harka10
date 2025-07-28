import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { DashboardOverviewEnhanced } from "@/components/dashboard/dashboard-overview-enhanced"
import { PageTransition } from "@/components/layout/page-transition"

export default function DashboardPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <DashboardOverviewEnhanced />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}