import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";

export const runtime = "nodejs";

const QuoteSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).default(""),
  type: z.string().min(1).max(80),
  budget: z.string().min(1).max(40),
  message: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
  let parsed: z.infer<typeof QuoteSchema>;
  try {
    const body = await req.json();
    parsed = QuoteSchema.parse(body);
  } catch (err) {
    return NextResponse.json(
      { error: "Données invalides.", detail: String(err) },
      { status: 400 },
    );
  }

  try {
    await convexServer().mutation(api.quotes.createQuote, parsed);
  } catch (err) {
    console.error("[quote] convex insert failed", err);
    return NextResponse.json(
      { error: "Sauvegarde impossible." },
      { status: 500 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const owner = process.env.OWNER_EMAIL;
  if (apiKey && owner) {
    try {
      const resend = new Resend(apiKey);
      const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
      const subject = `Nouveau devis — ${parsed.name} (${parsed.type})`;
      const html = `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${escapeHtml(parsed.name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(parsed.email)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(parsed.company || "—")}</p>
        <p><strong>Type :</strong> ${escapeHtml(parsed.type)}</p>
        <p><strong>Budget :</strong> ${escapeHtml(parsed.budget)}</p>
        <hr/>
        <p style="white-space:pre-wrap">${escapeHtml(parsed.message)}</p>
      `;
      await resend.emails.send({
        from,
        to: owner,
        subject,
        html,
        replyTo: parsed.email,
      });
    } catch (err) {
      console.error("[quote] email failed", err);
      // don't fail the request — Convex already has the data
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
