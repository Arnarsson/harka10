"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Send,
  Copy,
  History,
  Save,
  Star,
  Search,
  FileText,
  Sparkles,
  Settings,
  Users,
  Code,
  Briefcase,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Heart,
  Clock,
  MoreVertical,
  ChevronRight,
  Play,
  Share,
  Download,
  GitBranch,
  Zap,
  Brain,
  Globe
} from "lucide-react"

export function PromptPlayground() {
  const [prompt, setPrompt] = useState("Write a professional email to a client explaining the benefits of implementing AI in their customer service operations. Include specific examples and ROI metrics.")
  const [response, setResponse] = useState("AI response will appear here")
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2000)
  const [isGenerating, setIsGenerating] = useState(false)

  const templates = [
    {
      id: "customer-service",
      title: "Customer Service Email",
      category: "Communication",
      description: "Professional customer service response template",
      uses: 1247,
      rating: 4.8,
      example: "Dear [Customer Name], Thank you for reaching out regarding..."
    },
    {
      id: "product-description",
      title: "Product Description",
      category: "Marketing",
      description: "Compelling product descriptions for e-commerce",
      uses: 892,
      rating: 4.6,
      example: "Introducing our revolutionary AI-powered solution that..."
    },
    {
      id: "meeting-summary",
      title: "Meeting Summary",
      category: "Business",
      description: "Structured meeting notes and action items",
      uses: 634,
      rating: 4.9,
      example: "Meeting Date: [Date] Attendees: [List] Key Decisions..."
    },
    {
      id: "social-media",
      title: "Social Media Post",
      category: "Marketing",
      description: "Engaging social media content creation",
      uses: 458,
      rating: 4.5,
      example: "🚀 Exciting news! We're thrilled to announce..."
    }
  ]

  const recentPrompts = [
    {
      title: "Customer Service Email",
      prompt: "Write a professional email to a client explaining...",
      time: "2 hours ago",
      tokens: 245,
      rating: 5
    },
    {
      title: "Product Description",
      prompt: "Create compelling product copy for our new...",
      time: "1 day ago",
      tokens: 189,
      rating: 4
    },
    {
      title: "Meeting Summary",
      prompt: "Summarize the key points from today's...",
      time: "2 days ago",
      tokens: 156,
      rating: 5
    },
    {
      title: "Code Documentation",
      prompt: "Generate documentation for the following...",
      time: "3 days ago",
      tokens: 298,
      rating: 3
    }
  ]

  const exampleGallery = [
    {
      title: "Customer Service Response",
      category: "Communication",
      prompt: "Dear [Customer Name], Thank you for reaching out regarding...",
      stats: { likes: 124, uses: 1247 }
    },
    {
      title: "Product Description",
      category: "Marketing",
      prompt: "Introducing our revolutionary AI-powered solution that...",
      stats: { likes: 89, uses: 892 }
    },
    {
      title: "Meeting Summary",
      category: "Business",
      prompt: "Meeting Date: [Date] Attendees: [List] Key Decisions...",
      stats: { likes: 67, uses: 634 }
    },
    {
      title: "Code Documentation",
      category: "Development",
      prompt: "## Function Overview This function handles...",
      stats: { likes: 45, uses: 458 }
    }
  ]

  const handleGenerate = () => {
    setResponse("AI response will appear here\n\nThis is where the AI-generated content based on your prompt will be displayed. The response will be tailored to your specific requirements and parameters.")
  }

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setPrompt(template.example)
      setActiveTemplate(templateId)
    }
  }

  const aiModels = [
    { id: "gpt-4", name: "GPT-4", description: "Most capable, best for complex tasks", icon: Brain },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient", icon: Zap },
    { id: "claude-3", name: "Claude 3", description: "Excellent reasoning", icon: MessageSquare },
    { id: "gemini", name: "Gemini Pro", description: "Google's latest model", icon: Globe }
  ]

  const experiments = [
    {
      id: 1,
      name: "Customer Service Bot v2",
      description: "Enhanced with sentiment analysis",
      status: "running",
      created: "2 hours ago",
      results: { accuracy: 94, responses: 156 }
    },
    {
      id: 2,
      name: "Product Description Generator",
      description: "A/B testing different styles",
      status: "completed",
      created: "1 day ago",
      results: { ctr: 12.4, conversions: 8 }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Playground</h1>
          <p className="text-muted-foreground">Experiment with multiple AI models and advanced features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Prompt Editor
                </CardTitle>
                <Badge variant="secondary">GPT-4</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="ai-suggestions">
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI Suggestions
                  </TabsTrigger>
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Enter your prompt here..."
                      className="min-h-[200px] font-mono"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{prompt.length} characters</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleGenerate}>
                    <Send className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </TabsContent>

                <TabsContent value="ai-suggestions" className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">AI Prompt Suggestions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get AI-powered suggestions to improve your prompts
                      </p>
                      <Button>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Suggestions
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label>AI Model</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex items-center gap-2">
                                <model.icon className="h-4 w-4" />
                                <div>
                                  <div className="font-medium">{model.name}</div>
                                  <div className="text-xs text-muted-foreground">{model.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="temperature">Temperature ({temperature})</Label>
                      <Input
                        id="temperature"
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Conservative</span>
                        <span>Creative</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="max-tokens">Max Tokens ({maxTokens})</Label>
                      <Input
                        id="max-tokens"
                        type="range"
                        min="100"
                        max="4000"
                        step="100"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label>Output Format</Label>
                      <Select defaultValue="text">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Plain Text</SelectItem>
                          <SelectItem value="markdown">Markdown</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="code">Code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {recentPrompts.slice(0, 3).map((item, index) => (
                        <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-accent">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <Badge variant="outline" className="text-xs">{item.time}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.prompt}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[150px] whitespace-pre-wrap text-sm">
                    {response}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">~150 tokens</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="experiments">Experiments</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Template Library
                  </CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      className="pl-8"
                    />
                  </div>
                </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer hover:shadow-md transition-all ${
                        activeTemplate === template.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-sm">{template.title}</CardTitle>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs">{template.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-2">
                          {template.description}
                        </p>
                        <p className="text-xs">{template.uses} uses</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
                <Button variant="link" className="w-full mt-2" size="sm">
                  Browse All Templates
                </Button>
              </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="experiments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Active Experiments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experiments.map((experiment) => (
                    <div key={experiment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{experiment.name}</h4>
                          <p className="text-sm text-muted-foreground">{experiment.description}</p>
                        </div>
                        <Badge variant={experiment.status === "running" ? "default" : "secondary"}>
                          {experiment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{experiment.created}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create New Experiment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Models
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiModels.map((model) => (
                    <div key={model.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <model.icon className="h-8 w-8 p-2 bg-primary/10 rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                        </div>
                        <Button size="sm" variant={selectedModel === model.id ? "default" : "outline"}>
                          {selectedModel === model.id ? "Active" : "Select"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPrompts.map((prompt, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{prompt.title}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < prompt.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {prompt.time}
                      </span>
                      <span>{prompt.tokens} tokens</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4" size="sm">
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Example Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {exampleGallery.map((example, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm">{example.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {example.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {example.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {example.stats.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {example.stats.uses}
                      </span>
                    </div>
                    <Button size="sm" variant="ghost">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}