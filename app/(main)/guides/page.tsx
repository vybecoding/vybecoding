"use client";

import React, { useState, useEffect } from "react";
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
      id={guide._id}
      title={guide.title}
      slug={guide.slug}
      author={{
        name: guide.author?.displayName || "Anonymous",
        avatar: guide.author?.avatar,
        isTopCreator: guide.isTopCreator || false
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
      isPro={guide.isPro || false}
      className="h-full cursor-pointer transition-transform hover:scale-[1.02]"
    />
  );
}

export default function GuidesPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAITools, setSelectedAITools] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.filter-dropdown')) {
        setShowAIToolsDropdown(false);
        setShowCategoryDropdown(false);
        setShowSortDropdown(false);
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // AI Tools list matching demo
  const aiTools = [
    'Claude', 'Claude Code', 'Claude API', 'ChatGPT', 
    'Cursor', 'Augment Code', 'GitHub Copilot', 'v0 by Vercel', 'Bolt'
  ];

  // Fetch published guides with filters
  const guidesResult = useQuery(api.guides.getPublishedGuides, {
    category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
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
    setSelectedAITools([]);
    setSelectedCategories([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedAITools.length > 0 || selectedCategories.length > 0;

  // Filter guides by multiple categories and AI tools if needed
  const filteredGuides = React.useMemo(() => {
    if (!guidesResult?.guides) return [];
    
    let guides = guidesResult.guides;
    
    // Filter by categories if multiple selected
    if (selectedCategories.length > 1) {
      guides = guides.filter(guide => 
        selectedCategories.some(cat => 
          guide.category?.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    // Filter by AI tools (would need to be added to guide schema)
    if (selectedAITools.length > 0) {
      guides = guides.filter(guide => 
        guide.aiTools?.some((tool: string) => 
          selectedAITools.includes(tool)
        ) || false
      );
    }
    
    return guides;
  }, [guidesResult?.guides, selectedCategories, selectedAITools]);

  // Use search results if searching, otherwise use filtered results
  const displayGuides = searchTerm && searchResults 
    ? searchResults 
    : filteredGuides;

  return (
    <div className="page-container bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">
            <span className="gradient-text">Guides</span>
          </h1>
          <p className="text-vybe-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Step-by-step tutorials, prompt patterns, and workflows for building with AI. 
            Learn the exact processes behind every project.
          </p>
        </div>

        {/* Universal Search */}
        <div className="universal-search mb-8">
          <svg className="universal-search-icon w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="search" 
            placeholder="Search AI guides, tutorials, and workflows..." 
            className="universal-search-input"
            id="guides-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                // Trigger search
              }
            }}
          />
          <button className="btn btn-primary-purple universal-search-submit">Search</button>
          
          {/* Search Suggestions Dropdown */}
          <div className="search-suggestions" id="guides-search-suggestions">
            {/* Dynamically populated */}
          </div>
        </div>

        {/* Search Filter Dropdowns */}
        <div className="search-filter-container mb-8">
          <div className="flex flex-col gap-4">
            {/* Active Filters Display */}
            {(selectedAITools.length > 0 || selectedCategories.length > 0) && (
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedAITools.map(tool => (
                  <span 
                    key={tool}
                    className="px-3 py-1 bg-vybe-pink/20 text-vybe-pink text-sm rounded-full border border-vybe-pink/30 flex items-center gap-2"
                  >
                    {tool}
                    <button 
                      onClick={() => setSelectedAITools(selectedAITools.filter(t => t !== tool))}
                      className="hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedCategories.map(category => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-vybe-purple/20 text-vybe-purple text-sm rounded-full border border-vybe-purple/30 flex items-center gap-2"
                  >
                    {category}
                    <button 
                      onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                      className="hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Filters Row */}
            <div className="flex gap-0 flex-wrap justify-start content-start mx-auto w-fit">
              {/* AI Tools Multi-select Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-aitools-dropdown">
                <button 
                  className="filter-dropdown-button"
                  onClick={() => {
                    setShowAIToolsDropdown(!showAIToolsDropdown);
                    setShowCategoryDropdown(false);
                    setShowSortDropdown(false);
                  }}
                >
                  <span>AI Tools</span>
                  {selectedAITools.length > 0 && (
                    <span className="filter-selection-counter" id="guides-aitools-counter">{selectedAITools.length}</span>
                  )}
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showAIToolsDropdown && (
                  <div className="filter-dropdown-menu">
                    {aiTools.map(tool => (
                      <div 
                        key={tool}
                        className="multi-select-item"
                        onClick={() => {
                          if (selectedAITools.includes(tool)) {
                            setSelectedAITools(selectedAITools.filter(t => t !== tool));
                          } else {
                            setSelectedAITools([...selectedAITools, tool]);
                          }
                        }}
                      >
                        <div className={`multi-select-checkbox ${selectedAITools.includes(tool) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{tool}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-category-dropdown">
                <button 
                  className="filter-dropdown-button"
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowAIToolsDropdown(false);
                    setShowSortDropdown(false);
                  }}
                >
                  <span>Category</span>
                  {selectedCategories.length > 0 && (
                    <span className="filter-selection-counter" id="guides-category-counter">{selectedCategories.length}</span>
                  )}
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showCategoryDropdown && (
                  <div className="filter-dropdown-menu">
                    <div 
                      className="multi-select-item"
                      onClick={() => {
                        setSelectedCategories([]);
                      }}
                    >
                      <div className={`multi-select-checkbox ${selectedCategories.length === 0 ? 'checked' : ''}`}></div>
                      <span className="multi-select-label">All Categories</span>
                    </div>
                    {GUIDE_CATEGORIES.map(category => (
                      <div 
                        key={category.value}
                        className="multi-select-item"
                        onClick={() => {
                          if (selectedCategories.includes(category.label)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.label));
                          } else {
                            setSelectedCategories([...selectedCategories, category.label]);
                          }
                        }}
                      >
                        <div className={`multi-select-checkbox ${selectedCategories.includes(category.label) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{category.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="filter-dropdown" id="guides-sort-dropdown">
                <button 
                  className="filter-dropdown-button"
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowAIToolsDropdown(false);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span>Sort By</span>
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showSortDropdown && (
                  <div className="filter-dropdown-menu">
                    <div 
                      className="filter-dropdown-item"
                      onClick={() => {
                        setSortBy('newest');
                        setShowSortDropdown(false);
                      }}
                    >
                      Newest
                    </div>
                    <div 
                      className="filter-dropdown-item"
                      onClick={() => {
                        setSortBy('popular');
                        setShowSortDropdown(false);
                      }}
                    >
                      Most Popular
                    </div>
                    <div 
                      className="filter-dropdown-item"
                      onClick={() => {
                        setSortBy('verified');
                        setShowSortDropdown(false);
                      }}
                    >
                      Recently Verified
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button className="filter-clear-button" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation-container">
          <div className="flex gap-4 border-b border-vybe-gray-800 justify-center">
            <button 
              onClick={() => setActiveTab('browse')} 
              className={`guides-tab ${activeTab === 'browse' ? 'active' : ''}`}
              data-tab="browse"
            >
              Browse Guides
            </button>
            <button 
              onClick={() => {
                setActiveTab('write');
                handleWriteGuide();
              }} 
              className={`guides-tab ${activeTab === 'write' ? 'active' : ''}`}
              data-tab="write"
            >
              Write Guide
            </button>
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
    </div>
  );
}