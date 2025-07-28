import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { DashboardOverviewMinimal } from "@/components/dashboard/dashboard-overview-minimal"

export default function DashboardPage() {
  return (
    <DashboardLayoutMinimal>
      <DashboardOverviewMinimal />
    </DashboardLayoutMinimal>
  )
}