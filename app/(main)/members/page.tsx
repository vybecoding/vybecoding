'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { UniversalSearch } from '@/components/ui/search/UniversalSearch'
import { FilterDropdown, FilterContainer } from '@/components/ui/filter/FilterDropdown'
import { DemoMemberCard } from '@/components/ui/card/DemoMemberCard'
import { 
  Member, 
  MemberFilters, 
  MemberSearchSuggestion,
  SKILL_OPTIONS,
  TIER_OPTIONS,
  SERVICE_OPTIONS,
  SORT_OPTIONS
} from '@/types/members'

// Demo data matching the exact content from demo page
const DEMO_MEMBERS: Member[] = [
  {
    id: '1',
    username: 'alexchen',
    name: 'Alex Chen', 
    title: 'Machine Learning Expert',
    bio: 'Pioneering next-generation AI systems and advancing machine learning capabilities',
    tier: 'PRO',
    stats: { guides: 8, apps: 3 },
    skills: ['Production AI', 'Python', 'Machine Learning'],
    isMentor: true,
    isTopMentor: true,
    mentorRating: 4.9,
    mentorReviews: 47,
    joinedDate: '2023-01-15'
  },
  {
    id: '2', 
    username: 'jamiedavis',
    name: 'Jamie Davis',
    title: 'Senior AI Developer',
    bio: 'Building AI-powered developer tools that enhance productivity and streamline workflows',
    tier: 'PRO',
    stats: { guides: 8, apps: 3 },
    skills: ['LangChain', 'Vector DBs', 'TypeScript'],
    isMentor: false,
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    username: 'mariaroberts', 
    name: 'Maria Roberts',
    title: 'Frontend Developer',
    bio: 'Creating beautiful and accessible user interfaces with modern React patterns',
    tier: 'PRO',
    stats: { guides: 5, apps: 2 },
    skills: ['React', 'Next.js', 'Tailwind'],
    isMentor: false,
    joinedDate: '2023-03-10'
  }
]

const SKILL_LABELS: Record<string, string> = {
  'ai-development': 'AI Development',
  'frontend': 'Frontend',
  'backend': 'Backend', 
  'devops': 'DevOps',
  'mobile': 'Mobile',
  'data-science': 'Data Science',
  'claude': 'Claude Expert',
  'design': 'UI/UX Design',
  'prompt': 'Prompt Engineering',
  'automation': 'Automation'
}

const TIER_LABELS: Record<string, string> = {
  'all': 'All Tiers',
  'free': 'Free',
  'pro': 'Pro'
}

const SERVICE_LABELS: Record<string, string> = {
  'all': 'All Services',
  'mentorship': 'Offering Mentorship',
  'collab': 'Open to Collab',
  'hiring': 'Hiring/Available',
  'consulting': 'Consulting'
}

const SORT_LABELS: Record<string, string> = {
  'newest': 'Newest First',
  'oldest': 'Oldest First',
  'popular': 'Most Popular',
  'active': 'Most Active',
  'contributions': 'Most Contributions'
}

