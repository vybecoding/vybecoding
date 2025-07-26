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
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"]),

  // Example table - customize based on your needs
  messages: defineTable({
    body: v.string(),
    user: v.string(),
  }),
});