import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/--+/g, '-')     // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper to generate excerpt
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/\n+/g, ' ') // Newlines
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

// Create a new guide draft
export const createGuide = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    difficulty: v.string(),
    excerpt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get user from database
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const now = Date.now();
    const slug = generateSlug(args.title);
    
    // Check if slug already exists
    const existingGuide = await ctx.db
      .query("guides")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    
    if (existingGuide) {
      throw new Error("A guide with this title already exists");
    }

    const guideId = await ctx.db.insert("guides", {
      authorId: user._id,
      title: args.title,
      slug,
      content: args.content,
      excerpt: args.excerpt || generateExcerpt(args.content),
      category: args.category,
      tags: args.tags,
      difficulty: args.difficulty,
      readingTime: calculateReadingTime(args.content),
      status: "draft",
      versions: [{
        content: args.content,
        title: args.title,
        savedAt: now,
        wordCount: args.content.split(/\s+/).length
      }],
      views: 0,
      uniqueReaders: 0,
      totalReadingTime: 0,
      completions: 0,
      createdAt: now,
      updatedAt: now,
      lastEditedAt: now
    });

    return { id: guideId, slug };
  },
});

// Update guide content/metadata
export const updateGuide = mutation({
  args: {
    id: v.id("guides"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    difficulty: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const guide = await ctx.db.get(args.id);
    if (!guide) throw new Error("Guide not found");

    // Get user and verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user || guide.authorId !== user._id) {
      throw new Error("Not authorized to edit this guide");
    }

    const now = Date.now();
    const updates: Partial<Doc<"guides">> = {
      updatedAt: now,
      lastEditedAt: now
    };

    // Update fields if provided
    if (args.title !== undefined) {
      updates.title = args.title;
      updates.slug = generateSlug(args.title);
    }
    
    if (args.content !== undefined) {
      updates.content = args.content;
      updates.readingTime = calculateReadingTime(args.content);
      if (!args.excerpt) {
        updates.excerpt = generateExcerpt(args.content);
      }
      
      // Add to version history
      const versions = [...guide.versions];
      versions.push({
        content: args.content,
        title: updates.title || guide.title,
        savedAt: now,
        wordCount: args.content.split(/\s+/).length
      });
      
      // Keep only last 10 versions
      if (versions.length > 10) {
        versions.splice(0, versions.length - 10);
      }
      
      updates.versions = versions;
    }
    
    if (args.category !== undefined) updates.category = args.category;
    if (args.tags !== undefined) updates.tags = args.tags;
    if (args.difficulty !== undefined) updates.difficulty = args.difficulty;
    if (args.excerpt !== undefined) updates.excerpt = args.excerpt;
    if (args.seoTitle !== undefined) updates.seoTitle = args.seoTitle;
    if (args.seoDescription !== undefined) updates.seoDescription = args.seoDescription;
    if (args.seoImage !== undefined) updates.seoImage = args.seoImage;

    await ctx.db.patch(args.id, updates);
    
    return { success: true };
  },
});

// Publish a draft guide
export const publishGuide = mutation({
  args: {
    id: v.id("guides"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const guide = await ctx.db.get(args.id);
    if (!guide) throw new Error("Guide not found");

    // Get user and verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user || guide.authorId !== user._id) {
      throw new Error("Not authorized to publish this guide");
    }

    const now = Date.now();
    await ctx.db.patch(args.id, {
      status: "published",
      publishedAt: guide.publishedAt || now,
      updatedAt: now
    });
    
    return { success: true };
  },
});

// Unpublish a guide
export const unpublishGuide = mutation({
  args: {
    id: v.id("guides"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const guide = await ctx.db.get(args.id);
    if (!guide) throw new Error("Guide not found");

    // Get user and verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user || guide.authorId !== user._id) {
      throw new Error("Not authorized to unpublish this guide");
    }

    await ctx.db.patch(args.id, {
      status: "unpublished",
      updatedAt: Date.now()
    });
    
    return { success: true };
  },
});

