'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bookmark, 
  BookOpen, 
  Search, 
  Plus, 
  Tag,
  Calendar,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function NotesPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Redirect if not authenticated
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  const notes = [
    {
      id: 1,
      title: 'Neural Network Fundamentals',
      content: 'Key concepts: forward propagation, backpropagation, activation functions...',
      tags: ['ai', 'neural-networks', 'fundamentals'],
      course: 'AI Fundamentals',
      lesson: 'Lesson 3: Deep Learning Basics',
      createdAt: '2024-08-01',
      type: 'note'
    },
    {
      id: 2,
      title: 'Python ML Libraries',
      content: 'Important libraries: TensorFlow, PyTorch, scikit-learn, numpy...',
      tags: ['python', 'machine-learning', 'libraries'],
      course: 'Python for AI',
      lesson: 'Lesson 1: Environment Setup',
      createdAt: '2024-07-30',
      type: 'note'
    },
    {
      id: 3,
      title: 'Prompt Engineering Best Practices',
      content: '',
      tags: ['prompt-engineering', 'best-practices'],
      course: 'Prompt Engineering',
      lesson: 'Lesson 5: Advanced Techniques',
      createdAt: '2024-07-28',
      type: 'bookmark'
    }
  ];

  const tags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const notesByType = {
    notes: filteredNotes.filter(note => note.type === 'note'),
    bookmarks: filteredNotes.filter(note => note.type === 'bookmark')
  };

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes & Bookmarks</h1>
          <p className="text-gray-600 mt-2">Organize your learning materials and important references</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes and bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({filteredNotes.length})</TabsTrigger>
          <TabsTrigger value="notes">
            <BookOpen className="w-4 h-4 mr-1" />
            Notes ({notesByType.notes.length})
          </TabsTrigger>
          <TabsTrigger value="bookmarks">
            <Bookmark className="w-4 h-4 mr-1" />
            Bookmarks ({notesByType.bookmarks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredNotes.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {item.type === 'note' ? (
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-yellow-600" />
                        )}
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <Badge variant="outline" className="ml-auto">
                          {item.type}
                        </Badge>
                      </div>
                      
                      {item.content && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{item.content}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAt}
                        </span>
                        <span>From: {item.course} - {item.lesson}</span>
                      </div>
                      
                      <div className="flex gap-1 mt-3">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4">
            {notesByType.notes.map((note) => (
              <Card key={note.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">{note.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{note.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {note.createdAt}
                        </span>
                        <span>From: {note.course} - {note.lesson}</span>
                      </div>
                      <div className="flex gap-1 mt-3">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <div className="grid gap-4">
            {notesByType.bookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Bookmark className="w-4 h-4 text-yellow-600" />
                        <h3 className="font-semibold text-gray-900">{bookmark.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bookmark.createdAt}
                        </span>
                        <span>From: {bookmark.course} - {bookmark.lesson}</span>
                      </div>
                      <div className="flex gap-1 mt-3">
                        {bookmark.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}