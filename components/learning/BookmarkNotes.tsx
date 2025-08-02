'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import {
  Bookmark,
  BookmarkCheck,
  StickyNote,
  Search,
  Calendar,
  Clock,
  Tag,
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  Hash
} from 'lucide-react'

interface Note {
  id: string
  content: string
  lessonId: string
  lessonTitle: string
  courseId: string
  courseTitle: string
  timestamp: Date
  tags: string[]
  isBookmarked: boolean
}

interface BookmarkNotesProps {
  currentLessonId?: string
  currentCourseId?: string
}

export function BookmarkNotes({ currentLessonId, currentCourseId }: BookmarkNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    // Mock data for demonstration
    {
      id: '1',
      content: 'Important: Remember to use environment variables for API keys in production!',
      lessonId: 'lesson-1',
      lessonTitle: 'Introduction to AI APIs',
      courseId: 'course-1',
      courseTitle: '48-Hour AI Mastery',
      timestamp: new Date('2024-12-10T10:30:00'),
      tags: ['security', 'api', 'production'],
      isBookmarked: true,
    },
    {
      id: '2',
      content: 'The MCP protocol is like USB for AI - standardized connections between tools.',
      lessonId: 'lesson-2',
      lessonTitle: 'Understanding MCP',
      courseId: 'course-1',
      courseTitle: '48-Hour AI Mastery',
      timestamp: new Date('2024-12-11T14:15:00'),
      tags: ['mcp', 'architecture'],
      isBookmarked: false,
    },
  ])
  const [newNote, setNewNote] = useState('')
  const [newTags, setNewTags] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const { toast } = useToast()

  // Get all unique tags
  const allTags = Array.from(
    new Set(notes.flatMap(note => note.tags))
  ).sort()

  // Filter notes based on search and selected tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchQuery || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTag = !selectedTag || note.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: 'Note is empty',
        description: 'Please write something before saving',
        variant: 'destructive',
      })
      return
    }

    const tags = newTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      lessonId: currentLessonId || 'general',
      lessonTitle: currentLessonId ? 'Current Lesson' : 'General Notes',
      courseId: currentCourseId || 'general',
      courseTitle: currentCourseId ? 'Current Course' : 'General',
      timestamp: new Date(),
      tags,
      isBookmarked: false,
    }

    setNotes([note, ...notes])
    setNewNote('')
    setNewTags('')
    
    toast({
      title: 'Note saved!',
      description: 'Your note has been saved successfully',
    })
  }

  const handleToggleBookmark = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, isBookmarked: !note.isBookmarked }
        : note
    ))
  }

  const handleEditNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId)
    if (note) {
      setEditingNoteId(noteId)
      setEditContent(note.content)
    }
  }

  const handleSaveEdit = () => {
    if (!editContent.trim()) return

    setNotes(notes.map(note => 
      note.id === editingNoteId 
        ? { ...note, content: editContent }
        : note
    ))
    setEditingNoteId(null)
    setEditContent('')
    
    toast({
      title: 'Note updated!',
      description: 'Your changes have been saved',
    })
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId))
    toast({
      title: 'Note deleted',
      description: 'The note has been removed',
    })
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      })}`
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            Add Note
          </CardTitle>
          <CardDescription>
            Create notes and bookmarks for your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tags (comma separated)"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAddNote}>
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Notes & Bookmarks</CardTitle>
          <CardDescription>
            All your saved notes and bookmarked lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Notes</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Filter by tag:</span>
                  <Badge
                    variant={selectedTag === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(null)}
                  >
                    All
                  </Badge>
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <TabsContent value="all" className="space-y-4">
              {filteredNotes.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No notes found. Start taking notes to see them here!
                </p>
              ) : (
                filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    isEditing={editingNoteId === note.id}
                    editContent={editContent}
                    onEditContentChange={setEditContent}
                    onToggleBookmark={handleToggleBookmark}
                    onEdit={handleEditNote}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={() => setEditingNoteId(null)}
                    onDelete={handleDeleteNote}
                    formatTimestamp={formatTimestamp}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="bookmarks" className="space-y-4">
              {filteredNotes.filter(n => n.isBookmarked).length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No bookmarks yet. Click the bookmark icon on any note to save it!
                </p>
              ) : (
                filteredNotes
                  .filter(note => note.isBookmarked)
                  .map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isEditing={editingNoteId === note.id}
                      editContent={editContent}
                      onEditContentChange={setEditContent}
                      onToggleBookmark={handleToggleBookmark}
                      onEdit={handleEditNote}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={() => setEditingNoteId(null)}
                      onDelete={handleDeleteNote}
                      formatTimestamp={formatTimestamp}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {filteredNotes.slice(0, 5).map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isEditing={editingNoteId === note.id}
                  editContent={editContent}
                  onEditContentChange={setEditContent}
                  onToggleBookmark={handleToggleBookmark}
                  onEdit={handleEditNote}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditingNoteId(null)}
                  onDelete={handleDeleteNote}
                  formatTimestamp={formatTimestamp}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Note Card Component
function NoteCard({
  note,
  isEditing,
  editContent,
  onEditContentChange,
  onToggleBookmark,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  formatTimestamp,
}: {
  note: Note
  isEditing: boolean
  editContent: string
  onEditContentChange: (content: string) => void
  onToggleBookmark: (id: string) => void
  onEdit: (id: string) => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
  formatTimestamp: (date: Date) => string
}) {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>{note.courseTitle}</span>
            <span>•</span>
            <span>{note.lessonTitle}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{formatTimestamp(note.timestamp)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleBookmark(note.id)}
            className={note.isBookmarked ? 'text-yellow-600' : ''}
          >
            {note.isBookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(note.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(note.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editContent}
            onChange={(e) => onEditContentChange(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={onSaveEdit}>
              <Save className="mr-1 h-3 w-3" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelEdit}>
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {note.content}
        </p>
      )}

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}