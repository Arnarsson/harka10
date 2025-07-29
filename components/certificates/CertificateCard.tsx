'use client'

import { motion } from 'framer-motion'
import { Award, Download, Share2, Eye, Calendar, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CertificateCardProps {
  certificate: {
    id: string
    title: string
    courseName: string
    issueDate: string
    imageUrl?: string
    skills?: string[]
    verified?: boolean
    viewCount?: number
  }
  onView?: () => void
  onShare?: () => void
  onDownload?: () => void
  className?: string
}

export function CertificateCard({
  certificate,
  onView,
  onShare,
  onDownload,
  className
}: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onView}
    >
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Certificate Image/Preview */}
        <div className="relative aspect-[16/11] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {certificate.imageUrl ? (
            <img
              src={certificate.imageUrl}
              alt={certificate.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Award className="h-20 w-20 text-gray-300" />
            </div>
          )}
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onView?.()
              }}
            >
              <Eye className="h-5 w-5 text-gray-700" />
            </motion.button>
            <motion.button
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onShare?.()
              }}
            >
              <Share2 className="h-5 w-5 text-gray-700" />
            </motion.button>
            <motion.button
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onDownload?.()
              }}
            >
              <Download className="h-5 w-5 text-gray-700" />
            </motion.button>
          </motion.div>

          {/* Verified Badge */}
          {certificate.verified && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-4 w-4" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Certificate Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {certificate.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {certificate.courseName}
            </p>
          </div>

          {/* Date and Views */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
            </div>
            {certificate.viewCount !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{certificate.viewCount} views</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {certificate.skills.slice(0, 3).map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {skill}
                </motion.span>
              ))}
              {certificate.skills.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{certificate.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              transparent, 
              rgba(139, 92, 246, 0.3), 
              rgba(236, 72, 153, 0.3), 
              rgba(251, 146, 60, 0.3), 
              transparent
            )`,
            backgroundSize: '200% 100%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '100% 0%']
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  )
}