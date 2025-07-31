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

          {/* Preview of Guide Card */}
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Guide Card Preview:</h3>
            <div className="vybe-card p-6">
              <h4 className="text-xl font-semibold text-white mb-2">{testGuide.title}</h4>
              <p className="text-vybe-gray-300 mb-4">{testGuide.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {testGuide.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-vybe-gray-800 text-vybe-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-vybe-gray-400">
                <span>{testGuide.readingTime} min read</span>
                <span>{testGuide.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}