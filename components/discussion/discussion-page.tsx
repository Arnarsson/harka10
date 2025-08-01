"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Pin,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Star,
  Filter,
  MoreVertical,
  Send
} from "lucide-react"

export function DiscussionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  const categories = [
    { id: "all", name: "All Discussions", count: 245 },
    { id: "general", name: "General", count: 89 },
    { id: "ai-fundamentals", name: "AI Fundamentals", count: 67 },
    { id: "machine-learning", name: "Machine Learning", count: 45 },
    { id: "ethics", name: "AI Ethics", count: 23 },
    { id: "help", name: "Help & Support", count: 21 }
  ]

  const discussions = [
    {
      id: 1,
      title: "Best practices for prompt engineering in production",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "AI Fundamentals",
      replies: 24,
      likes: 67,
      views: 342,
      timeAgo: "2 hours ago",
      isPinned: true,
      tags: ["prompts", "production", "best-practices"],
      lastActivity: "1 hour ago",
      status: "active"
    },
    {
      id: 2,
      title: "Understanding bias in machine learning models",
      author: "Dr. Michael Zhang",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "AI Ethics",
      replies: 18,
      likes: 45,
      views: 234,
      timeAgo: "4 hours ago",
      isPinned: false,
      tags: ["bias", "ethics", "models"],
      lastActivity: "30 minutes ago",
      status: "answered"
    },
    {
      id: 3,
      title: "How to measure ROI of AI implementation?",
      author: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "General",
      replies: 12,
      likes: 28,
      views: 189,
      timeAgo: "6 hours ago",
      isPinned: false,
      tags: ["roi", "implementation", "business"],
      lastActivity: "2 hours ago",
      status: "active"
    },
    {
      id: 4,
      title: "Neural network architecture recommendations",
      author: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Machine Learning",
      replies: 31,
      likes: 89,
      views: 567,
      timeAgo: "1 day ago",
      isPinned: false,
      tags: ["neural-networks", "architecture", "deep-learning"],
      lastActivity: "3 hours ago",
      status: "solved"
    },
    {
      id: 5,
      title: "Getting started with transformer models",
      author: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "AI Fundamentals",
      replies: 8,
      likes: 15,
      views: 98,
      timeAgo: "2 days ago",
      isPinned: false,
      tags: ["transformers", "beginner", "nlp"],
      lastActivity: "1 day ago",
      status: "active"
    }
  ]

  const topContributors = [
    { name: "Sarah Chen", posts: 45, likes: 234, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Dr. Michael Zhang", posts: 38, likes: 198, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Emma Wilson", posts: 29, likes: 156, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Alex Rivera", posts: 22, likes: 127, avatar: "/placeholder.svg?height=32&width=32" }
  ]

  const recentActivity = [
    { user: "Sven", action: "replied to", topic: "Best practices for prompt engineering", time: "5 min ago" },
    { user: "Lisa", action: "liked", topic: "Understanding bias in ML models", time: "12 min ago" },
    { user: "John", action: "created", topic: "Question about data preprocessing", time: "28 min ago" },
    { user: "Maria", action: "solved", topic: "Neural network architecture", time: "45 min ago" }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "answered":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "solved":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
      case "answered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discussion</h1>
          <p className="text-muted-foreground mt-2">Connect with the community and share knowledge</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Discussions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="text-xs">
                      {category.name}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-6">
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={discussion.avatar} alt={discussion.author} />
                              <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                                  {getStatusIcon(discussion.status)}
                                  <h3 className="font-semibold hover:text-primary transition-colors">
                                    {discussion.title}
                                  </h3>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                                <span>•</span>
                                <span>{discussion.timeAgo}</span>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{discussion.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{discussion.likes} likes</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{discussion.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Last activity: {discussion.lastActivity}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {discussion.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                <Badge className={`text-xs ${getStatusColor(discussion.status)}`}>
                                  {discussion.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Start a New Discussion</CardTitle>
              <CardDescription>Share your questions, insights, or start a conversation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Discussion title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, ask questions, or provide insights..."
                  className="min-h-[120px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">General</Badge>
                  <Button variant="ghost" size="sm">Add Tags</Button>
                </div>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Post Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Discussions</span>
                </div>
                <span className="font-semibold">245</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Members</span>
                </div>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Solved Questions</span>
                </div>
                <span className="font-semibold">167</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">This Week</span>
                </div>
                <span className="font-semibold">+23</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-4">#{index + 1}</span>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback className="text-xs">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contributor.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{contributor.posts} posts</span>
                        <span>•</span>
                        <span>{contributor.likes} likes</span>
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[240px]">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.topic}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}