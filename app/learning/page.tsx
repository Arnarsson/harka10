import { LearningLayout } from "@/components/learning/learning-layout"
import { ModuleOverview } from "@/components/learning/module-overview"
import { LearningPath } from "@/components/learning/learning-path"
import { CurrentModule } from "@/components/learning/current-module"
import { ResourceLibrary } from "@/components/learning/resource-library"

export default function LearningPage() {
  return (
    <LearningLayout>
      <div className="space-y-8">
        <ModuleOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CurrentModule />
            <ResourceLibrary />
          </div>

          <div>
            <LearningPath />
          </div>
        </div>
      </div>
    </LearningLayout>
  )
}
