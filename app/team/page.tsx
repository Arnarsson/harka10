import { TeamLayout } from "@/components/team/team-layout"
import { TeamOverview } from "@/components/team/team-overview"
import { TeamMembers } from "@/components/team/team-members"
import { TeamProgress } from "@/components/team/team-progress"
import { TeamSettings } from "@/components/team/team-settings"

export default function TeamPage() {
  return (
    <TeamLayout>
      <div className="space-y-8">
        <TeamOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TeamMembers />
            <TeamProgress />
          </div>

          <div>
            <TeamSettings />
          </div>
        </div>
      </div>
    </TeamLayout>
  )
}
