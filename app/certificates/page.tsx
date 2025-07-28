'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Download, Share2, ExternalLink, Calendar, Clock, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Certificate {
  id: string
  courseTitle: string
  courseThumbnail: string
  completedAt: string
  certificateNumber: string
  skills: string[]
  instructor: string
  duration: number
  verificationUrl: string
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    setLoading(true)
    try {
      // Mock certificates data
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          courseTitle: 'Complete Web Development Bootcamp',
          courseThumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
          completedAt: '2024-01-15',
          certificateNumber: 'CERT-WEB-2024-0001',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
          instructor: 'Sarah Chen',
          duration: 40,
          verificationUrl: 'https://verify.aitraining.com/cert/CERT-WEB-2024-0001'
        },
        {
          id: '2',
          courseTitle: 'UI/UX Design Masterclass',
          courseThumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
          completedAt: '2023-12-20',
          certificateNumber: 'CERT-UX-2023-0542',
          skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
          instructor: 'Alex Rivera',
          duration: 30,
          verificationUrl: 'https://verify.aitraining.com/cert/CERT-UX-2023-0542'
        },
        {
          id: '3',
          courseTitle: 'Data Science with Python',
          courseThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
          completedAt: '2023-11-10',
          certificateNumber: 'CERT-DS-2023-0892',
          skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
          instructor: 'Dr. Michael Zhang',
          duration: 60,
          verificationUrl: 'https://verify.aitraining.com/cert/CERT-DS-2023-0892'
        }
      ]
      
      setCertificates(mockCertificates)
    } catch (error) {
      console.error('Error loading certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (certificate: Certificate) => {
    // In real app, this would generate and download the certificate PDF
    console.log('Downloading certificate:', certificate.certificateNumber)
  }

  const handleShareLinkedIn = (certificate: Certificate) => {
    const shareText = `I just completed "${certificate.courseTitle}" on AI Training Platform! Check out my certificate: ${certificate.verificationUrl}`
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.verificationUrl)}&summary=${encodeURIComponent(shareText)}`
    window.open(linkedInUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Award size={32} />
            <h1 className="text-3xl font-bold">My Certificates</h1>
          </div>
          <p className="text-zinc-600">
            Your achievements and certifications from completed courses
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-zinc-200 rounded-lg h-64" />
              </div>
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award size={48} className="mx-auto text-zinc-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No certificates yet</h2>
            <p className="text-zinc-600 mb-6">
              Complete courses to earn certificates and showcase your achievements
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Browse Courses
              <ExternalLink size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Certificate Preview */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-900 to-zinc-700 p-6">
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src={certificate.courseThumbnail}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-full flex flex-col justify-between text-white">
                    <div>
                      <Award size={32} className="mb-2" />
                      <h3 className="text-lg font-bold mb-1">Certificate of Completion</h3>
                      <p className="text-sm opacity-90">{certificate.courseTitle}</p>
                    </div>
                    <div className="text-xs opacity-75">
                      {certificate.certificateNumber}
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600 mb-1">
                      <Calendar size={14} />
                      Completed {new Date(certificate.completedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Clock size={14} />
                      {certificate.duration} hours
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-zinc-100 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs text-zinc-600">
                        +{certificate.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleDownload(certificate)}
                      className="flex-1 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleShareLinkedIn(certificate)}
                      className="flex-1 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>

                  {/* Verification */}
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs text-zinc-600 hover:text-black transition-colors"
                  >
                    <CheckCircle size={14} className="inline mr-1" />
                    Verify Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Benefits */}
        {certificates.length > 0 && (
          <div className="mt-16 bg-zinc-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Certificate Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                  <Share2 size={24} />
                </div>
                <h3 className="font-semibold">Share on LinkedIn</h3>
                <p className="text-sm text-zinc-600">
                  Showcase your achievements to your professional network
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-semibold">Verified Credentials</h3>
                <p className="text-sm text-zinc-600">
                  Each certificate has a unique verification URL
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                  <Download size={24} />
                </div>
                <h3 className="font-semibold">Download PDF</h3>
                <p className="text-sm text-zinc-600">
                  Get a professional PDF certificate for your records
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}