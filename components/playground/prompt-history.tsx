import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Clock, Copy, Star } from "lucide-react"

const promptHistory = [
  {
    title: "Customer Service Email",
    timestamp: "2 hours ago",
    rating: 5,
    preview: "Write a professional email to a client explaining...",
    tokens: 245,
  },
  {
    title: "Product Description",
    timestamp: "1 day ago",
    rating: 4,
    preview: "Create compelling product copy for our new...",
    tokens: 189,
  },
  {
    title: "Meeting Summary",
    timestamp: "2 days ago",
    rating: 5,
    preview: "Summarize the key points from today's...",
    tokens: 156,
  },
  {
    title: "Code Documentation",
    timestamp: "3 days ago",
    rating: 3,
    preview: "Generate documentation for the following...",
    tokens: 298,
  },
]

export function PromptHistory() {
  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <span>Recent Prompts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {promptHistory.map((prompt, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border border-white/10 bg-muted/20 hover:border-primary/20 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{prompt.title}</h4>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: prompt.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{prompt.preview}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{prompt.timestamp}</span>
                  <Badge variant="outline" className="text-xs">
                    {prompt.tokens} tokens
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full border-primary/20 bg-transparent">
          View All History
        </Button>
      </CardContent>
    </Card>
  )
}
