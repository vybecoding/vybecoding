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
});