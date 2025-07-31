"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { GuideCard } from "@/components/ui/card/GuideCard";
import { GradientText } from "@/components/effects/GradientText";
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showFocusDropdown, setShowFocusDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.filter-dropdown')) {
        setShowAIToolsDropdown(false);
        setShowDifficultyDropdown(false);
        setShowFocusDropdown(false);
        setShowDurationDropdown(false);
        setShowSortDropdown(false);
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // AI Tools list matching demo exactly
  const aiTools = [
    'Claude', 'Claude Code', 'Claude API', 'ChatGPT', 
    'Cursor', 'Augment Code', 'GitHub Copilot', 'v0 by Vercel', 'Bolt',
    'Perplexity', 'Midjourney', 'DALL-E', 'Stable Diffusion'
  ];

  // Difficulty levels matching demo
  const difficultyLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Primary focus areas matching demo
  const focusAreas = ['All Focus Areas', 'Development', 'Design', 'Architecture', 'Automation', 'Integration', 'Optimization'];

  // Duration options matching demo
  const durationOptions = ['Any Duration', '0-15 mins', '15-30 mins', '30-60 mins', '60+ mins'];

  // Sort options matching demo
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending Now' },
    { value: 'rated', label: 'Highest Rated' },
    { value: 'views', label: 'Most Viewed' }
  ];

  // Fetch published guides with filters
  const guidesResult = useQuery(api.guides.getPublishedGuides, {
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
    setSelectedDifficulty([]);
    setSelectedFocus([]);
    setSelectedDuration([]);
    setSortBy("relevance");
  };

  const hasActiveFilters = searchTerm || selectedAITools.length > 0 || selectedDifficulty.length > 0 || selectedFocus.length > 0 || selectedDuration.length > 0;

  const toggleMultiSelect = (category: string, value: string) => {
    switch(category) {
      case 'guides-aitools':
        if (selectedAITools.includes(value)) {
          setSelectedAITools(selectedAITools.filter(t => t !== value));
        } else {
          setSelectedAITools([...selectedAITools, value]);
        }
        break;
      case 'guides-difficulty':
        if (selectedDifficulty.includes(value)) {
          setSelectedDifficulty(selectedDifficulty.filter(d => d !== value));
        } else {
          setSelectedDifficulty([...selectedDifficulty, value]);
        }
        break;
      case 'guides-focus':
        if (selectedFocus.includes(value)) {
          setSelectedFocus(selectedFocus.filter(f => f !== value));
        } else {
          setSelectedFocus([...selectedFocus, value]);
        }
        break;
      case 'guides-duration':
        if (selectedDuration.includes(value)) {
          setSelectedDuration(selectedDuration.filter(d => d !== value));
        } else {
          setSelectedDuration([...selectedDuration, value]);
        }
        break;
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    setShowAIToolsDropdown(dropdownName === 'guides-aitools' ? !showAIToolsDropdown : false);
    setShowDifficultyDropdown(dropdownName === 'guides-difficulty' ? !showDifficultyDropdown : false);
    setShowFocusDropdown(dropdownName === 'guides-focus' ? !showFocusDropdown : false);
    setShowDurationDropdown(dropdownName === 'guides-duration' ? !showDurationDropdown : false);
    setShowSortDropdown(dropdownName === 'guides-sort' ? !showSortDropdown : false);
  };

  const selectFilter = (category: string, value: string) => {
    if (category === 'guides-sort') {
      setSortBy(value);
      setShowSortDropdown(false);
    }
  };

  const showGuidesTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'submit') {
      handleWriteGuide();
    }
  };

  // Filter guides by multiple categories and AI tools if needed
  const filteredGuides = React.useMemo(() => {
    if (!guidesResult?.guides) return [];
    
    let guides = guidesResult.guides;
    
    // TODO: Filter by AI tools (would need to be added to guide schema)
    // if (selectedAITools.length > 0) {
    //   guides = guides.filter(guide => 
    //     guide.aiTools?.some((tool: string) => 
    //       selectedAITools.includes(tool)
    //     ) || false
    //   );
    // }
    
    // Filter by difficulty
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes('all levels')) {
      guides = guides.filter(guide => 
        selectedDifficulty.includes(guide.difficulty?.toLowerCase()) || false
      );
    }
    
    // TODO: Filter by focus area (would need to be added to guide schema)
    // if (selectedFocus.length > 0 && !selectedFocus.includes('all focus areas')) {
    //   guides = guides.filter(guide => 
    //     guide.focusArea && selectedFocus.includes(guide.focusArea.toLowerCase()) || false
    //   );
    // }
    
    // TODO: Filter by duration (would need to be added to guide schema)
    // if (selectedDuration.length > 0 && !selectedDuration.includes('any duration')) {
    //   guides = guides.filter(guide => 
    //     guide.duration && selectedDuration.some(dur => 
    //       guide.duration?.includes(dur.replace(/\s+mins?/, '')) || false
    //     ) || false
    //   );
    // }
    
    return guides;
  }, [guidesResult?.guides, selectedAITools, selectedDifficulty, selectedFocus, selectedDuration]);

  // Use search results if searching, otherwise use filtered results
  const displayGuides = searchTerm && searchResults 
    ? searchResults 
    : filteredGuides;

  return (
    <div className="page-container nebula-background">
      {/* Nebula backgrounds handled by CSS */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <style jsx>{`
        /* Force proper vertical centering for Advanced badge */
        .minimal-card span.bg-red-500\/10 {
          display: inline-flex !important;
          align-items: center !important;
          padding: 0.375rem 0.5rem !important;
          line-height: 1 !important;
          font-size: 0.75rem !important;
          height: auto !important;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
            <GradientText gradient="brand">Guides</GradientText>
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
          />
          <button className="btn btn-primary-purple universal-search-submit">Search</button>
          
          {/* Search Suggestions Dropdown */}
          <div className="search-suggestions" id="guides-search-suggestions">
            {/* Dynamically populated */}
          </div>
        </div>

        {/* Search Filter Dropdowns */}
        <div className="search-filter-container mb-8">
          <div className="flex flex-col gap-0">
            {/* Filters Row */}
            <div className="flex flex-wrap justify-center content-start mx-auto w-fit" style={{ gap: '8px' }}>
              {/* AI Tools Multi-select Dropdown (Primary Filter) */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-aitools-dropdown">
                <button className="filter-dropdown-button mr-2" onClick={() => toggleDropdown('guides-aitools')}>
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
                      <div key={tool} className="multi-select-item" onClick={() => toggleMultiSelect('guides-aitools', tool.toLowerCase())}>
                        <div className={`multi-select-checkbox ${selectedAITools.includes(tool.toLowerCase()) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{tool}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Difficulty Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-difficulty-dropdown">
                <button className="filter-dropdown-button mr-2" onClick={() => toggleDropdown('guides-difficulty')}>
                  <span>Difficulty</span>
                  {selectedDifficulty.length > 0 && (
                    <span className="filter-selection-counter" id="guides-difficulty-counter">{selectedDifficulty.length}</span>
                  )}
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showDifficultyDropdown && (
                  <div className="filter-dropdown-menu">
                    {difficultyLevels.map(level => (
                      <div key={level} className="multi-select-item" onClick={() => toggleMultiSelect('guides-difficulty', level.toLowerCase())}>
                        <div className={`multi-select-checkbox ${selectedDifficulty.includes(level.toLowerCase()) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{level}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Focus Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-focus-dropdown">
                <button className="filter-dropdown-button mr-2" onClick={() => toggleDropdown('guides-focus')}>
                  <span>Primary Focus</span>
                  {selectedFocus.length > 0 && (
                    <span className="filter-selection-counter" id="guides-focus-counter">{selectedFocus.length}</span>
                  )}
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showFocusDropdown && (
                  <div className="filter-dropdown-menu">
                    {focusAreas.map(area => (
                      <div key={area} className="multi-select-item" onClick={() => toggleMultiSelect('guides-focus', area.toLowerCase())}>
                        <div className={`multi-select-checkbox ${selectedFocus.includes(area.toLowerCase()) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{area}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="guides-duration-dropdown">
                <button className="filter-dropdown-button mr-2" onClick={() => toggleDropdown('guides-duration')}>
                  <span>Duration</span>
                  {selectedDuration.length > 0 && (
                    <span className="filter-selection-counter" id="guides-duration-counter">{selectedDuration.length}</span>
                  )}
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showDurationDropdown && (
                  <div className="filter-dropdown-menu">
                    {durationOptions.map(duration => (
                      <div key={duration} className="multi-select-item" onClick={() => toggleMultiSelect('guides-duration', duration.toLowerCase())}>
                        <div className={`multi-select-checkbox ${selectedDuration.includes(duration.toLowerCase()) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="filter-dropdown" id="guides-sort-dropdown">
                <button className="filter-dropdown-button mr-2" onClick={() => toggleDropdown('guides-sort')}>
                  <span>Sort By</span>
                  <svg className="filter-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {showSortDropdown && (
                  <div className="filter-dropdown-menu">
                    {sortOptions.map(option => (
                      <div key={option.value} className="filter-dropdown-item" onClick={() => selectFilter('guides-sort', option.value)}>
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              <button className="filter-clear-button ml-1" onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation-container">
          <div className="flex gap-4 border-b border-vybe-gray-800 justify-center">
            <button onClick={() => showGuidesTab('browse')} className={`guides-tab ${activeTab === 'browse' ? 'active' : ''}`} data-tab="browse">
              Browse Guides
            </button>
            <button onClick={() => showGuidesTab('submit')} className={`guides-tab ${activeTab === 'submit' ? 'active' : ''}`} data-tab="submit">
              Submit Guide
            </button>
          </div>
        </div>

        {/* Content for tabs will be loaded here */}
        <div id="guides-content-container">
          {activeTab === 'browse' && (
            <>
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
            </>
          )}
        </div>

      </div>
    </div>
  );
}