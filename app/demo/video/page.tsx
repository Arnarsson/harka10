'use client'

import { VideoPlayer } from '@/components/ui/video-player'

export default function VideoDemo() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">White-Labeled Video Player Demo</h1>
          <p className="text-zinc-600">
            Embed YouTube and Vimeo videos without platform branding
          </p>
        </div>

        {/* YouTube Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">YouTube Video</h2>
          <VideoPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="Sample YouTube Video"
            aspectRatio="16:9"
          />
          <p className="text-sm text-zinc-600">
            YouTube videos are embedded using youtube-nocookie.com with modestbranding parameter
          </p>
        </div>

        {/* Vimeo Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Vimeo Video</h2>
          <VideoPlayer
            url="https://vimeo.com/76979871"
            title="Sample Vimeo Video"
            aspectRatio="16:9"
          />
          <p className="text-sm text-zinc-600">
            Vimeo videos are embedded with title, byline, and portrait parameters set to 0
          </p>
        </div>

        {/* Different Aspect Ratios */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Different Aspect Ratios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">16:9</h3>
              <VideoPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                aspectRatio="16:9"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">4:3</h3>
              <VideoPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                aspectRatio="4:3"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">1:1</h3>
              <VideoPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                aspectRatio="1:1"
              />
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Example</h2>
          <pre className="bg-zinc-100 p-4 rounded-lg overflow-x-auto">
            <code>{`import { VideoPlayer } from '@/components/ui/video-player'

// Basic usage
<VideoPlayer
  url="https://www.youtube.com/watch?v=VIDEO_ID"
  title="Lesson Title"
/>

// With options
<VideoPlayer
  url="https://vimeo.com/VIDEO_ID"
  title="Course Introduction"
  aspectRatio="16:9"
  autoplay={true}
  muted={true}
  onComplete={() => console.log('Video completed')}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}