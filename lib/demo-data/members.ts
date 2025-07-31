// Demo member data for development and testing
export const DEMO_MEMBERS_MAP: Record<string, any> = {
  alexchen: {
    _id: 'demo_1',
    clerkId: 'demo_user_alexchen',
    username: 'alexchen',
    displayName: 'Alex Chen',
    email: 'alex@demo.com',
    bio: 'Pioneering next-generation AI systems and advancing machine learning capabilities',
    avatar: null,
    location: 'San Francisco, CA',
    website: 'https://alexchen.dev',
    github: 'alexchen',
    twitter: 'alexchen_ai',
    linkedin: 'alexchen',
    skills: ['Production AI', 'Python', 'Machine Learning', 'TensorFlow', 'PyTorch'],
    profileVisibility: 'public',
    isProfileComplete: true,
    
    // Custom fields for demo
    title: 'Machine Learning Expert',
    tier: 'PRO',
    stats: {
      guides: 8,
      apps: 3,
      followers: 156,
      following: 89
    },
    isMentor: true,
    mentorRating: 4.9,
    mentorReviews: 47,
    joinedDate: '2023-01-15',
    lastActiveAt: Date.now(),
    
    // Activity feed for demo
    recentActivity: [
      { type: 'guide', title: 'Building RAG Systems with LangChain', date: '2 days ago' },
      { type: 'app', title: 'AI Code Review Assistant', date: '1 week ago' },
      { type: 'achievement', title: 'Reached 100 guide views', date: '2 weeks ago' }
    ]
  },
  
  jamiedavis: {
    _id: 'demo_2',
    clerkId: 'demo_user_jamiedavis',
    username: 'jamiedavis',
    displayName: 'Jamie Davis',
    email: 'jamie@demo.com',
    bio: 'Building AI-powered developer tools that enhance productivity and streamline workflows',
    avatar: null,
    location: 'Austin, TX',
    website: 'https://jamiedavis.io',
    github: 'jamiedavis',
    twitter: 'jamie_codes',
    skills: ['LangChain', 'Vector DBs', 'TypeScript', 'Node.js', 'React'],
    profileVisibility: 'public',
    isProfileComplete: true,
    
    title: 'Senior AI Developer',
    tier: 'PRO',
    stats: {
      guides: 8,
      apps: 3,
      followers: 98,
      following: 67
    },
    isMentor: false,
    joinedDate: '2023-02-20',
    lastActiveAt: Date.now(),
    
    recentActivity: [
      { type: 'guide', title: 'Vector Database Optimization Tips', date: '3 days ago' },
      { type: 'comment', title: 'Commented on "AI Workflow Automation"', date: '5 days ago' }
    ]
  },
  
  mariaroberts: {
    _id: 'demo_3', 
    clerkId: 'demo_user_mariaroberts',
    username: 'mariaroberts',
    displayName: 'Maria Roberts',
    email: 'maria@demo.com',
    bio: 'Creating beautiful and accessible user interfaces with modern React patterns',
    avatar: null,
    location: 'Seattle, WA',
    github: 'mariaroberts',
    skills: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Accessibility'],
    profileVisibility: 'public',
    isProfileComplete: true,
    
    title: 'Frontend Developer',
    tier: 'PRO',
    stats: {
      guides: 5,
      apps: 2,
      followers: 76,
      following: 103
    },
    isMentor: false,
    joinedDate: '2023-03-10',
    lastActiveAt: Date.now(),
    
    recentActivity: [
      { type: 'guide', title: 'Accessible Component Patterns', date: '1 day ago' },
      { type: 'app', title: 'UI Component Library', date: '1 week ago' }
    ]
  }
}

export function getDemoMember(username: string) {
  return DEMO_MEMBERS_MAP[username] || null;
}