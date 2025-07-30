import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Rate limiting helper
const checkRateLimit = async (ctx: any, userId: string) => {
  const now = Date.now();
  const dayStart = now - (24 * 60 * 60 * 1000); // 24 hours ago
  
  const recentSubmissions = await ctx.db
    .query("apps")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .filter((q: any) => q.gte(q.field("submittedAt"), dayStart))
    .collect();
    
  return recentSubmissions.length < 3; // Max 3 submissions per day
};

// Create a new app draft
export const createApp = mutation({
  args: {
    name: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    category: v.string(),
    tags: v.optional(v.array(v.string())),
    iconUrl: v.string(),
    screenshots: v.array(v.string()),
    demoVideoUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    appStoreUrl: v.optional(v.string()),
    playStoreUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    documentationUrl: v.optional(v.string()),
    techStack: v.array(v.string()),
    platforms: v.array(v.string()),
    license: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const now = Date.now();
    
    const appId = await ctx.db.insert("apps", {
      userId: user._id,
      ...args,
      status: "draft",
      statusHistory: [{
        status: "draft",
        timestamp: now,
      }],
      createdAt: now,
      updatedAt: now,
      views: 0,
      likes: 0,
    });

    return appId;
  },
});

// Update an existing app
export const updateApp = mutation({
  args: {
    id: v.id("apps"),
    name: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    iconUrl: v.optional(v.string()),
    screenshots: v.optional(v.array(v.string())),
    demoVideoUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    appStoreUrl: v.optional(v.string()),
    playStoreUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    documentationUrl: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    platforms: v.optional(v.array(v.string())),
    license: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const app = await ctx.db.get(args.id);
    if (!app) throw new Error("App not found");
    
    // Check ownership
    if (app.userId !== user._id) {
      throw new Error("Unauthorized: You can only edit your own apps");
    }

    // Only allow editing if status is draft or rejected
    if (app.status !== "draft" && app.status !== "rejected") {
      throw new Error("Cannot edit apps that are submitted or approved");
    }

    const { id, ...updateData } = args;
    
    await ctx.db.patch(args.id, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Submit app for review
export const submitApp = mutation({
  args: {
    id: v.id("apps"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const app = await ctx.db.get(args.id);
    if (!app) throw new Error("App not found");
    
    // Check ownership
    if (app.userId !== user._id) {
      throw new Error("Unauthorized: You can only submit your own apps");
    }

    // Check rate limit
    const canSubmit = await checkRateLimit(ctx, user._id);
    if (!canSubmit) {
      throw new Error("Rate limit exceeded: Maximum 3 submissions per day");
    }

    // Only allow submitting if status is draft or rejected
    if (app.status !== "draft" && app.status !== "rejected") {
      throw new Error("App is already submitted");
    }

    const now = Date.now();
    
    await ctx.db.patch(args.id, {
      status: "submitted",
      statusHistory: [
        ...app.statusHistory,
        {
          status: "submitted",
          timestamp: now,
        }
      ],
      submittedAt: now,
      updatedAt: now,
    });

    // TODO: Send email notification

    return args.id;
  },
});

// Get a single app
export const getApp = query({
  args: { id: v.id("apps") },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.id);
    if (!app) return null;

    // Get user details
    const user = await ctx.db.get(app.userId as Id<"users">);
    
    return {
      ...app,
      user: user ? {
        displayName: user.displayName || `${user.firstName} ${user.lastName}`.trim() || "Anonymous",
        avatar: user.avatar,
      } : null,
    };
  },
});

// Get apps by user
export const getUserApps = query({
  args: { 
    userId: v.optional(v.id("users")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    let userId = args.userId;
    
    // If no userId provided, get current user's apps
    if (!userId && identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();
      
      if (user) {
        userId = user._id;
      }
    }

    if (!userId) return [];

    let appsQuery = ctx.db
      .query("apps")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    // Apply status filter if provided
    if (args.status) {
      appsQuery = appsQuery.filter((q) => q.eq(q.field("status"), args.status));
    }

    const apps = await appsQuery.collect();
    
    return apps.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get single app by ID
export const getAppById = query({
  args: { appId: v.id("apps") },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.appId);
    if (!app) return null;

    // Get user details
    const user = await ctx.db.get(app.userId as Id<"users">);

    return {
      ...app,
      user: user ? {
        displayName: user.displayName || `${user.firstName} ${user.lastName}`.trim() || "Anonymous",
        username: user.username || "anonymous",
        avatar: user.avatar,
        isPro: user.isPro || false,
      } : null,
    };
  },
});

// Get app for editing (owner only)
export const getAppForEdit = query({
  args: { id: v.id("apps") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) return null;

    const app = await ctx.db.get(args.id);
    if (!app || app.userId !== user._id) return null;

    return app;
  },
});

// Increment app view count (separate mutation)
export const incrementAppViews = mutation({
  args: { appId: v.id("apps") },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.appId);
    if (!app) return;

    await ctx.db.patch(args.appId, {
      views: (app.views || 0) + 1
    });
  },
});

// Get approved apps with filtering
export const getApprovedApps = query({
  args: {
    category: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    platform: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let appsQuery = ctx.db
      .query("apps")
      .withIndex("by_status", (q) => q.eq("status", "approved"));

    // Apply category filter
    if (args.category) {
      appsQuery = appsQuery.filter((q) => q.eq(q.field("category"), args.category));
    }

    let apps = await appsQuery.collect();

    // Apply additional filters
    if (args.techStack && args.techStack.length > 0) {
      apps = apps.filter(app => 
        args.techStack!.some(tech => app.techStack.includes(tech))
      );
    }

    if (args.platform) {
      apps = apps.filter(app => app.platforms.includes(args.platform!));
    }

    if (args.searchTerm) {
      const search = args.searchTerm.toLowerCase();
      apps = apps.filter(app => 
        app.name.toLowerCase().includes(search) ||
        app.shortDescription.toLowerCase().includes(search) ||
        app.fullDescription.toLowerCase().includes(search)
      );
    }

    // Sort by creation date (newest first)
    apps.sort((a, b) => b.createdAt - a.createdAt);

    // Apply pagination
    const limit = args.limit || 20;
    const startIndex = args.cursor ? parseInt(args.cursor) : 0;
    const paginatedApps = apps.slice(startIndex, startIndex + limit);

    // Get user details for each app
    const appsWithUsers = await Promise.all(
      paginatedApps.map(async (app) => {
        const user = await ctx.db.get(app.userId as Id<"users">);
        return {
          ...app,
          user: user ? {
            displayName: user.displayName || `${user.firstName} ${user.lastName}`.trim() || "Anonymous",
            username: user.username || "anonymous",
            avatar: user.avatar,
            isPro: user.isPro || false,
          } : null,
        };
      })
    );

    return {
      apps: appsWithUsers,
      nextCursor: startIndex + limit < apps.length ? String(startIndex + limit) : null,
      hasMore: startIndex + limit < apps.length,
    };
  },
});

// Soft delete an app
export const deleteApp = mutation({
  args: {
    id: v.id("apps"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const app = await ctx.db.get(args.id);
    if (!app) throw new Error("App not found");
    
    // Check ownership
    if (app.userId !== user._id) {
      throw new Error("Unauthorized: You can only delete your own apps");
    }

    // Soft delete by setting status
    await ctx.db.patch(args.id, {
      status: "deleted",
      statusHistory: [
        ...app.statusHistory,
        {
          status: "deleted",
          timestamp: Date.now(),
        }
      ],
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Get app statistics for a user
export const getUserAppStats = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    let userId = args.userId;
    
    // If no userId provided, get current user's stats
    if (!userId && identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();
      
      if (user) {
        userId = user._id;
      }
    }

    if (!userId) return null;

    const apps = await ctx.db
      .query("apps")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const stats = {
      total: apps.length,
      draft: apps.filter(app => app.status === "draft").length,
      submitted: apps.filter(app => app.status === "submitted").length,
      approved: apps.filter(app => app.status === "approved").length,
      rejected: apps.filter(app => app.status === "rejected").length,
      totalViews: apps.reduce((sum, app) => sum + (app.views || 0), 0),
      totalLikes: apps.reduce((sum, app) => sum + (app.likes || 0), 0),
    };

    return stats;
  },
});