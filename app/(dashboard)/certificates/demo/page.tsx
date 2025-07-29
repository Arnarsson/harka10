'use client'

import { useState } from 'react'
import { CertificateAchievement } from '@/components/certificates/CertificateAchievement'
import { CertificateProgressBar } from '@/components/certificates/CertificateProgressBar'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { CertificateEmptyState } from '@/components/certificates/CertificateEmptyState'
import { CertificateOnboarding } from '@/components/onboarding/CertificateOnboarding'
import { MobileCertificateViewer } from '@/components/certificates/MobileCertificateViewer'
import { CertificateGallerySkeleton } from '@/components/ui/skeletons'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function CertificateDemoPage() {
  const [showAchievement, setShowAchievement] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showMobileViewer, setShowMobileViewer] = useState(false)
  const [progress, setProgress] = useState(75)
  const [showSkeleton, setShowSkeleton] = useState(false)

  const sampleCertificate = {
    id: '1',
    title: 'Certificate of Completion',
    courseName: 'Advanced React Development',
    userName: 'John Doe',
    issueDate: new Date().toISOString(),
    imageUrl: '/api/placeholder/800/550',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    verified: true,
    viewCount: 234,
    verificationUrl: 'https://example.com/verify/12345'
  }

  const milestones = [
    { percent: 25, label: 'Started', icon: 'check' as const },
    { percent: 50, label: 'Halfway', icon: 'trophy' as const },
    { percent: 75, label: 'Almost', icon: 'award' as const },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Certificate Components Demo</h1>
        <p className="text-gray-600">Phase 1: Polish & Delight - Micro-interactions & Animations</p>
      </motion.div>

      {/* Demo Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Interactive Demos</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setShowAchievement(true)}>
            Show Achievement Animation
          </Button>
          <Button onClick={() => setShowOnboarding(true)} variant="outline">
            Show Onboarding Flow
          </Button>
          <Button onClick={() => setShowMobileViewer(true)} variant="outline">
            Show Mobile Viewer
          </Button>
          <Button 
            onClick={() => setProgress(progress >= 100 ? 0 : 100)} 
            variant="outline"
          >
            {progress >= 100 ? 'Reset Progress' : 'Complete Progress'}
          </Button>
          <Button 
            onClick={() => setShowSkeleton(!showSkeleton)} 
            variant="outline"
          >
            Toggle Skeleton
          </Button>
        </div>
      </div>

      {/* Progress Bar Demo */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Certificate Progress Bar</h2>
        <CertificateProgressBar
          progress={progress}
          milestones={milestones}
          onUnlock={() => setShowAchievement(true)}
        />
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Certificate Cards with Hover Effects</h2>
        {showSkeleton ? (
          <CertificateGallerySkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CertificateCard
              certificate={sampleCertificate}
              onView={() => setShowMobileViewer(true)}
              onShare={() => console.log('Share clicked')}
              onDownload={() => console.log('Download clicked')}
            />
            <CertificateCard
              certificate={{
                ...sampleCertificate,
                id: '2',
                title: 'Professional Certificate',
                courseName: 'Node.js Backend Development',
                skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
                verified: false,
                viewCount: 156
              }}
              onView={() => setShowMobileViewer(true)}
            />
            <CertificateCard
              certificate={{
                ...sampleCertificate,
                id: '3',
                title: 'Expert Certificate',
                courseName: 'Cloud Architecture with AWS',
                imageUrl: undefined,
                skills: ['AWS', 'Docker', 'Kubernetes'],
                viewCount: 89
              }}
              onView={() => setShowMobileViewer(true)}
            />
          </div>
        )}
      </div>

      {/* Empty States */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Empty States</h2>
        
        <div className="bg-white rounded-lg shadow-sm">
          <CertificateEmptyState 
            variant="gallery"
            onBrowseCourses={() => console.log('Browse courses clicked')}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <CertificateEmptyState 
            variant="profile"
            userName="Jane Smith"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <CertificateEmptyState variant="team" />
        </div>
      </div>

      {/* Modals */}
      <CertificateAchievement
        isOpen={showAchievement}
        onClose={() => setShowAchievement(false)}
        certificateData={sampleCertificate}
        onShare={() => console.log('Share from achievement')}
        onDownload={() => console.log('Download from achievement')}
        onViewCertificate={() => {
          setShowAchievement(false)
          setShowMobileViewer(true)
        }}
      />

      <CertificateOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          setShowOnboarding(false)
          console.log('Onboarding completed')
        }}
        userName="Demo User"
      />

      <MobileCertificateViewer
        isOpen={showMobileViewer}
        onClose={() => setShowMobileViewer(false)}
        certificate={sampleCertificate}
      />
    </div>
  )
}