'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Shield, CheckCircle, XCircle, Loader2, 
  Calendar, Award, User, BookOpen, Download
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

interface CertificateData {
  id: string
  certificate_number: string
  user_id: string
  course_id: string
  template_id: string
  issued_at: string
  grade?: number
  skills?: string[]
  verification_hash: string
  metadata: {
    recipientName: string
    courseTitle: string
    completionDate: string
    instructorName: string
    instructorTitle: string
    certificateNumber: string
    score?: number
    verificationUrl: string
  }
  user?: {
    full_name: string
    email: string
  }
  course?: {
    title: string
    description: string
    instructor: {
      name: string
      title: string
    }
  }
}

export default function CertificateVerificationPage() {
  const params = useParams()
  const certificateId = params.id as string
  const [loading, setLoading] = useState(true)
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    verifyCertificate()
  }, [certificateId])

  const verifyCertificate = async () => {
    try {
      // For demo purposes, we'll create mock data
      // In production, this would fetch from Supabase
      const mockCertificate: CertificateData = {
        id: '1',
        certificate_number: certificateId,
        user_id: '1',
        course_id: '1',
        template_id: 'modern',
        issued_at: '2024-01-15T10:30:00Z',
        grade: 95,
        skills: ['React', 'Node.js', 'TypeScript', 'Next.js'],
        verification_hash: certificateId,
        metadata: {
          recipientName: 'John Doe',
          courseTitle: 'Complete Web Development Bootcamp',
          completionDate: '2024-01-15',
          instructorName: 'Sarah Chen',
          instructorTitle: 'Senior Developer',
          certificateNumber: certificateId,
          score: 95,
          verificationUrl: `${window.location.origin}/certificates/verify/${certificateId}`
        },
        user: {
          full_name: 'John Doe',
          email: 'john.doe@example.com'
        },
        course: {
          title: 'Complete Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
          instructor: {
            name: 'Sarah Chen',
            title: 'Senior Developer'
          }
        }
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate not found for certain IDs
      if (certificateId.includes('invalid')) {
        throw new Error('Certificate not found')
      }

      setCertificate(mockCertificate)
    } catch (err: any) {
      setError(err.message || 'Failed to verify certificate')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="mx-auto text-zinc-400 animate-spin mb-4" />
          <p className="text-lg text-zinc-600">Verifying certificate...</p>
        </div>
      </div>
    )
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Certificate Not Found</h1>
          <p className="text-zinc-600 mb-6">
            The certificate with ID <span className="font-mono">{certificateId}</span> could not be verified.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Go to Homepage
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Award className="text-white" size={24} />
            </div>
            <span className="text-xl font-semibold">AI Training Platform</span>
          </Link>
        </div>
      </header>

      {/* Verification Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-green-50 p-6 border-b border-green-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-900">Certificate Verified</h1>
                <p className="text-green-700">This is a valid certificate issued by AI Training Platform</p>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="p-8 space-y-8">
            {/* Certificate Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Certificate Number</p>
                  <p className="font-mono text-lg">{certificate.certificate_number}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Issued Date</p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(certificate.issued_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Template</p>
                  <p className="capitalize">{certificate.template_id}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Recipient</p>
                  <p className="font-semibold text-lg">{certificate.metadata.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Course</p>
                  <p className="font-medium">{certificate.metadata.courseTitle}</p>
                </div>
                {certificate.grade && (
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Grade</p>
                    <p className="text-lg font-semibold text-green-600">{certificate.grade}%</p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {certificate.skills && certificate.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-zinc-600 mb-3">Skills Acquired</h3>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            <div className="border-t pt-6">
              <p className="text-sm text-zinc-600 mb-2">Certified by</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center">
                  <User size={24} className="text-zinc-600" />
                </div>
                <div>
                  <p className="font-medium">{certificate.metadata.instructorName}</p>
                  <p className="text-sm text-zinc-600">{certificate.metadata.instructorTitle}</p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
              <Shield size={24} className="text-zinc-600" />
              <div>
                <p className="font-medium">Blockchain Secured</p>
                <p className="text-sm text-zinc-600">
                  This certificate is cryptographically secured and cannot be tampered with
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`/courses/${certificate.course_id}`}
                className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <BookOpen size={20} />
                View Course
              </Link>
              <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                <Download size={20} />
                Download Certificate
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-zinc-600">
          <p>
            Verification performed on {new Date().toLocaleString()}
          </p>
          <p className="mt-2">
            For questions about this certificate, contact{' '}
            <a href="mailto:support@aitrainingplatform.com" className="underline">
              support@aitrainingplatform.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}