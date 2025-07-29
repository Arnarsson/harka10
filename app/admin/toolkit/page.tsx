"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  Video, 
  FileText, 
  Image, 
  Youtube, 
  Play,
  Download,
  Trash2,
  Edit,
  Eye,
  Plus
} from "lucide-react"
import { MediaUploader } from "@/components/admin/media-uploader"
import { DocumentManager } from "@/components/admin/document-manager"
import { VideoManager } from "@/components/admin/video-manager"

export default function AdminToolkitPage() {
  const [activeTab, setActiveTab] = useState("media")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Toolkit</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive tools for managing platform content and media
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Media Upload
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Manager
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Manager
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Content Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="space-y-6">
          <MediaUploader />
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <VideoManager />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <DocumentManager />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Generator
                </CardTitle>
                <CardDescription>
                  Generate course outlines, descriptions, and marketing content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Image Editor
                </CardTitle>
                <CardDescription>
                  Edit and optimize images for courses and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Images
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Bulk Export
                </CardTitle>
                <CardDescription>
                  Export course data, user progress, and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}