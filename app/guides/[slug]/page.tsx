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

interface GuideDetailsPageProps {
  params: {
    slug: string;
  };
}

export default function GuideDetailsPage({ params }: GuideDetailsPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch guide by slug
  const guide = useQuery(api.guides.getGuideBySlug, { slug: params.slug });
  
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

      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/guides">
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {guide.category && (
                <Badge variant="secondary" className="capitalize">
                  {guide.category.replace('-', ' ')}
                </Badge>
              )}
              {difficultyConfig && (
                <Badge variant="outline" className={difficultyConfig.color}>
                  {difficultyConfig.label}
                </Badge>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {guide.readingTime} min read
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">
              {guide.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {guide.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={guide.author?.avatar} />
                  <AvatarFallback>
                    {guide.author?.displayName?.[0] || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{guide.author?.displayName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Published {formatDistanceToNow(guide.publishedAt || guide.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={isBookmarked ? "text-yellow-600" : ""}
                >
                  <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {guide.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {completionRate}% completion rate
              </span>
              {guide.completions > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {guide.completions.toLocaleString()} completed
                </span>
              )}
            </div>
          </header>

          {/* Tags */}
          {guide.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {guide.tags.map(tag => (
                <Link key={tag} href={`/guides?tag=${tag}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {/* Content */}
          <article className="mb-12">
            <MarkdownRenderer content={guide.content} />
          </article>

          {/* Footer */}
          <footer className="border-t pt-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-semibold mb-2">Did you find this guide helpful?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share it with others who might benefit
                </p>
              </div>
              <Button onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Guide
              </Button>
            </div>

            {/* Author Bio */}
            {guide.author?.bio && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={guide.author.avatar} />
                    <AvatarFallback>
                      {guide.author.displayName?.[0] || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      About {guide.author.displayName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {guide.author.bio}
                    </p>
                    <Link href={`/profile/${guide.author.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </footer>
        </div>
      </Container>
    </>
  );
}