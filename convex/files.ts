import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireAdmin } from "./auth";

export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    requireAdmin(token);
    return await ctx.storage.generateUploadUrl();
  },
});

export const deleteStorageFile = mutation({
  args: { token: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, { token, storageId }) => {
    requireAdmin(token);
    await ctx.storage.delete(storageId);
  },
});
