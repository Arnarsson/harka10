import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, MessageSquare, Users, BookOpen, Award, Activity } from "lucide-react"

const activities = [
  {
    type: "completion",
    title: "Completed ML Fundamentals",
    description: "Earned certificate with 95% score",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-400",
    user: "You",
  },
  {
    type: "discussion",
    title: "Sarah commented on your prompt",
    description: "Customer service automation template",
    time: "4 hours ago",
    icon: MessageSquare,
    color: "text-blue-400",
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=24&width=24",
  },
  {
    type: "team",
    title: "New team member joined",
    description: "Erik Lindqvist joined your organization",
    time: "1 day ago",
    icon: Users,
    color: "text-purple-400",
    user: "System",
  },
  {
    type: "resource",
    title: "New resource added",
    description: "AI Ethics Guidelines document",
    time: "2 days ago",
    icon: BookOpen,
    color: "text-orange-400",
    user: "Admin",
  },
  {
    type: "achievement",
    title: "Team milestone reached",
    description: "50% completion rate achieved",
    time: "3 days ago",
    icon: Award,
    color: "text-yellow-400",
    user: "System",
  },
]

export function RecentActivity() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full bg-background ${activity.color}`}>
              <activity.icon className="h-3 w-3" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{activity.title}</p>
                {activity.avatar && (
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback className="text-xs">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
