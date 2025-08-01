'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { User, Star, BookOpen, Smartphone, Clock, Eye, Calendar, ChevronLeft, ChevronRight, ExternalLink, Edit, Settings, Award, FileText, TrendingUp, Share2 } from 'lucide-react'

interface Guide {
  id: string
  title: string
  status: 'saved' | 'in-progress' | 'completed'
  progress?: number
  rating?: number
  dateAdded: string
  category: string
  thumbnail: string
  price?: number
}

interface App {
  id: string
  name: string
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected'
  category: string
  dateSubmitted: string
  thumbnail: string
  description: string
}

interface SubmittedGuide {
  id: string
  title: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  sales: number
  revenue: number
  dateSubmitted: string
  views: number
  rating: number
  category: string
}

export default function DashboardProfilePage() {
  const { user } = useUser()
  
  // Pagination states
  const [guidesPage, setGuidesPage] = useState(1)
  const [appsPage, setAppsPage] = useState(1)
  const [submittedGuidesPage, setSubmittedGuidesPage] = useState(1)
  const [activeTab, setActiveTab] = useState('all')
  
  const itemsPerPage = 12
  
  // Mock data for profile
  const userProfile = {
    name: 'Alex Developer',
    username: 'alexdev',
    title: 'Senior Full-Stack Developer',
    industry: 'AI / ML',
    bio: 'With over 8 years of experience in full-stack development, I specialize in building scalable web applications and mentoring developers. I\'ve worked with startups and established companies to create robust, modern applications using the latest AI technologies and best practices.',
    skills: ['React & Next.js', 'Node.js', 'TypeScript', 'System Design', 'AI Integration', 'MongoDB'],
    stats: {
      guidesCompleted: 23,
      appsSubmitted: 7,
      totalRevenue: 2847,
      communityRank: 'Gold'
    },
    social: {
      github: 'https://github.com/alexdev',
      linkedin: 'https://linkedin.com/in/alexdev',
      youtube: 'https://youtube.com/@alexdev'
    }
  }

  // Mock data for guides - expanded to show pagination
  const baseGuides: Guide[] = [
    {
      id: '1',
      title: 'Complete React & TypeScript Mastery',
      status: 'completed',
      progress: 100,
      rating: 5,
      dateAdded: '2024-01-15',
      category: 'Frontend',
      thumbnail: '/api/placeholder/200/120',
      price: 67
    },
    {
      id: '2', 
      title: 'Advanced Node.js Backend Development',
      status: 'in-progress',
      progress: 65,
      dateAdded: '2024-01-20',
      category: 'Backend',
      thumbnail: '/api/placeholder/200/120',
      price: 89
    },
    {
      id: '3',
      title: 'AI Integration for Modern Web Apps',
      status: 'saved',
      dateAdded: '2024-01-25',
      category: 'AI/ML',
      thumbnail: '/api/placeholder/200/120',
      price: 125
    },
    {
      id: '4',
      title: 'System Design Interview Prep',
      status: 'completed',
      progress: 100,
      rating: 4,
      dateAdded: '2024-01-10',
      category: 'System Design',
      thumbnail: '/api/placeholder/200/120',
      price: 99
    },
    {
      id: '5',
      title: 'MongoDB Performance Optimization',
      status: 'in-progress',
      progress: 30,
      dateAdded: '2024-01-28',
      category: 'Database',
      thumbnail: '/api/placeholder/200/120',
      price: 77
    },
    {
      id: '6',
      title: 'Docker & Kubernetes Fundamentals',
      status: 'saved',
      dateAdded: '2024-01-30',
      category: 'DevOps',
      thumbnail: '/api/placeholder/200/120',
      price: 88
    }
  ]

  // Generate more guides for pagination demo
  const myGuides: Guide[] = [...baseGuides]
  const categories = ['Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps', 'Mobile', 'Security']
  const statuses: Guide['status'][] = ['saved', 'in-progress', 'completed']
  
  for (let i = 7; i <= 100; i++) {
    myGuides.push({
      id: i.toString(),
      title: `Guide ${i}: ${categories[i % categories.length]} Advanced Concepts`,
      status: statuses[i % statuses.length],
      progress: statuses[i % statuses.length] === 'completed' ? 100 : 
               statuses[i % statuses.length] === 'in-progress' ? Math.floor(Math.random() * 90) + 10 : undefined,
      rating: statuses[i % statuses.length] === 'completed' ? Math.floor(Math.random() * 2) + 3 : undefined,
      dateAdded: new Date(2024, 0, i % 30 + 1).toISOString().split('T')[0],
      category: categories[i % categories.length],
      thumbnail: '/api/placeholder/200/120',
      price: Math.floor(Math.random() * 100) + 50
    })
  }

  // Mock data for submitted apps - expanded for pagination
  const baseApps: App[] = [
    {
      id: '1',
      name: 'AI Code Assistant',
      status: 'approved',
      category: 'Developer Tools',
      dateSubmitted: '2024-01-20',
      thumbnail: '/api/placeholder/200/120',
      description: 'An intelligent code completion and review assistant powered by GPT-4'
    },
    {
      id: '2',
      name: 'Task Priority Matrix',
      status: 'pending',
      category: 'Productivity',
      dateSubmitted: '2024-01-25',
      thumbnail: '/api/placeholder/200/120',
      description: 'Smart task management using Eisenhower Matrix principles'
    },
    {
      id: '3',
      name: 'Real-time Chat Analytics',
      status: 'approved',
      category: 'Analytics',
      dateSubmitted: '2024-01-15',
      thumbnail: '/api/placeholder/200/120',
      description: 'Advanced chat metrics and sentiment analysis dashboard'
    },
    {
      id: '4',
      name: 'API Rate Limiter',
      status: 'rejected',
      category: 'Developer Tools',
      dateSubmitted: '2024-01-10',
      thumbnail: '/api/placeholder/200/120',
      description: 'Intelligent API rate limiting with dynamic thresholds'
    }
  ]

  // Generate more apps for pagination
  const myApps: App[] = [...baseApps]
  const appCategories = ['Developer Tools', 'Productivity', 'Analytics', 'Communication', 'Finance', 'Education']
  const appStatuses: App['status'][] = ['draft', 'submitted', 'pending', 'approved', 'rejected']
  
  for (let i = 5; i <= 50; i++) {
    myApps.push({
      id: i.toString(),
      name: `App ${i}: ${appCategories[i % appCategories.length]} Solution`,
      status: appStatuses[i % appStatuses.length],
      category: appCategories[i % appCategories.length],
      dateSubmitted: new Date(2024, 0, (i % 28) + 1).toISOString().split('T')[0],
      thumbnail: '/api/placeholder/200/120',
      description: `Advanced ${appCategories[i % appCategories.length].toLowerCase()} application with modern features`
    })
  }

  // Mock data for submitted guides - expanded for pagination
  const baseSubmittedGuides: SubmittedGuide[] = [
    {
      id: '1',
      title: 'Master Claude AI Integration',
      status: 'approved',
      sales: 156,
      revenue: 1247,
      dateSubmitted: '2024-01-10',
      views: 2341,
      rating: 4.8,
      category: 'AI/ML'
    },
    {
      id: '2',
      title: 'Next.js 14 App Router Deep Dive',
      status: 'approved',
      sales: 89,
      revenue: 712,
      dateSubmitted: '2024-01-15',
      views: 1567,
      rating: 4.6,
      category: 'Frontend'
    },
    {
      id: '3',
      title: 'TypeScript Advanced Patterns',
      status: 'pending',
      sales: 0,
      revenue: 0,
      dateSubmitted: '2024-01-25',
      views: 45,
      rating: 0,
      category: 'Programming'
    },
    {
      id: '4',
      title: 'Microservices with Node.js',
      status: 'approved',
      sales: 67,
      revenue: 534,
      dateSubmitted: '2024-01-08',
      views: 1203,
      rating: 4.4,
      category: 'Backend'
    }
  ]

  // Generate more published guides for pagination
  const mySubmittedGuides: SubmittedGuide[] = [...baseSubmittedGuides]
  const publishedCategories = ['AI/ML', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'Security']
  const publishedStatuses: SubmittedGuide['status'][] = ['approved', 'pending', 'rejected']
  
  for (let i = 5; i <= 35; i++) {
    const status = publishedStatuses[i % 3]
    const isApproved = status === 'approved'
    mySubmittedGuides.push({
      id: i.toString(),
      title: `Published Guide ${i}: ${publishedCategories[i % publishedCategories.length]} Best Practices`,
      status,
      sales: isApproved ? Math.floor(Math.random() * 200) : 0,
      revenue: isApproved ? Math.floor(Math.random() * 2000) : 0,
      dateSubmitted: new Date(2024, 0, (i % 28) + 1).toISOString().split('T')[0],
      views: isApproved ? Math.floor(Math.random() * 3000) + 100 : Math.floor(Math.random() * 100),
      rating: isApproved ? Math.round((Math.random() * 2 + 3) * 10) / 10 : 0,
      category: publishedCategories[i % publishedCategories.length]
    })
  }

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-500/20 text-green-400'
      case 'in-progress':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'saved':
      case 'draft':
        return 'bg-blue-500/20 text-blue-400'
      case 'rejected':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Gold':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'Silver':
        return 'bg-gray-400/20 text-gray-400'
      case 'Bronze':
        return 'bg-orange-500/20 text-orange-400'
      default:
        return 'bg-purple-500/20 text-purple-400'
    }
  }

  // Pagination helpers
  const paginateItems = (items: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }

  const getTotalPages = (itemCount: number) => Math.ceil(itemCount / itemsPerPage)

  // Get filtered data based on active tab
  const getFilteredGuides = () => {
    switch (activeTab) {
      case 'saved':
        return myGuides.filter(g => g.status === 'saved')
      case 'in-progress':
        return myGuides.filter(g => g.status === 'in-progress')
      case 'completed':
        return myGuides.filter(g => g.status === 'completed')
      case 'all':
      default:
        return myGuides
    }
  }

  const filteredGuides = getFilteredGuides()
  const paginatedGuides = paginateItems(filteredGuides, guidesPage)
  const paginatedApps = paginateItems(myApps, appsPage)
  const paginatedSubmittedGuides = paginateItems(mySubmittedGuides, submittedGuidesPage)

  return (
    <div className="py-6 space-y-8">
      {/* Profile Header */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div className="p-6 bg-vybe-gray-900">
          {/* Top Row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                AD
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{userProfile.name}</h1>
                  <span className="px-2 py-0.5 bg-vybe-purple/20 text-vybe-purple text-xs font-medium rounded-full uppercase">PRO</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </span>
                  <span className="text-vybe-gray-400 text-sm">• 147 sessions</span>
                </div>
                <div className="text-vybe-gray-400 text-sm mb-2">
                  @{userProfile.username} • {userProfile.title} • {userProfile.industry}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-vybe-purple" />
                    <span className="text-vybe-gray-300"><span className="font-semibold text-white">{userProfile.stats.guidesCompleted}</span> guides</span>
                  </div>
                  <span className="text-vybe-gray-600">•</span>
                  <div className="flex items-center gap-2 text-sm">
                    <Smartphone className="w-4 h-4 text-vybe-orange" />
                    <span className="text-vybe-gray-300"><span className="font-semibold text-white">{userProfile.stats.appsSubmitted}</span> apps</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="/dashboard/settings" className="btn btn-secondary flex items-center gap-2 text-sm">
                Edit Profile
              </a>
              <button className="btn btn-secondary flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
            </div>
          </div>

          {/* About Me */}
          <div className="mb-8">
            <p className="text-vybe-gray-300 leading-relaxed">
              {userProfile.bio}
            </p>
          </div>

          {/* Core Expertise */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-vybe-purple/20 border border-vybe-purple/30 text-vybe-purple text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex gap-4">
              <a href={userProfile.social.github} target="_blank" rel="noopener noreferrer" className="text-vybe-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={userProfile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-vybe-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={userProfile.social.youtube} target="_blank" rel="noopener noreferrer" className="text-vybe-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <span className="text-vybe-gray-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.11-9.91-5.02-.41.71-.65 1.53-.65 2.4 0 1.67.85 3.14 2.14 4.01-.79-.02-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.92 2.39 3.31 4.5 3.35-1.65 1.29-3.73 2.06-5.99 2.06-.39 0-.77-.02-1.15-.07 2.13 1.37 4.66 2.17 7.39 2.17 8.87 0 13.72-7.35 13.72-13.72 0-.21 0-.42-.02-.62.94-.68 1.76-1.53 2.41-2.5z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* My Learning Section */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.5), rgba(217, 70, 160, 0.5), rgba(233, 107, 58, 0.5))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              My Learning
            </h3>
            <div className="flex gap-2">
              {['all', 'saved', 'in-progress', 'completed'].map((tab) => {
                const count = tab === 'all' 
                  ? myGuides.length
                  : tab === 'saved'
                  ? myGuides.filter(g => g.status === 'saved').length
                  : tab === 'in-progress'
                  ? myGuides.filter(g => g.status === 'in-progress').length
                  : myGuides.filter(g => g.status === 'completed').length
                
                return (
                  <button
                    key={tab}
                    onClick={() => {setActiveTab(tab); setGuidesPage(1)}}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-black/40 text-white border border-white/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {paginatedGuides.map((guide) => (
              <div key={guide.id} className="p-3 bg-vybe-gray-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{guide.title}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(guide.status)}`}>
                    {guide.status.charAt(0).toUpperCase() + guide.status.slice(1).replace('-', ' ')}
                  </span>
                  <span className="text-xs text-vybe-gray-400">${guide.price}</span>
                </div>
                {guide.progress !== undefined && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-vybe-gray-400">Progress</span>
                      <span className="text-xs text-vybe-gray-400">{guide.progress}%</span>
                    </div>
                    <div className="w-full bg-vybe-gray-700 rounded-full h-1">
                      <div className="bg-vybe-purple h-1 rounded-full" style={{width: `${guide.progress}%`}}></div>
                    </div>
                  </div>
                )}
                {guide.rating && (
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i < guide.rating! ? 'text-yellow-400 fill-current' : 'text-vybe-gray-600'}`} />
                    ))}
                    <span className="text-xs text-vybe-gray-400 ml-1">{guide.rating}/5</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-vybe-gray-400">
                  <span>{guide.category}</span>
                  <span>{new Date(guide.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination for Guides */}
          {getTotalPages(filteredGuides.length) > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setGuidesPage(Math.max(1, guidesPage - 1))}
                disabled={guidesPage === 1}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(7, getTotalPages(filteredGuides.length)) }, (_, i) => {
                  let pageNum
                  const totalPages = getTotalPages(filteredGuides.length)
                  
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (guidesPage <= 4) {
                    pageNum = i + 1
                  } else if (guidesPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = guidesPage - 3 + i
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setGuidesPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        pageNum === guidesPage
                          ? 'bg-vybe-purple text-white'
                          : 'text-vybe-gray-400 hover:text-white hover:bg-vybe-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => setGuidesPage(Math.min(getTotalPages(filteredGuides.length), guidesPage + 1))}
                disabled={guidesPage === getTotalPages(filteredGuides.length)}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* My Published Guides Section */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(147, 51, 234, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            My Published Guides
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {paginatedSubmittedGuides.map((guide) => (
              <div key={guide.id} className="p-3 bg-vybe-gray-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{guide.title}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(guide.status)}`}>
                    {guide.status.charAt(0).toUpperCase() + guide.status.slice(1)}
                  </span>
                  {guide.sales > 0 && (
                    <span className="text-xs text-green-400 font-medium">{guide.sales} sales</span>
                  )}
                </div>
                {guide.rating > 0 && (
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i < guide.rating! ? 'text-yellow-400 fill-current' : 'text-vybe-gray-600'}`} />
                    ))}
                    <span className="text-xs text-vybe-gray-400 ml-1">{guide.rating}/5</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-vybe-gray-400">
                  <span>{guide.category}</span>
                  {guide.revenue > 0 && (
                    <span className="text-green-400">${guide.revenue}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-vybe-gray-400 mt-1">
                  <span>{guide.views} views</span>
                  <span>{new Date(guide.dateSubmitted).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination for Published Guides */}
          {getTotalPages(mySubmittedGuides.length) > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setSubmittedGuidesPage(Math.max(1, submittedGuidesPage - 1))}
                disabled={submittedGuidesPage === 1}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(7, getTotalPages(mySubmittedGuides.length)) }, (_, i) => {
                  let pageNum
                  const totalPages = getTotalPages(mySubmittedGuides.length)
                  
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (submittedGuidesPage <= 4) {
                    pageNum = i + 1
                  } else if (submittedGuidesPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = submittedGuidesPage - 3 + i
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setSubmittedGuidesPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        pageNum === submittedGuidesPage
                          ? 'bg-vybe-purple text-white'
                          : 'text-vybe-gray-400 hover:text-white hover:bg-vybe-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => setSubmittedGuidesPage(Math.min(getTotalPages(mySubmittedGuides.length), submittedGuidesPage + 1))}
                disabled={submittedGuidesPage === getTotalPages(mySubmittedGuides.length)}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* My Submitted Apps Section */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            My Submitted Apps
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {paginatedApps.map((app) => (
              <div key={app.id} className="p-3 bg-vybe-gray-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{app.name}</h4>
                <p className="text-xs text-vybe-gray-300 mb-2 line-clamp-2">{app.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-vybe-gray-400">
                  <span>{app.category}</span>
                  <span>{new Date(app.dateSubmitted).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination for Apps */}
          {getTotalPages(myApps.length) > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setAppsPage(Math.max(1, appsPage - 1))}
                disabled={appsPage === 1}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(7, getTotalPages(myApps.length)) }, (_, i) => {
                  let pageNum
                  const totalPages = getTotalPages(myApps.length)
                  
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (appsPage <= 4) {
                    pageNum = i + 1
                  } else if (appsPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = appsPage - 3 + i
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setAppsPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        pageNum === appsPage
                          ? 'bg-vybe-purple text-white'
                          : 'text-vybe-gray-400 hover:text-white hover:bg-vybe-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => setAppsPage(Math.min(getTotalPages(myApps.length), appsPage + 1))}
                disabled={appsPage === getTotalPages(myApps.length)}
                className="p-2 text-vybe-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}