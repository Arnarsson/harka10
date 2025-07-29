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
  Image as ImageIcon, 
  Video, 
  Upload, 
  Edit, 
  Trash2, 
  Save, 
  Eye,
  Plus,
  Globe,
  Calendar,
  User
} from "lucide-react"

export function ContentManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en'>('da')
  const [activeTab, setActiveTab] = useState('pages')

  const pages = [
    {
      id: 1,
      title: "Hjem / Home",
      slug: "/",
      language: "da",
      status: "published",
      lastModified: "2024-01-15",
      author: "Admin"
    },
    {
      id: 2,
      title: "Pricing / Priser",
      slug: "/pricing",
      language: "da",
      status: "published", 
      lastModified: "2024-01-14",
      author: "Admin"
    },
    {
      id: 3,
      title: "About / Om os",
      slug: "/about",
      language: "da",
      status: "draft",
      lastModified: "2024-01-13",
      author: "Admin"
    }
  ]

  const blogPosts = [
    {
      id: 1,
      title: "AI i dansk erhvervsliv: Muligheder og udfordringer",
      slug: "ai-dansk-erhvervsliv",
      language: "da",
      status: "published",
      publishDate: "2024-01-10",
      author: "Sarah Chen",
      excerpt: "En dybdegående analyse af hvordan AI transformer danske virksomheder..."
    },
    {
      id: 2,
      title: "Implementing Ethical AI in Your Organization",
      slug: "ethical-ai-implementation",
      language: "en",
      status: "published",
      publishDate: "2024-01-08",
      author: "Dr. Michael Zhang",
      excerpt: "A comprehensive guide to building ethical AI systems from the ground up..."
    },
    {
      id: 3,
      title: "GDPR og AI: Hvad danske virksomheder skal vide",
      slug: "gdpr-ai-danske-virksomheder",
      language: "da",
      status: "draft",
      publishDate: "2024-01-12",
      author: "Emma Wilson",
      excerpt: "Naviger kompleksiteten af GDPR compliance i AI-projekter..."
    }
  ]

  const media = [
    {
      id: 1,
      name: "hero-background.jpg",
      type: "image",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      dimensions: "1920x1080"
    },
    {
      id: 2,
      name: "ai-workshop-intro.mp4",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-14",
      duration: "3:24",
      source: "local"
    },
    {
      id: 3,
      name: "company-logo.svg",
      type: "image",
      size: "12 KB",
      uploadDate: "2024-01-13",
      dimensions: "200x60"
    },
    {
      id: 4,
      name: "AI Workshop Day 1 - YouTube",
      type: "video",
      size: "N/A",
      uploadDate: "2024-01-12",
      duration: "1:45:23",
      source: "youtube",
      url: "https://youtube.com/watch?v=example123"
    },
    {
      id: 5,
      name: "Advanced Prompting - Vimeo",
      type: "video", 
      size: "N/A",
      uploadDate: "2024-01-11",
      duration: "32:15",
      source: "vimeo",
      url: "https://vimeo.com/123456789"
    },
    {
      id: 6,
      name: "AI Ethics Guidelines.pdf",
      type: "document",
      size: "1.2 MB",
      uploadDate: "2024-01-10",
      pages: 24
    },
    {
      id: 7,
      name: "Workshop Curriculum.pdf",
      type: "document",
      size: "2.8 MB", 
      uploadDate: "2024-01-09",
      pages: 45
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
    }
  }

  const getMediaIcon = (type: string, source?: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case 'video':
        if (source === 'youtube') return <Video className="h-5 w-5 text-red-500" />
        if (source === 'vimeo') return <Video className="h-5 w-5 text-blue-600" />
        return <Video className="h-5 w-5 text-purple-500" />
      case 'document':
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground mt-2">Manage website content, blog posts, and media files</p>
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
            Create New
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="editor">Content Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Pages</CardTitle>
              <CardDescription>Manage static pages and their content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages
                  .filter(page => selectedLanguage === 'da' || page.language === selectedLanguage)
                  .map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{page.title}</h3>
                        <Badge className={getStatusColor(page.status)}>
                          {page.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {page.language.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{page.slug}</span>
                        <span>Modified: {page.lastModified}</span>
                        <span>By: {page.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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

        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage blog articles and thought leadership content</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogPosts
                  .filter(post => selectedLanguage === 'da' || post.language === selectedLanguage)
                  .map((post) => (
                  <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{post.title}</h3>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.language.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          /{post.slug}
                        </span>
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
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dag 1: Grundlæggende AI-værktøjer og -teknikker</CardTitle>
                <CardDescription>Fundamentals and core techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Velkomst og Bullseye-Introduktion</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Velkomst og praktisk information:</strong><br/>
                      Dagen begynder med en varm velkomst og praktiske oplysninger, der sætter rammen for workshoppen. Undervisere og deltagere præsenterer sig selv for at skabe et samarbejdsorienteret miljø. En kort introduktion skitserer dagens mål.</p>
                      
                      <p><strong>Bullseye-metaforen:</strong><br/>
                      En metafor illustrerer rejsen fra brede, generelle prompts (ydre cirkel) til præcise, specialiserede outputs (indre cirkel). Den viser sammenhængen mellem Prompt Engineering (PE) og Custom Instructions (CI).</p>
                      
                      <p><strong>Model-overblik:</strong><br/>
                      En oversigt over AI-modeller forklarer forskellen mellem standard- og reasoning-modeller samt deres anvendelser.</p>
                      
                      <p><strong>Kaffepause:</strong><br/>
                      En kort pause til afslapning og uformelt netværk.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Prompt Engineering & Custom Instructions</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Grundlæggende Prompt Engineering:</strong><br/>
                      Sessionen introducerer effektive prompts med fokus på struktur, kontekst og formål. Deltagerne lærer, hvordan små ændringer kan forbedre AI-svar betydeligt.</p>
                      
                      <p><strong>Custom Instructions:</strong><br/>
                      Deltagerne lærer at sætte faste instruktioner (tone, sprog, format) for at tilpasse AI til specifikke opgaver eller brancher, fx marketing eller jura.</p>
                      
                      <p><strong>Live Demo:</strong><br/>
                      En demonstration viser, hvordan en simpel prompt forbedres trin for trin ved at tilføje kontekst og instruktioner, med fokus på bullseye-billedet.</p>
                      
                      <p><strong>Q&A:</strong><br/>
                      En interaktiv spørgerunde afrunder sessionen.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Hallucination & Bias</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>AI-hallucination:</strong><br/>
                      Fokus på, hvorfor AI kan skabe forkerte eller opdigtede svar, med eksempler på konsekvenserne.</p>
                      
                      <p><strong>Bias i modeller:</strong><br/>
                      Diskussion af bias i datasæt og algoritmer samt metoder til at mindske det gennem prompts og kritisk evaluering.</p>
                      
                      <p><strong>Brugeransvar:</strong><br/>
                      Vigtigheden af at verificere AI-svar og bruge kvalitetskontrol fremhæves. Vi dykker dybere ned i etik og ansvar i morgen.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Middagspause</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>En afslappet pause til refleksion og samtale.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Projekter & 'Deep Research'</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Projekter & CoPilot-integration:</strong><br/>
                      Deltagerne arbejder med store datasæt (CSV, Excel, PDF) til dybdegående analyser ved hjælp af AI-modeller som 01 eller 03-mini.</p>
                      
                      <p><strong>Opbygning af Personaer:</strong><br/>
                      Introduktion til at træne AI til at agere som specifikke roller, fx marketingchef eller kundeservicemedarbejder.</p>
                      
                      <p><strong>Øvelser & Spørgsmål & Opsamling:</strong><br/>
                      En åben Q&A og diskussion om udfordringer og næste skridt afslutter dagen.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dag 2: Etik og praktisk anvendelse</CardTitle>
                <CardDescription>Ethics and practical implementation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Opsummering af dag 1</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>En gennemgang af dag 1 med en optagelse og et AI-genereret resumé.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Etiske overvejelser</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>GDPR og datasikkerhed:</strong><br/>
                      Fokus på GMP-compliance ved brug af AI, fx dataanonymisering og samtykke-protokoller.</p>
                      
                      <p><strong>Zero Trust:</strong><br/>
                      Introduktion til zero trust-sikkerhedsmodellen og dens relevans for AI-systemer.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Workshops med virksomhedsspecifikke use cases</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Udvikling af AI-løsninger:</strong><br/>
                      Arbejde med reelle scenarier som dataanalyse eller kundeserviceautomatisering.</p>
                      
                      <p><strong>Pitching-øvelse:</strong><br/>
                      Deltagerne pitcher deres AI-løsninger til fiktive stakeholders.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Identifikation af automatisering muligheder</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Refleksion over processer, der kan automatiseres, med feedback til VMS.</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Opsamling og konklusion</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Deltagerne deler erfaringer og planlægger implementering i deres virksomheder.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>Upload and manage images, videos, and documents</CardDescription>
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {media.map((file) => (
                  <Card key={file.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {getMediaIcon(file.type, (file as any).source)}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm truncate">{file.name}</h4>
                          <div className="text-xs text-muted-foreground mt-1">
                            <p>{file.size}</p>
                            <p>Uploaded: {file.uploadDate}</p>
                            {file.dimensions && <p>{file.dimensions}</p>}
                            {file.duration && <p>Duration: {file.duration}</p>}
                            {(file as any).pages && <p>Pages: {(file as any).pages}</p>}
                            {(file as any).source && <p>Source: {(file as any).source}</p>}
                            {(file as any).url && (
                              <p className="truncate">
                                <a href={(file as any).url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                  View External
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
              <CardDescription>Rich text editor for creating and editing content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter title..." />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input id="slug" placeholder="url-friendly-slug" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea 
                    id="excerpt" 
                    placeholder="Brief description or excerpt..."
                    className="h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Write your content here..."
                    className="min-h-[400px] font-mono"
                  />
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
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}