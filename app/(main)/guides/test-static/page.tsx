"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Bookmark, CheckCircle } from "lucide-react";
import { PrimaryCard, SecondaryCard } from "@/components/ui/card/CardVariants";
import { GuideCard } from "@/components/ui/card/GuideCard";

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