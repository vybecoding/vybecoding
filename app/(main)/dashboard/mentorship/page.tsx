'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Video, Calendar, Clock, Users, TrendingUp, Star, ChevronRight } from 'lucide-react'

export default function MentorshipPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  // Mock data - would come from Convex in real implementation
  const stats = {
    totalSessions: 47,
    thisMonth: 12,
    averageRating: 4.9,
    earnings: 2340,
    upcomingCount: 3,
    completedCount: 44
  }

  const upcomingSessions = [
    {
      id: '1',
      mentee: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/40/40',
        level: 'Intermediate'
      },
      date: '2024-01-28',
      time: '2:00 PM EST',
      duration: 60,
      topic: 'React Performance Optimization',
      meetingLink: 'https://cal.com/meeting/abc123'
    },
    {
      id: '2',
      mentee: {
        name: 'Marcus Johnson',
        avatar: '/api/placeholder/40/40',
        level: 'Beginner'
      },
      date: '2024-01-30',
      time: '10:00 AM EST',
      duration: 30,
      topic: 'Getting Started with TypeScript',
      meetingLink: 'https://cal.com/meeting/def456'
    },
    {
      id: '3',
      mentee: {
        name: 'Emily Rodriguez',
        avatar: '/api/placeholder/40/40',
        level: 'Advanced'
      },
      date: '2024-02-02',
      time: '3:30 PM EST',
      duration: 45,
      topic: 'System Design Interview Prep',
      meetingLink: 'https://cal.com/meeting/ghi789'
    }
  ]

  const sessionHistory = [
    {
      id: '4',
      mentee: {
        name: 'Alex Kim',
        avatar: '/api/placeholder/40/40'
      },
      date: '2024-01-25',
      duration: 60,
      topic: 'Advanced Next.js Patterns',
      rating: 5,
      earnings: 60
    },
    {
      id: '5',
      mentee: {
        name: 'Jordan Lee',
        avatar: '/api/placeholder/40/40'
      },
      date: '2024-01-23',
      duration: 30,
      topic: 'Career Guidance',
      rating: 4.5,
      earnings: 30
    },
    {
      id: '6',
      mentee: {
        name: 'Taylor Swift',
        avatar: '/api/placeholder/40/40'
      },
      date: '2024-01-20',
      duration: 45,
      topic: 'Code Review Session',
      rating: 5,
      earnings: 45
    }
  ]

  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-vybe-purple" />
            <span className="text-2xl font-semibold text-white">{stats.totalSessions}</span>
          </div>
          <p className="text-sm text-gray-400">Total Sessions</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-vybe-pink" />
            <span className="text-2xl font-semibold text-white">{stats.thisMonth}</span>
          </div>
          <p className="text-sm text-gray-400">This Month</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-semibold text-white">{stats.averageRating}</span>
          </div>
          <p className="text-sm text-gray-400">Average Rating</p>
        </div>
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-semibold text-green-400">${stats.earnings}</span>
          </div>
          <p className="text-sm text-gray-400">Total Earnings</p>
        </div>
      </div>

      {/* Session Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            activeTab === 'upcoming'
              ? "bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/40"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
          )}
        >
          Upcoming Sessions
          <span className="ml-2 text-xs opacity-60">({stats.upcomingCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            activeTab === 'history'
              ? "bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/40"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
          )}
        >
          Session History
          <span className="ml-2 text-xs opacity-60">({stats.completedCount})</span>
        </button>
      </div>

      {/* Upcoming Sessions */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingSessions.length === 0 ? (
            <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No upcoming sessions scheduled</p>
              <a
                href="/dashboard/settings#availability"
                className="inline-block mt-4 px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium"
              >
                Update Availability
              </a>
            </div>
          ) : (
            <>
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={session.mentee.avatar}
                        alt={session.mentee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{session.mentee.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{session.mentee.level} Developer</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar className="w-4 h-4 text-vybe-purple" />
                            <span>{new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4 text-vybe-pink" />
                            <span>{session.time} • {session.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Video className="w-4 h-4 text-vybe-orange" />
                            <span>{session.topic}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-white mb-2">${session.duration}</p>
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2",
                          "bg-gradient-to-r from-vybe-purple to-vybe-pink",
                          "text-white text-sm font-semibold rounded-lg",
                          "hover:shadow-lg hover:shadow-vybe-purple/25",
                          "transition-all transform hover:scale-105"
                        )}
                      >
                        Join Meeting
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Calendar Integration Reminder */}
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-sm text-yellow-400">
                  <span className="font-medium">Pro tip:</span> Add these sessions to your calendar to get reminders.
                  Sessions are automatically scheduled through your Cal.com integration.
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Session History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {sessionHistory.map((session) => (
            <div
              key={session.id}
              className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={session.mentee.avatar}
                    alt={session.mentee.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{session.mentee.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{session.topic}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{session.duration} minutes</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(session.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < session.rating
                                ? "text-yellow-400 fill-yellow-400/50"
                                : "text-gray-600"
                            )}
                          />
                        ))}
                        <span className="ml-1">{session.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-400">+${session.earnings}</p>
                  <button className="mt-2 text-sm text-vybe-purple hover:text-vybe-pink transition-colors">
                    View Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Load More */}
          <div className="text-center pt-4">
            <button className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium">
              Load More Sessions
            </button>
          </div>
        </div>
      )}

      {/* Mentorship Settings CTA */}
      <div className="bg-gradient-to-r from-vybe-purple/20 to-vybe-pink/20 rounded-xl p-8 border border-vybe-purple/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Optimize Your Mentorship
            </h3>
            <p className="text-gray-300 mb-4">
              Update your availability, rates, and expertise areas to attract more mentees
            </p>
            <div className="flex gap-4">
              <a
                href="/dashboard/settings#mentorship"
                className="px-4 py-2 bg-vybe-purple text-white rounded-lg hover:bg-vybe-purple/80 transition-all text-sm font-medium"
              >
                Mentorship Settings
              </a>
              <a
                href="/profile/${user?.username || 'me'}"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium"
              >
                View Public Profile
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">🎯</div>
          </div>
        </div>
      </div>
    </div>
  )
}