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
  CheckCircle,
  Download,
  FileText,
  Star,
  Users,
  Code,
  Lightbulb,
  Server
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

export default function GuideUnlockedPage({ params }: GuideDetailsPageProps) {
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

  const handleViewGuide = () => {
    if (slug) {
      router.push(`/guides/${slug}/view`);
    }
  };

  const handleSaveForLater = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save guides",
        variant: "destructive"
      });
      return;
    }

    if (!guide?._id) return;

    try {
      const result = await toggleBookmark({ guideId: guide._id });
      setIsBookmarked(result.bookmarked);
      toast({
        title: "Saved for later!",
        description: "Guide added to your reading list"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save guide",
        variant: "destructive"
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
          <Link href="/guides">
            <Button variant="ghost" className="mb-6 -ml-2 text-vybe-gray-400 hover:text-white transition-colors">
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
                        <Users className="w-4 h-4" />
                        {guide.targetAudience || "Backend developers"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Guide Details */}
                <div className="p-6">
                  {/* Brief Description */}
                  <p className="text-vybe-gray-300 mb-6">
                    {guide.excerpt}
                  </p>
                  
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
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="vybe-card p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                  What You'll Learn
                </h2>
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
              </div>

              {/* Curriculum */}
              <div className="vybe-card p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                  Guide Curriculum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Getting Started Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-vybe-purple-light" />
                      <h3 className="font-medium text-white">Getting Started</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      {(
                        <>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-purple-light">•</span>
                            Introduction to Claude API
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-purple-light">•</span>
                            Setting up your environment
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-purple-light">•</span>
                            Authentication and first request
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-purple-light">•</span>
                            Basic API patterns
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  {/* Core Concepts Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-vybe-pink" />
                      <h3 className="font-medium text-white">Core Concepts</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      {(
                        <>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-pink">•</span>
                            Understanding context windows
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-pink">•</span>
                            Prompt engineering patterns
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-pink">•</span>
                            Rate limiting implementation
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-pink">•</span>
                            Error handling strategies
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  {/* Advanced Patterns Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-vybe-orange" />
                      <h3 className="font-medium text-white">Advanced Patterns</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      {(
                        <>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-orange">•</span>
                            Streaming responses
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-orange">•</span>
                            Conversation memory
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-orange">•</span>
                            Multi-turn interactions
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-vybe-orange">•</span>
                            Token optimization
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  {/* Production Deployment Module */}
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="w-5 h-5 text-green-500" />
                      <h3 className="font-medium text-white">Production Deployment</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-vybe-gray-400">
                      {(
                        <>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            Security best practices
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            Monitoring and logging
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            Cost optimization
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            Scaling strategies
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-6">
                {/* Price Box (Unlocked) */}
                <div className="vybe-card p-6 mb-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div className="text-3xl font-light text-white">Purchased</div>
                    </div>
                    <p className="text-sm text-vybe-gray-400 mb-6">You have full access to this guide</p>
                    
                    <button 
                      onClick={handleViewGuide}
                      className="btn btn-secondary btn-block mb-4 bg-vybe-purple hover:bg-vybe-purple-dark text-white"
                    >
                      <Eye className="w-5 h-5 mr-2 inline" />
                      View Guide
                    </button>
                    
                    <button 
                      onClick={handleSaveForLater} 
                      className="btn btn-secondary btn-block border-vybe-gray-700 hover:bg-vybe-gray-800"
                    >
                      <Bookmark className="w-5 h-5 mr-2 inline" />
                      Save for Later
                    </button>
                  </div>
                </div>
                
                {/* Guide Stats */}
                <div className="vybe-card overflow-hidden mb-6">
                  <div className="vybe-card-header">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full"></div>
                      This guide includes:
                    </h3>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
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
                        {guide.author?.displayName?.slice(0, 2).toUpperCase() || "AC"}
                      </div>
                      <div>
                        <div className="font-medium text-white">{guide.author?.displayName || "Alex Chen"}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-vybe-gray-400">@{guide.author?.username || "alexchen"}</span>
                          <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium">PRO</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-vybe-gray-300 mb-3">
                      {guide.author?.bio || "With over 8 years of experience in full-stack development, I specialize in building scalable web applications and mentoring developers."}
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
  );
}