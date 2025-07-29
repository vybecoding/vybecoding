import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    stripeCustomerId: v.union(v.string(), v.null()),
    subscriptionStatus: v.union(
      v.literal("free"),
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due")
    ),
    createdAt: v.number(),
    
    // Profile fields
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()), // URL to uploaded image
    location: v.optional(v.string()),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    skills: v.optional(v.array(v.string())), // Array of technology tags
    profileVisibility: v.optional(v.union(
      v.literal("public"),
      v.literal("private"),
      v.literal("members-only")
    )),
    isProfileComplete: v.optional(v.boolean()),
    profileCompletedAt: v.optional(v.number()),
    lastActiveAt: v.optional(v.number()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"])
    .index("by_display_name", ["displayName"])
    .index("by_skills", ["skills"]),

  // Example table - customize based on your needs
  messages: defineTable({
    body: v.string(),
    user: v.string(),
  }),

  // Apps submission system
  apps: defineTable({
    // Creator info
    userId: v.string(),
    
    // Basic info
    name: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    category: v.string(),
    tags: v.optional(v.array(v.string())),
    
    // Visual assets
    iconUrl: v.string(),
    screenshots: v.array(v.string()),
    demoVideoUrl: v.optional(v.string()),
    
    // Links
    liveUrl: v.optional(v.string()),
    appStoreUrl: v.optional(v.string()),
    playStoreUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    documentationUrl: v.optional(v.string()),
    
    // Technical
    techStack: v.array(v.string()),
    platforms: v.array(v.string()),
    license: v.string(),
    
    // Metadata
    status: v.string(), // draft, submitted, in-review, approved, rejected
    statusHistory: v.array(v.object({
      status: v.string(),
      timestamp: v.number(),
      reason: v.optional(v.string())
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
    submittedAt: v.optional(v.number()),
    approvedAt: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    views: v.optional(v.number()),
    likes: v.optional(v.number())
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_created", ["createdAt"]),

  // Guides publishing system
  guides: defineTable({
    // Author info
    authorId: v.id("users"),
    
    // Content
    title: v.string(),
    slug: v.string(),
    content: v.string(), // Markdown content
    excerpt: v.string(), // Auto-generated or custom
    
    // Metadata
    category: v.string(),
    tags: v.array(v.string()),
    difficulty: v.string(), // beginner, intermediate, advanced
    readingTime: v.number(), // Estimated minutes
    
    // SEO
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoImage: v.optional(v.string()),
    
    // Organization
    seriesId: v.optional(v.string()),
    seriesOrder: v.optional(v.number()),
    
    // Status
    status: v.string(), // draft, published, unpublished
    publishedAt: v.optional(v.number()),
    scheduledAt: v.optional(v.number()),
    
    // Versioning
    versions: v.array(v.object({
      content: v.string(),
      title: v.string(),
      savedAt: v.number(),
      wordCount: v.number()
    })),
    
    // Analytics
    views: v.number(),
    uniqueReaders: v.number(),
    totalReadingTime: v.number(),
    completions: v.number(),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    lastEditedAt: v.number()
  })
    .index("by_author", ["authorId"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_published", ["publishedAt"])
    .index("by_slug", ["slug"]),

  guideSeries: defineTable({
    name: v.string(),
    description: v.string(),
    authorId: v.id("users"),
    coverImage: v.optional(v.string()),
    createdAt: v.number()
  })
    .index("by_author", ["authorId"]),

  guideReadingProgress: defineTable({
    guideId: v.id("guides"),
    userId: v.id("users"),
    progress: v.number(), // 0-100 percentage
    lastReadAt: v.number(),
    bookmarked: v.boolean(),
    completed: v.boolean()
  })
    .index("by_user", ["userId"])
    .index("by_guide", ["guideId"])
    .index("by_user_guide", ["userId", "guideId"]),
});