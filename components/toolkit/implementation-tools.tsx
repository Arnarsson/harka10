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
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Implementation Tools</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            View All Tools
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {implementationTools.map((tool, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{tool.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span>{tool.format}</span>
                  <span>•</span>
                  <span>{tool.duration}</span>
                  <span>•</span>
                  <span>{tool.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm">
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
