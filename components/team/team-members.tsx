import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MoreHorizontal, Mail, MessageSquare } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Senior Developer",
    department: "Engineering",
    email: "sarah@technordic.com",
    progress: 95,
    modules: 12,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2 hours ago",
  },
  {
    name: "Erik Lindqvist",
    role: "Product Manager",
    department: "Product",
    email: "erik@technordic.com",
    progress: 88,
    modules: 10,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "1 day ago",
  },
  {
    name: "Anna Svensson",
    role: "Data Scientist",
    department: "Engineering",
    email: "anna@technordic.com",
    progress: 82,
    modules: 9,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "3 hours ago",
  },
  {
    name: "Lars Petersen",
    role: "Marketing Director",
    department: "Marketing",
    email: "lars@technordic.com",
    progress: 65,
    modules: 7,
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "1 week ago",
  },
]

const departmentColors = {
  Engineering: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Product: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Marketing: "bg-green-500/10 text-green-400 border-green-500/20",
}

export function TeamMembers() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Team Members</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            Manage Roles
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className={
                        member.status === "active" ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <span>{member.role}</span>
                    <Badge className={departmentColors[member.department as keyof typeof departmentColors]}>
                      {member.department}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{member.email}</span>
                    <span>•</span>
                    <span>Last active {member.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{member.progress}%</span>
                    <div className="w-20">
                      <Progress value={member.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{member.modules} modules completed</div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
