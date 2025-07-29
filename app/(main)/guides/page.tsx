"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { GuideCard } from "@/components/ui/card/GuideCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GUIDE_CATEGORIES, DIFFICULTY_LEVELS, GUIDE_TAGS } from "@/lib/constants/guides";
import { Search, Filter, PenTool, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function GuidesPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);

  // Fetch published guides with filters
  const guidesResult = useQuery(api.guides.getPublishedGuides, {
    category: selectedCategory || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    difficulty: selectedDifficulty || undefined,
    limit: 12,
    cursor: cursor || undefined,
  });

  // Search guides separately when search term exists
  const searchResults = useQuery(
    api.guides.searchGuides,
    searchTerm ? { query: searchTerm } : "skip"
  );

  const handleWriteGuide = () => {
    if (isSignedIn) {
      router.push("/write");
    } else {
      router.push("/sign-in?redirect=/write");
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTags([]);
    setSelectedDifficulty("");
    setCursor(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTags.length > 0 || selectedDifficulty;

  // Use search results if searching, otherwise use filtered results
  const displayGuides = searchTerm && searchResults 
    ? searchResults 
    : guidesResult?.guides || [];

  const hasMore = !searchTerm && guidesResult?.hasMore;

  const loadMore = () => {
    if (guidesResult?.nextCursor) {
      setCursor(guidesResult.nextCursor);
    }
  };

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Community Guides
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from tutorials and guides created by experienced developers
            </p>
          </div>
          
          <Button onClick={handleWriteGuide} className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            Write a Guide
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  Active
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Filters</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {GUIDE_CATEGORIES.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={setSelectedDifficulty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All levels</SelectItem>
                      {DIFFICULTY_LEVELS.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                    {selectedTags.length === 0 && (
                      <span className="text-sm text-gray-500">
                        Click tags below to filter
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tag Selection */}
              <div className="space-y-2">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium">
                    Select Tags
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {GUIDE_TAGS.slice(0, 30).map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayGuides.map((guide) => (
            <Link key={guide._id} href={`/guides/${guide.slug}`}>
              <GuideCard
                title={guide.title}
                author={{
                  name: guide.author?.displayName || "Anonymous",
                  avatar: guide.author?.avatar
                }}
                description={guide.excerpt}
                tags={guide.tags}
                difficulty={guide.difficulty as any}
                readTime={guide.readingTime}
                views={guide.views}
                likes={guide.completions}
                className="h-full cursor-pointer transition-transform hover:scale-[1.02]"
              />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {displayGuides.length === 0 && !guidesResult && !searchResults && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Loading guides...
            </p>
          </div>
        )}

        {displayGuides.length === 0 && (guidesResult || searchResults) && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {hasActiveFilters
                ? "No guides found matching your filters. Try adjusting your search criteria."
                : "No guides have been published yet. Be the first to share your knowledge!"}
            </p>
            {!hasActiveFilters && (
              <Button onClick={handleWriteGuide}>
                Write the First Guide
              </Button>
            )}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center">
            <Button variant="outline" onClick={loadMore}>
              Load More Guides
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}