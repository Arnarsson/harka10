"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search,
  Download,
  FileText,
  Video,
  BookOpen,
  ExternalLink,
  Filter,
  Star,
  Clock,
  Eye,
  TrendingUp,
  Calendar,
  Users,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  PlayCircle,
  Heart,
  Share2,
  Upload
} from "lucide-react"

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: "all", name: "All Resources", count: 156 },
    { id: "guides", name: "Guides", count: 45 },
    { id: "templates", name: "Templates", count: 32 },
    { id: "tools", name: "Tools", count: 28 },
    { id: "videos", name: "Videos", count: 34 },
    { id: "datasets", name: "Datasets", count: 17 }
  ]

  const resources = [
    {
      id: 1,
      title: "AI Ethics Framework Guide",
      description: "Comprehensive guide to implementing ethical AI practices in your organization",
      type: "PDF",
      category: "Guides",
      size: "2.4 MB",
      downloads: 1247,
      rating: 4.8,
      tags: ["ethics", "framework", "implementation"],
      dateAdded: "2024-01-15",
      author: "HARKA Team",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: true,
      isPremium: false
    },
    {
      id: 2,
      title: "Prompt Engineering Template Library",
      description: "Collection of proven prompt templates for various AI applications",
      type: "ZIP",
      category: "Templates",
      size: "5.1 MB",
      downloads: 892,
      rating: 4.6,
      tags: ["prompts", "templates", "engineering"],
      dateAdded: "2024-01-12",
      author: "Sarah Chen",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: false,
      isPremium: false
    },
    {
      id: 3,
      title: "Bias Detection Workshop Video",
      description: "Interactive 45-minute workshop on identifying and mitigating AI bias",
      type: "MP4",
      category: "Videos",
      duration: "45 min",
      downloads: 634,
      rating: 4.9,
      tags: ["bias", "detection", "workshop"],
      dateAdded: "2024-01-10",
      author: "Dr. Michael Zhang",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: true,
      isPremium: true
    },
    {
      id: 4,
      title: "ROI Calculator Spreadsheet",
      description: "Template for calculating return on investment for AI projects",
      type: "XLSX",
      category: "Tools",
      size: "856 KB",
      downloads: 458,
      rating: 4.5,
      tags: ["roi", "calculator", "business"],
      dateAdded: "2024-01-08",
      author: "Emma Wilson",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: false,
      isPremium: false
    },
    {
      id: 5,
      title: "Customer Service AI Training Dataset",
      description: "Curated dataset of customer service interactions for AI training",
      type: "CSV",
      category: "Datasets",
      size: "125 MB",
      downloads: 289,
      rating: 4.7,
      tags: ["dataset", "customer-service", "training"],
      dateAdded: "2024-01-05",
      author: "Alex Rivera",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: false,
      isPremium: true
    },
    {
      id: 6,
      title: "Machine Learning Implementation Checklist",
      description: "Step-by-step checklist for implementing ML projects successfully",
      type: "PDF",
      category: "Guides",
      size: "1.2 MB",
      downloads: 723,
      rating: 4.4,
      tags: ["checklist", "ml", "implementation"],
      dateAdded: "2024-01-03",
      author: "David Kim",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isFeatured: false,
      isPremium: false
    }
  ]

  const featuredResources = resources.filter(r => r.isFeatured)

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'mp4':
        return <Video className="h-8 w-8 text-blue-500" />
      case 'zip':
        return <Code className="h-8 w-8 text-purple-500" />
      case 'xlsx':
        return <FileText className="h-8 w-8 text-green-500" />
      case 'csv':
        return <FileText className="h-8 w-8 text-orange-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const recentDownloads = [
    { title: "AI Ethics Framework Guide", user: "Sven", time: "2 hours ago" },
    { title: "Prompt Templates", user: "Lisa", time: "4 hours ago" },
    { title: "ROI Calculator", user: "John", time: "6 hours ago" },
    { title: "Bias Detection Video", user: "Maria", time: "8 hours ago" }
  ]

  const popularTags = [
    { name: "ethics", count: 34 },
    { name: "prompts", count: 28 },
    { name: "implementation", count: 23 },
    { name: "templates", count: 19 },
    { name: "bias", count: 16 },
    { name: "business", count: 14 }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-2">Access guides, templates, tools, and learning materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Request Resource
          </Button>
        </div>
      </div>

      {/* Featured Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured Resources
          </CardTitle>
          <CardDescription>Handpicked resources recommended by our experts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="group cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      {getFileIcon(resource.type)}
                      {resource.isPremium && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{resource.type} • {resource.size || resource.duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Resources</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
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
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getFileIcon(resource.type)}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                                      {resource.title}
                                    </h3>
                                    {resource.isPremium && (
                                      <Badge variant="outline" className="text-xs">Premium</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {resource.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm">
                                    <Download className="mr-2 h-3 w-3" />
                                    Download
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>by {resource.author}</span>
                                <Badge variant="outline" className="text-xs">
                                  {resource.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  <span>{resource.downloads} downloads</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                  <span>{resource.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{resource.dateAdded}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {resource.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
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
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resource Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Resources</span>
                </div>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Downloads Today</span>
                </div>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Popular This Week</span>
                </div>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Contributors</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    #{tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {recentDownloads.map((download, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{download.user}</span>{' '}
                          <span className="text-muted-foreground">downloaded</span>{' '}
                          <span className="font-medium">{download.title}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{download.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Learning Guides
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Code className="mr-2 h-4 w-4" />
                Code Examples
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Video className="mr-2 h-4 w-4" />
                Video Tutorials
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                External Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}