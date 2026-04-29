import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await convexServer().query(api.content.listFaq, {});
  return (
    <EntityCrud
      entity="faq"
      title="FAQ"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "q", label: "Question", type: "text" },
        { name: "a", label: "Réponse", type: "textarea" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
