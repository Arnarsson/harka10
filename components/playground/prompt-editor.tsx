"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, Copy, ThumbsUp, ThumbsDown, Settings, Zap, MessageSquare, FileText } from "lucide-react"

export function PromptEditor() {
  const [prompt, setPrompt] = useState(
    "Write a professional email to a client explaining the benefits of implementing AI in their customer service operations. Include specific examples and ROI metrics.",
  )
  const [response, setResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setResponse(`Subject: Transform Your Customer Service with AI - Proven ROI and Benefits

Dear [Client Name],

I hope this email finds you well. I wanted to share some exciting insights about how AI implementation in customer service operations can significantly benefit your business.

**Key Benefits:**

1. **24/7 Availability**: AI chatbots can handle customer inquiries around the clock, reducing response times from hours to seconds.

2. **Cost Reduction**: Companies typically see 30-50% reduction in customer service costs within the first year of AI implementation.

3. **Improved Customer Satisfaction**: AI can resolve 80% of routine inquiries instantly, allowing human agents to focus on complex issues.

**ROI Metrics from Similar Implementations:**
- Average response time: Reduced from 4 hours to 30 seconds
- Customer satisfaction scores: Increased by 25%
- Operational costs: Decreased by 40%
- Agent productivity: Improved by 60%

**Real Example**: TechNordic AB implemented our AI solution and saw a 300% ROI within 8 months, handling 10,000+ monthly inquiries with 95% accuracy.

I'd love to discuss how we can customize this approach for your specific needs. Would you be available for a brief call next week?

Best regards,
[Your Name]`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card className="stella-card border-primary/10 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Prompt Editor</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              GPT-4
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 h-full">
        <Tabs defaultValue="editor" className="h-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Prompt Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Prompt</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="mr-2 h-3 w-3" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RotateCcw className="mr-2 h-3 w-3" />
                      Reset
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="min-h-[300px] bg-background/50 border-white/10 resize-none"
                />

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{prompt.length} characters</div>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Response Output */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Response</h3>
                  {response && (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="mr-2 h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  )}
                </div>

                <div className="min-h-[300px] p-4 rounded-lg bg-muted/20 border border-white/10">
                  {response ? (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{response}</div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center space-y-2">
                        <Zap className="h-8 w-8 mx-auto opacity-50" />
                        <p className="text-sm">AI response will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {response && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Generated in 1.2s</span>
                    <span>Token usage: 245/4000</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            <div className="text-center py-8">
              <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Model Parameters</h3>
              <p className="text-muted-foreground text-sm mb-4">Fine-tune AI model settings for optimal results</p>
              <Button variant="outline">Configure Parameters</Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Prompt History</h3>
              <p className="text-muted-foreground text-sm mb-4">Access your previous prompts and responses</p>
              <Button variant="outline">View History</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
