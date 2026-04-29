import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./auth";

export const createQuote = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.string(),
    type: v.string(),
    budget: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quoteRequests", { ...args, status: "new" });
  },
});

export const listQuotes = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    requireAdmin(token);
    return await ctx.db.query("quoteRequests").order("desc").collect();
  },
});

export const setQuoteStatus = mutation({
  args: {
    token: v.string(),
    id: v.id("quoteRequests"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("done")),
  },
  handler: async (ctx, { token, id, status }) => {
    requireAdmin(token);
    await ctx.db.patch(id, { status });
  },
});

export const deleteQuote = mutation({
  args: { token: v.string(), id: v.id("quoteRequests") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});
