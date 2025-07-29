import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { PromptPlayground } from "@/components/playground/prompt-playground"
import { PageTransition } from "@/components/layout/page-transition"

export default function PlaygroundPage() {
  return (
    <DashboardLayoutMinimal>
      <PageTransition>
        <PromptPlayground />
      </PageTransition>
    </DashboardLayoutMinimal>
  )
}
