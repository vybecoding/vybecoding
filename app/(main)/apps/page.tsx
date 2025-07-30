"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { APP_CATEGORIES, TECH_STACK_OPTIONS, PLATFORM_OPTIONS } from "@/lib/constants/apps";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SkeletonGrid } from "@/components/ui/loading/SkeletonCard";

// App Card Component - Matching demo exactly
function AppCard({ app }: { app: any }) {
  const router = useRouter();
  
  // Format date as MM/DD/YY
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
  };

  const handleClick = () => {
    router.push(`/apps/${app._id}`);
  };

  // Determine verification status
  const isVerified = app.status === 'approved' && app.verified;
  const needsVerification = app.status === 'approved' && !app.verified;
  const isPurchased = app.purchased || false;
  const price = app.pricing === 'paid' ? app.price || 35 : null;

  return (
    <div 
      className={`minimal-card rounded-lg p-5 transition-all cursor-pointer group flex flex-col relative ${
        needsVerification ? 'card-needs-verification' : ''
      }`}
      onClick={handleClick}
    >
      {/* Type label */}
      <span 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          padding: '0.375rem 0.5rem', 
          paddingTop: '0.5rem', 
          background: 'rgba(236, 72, 153, 0.5625)', 
          color: 'rgba(255, 255, 255, 1)', 
          fontSize: '0.844rem', 
          fontWeight: 600, 
          textTransform: 'uppercase', 
          borderRadius: '0 0 0.625rem 0', 
          zIndex: 20, 
          lineHeight: 1, 
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)', 
          letterSpacing: '0.25px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: 'auto'
        }}
      >
        APP
      </span>
      
      {/* Title and creator */}
      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-vybe-orange transition-colors">
        {app.name}
      </h3>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gradient-to-br from-vybe-orange to-vybe-pink rounded-full"></div>
        <span className="text-sm text-vybe-gray-400">
          @{app.user?.username || 'anonymous'}
          {app.user?.isPro && (
            <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">PRO</span>
          )}
        </span>
        <span className="text-vybe-gray-500">•</span>
        <div className="flex items-center gap-1 text-sm text-vybe-gray-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{formatDate(app.createdAt)}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-vybe-gray-400 mb-4 line-clamp-2">
        {app.shortDescription}
      </p>
      
      {/* App Tags and Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Category tag */}
        <span className="px-2 py-1 bg-vybe-pink/10 border border-vybe-pink/20 text-vybe-pink text-xs rounded">
          {app.category.toLowerCase().replace(/ /g, '-')}
        </span>
        {/* Tech stack tags */}
        {app.techStack?.slice(0, 2).map((tech: string) => (
          <span key={tech} className="px-2 py-1 bg-vybe-pink/10 border border-vybe-pink/20 text-vybe-pink text-xs rounded">
            {tech}
          </span>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-800/50 mt-auto">
        <div className="flex items-center gap-1 text-xs">
          {needsVerification && (
            <>
              <span className="text-xs">⚪</span>
              <span className="text-vybe-gray-500">Needs verification</span>
            </>
          )}
          {isVerified && !isPurchased && price && (
            <>
              <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01-.567-3.677A1.99 1.99 0 0112 14a1.99 1.99 0 011.567.046 1.993 1.993 0 01-.567 3.677z"/>
              </svg>
              <span className="text-amber-500">Premium • ${price}</span>
            </>
          )}
          {isPurchased && (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span className="text-green-500">Purchased</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-vybe-gray-400">
            <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{app.likes || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppsPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.filter-dropdown')) {
        setShowCategoryDropdown(false);
        setShowSortDropdown(false);
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch approved apps with filters
  const appsResult = useQuery(api.apps.getApprovedApps, {
    category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    searchTerm: searchTerm || undefined,
    limit: 20,
  });

  // Filter apps by multiple categories if needed
  const filteredApps = React.useMemo(() => {
    if (!appsResult?.apps) return [];
    
    if (selectedCategories.length === 0 || selectedCategories.length === 1) {
      return appsResult.apps;
    }
    
    // Filter by multiple categories
    return appsResult.apps.filter(app => 
      selectedCategories.includes(app.category)
    );
  }, [appsResult?.apps, selectedCategories]);

  const handleSubmitApp = () => {
    if (isSignedIn) {
      router.push("/apps/submit");
    } else {
      router.push("/sign-in?redirect=/apps/submit");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedPlatforms([]);
    setSelectedTechStack([]);
    setSortBy("relevance");
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || selectedPlatforms.length > 0 || selectedTechStack.length > 0;

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending Now' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'views', label: 'Most Viewed' }
  ];

  const performSearch = () => {
    if (searchTerm.trim()) {
      // Filter apps based on search term
      const filtered = filteredApps.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="page-container bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">
            <span className="gradient-text">Apps</span>
          </h1>
          <p className="text-vybe-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover AI-built projects, applications, and tools. Live demos, source code, 
            and the exact prompts used to create them.
          </p>
        </div>

        {/* Universal Search */}
        <div className="universal-search mb-8">
          <svg className="universal-search-icon w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="search" 
            placeholder="Search AI-built projects, apps, tools, and showcases..." 
            className="universal-search-input"
            id="apps-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button 
            className="btn btn-primary-purple universal-search-submit" 
            onClick={performSearch}
          >
            Search
          </button>
          
          {/* Search Suggestions Dropdown */}
          <div className="search-suggestions" id="apps-search-suggestions">
            {/* Dynamically populated */}
          </div>
        </div>

        {/* Search Filter Dropdowns */}
        <div className="search-filter-container mb-8">
          <div className="flex flex-col gap-4">
            {/* Active Filters Display */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedCategories.map(category => (
                  <span 
                    key={category}
                    className="px-3 py-1 bg-vybe-pink/20 text-vybe-pink text-sm rounded-full border border-vybe-pink/30 flex items-center gap-2"
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
              {/* Category Dropdown */}
              <div className="filter-dropdown multi-select-dropdown" id="apps-category-dropdown">
                <button 
                  className="filter-dropdown-button"
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowSortDropdown(false);
                  }}
                >
                  <span>Category</span>
                  {selectedCategories.length > 0 && (
                    <span className="filter-selection-counter" id="apps-category-counter">{selectedCategories.length}</span>
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
                    {APP_CATEGORIES.map(category => (
                      <div 
                        key={category}
                        className="multi-select-item"
                        onClick={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                      >
                        <div className={`multi-select-checkbox ${selectedCategories.includes(category) ? 'checked' : ''}`}></div>
                        <span className="multi-select-label">{category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="filter-dropdown" id="apps-sort-dropdown">
                <button 
                  className="filter-dropdown-button"
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
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
                    {sortOptions.map(option => (
                      <div 
                        key={option.value}
                        className="filter-dropdown-item"
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
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
              className={`apps-tab ${activeTab === 'browse' ? 'active' : ''}`}
              data-tab="browse"
            >
              Browse Apps
            </button>
            <button 
              onClick={() => {
                setActiveTab('submit');
                handleSubmitApp();
              }} 
              className={`apps-tab ${activeTab === 'submit' ? 'active' : ''}`}
              data-tab="submit"
            >
              Submit App
            </button>
          </div>
        </div>

        {/* Content for tabs will be loaded here */}
        <div id="apps-content-container">
          <div id="apps-browse-content" className="apps-tab-content">
            {/* Search Results Section (Hidden by default) */}
            {showSearchResults && (
              <div id="sites-search-results" className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light">Search Results</h2>
                  <p className="text-sm text-vybe-gray-400">
                    <span id="apps-result-count">{searchResults.length}</span> results found
                  </p>
                </div>
                <div id="apps-results-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((app) => (
                    <AppCard key={app._id} app={app} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Header Section */}
            {/* Apps Grid - Universal Design */}
            {!showSearchResults && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appsResult === undefined ? (
                  <div className="col-span-full py-8">
                    <SkeletonGrid count={6} />
                  </div>
                ) : appsResult === null ? (
                  <div className="col-span-full text-center py-20">
                    <p className="text-red-400 text-lg">
                      Error loading apps. Please try again later.
                    </p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-4 px-6 py-2 bg-vybe-pink/20 text-vybe-pink border border-vybe-pink/20 rounded-lg hover:bg-vybe-pink/30 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <AppCard key={app._id} app={app} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-gray-400 text-lg">
                      {hasActiveFilters
                        ? "No apps found matching your filters. Try adjusting your search criteria."
                        : "No apps have been submitted yet. Be the first to share your app!"}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Load More */}
            {appsResult?.hasMore && !showSearchResults && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-black/60 backdrop-blur-lg border border-gray-700/40 rounded-lg text-white hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-200">
                  Load More Apps
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}