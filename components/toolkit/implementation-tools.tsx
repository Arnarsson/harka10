import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Download, ExternalLink, Star } from "lucide-react"

const implementationTools = [
  {
    title: "AI Readiness Assessment",
    description:
      "Comprehensive evaluation of your organization's AI readiness across technical, cultural, and strategic dimensions.",
    category: "Assessment",
    format: "Interactive Form",
    duration: "30 min",
    rating: 4.9,
    downloads: 1247,
  },
  {
    title: "Project Planning Template",
    description:
      "Step-by-step template for planning AI implementation projects with timelines, milestones, and resource allocation.",
    category: "Planning",
    format: "Excel Template",
    duration: "2 hours",
    rating: 4.8,
    downloads: 892,
  },
  {
    title: "ROI Calculator",
    description:
      "Calculate potential return on investment for AI initiatives with customizable parameters and scenarios.",
    category: "Financial",
    format: "Web Tool",
    duration: "15 min",
    rating: 4.7,
    downloads: 634,
  },
  {
    title: "Change Management Guide",
    description: "Comprehensive guide for managing organizational change during AI implementation.",
    category: "Management",
    format: "PDF Guide",
    duration: "1 hour",
    rating: 4.6,
    downloads: 456,
  },
]

const categoryColors = {
  Assessment: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Planning: "bg-green-500/10 text-green-400 border-green-500/20",
  Financial: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Management: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function ImplementationTools() {
  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Implementation Tools</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-blue-200 bg-white">
            View All Tools
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {implementationTools.map((tool, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-100 bg-white/80 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{tool.title}</h3>
                    <Badge className={categoryColors[tool.category as keyof typeof categoryColors]}>
                      {tool.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{tool.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>{tool.format}</span>
                  <span>•</span>
                  <span>{tool.duration}</span>
                  <span>•</span>
                  <span>{tool.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
