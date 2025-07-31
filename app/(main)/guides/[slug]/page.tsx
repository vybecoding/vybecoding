"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { DIFFICULTY_LEVELS } from "@/lib/constants/guides";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GuideDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GuideDetailsPage({ params }: GuideDetailsPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  // Extract slug from params Promise
  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  // Fetch guide by slug
  const guide = useQuery(api.guides.getGuideBySlug, slug ? { slug } : "skip");
  
  // Track view mutation
  const trackView = useMutation(api.guides.trackView);
  
  // Update reading progress mutation
  const updateProgress = useMutation(api.guides.updateReadingProgress);
  
  // Toggle bookmark mutation
  const toggleBookmark = useMutation(api.guides.toggleBookmark);

  // Track view on mount
  useEffect(() => {
    if (guide?._id) {
      trackView({ guideId: guide._id }).catch(console.error);
    }
  }, [guide?._id, trackView]);

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

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark guides",
        variant: "destructive"
      });
      return;
    }

    if (!guide?._id) return;

    try {
      const result = await toggleBookmark({ guideId: guide._id });
      setIsBookmarked(result.bookmarked);
      toast({
        title: result.bookmarked ? "Bookmarked!" : "Bookmark removed",
        description: result.bookmarked 
          ? "Guide saved to your bookmarks" 
          : "Guide removed from bookmarks"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
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

  const difficultyConfig = DIFFICULTY_LEVELS.find(d => d.value === guide.difficulty);
  const completionRate = guide.views > 0 
    ? Math.round((guide.completions / guide.views) * 100) 
    : 0;

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
            <Link href="/guides">
              <Button variant="ghost" className="mb-6 -ml-2 text-white hover:text-vybe-purple-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Guides
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
                      {difficultyConfig && (
                        <span className="flex items-center gap-1">
                          <span className={cn("●", difficultyConfig.color)}></span>
                          {difficultyConfig.label}
                        </span>
                      )}
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
                    {guide.category && (
                      <div>
                        <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">Primary Focus</h3>
                        <Badge variant="secondary" className="capitalize bg-vybe-purple/20 text-vybe-purple-light">
                          {guide.category.replace('-', ' ')}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBookmark}
                        className={cn("border-vybe-gray-700", isBookmarked && "text-yellow-500")}
                      >
                        <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                      </Button>
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
                  
                  {/* Tags */}
                  {guide.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-vybe-gray-400 mb-2">AI Tools Covered</h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.map(tag => (
                          <Link key={tag} href={`/guides?tag=${tag}`}>
                            <Badge variant="secondary" className="cursor-pointer bg-vybe-gray-800 text-vybe-gray-300 hover:bg-vybe-gray-700">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
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
                      <h3 className="font-medium text-white">Getting Started</h3>
                      <h3 className="font-medium text-white">Core Concepts</h3>
                      <h3 className="font-medium text-white">Advanced Patterns</h3>
                      <h3 className="font-medium text-white">Production Deployment</h3>
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
                        {guide.author?.displayName?.[0] || "A"}
                      </div>
                      <div>
                        <div className="font-medium text-white">{guide.author?.displayName || "Author"}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-vybe-gray-400">@{guide.author?.username || "author"}</span>
                          <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium">PRO</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-vybe-gray-300 mb-3">
                      {guide.author?.bio || "With years of experience in development, I specialize in building scalable web applications and mentoring developers."}
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