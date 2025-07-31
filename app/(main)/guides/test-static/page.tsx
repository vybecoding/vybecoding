"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Bookmark, CheckCircle } from "lucide-react";

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
          <div className="mb-8 p-4 bg-vybe-orange/10 border border-vybe-orange/30 rounded-lg">
            <h2 className="text-vybe-orange font-semibold mb-2">⚠️ Static Test Page</h2>
            <p className="text-sm text-vybe-gray-300 mb-4">
              This is a static test page for development. Click the links below to test different guide views:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="vybe-card p-4">
                <h3 className="font-semibold text-white mb-2">1. Guide Detail</h3>
                <p className="text-sm text-vybe-gray-400 mb-3">
                  Regular guide detail page with table of contents
                </p>
                <Link href={`/guides/${testGuide.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Detail Page
                  </Button>
                </Link>
              </div>
              
              <div className="vybe-card p-4">
                <h3 className="font-semibold text-white mb-2">2. Guide Unlocked</h3>
                <p className="text-sm text-vybe-gray-400 mb-3">
                  Purchased guide with "View Guide" button
                </p>
                <Link href={`/guides/${testGuide.slug}/unlocked`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    View Unlocked Page
                  </Button>
                </Link>
              </div>
              
              <div className="vybe-card p-4">
                <h3 className="font-semibold text-white mb-2">3. Guide Viewer</h3>
                <p className="text-sm text-vybe-gray-400 mb-3">
                  Lesson-by-lesson guide viewer
                </p>
                <Link href={`/guides/${testGuide.slug}/view`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Bookmark className="w-4 h-4 mr-2" />
                    View Lesson Page
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/guides">
            <Button variant="ghost" className="mb-6 -ml-2 text-vybe-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Button>
          </Link>

          {/* Preview of Guide Card - Matching Demo Exactly */}
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Guide Card Preview (Demo Style):</h3>
            <div className="minimal-card card-verified rounded-lg p-5 transition-all cursor-pointer group relative overflow-hidden">
              {/* Type label */}
              <span style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                padding: "0.375rem 0.5rem", 
                paddingTop: "0.5rem", 
                background: "rgba(138, 43, 226, 0.5625)", 
                color: "rgba(255, 255, 255, 1)", 
                fontSize: "0.844rem", 
                fontWeight: 600, 
                textTransform: "uppercase", 
                borderRadius: "0 0 0.625rem 0", 
                zIndex: 20, 
                lineHeight: 1, 
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)", 
                letterSpacing: "0.25px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "auto"
              }}>
                GUIDE
              </span>
              
              {/* Title and creator - Added padding-top for spacing after badge */}
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-vybe-purple-light transition-colors pt-8">
                {testGuide.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex-shrink-0"></div>
                <span className="text-sm text-vybe-gray-400">
                  @{testGuide.author.username}
                  <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">PRO</span>
                </span>
                <span className="text-vybe-gray-500">•</span>
                <div className="flex items-center gap-1 text-sm text-vybe-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>01/31/25</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-vybe-gray-400 mb-4 line-clamp-2">
                {testGuide.excerpt}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded font-medium">Beginner</span>
                {testGuide.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-vybe-purple/10 border border-vybe-purple/20 text-vybe-purple-light text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-800/50 mt-auto">
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <span className="text-xs">✅</span>
                  <span>Verified 2h ago</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-vybe-gray-400">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>{testGuide.completions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}