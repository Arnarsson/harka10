import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Mail, MessageSquare, FileText, Briefcase } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Customer Service Email",
    description: "Professional customer service response template",
    category: "Communication",
    icon: Mail,
    uses: 1247,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Product Description",
    description: "Compelling product descriptions for e-commerce",
    category: "Marketing",
    icon: FileText,
    uses: 892,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Meeting Summary",
    description: "Structured meeting notes and action items",
    category: "Business",
    icon: Briefcase,
    uses: 634,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Social Media Post",
    description: "Engaging social media content creation",
    category: "Marketing",
    icon: MessageSquare,
    uses: 456,
    rating: 4.5,
  },
]

const categoryColors = {
  Communication: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Marketing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Business: "bg-green-500/10 text-green-400 border-green-500/20",
}

export function TemplateLibrary() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Template Library</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-10 bg-background/50 border-white/10" />
        </div>

        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <template.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{template.title}</h4>
                    <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.uses.toLocaleString()} uses</span>
                    <div className="flex items-center space-x-1">
                      <span>★</span>
                      <span>{template.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full border-primary/20 bg-transparent">
          Browse All Templates
        </Button>
      </CardContent>
    </Card>
  )
}
