import { DashboardLayoutMinimal } from "@/components/dashboard/dashboard-layout-minimal"
import { PromptPlayground } from "@/components/playground/prompt-playground"

export default function PlaygroundPage() {
  return (
    <DashboardLayoutMinimal>
      <PromptPlayground />
    </DashboardLayoutMinimal>
  )
}
