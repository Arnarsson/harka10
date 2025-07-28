'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

interface VideoPlayerProps {
  url: string
  title?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
  autoplay?: boolean
  muted?: boolean
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

// Parse video ID and platform from URL
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | null; id: string | null } {
  // YouTube patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] }
  }

  // Vimeo patterns
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] }
  }

  return { platform: null, id: null }
}

export function VideoPlayer({
  url,
  title,
  aspectRatio = '16:9',
  autoplay = false,
  muted = true,
  onProgress,
  onComplete
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const { platform, id } = parseVideoUrl(url)

  // Get embed URL with privacy-enhanced mode and minimal branding
  const getEmbedUrl = () => {
    if (!platform || !id) return null

    if (platform === 'youtube') {
      // Use youtube-nocookie.com for privacy-enhanced mode
      // modestbranding=1 removes YouTube logo from control bar
      // rel=0 prevents showing related videos
      // controls=0 hides default controls (we'll add our own)
      // showinfo=0 hides video title and uploader info
      return `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0&showinfo=0&controls=0&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&enablejsapi=1&origin=${window.location.origin}`
    }

    if (platform === 'vimeo') {
      // Vimeo parameters to hide branding
      // title=0 hides the title
      // byline=0 hides the author
      // portrait=0 hides the author's portrait
      // controls=0 hides default controls
      return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&controls=0&autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}&transparent=1`
    }

    return null
  }

  const embedUrl = getEmbedUrl()

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!iframeRef.current) return

    if (platform === 'youtube') {
      // YouTube iframe API
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}'
      iframeRef.current.contentWindow?.postMessage(message, '*')
    } else if (platform === 'vimeo') {
      // Vimeo Player API
      const message = isPlaying ? '{"method":"pause"}' : '{"method":"play"}'
      iframeRef.current.contentWindow?.postMessage(message, '*')
    }
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    if (!iframeRef.current) return

    if (platform === 'youtube') {
      const message = isMuted ? '{"event":"command","func":"unMute","args":""}' : '{"event":"command","func":"mute","args":""}'
      iframeRef.current.contentWindow?.postMessage(message, '*')
    } else if (platform === 'vimeo') {
      const message = isMuted ? '{"method":"setVolume","value":1}' : '{"method":"setVolume","value":0}'
      iframeRef.current.contentWindow?.postMessage(message, '*')
    }
    setIsMuted(!isMuted)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Aspect ratio padding
  const getAspectRatioPadding = () => {
    switch (aspectRatio) {
      case '16:9': return '56.25%'
      case '4:3': return '75%'
      case '1:1': return '100%'
      default: return '56.25%'
    }
  }

  if (!embedUrl) {
    return (
      <div className="bg-zinc-100 rounded-lg p-8 text-center">
        <p className="text-zinc-600">Invalid video URL. Please provide a valid YouTube or Vimeo URL.</p>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Aspect ratio container */}
      <div style={{ paddingBottom: getAspectRatioPadding() }} className="relative">
        {/* Loading state */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900 flex items-center justify-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-700 border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video iframe */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />

        {/* Custom controls overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"
            >
              {/* Title */}
              {title && (
                <div className="absolute top-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                </div>
              )}

              {/* Control buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-zinc-300 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                  {/* Mute/Unmute */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-zinc-300 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-zinc-300 transition-colors"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click overlay for play/pause */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlay}
        />
      </div>
    </div>
  )
}