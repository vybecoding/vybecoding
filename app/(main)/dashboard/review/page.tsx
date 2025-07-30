'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { BookOpen, CheckCircle, XCircle, Clock, TrendingUp, Star } from 'lucide-react'

export default function GuideReviewPage() {
  const { user } = useUser()
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  // Mock data - would come from Convex in real implementation
  const guides: Array<{
    id: string
    title: string
    status: 'approved' | 'pending' | 'rejected'
    submittedAt: string
    reviewedAt: string | null
    views: number
    rating: number | null
    earnings: number
    coverImage: string | null
    gradient?: string
    rejectionReason?: string
  }> = [
    {
      id: '1',
      title: 'Building AI Agents with Claude',
      status: 'approved',
      submittedAt: '2024-01-20',
      reviewedAt: '2024-01-22',
      views: 1234,
      rating: 4.8,
      earnings: 287,
      coverImage: null,
      gradient: 'from-vybe-purple to-vybe-pink'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      status: 'pending',
      submittedAt: '2024-01-25',
      reviewedAt: null,
      views: 0,
      rating: null,
      earnings: 0,
      coverImage: null,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: '3',
      title: 'React Performance Optimization',
      status: 'rejected',
      submittedAt: '2024-01-18',
      reviewedAt: '2024-01-19',
      views: 0,
      rating: null,
      earnings: 0,
      coverImage: null,
      gradient: 'from-orange-500 to-red-600',
      rejectionReason: 'Content needs more depth and practical examples'
    },
    {
      id: '4',
      title: 'Next.js 14 Complete Guide',
      status: 'approved',
      submittedAt: '2024-01-15',
      reviewedAt: '2024-01-16',
      views: 2847,
      rating: 4.9,
      earnings: 512,
      coverImage: null,
      gradient: 'from-green-500 to-teal-600'
    }
  ]

  const filteredGuides = selectedStatus === 'all' 
    ? guides 
    : guides.filter(guide => guide.status === selectedStatus)

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
    approved: {
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    rejected: {
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/20'
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-vybe-purple" />
            </div>
            <span className="text-3xl font-bold text-white">7</span>
          </div>
          <p className="text-sm text-gray-400">Total Guides</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-3xl font-bold text-white">5</span>
          </div>
          <p className="text-sm text-gray-400">Approved</p>
          <p className="text-xs text-green-400 mt-1">71% approval rate</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-3xl font-bold text-white">1</span>
          </div>
          <p className="text-sm text-gray-400">Under Review</p>
          <p className="text-xs text-gray-500 mt-1">~24h wait time</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-vybe-pink/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-vybe-pink" />
            </div>
            <span className="text-3xl font-bold text-white">8.2K</span>
          </div>
          <p className="text-sm text-gray-400">Total Views</p>
          <p className="text-xs text-vybe-pink mt-1">+23% this month</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              selectedStatus === status
                ? "bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/40"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 text-xs opacity-60">
                ({guides.filter(g => g.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.length === 0 ? (
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No guides found with this status</p>
          </div>
        ) : (
          filteredGuides.map((guide) => {
            const config = statusConfig[guide.status as keyof typeof statusConfig]
            const StatusIcon = config.icon
            
            return (
              <div
                key={guide.id}
                className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover Image */}
                  <div className="md:w-48 h-32 md:h-auto bg-gray-800 relative overflow-hidden">
                    {guide.coverImage ? (
                      <img
                        src={guide.coverImage}
                        alt={guide.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={cn(
                        "w-full h-full bg-gradient-to-br",
                        guide.gradient || "from-vybe-purple to-vybe-pink",
                        "flex items-center justify-center"
                      )}>
                        <BookOpen className="w-12 h-12 text-white/20" />
                      </div>
                    )}
                    <div className={cn(
                      "absolute top-2 right-2 px-2 py-1 rounded-md flex items-center gap-1",
                      config.bgColor,
                      "border",
                      config.borderColor
                    )}>
                      <StatusIcon className={cn("w-3 h-3", config.color)} />
                      <span className={cn("text-xs font-medium", config.color)}>
                        {guide.status.charAt(0).toUpperCase() + guide.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{guide.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Submitted: {new Date(guide.submittedAt).toLocaleDateString()}</span>
                          {guide.reviewedAt && (
                            <span>Reviewed: {new Date(guide.reviewedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      {guide.status === 'approved' && (
                        <button className="px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium">
                          View Analytics
                        </button>
                      )}
                    </div>

                    {guide.status === 'approved' && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-2xl font-semibold text-white">{guide.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">Total Views</p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold text-white flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {guide.rating}
                          </p>
                          <p className="text-xs text-gray-400">Average Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold text-green-400">${guide.earnings}</p>
                          <p className="text-xs text-gray-400">Total Earnings</p>
                        </div>
                      </div>
                    )}

                    {guide.status === 'rejected' && guide.rejectionReason && (
                      <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                        <p className="text-sm text-red-400">
                          <span className="font-medium">Feedback:</span> {guide.rejectionReason}
                        </p>
                      </div>
                    )}

                    {guide.status === 'pending' && (
                      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                        <p className="text-sm text-yellow-400">
                          Your guide is under review. We'll notify you within 24-48 hours.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      {guide.status === 'approved' && (
                        <>
                          <a
                            href={`/guides/${guide.id}`}
                            className="px-4 py-2 bg-vybe-purple text-white rounded-lg hover:bg-vybe-purple/80 transition-all text-sm font-medium"
                          >
                            View Guide
                          </a>
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium">
                            Edit
                          </button>
                        </>
                      )}
                      {guide.status === 'rejected' && (
                        <button className="px-4 py-2 bg-vybe-purple text-white rounded-lg hover:bg-vybe-purple/80 transition-all text-sm font-medium">
                          Revise & Resubmit
                        </button>
                      )}
                      {guide.status === 'pending' && (
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium">
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Create New Guide CTA */}
      <div className="relative overflow-hidden bg-gradient-to-r from-vybe-purple/20 to-vybe-pink/20 rounded-xl p-12 border border-vybe-purple/40 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-vybe-purple/10 via-transparent to-vybe-pink/10" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">
            Ready to share your knowledge?
          </h3>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Create a new guide and start earning from your expertise. Join thousands of creators making an impact.
          </p>
          <a
            href="/write"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4",
              "bg-gradient-to-r from-vybe-purple to-vybe-pink",
              "text-white font-semibold rounded-lg",
              "hover:shadow-lg hover:shadow-vybe-purple/25",
              "transition-all transform hover:scale-105"
            )}
          >
            <BookOpen className="w-5 h-5" />
            Create New Guide
          </a>
        </div>
      </div>
    </div>
  )
}