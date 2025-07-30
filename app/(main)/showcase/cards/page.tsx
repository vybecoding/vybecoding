'use client'

import React from 'react'
import { AppCard, GuideCard, MemberCard, CardGrid } from '@/components/ui/card/index'

export default function CardsShowcasePage() {
  // Sample data
  const sampleApp = {
    id: '1',
    name: 'AI Code Assistant',
    description: 'An intelligent coding companion that helps you write better code faster with AI-powered suggestions and explanations.',
    category: 'Developer Tools',
    developer: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40'
    },
    techStack: ['TypeScript', 'React', 'OpenAI', 'Node.js'],
    platforms: ['Web', 'Desktop'],
    stats: {
      views: 12543,
      downloads: 3421,
      rating: 4.8
    },
    pricing: 'freemium' as const,
    featured: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    liveUrl: 'https://example.com'
  }

  const sampleGuide = {
    id: '1',
    title: 'Building Production-Ready React Apps',
    slug: 'building-production-ready-react-apps',
    author: {
      name: 'Alex Kim',
      avatar: '/api/placeholder/40/40',
      isTopCreator: true
    },
    description: 'Learn the best practices and patterns for building scalable, maintainable React applications that are ready for production.',
    tags: ['React', 'TypeScript', 'Testing', 'Performance'],
    difficulty: 'intermediate' as const,
    readTime: 15,
    views: 5234,
    likes: 342,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isPro: true,
    verificationStatus: 'verified' as const,
    lastVerified: '2h'
  }

  const sampleMember = {
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    avatar: '/api/placeholder/80/80',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate about building amazing web experiences. 10+ years of experience in React, Node.js, and cloud architecture.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
    rating: 4.9,
    reviews: 47,
    hourlyRate: 150,
    available: true,
    verified: true,
    onlineStatus: 'online' as const
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">
            <span className="gradient-text">Card Components</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Pixel-perfect card components matching the demo design
          </p>
        </div>

        {/* App Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">App Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AppCard {...sampleApp} />
            <AppCard {...sampleApp} featured={false} pricing="free" />
            <AppCard {...sampleApp} featured={false} pricing="paid" stats={{ views: 823, downloads: 125, rating: 4.2 }} />
          </div>
        </section>

        {/* Guide Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Guide Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GuideCard {...sampleGuide} />
            <GuideCard 
              {...sampleGuide} 
              author={{ name: 'Jane Smith', isTopCreator: false }}
              difficulty="beginner"
              isPro={false}
              verificationStatus="needs_verification"
            />
            <GuideCard 
              {...sampleGuide} 
              author={{ name: 'Mike Johnson', isTopCreator: false }}
              difficulty="advanced"
              verificationStatus="outdated"
              tags={['AI', 'Machine Learning']}
            />
          </div>
        </section>

        {/* Member Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Member Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MemberCard {...sampleMember} />
            <MemberCard 
              {...sampleMember} 
              name="Jane Smith"
              username="janesmith"
              onlineStatus="away"
              verified={false}
              hourlyRate={100}
            />
            <MemberCard 
              {...sampleMember} 
              name="Mike Johnson"
              username="mikej"
              onlineStatus="offline"
              available={false}
              avatar={undefined}
            />
          </div>
        </section>

        {/* Card States Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Card States & Variations</h2>
          
          <div className="space-y-8">
            {/* Shadow demonstration */}
            <div>
              <h3 className="text-lg font-medium text-gray-300 mb-4">Shadow Effects (20px blur)</h3>
              <div className="p-8 bg-gray-900 rounded-lg">
                <div className="inline-block p-6 bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg"
                     style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}>
                  <p className="text-white">Default shadow: 0 10px 20px rgba(0, 0, 0, 0.5)</p>
                </div>
                <div className="inline-block ml-4 p-6 bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg hover:shadow-lg"
                     style={{ boxShadow: '0 15px 30px rgba(0, 0, 0, 0.7)' }}>
                  <p className="text-white">Hover shadow: 0 15px 30px rgba(0, 0, 0, 0.7)</p>
                </div>
              </div>
            </div>

            {/* Badge positioning */}
            <div>
              <h3 className="text-lg font-medium text-gray-300 mb-4">Badge Positioning</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative p-8 bg-gray-900 rounded-lg">
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                  <p className="text-gray-400">Featured badge offset -8px</p>
                </div>
                <div className="relative p-8 bg-gray-900 rounded-lg">
                  <div className="absolute top-0 left-0 px-2 py-1.5 text-white text-xs font-semibold uppercase tracking-wide rounded-br-lg"
                       style={{ background: 'rgba(138, 43, 226, 0.5625)' }}>
                    GUIDE
                  </div>
                  <p className="text-gray-400 mt-6">Type label in corner</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}