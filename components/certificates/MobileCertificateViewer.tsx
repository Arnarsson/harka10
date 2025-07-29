'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Share2, 
  Download, 
  Maximize2, 
  Minimize2,
  Check,
  Copy,
  Linkedin,
  Facebook,
  Twitter,
  Link2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { toast } from '@/hooks/use-toast'

interface MobileCertificateViewerProps {
  isOpen: boolean
  onClose: () => void
  certificate: {
    id: string
    title: string
    courseName: string
    userName: string
    issueDate: string
    imageUrl?: string
    verificationUrl?: string
    skills?: string[]
  }
}

export function MobileCertificateViewer({
  isOpen,
  onClose,
  certificate
}: MobileCertificateViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const shareUrl = certificate.verificationUrl || `${window.location.origin}/certificates/${certificate.id}`

  const handleShare = async (platform?: string) => {
    if (navigator.share && !platform) {
      try {
        await navigator.share({
          title: `${certificate.title} - ${certificate.courseName}`,
          text: `Check out my certificate for ${certificate.courseName}!`,
          url: shareUrl
        })
        toast({
          title: "Shared successfully",
          description: "Certificate shared via native share"
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setShowShareMenu(true)
        }
      }
    } else {
      setShowShareMenu(true)
    }
  }

  const handlePlatformShare = (platform: string) => {
    let url = ''
    const text = encodeURIComponent(`I earned a certificate in ${certificate.courseName}!`)
    const encodedUrl = encodeURIComponent(shareUrl)

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`
        break
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Link copied",
        description: "Certificate link copied to clipboard"
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const handleDownload = async () => {
    if (!certificate.imageUrl) return

    try {
      const response = await fetch(certificate.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificate-${certificate.id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast({
        title: "Downloaded",
        description: "Certificate saved to your device"
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      imageRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="relative">
            <DrawerTitle className="text-center pr-8">
              {certificate.title}
            </DrawerTitle>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {/* Certificate Image */}
            <div 
              ref={imageRef}
              className="relative bg-gray-100 rounded-lg overflow-hidden mb-4"
            >
              {certificate.imageUrl ? (
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-[16/11] flex items-center justify-center">
                  <p className="text-gray-500">Certificate preview not available</p>
                </div>
              )}
              
              {/* Fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Certificate Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{certificate.courseName}</h3>
                <p className="text-sm text-gray-600">
                  Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                </p>
              </div>

              {certificate.skills && certificate.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills earned:</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={() => handleShare()}
                  className="gap-2"
                  size="lg"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="gap-2"
                  size="lg"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowShareMenu(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white rounded-t-2xl w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-center">Share Certificate</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => handlePlatformShare('linkedin')}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handlePlatformShare('facebook')}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">Facebook</span>
                </button>
                
                <button
                  onClick={() => handlePlatformShare('twitter')}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Twitter className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">X</span>
                </button>
                
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {copied ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <Copy className="h-6 w-6 text-gray-700" />
                    )}
                  </div>
                  <span className="text-xs">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
              
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowShareMenu(false)}
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}