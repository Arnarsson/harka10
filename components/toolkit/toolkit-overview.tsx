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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Target className="w-4 h-4" />
            <span>AI Project Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gray-900">Implementation</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Toolkit</span>
          </h1>
          <p className="text-gray-600">Comprehensive resources for successful AI implementation</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            42 Tools Available
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
            <Target className="mr-2 h-4 w-4" />
            Start Project
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolCategories.map((category, index) => (
          <Card
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
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
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700">
                Explore Tools →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