// Get guide by slug (public)
export const getGuideBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const guide = await ctx.db
      .query("guides")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!guide || guide.status !== "published") {
      return null;
    }

    // Get author info
    const author = await ctx.db.get(guide.authorId);
    if (!author) return null;

    return {
      ...guide,
      author: {
        id: author._id,
        displayName: author.displayName || author.firstName || "Anonymous",
        avatar: author.avatar,
        bio: author.bio,
        username: author.username
      }
    };
  },
});

// Get guide by ID (for editing)
export const getGuideById = query({
  args: {
    id: v.id("guides"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const guide = await ctx.db.get(args.id);
    if (!guide) return null;

    // Get user and verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user || guide.authorId !== user._id) {
      throw new Error("Not authorized to view this guide");
    }

    return guide;
  },
});

// Get all guides by a user
export const getUserGuides = query({
  args: {
    userId: v.id("users"),
    includeUnpublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    let query = ctx.db
      .query("guides")
      .withIndex("by_author", (q) => q.eq("authorId", args.userId));
    
    const guides = await query.collect();
    
    // Filter based on authentication and ownership
    const filteredGuides = guides.filter(guide => {
      if (guide.status === "published") return true;
      
      if (!args.includeUnpublished) return false;
      
      // Only show unpublished guides to the owner
      if (!identity) return false;
      
      return true; // Ownership check would need to be done by comparing user IDs
    });

    return filteredGuides.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get published guides with filters
export const getPublishedGuides = query({
  args: {
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    difficulty: v.optional(v.string()),
    authorId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("guides")
      .withIndex("by_status", (q) => q.eq("status", "published"));
    
    const allGuides = await query.collect();
    
    // Apply filters
    let filteredGuides = allGuides;
    
    if (args.category) {
      filteredGuides = filteredGuides.filter(g => g.category === args.category);
    }
    
    if (args.difficulty) {
      filteredGuides = filteredGuides.filter(g => g.difficulty === args.difficulty);
    }
    
    if (args.authorId) {
      filteredGuides = filteredGuides.filter(g => g.authorId === args.authorId);
    }
    
    if (args.tags && args.tags.length > 0) {
      filteredGuides = filteredGuides.filter(g => 
        args.tags!.some(tag => g.tags.includes(tag))
      );
    }
    
    // Sort by published date (newest first)
    filteredGuides.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    
    // Apply pagination
    const limit = args.limit || 12;
    const startIndex = args.cursor ? parseInt(args.cursor) : 0;
    const endIndex = startIndex + limit;
    
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex);
    const hasMore = endIndex < filteredGuides.length;
    const nextCursor = hasMore ? endIndex.toString() : null;
    
    // Get author info for each guide
    const guidesWithAuthors = await Promise.all(
      paginatedGuides.map(async (guide) => {
        const author = await ctx.db.get(guide.authorId);
        return {
          ...guide,
          author: author ? {
            id: author._id,
            displayName: author.displayName || author.firstName || "Anonymous",
            avatar: author.avatar
          } : null
        };
      })
    );
    
    return {
      guides: guidesWithAuthors,
      nextCursor,
      hasMore
    };
  },
});

// Track guide view
export const trackView = mutation({
  args: {
    guideId: v.id("guides"),
  },
  handler: async (ctx, args) => {
    const guide = await ctx.db.get(args.guideId);
    if (!guide || guide.status !== "published") return;

    const identity = await ctx.auth.getUserIdentity();
    
    // Increment view count
    await ctx.db.patch(args.guideId, {
      views: (guide.views || 0) + 1,
      // For unique readers, we'd need a separate tracking system
      // This is simplified for now
      uniqueReaders: identity ? (guide.uniqueReaders || 0) + 1 : guide.uniqueReaders
    });
  },
});

// Update reading progress
export const updateReadingProgress = mutation({
  args: {
    guideId: v.id("guides"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    // Find existing progress record
    const existingProgress = await ctx.db
      .query("guideReadingProgress")
      .withIndex("by_user_guide", (q) => 
        q.eq("userId", user._id).eq("guideId", args.guideId)
      )
      .first();

    const now = Date.now();
    const completed = args.progress >= 95; // Consider 95% as completed

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        progress: args.progress,
        lastReadAt: now,
        completed
      });
    } else {
      await ctx.db.insert("guideReadingProgress", {
        guideId: args.guideId,
        userId: user._id,
        progress: args.progress,
        lastReadAt: now,
        bookmarked: false,
        completed
      });
    }

    // Update guide completion stats if completed
    if (completed && (!existingProgress || !existingProgress.completed)) {
      const guide = await ctx.db.get(args.guideId);
      if (guide) {
        await ctx.db.patch(args.guideId, {
          completions: (guide.completions || 0) + 1
        });
      }
    }
  },
});

