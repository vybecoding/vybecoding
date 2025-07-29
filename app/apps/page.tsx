"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Container } from "@/components/ui/layout";
import { AppGrid } from "@/components/apps/AppGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { APP_CATEGORIES, TECH_STACK_OPTIONS, PLATFORM_OPTIONS } from "@/lib/constants/apps";
import { Search, Filter, Plus, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AppsPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch approved apps with filters
  const appsResult = useQuery(api.apps.getApprovedApps, {
    category: selectedCategory || undefined,
    techStack: selectedTechStack.length > 0 ? selectedTechStack : undefined,
    platform: selectedPlatform || undefined,
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

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTechStack([]);
    setSelectedPlatform("");
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTechStack.length > 0 || selectedPlatform;

  return (
    <Container className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Discover Apps
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore amazing apps built by the VybeCoding community
            </p>
          </div>
          
          <Button onClick={handleSubmitApp} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit Your App
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
                placeholder="Search apps..."
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
                      {APP_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select
                    value={selectedPlatform}
                    onValueChange={setSelectedPlatform}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All platforms</SelectItem>
                      {PLATFORM_OPTIONS.map(platform => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tech Stack Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tech Stack</label>
                  <div className="flex flex-wrap gap-1">
                    {selectedTechStack.map(tech => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleTechStackToggle(tech)}
                      >
                        {tech} ×
                      </Badge>
                    ))}
                    {selectedTechStack.length === 0 && (
                      <span className="text-sm text-gray-500">
                        Click technologies below to filter
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech Stack Selection */}
              <div className="space-y-2">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium">
                    Select Technologies
                  </summary>
                  <div className="mt-2 space-y-3">
                    {Object.entries(TECH_STACK_OPTIONS).map(([category, techs]) => (
                      <div key={category}>
                        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 capitalize">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {techs.slice(0, 8).map(tech => (
                            <Badge
                              key={tech}
                              variant={selectedTechStack.includes(tech) ? "default" : "outline"}
                              className="cursor-pointer text-xs"
                              onClick={() => handleTechStackToggle(tech)}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* Apps Grid */}
        {appsResult ? (
          <AppGrid
            apps={appsResult.apps}
            loading={false}
            emptyMessage={
              hasActiveFilters
                ? "No apps found matching your filters. Try adjusting your search criteria."
                : "No apps have been submitted yet. Be the first to share your app!"
            }
          />
        ) : (
          <AppGrid apps={[]} loading={true} />
        )}

        {/* Load More */}
        {appsResult?.hasMore && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Apps
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}