import { api } from "../../convex/_generated/api";
import { convexServer } from "./convex-server";

export async function fetchSiteContent() {
  const c = convexServer();
  const [
    settings,
    marquee,
    stats,
    services,
    projects,
    testimonials,
    processSteps,
    faq,
  ] = await Promise.all([
    c.query(api.content.getSettings, {}),
    c.query(api.content.listMarquee, {}),
    c.query(api.content.listStats, {}),
    c.query(api.content.listServices, {}),
    c.query(api.content.listProjects, {}),
    c.query(api.content.listTestimonials, {}),
    c.query(api.content.listProcessSteps, {}),
    c.query(api.content.listFaq, {}),
  ]);
  return {
    settings,
    marquee,
    stats,
    services,
    projects,
    testimonials,
    processSteps,
    faq,
  };
}
