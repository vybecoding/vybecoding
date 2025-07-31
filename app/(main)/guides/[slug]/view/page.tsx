"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { DIFFICULTY_LEVELS } from "@/lib/constants/guides";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GuideViewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GuideViewPage({ params }: GuideViewPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [slug, setSlug] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Extract slug from params Promise
  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  // Fetch guide by slug
  const guide = useQuery(api.guides.getGuideBySlug, slug ? { slug } : "skip");
  
  // Update reading progress mutation
  const updateProgress = useMutation(api.guides.updateReadingProgress);
  
  // Track lesson completion
  const completeLesson = useMutation(api.guides.completeLesson);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = Math.min((scrollTop / documentHeight) * 100, 100);
      
      setReadingProgress(progress);
      
      // Update reading progress in database every 10%
      if (user && guide?._id && progress > 0 && progress % 10 < 1) {
        updateProgress({ 
          guideId: guide._id, 
          progress: Math.floor(progress) 
        }).catch(console.error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, guide?._id, updateProgress]);

  const handleLessonComplete = async () => {
    if (!user || !guide?._id) return;
    
    setCompletedLessons(prev => new Set([...Array.from(prev), currentLesson]));
    
    try {
      await completeLesson({ 
        guideId: guide._id, 
        lessonIndex: currentLesson 
      });
      
      toast({
        title: "Lesson completed!",
        description: "Great progress! Keep going."
      });
      
      // Auto-advance to next lesson if available
      const totalLessons = guide.content?.split(/^##\s/gm).length || 1;
      if (currentLesson < totalLessons - 1) {
        setCurrentLesson(currentLesson + 1);
      }
    } catch (error) {
      console.error("Failed to mark lesson complete:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide?.title,
          text: guide?.excerpt,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Guide link copied to clipboard"
      });
    }
  };

  if (!guide) {
    return (
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </Container>
    );
  }

  // For now, simulate lessons since they're not in the schema
  const lessons = [
    { id: "1", title: "Introduction", content: guide.content, duration: 15 },
    { id: "2", title: "Core Concepts", content: "# Core Concepts\n\nThis lesson would contain core concepts...", duration: 20 },
    { id: "3", title: "Advanced Topics", content: "# Advanced Topics\n\nThis lesson would contain advanced topics...", duration: 25 },
    { id: "4", title: "Conclusion", content: "# Conclusion\n\nThis lesson would wrap up the guide...", duration: 10 }
  ];
  const currentLessonData = lessons[currentLesson];
  const progressPercentage = ((completedLessons.size / Math.max(lessons.length, 1)) * 100);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-vybe-purple to-vybe-pink transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="page-container nebula-background min-h-screen">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href={`/guides/${slug}/unlocked`}>
                <Button variant="ghost" className="text-vybe-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="border-vybe-gray-700"
                >
                  <Share2 className="w-4 h-4" />
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
                      {currentLessonData?.title || guide.title}
                    </h1>
                  </div>

                  {/* Lesson Content */}
                  <article className="prose prose-invert max-w-none">
                    <MarkdownRenderer 
                      content={currentLessonData?.content || guide.content} 
                    />
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