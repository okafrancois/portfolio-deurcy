import { api } from "../../../convex/_generated/api";
import { adminToken, convexServer } from "@/lib/convex-server";
import QuotesPanel from "@/components/admin/QuotesPanel";
import SeedButton from "@/components/admin/SeedButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let quotes: unknown[] = [];
  let needsSeed = false;
  let connectError: string | null = null;
  try {
    quotes = (await convexServer().query(api.quotes.listQuotes, {
      token: adminToken(),
    })) as unknown[];
    const settings = await convexServer().query(api.content.getSettings, {});
    if (!settings) needsSeed = true;
  } catch (err) {
    connectError = err instanceof Error ? err.message : String(err);
  }

  return (
    <div>
      <h1
        className="display"
        style={{ fontSize: 48, marginBottom: 24, lineHeight: 1.05 }}
      >
        Devis <em>reçus.</em>
      </h1>

      {connectError ? (
        <div
          style={{
            background: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,120,120,0.3)",
            padding: 20,
            borderRadius: 4,
            marginBottom: 32,
          }}
        >
          <strong>Connexion Convex impossible.</strong>
          <p style={{ color: "var(--ink-dim)", marginTop: 8 }}>
            Lance <code>npx convex dev</code> et configure{" "}
            <code>NEXT_PUBLIC_CONVEX_URL</code> + <code>ADMIN_TOKEN</code>.
          </p>
          <pre style={{ marginTop: 12, fontSize: 11, color: "var(--ink-mute)" }}>
            {connectError}
          </pre>
        </div>
      ) : null}

      {needsSeed ? (
        <div
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--accent)",
            padding: 20,
            borderRadius: 4,
            marginBottom: 32,
          }}
        >
          <strong>Le contenu du site n&apos;est pas initialisé.</strong>
          <p style={{ color: "var(--ink-dim)", marginTop: 8, marginBottom: 16 }}>
            Insère les données par défaut du design pour commencer.
          </p>
          <SeedButton />
        </div>
      ) : null}

      {!connectError && !needsSeed ? (
        <QuotesPanel
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          quotes={quotes as any[]}
        />
      ) : null}
    </div>
  );
}
