import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Copy, Eye, Download } from "lucide-react"

const projectTemplates = [
  {
    title: "Customer Service AI Implementation",
    description: "Complete project template for implementing AI in customer service operations",
    industry: "Service",
    complexity: "Medium",
    timeline: "3-6 months",
    includes: ["Project charter", "Technical requirements", "Implementation plan", "Success metrics"],
  },
  {
    title: "Predictive Analytics for Sales",
    description: "Template for implementing predictive analytics to improve sales forecasting",
    industry: "Sales",
    complexity: "High",
    timeline: "6-12 months",
    includes: ["Data requirements", "Model specifications", "Integration guide", "Training materials"],
  },
  {
    title: "HR Process Automation",
    description: "Streamline HR processes with AI-powered automation solutions",
    industry: "HR",
    complexity: "Low",
    timeline: "2-4 months",
    includes: ["Process mapping", "Automation workflows", "Change management", "ROI tracking"],
  },
]

const complexityColors = {
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  High: "bg-red-500/10 text-red-400 border-red-500/20",
}

const industryColors = {
  Service: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Sales: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  HR: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function ProjectTemplates() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Project Templates</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            Browse All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {projectTemplates.map((template, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{template.title}</h3>
                  <Badge className={industryColors[template.industry as keyof typeof industryColors]}>
                    {template.industry}
                  </Badge>
                  <Badge className={complexityColors[template.complexity as keyof typeof complexityColors]}>
                    {template.complexity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <span>Timeline: {template.timeline}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Includes:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {template.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Customize
                  </Button>
                </div>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
