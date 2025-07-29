"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { APP_CATEGORIES, TECH_STACK_OPTIONS, PLATFORM_OPTIONS } from "@/lib/constants/apps";
import { Search, Calendar, Eye, Heart, ExternalLink, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// App Card Component - Matching demo exactly
function AppCard({ app }: { app: any }) {
  const timeAgo = formatDistanceToNow(new Date(app.createdAt));
  const primaryUrl = app.liveUrl || app.appStoreUrl || app.playStoreUrl;

  return (
    <div className="minimal-card relative bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg p-4 pb-2 hover:bg-gray-800/60 hover:border-gray-600/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col h-full">
      {/* Type label in top-left */}
      <div 
        className="absolute top-0 left-0 px-2 py-1.5 text-white text-xs font-semibold uppercase tracking-wide rounded-br-lg z-20"
        style={{ background: 'rgba(236, 72, 153, 0.5625)' }}
      >
        APP
      </div>

      {/* Date in top-right corner */}
      <div className="absolute top-2 right-3 flex items-baseline gap-1 text-xs text-gray-400 z-20">
        <Calendar className="w-3 h-3 opacity-70" />
        {timeAgo} ago
      </div>

      {/* Title with hover effect */}
      <h3 className="mt-6 text-lg font-semibold text-white hover:text-vybe-orange transition-colors duration-200 mb-0">
        <Link href={`/apps/${app._id}`}>
          {app.name}
        </Link>
      </h3>

      {/* Creator info */}
      {app.user && (
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700">
            {app.user.avatar ? (
              <Image 
                src={app.user.avatar} 
                alt={app.user.displayName}
                width={24}
                height={24}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
                {app.user.displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-400">{app.user.displayName}</span>
          {/* PRO badge */}
          <div className="bg-vybe-pink/20 text-vybe-pink px-1.5 py-0.5 text-xs font-medium rounded flex items-center gap-1">
            <Crown className="w-3 h-3" />
            PRO
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-400 mt-3 line-clamp-2 flex-grow">
        {app.shortDescription}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {app.techStack.slice(0, 3).map((tech: string) => (
          <span 
            key={tech}
            className="bg-vybe-pink/10 border border-vybe-pink/20 text-vybe-pink px-2 py-1 text-xs rounded"
          >
            {tech}
          </span>
        ))}
        {app.techStack.length > 3 && (
          <span className="bg-vybe-pink/10 border border-vybe-pink/20 text-vybe-pink px-2 py-1 text-xs rounded">
            +{app.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Bottom stats section */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-700/50">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {app.views || 0}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {app.likes || 0}
          </span>
        </div>
        {primaryUrl && (
          <span className="text-xs text-vybe-pink font-medium">Premium</span>
        )}
      </div>
    </div>
  );
}

export default function AppsPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState<string>("browse");

  // Fetch approved apps with filters
  const appsResult = useQuery(api.apps.getApprovedApps, {
    category: selectedCategory || undefined,
    searchTerm: searchTerm || undefined,
    limit: 20,
  });

  const handleSubmitApp = () => {
    if (isSignedIn) {
      router.push("/apps/submit");
    } else {
      router.push("/sign-in?redirect=/apps/submit");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedCategory;

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
            Apps
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover and explore amazing applications built by the VybeCoding community
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
                placeholder="Search apps..."
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
              {APP_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
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
              <option value="featured">Featured</option>
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
                Browse Apps
              </button>
              <button
                onClick={() => {
                  setActiveTab('submit');
                  handleSubmitApp();
                }}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === 'submit'
                    ? 'bg-vybe-purple text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Submit App
              </button>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        {appsResult ? (
          appsResult.apps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appsResult.apps.map((app) => (
                <AppCard key={app._id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {hasActiveFilters
                  ? "No apps found matching your filters. Try adjusting your search criteria."
                  : "No apps have been submitted yet. Be the first to share your app!"}
              </p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-vybe-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading apps...</p>
            </div>
          </div>
        )}

        {/* Load More */}
        {appsResult?.hasMore && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg text-white hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-200">
              Load More Apps
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}