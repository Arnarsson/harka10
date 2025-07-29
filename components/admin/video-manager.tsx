"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  Play, 
  Edit, 
  Trash2, 
  Download, 
  Eye,
  Youtube,
  ExternalLink,
  Clock,
  Users,
  BarChart3
} from "lucide-react"

interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: number
  type: 'youtube' | 'vimeo' | 'upload'
  url: string
  uploadDate: string
  status: 'processing' | 'ready' | 'error'
}

const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks including useState and useEffect',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&h=200&fit=crop',
    duration: '15:32',
    views: 1234,
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example',
    uploadDate: '2024-01-15',
    status: 'ready'
  },
  {
    id: '2', 
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript patterns and best practices',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop',
    duration: '28:45',
    views: 892,
    type: 'vimeo',
    url: 'https://vimeo.com/example',
    uploadDate: '2024-01-12',
    status: 'ready'
  },
  {
    id: '3',
    title: 'Building Responsive Layouts',
    description: 'Create beautiful responsive layouts with CSS Grid and Flexbox',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    duration: '22:18',
    views: 567,
    type: 'upload',
    url: '/uploads/responsive-layouts.mp4',
    uploadDate: '2024-01-10',
    status: 'processing'
  }
]

export function VideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>(mockVideos)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeIcon = (type: VideoItem['type']) => {
    switch (type) {
      case 'youtube': return Youtube
      case 'vimeo': return Play
      default: return Video
    }
  }

  const getStatusColor = (status: VideoItem['status']) => {
    switch (status) {
      case 'ready': return 'bg-green-500'
      case 'processing': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
    }
  }

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            {videos.length} Videos
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {videos.reduce((acc, v) => acc + v.views, 0)} Total Views
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const TypeIcon = getTypeIcon(video.type)
          
          return (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {video.type}
                  </Badge>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant="outline" className="bg-black/70 text-white text-xs">
                    {video.duration}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(video.status)}`} />
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {video.views} views
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {video.uploadDate}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteVideo(video.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Video Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Video Analytics
          </CardTitle>
          <CardDescription>
            Overview of your video performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">{videos.length}</div>
              <div className="text-sm text-muted-foreground">Total Videos</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {videos.reduce((acc, v) => acc + v.views, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {Math.round(videos.reduce((acc, v) => acc + v.views, 0) / videos.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Views per Video</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}