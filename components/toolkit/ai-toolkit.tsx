"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Wrench, 
  Search, 
  Star, 
  Download, 
  Play, 
  BookOpen,
  Code,
  Database,
  Image,
  MessageSquare,
  Brain,
  Zap,
  Filter,
  ExternalLink,
  Heart,
  Users,
  Clock,
  TrendingUp
} from "lucide-react"

export function AIToolkit() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Tools", count: 24 },
    { id: "text", name: "Text & Language", count: 8 },
    { id: "image", name: "Image & Vision", count: 6 },
    { id: "code", name: "Code & Development", count: 5 },
    { id: "data", name: "Data Analysis", count: 3 },
    { id: "automation", name: "Automation", count: 2 }
  ]

  const featuredTools = [
    {
      id: 1,
      name: "Smart Document Analyzer",
      description: "Extract insights from documents using AI",
      category: "text",
      icon: BookOpen,
      rating: 4.8,
      users: 1234,
      isNew: true,
      isPremium: false
    },
    {
      id: 2,
      name: "Code Review Assistant",
      description: "Automated code review and suggestions",
      category: "code",
      icon: Code,
      rating: 4.9,
      users: 2156,
      isNew: false,
      isPremium: true
    },
    {
      id: 3,
      name: "Image Caption Generator",
      description: "Generate detailed captions for images",
      category: "image",
      icon: Image,
      rating: 4.7,
      users: 987,
      isNew: true,
      isPremium: false
    }
  ]

  const tools = [
    {
      id: 4,
      name: "Prompt Optimizer",
      description: "Optimize prompts for better AI responses",
      category: "text",
      icon: MessageSquare,
      rating: 4.6,
      users: 543,
      isNew: false,
      isPremium: false
    },
    {
      id: 5,
      name: "Data Visualizer",
      description: "Create charts and graphs from raw data",
      category: "data",
      icon: Database,
      rating: 4.5,
      users: 321,
      isNew: false,
      isPremium: true
    },
    {
      id: 6,
      name: "Neural Network Builder",
      description: "Visual neural network architecture designer",
      category: "code",
      icon: Brain,
      rating: 4.8,
      users: 876,
      isNew: true,
      isPremium: true
    },
    {
      id: 7,
      name: "Workflow Automator",
      description: "Automate repetitive tasks with AI",
      category: "automation",
      icon: Zap,
      rating: 4.4,
      users: 234,
      isNew: false,
      isPremium: false
    }
  ]

  const templates = [
    {
      id: 1,
      name: "Customer Service Bot",
      description: "Template for building customer support chatbots",
      category: "Customer Support",
      downloads: 1234,
      rating: 4.7
    },
    {
      id: 2,
      name: "Content Generator",
      description: "Generate marketing content and copy",
      category: "Marketing",
      downloads: 987,
      rating: 4.8
    },
    {
      id: 3,
      name: "Data Pipeline",
      description: "Automated data processing and analysis",
      category: "Data Science",
      downloads: 654,
      rating: 4.6
    }
  ]

  const myTools = [
    {
      id: 1,
      name: "Project Summarizer",
      description: "Custom tool for project documentation",
      lastUsed: "2 hours ago",
      usage: 45
    },
    {
      id: 2,
      name: "Meeting Notes AI",
      description: "Extract action items from meeting transcripts",
      lastUsed: "1 day ago",  
      usage: 23
    }
  ]

  const filteredTools = [...featuredTools, ...tools].filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Toolkit</h1>
          <p className="text-muted-foreground">Ready-to-use AI tools and templates</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download SDK
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tools..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      <Tabs defaultValue="explore" className="space-y-4">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="my-tools">My Tools</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          {/* Featured Tools */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {tool.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
                            {tool.isPremium && <Badge className="text-xs">Premium</Badge>}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                        <span className="text-sm text-muted-foreground">({tool.users})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {tool.users}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Try Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Tools */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <tool.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{tool.name}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{tool.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{tool.users} users</span>
                    </div>
                    <Button size="sm" className="w-full">Try Tool</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      {template.downloads}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Use Template</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-tools" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Custom Tools</h2>
            <Button>
              <Wrench className="h-4 w-4 mr-2" />
              Create Tool
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTools.map((tool) => (
              <Card key={tool.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {tool.lastUsed}
                    </div>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{tool.usage} uses this month</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Open</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Share</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring tools and mark your favorites to see them here
            </p>
            <Button>Explore Tools</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}