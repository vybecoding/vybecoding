import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      stripeCustomerId: null,
      subscriptionStatus: "free",
      createdAt: Date.now(),
      
      // Initialize profile defaults
      profileVisibility: "public",
      isProfileComplete: false,
      lastActiveAt: Date.now(),
      skills: [],
    });
  },
});

export const updateStripeCustomerId = mutation({
  args: {
    clerkId: v.string(),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      stripeCustomerId: args.stripeCustomerId,
    });
  },
});

export const updateSubscriptionStatus = mutation({
  args: {
    stripeCustomerId: v.string(),
    subscriptionStatus: v.union(
      v.literal("free"),
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due")
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_stripe_customer_id", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      subscriptionStatus: args.subscriptionStatus,
    });
  },
});

// Profile-specific functions
export const updateUserProfile = mutation({
  args: {
    clerkId: v.string(),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()),
    location: v.optional(v.string()),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    profileVisibility: v.optional(v.union(
      v.literal("public"),
      v.literal("private"),
      v.literal("members-only")
    )),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const updateFields: any = {
      lastActiveAt: Date.now(),
    };

    // Only update provided fields
    if (args.displayName !== undefined) updateFields.displayName = args.displayName;
    if (args.bio !== undefined) updateFields.bio = args.bio;
    if (args.avatar !== undefined) updateFields.avatar = args.avatar;
    if (args.location !== undefined) updateFields.location = args.location;
    if (args.website !== undefined) updateFields.website = args.website;
    if (args.github !== undefined) updateFields.github = args.github;
    if (args.linkedin !== undefined) updateFields.linkedin = args.linkedin;
    if (args.twitter !== undefined) updateFields.twitter = args.twitter;
    if (args.skills !== undefined) updateFields.skills = args.skills;
    if (args.profileVisibility !== undefined) updateFields.profileVisibility = args.profileVisibility;

    // Check if profile is complete
    const hasBasicInfo = args.displayName || user.displayName;
    const hasBio = args.bio || user.bio;
    const hasSkills = (args.skills && args.skills.length > 0) || (user.skills && user.skills.length > 0);
    
    if (hasBasicInfo && hasBio && hasSkills) {
      updateFields.isProfileComplete = true;
      if (!user.profileCompletedAt) {
        updateFields.profileCompletedAt = Date.now();
      }
    }

    await ctx.db.patch(user._id, updateFields);
    return user._id;
  },
});

export const getUserProfile = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const getUserPublicProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      return null;
    }

    // Only return profile if it's public or members-only (assuming authenticated users are members)
    if (user.profileVisibility === "private") {
      return null;
    }

    // Remove sensitive information
    const { stripeCustomerId, subscriptionStatus, ...publicProfile } = user;
    return publicProfile;
  },
});

export const getUserByDisplayName = query({
  args: { displayName: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_display_name", (q) => q.eq("displayName", args.displayName))
      .unique();

    if (!user || user.profileVisibility === "private") {
      return null;
    }

    // Remove sensitive information
    const { stripeCustomerId, subscriptionStatus, ...publicProfile } = user;
    return publicProfile;
  },
});

export const searchUsersBySkills = query({
  args: { 
    skills: v.array(v.string()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    
    const allUsers = await ctx.db
      .query("users")
      .filter((q) => {
        // Filter users who have public/members-only visibility
        return q.neq(q.field("profileVisibility"), "private");
      })
      .collect();

    // Filter users who have at least one matching skill
    const matchingUsers = allUsers.filter(user => 
      user.skills && user.skills.some(skill => args.skills.includes(skill))
    );

    // Take only the requested limit
    const users = matchingUsers.slice(0, limit);

    // Remove sensitive information
    return users.map(user => {
      const { stripeCustomerId, subscriptionStatus, ...publicProfile } = user;
      return publicProfile;
    });
  },
});

export const uploadProfileAvatar = mutation({
  args: {
    clerkId: v.string(),
    avatarUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      avatar: args.avatarUrl,
      lastActiveAt: Date.now(),
    });

    return args.avatarUrl;
  },
});