'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { BookOpen, CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, Edit2 } from 'lucide-react'

interface GuideReview {
  id: string
  title: string
  authorName: string
  submittedAt: string
  wordCount: number
  aiScore: number
  status: 'pending' | 'approved' | 'needs-revision'
  issues?: string[]
  promptExamples?: number
}

export default function DashboardReviewPage() {
  const { user } = useUser()

  // Mock data for demonstration - will be replaced with Convex queries
  const mockReviews: GuideReview[] = [
    {
      id: '1',
      title: 'Quick AI Tips',
      authorName: 'Mike Johnson',
      submittedAt: '2 days ago',
      wordCount: 247,
      aiScore: 42,
      status: 'needs-revision',
      issues: ['Content too brief', 'Missing examples', 'Incomplete conclusion']
    },
    {
      id: '2',
      title: 'Building AI Agents with Claude',
      authorName: 'Alex Developer',
      submittedAt: '3 hours ago',
      wordCount: 1890,
      aiScore: 0, // Pending review
      status: 'pending'
    },
    {
      id: '3',
      title: 'Advanced Claude Prompting Techniques',
      authorName: 'Sarah Chen',
      submittedAt: '1 day ago',
      wordCount: 2158,
      aiScore: 87,
      status: 'approved',
      promptExamples: 12
    }
  ]

  const reviewStats = {
    approvedToday: 0,
    needRevision: 1,
    pendingReview: 1,
    avgAiScore: 87
  }

  const getStatusColor = (status: GuideReview['status']) => {
    switch (status) {
      case 'approved':
        return 'green'
      case 'needs-revision':
        return 'red'
      case 'pending':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  const getStatusIcon = (status: GuideReview['status']) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'needs-revision':
        return XCircle
      case 'pending':
        return Clock
      default:
        return AlertCircle
    }
  }

  const getStatusLabel = (status: GuideReview['status']) => {
    switch (status) {
      case 'approved':
        return 'APPROVED'
      case 'needs-revision':
        return 'NEEDS REVISION'
      case 'pending':
        return 'PENDING'
      default:
        return 'UNKNOWN'
    }
  }

  return (
    <div className="py-6 space-y-8">
      {/* Spacing to match sub-tabs */}
      <div className="mb-8"></div>
      
      {/* Guide Review Queue */}
      <div className="vybe-card overflow-hidden">
        {/* Header */}
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Guide Review Queue</h3>
          <p className="text-sm text-vybe-gray-400 mt-1">
            Automated quality assessment for submitted guides
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queue Items */}
          <div className="lg:col-span-2 space-y-3">
            {mockReviews.map((review) => {
              const color = getStatusColor(review.status)
              const Icon = getStatusIcon(review.status)
              const label = getStatusLabel(review.status)

              return (
                <div
                  key={review.id}
                  className={cn(
                    'border rounded-lg p-4',
                    color === 'red' && 'border-red-500/30 bg-red-900/10',
                    color === 'yellow' && 'border-yellow-500/30 bg-yellow-900/10',
                    color === 'green' && 'border-green-500/30 bg-green-900/10'
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{review.title}</h4>
                      <p className="text-xs text-vybe-gray-400">
                        Submitted by {review.authorName} • {review.submittedAt}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'ml-4 px-2 py-1 text-xs font-medium rounded flex items-center gap-1',
                        color === 'red' && 'bg-red-500/20 text-red-400',
                        color === 'yellow' && 'bg-yellow-500/20 text-yellow-400',
                        color === 'green' && 'bg-green-500/20 text-green-400'
                      )}
                    >
                      <div className="w-2 h-2 bg-current rounded-full" />
                      {label}
                    </span>
                  </div>

                  {review.status === 'needs-revision' && (
                    <>
                      <div className={cn('text-xs mb-2', `text-${color}-400`)}>
                        AI Score: {review.aiScore}/100 • {review.wordCount} words
                      </div>
                      <div className="text-xs text-vybe-gray-400 mb-3">
                        Issues: {review.issues?.join(', ')}
                      </div>
                      <div className="flex justify-end">
                        <button
                          className={cn(
                            'w-20 px-4 py-2 text-sm bg-transparent border rounded transition-colors',
                            `border-${color}-400/40 text-${color}-400 hover:bg-${color}-400/10`
                          )}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}

                  {review.status === 'pending' && (
                    <>
                      <div className={cn('text-xs mb-3', `text-${color}-400`)}>
                        {review.wordCount} words • Awaiting review
                      </div>
                      <div className="flex justify-end">
                        <button
                          className={cn(
                            'w-20 px-4 py-2 text-sm bg-transparent border rounded transition-colors',
                            `border-${color}-500/40 text-${color}-500 hover:bg-${color}-500/10`
                          )}
                        >
                          Review
                        </button>
                      </div>
                    </>
                  )}

                  {review.status === 'approved' && (
                    <>
                      <div className={cn('text-xs mb-3', `text-${color}-400`)}>
                        AI Score: {review.aiScore}/100 • {review.wordCount} words • {review.promptExamples} prompt examples
                      </div>
                      <div className="flex justify-end">
                        <button
                          className={cn(
                            'w-20 px-4 py-2 text-sm bg-transparent border rounded transition-colors',
                            `border-${color}-500/40 text-${color}-500 hover:bg-${color}-500/10`
                          )}
                        >
                          Publish
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="space-y-6">
            {/* Review Statistics */}
            <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
              <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
                <h3 className="text-base font-semibold text-white">Review Statistics</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-vybe-gray-300">Approved Today</span>
                      <span className="text-green-500 font-semibold">{reviewStats.approvedToday}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-vybe-gray-300">Need Revision</span>
                      <span className="text-red-400 font-semibold">{reviewStats.needRevision}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-vybe-gray-300">Pending Review</span>
                      <span className="text-yellow-500 font-semibold">{reviewStats.pendingReview}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-vybe-purple rounded-full"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-vybe-gray-300">Avg AI Score</span>
                      <span className="text-vybe-purple font-semibold">{reviewStats.avgAiScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Criteria Sidebar */}
            <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
              <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
                <h3 className="text-base font-semibold text-white">Review Criteria</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3 text-sm text-vybe-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="text-vybe-purple">•</span> Minimum 500 words
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-vybe-purple">•</span> Effective prompts/content engineering
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-vybe-purple">•</span> Clear structure (intro, body, conclusion)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-vybe-purple">•</span> AI score ≥70/100
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-vybe-purple">•</span> Practical implementation focus
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}