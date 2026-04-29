import { ConvexError } from "convex/values";

export function requireAdmin(token: string | undefined) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    throw new ConvexError("ADMIN_TOKEN not configured on Convex deployment.");
  }
  if (!token || token !== expected) {
    throw new ConvexError("Unauthorized.");
  }
}
