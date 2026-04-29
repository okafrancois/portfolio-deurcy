import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { adminToken, convexServer } from "@/lib/convex-server";

export const runtime = "nodejs";

type Action = "create" | "update" | "delete";

type Body = {
  action: Action | "setStatus";
  id?: string;
  data?: Record<string, unknown>;
  status?: "new" | "read" | "done";
};

const ENTITY_HANDLERS: Record<
  string,
  {
    create?: (data: Record<string, unknown>) => Promise<unknown>;
    update?: (id: string, data: Record<string, unknown>) => Promise<unknown>;
    delete?: (id: string) => Promise<unknown>;
    custom?: (body: Body) => Promise<unknown>;
  }
> = {};

function register(name: string, handler: (typeof ENTITY_HANDLERS)[string]) {
  ENTITY_HANDLERS[name] = handler;
}

function client() {
  return convexServer();
}
function token() {
  return adminToken();
}

register("marquee", {
  create: (data) =>
    client().mutation(api.content.createMarquee, {
      token: token(),
      data: data as { text: string; order: number },
    }),
  update: (id, data) =>
    client().mutation(api.content.updateMarquee, {
      token: token(),
      id: id as Id<"marquee">,
      data: data as { text: string; order: number },
    }),
  delete: (id) =>
    client().mutation(api.content.deleteMarquee, {
      token: token(),
      id: id as Id<"marquee">,
    }),
});

register("stats", {
  create: (data) =>
    client().mutation(api.content.createStat, {
      token: token(),
      data: data as { num: string; label: string; order: number },
    }),
  update: (id, data) =>
    client().mutation(api.content.updateStat, {
      token: token(),
      id: id as Id<"stats">,
      data: data as { num: string; label: string; order: number },
    }),
  delete: (id) =>
    client().mutation(api.content.deleteStat, {
      token: token(),
      id: id as Id<"stats">,
    }),
});

register("services", {
  create: (data) =>
    client().mutation(api.content.createService, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  update: (id, data) =>
    client().mutation(api.content.updateService, {
      token: token(),
      id: id as Id<"services">,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  delete: (id) =>
    client().mutation(api.content.deleteService, {
      token: token(),
      id: id as Id<"services">,
    }),
});

register("projects", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data) =>
    client().mutation(api.content.createProject, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  update: (id, data) =>
    client().mutation(api.content.updateProject, {
      token: token(),
      id: id as Id<"projects">,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  delete: (id) =>
    client().mutation(api.content.deleteProject, {
      token: token(),
      id: id as Id<"projects">,
    }),
});

register("testimonials", {
  create: (data) =>
    client().mutation(api.content.createTestimonial, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  update: (id, data) =>
    client().mutation(api.content.updateTestimonial, {
      token: token(),
      id: id as Id<"testimonials">,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  delete: (id) =>
    client().mutation(api.content.deleteTestimonial, {
      token: token(),
      id: id as Id<"testimonials">,
    }),
});

register("processSteps", {
  create: (data) =>
    client().mutation(api.content.createProcessStep, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  update: (id, data) =>
    client().mutation(api.content.updateProcessStep, {
      token: token(),
      id: id as Id<"processSteps">,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  delete: (id) =>
    client().mutation(api.content.deleteProcessStep, {
      token: token(),
      id: id as Id<"processSteps">,
    }),
});

register("faq", {
  create: (data) =>
    client().mutation(api.content.createFaq, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  update: (id, data) =>
    client().mutation(api.content.updateFaq, {
      token: token(),
      id: id as Id<"faq">,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    }),
  delete: (id) =>
    client().mutation(api.content.deleteFaq, {
      token: token(),
      id: id as Id<"faq">,
    }),
});

register("settings", {
  custom: async (body) => {
    if (body.action !== "update")
      throw new Error("Settings only supports update.");
    return client().mutation(api.content.updateSettings, {
      token: token(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      patch: (body.data ?? {}) as any,
    });
  },
});

register("files", {
  custom: async (body) => {
    if (body.action === "create") {
      // returns a short-lived upload URL
      return await client().mutation(api.files.generateUploadUrl, {
        token: token(),
      });
    }
    if (body.action === "delete") {
      if (!body.id) throw new Error("Missing storageId.");
      return await client().mutation(api.files.deleteStorageFile, {
        token: token(),
        storageId: body.id as Id<"_storage">,
      });
    }
    throw new Error("Unsupported file action.");
  },
});

register("seed", {
  custom: async (body) => {
    return client().mutation(api.seed.seedAll, {
      token: token(),
      reset: Boolean(body.data?.reset),
    });
  },
});

register("quotes", {
  custom: async (body) => {
    if (!body.id) throw new Error("Missing id.");
    const id = body.id as Id<"quoteRequests">;
    if (body.action === "setStatus") {
      if (!body.status) throw new Error("Missing status.");
      return client().mutation(api.quotes.setQuoteStatus, {
        token: token(),
        id,
        status: body.status,
      });
    }
    if (body.action === "delete") {
      return client().mutation(api.quotes.deleteQuote, {
        token: token(),
        id,
      });
    }
    throw new Error("Unsupported action for quotes.");
  },
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity } = await params;
  const handler = ENTITY_HANDLERS[entity];
  if (!handler) {
    return NextResponse.json({ error: "Unknown entity." }, { status: 404 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    let result: unknown;
    if (handler.custom) {
      result = await handler.custom(body);
    } else if (body.action === "create" && handler.create) {
      result = await handler.create(body.data ?? {});
    } else if (body.action === "update" && handler.update) {
      if (!body.id) throw new Error("Missing id.");
      result = await handler.update(body.id, body.data ?? {});
    } else if (body.action === "delete" && handler.delete) {
      if (!body.id) throw new Error("Missing id.");
      result = await handler.delete(body.id);
    } else {
      return NextResponse.json(
        { error: "Unsupported action." },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error(`[admin/${entity}]`, err);
    const message = err instanceof Error ? err.message : "Unknown error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
