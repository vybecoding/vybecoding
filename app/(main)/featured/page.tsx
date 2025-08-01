'use client'

import React, { useState, useMemo } from 'react'
import { UniversalSearch } from '@/components/ui/search/UniversalSearch'
import { FilterDropdown, FilterContainer } from '@/components/ui/filter/FilterDropdown'
import { FeaturedCard } from '@/components/ui/card/FeaturedCard'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  FeaturedContent, 
  FeaturedFilters,
  FeaturedSearchSuggestion,
  CONTENT_TYPE_OPTIONS,
  MEMBER_TIER_OPTIONS,
  EXPERTISE_OPTIONS,
  SERVICE_OPTIONS,
  SORT_OPTIONS
} from '@/types/featured'

// Mock data matching the demo exactly
const MOCK_FEATURED_CONTENT: FeaturedContent[] = [
  {
    id: '1',
    type: 'guide',
    title: 'Building AI Agents with Claude 3.5',
    description: 'Complete guide to building autonomous AI agents using the latest Claude 3.5 API, including function calling and computer use.',
    author: {
      username: 'sarahchen',
      tier: 'PRO'
    },
    date: '01/16/25',
    verificationStatus: 'verified',
    tags: ['Advanced', 'Claude 3.5', 'AI Agents', 'Python'],
    stats: {
      likes: 156
    }
  },
  {
    id: '2',
    type: 'app',
    title: 'AI Code Review Assistant',
    description: 'Interactive tool that analyzes your code for bugs, suggests improvements, and explains best practices using Claude AI.',
    author: {
      username: 'devtools',
      tier: 'PRO'
    },
    date: '01/02/25',
    verificationStatus: 'needs-verification',
    tags: ['productivity', 'developer-tools', 'TypeScript'],
    stats: {
      likes: 89
    }
  },
  {
    id: '3',
    type: 'guide',
    title: 'ChatGPT Plugin Development',
    description: 'Build custom ChatGPT plugins using the original plugin system. Note: OpenAI has deprecated plugins in favor of GPTs.',
    author: {
      username: 'olddev'
    },
    date: '08/16/25',
    verificationStatus: 'possibly-outdated',
    tags: ['Intermediate', 'chatgpt', 'plugin-development', 'api-guide'],
    stats: {
      likes: 32
    }
  },
  {
    id: '4',
    type: 'guide',
    title: 'GPT-3 API Quick Start',
    description: 'Getting started with the GPT-3 API. Note: GPT-3 has been superseded by GPT-4 and GPT-4 Turbo.',
    author: {
      username: 'legacy'
    },
    date: '01/16/25',
    verificationStatus: 'likely-outdated',
    tags: ['Beginner', 'api-guide', 'openai', 'beginner'],
    stats: {
      likes: 23
    }
  },
  {
    id: '5',
    type: 'news',
    title: 'OpenAI Releases Claude 4.0 with Enhanced Reasoning',
    description: 'The latest Claude model brings significant improvements to reasoning capabilities and multimodal understanding, with enhanced performance across coding and analysis tasks.',
    author: {
      name: 'OpenAI Blog',
      username: 'openai-blog',
      isOfficial: true
    },
    date: '01/16/25',
    verificationStatus: 'verified',
    tags: ['AI News', 'Claude', 'Model Updates'],
    stats: {
      likes: 342
    }
  },
  {
    id: '6',
    type: 'guide',
    title: 'Advanced Claude API Mastery',
    description: 'Master advanced Claude API patterns including streaming, function calling, context management, and production deployment strategies.',
    author: {
      username: 'alexchen',
      tier: 'PRO',
      isTopCreator: true
    },
    date: '11/16/25',
    tags: ['Advanced', 'api', 'TypeScript'],
    stats: {
      likes: 127
    },
    isPremium: true,
    price: 25
  },
  {
    id: '7',
    type: 'app',
    title: 'AI Code Assistant Pro',
    description: 'Production-ready code assistant with advanced refactoring, test generation, and team collaboration features.',
    author: {
      username: 'buildtools',
      tier: 'PRO'
    },
    date: '01/10/25',
    tags: ['productivity', 'TypeScript'],
    stats: {
      likes: 285
    },
    isPremium: true,
    isPurchased: true,
    price: 49
  }
]

const MOCK_SUGGESTIONS: FeaturedSearchSuggestion[] = [
  { type: 'content', value: 'claude', label: 'Claude guides and apps' },
  { type: 'guide', value: 'ai-agents', label: 'AI agent tutorials' },
  { type: 'app', value: 'code-review', label: 'Code review tools' },
  { type: 'member', value: 'sarahchen', label: '@sarahchen (Pro member)' },
  { type: 'news', value: 'model-updates', label: 'Latest model updates' }
]

