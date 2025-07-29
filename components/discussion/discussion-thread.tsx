"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Pin,
  Clock,
  Users,
  Star,
  MoreVertical,
  Send,
  ArrowLeft,
  Flag,
  Share,
  Bookmark,
  Edit,
  Trash2,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DiscussionReply {
  id: string
  content: string
  author: string
  avatar: string
  timeAgo: string
  likes: number
  dislikes: number
  isLiked: boolean
  isDisliked: boolean
  replies: DiscussionReply[]
  isEdited: boolean
}

interface DiscussionThread {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  category: string
  replies: DiscussionReply[]
  likes: number
  dislikes: number
  views: number
  timeAgo: string
  isPinned: boolean
  tags: string[]
  lastActivity: string
  status: string
  isLiked: boolean
  isDisliked: boolean
  isBookmarked: boolean
}

const mockThread: DiscussionThread = {
  id: "1",
  title: "Best practices for prompt engineering in production",
  content: `I've been working on implementing AI prompts in a production environment and wanted to share some insights and get your thoughts on best practices.

Here are some key considerations I've found:

1. **Prompt versioning**: Always version your prompts like you would code
2. **Testing**: Implement automated testing for prompt responses
3. **Monitoring**: Track response quality and user satisfaction
4. **Fallbacks**: Have clear fallback strategies when prompts fail

What are your experiences? Any additional best practices you'd recommend?`,
  author: "Sarah Chen",
  avatar: "/placeholder.svg?height=40&width=40",
  category: "AI Fundamentals",
  replies: [],
  likes: 67,
  dislikes: 2,
  views: 342,
  timeAgo: "2 hours ago",
  isPinned: true,
  tags: ["prompts", "production", "best-practices"],
  lastActivity: "1 hour ago",
  status: "active",
  isLiked: false,
  isDisliked: false,
  isBookmarked: false
}

const mockReplies: DiscussionReply[] = [
  {
    id: "r1",
    content: "Great points! I'd also add that logging all prompt inputs and outputs is crucial for debugging and improving performance over time.",
    author: "Dr. Michael Zhang",
    avatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "1 hour ago",
    likes: 12,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    isEdited: false,
    replies: [
      {
        id: "r1-1",
        content: "Absolutely! We use structured logging with metadata about the prompt version, user context, and response quality scores.",
        author: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "45 minutes ago",
        likes: 8,
        dislikes: 0,
        isLiked: true,
        isDisliked: false,
        isEdited: false,
        replies: []
      }
    ]
  },
  {
    id: "r2",
    content: "One thing I've learned is to always have human review loops for sensitive use cases. AI can be unpredictable, so having checkpoints is essential.",
    author: "Alex Rivera",
    avatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "30 minutes ago",
    likes: 15,
    dislikes: 1,
    isLiked: false,
    isDisliked: false,
    isEdited: true,
    replies: []
  }
]

export function DiscussionThread({ threadId }: { threadId: string }) {
  const [thread, setThread] = useState<DiscussionThread>({ ...mockThread, replies: mockReplies })
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [editingReply, setEditingReply] = useState<string | null>(null)

  const handleLike = (type: 'thread' | 'reply', id?: string) => {
    if (type === 'thread') {
      setThread(prev => ({
        ...prev,
        isLiked: !prev.isLiked,
        isDisliked: prev.isLiked ? prev.isDisliked : false,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        dislikes: prev.isDisliked && !prev.isLiked ? prev.dislikes - 1 : prev.dislikes
      }))
    }
  }

  const handleDislike = (type: 'thread' | 'reply', id?: string) => {
    if (type === 'thread') {
      setThread(prev => ({
        ...prev,
        isDisliked: !prev.isDisliked,
        isLiked: prev.isDisliked ? prev.isLiked : false,
        dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
        likes: prev.isLiked && !prev.isDisliked ? prev.likes - 1 : prev.likes
      }))
    }
  }

  const handleBookmark = () => {
    setThread(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked
    }))
  }

  const handleReply = (parentId?: string) => {
    if (!replyContent.trim()) return

    const newReply: DiscussionReply = {
      id: `r${Date.now()}`,
      content: replyContent,
      author: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
      timeAgo: "just now",
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      isEdited: false,
      replies: []
    }

    if (parentId) {
      // Add as nested reply
      const updateReplies = (replies: DiscussionReply[]): DiscussionReply[] => {
        return replies.map(reply => {
          if (reply.id === parentId) {
            return {
              ...reply,
              replies: [...reply.replies, newReply]
            }
          }
          return {
            ...reply,
            replies: updateReplies(reply.replies)
          }
        })
      }
      
      setThread(prev => ({
        ...prev,
        replies: updateReplies(prev.replies)
      }))
    } else {
      // Add as top-level reply
      setThread(prev => ({
        ...prev,
        replies: [...prev.replies, newReply]
      }))
    }

    setReplyContent("")
    setReplyingTo(null)
  }

  const renderReply = (reply: DiscussionReply, depth = 0) => (
    <div key={reply.id} className={cn("border-l-2 border-muted pl-4", depth > 0 && "ml-4")}>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={reply.avatar} alt={reply.author} />
            <AvatarFallback className="text-xs">
              {reply.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{reply.author}</span>
              <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
              {reply.isEdited && (
                <Badge variant="outline" className="text-xs">edited</Badge>
              )}
            </div>
            
            <div className="text-sm leading-relaxed">
              {reply.content}
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-3 w-3 mr-1" />
                {reply.likes}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsDown className="h-3 w-3 mr-1" />
                {reply.dislikes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={() => setReplyingTo(reply.id)}
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Flag className="h-3 w-3" />
              </Button>
            </div>
            
            {replyingTo === reply.id && (
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleReply(reply.id)}>
                    <Send className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {reply.replies.length > 0 && (
          <div className="space-y-4">
            {reply.replies.map(nestedReply => renderReply(nestedReply, depth + 1))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{thread.views} views</span>
          <span>•</span>
          <span>{thread.replies.length} replies</span>
        </div>
      </div>

      {/* Main Thread */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {thread.isPinned && <Pin className="h-4 w-4 text-primary" />}
                <h1 className="text-2xl font-bold">{thread.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={thread.avatar} alt={thread.author} />
                  <AvatarFallback className="text-xs">
                    {thread.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{thread.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{thread.timeAgo}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      {thread.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {thread.content}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {thread.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button 
                variant={thread.isLiked ? "default" : "ghost"} 
                size="sm"
                onClick={() => handleLike('thread')}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {thread.likes}
              </Button>
              <Button 
                variant={thread.isDisliked ? "destructive" : "ghost"} 
                size="sm"
                onClick={() => handleDislike('thread')}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {thread.dislikes}
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <Button 
              variant={thread.isBookmarked ? "default" : "ghost"} 
              size="sm"
              onClick={handleBookmark}
            >
              <Bookmark className="h-4 w-4 mr-1" />
              {thread.isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {thread.replies.length} Replies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {thread.replies.map(reply => renderReply(reply))}
          
          {/* New Reply Form */}
          <div className="border-t pt-6">
            <div className="space-y-4">
              <h3 className="font-medium">Add your reply</h3>
              <Textarea
                placeholder="Share your thoughts..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Be respectful and constructive in your responses
                </div>
                <Button onClick={() => handleReply()} disabled={!replyContent.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}