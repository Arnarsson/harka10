import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, ExternalLink, Download } from "lucide-react"

const resources = [
  {
    title: "AI Implementation Best Practices",
    type: "Guide",
    format: "PDF",
    size: "2.4 MB",
    description: "Comprehensive guide covering industry best practices",
    icon: FileText,
    category: "Documentation",
  },
  {
    title: "ROI Calculation Workshop",
    type: "Video",
    format: "MP4",
    duration: "45 min",
    description: "Step-by-step workshop on calculating AI ROI",
    icon: Video,
    category: "Training",
  },
  {
    title: "Ethics Framework Checklist",
    type: "Checklist",
    format: "PDF",
    size: "1.2 MB",
    description: "Ensure ethical AI implementation",
    icon: FileText,
    category: "Ethics",
  },
  {
    title: "Change Management Playbook",
    type: "Playbook",
    format: "PDF",
    size: "3.1 MB",
    description: "Navigate organizational change successfully",
    icon: BookOpen,
    category: "Management",
  },
]

const categoryColors = {
  Documentation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Training: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Ethics: "bg-green-500/10 text-green-400 border-green-500/20",
  Management: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function ResourceCenter() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Resource Center</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <resource.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                  </div>
                </div>
                <Badge className={categoryColors[resource.category as keyof typeof categoryColors]}>
                  {resource.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{resource.format}</span>
                  <span>•</span>
                  <span>{resource.size || resource.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full border-primary/20 bg-transparent">
          Browse All Resources
        </Button>
      </CardContent>
    </Card>
  )
}
