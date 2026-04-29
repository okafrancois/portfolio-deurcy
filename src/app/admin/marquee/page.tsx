import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function MarqueePage() {
  const items = await convexServer().query(api.content.listMarquee, {});
  return (
    <EntityCrud
      entity="marquee"
      title="Marquee"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "text", label: "Texte", type: "text" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
