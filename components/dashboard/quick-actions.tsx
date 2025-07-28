import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, MessageSquare, Users, BookOpen, Target, Plus, Zap } from "lucide-react"

const actions = [
  {
    title: "Continue Learning",
    description: "Resume AI Ethics module",
    icon: Play,
    href: "/learning/ethics-module",
    variant: "default" as const,
    highlight: true,
  },
  {
    title: "Prompt Playground",
    description: "Experiment with AI",
    icon: MessageSquare,
    href: "/playground",
    variant: "outline" as const,
  },
  {
    title: "Team Progress",
    description: "View team analytics",
    icon: Users,
    href: "/team",
    variant: "outline" as const,
  },
  {
    title: "Implementation Toolkit",
    description: "Access planning tools",
    icon: Target,
    href: "/toolkit",
    variant: "outline" as const,
  },
  {
    title: "Resource Library",
    description: "Browse materials",
    icon: BookOpen,
    href: "/resources",
    variant: "outline" as const,
  },
  {
    title: "Schedule Workshop",
    description: "Book team session",
    icon: Plus,
    href: "/workshops",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant={action.variant}
            className={`w-full justify-start h-auto p-4 ${
              action.highlight ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" : ""
            }`}
            asChild
          >
            <a href={action.href}>
              <div className="flex items-center space-x-3">
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
