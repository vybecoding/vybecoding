"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  CheckCircle,
  Eye,
  Bookmark,
  FileText,
  Download,
  Star,
  BookOpen,
  Lightbulb,
  Code,
  Server,
  Clock,
  Users
} from "lucide-react";
import { PrimaryCard, SecondaryCard } from "@/components/ui/card/CardVariants";

export default function TestStaticGuideUnlockedPage() {
  // Static test data
  const guide = {
    title: "🧪 TEST GUIDE - Static Demo Page",
    slug: "test-static-guide",
    excerpt: "⚠️ This is a static test page for development. Use this to test guide pages without authentication.",
    category: "development",
    tags: ["test", "static", "demo"],
    readingTime: 5,
    author: {
      displayName: "Test Author",
      username: "testuser",
      bio: "This is a test author bio for the static demo."
    }
  };

  return (
    <div className="page-container nebula-background">
      {/* Floating Particles Container */}
      <div className="floating-particles">
        {/* Rising particles */}
        <div className="particle" style={{ "--duration": "25s", "--delay": "0s", "--position": "10%" } as React.CSSProperties}></div>
        <div className="particle" style={{ "--duration": "30s", "--delay": "2s", "--position": "30%" } as React.CSSProperties}></div>
        <div className="particle" style={{ "--duration": "35s", "--delay": "4s", "--position": "50%" } as React.CSSProperties}></div>
        <div className="particle" style={{ "--duration": "28s", "--delay": "1s", "--position": "70%" } as React.CSSProperties}></div>
        <div className="particle" style={{ "--duration": "32s", "--delay": "3s", "--position": "90%" } as React.CSSProperties}></div>
        
        {/* Neural network nodes */}
        <div className="neural-node" style={{ top: "20%", left: "15%" }}></div>
        <div className="neural-node" style={{ top: "60%", left: "80%" }}></div>
        <div className="neural-node" style={{ top: "40%", left: "45%" }}></div>
      </div>
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Button */}
          <Link href="/guides/test-static">
            <Button variant="ghost" className="mb-6 -ml-2 text-vybe-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test Page
            </Button>
          </Link>
          
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Guide Header */}
              <PrimaryCard headerVariant="gradient" title="🧪 TEST GUIDE - Static Demo Page" className="overflow-hidden mb-6" noHover>
                {/* Brief Description */}
                <p className="text-vybe-gray-300 mb-6">
                  {guide.excerpt}
                </p>
                
                {/* Guide Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-vybe-gray-300 mb-6">
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">●</span>
                    Beginner
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {guide.readingTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Backend developers
                  </span>
                </div>
                
                {/* Primary Focus & AI Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">Primary Focus</h3>
                    <span className="inline-block px-3 py-1 bg-vybe-purple/20 text-vybe-purple-light rounded-full text-sm capitalize">
                      {guide.category?.replace('-', ' ') || 'Development'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">AI Tools Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-vybe-orange/10 text-vybe-orange text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </PrimaryCard>

              {/* What You'll Learn */}
              <PrimaryCard headerVariant="purple" title="What You'll Learn" className="mb-6" noHover>
                <p className="text-vybe-gray-300 mb-4">
                  Master advanced patterns and build production-ready AI applications. This comprehensive guide covers everything from basic setup to advanced implementation patterns.
                </p>
                <ul className="space-y-2 text-vybe-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-vybe-purple-light mt-1">✓</span>
                    <span>Set up and authenticate with Claude API efficiently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vybe-purple-light mt-1">✓</span>
                    <span>Implement rate limiting and error handling for production use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vybe-purple-light mt-1">✓</span>
                    <span>Build streaming responses for real-time interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vybe-purple-light mt-1">✓</span>
                    <span>Optimize costs with token management strategies</span>
                  </li>
                </ul>
              </PrimaryCard>

              {/* Curriculum */}
              <PrimaryCard headerVariant="pink" title="Guide Curriculum" className="mb-6" noHover>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Getting Started Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-vybe-purple-light" />
                      <h3 className="font-medium text-white">Getting Started</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-purple-light">•</span>
                        Introduction to Testing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-purple-light">•</span>
                        Setting up your environment
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-purple-light">•</span>
                        Basic test patterns
                      </li>
                    </ul>
                  </div>
                  
                  {/* Core Concepts Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-vybe-pink" />
                      <h3 className="font-medium text-white">Core Concepts</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-pink">•</span>
                        Understanding test structures
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-pink">•</span>
                        Mocking and stubbing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-pink">•</span>
                        Error handling strategies
                      </li>
                    </ul>
                  </div>
                  
                  {/* Advanced Patterns Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-vybe-orange" />
                      <h3 className="font-medium text-white">Advanced Patterns</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-orange">•</span>
                        Integration testing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-orange">•</span>
                        Performance testing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-vybe-orange">•</span>
                        Multi-environment testing
                      </li>
                    </ul>
                  </div>
                  
                  {/* Production Deployment Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="w-5 h-5 text-green-500" />
                      <h3 className="font-medium text-white">Production Deployment</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        CI/CD integration
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Monitoring and alerts
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Scaling test suites
                      </li>
                    </ul>
                  </div>
                </div>
              </PrimaryCard>
              
            </div>
            
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-6">
                {/* Price Box (Unlocked) */}
                <PrimaryCard className="mb-6" noHover>
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div className="text-3xl font-light text-white">Purchased</div>
                    </div>
                    <p className="text-sm text-vybe-gray-400 mb-6">You have full access to this guide</p>
                    
                    <Link href="/guides/test-static-guide/view">
                      <button className="btn btn-secondary btn-block mb-4 bg-vybe-purple hover:bg-vybe-purple-dark text-white w-full py-2 px-4 rounded-lg">
                        <Eye className="w-5 h-5 mr-2 inline" />
                        View Guide
                      </button>
                    </Link>
                    
                    <button className="btn btn-secondary btn-block border-vybe-gray-700 hover:bg-vybe-gray-800 w-full py-2 px-4 rounded-lg border">
                      <Bookmark className="w-5 h-5 mr-2 inline" />
                      Save for Later
                    </button>
                  </div>
                </PrimaryCard>
                
                {/* Guide Stats */}
                <SecondaryCard colorVariant="purple" title="This guide includes:" className="overflow-hidden mb-6" noHover>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-vybe-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-vybe-gray-300">5 modules with detailed lessons</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Download className="w-4 h-4 text-vybe-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-vybe-gray-300">3 downloadable resources</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-vybe-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-vybe-gray-300">Progress tracking</span>
                    </div>
                  </div>
                </SecondaryCard>
                
                {/* Author */}
                <SecondaryCard colorVariant="pink" title="About the Author" className="overflow-hidden" noHover>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex items-center justify-center text-white font-bold">
                        TA
                      </div>
                      <div>
                        <div className="font-medium text-white">{guide.author.displayName}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-vybe-gray-400">@{guide.author.username}</span>
                          <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium">PRO</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-vybe-gray-300 mb-3">
                      {guide.author.bio}
                    </p>
                    <button 
                      onClick={() => window.open('https://discord.gg/VaxG4VEdFk', '_blank')} 
                      className="text-sm text-vybe-purple-light hover:text-vybe-pink transition-colors"
                    >
                      Message on Discord →
                    </button>
                </SecondaryCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}