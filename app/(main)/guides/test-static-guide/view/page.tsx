"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { 
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TestStaticGuideViewPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([0]));

  // Simulated lessons
  const lessons = [
    { 
      id: "1", 
      title: "Introduction to Testing", 
      content: `# Lesson 1: Introduction to Testing

**This is test lesson content.**

In this lesson, we'll cover the basics of testing. This is placeholder content to verify lesson navigation works correctly.

## Key Concepts
- Test concept 1
- Test concept 2  
- Test concept 3

\`\`\`javascript
console.log("Lesson 1 test code");
\`\`\`

This lesson demonstrates the lesson viewer working properly.`, 
      duration: 15 
    },
    { 
      id: "2", 
      title: "Advanced Testing", 
      content: `# Lesson 2: Advanced Testing

**This is test lesson 2 content.**

Now we move on to more advanced testing concepts. This lesson tests the navigation between lessons.

## Advanced Topics
1. Advanced topic 1
2. Advanced topic 2
3. Advanced topic 3

> Test blockquote in lesson 2

The lesson navigation should work smoothly between lessons.`, 
      duration: 20 
    },
    { 
      id: "3", 
      title: "Testing Best Practices", 
      content: `# Lesson 3: Testing Best Practices

**This is test lesson 3 content.**

Learn about best practices for testing. This content verifies multi-lesson navigation.

### Best Practices Checklist
- [ ] Write clear test names
- [ ] Test edge cases
- [ ] Keep tests simple
- [ ] Document test purpose

This lesson shows how content changes when navigating.`, 
      duration: 18 
    },
    { 
      id: "4", 
      title: "Final Test Review", 
      content: `# Lesson 4: Final Test Review

**This is the final test lesson.**

Congratulations on completing all test lessons! This verifies the lesson completion system.

## Summary
You've successfully navigated through all test lessons. The system is working correctly if you can:
- ✅ Navigate between lessons
- ✅ Track progress
- ✅ Mark lessons as complete
- ✅ See this final lesson

🎉 **Test Complete!**`, 
      duration: 10 
    }
  ];

  const currentLessonData = lessons[currentLesson];
  const progressPercentage = ((completedLessons.size / lessons.length) * 100);

  const handleLessonComplete = () => {
    setCompletedLessons(prev => new Set([...prev, currentLesson]));
    
    // Auto-advance to next lesson if available
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-vybe-purple to-vybe-pink transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="page-container nebula-background min-h-screen">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/guides/test-static-guide/unlocked">
                <Button variant="ghost" className="text-vybe-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-vybe-gray-700">
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Sidebar - Lesson Navigation */}
              <div className="col-span-12 lg:col-span-3">
                <div className="vybe-card p-4 lg:sticky lg:top-6">
                  <h3 className="font-semibold text-white mb-4">Course Progress</h3>
                  
                  {/* Overall Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-vybe-gray-400">Overall Progress</span>
                      <span className="text-vybe-gray-300">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  {/* Lessons List */}
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentLesson(index)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all",
                          currentLesson === index 
                            ? "bg-vybe-purple/20 border border-vybe-purple/30" 
                            : "hover:bg-vybe-gray-800"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5",
                            completedLessons.has(index) 
                              ? "bg-green-500 text-white" 
                              : currentLesson === index
                              ? "bg-vybe-purple text-white"
                              : "bg-vybe-gray-700 text-vybe-gray-400"
                          )}>
                            {completedLessons.has(index) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={cn(
                              "text-sm font-medium",
                              currentLesson === index ? "text-white" : "text-vybe-gray-300"
                            )}>
                              {lesson.title}
                            </div>
                            {lesson.duration && (
                              <div className="text-xs text-vybe-gray-500 mt-1">
                                {lesson.duration} min
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 lg:col-span-9">
                <div className="vybe-card p-8">
                  {/* Lesson Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-vybe-gray-400 mb-2">
                      <span>Lesson {currentLesson + 1} of {lessons.length}</span>
                      {currentLessonData?.duration && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {currentLessonData.duration} min
                          </span>
                        </>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                      {currentLessonData?.title}
                    </h1>
                  </div>

                  {/* Lesson Content */}
                  <article className="prose prose-invert max-w-none">
                    <MarkdownRenderer content={currentLessonData?.content || ""} />
                  </article>

                  {/* Lesson Actions */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-vybe-gray-800">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                      className="border-vybe-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={handleLessonComplete}
                      disabled={completedLessons.has(currentLesson)}
                      className={cn(
                        "bg-gradient-to-r from-vybe-purple to-vybe-pink text-white",
                        completedLessons.has(currentLesson) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {completedLessons.has(currentLesson) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                      disabled={currentLesson === lessons.length - 1}
                      className="border-vybe-gray-700"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
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