import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { DiscussionPage } from "@/components/discussion/discussion-page"
import { PageTransition } from "@/components/layout/page-transition"

export default function Discussion() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <DiscussionPage />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}