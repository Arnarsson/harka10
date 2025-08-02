'use client'

import { TeamInvitations } from '@/components/team/TeamInvitations'
import { BookmarkNotes } from '@/components/learning/BookmarkNotes'
import { AIAssistant } from '@/components/ai/AIAssistant'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  BookmarkIcon,
  Bot,
  Shield,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export default function Phase2FeaturesPage() {
  // Mock data for demonstration
  const currentLesson = {
    id: 'lesson-1',
    title: 'Understanding MCP Protocol',
    courseId: 'course-1',
    courseTitle: '48-Hour AI Mastery'
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Phase 2 Features Demo</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Explore the new collaboration and AI-powered features
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Badge variant="default" className="px-3 py-1">
            <CheckCircle className="mr-1 h-3 w-3" />
            Team Invitations
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            <Shield className="mr-1 h-3 w-3" />
            Role-Based Permissions
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            <BookmarkIcon className="mr-1 h-3 w-3" />
            Bookmarks & Notes
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            <Bot className="mr-1 h-3 w-3" />
            AI Assistant
          </Badge>
        </div>
      </div>

      {/* Features Tabs */}
      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Management
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <BookmarkIcon className="h-4 w-4" />
            Notes & Bookmarks
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-semibold">Team Collaboration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Invite team members and manage roles with our new permission system
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TeamInvitations />
          </div>

          {/* Permission System Info */}
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Role-Based Permissions Active
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Admin</p>
                <ul className="mt-1 space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Full system access</li>
                  <li>• Manage all users</li>
                  <li>• View analytics</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Instructor</p>
                <ul className="mt-1 space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Create courses</li>
                  <li>• Edit content</li>
                  <li>• View student progress</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Student</p>
                <ul className="mt-1 space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Take courses</li>
                  <li>• Track progress</li>
                  <li>• Earn certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-semibold">Smart Learning Tools</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Take notes, bookmark important lessons, and organize your learning
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <BookmarkNotes 
              currentLessonId={currentLesson.id}
              currentCourseId={currentLesson.courseId}
            />
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
              AI-Powered Learning
              <Sparkles className="h-6 w-6 text-purple-600" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get instant help with our context-aware AI assistant. Ask questions about the course,
              get code examples, and explore concepts interactively.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AIAssistant 
              currentLessonId={currentLesson.id}
              currentLessonTitle={currentLesson.title}
              courseContext={currentLesson.courseTitle}
            />
          </div>

          {/* AI Features Info */}
          <div className="max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                Context-Aware Responses
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                The AI assistant understands your current lesson and provides relevant help
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                Code Examples
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Get working code examples for n8n, MCP, Claude API, and more
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                Danish & English
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Communicate in Danish or English - the AI adapts to your preference
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                Smart Suggestions
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Get relevant follow-up questions and learning path recommendations
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Next Steps */}
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4">🚀 Phase 2 Complete!</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          All core collaboration and AI features are now implemented. Here's what's next:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Integration Tasks:</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Connect team invites to email service</li>
              <li>✓ Wire up permissions to database</li>
              <li>✓ Integrate AI with OpenRouter/Claude</li>
              <li>✓ Persist notes and bookmarks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Coming in Phase 3:</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Discussion forums</li>
              <li>• Live sessions</li>
              <li>• Gamification</li>
              <li>• Analytics dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}