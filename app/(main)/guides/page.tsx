"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { GuideCard } from "@/components/ui/card/GuideCard";
import { GUIDE_CATEGORIES, DIFFICULTY_LEVELS, GUIDE_TAGS } from "@/lib/constants/guides";
import { Search, Calendar, Eye, Heart, Crown, ExternalLink, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Guide Card Component - Matching demo exactly
function GuideCardDemo({ guide }: { guide: any }) {
  const timeAgo = formatDistanceToNow(new Date(guide.createdAt));

  return (
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
      createdAt={timeAgo}
      verificationStatus={guide.verificationStatus || 'verified'}
      lastVerified={guide.lastVerified || '2h'}
      isTopCreator={guide.isTopCreator || false}
      className="h-full cursor-pointer transition-transform hover:scale-[1.02]"
    />
  );
}

export default function GuidesPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState<string>("browse");

  // Fetch published guides with filters
  const guidesResult = useQuery(api.guides.getPublishedGuides, {
    category: selectedCategory || undefined,
    limit: 20,
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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedCategory;

  // Use search results if searching, otherwise use filtered results
  const displayGuides = searchTerm && searchResults 
    ? searchResults 
    : guidesResult?.guides || [];

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)'
            }}
          >
            Guides
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn from comprehensive tutorials and guides created by expert developers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Universal Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Search guides and tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vybe-purple/50 focus:border-vybe-purple/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vybe-purple/50 focus:border-vybe-purple/50 transition-all duration-200"
            >
              <option value="">All Categories</option>
              {GUIDE_CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort By Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vybe-purple/50 focus:border-vybe-purple/50 transition-all duration-200"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="verified">Recently Verified</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-700/60 hover:bg-gray-600/60 backdrop-blur-lg border border-gray-600/40 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-black/40 backdrop-blur-lg rounded-lg p-1 border border-gray-700/40">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === 'browse'
                    ? 'bg-vybe-purple text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Browse Guides
              </button>
              <button
                onClick={() => {
                  setActiveTab('write');
                  handleWriteGuide();
                }}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === 'write'
                    ? 'bg-vybe-purple text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Write Guide
              </button>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        {guidesResult ? (
          displayGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGuides.map((guide) => (
                <Link key={guide._id} href={`/guides/${guide.slug}`}>
                  <GuideCardDemo guide={guide} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {hasActiveFilters
                  ? "No guides found matching your filters. Try adjusting your search criteria."
                  : "No guides have been published yet. Be the first to share your knowledge!"}
              </p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-vybe-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading guides...</p>
            </div>
          </div>
        )}

        {/* Load More */}
        {guidesResult?.hasMore && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg text-white hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-200">
              Load More Guides
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}