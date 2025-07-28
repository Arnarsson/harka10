import { ToolkitLayout } from "@/components/toolkit/toolkit-layout"
import { ToolkitOverview } from "@/components/toolkit/toolkit-overview"
import { ImplementationTools } from "@/components/toolkit/implementation-tools"
import { ResourceCenter } from "@/components/toolkit/resource-center"
import { ProjectTemplates } from "@/components/toolkit/project-templates"

export default function ToolkitPage() {
  return (
    <ToolkitLayout>
      <div className="space-y-8">
        <ToolkitOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ImplementationTools />
            <ProjectTemplates />
          </div>

          <div>
            <ResourceCenter />
          </div>
        </div>
      </div>
    </ToolkitLayout>
  )
}
