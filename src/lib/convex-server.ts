import { ConvexHttpClient } from "convex/browser";

let _client: ConvexHttpClient | null = null;

export function convexServer(): ConvexHttpClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` once to initialize.",
    );
  }
  _client = new ConvexHttpClient(url);
  return _client;
}

export function adminToken(): string {
  const t = process.env.ADMIN_TOKEN;
  if (!t) throw new Error("ADMIN_TOKEN is not set.");
  return t;
}
