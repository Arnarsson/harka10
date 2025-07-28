import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, FileText, Calculator, CheckSquare, Users, Lightbulb } from "lucide-react"

const toolCategories = [
  {
    title: "Planning Tools",
    count: 8,
    description: "Project planning and roadmap templates",
    icon: Target,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Assessment Tools",
    count: 6,
    description: "Readiness and capability assessments",
    icon: CheckSquare,
    color: "bg-green-500/10 text-green-400",
  },
  {
    title: "ROI Calculators",
    count: 4,
    description: "Financial impact and ROI tools",
    icon: Calculator,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Documentation",
    count: 12,
    description: "Templates and best practices",
    icon: FileText,
    color: "bg-orange-500/10 text-orange-400",
  },
  {
    title: "Team Resources",
    count: 5,
    description: "Training and communication materials",
    icon: Users,
    color: "bg-pink-500/10 text-pink-400",
  },
  {
    title: "Innovation Tools",
    count: 7,
    description: "Ideation and opportunity identification",
    icon: Lightbulb,
    color: "bg-yellow-500/10 text-yellow-400",
  },
]

export function ToolkitOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Implementation Toolkit</h1>
          <p className="text-muted-foreground">Comprehensive resources for successful AI implementation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            42 Tools Available
          </Badge>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Start Project
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolCategories.map((category, index) => (
          <Card
            key={index}
            className="stella-card border-primary/10 hover:border-primary/20 transition-all cursor-pointer"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count} tools
                </Badge>
              </div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:text-primary/80">
                Explore Tools →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
