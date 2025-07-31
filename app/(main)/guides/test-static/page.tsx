"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Bookmark, CheckCircle } from "lucide-react";
import { PrimaryCard, SecondaryCard } from "@/components/ui/card/CardVariants";
import { GuideCard } from "@/components/ui/card/GuideCard";
import { FeaturedCard } from "@/components/ui/card/FeaturedCard";
import { AppCard } from "@/components/ui/card/AppCard";
import { DemoMemberCard } from "@/components/ui/card/DemoMemberCard";
import { FeaturedContent } from "@/types/featured";
import { Member } from "@/types/members";

export default function TestStaticGuidePage() {
  // Static test data
  const testGuide = {
    _id: "test-static-guide",
    title: "🧪 TEST GUIDE - Static Demo Page",
    slug: "test-static-guide",
    excerpt: "⚠️ This is a static test page for development. Use this to test guide pages without authentication.",
    content: `# Test Guide Content

This is a static test guide page that doesn't require authentication or database access.

## Features to Test

- Markdown rendering
- Code syntax highlighting
- Layout and styling
- Navigation between pages

\`\`\`javascript
console.log("Test code block");
\`\`\``,
    category: "development",
    difficulty: "beginner",
    tags: ["test", "static", "demo"],
    views: 123,
    completions: 45,
    readingTime: 5,
    author: {
      displayName: "Test Author",
      username: "testuser",
      bio: "This is a test author bio for the static demo."
    }
  };

  // Test data for card previews
  const testAppCard: FeaturedContent = {
    id: 'test-app-1',
    type: 'app',
    title: 'AI Code Review Assistant',
    author: {
      name: '@devtools',
      username: 'devtools',
      tier: 'PRO',
      isTopCreator: false,
      isOfficial: false
    },
    date: '01/02/25',
    description: 'Interactive tool that analyzes your code for bugs, suggests improvements, and explains best practices using Claude AI.',
    tags: ['productivity', 'developer-tools', 'TypeScript'],
    verificationStatus: 'verified',
    stats: {
      likes: 89,
      views: 1250,
      downloads: 342
    },
    isPremium: false,
    isPurchased: false
  };

  const testNewsCard: FeaturedContent = {
    id: 'test-news-1',
    type: 'news',
    title: 'OpenAI Releases Claude 4.0 with Enhanced Reasoning',
    author: {
      name: 'OpenAI Blog',
      username: 'openai',
      tier: undefined,
      isTopCreator: false,
      isOfficial: true
    },
    date: '01/16/25',
    description: 'The latest Claude model brings significant improvements to reasoning capabilities and multimodal understanding, with enhanced performance across coding and analysis tasks.',
    tags: ['news', 'announcement', 'claude'],
    verificationStatus: 'verified',
    stats: {
      likes: 567,
      views: 8900
    },
    isPremium: false,
    isPurchased: false
  };

  const testMemberData: Member = {
    id: 'test-member-1',
    name: 'Alex Chen',
    username: 'alexchen',
    title: 'Machine Learning Expert',
    tier: 'PRO' as const,
    avatar: 'SC',
    bio: 'Pioneering next-generation AI systems and advancing machine learning capabilities',
    stats: {
      guides: 8,
      apps: 3
    },
    skills: ['Production AI', 'Python', 'Machine Learning'],
    isTopMentor: true,
    isMentor: true,
    mentorRating: 4.9,
    mentorReviews: 47,
    joinedDate: '2024-01-15'
  };

  return (
    <div className="page-container nebula-background min-h-screen">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <PrimaryCard headerVariant="orange" title="⚠️ Static Test Page" className="mb-8" noHover>
            <p className="text-sm text-vybe-gray-300 mb-4">
              This is a static test page for development. Click the links below to test different guide views:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SecondaryCard colorVariant="default" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">1. Guide Detail</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Regular guide detail page with table of contents
                </p>
                <Link href="/guides/test-static-guide">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Detail Page
                  </Button>
                </Link>
              </SecondaryCard>
              
              <SecondaryCard colorVariant="purple" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">2. Guide Unlocked</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Purchased guide with "View Guide" button
                </p>
                <Link href="/guides/test-static-guide/unlocked">
                  <Button variant="outline" size="sm" className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    View Unlocked Page
                  </Button>
                </Link>
              </SecondaryCard>
              
              <SecondaryCard colorVariant="orange" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">3. Guide Viewer</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Lesson-by-lesson guide viewer
                </p>
                <Link href="/guides/test-static-guide/view">
                  <Button variant="outline" size="sm" className="w-full">
                    <Bookmark className="w-4 h-4 mr-2" />
                    View Lesson Page
                  </Button>
                </Link>
              </SecondaryCard>
            </div>
          </PrimaryCard>

          {/* App Pages Test Section */}
          <PrimaryCard headerVariant="purple" title="🚀 App Pages Test" className="mb-8" noHover>
            <p className="text-sm text-vybe-gray-300 mb-4">
              Test the newly implemented app detail pages:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SecondaryCard colorVariant="default" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">14. App Native Detail</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  AI Calculator app with interactive interface and AI features
                </p>
                <Link href="/apps/native-detail">
                  <Button variant="outline" size="sm" className="w-full">
                    🧮 View Native Detail
                  </Button>
                </Link>
              </SecondaryCard>
              
              <SecondaryCard colorVariant="pink" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">15. App Member Preview</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Fitness Coach app preview with launch button
                </p>
                <Link href="/apps/member-preview">
                  <Button variant="outline" size="sm" className="w-full">
                    ⚡ View Member Preview
                  </Button>
                </Link>
              </SecondaryCard>
            </div>
          </PrimaryCard>

          {/* Profile Pages Test Section */}
          <PrimaryCard headerVariant="orange" title="👤 Profile Pages Test" className="mb-8" noHover>
            <p className="text-sm text-vybe-gray-300 mb-4">
              Test the newly implemented profile pages:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SecondaryCard colorVariant="purple" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">✅ 17. Profile Main</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Tabbed interface with info & booking
                </p>
                <Link href="/profile/alexdev">
                  <Button variant="outline" size="sm" className="w-full">
                    👤 View Profile Main
                  </Button>
                </Link>
              </SecondaryCard>
              
              <SecondaryCard colorVariant="pink" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">✅ 18. Profile Info</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Integrated as tab in Profile Main
                </p>
                <Link href="/profile/alexdev">
                  <Button variant="outline" size="sm" className="w-full">
                    ℹ️ View Profile Info Tab
                  </Button>
                </Link>
              </SecondaryCard>
              
              <SecondaryCard colorVariant="default" noHover className="flex flex-col">
                <h3 className="font-semibold text-white mb-2">✅ 19. Profile Booking</h3>
                <p className="text-sm text-vybe-gray-400 mb-3 flex-grow">
                  Integrated as tab in Profile Main
                </p>
                <Link href="/profile/alexdev">
                  <Button variant="outline" size="sm" className="w-full">
                    📅 View Booking Tab
                  </Button>
                </Link>
              </SecondaryCard>
            </div>
          </PrimaryCard>

          {/* Card Component Previews */}
          <PrimaryCard headerVariant="purple" title="🎨 Card Component Previews" className="mb-8" noHover>
            <p className="text-sm text-vybe-gray-300 mb-6">
              Preview of specialized card components used throughout the platform:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* App Card Preview */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">App Card (Featured Style)</h3>
                <FeaturedCard 
                  content={testAppCard}
                  onClick={(content) => console.log('App card clicked:', content)}
                />
              </div>
              
              {/* News Card Preview */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">News Card (Featured Style)</h3>
                <FeaturedCard 
                  content={testNewsCard}
                  onClick={(content) => console.log('News card clicked:', content)}
                />
              </div>
              
              {/* Member Card Preview */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Member Card (Demo Style)</h3>
                <DemoMemberCard 
                  member={testMemberData}
                  onClick={() => console.log('Member card clicked')}
                />
              </div>
            </div>
          </PrimaryCard>

          <Link href="/guides">
            <Button variant="ghost" className="mb-6 -ml-2 text-vybe-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Button>
          </Link>

          {/* Preview of Guide Card - Using Proper Card System */}
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Guide Card Preview (New Card System):</h3>
            <GuideCard
              id={testGuide._id}
              title={testGuide.title}
              slug={testGuide.slug}
              author={{
                name: testGuide.author.displayName,
                isTopCreator: false
              }}
              description={testGuide.excerpt}
              tags={testGuide.tags}
              difficulty={testGuide.difficulty as any}
              readTime={testGuide.readingTime}
              views={testGuide.views}
              likes={testGuide.completions}
              createdAt="2h ago"
              verificationStatus="verified"
              lastVerified="2h"
              isPro={true}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}