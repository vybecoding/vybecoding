export type ContentType = 'all' | 'guides' | 'apps' | 'members' | 'announcements' | 'trending' | 'popular' | 'featured'

export type MemberTier = 'all' | 'pro' | 'free'

export type Expertise = 'ai-dev' | 'claude' | 'fullstack' | 'frontend' | 'backend' | 'design' | 'prompt' | 'automation' | 'devops' | 'mobile' | 'data-science'

export type Service = 'all' | 'mentorship' | 'collab' | 'hiring' | 'consulting'

export type SortOption = 'newest' | 'oldest' | 'popular' | 'likes' | 'comments' | 'trending'

export type VerificationStatus = 'verified' | 'needs-verification' | 'possibly-outdated' | 'likely-outdated' | 'unverified'

export type FeaturedContentType = 'guide' | 'app' | 'news' | 'member' | 'announcement'

export interface FeaturedContent {
  id: string
  type: FeaturedContentType
  title: string
  description: string
  author: {
    username: string
    name?: string
    tier?: 'PRO' | 'FREE'
    isTopCreator?: boolean
    isOfficial?: boolean
  }
  date: string
  verificationStatus?: VerificationStatus
  tags: string[]
  stats: {
    likes: number
    views?: number
    comments?: number
  }
  isPremium?: boolean
  isPurchased?: boolean
  price?: number
}

export interface FeaturedFilters {
  contentType: ContentType[]
  memberTier: MemberTier[]
  expertise: Expertise[]
  services: Service[]
  sort: SortOption
}

export interface FeaturedSearchSuggestion {
  type: 'content' | 'guide' | 'app' | 'member' | 'news'
  value: string
  label: string
}

export interface FilterOption {
  value: string
  label: string
}

// Filter options for dropdowns
export const CONTENT_TYPE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Activity' },
  { value: 'guides', label: 'Guides' },
  { value: 'apps', label: 'Apps' },
  { value: 'members', label: 'Members' },
  { value: 'announcements', label: 'Announcements' },
  { value: 'trending', label: 'Trending Now' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'featured', label: 'Featured Only' }
]

export const MEMBER_TIER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Tiers' },
  { value: 'pro', label: 'Pro' },
  { value: 'free', label: 'Free' }
]

export const EXPERTISE_OPTIONS: FilterOption[] = [
  { value: 'ai-dev', label: 'AI Development' },
  { value: 'claude', label: 'Claude Expert' },
  { value: 'fullstack', label: 'Full-Stack' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'prompt', label: 'Prompt Engineering' },
  { value: 'automation', label: 'Automation' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'data-science', label: 'Data Science' }
]

export const SERVICE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Services' },
  { value: 'mentorship', label: 'Offering Mentorship' },
  { value: 'collab', label: 'Open to Collab' },
  { value: 'hiring', label: 'Hiring/Available' },
  { value: 'consulting', label: 'Consulting' }
]

export const SORT_OPTIONS: FilterOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'likes', label: 'Most Liked' },
  { value: 'comments', label: 'Most Comments' },
  { value: 'trending', label: 'Trending' }
]