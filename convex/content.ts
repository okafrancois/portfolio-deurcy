import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./auth";

// ─── Settings (singleton) ─────────────────────────────────────────────

export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    return doc;
  },
});

const settingsPatchValidator = v.object({
  accent: v.optional(v.string()),
  bgTone: v.optional(
    v.union(
      v.literal("warm-black"),
      v.literal("pure-black"),
      v.literal("deep-charcoal"),
    ),
  ),
  grain: v.optional(v.boolean()),
  logoMain: v.optional(v.string()),
  logoAccent: v.optional(v.string()),
  logoSuffix: v.optional(v.string()),
  siteTitle: v.optional(v.string()),
  metaDescription: v.optional(v.string()),
  heroEyebrow: v.optional(v.string()),
  heroBgWord: v.optional(v.string()),
  heroTitleLine1: v.optional(v.string()),
  heroTitleLine2: v.optional(v.string()),
  heroTitleEm: v.optional(v.string()),
  heroSignatureName: v.optional(v.string()),
  heroDescription: v.optional(v.string()),
  heroPrimaryCta: v.optional(v.string()),
  heroSecondaryCta: v.optional(v.string()),
  workTitleLine1: v.optional(v.string()),
  workTitleEm: v.optional(v.string()),
  workIntro: v.optional(v.string()),
  workCta: v.optional(v.string()),
  servicesTitleLine1: v.optional(v.string()),
  servicesTitleLine2: v.optional(v.string()),
  servicesTitleEm: v.optional(v.string()),
  processTitleLine1: v.optional(v.string()),
  processTitleEm: v.optional(v.string()),
  avisTitleLine1: v.optional(v.string()),
  avisTitleEm: v.optional(v.string()),
  avisRating: v.optional(v.string()),
  aboutTitleLine1: v.optional(v.string()),
  aboutTitleEm: v.optional(v.string()),
  aboutBody1: v.optional(v.string()),
  aboutBody2: v.optional(v.string()),
  aboutPortraitLabel: v.optional(v.string()),
  aboutMiniGrid: v.optional(
    v.array(v.object({ k: v.string(), v: v.string() })),
  ),
  faqTitleLine1: v.optional(v.string()),
  faqTitleEm: v.optional(v.string()),
  contactTitleLine1: v.optional(v.string()),
  contactTitleEm: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),
  contactSocialHandle: v.optional(v.string()),
  contactSocialUrl: v.optional(v.string()),
  contactReplyNotice: v.optional(v.string()),
  contactQuoteTypes: v.optional(v.array(v.string())),
  contactBudgets: v.optional(v.array(v.string())),
  footerWordmark1: v.optional(v.string()),
  footerWordmark2: v.optional(v.string()),
  footerTagline: v.optional(v.string()),
  footerCopy: v.optional(v.string()),
  footerLocation: v.optional(v.string()),
});

export const updateSettings = mutation({
  args: { token: v.string(), patch: settingsPatchValidator },
  handler: async (ctx, { token, patch }) => {
    requireAdmin(token);
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    if (!existing) {
      throw new Error("Settings not initialized. Run seed first.");
    }
    await ctx.db.patch(existing._id, patch);
  },
});

// ─── Public list queries (sorted by `order`) ─────────────────────────

export const listMarquee = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("marquee").withIndex("by_order").collect(),
});

export const listStats = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("stats").withIndex("by_order").collect(),
});

export const listServices = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("services").withIndex("by_order").collect(),
});

export const listProjects = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("projects").withIndex("by_order").collect(),
});

export const listTestimonials = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("testimonials").withIndex("by_order").collect(),
});

export const listProcessSteps = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("processSteps").withIndex("by_order").collect(),
});

export const listFaq = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("faq").withIndex("by_order").collect(),
});

// ─── Generic admin CRUD per table ────────────────────────────────────

const marqueeFields = { text: v.string(), order: v.number() };
const statsFields = { num: v.string(), label: v.string(), order: v.number() };
const servicesFields = {
  num: v.string(),
  title: v.string(),
  sub: v.string(),
  body: v.string(),
  bullets: v.array(v.string()),
  order: v.number(),
};
const projectsFields = {
  title: v.string(),
  client: v.string(),
  category: v.string(),
  year: v.string(),
  duration: v.string(),
  blurb: v.string(),
  tag: v.string(),
  order: v.number(),
};
const testimonialsFields = {
  name: v.string(),
  role: v.string(),
  company: v.string(),
  quote: v.string(),
  initials: v.string(),
  order: v.number(),
};
const processStepsFields = {
  num: v.string(),
  label: v.string(),
  body: v.string(),
  order: v.number(),
};
const faqFields = { q: v.string(), a: v.string(), order: v.number() };

// MARQUEE
export const createMarquee = mutation({
  args: { token: v.string(), data: v.object(marqueeFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("marquee", data);
  },
});
export const updateMarquee = mutation({
  args: { token: v.string(), id: v.id("marquee"), data: v.object(marqueeFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteMarquee = mutation({
  args: { token: v.string(), id: v.id("marquee") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// STATS
export const createStat = mutation({
  args: { token: v.string(), data: v.object(statsFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("stats", data);
  },
});
export const updateStat = mutation({
  args: { token: v.string(), id: v.id("stats"), data: v.object(statsFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteStat = mutation({
  args: { token: v.string(), id: v.id("stats") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// SERVICES
export const createService = mutation({
  args: { token: v.string(), data: v.object(servicesFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("services", data);
  },
});
export const updateService = mutation({
  args: { token: v.string(), id: v.id("services"), data: v.object(servicesFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteService = mutation({
  args: { token: v.string(), id: v.id("services") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// PROJECTS
export const createProject = mutation({
  args: { token: v.string(), data: v.object(projectsFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("projects", data);
  },
});
export const updateProject = mutation({
  args: { token: v.string(), id: v.id("projects"), data: v.object(projectsFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteProject = mutation({
  args: { token: v.string(), id: v.id("projects") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// TESTIMONIALS
export const createTestimonial = mutation({
  args: { token: v.string(), data: v.object(testimonialsFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("testimonials", data);
  },
});
export const updateTestimonial = mutation({
  args: { token: v.string(), id: v.id("testimonials"), data: v.object(testimonialsFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteTestimonial = mutation({
  args: { token: v.string(), id: v.id("testimonials") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// PROCESS STEPS
export const createProcessStep = mutation({
  args: { token: v.string(), data: v.object(processStepsFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("processSteps", data);
  },
});
export const updateProcessStep = mutation({
  args: { token: v.string(), id: v.id("processSteps"), data: v.object(processStepsFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteProcessStep = mutation({
  args: { token: v.string(), id: v.id("processSteps") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});

// FAQ
export const createFaq = mutation({
  args: { token: v.string(), data: v.object(faqFields) },
  handler: async (ctx, { token, data }) => {
    requireAdmin(token);
    return await ctx.db.insert("faq", data);
  },
});
export const updateFaq = mutation({
  args: { token: v.string(), id: v.id("faq"), data: v.object(faqFields) },
  handler: async (ctx, { token, id, data }) => {
    requireAdmin(token);
    await ctx.db.replace(id, data);
  },
});
export const deleteFaq = mutation({
  args: { token: v.string(), id: v.id("faq") },
  handler: async (ctx, { token, id }) => {
    requireAdmin(token);
    await ctx.db.delete(id);
  },
});
