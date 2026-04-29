import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const items = await convexServer().query(api.content.listStats, {});
  return (
    <EntityCrud
      entity="stats"
      title="Stats"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "num", label: "Chiffre", type: "text" },
        { name: "label", label: "Libellé", type: "text" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
