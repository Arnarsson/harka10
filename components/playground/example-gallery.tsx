import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Copy, ThumbsUp, Eye } from "lucide-react"

const examples = [
  {
    title: "Customer Service Response",
    description: "Professional email template for customer inquiries",
    category: "Communication",
    likes: 124,
    views: 1247,
    preview: "Dear [Customer Name], Thank you for reaching out regarding...",
  },
  {
    title: "Product Description",
    description: "Compelling product copy for e-commerce",
    category: "Marketing",
    likes: 89,
    views: 892,
    preview: "Introducing our revolutionary AI-powered solution that...",
  },
  {
    title: "Meeting Summary",
    description: "Structured format for meeting notes",
    category: "Business",
    likes: 67,
    views: 634,
    preview: "Meeting Date: [Date] Attendees: [List] Key Decisions...",
  },
  {
    title: "Code Documentation",
    description: "Technical documentation template",
    category: "Development",
    likes: 45,
    views: 456,
    preview: "## Function Overview This function handles...",
  },
]

const categoryColors = {
  Communication: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Marketing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Business: "bg-green-500/10 text-green-400 border-green-500/20",
  Development: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function ExampleGallery() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Example Gallery</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{example.title}</h4>
                  <Badge className={categoryColors[example.category as keyof typeof categoryColors]}>
                    {example.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{example.description}</p>

                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <p className="text-xs text-muted-foreground font-mono">{example.preview}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{example.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{example.views}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 px-3">
                    <Copy className="mr-2 h-3 w-3" />
                    Use Template
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