export default function FeaturedPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FeaturedFilters>({
    contentType: [],
    memberTier: [],
    expertise: [],
    services: [],
    sort: 'newest'
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSuggestionSelect = (suggestion: FeaturedSearchSuggestion) => {
    setSearchQuery(suggestion.label)
  }

  const handleFilterChange = (filterType: keyof FeaturedFilters, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      contentType: [],
      memberTier: [],
      expertise: [],
      services: [],
      sort: 'newest'
    })
    setSearchQuery('')
  }

  const filteredContent = useMemo(() => {
    let result = [...MOCK_FEATURED_CONTENT]

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply content type filter
    if (filters.contentType.length > 0 && !filters.contentType.includes('all')) {
      result = result.filter(item => {
        if (filters.contentType.includes('guides') && item.type === 'guide') return true
        if (filters.contentType.includes('apps') && item.type === 'app') return true
        if (filters.contentType.includes('announcements') && item.type === 'news') return true
        if (filters.contentType.includes('members') && item.type === 'member') return true
        if (filters.contentType.includes('trending') && item.stats.likes > 100) return true
        if (filters.contentType.includes('popular') && item.stats.likes > 200) return true
        if (filters.contentType.includes('featured') && item.verificationStatus === 'verified') return true
        return false
      })
    }

    // Apply member tier filter
    if (filters.memberTier.length > 0 && !filters.memberTier.includes('all')) {
      result = result.filter(item => {
        if (filters.memberTier.includes('pro') && item.author.tier === 'PRO') return true
        if (filters.memberTier.includes('free') && item.author.tier !== 'PRO') return true
        return false
      })
    }

    // Apply sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'popular':
        case 'likes':
          return b.stats.likes - a.stats.likes
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return result
  }, [searchQuery, filters])

  const handleContentClick = (content: FeaturedContent) => {
    // Handle navigation to content detail
    console.log('Navigate to:', content)
  }

  return (
    <div className="page-container nebula-background">
      {/* Nebula backgrounds */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-4">
            <span className="text-gradient-brand">Featured</span>
          </h1>
          <p className="text-vybe-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover featured members, trending guides, latest platform updates, and community highlights. 
            Everything noteworthy in the vybecoding.ai ecosystem.
          </p>
        </div>

        {/* Universal Search */}
        <div className="mb-8">
          <UniversalSearch
            placeholder="Search content, guides, apps, members, and news..."
            value={searchQuery}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            suggestions={MOCK_SUGGESTIONS}
          />
        </div>

        {/* Filters */}
        <FilterContainer onClearFilters={handleClearFilters}>
          <FilterDropdown
            label="Filter by"
            options={CONTENT_TYPE_OPTIONS}
            selected={filters.contentType}
            onSelectionChange={(values) => handleFilterChange('contentType', values)}
            multiSelect
          />
          <FilterDropdown
            label="Member Tier"
            options={MEMBER_TIER_OPTIONS}
            selected={filters.memberTier}
            onSelectionChange={(values) => handleFilterChange('memberTier', values)}
            multiSelect
          />
          <FilterDropdown
            label="Expertise"
            options={EXPERTISE_OPTIONS}
            selected={filters.expertise}
            onSelectionChange={(values) => handleFilterChange('expertise', values)}
            multiSelect
          />
          <FilterDropdown
            label="Services"
            options={SERVICE_OPTIONS}
            selected={filters.services}
            onSelectionChange={(values) => handleFilterChange('services', values)}
            multiSelect
          />
          <FilterDropdown
            label="Sort by"
            options={SORT_OPTIONS}
            selected={[filters.sort]}
            onSelectionChange={(values) => handleFilterChange('sort', [values[0] || 'newest'])}
          />
        </FilterContainer>

        {/* Featured Members System Notice */}
        <div className="mt-8">
          <div className="bg-vybe-purple/10 border border-vybe-purple/20 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center text-sm">
              <div className="mr-4 text-vybe-purple-light font-medium flex items-center gap-1 self-center">
                <Star className="w-4 h-4" fill="currentColor" />
                Featured members system:
              </div>
              <div className="flex-1 text-vybe-gray-300">
                <div>Top 3 spots reserved for Pro members. Featured status rotates fairly among active paying members.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <FeaturedCard
              key={content.id}
              content={content}
              onClick={handleContentClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-vybe-gray-400 text-lg mb-4">No content found matching your criteria</p>
            <button
              onClick={handleClearFilters}
              className="text-vybe-purple-light hover:text-vybe-purple transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}