export default function MembersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<MemberFilters>({
    skills: [],
    tier: [],
    services: [],
    sort: 'newest'
  })

  // Generate search suggestions
  const searchSuggestions = useMemo((): MemberSearchSuggestion[] => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    const suggestions: MemberSearchSuggestion[] = []

    // Member name suggestions
    DEMO_MEMBERS.forEach(member => {
      if (member.name.toLowerCase().includes(query) || member.username.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'member',
          value: member.username,
          label: member.name
        })
      }
    })

    // Skill suggestions  
    Object.entries(SKILL_LABELS).forEach(([value, label]) => {
      if (label.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'skill',
          value,
          label
        })
      }
    })

    return suggestions.slice(0, 8) // Limit suggestions
  }, [searchQuery])

  // Filter and sort members
  const filteredMembers = useMemo(() => {
    let result = [...DEMO_MEMBERS]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query) ||
        member.skills.some(skill => skill.toLowerCase().includes(query))
      )
    }

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter(member =>
        filters.skills.some(skill => 
          member.skills.some(memberSkill => 
            memberSkill.toLowerCase().includes(SKILL_LABELS[skill]?.toLowerCase() || skill)
          )
        )
      )
    }

    // Tier filter
    if (filters.tier.length > 0 && !filters.tier.includes('all')) {
      result = result.filter(member =>
        filters.tier.some(tier => member.tier.toLowerCase() === tier)
      )
    }

    // Services filter (mentorship, etc.)
    if (filters.services.length > 0 && !filters.services.includes('all')) {
      result = result.filter(member => {
        return filters.services.some(service => {
          switch (service) {
            case 'mentorship':
              return member.isMentor || member.isTopMentor
            case 'collab':
            case 'hiring':
            case 'consulting':
              // For demo purposes, return true for some members
              return Math.random() > 0.5
            default:
              return true
          }
        })
      })
    }

    // Sort
    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime())
        break
      case 'popular':
        result.sort((a, b) => (b.stats.guides + b.stats.apps) - (a.stats.guides + a.stats.apps))
        break
      case 'active':
        result.sort((a, b) => b.stats.guides - a.stats.guides)
        break
      case 'contributions':
        result.sort((a, b) => (b.stats.guides + b.stats.apps) - (a.stats.guides + a.stats.apps))
        break
    }

    return result
  }, [searchQuery, filters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSuggestionSelect = (suggestion: MemberSearchSuggestion) => {
    setSearchQuery(suggestion.label)
  }

  const handleFilterChange = (filterType: keyof MemberFilters, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }))
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilters({
      skills: [],
      tier: [],
      services: [],
      sort: 'newest'
    })
  }

  const handleMemberClick = (member: Member) => {
    // Navigate to the member's profile page
    router.push(`/profile/${member.username}`)
  }

  return (
    <div className="page-container nebula-background">
      {/* Nebula backgrounds */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="mx-auto px-4 sm:px-6 relative z-10" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-3 md:mb-4">
            <span className="gradient-text">Members</span>
          </h1>
          <p className="text-vybe-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Connect with AI developers, builders, and publishers. Learn from their apps, 
            collaborate on projects, and grow together.
          </p>
        </div>

        {/* Universal Search */}
        <div className="mb-6 md:mb-8">
          <UniversalSearch
            placeholder="Search members by name, skills, or expertise..."
            value={searchQuery}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            suggestions={searchSuggestions}
          />
        </div>

        {/* Search Filters */}
        <FilterContainer onClearFilters={handleClearFilters}>
          {/* Skills Multi-select */}
          <FilterDropdown
            label="Skills"
            options={SKILL_OPTIONS.map(skill => ({
              value: skill,
              label: SKILL_LABELS[skill] || skill
            }))}
            selected={filters.skills}
            onSelectionChange={(values) => handleFilterChange('skills', values)}
            multiSelect={true}
          />

          {/* Tier Multi-select */}
          <FilterDropdown
            label="Tier"
            options={TIER_OPTIONS.map(tier => ({
              value: tier,
              label: TIER_LABELS[tier] || tier
            }))}
            selected={filters.tier}
            onSelectionChange={(values) => handleFilterChange('tier', values)}
            multiSelect={true}
          />

          {/* Services Multi-select */}
          <FilterDropdown
            label="Services"
            options={SERVICE_OPTIONS.map(service => ({
              value: service,
              label: SERVICE_LABELS[service] || service
            }))}
            selected={filters.services}
            onSelectionChange={(values) => handleFilterChange('services', values)}
            multiSelect={true}
          />

          {/* Sort Dropdown */}
          <FilterDropdown
            label="Sort by"
            options={SORT_OPTIONS.map(sort => ({
              value: sort,
              label: SORT_LABELS[sort] || sort
            }))}
            selected={filters.sort ? [filters.sort] : []}
            onSelectionChange={(values) => handleFilterChange('sort', values)}
            multiSelect={false}
          />
        </FilterContainer>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMembers.map((member) => (
            <DemoMemberCard
              key={member.id}
              member={member}
              onClick={() => handleMemberClick(member)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-vybe-gray-400 text-lg">
              No members found matching your criteria.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-vybe-purple hover:bg-vybe-purple/80 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}