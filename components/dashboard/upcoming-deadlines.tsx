import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

const deadlines = [
  {
    title: "Ethics Assessment",
    description: "Complete ethical framework evaluation",
    dueDate: "Tomorrow",
    priority: "high",
    type: "Assessment",
  },
  {
    title: "Team Workshop",
    description: "AI Implementation Planning session",
    dueDate: "Dec 15",
    priority: "medium",
    type: "Workshop",
  },
  {
    title: "Project Proposal",
    description: "Submit AI project implementation plan",
    dueDate: "Dec 20",
    priority: "high",
    type: "Deliverable",
  },
  {
    title: "Peer Review",
    description: "Review teammate's prompt exercises",
    dueDate: "Dec 22",
    priority: "low",
    type: "Review",
  },
]

const priorityColors = {
  high: "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
}

export function UpcomingDeadlines() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Upcoming Deadlines</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map((deadline, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
            <div className="p-2 rounded-lg bg-primary/10">
              {deadline.priority === "high" ? (
                <AlertTriangle className="h-4 w-4 text-red-400" />
              ) : (
                <Clock className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{deadline.title}</h4>
                <Badge variant="outline" className={priorityColors[deadline.priority as keyof typeof priorityColors]}>
                  {deadline.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{deadline.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{deadline.type}</span>
                  <span>•</span>
                  <span>Due {deadline.dueDate}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
