"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  Globe,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2
} from "lucide-react"

export function BlogManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en'>('da')
  const [activeView, setActiveView] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')

  const blogPosts = [
    {
      id: 1,
      title: "AI Revolution i dansk erhvervsliv: Hvad betyder det for din virksomhed?",
      titleEn: "AI Revolution in Danish Business: What Does It Mean for Your Company?",
      slug: "ai-revolution-dansk-erhvervsliv",
      slugEn: "ai-revolution-danish-business", 
      excerpt: "Kunstig intelligens transformerer måden, danske virksomheder opererer på. Fra automatisering af rutineopgaver til avanceret dataanalyse...",
      excerptEn: "Artificial intelligence is transforming how Danish companies operate. From automating routine tasks to advanced data analysis...",
      content: "# AI Revolution i dansk erhvervsliv\n\nKunstig intelligens er ikke længere science fiction...",
      contentEn: "# AI Revolution in Danish Business\n\nArtificial intelligence is no longer science fiction...",
      author: "Sarah Chen",
      publishDate: "2024-01-15",
      status: "published",
      language: "da",
      tags: ["AI", "Erhvervsliv", "Transformation", "Danmark"],
      tagsEn: ["AI", "Business", "Transformation", "Denmark"],
      readTime: 8,
      views: 1247,
      likes: 89,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "GDPR og AI: Navigering af compliance i en AI-drevet verden",
      titleEn: "GDPR and AI: Navigating Compliance in an AI-Driven World",
      slug: "gdpr-ai-compliance",
      slugEn: "gdpr-ai-compliance",
      excerpt: "Hvordan sikrer danske virksomheder GDPR-compliance, når de implementerer AI-løsninger? Vi dykker ned i de vigtigste overvejelser...",
      excerptEn: "How do Danish companies ensure GDPR compliance when implementing AI solutions? We dive into the key considerations...",
      content: "# GDPR og AI Compliance\n\nImplementering af AI i GDPR-konteksten...",
      contentEn: "# GDPR and AI Compliance\n\nImplementing AI in a GDPR context...",
      author: "Dr. Michael Zhang",
      publishDate: "2024-01-12",
      status: "published", 
      language: "da",
      tags: ["GDPR", "AI", "Compliance", "Datasikkerhed"],
      tagsEn: ["GDPR", "AI", "Compliance", "Data Security"],
      readTime: 12,
      views: 892,
      likes: 67,
      comments: 18,
      featured: false
    },
    {
      id: 3,
      title: "Sådan implementerer du etisk AI i din organisation",
      titleEn: "How to Implement Ethical AI in Your Organization",
      slug: "etisk-ai-implementation",
      slugEn: "ethical-ai-implementation",
      excerpt: "Etisk AI er mere end bare et buzzword - det er en nødvendighed for ansvarlig innovation. Her er din praktiske guide...",
      excerptEn: "Ethical AI is more than just a buzzword - it's a necessity for responsible innovation. Here's your practical guide...",
      content: "# Etisk AI Implementation\n\nAt implementere AI på en etisk måde...",
      contentEn: "# Ethical AI Implementation\n\nImplementing AI ethically...",
      author: "Emma Wilson",
      publishDate: "2024-01-10",
      status: "draft",
      language: "da", 
      tags: ["AI Ethics", "Implementation", "Ansvar"],
      tagsEn: ["AI Ethics", "Implementation", "Responsibility"],
      readTime: 10,
      views: 0,
      likes: 0,
      comments: 0,
      featured: false
    },
    {
      id: 4,
      title: "Machine Learning for Non-Technical Leaders",
      titleEn: "Machine Learning for Non-Technical Leaders",
      slug: "ml-for-leaders",
      slugEn: "ml-for-leaders",
      excerpt: "A comprehensive guide for executives and managers who need to understand ML without getting lost in technical jargon...",
      excerptEn: "A comprehensive guide for executives and managers who need to understand ML without getting lost in technical jargon...",
      content: "# Machine Learning for Leaders\n\nUnderstanding ML as a leader...",
      contentEn: "# Machine Learning for Leaders\n\nUnderstanding ML as a leader...",
      author: "Alex Rivera",
      publishDate: "2024-01-08",
      status: "published",
      language: "en",
      tags: ["Machine Learning", "Leadership", "Strategy"],
      tagsEn: ["Machine Learning", "Leadership", "Strategy"],
      readTime: 15,
      views: 1456,
      likes: 134,
      comments: 31,
      featured: true
    }
  ]

  const categories = [
    { name: "AI & Technology", count: 12 },
    { name: "Business Strategy", count: 8 },
    { name: "Compliance & Ethics", count: 6 },
    { name: "Case Studies", count: 4 },
    { name: "Industry Insights", count: 7 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
    }
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage = selectedLanguage === 'da' || post.language === selectedLanguage
    return matchesSearch && matchesLanguage
  })

  const stats = {
    totalPosts: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    totalViews: blogPosts.reduce((sum, p) => sum + p.views, 0),
    totalEngagement: blogPosts.reduce((sum, p) => sum + p.likes + p.comments, 0)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-2">Create and manage blog content for HARKA</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setSelectedLanguage('da')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedLanguage === 'da'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🇩🇰 DA
            </button>
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedLanguage === 'en'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">{stats.published} published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEngagement}</div>
            <p className="text-xs text-muted-foreground">Likes + Comments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(blogPosts.reduce((sum, p) => sum + p.readTime, 0) / blogPosts.length)}m
            </div>
            <p className="text-xs text-muted-foreground">Per article</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="list">Article List</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Articles</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      className="pl-10 w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {selectedLanguage === 'da' ? post.title : post.titleEn}
                        </h3>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.language.toUpperCase()}
                        </Badge>
                        {post.featured && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {selectedLanguage === 'da' ? post.excerpt : post.excerptEn}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.comments} comments
                        </span>
                        <span>{post.readTime}min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {(selectedLanguage === 'da' ? post.tags : post.tagsEn).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Editor</CardTitle>
              <CardDescription>Create and edit blog articles with rich content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title-da">Title (Danish)</Label>
                  <Input id="title-da" placeholder="Artikeltitel på dansk..." />
                </div>
                <div>
                  <Label htmlFor="title-en">Title (English)</Label>
                  <Input id="title-en" placeholder="Article title in English..." />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="slug-da">URL Slug (Danish)</Label>
                  <Input id="slug-da" placeholder="artikel-url-slug" />
                </div>
                <div>
                  <Label htmlFor="slug-en">URL Slug (English)</Label>
                  <Input id="slug-en" placeholder="article-url-slug" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="excerpt-da">Excerpt (Danish)</Label>
                  <Textarea 
                    id="excerpt-da" 
                    placeholder="Kort beskrivelse på dansk..."
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt-en">Excerpt (English)</Label>
                  <Textarea 
                    id="excerpt-en" 
                    placeholder="Brief description in English..."
                    className="h-20"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Author name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full px-3 py-2 border rounded-md">
                    <option>Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="read-time">Read Time (minutes)</Label>
                  <Input id="read-time" type="number" placeholder="5" />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="AI, Technology, Business" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="content-da">Content (Danish)</Label>
                  <Textarea 
                    id="content-da" 
                    placeholder="Skriv artiklen på dansk her..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="content-en">Content (English)</Label>
                  <Textarea 
                    id="content-en" 
                    placeholder="Write article content in English here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    Schedule
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Organize your content with categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} articles</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Analytics</CardTitle>
              <CardDescription>Track performance and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Analytics dashboard coming soon...</p>
                <p className="text-sm">Track views, engagement, and reader behavior</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}