import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Video, Download, ExternalLink } from "lucide-react"

const resources = [
  {
    title: "AI Ethics Framework Guide",
    type: "PDF",
    size: "2.4 MB",
    category: "Ethics",
    description: "Comprehensive guide to implementing ethical AI practices",
    icon: FileText,
  },
  {
    title: "Bias Detection Workshop",
    type: "Video",
    duration: "45 min",
    category: "Ethics",
    description: "Interactive workshop on identifying and mitigating AI bias",
    icon: Video,
  },
  {
    title: "Implementation Checklist",
    type: "PDF",
    size: "1.2 MB",
    category: "Implementation",
    description: "Step-by-step checklist for AI project deployment",
    icon: FileText,
  },
  {
    title: "ROI Calculator Template",
    type: "Excel",
    size: "856 KB",
    category: "Implementation",
    description: "Template for calculating AI project return on investment",
    icon: FileText,
  },
]

const categoryColors = {
  Ethics: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Implementation: "bg-green-500/10 text-green-400 border-green-500/20",
  Fundamentals: "bg-blue-500/10 text-blue-400 border-blue-500/20",
}

export function ResourceLibrary() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Resource Library</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            Browse All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10 bg-background/50 border-white/10" />
        </div>

        <div className="space-y-3">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <resource.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <Badge className={categoryColors[resource.category as keyof typeof categoryColors]}>
                      {resource.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.size || resource.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
