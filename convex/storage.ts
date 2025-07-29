import { mutation } from "./_generated/server";

// Generate upload URL for image uploads
export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  
  // Generate a unique upload URL that expires in 1 hour
  return await ctx.storage.generateUploadUrl();
});

// Get public URL for a stored file
export const getImageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});