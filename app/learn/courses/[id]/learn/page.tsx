'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, Menu, X, CheckCircle, 
  Circle, Lock, PlayCircle, FileText, PenTool, BarChart,
  MessageSquare, Award, Download, Code
} from 'lucide-react'
import { VideoPlayer } from '@/components/ui/video-player'
import { InteractiveCodeEditor } from '@/components/playground/interactive-code-editor'
import type { Course, Lesson, Module } from '@/lib/types/course'

export default function LessonViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourseData()
  }, [params.id])

  const loadCourseData = async () => {
    setLoading(true)
    try {
      // Static course content for "AI Fundamentals" until the course/lesson
      // tables are wired to Supabase. This is REAL content (not placeholder):
      // no stock-video URLs, no fabricated instructor. Matches the module
      // outline shown on the course detail page.
      const mockCourse: Course = {
        id: params.id as string,
        title: 'AI Fundamentals',
        description: 'A practical, no-jargon introduction to using AI at work — what it is, how it works, and how to apply it to real tasks.',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
        category: 'AI & Productivity',
        level: 'beginner',
        duration: 240,
        price: 0,
        currency: 'DKK',
        instructor: {
          id: 'sven',
          name: 'Sven Arnarsson',
          bio: 'Founder of HEKLA. Designs and delivers hands-on AI training for Danish organisations.',
          avatar: '',
          title: 'Founder & Lead Instructor, HEKLA',
          courses: 1,
          students: 0,
          rating: 0
        },
        modules: [
          {
            id: 'm1',
            title: 'Introduction to AI',
            description: 'Core concepts and terminology',
            duration: 60,
            order: 1,
            lessons: [
              {
                id: 'l1',
                title: 'What is Artificial Intelligence?',
                description: 'A plain-language definition you can actually use',
                type: 'text',
                content: {
                  text: {
                    content: `# What is Artificial Intelligence?

## The short version
Artificial Intelligence (AI) is software that performs tasks we normally associate with human thinking — understanding language, recognising patterns, making predictions, and generating content. You do not need a maths degree to use it well. You need to understand what it is good at, what it is bad at, and how to ask it for what you want.

## What today's AI actually is
Most of the tools you hear about (ChatGPT, Claude, Copilot, Gemini) are **large language models (LLMs)**. An LLM is trained on enormous amounts of text and learns to predict the most likely next words. That simple mechanism, at scale, produces something that can:
- Draft and rewrite text
- Summarise long documents
- Answer questions
- Translate
- Write and explain code
- Extract structure from messy information

## What it is NOT
- It is **not** a database of facts. It can be confidently wrong ("hallucinate").
- It does **not** know anything that happened after its training cut-off unless you give it that information.
- It has **no understanding of your business** unless you provide context.

## Why this matters at work
The value of AI is not "it's clever." The value is **time**: a task that took 60 minutes can take 5. The skill you are building in this course is turning that potential into real, repeatable time savings on your own work — safely.

## Try this
Open an AI tool and ask it to rewrite a short email in three different tones (formal, friendly, brief). Notice how the *instruction* changes the output. That instruction is called a **prompt** — and prompting well is the single highest-leverage skill in this course.`,
                    estimatedReadTime: 6
                  }
                },
                duration: 6,
                order: 1,
                isPreview: true
              },
              {
                id: 'l2',
                title: 'History of AI Development',
                description: 'How we got from rule-based systems to modern LLMs',
                type: 'text',
                content: {
                  text: {
                    content: `# A Short History of AI (the parts that matter)

You do not need the full academic history — just enough to understand why today's tools behave the way they do.

## 1950s–1980s: Rules
Early AI was **hand-written rules**: "if X, then Y." Powerful for narrow problems, but brittle — someone had to anticipate every case. This is why old "AI" felt rigid.

## 1990s–2010s: Machine Learning
Instead of writing rules, we let systems **learn patterns from data**. Spam filters, recommendation engines, and fraud detection came from this era. The machine finds the rules itself by looking at examples.

## 2017–today: Transformers & LLMs
A 2017 architecture called the **transformer** made it possible to train models on essentially the whole internet. The result is the general-purpose language models we use now. The leap that surprised everyone: a model trained only to "predict the next word" turned out to be able to reason, summarise, and write code.

## The practical takeaway
Today's AI is **general-purpose and language-driven**. You program it with plain instructions, not code. That is why a non-technical employee can get enormous value from it — the interface is your own language.`,
                    estimatedReadTime: 5
                  }
                },
                duration: 5,
                order: 2,
                isPreview: false
              },
              {
                id: 'l3',
                title: 'Types of AI Systems',
                description: 'Chat assistants, agents, and automation — what is the difference',
                type: 'text',
                content: {
                  text: {
                    content: `# Types of AI Systems

Knowing which type you need keeps expectations realistic.

## 1. Chat assistants
Tools like ChatGPT and Claude. You type, they respond. Best for drafting, analysis, brainstorming, and Q&A. **You stay in control** of every step.

## 2. Copilots
AI built *inside* a tool you already use (Microsoft 365 Copilot, GitHub Copilot). They act on the document or code in front of you. Lower friction, narrower scope.

## 3. AI agents
Systems that can take **multiple steps on their own** toward a goal — read a file, call a tool, send a result. More powerful, but they need guardrails, because they act without asking at each step.

## 4. Automation (RPA + AI)
Connecting AI into a repeatable workflow (e.g. "every new invoice → extract the fields → enter them"). This is where the largest, most durable time savings live, but it requires the foundation you are building now.

## How to choose
Start with a **chat assistant** for your own tasks. Move to **copilots** for tools you live in. Only build **agents/automation** once you have found a repetitive, well-understood process worth automating — which is exactly what Module 4 covers.`,
                    estimatedReadTime: 5
                  }
                },
                duration: 5,
                order: 3,
                isPreview: false
              },
              {
                id: 'l4',
                title: 'Knowledge Check: AI Fundamentals',
                description: 'Check your understanding before moving on',
                type: 'text',
                content: {
                  text: {
                    content: `# Knowledge Check

Answer these for yourself, then expand the answer to compare. (A graded, certificate-eligible version of this check is coming.)

## 1. What is the core mechanism behind a large language model?
*Your answer first…*

**Answer:** It predicts the most likely next words based on patterns learned from huge amounts of text. It is **not** a fact database — which is why it can be confidently wrong and why you must verify important output.

## 2. Where is the safest place to START getting value from AI at work?
*Your answer first…*

**Answer:** With a **chat assistant on your own day-to-day tasks**, where you stay in control of every step. Copilots come next; autonomous agents and automation come last, once you have found a repetitive, well-understood process worth automating.

## 3. A vendor says "our AI learns from your data." What should you ask?
*Your answer first…*

**Answer:** "Supervised on **what labels**?" Specific answers are good; vague ones are a red flag.

If all three felt clear, you are ready for Module 2.`,
                    estimatedReadTime: 3
                  }
                },
                duration: 3,
                order: 4,
                isPreview: false
              }
            ]
          },
          {
            id: 'm2',
            title: 'Machine Learning Basics',
            description: 'Understanding how machines learn',
            duration: 60,
            order: 2,
            lessons: [
              {
                id: 'l5',
                title: 'Supervised vs. Unsupervised Learning',
                description: 'The two ways machines learn from data',
                type: 'text',
                content: {
                  text: {
                    content: `# Supervised vs. Unsupervised Learning

You will hear these terms constantly. Here is the version you actually need.

## Supervised learning
You give the machine **examples with the right answers** ("this email is spam, this one is not"). It learns the pattern, then labels new examples. Most business ML (predicting churn, scoring leads, detecting fraud) is supervised.

## Unsupervised learning
You give the machine data with **no labels** and ask it to find structure — for example, grouping customers into segments it discovers on its own.

## Where LLMs fit
LLMs are trained in a *self-supervised* way: the "right answer" is simply the next word in real text, so no human labelling is needed at the huge scale required. That is the trick that made them possible.

## Why you care
When a vendor says "our AI learns from your data," ask: *supervised on what labels?* Good answers are specific. Vague answers are a red flag.`,
                    estimatedReadTime: 5
                  }
                },
                duration: 5,
                order: 1,
                isPreview: false
              },
              {
                id: 'l6',
                title: 'Neural Networks Explained',
                description: 'The idea behind the technology — without the maths',
                type: 'text',
                content: {
                  text: {
                    content: `# Neural Networks, Without the Maths

A neural network is a stack of simple maths operations that, together, learn to map an input to an output. Think of it as a very large set of adjustable dials.

## Training in one sentence
Show the network an example, check how wrong it is, nudge the dials to be slightly less wrong, repeat billions of times. That is it.

## Why "deep"?
"Deep learning" just means many layers of these dials stacked up. More layers let the network capture more complex patterns — at the cost of needing more data and compute.

## The honest limitation
Because the knowledge lives in millions of dials, the network cannot *explain* its reasoning the way a person can. This is why **verifying AI output matters** — especially for anything that affects a customer, a decision, or money.`,
                    estimatedReadTime: 4
                  }
                },
                duration: 4,
                order: 2,
                isPreview: false
              }
            ]
          }
        ],
        tags: ['AI', 'ChatGPT', 'productivity'],
        language: 'English',
        requirements: ['No technical background required'],
        objectives: [
          'Explain what modern AI is and is not',
          'Choose the right type of AI tool for a task',
          'Apply AI to a real work task safely'
        ],
        enrollmentCount: 0,
        rating: 0,
        reviewCount: 0,
        lastUpdated: '2026-06-23',
        createdAt: '2026-06-01',
        publishedAt: '2026-06-23',
        status: 'published'
      }

      setCourse(mockCourse)

      // Set first lesson as current
      if (mockCourse.modules.length > 0 && mockCourse.modules[0].lessons.length > 0) {
        setCurrentModule(mockCourse.modules[0])
        setCurrentLesson(mockCourse.modules[0].lessons[0])
      }

      // Load saved progress (mock data)
      setCompletedLessons(['l1'])
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLessonIcon = (type: string, size = 16) => {
    switch (type) {
      case 'video': return <PlayCircle size={size} />
      case 'text': return <FileText size={size} />
      case 'quiz': return <BarChart size={size} />
      case 'assignment': return <PenTool size={size} />
      case 'code': return <Code size={size} />
      default: return <PlayCircle size={size} />
    }
  }

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
      // In real app, save progress to backend
    }
  }

  const navigateToLesson = (module: Module, lesson: Lesson) => {
    setCurrentModule(module)
    setCurrentLesson(lesson)
  }

  const goToNextLesson = () => {
    if (!course || !currentModule || !currentLesson) return

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id)
    
    // Check if there's a next lesson in current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex + 1])
    } else {
      // Move to next module
      const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id)
      if (currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1]
        setCurrentModule(nextModule)
        setCurrentLesson(nextModule.lessons[0])
      }
    }
  }

  const goToPreviousLesson = () => {
    if (!course || !currentModule || !currentLesson) return

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id)
    
    // Check if there's a previous lesson in current module
    if (currentLessonIndex > 0) {
      setCurrentLesson(currentModule.lessons[currentLessonIndex - 1])
    } else {
      // Move to previous module
      const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id)
      if (currentModuleIndex > 0) {
        const prevModule = course.modules[currentModuleIndex - 1]
        setCurrentModule(prevModule)
        setCurrentLesson(prevModule.lessons[prevModule.lessons.length - 1])
      }
    }
  }

  const calculateProgress = () => {
    if (!course) return 0
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    return Math.round((completedLessons.length / totalLessons) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-black" />
      </div>
    )
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zinc-600">Course not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed lg:relative w-80 h-screen bg-white border-r border-zinc-200 overflow-y-auto z-40"
          >
            <div className="sticky top-0 bg-white border-b border-zinc-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold line-clamp-1">{course.title}</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-zinc-600 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Your progress</span>
                  <span className="font-medium">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div 
                    className="bg-black rounded-full h-2 transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
              {course.modules.map((module) => (
                <div key={module.id} className="mb-6">
                  <h3 className="font-medium text-sm text-zinc-600 mb-3">
                    {module.title}
                  </h3>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id)
                      const isCurrent = currentLesson?.id === lesson.id
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigateToLesson(module, lesson)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                            isCurrent 
                              ? 'bg-zinc-100 border border-zinc-300' 
                              : 'hover:bg-zinc-50'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle size={20} className="text-zinc-400 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {getLessonIcon(lesson.type)}
                              <p className="text-sm font-medium line-clamp-1">
                                {lesson.title}
                              </p>
                            </div>
                            <p className="text-xs text-zinc-600">
                              {lesson.duration} min
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-zinc-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-zinc-600 hover:text-black"
              >
                <Menu size={24} />
              </button>
              <nav className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => router.push('/courses')}
                  className="text-zinc-600 hover:text-black"
                >
                  Courses
                </button>
                <ChevronRight size={16} className="text-zinc-400" />
                <button 
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="text-zinc-600 hover:text-black line-clamp-1"
                >
                  {course.title}
                </button>
                <ChevronRight size={16} className="text-zinc-400" />
                <span className="font-medium line-clamp-1">{currentLesson.title}</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {getLessonIcon(currentLesson.type, 24)}
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              </div>
              <p className="text-zinc-600">{currentLesson.description}</p>
            </div>

            {/* Lesson Content */}
            <div className="mb-8">
              {currentLesson.type === 'video' && currentLesson.content.video && (
                <VideoPlayer
                  url={currentLesson.content.video.url}
                  title={currentLesson.title}
                  aspectRatio="16:9"
                  onComplete={() => markLessonComplete(currentLesson.id)}
                />
              )}

              {currentLesson.type === 'text' && currentLesson.content.text && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="prose prose-zinc max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: currentLesson.content.text.content.replace(/\n/g, '<br />') 
                    }} />
                  </div>
                </div>
              )}

              {currentLesson.type === 'quiz' && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Quiz</h2>
                  <p className="text-zinc-600">Quiz content would go here...</p>
                </div>
              )}

              {currentLesson.type === 'assignment' && (
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Assignment</h2>
                  <p className="text-zinc-600">Assignment content would go here...</p>
                </div>
              )}

              {currentLesson.type === 'code' && currentLesson.content.code && (
                <InteractiveCodeEditor
                  lesson={{
                    id: currentLesson.id,
                    title: currentLesson.title,
                    code: currentLesson.content.code.content,
                    language: currentLesson.content.code.language || 'javascript',
                    type: 'code'
                  }}
                  onSave={(code) => {
                    console.log('Code saved:', code)
                    // Save to backend
                  }}
                  onBranch={(code) => {
                    console.log('Branch created:', code)
                    // Create branch in backend
                  }}
                />
              )}
            </div>

            {/* Lesson Actions */}
            <div className="flex items-center justify-between pb-8">
              <button
                onClick={goToPreviousLesson}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {!completedLessons.includes(currentLesson.id) && (
                <button
                  onClick={() => markLessonComplete(currentLesson.id)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Mark as Complete
                </button>
              )}

              <button
                onClick={goToNextLesson}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Additional Resources */}
            <div className="border-t border-zinc-200 pt-8">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                  <MessageSquare size={20} />
                  <div className="text-left">
                    <p className="font-medium">Q&A</p>
                    <p className="text-sm text-zinc-600">Ask questions and get answers</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                  <Download size={20} />
                  <div className="text-left">
                    <p className="font-medium">Downloads</p>
                    <p className="text-sm text-zinc-600">Course materials and resources</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}