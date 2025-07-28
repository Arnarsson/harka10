import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, Mail, Shield, Users } from "lucide-react"

const settingsOptions = [
  {
    title: "Email Notifications",
    description: "Send progress updates via email",
    enabled: true,
    icon: Mail,
  },
  {
    title: "Push Notifications",
    description: "Browser and mobile notifications",
    enabled: false,
    icon: Bell,
  },
  {
    title: "Auto-enrollment",
    description: "Automatically enroll new team members",
    enabled: true,
    icon: Users,
  },
  {
    title: "Privacy Mode",
    description: "Hide individual progress from team",
    enabled: false,
    icon: Shield,
  },
]

export function TeamSettings() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>Team Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <option.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{option.title}</h4>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </div>
              <Switch checked={option.enabled} />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button className="w-full">Save Settings</Button>
          <Button variant="outline" className="w-full border-primary/20 bg-transparent">
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
