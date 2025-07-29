'use client'

import { InteractiveLessonViewer } from '@/components/learning/interactive-lesson-viewer'
import { PageTransition } from '@/components/layout/page-transition'

// Mock course data
const mockCourse = {
  id: '1',
  title: 'Advanced React Development',
  modules: [
    {
      id: 'module-1',
      title: 'React Fundamentals',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to React',
          description: 'Learn the basics of React and why it\'s powerful',
          type: 'video' as const,
          duration: 15,
          content: {
            videoUrl: 'https://example.com/video1.mp4',
            textContent: '<h2>Welcome to React</h2><p>React is a JavaScript library for building user interfaces...</p>'
          },
          resources: [
            { title: 'React Documentation', url: 'https://react.dev', type: 'link' as const },
            { title: 'Starter Code', url: '/downloads/starter.zip', type: 'code' as const }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Components and Props',
          description: 'Understanding React components and how to pass data',
          type: 'text' as const,
          duration: 20,
          content: {
            textContent: '<h2>Components and Props</h2><p>Components let you split the UI into independent, reusable pieces...</p>'
          }
        },
        {
          id: 'lesson-1-3',
          title: 'State and Lifecycle',
          description: 'Managing component state and lifecycle methods',
          type: 'code' as const,
          duration: 25,
          content: {
            codeSnippet: `import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
            language: 'javascript'
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Advanced Patterns',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Custom Hooks',
          description: 'Creating reusable logic with custom hooks',
          type: 'video' as const,
          duration: 30,
          content: {
            videoUrl: 'https://example.com/video2.mp4'
          }
        },
        {
          id: 'lesson-2-2',
          title: 'Context API',
          description: 'Global state management with Context',
          type: 'text' as const,
          duration: 25,
          content: {
            textContent: '<h2>Context API</h2><p>Context provides a way to pass data through the component tree...</p>'
          }
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Performance Optimization',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'React.memo and useMemo',
          description: 'Optimizing component re-renders',
          type: 'video' as const,
          duration: 20,
          content: {
            videoUrl: 'https://example.com/video3.mp4'
          }
        },
        {
          id: 'lesson-3-2',
          title: 'Code Splitting',
          description: 'Lazy loading components for better performance',
          type: 'code' as const,
          duration: 15,
          content: {
            codeSnippet: `import React, { lazy, Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}`,
            language: 'javascript'
          }
        }
      ]
    }
  ]
}

export default function LearnPage({ params }: { params: { courseId: string } }) {
  const handleProgressUpdate = (progress: any) => {
    console.log('Progress updated:', progress)
    // In a real app, save progress to backend
  }

  // Calculate certificate progress based on completed lessons
  const certificateProgress = 65 // This would be calculated based on actual progress

  return (
    <PageTransition mode="fade">
      <InteractiveLessonViewer
        course={mockCourse}
        onProgressUpdate={handleProgressUpdate}
        certificateProgress={certificateProgress}
      />
    </PageTransition>
  )
}