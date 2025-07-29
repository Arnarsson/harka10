"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  File,
  Image,
  Archive,
  Search,
  Filter,
  Plus,
  Upload
} from "lucide-react"
import { formatBytes } from "@/lib/utils"

interface DocumentItem {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'other'
  size: number
  uploadDate: string
  downloadCount: number
  category: string
  tags: string[]
  url: string
}

const mockDocuments: DocumentItem[] = [
  {
    id: '1',
    name: 'Course Syllabus - Web Development.pdf',
    type: 'pdf',
    size: 2048576,
    uploadDate: '2024-01-15',
    downloadCount: 156,
    category: 'Course Materials',
    tags: ['syllabus', 'web-dev', 'curriculum'],
    url: '/documents/syllabus-web-dev.pdf'
  },
  {
    id: '2',
    name: 'Student Handbook 2024.docx',
    type: 'docx',
    size: 1536000,
    uploadDate: '2024-01-12',
    downloadCount: 89,
    category: 'Documentation',
    tags: ['handbook', 'policies', '2024'],
    url: '/documents/student-handbook.docx'
  },
  {
    id: '3',
    name: 'Assignment Template.xlsx',
    type: 'xlsx',
    size: 512000,
    uploadDate: '2024-01-10',
    downloadCount: 234,
    category: 'Templates',
    tags: ['template', 'assignment', 'spreadsheet'],
    url: '/documents/assignment-template.xlsx'
  },
  {
    id: '4',
    name: 'Presentation Guidelines.pptx',
    type: 'pptx',
    size: 3072000,
    uploadDate: '2024-01-08',
    downloadCount: 67,
    category: 'Guidelines',
    tags: ['presentation', 'guidelines', 'template'],
    url: '/documents/presentation-guidelines.pptx'
  }
]

const getFileIcon = (type: DocumentItem['type']) => {
  switch (type) {
    case 'pdf': return FileText
    case 'doc':
    case 'docx': return FileText
    case 'xls':
    case 'xlsx': return FileText
    case 'ppt':
    case 'pptx': return FileText
    default: return File
  }
}

const getFileTypeColor = (type: DocumentItem['type']) => {
  switch (type) {
    case 'pdf': return 'bg-red-100 text-red-800'
    case 'doc':
    case 'docx': return 'bg-blue-100 text-blue-800'
    case 'xls':
    case 'xlsx': return 'bg-green-100 text-green-800'
    case 'ppt':
    case 'pptx': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function DocumentManager() {
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = Array.from(new Set(documents.map(doc => doc.category)))

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
  }

  const totalSize = documents.reduce((acc, doc) => acc + doc.size, 0)
  const totalDownloads = documents.reduce((acc, doc) => acc + doc.downloadCount, 0)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{formatBytes(totalSize)}</p>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
              <Archive className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{totalDownloads}</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
              <Download className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
          <CardDescription>
            Manage your uploaded documents and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => {
              const Icon = getFileIcon(doc.type)
              
              return (
                <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{doc.name}</h3>
                      <Badge className={getFileTypeColor(doc.type)}>
                        {doc.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatBytes(doc.size)}</span>
                      <span>{doc.downloadCount} downloads</span>
                      <span>Uploaded {doc.uploadDate}</span>
                      <Badge variant="outline">{doc.category}</Badge>
                    </div>
                    
                    <div className="flex gap-1 mt-2">
                      {doc.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}