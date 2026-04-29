import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await convexServer().query(api.content.getSettings, {});
  if (!settings) {
    return (
      <p style={{ color: "var(--ink-dim)" }}>
        Initialise d&apos;abord le contenu depuis le tableau de bord.
      </p>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <SettingsForm initial={settings as any} />;
}
