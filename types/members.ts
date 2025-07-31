export interface Member {
  id: string
  username: string
  name: string
  title: string
  avatar?: string
  bio: string
  tier: 'FREE' | 'PRO'
  stats: {
    guides: number
    apps: number
  }
  skills: string[]
  specialTags?: string[]
  isMentor?: boolean
  mentorRating?: number
  mentorReviews?: number
  joinedDate: string
  isTopMentor?: boolean
}

export interface MemberFilters {
  skills: string[]
  tier: string[]
  services: string[]
  sort: string
}

export interface MemberSearchSuggestion {
  type: 'member' | 'skill' | 'expertise'
  value: string
  label: string
}

export const SKILL_OPTIONS = [
  'ai-development',
  'frontend',
  'backend',
  'devops',
  'mobile',
  'data-science',
  'claude',
  'design',
  'prompt',
  'automation'
] as const

export const TIER_OPTIONS = [
  'all',
  'free',
  'pro'
] as const

export const SERVICE_OPTIONS = [
  'all',
  'mentorship',
  'collab',
  'hiring',
  'consulting'
] as const

export const SORT_OPTIONS = [
  'newest',
  'oldest', 
  'popular',
  'active',
  'contributions'
] as const

export type SkillOption = typeof SKILL_OPTIONS[number]
export type TierOption = typeof TIER_OPTIONS[number]
export type ServiceOption = typeof SERVICE_OPTIONS[number]
export type SortOption = typeof SORT_OPTIONS[number]