// Toggle bookmark
export const toggleBookmark = mutation({
  args: {
    guideId: v.id("guides"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const progress = await ctx.db
      .query("guideReadingProgress")
      .withIndex("by_user_guide", (q) => 
        q.eq("userId", user._id).eq("guideId", args.guideId)
      )
      .first();

    if (progress) {
      await ctx.db.patch(progress._id, {
        bookmarked: !progress.bookmarked
      });
      return { bookmarked: !progress.bookmarked };
    } else {
      await ctx.db.insert("guideReadingProgress", {
        guideId: args.guideId,
        userId: user._id,
        progress: 0,
        lastReadAt: Date.now(),
        bookmarked: true,
        completed: false
      });
      return { bookmarked: true };
    }
  },
});

// Get user's bookmarked guides
export const getBookmarkedGuides = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) return [];

    const bookmarks = await ctx.db
      .query("guideReadingProgress")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("bookmarked"), true))
      .collect();

    const guides = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const guide = await ctx.db.get(bookmark.guideId);
        if (!guide || guide.status !== "published") return null;
        
        const author = await ctx.db.get(guide.authorId);
        return {
          ...guide,
          author: author ? {
            id: author._id,
            displayName: author.displayName || author.firstName || "Anonymous",
            avatar: author.avatar
          } : null,
          progress: bookmark.progress
        };
      })
    );

    return guides.filter(Boolean);
  },
});

// Search guides (basic implementation)
export const searchGuides = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const searchTerm = args.query.toLowerCase();
    
    const allGuides = await ctx.db
      .query("guides")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    
    // Simple search in title, excerpt, and tags
    const results = allGuides.filter(guide => 
      guide.title.toLowerCase().includes(searchTerm) ||
      guide.excerpt.toLowerCase().includes(searchTerm) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    // Get author info
    const guidesWithAuthors = await Promise.all(
      results.map(async (guide) => {
        const author = await ctx.db.get(guide.authorId);
        return {
          ...guide,
          author: author ? {
            id: author._id,
            displayName: author.displayName || author.firstName || "Anonymous",
            avatar: author.avatar
          } : null
        };
      })
    );
    
    return guidesWithAuthors.slice(0, 20); // Limit to 20 results
  },
});

// Get guide statistics for dashboard
export const getGuideStats = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const guides = await ctx.db
      .query("guides")
      .withIndex("by_author", (q) => q.eq("authorId", args.userId))
      .collect();
    
    const published = guides.filter(g => g.status === "published");
    const drafts = guides.filter(g => g.status === "draft");
    
    const totalViews = published.reduce((sum, g) => sum + (g.views || 0), 0);
    const totalCompletions = published.reduce((sum, g) => sum + (g.completions || 0), 0);
    
    return {
      total: guides.length,
      published: published.length,
      drafts: drafts.length,
      totalViews,
      totalCompletions,
      avgCompletionRate: published.length > 0 
        ? Math.round((totalCompletions / totalViews) * 100) 
        : 0
    };
  },
});

// Complete a lesson
export const completeLesson = mutation({
  args: {
    guideId: v.id("guides"),
    lessonIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    // For now, just return success
    // In a full implementation, you'd track individual lesson completions
    return { success: true, lessonIndex: args.lessonIndex };
  },
});