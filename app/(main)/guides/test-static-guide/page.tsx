"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/layout";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Share2, 
  ArrowLeft,
  BookOpen,
  CheckCircle 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TestStaticGuideDetailPage() {
  const [readingProgress, setReadingProgress] = useState(25);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Static test data
  const guide = {
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

### Code Example

\`\`\`javascript
// Test code block
function testFunction() {
  console.log("🧪 This is a test!");
  return {
    status: "success",
    message: "Test completed"
  };
}

// Call the test function
const result = testFunction();
console.log(result);
\`\`\`

### Lists and Tables

**Unordered List:**
- First item
- Second item
- Third item

**Table Example:**

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ Working | Basic markdown rendering |
| Code Blocks | ✅ Working | Syntax highlighting active |
| Tables | ✅ Working | Table rendering confirmed |

### Blockquote Test

> This is a test blockquote to verify styling.
> It can span multiple lines and should have distinct styling.

## Conclusion

This test guide demonstrates all the features working correctly!`,
    category: "development",
    difficulty: "beginner",
    tags: ["test", "static", "demo"],
    views: 123,
    completions: 45,
    readingTime: 5,
    author: {
      id: "test-author",
      displayName: "Test Author",
      username: "testuser",
      bio: "This is a test author bio for the static demo.",
      avatar: null
    }
  };

  const difficultyConfig = {
    label: "Beginner",
    color: "text-green-500",
    value: "beginner"
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="page-container nebula-background">
        <div className="nebula-middle"></div>
        <div className="nebula-bottom"></div>
        
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Back Button */}
            <Link href="/guides/test-static">
              <Button variant="ghost" className="mb-6 -ml-2 text-white hover:text-vybe-purple-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Test Page
              </Button>
            </Link>
            
            <div className="grid grid-cols-12 gap-8">

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Guide Header */}
              <div className="vybe-card overflow-hidden mb-6">
                <div className="relative">
                  {/* Cover Image */}
                  <div className="h-24 bg-gradient-to-r from-vybe-purple/20 to-vybe-pink/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>
                  
                  {/* Guide Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 pt-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {guide.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-vybe-gray-300">
                      <span className="flex items-center gap-1">
                        <span className={cn("●", difficultyConfig.color)}></span>
                        {difficultyConfig.label}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {guide.readingTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {guide.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Tags and Actions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* Category */}
                    <div>
                      <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">Primary Focus</h3>
                      <Badge variant="secondary" className="capitalize bg-vybe-purple/20 text-vybe-purple-light">
                        {guide.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={cn("border-vybe-gray-700", isBookmarked && "text-yellow-500")}
                      >
                        <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-vybe-gray-700"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">AI Tools Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer bg-vybe-gray-800 text-vybe-gray-300 hover:bg-vybe-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <article className="mb-12">
                <MarkdownRenderer content={guide.content} />
              </article>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-6 space-y-6">
                
                {/* Table of Contents */}
                <div className="vybe-card overflow-hidden">
                  <div className="vybe-card-header">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                      Table of Contents
                    </h2>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Test Guide Content</h3>
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Features to Test</h3>
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Code Example</h3>
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Lists and Tables</h3>
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Blockquote Test</h3>
                      <h3 className="font-medium text-white cursor-pointer hover:text-vybe-purple-light">Conclusion</h3>
                    </div>
                  </div>
                </div>
                
                {/* Progress Tracking */}
                <div className="vybe-card overflow-hidden">
                  <div className="vybe-card-header">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                      Your Progress
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-vybe-gray-300">Reading Progress</span>
                      <span className="text-sm text-vybe-gray-300">{Math.round(readingProgress)}%</span>
                    </div>
                    <Progress value={readingProgress} className="h-2" />
                    <div className="flex items-center gap-2 mt-3 text-sm text-vybe-gray-300">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-vybe-gray-300">Progress tracking</span>
                    </div>
                  </div>
                </div>
                
                {/* Author */}
                <div className="vybe-card overflow-hidden">
                  <div className="vybe-card-header">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                      About the Author
                    </h3>
                  </div>
                  <div className="p-4">
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
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
        </div>
      </div>
    </>
  );
}