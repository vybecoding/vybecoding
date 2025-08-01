'use client'

import React from 'react'
import { Code, Users, Zap, Heart, Target, Award, Globe, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Rivera',
      role: 'Founder & CEO',
      bio: 'Former Tech Lead at Google, passionate about democratizing AI education',
      avatar: 'AR'
    },
    {
      name: 'Sam Chen',
      role: 'CTO',
      bio: 'AI researcher with 10+ years in machine learning and developer tools',
      avatar: 'SC'
    },
    {
      name: 'Maya Patel',
      role: 'Head of Content',
      bio: 'Technical writer and educator, previously at Microsoft and Stripe',
      avatar: 'MP'
    }
  ]

  const values = [
    {
      icon: Code,
      title: 'Code First',
      description: 'Every guide includes real, tested code you can use immediately'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by developers, for developers, with community feedback at our core'
    },
    {
      icon: Zap,
      title: 'Practical Focus',
      description: 'Skip the theory - learn by building real projects with AI'
    },
    {
      icon: Heart,
      title: 'Quality Obsessed',
      description: 'Every piece of content is reviewed, tested, and continuously updated'
    }
  ]

  const stats = [
    { label: 'Developers Helped', value: '50K+' },
    { label: 'AI Guides Published', value: '500+' },
    { label: 'Apps in Marketplace', value: '200+' },
    { label: 'Community Members', value: '15K+' }
  ]

  return (
    <div className="py-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center mx-auto mb-6">
          <Code className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About Vybe Coding
        </h1>
        <p className="text-xl text-vybe-gray-300 max-w-3xl mx-auto leading-relaxed">
          We're on a mission to make AI development accessible to every developer. From beginners learning their first prompt to experts building the next breakthrough application.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-vybe-gray-300 text-lg leading-relaxed">
                The AI revolution is happening now, but too many developers are left behind due to scattered resources, theoretical content, and lack of practical guidance.
              </p>
              <p className="text-vybe-gray-300 text-lg leading-relaxed">
                Vybe Coding bridges that gap by providing hands-on, practical AI development education that you can apply immediately to real projects.
              </p>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-vybe-purple/10 to-vybe-pink/10 rounded-lg border border-vybe-purple/30">
                <Target className="w-6 h-6 text-vybe-purple" />
                <p className="text-white font-medium">
                  Every developer should have the tools and knowledge to build with AI
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-vybe-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-vybe-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Our Values</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-vybe-gray-800/30 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-vybe-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Our Story</h2>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-vybe-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Lightbulb className="w-4 h-4 text-vybe-purple" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">The Problem We Saw</h3>
                <p className="text-vybe-gray-300 leading-relaxed">
                  In 2023, as AI tools exploded in popularity, we noticed a huge gap: amazing AI capabilities existed, but developers struggled to integrate them effectively into real applications. Most resources were either too academic or too shallow.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-vybe-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="w-4 h-4 text-vybe-pink" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Our Solution</h3>
                <p className="text-vybe-gray-300 leading-relaxed">
                  We created Vybe Coding as a practical learning platform where developers could find battle-tested guides, working code examples, and a community of practitioners. No fluff, no theory-only content—just what works in production.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-vybe-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="w-4 h-4 text-vybe-orange" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Today & Tomorrow</h3>
                <p className="text-vybe-gray-300 leading-relaxed">
                  Today, thousands of developers learn AI development through our platform. Tomorrow, we're building the definitive resource for practical AI education, complete with interactive tutorials, mentorship programs, and industry partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Meet the Team</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-vybe-purple font-medium mb-3">{member.role}</p>
                <p className="text-vybe-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="text-center bg-gradient-to-r from-vybe-purple/10 to-vybe-pink/10 rounded-xl p-8 border border-vybe-purple/30">
        <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="text-vybe-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you're just starting with AI or you're a seasoned expert, there's a place for you in the Vybe Coding community. Let's build the future of development together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary-fuchsia">
            Join Discord Community
          </button>
          <button className="btn btn-secondary">
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  )
}